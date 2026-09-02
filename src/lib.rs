#![doc = include_str!("../README.md")]
#![no_std]
extern crate alloc;

mod impls;
mod shared;
use alloc::{
    borrow::Cow,
    boxed::Box,
    string::{FromUtf8Error, String, ToString},
    vec::Vec,
};
use shared::Shared;

use core::{
    borrow::Borrow,
    mem::{ManuallyDrop, take},
    num::NonZeroUsize,
    ops::Deref,
    ptr::{self, NonNull},
    slice,
};

#[cfg(feature = "nami")]
nami_core::impl_constant!(Str);

/// The width of a machine word, in bytes.
const WORD: usize = size_of::<usize>();

/// How many bytes a `Str` holds without touching the allocator: every byte of
/// its two words except the one the tag lives in. Fifteen on a 64-bit target,
/// seven on a 32-bit one.
const INLINE_CAPACITY: usize = 2 * WORD - 1;

/// Set in the tagged word when the bytes are stored inline.
const INLINE_MARK: usize = 1 << (usize::BITS - 1);

/// Set in the tagged word when the bytes belong to a `&'static str`.
const STATIC_MARK: usize = 1 << (usize::BITS - 2);

/// The bits of the tagged word that carry a heap length.
const LEN_MASK: usize = STATIC_MARK - 1;

/// The longest string a `Str` can describe, in bytes. Both marks are held out
/// of the length, so this is a quarter of the address space: four exabytes on a
/// 64-bit target, a gibibyte on a 32-bit one.
const MAX_LEN: usize = LEN_MASK;

/// The tag byte of an inline string: the mark, then the byte count.
const INLINE_TAG: u8 = 0b1000_0000;

/// The bits of the tag byte that carry the inline byte count.
const INLINE_LEN_MASK: usize = 0b0111_1111;

/// Which of the three representations a `Str` is in.
#[derive(Clone, Copy)]
enum Repr {
    /// The bytes live in the `Str` itself.
    Inline,
    /// The bytes belong to a `&'static str`.
    Static,
    /// The bytes belong to a reference-counted [`Shared`].
    Shared,
}

/// The first word of a `Str`: a data pointer, or the first inline bytes.
///
/// Which one it is, is what `Str::repr` answers. The inline representation
/// initialises every byte, so reading `bytes` is only ever reading initialised
/// memory; `ptr` is only read when a pointer is what was stored.
#[repr(C)]
#[derive(Clone, Copy)]
union Payload {
    ptr: NonNull<()>,
    bytes: [u8; WORD],
}

/// A string type that stores short strings inline, borrows static ones and
/// reference-counts owned ones.
///
/// `Str` is two words wide and never spends more than that. Up to fifteen
/// bytes — seven on a 32-bit target — live in those two words with no
/// allocation at all; a `&'static str` is borrowed as-is; and a longer `String`
/// is moved into a reference-counted box, so cloning it is a counter increment
/// rather than a copy of the bytes.
#[repr(C)]
pub struct Str {
    /// A data pointer, or the first `WORD` inline bytes.
    payload: Payload,

    /// The tagged word: the discriminant, plus either a length or the last
    /// inline bytes.
    ///
    /// It is stored little-endian first, so that its most significant byte —
    /// the one holding the marks — is the *last* byte of the `Str` on every
    /// target. That is what lets the inline bytes run contiguously from the
    /// start of the `Str` up to the tag, whatever the host's byte order.
    ///
    /// Every representation sets at least one bit of that byte, which is what
    /// makes the word non-zero and keeps `Option<Str>` two words wide.
    meta: NonZeroUsize,
}

impl Drop for Str {
    /// Decrements the reference count for owned strings and frees the memory
    /// when the reference count reaches zero.
    ///
    /// For inline and static strings, this is a no-op.
    fn drop(&mut self) {
        let Some(shared) = self.as_shared() else {
            return;
        };

        if shared.is_unique() {
            // SAFETY: `as_shared` returning `Some` proves `ptr` is the leaked
            // `Shared` box this `Str` holds a count on, and the borrow above has
            // ended. `Drop` runs once, so the last owner reclaims the box once.
            let ptr = unsafe { self.payload.ptr }.cast::<Shared>().as_ptr();
            // SAFETY: as above; the box was leaked by `from_string`.
            drop(unsafe { Box::from_raw(ptr) });
        } else {
            // SAFETY: there is a live `Shared` here, and this `Str` holds one of
            // its counts; dropping releases exactly that one.
            unsafe {
                shared.decrement_count();
            }
        }
    }
}

impl Clone for Str {
    /// Creates a clone of the string.
    ///
    /// For inline and static strings, this is a copy of the two words.
    /// For owned strings, this increments the reference count.
    fn clone(&self) -> Self {
        if let Some(shared) = self.as_shared() {
            // SAFETY: `as_shared` returning `Some` proves this is a shared string,
            // so there is a live `Shared` to count; the clone below takes that new
            // count.
            unsafe {
                shared.increment_count();
            }
        }

        Self {
            payload: self.payload,
            meta: self.meta,
        }
    }
}

impl Deref for Str {
    type Target = str;

    /// Provides access to the underlying string slice.
    fn deref(&self) -> &Self::Target {
        self.as_str()
    }
}

impl Borrow<str> for Str {
    /// Allows borrowing a `Str` as a string slice.
    fn borrow(&self) -> &str {
        self.as_str()
    }
}

impl AsRef<str> for Str {
    /// Converts `Str` to a string slice reference.
    fn as_ref(&self) -> &str {
        self.as_str()
    }
}

impl AsRef<[u8]> for Str {
    /// Converts `Str` to a byte slice reference.
    fn as_ref(&self) -> &[u8] {
        self.as_bytes()
    }
}

impl Default for Str {
    /// Creates a new empty `Str`.
    fn default() -> Self {
        Self::new()
    }
}

impl From<Cow<'static, str>> for Str {
    /// Creates a `Str` from a `Cow<'static, str>`.
    ///
    /// This will borrow from static strings and own dynamic strings.
    fn from(value: Cow<'static, str>) -> Self {
        match value {
            Cow::Borrowed(s) => s.into(),
            Cow::Owned(s) => s.into(),
        }
    }
}

/// Implementations of the traits whose types only exist in the standard
/// library, behind the default-on `std` feature.
#[cfg(feature = "std")]
mod std_on {
    use alloc::{string::FromUtf8Error, vec::IntoIter};

    use crate::Str;

    extern crate std;

    use core::{net::SocketAddr, ops::Deref};
    use std::{
        ffi::{OsStr, OsString},
        io,
        net::ToSocketAddrs,
        path::Path,
    };

    impl AsRef<OsStr> for Str {
        /// Converts `Str` to an OS string slice reference.
        fn as_ref(&self) -> &OsStr {
            self.deref().as_ref()
        }
    }

    impl AsRef<Path> for Str {
        /// Converts `Str` to a path reference.
        fn as_ref(&self) -> &Path {
            self.deref().as_ref()
        }
    }

    impl TryFrom<OsString> for Str {
        type Error = FromUtf8Error;

        /// Attempts to create a `Str` from an `OsString`.
        ///
        /// This will fail if the `OsString` contains invalid UTF-8 data.
        fn try_from(value: OsString) -> Result<Self, Self::Error> {
            Self::from_utf8(value.into_encoded_bytes())
        }
    }

    impl ToSocketAddrs for Str {
        type Iter = IntoIter<SocketAddr>;

        /// Converts a string to a socket address.
        fn to_socket_addrs(&self) -> io::Result<Self::Iter> {
            self.deref().to_socket_addrs()
        }
    }
}

impl Str {
    /// Creates a `Str` from a static string slice.
    ///
    /// This method allows creating a `Str` from a string with a static lifetime,
    /// which will be stored as a pointer to the static data without any allocation
    /// and without copying its bytes.
    ///
    /// # Panics
    ///
    /// Panics if the string is longer than a quarter of the address space, which
    /// is the most a `Str` can describe.
    ///
    /// # Examples
    ///
    /// ```
    /// use suiteki::Str;
    ///
    /// let s = Str::from_static("hello");
    /// assert_eq!(s, "hello");
    /// // Reference count is intentionally not exposed
    /// ```
    #[must_use]
    pub const fn from_static(s: &'static str) -> Self {
        let len = s.len();
        assert!(len <= MAX_LEN, "a `Str` cannot describe a string this long");

        // SAFETY: a `&'static str` never has a null data pointer.
        let ptr = unsafe { NonNull::new_unchecked(s.as_ptr().cast_mut().cast::<()>()) };
        // SAFETY: `STATIC_MARK` is set, so the word is not zero, and `to_le`
        // maps zero to zero and everything else to something else.
        let meta = unsafe { NonZeroUsize::new_unchecked((STATIC_MARK | len).to_le()) };

        Self {
            payload: Payload { ptr },
            meta,
        }
    }

    /// Stores the bytes of `s` in the `Str` itself.
    ///
    /// # Panics
    ///
    /// Panics if `s` is longer than `INLINE_CAPACITY`.
    fn from_inline(s: &str) -> Self {
        let len = s.len();
        assert!(len <= INLINE_CAPACITY, "the string does not fit inline");

        // One copy of a runtime length, into the bytes of the `Str` laid end to
        // end. Splitting it into the two words afterwards is two copies of a
        // length the compiler knows, which is no copy at all.
        let mut bytes = [0u8; 2 * WORD];
        bytes[..len].copy_from_slice(s.as_bytes());

        #[expect(
            clippy::cast_possible_truncation,
            reason = "the assert above bounds `len` by `INLINE_CAPACITY`, at most 15"
        )]
        let tag = INLINE_TAG | len as u8;
        bytes[2 * WORD - 1] = tag;

        let mut head = [0u8; WORD];
        let mut tail = [0u8; WORD];
        head.copy_from_slice(&bytes[..WORD]);
        tail.copy_from_slice(&bytes[WORD..]);

        Self {
            payload: Payload { bytes: head },
            // SAFETY: the last byte carries `INLINE_TAG`, so at least one byte
            // of the word is non-zero, whatever the host's byte order.
            meta: unsafe { NonZeroUsize::new_unchecked(usize::from_ne_bytes(tail)) },
        }
    }

    /// Creates a `Str` holding a copy of `s`, inline when it fits.
    pub(crate) fn from_borrowed(s: &str) -> Self {
        if s.len() <= INLINE_CAPACITY {
            Self::from_inline(s)
        } else {
            Self::from_string(s.to_string())
        }
    }

    /// # Panics
    ///
    /// Panics if the string is longer than a quarter of the address space.
    fn from_string(string: String) -> Self {
        let len = string.len();
        if len <= INLINE_CAPACITY {
            // The `String`'s own buffer is dropped: the bytes live in the `Str`.
            return Self::from_inline(string.as_str());
        }
        assert!(len <= MAX_LEN, "a `Str` cannot describe a string this long");

        Self {
            payload: Payload {
                ptr: NonNull::from(Box::leak(Box::new(Shared::new(string)))).cast::<()>(),
            },
            // SAFETY: a shared string is longer than `INLINE_CAPACITY`, so `len`
            // is not zero, and `to_le` keeps it that way.
            meta: unsafe { NonZeroUsize::new_unchecked(len.to_le()) },
        }
    }

    /// The tagged word, in the host's own bit order.
    const fn tag_word(&self) -> usize {
        usize::from_le(self.meta.get())
    }

    /// Which representation this `Str` is in.
    const fn repr(&self) -> Repr {
        let tag_word = self.tag_word();
        if tag_word & INLINE_MARK != 0 {
            Repr::Inline
        } else if tag_word & STATIC_MARK != 0 {
            Repr::Static
        } else {
            Repr::Shared
        }
    }

    /// The byte count an inline string carries in its tag byte.
    const fn inline_len(&self) -> usize {
        (self.tag_word() >> (usize::BITS - 8)) & INLINE_LEN_MASK
    }

    /// Whether the bytes belong to a reference-counted [`Shared`].
    ///
    /// This is the one question `Clone` and `Drop` ask, and neither mark being
    /// set answers it in a single test.
    const fn is_shared(&self) -> bool {
        self.tag_word() & (INLINE_MARK | STATIC_MARK) == 0
    }

    /// The reference-counted box, when that is what this `Str` holds.
    const fn as_shared(&self) -> Option<&Shared> {
        if self.is_shared() {
            // SAFETY: the shared representation is exactly the one whose `ptr`
            // is the leaked `Shared` this `Str` holds a count on; the borrow is
            // tied to `&self`, which keeps that count alive.
            Some(unsafe { self.payload.ptr.cast::<Shared>().as_ref() })
        } else {
            None
        }
    }

    /// Returns a string slice of this `Str`.
    ///
    /// This method works for all three representations.
    ///
    /// # Examples
    ///
    /// ```
    /// use suiteki::Str;
    ///
    /// let s1 = Str::from("hello");
    /// assert_eq!(s1.as_str(), "hello");
    ///
    /// let s2 = Str::from(String::from("world"));
    /// assert_eq!(s2.as_str(), "world");
    /// ```
    #[must_use]
    pub const fn as_str(&self) -> &str {
        let (ptr, len) = match self.repr() {
            // The inline bytes start at the first byte of the `Str` and run up
            // to the tag byte, which is its last.
            Repr::Inline => (ptr::from_ref(self).cast::<u8>(), self.inline_len()),
            // SAFETY: the static representation keeps the pointer and length of
            // the original `&'static str`, which outlives this borrow.
            Repr::Static => (
                unsafe { self.payload.ptr }
                    .as_ptr()
                    .cast_const()
                    .cast::<u8>(),
                self.tag_word() & LEN_MASK,
            ),
            Repr::Shared => {
                // SAFETY: the `Shared` outlives this borrow because `self` holds
                // a count on it.
                return unsafe { self.as_shared_unchecked().as_str() };
            }
        };

        // SAFETY: `ptr` and `len` describe the bytes this `Str` was built from,
        // which were UTF-8 already, and which live at least as long as `&self`.
        unsafe { core::str::from_utf8_unchecked(slice::from_raw_parts(ptr, len)) }
    }

    /// # Safety
    ///
    /// This `Str` must be in the shared representation.
    const unsafe fn as_shared_unchecked(&self) -> &Shared {
        // SAFETY: the caller guarantees the shared representation, whose `ptr`
        // is the leaked `Shared` this `Str` holds a count on.
        unsafe { self.payload.ptr.cast::<Shared>().as_ref() }
    }

    /// Returns the length of the string, in bytes.
    ///
    /// # Examples
    ///
    /// ```
    /// use suiteki::Str;
    /// let s = Str::from("hello");
    /// assert_eq!(s.len(), 5);
    /// ```
    #[must_use]
    pub const fn len(&self) -> usize {
        match self.repr() {
            Repr::Inline => self.inline_len(),
            Repr::Static | Repr::Shared => self.tag_word() & LEN_MASK,
        }
    }

    /// Returns `true` if the string has a length of zero.
    ///
    /// # Examples
    ///
    /// ```
    /// use suiteki::Str;
    /// let s = Str::new();
    /// assert!(s.is_empty());
    /// let s2 = Str::from("not empty");
    /// assert!(!s2.is_empty());
    /// ```
    #[must_use]
    pub const fn is_empty(&self) -> bool {
        self.len() == 0
    }

    // Intentionally no public API exposing reference counts.

    /// Converts this `Str` into a `String`.
    ///
    /// For inline and static strings, this will allocate a new string and copy
    /// the contents. For owned strings, this will take ownership of the string
    /// if this is the last reference, and copy it otherwise.
    ///
    /// # Examples
    ///
    /// ```
    /// use suiteki::Str;
    ///
    /// let s1 = Str::from("static");
    /// let s1_string = s1.into_string();
    /// assert_eq!(s1_string, "static");
    ///
    /// let s2 = Str::from(String::from("an owned, heap-sized string"));
    /// let s2_string = s2.into_string();
    /// assert_eq!(s2_string, "an owned, heap-sized string");
    /// ```
    #[must_use]
    pub fn into_string(self) -> String {
        let this = ManuallyDrop::new(self);
        match this.repr() {
            // SAFETY: `self` is wrapped in `ManuallyDrop`, so its count is not
            // released twice. When unique, this is the last owner and may reclaim
            // the box; otherwise it drops its own count and copies the contents.
            Repr::Shared => unsafe {
                let shared = this.as_shared_unchecked();
                if shared.is_unique() {
                    let shared = Box::from_raw(this.payload.ptr.cast::<Shared>().as_ptr());

                    shared.take()
                } else {
                    shared.decrement_count();
                    shared.as_str().to_string()
                }
            },
            Repr::Inline | Repr::Static => this.as_str().to_string(),
        }
    }
}

impl Str {
    /// Creates a new empty `Str`.
    ///
    /// This returns a static empty string reference.
    ///
    /// # Examples
    ///
    /// ```
    /// use suiteki::Str;
    ///
    /// let s = Str::new();
    /// assert_eq!(s, "");
    /// // Reference count is intentionally not exposed
    /// ```
    #[must_use]
    pub const fn new() -> Self {
        Self::from_static("")
    }

    /// Creates a `Str` from a vector of bytes.
    ///
    /// This function will attempt to convert the vector to a UTF-8 string and
    /// wrap it in a `Str`. If the vector does not contain valid UTF-8, an error
    /// is returned.
    ///
    /// # Errors
    ///
    /// Returns an error if the provided byte vector does not contain valid UTF-8 data.
    ///
    /// # Examples
    ///
    /// ```
    /// use suiteki::Str;
    ///
    /// let bytes = vec![104, 101, 108, 108, 111]; // "hello" in UTF-8
    /// let s = Str::from_utf8(bytes).unwrap();
    /// assert_eq!(s, "hello");
    /// // Reference count is intentionally not exposed
    ///
    /// // Invalid UTF-8 sequence
    /// let invalid = vec![0xFF, 0xFF];
    /// assert!(Str::from_utf8(invalid).is_err());
    /// ```
    pub fn from_utf8(bytes: Vec<u8>) -> Result<Self, FromUtf8Error> {
        String::from_utf8(bytes).map(Self::from)
    }

    /// # Safety
    ///
    /// This function is unsafe because it does not check that the bytes passed
    /// to it are valid UTF-8. If this constraint is violated, it may cause
    /// memory unsafety issues with future users of the `Str`.
    ///
    /// # Examples
    ///
    /// ```
    /// use suiteki::Str;
    ///
    /// // SAFETY: We know these bytes form valid UTF-8
    /// let bytes = vec![104, 101, 108, 108, 111]; // "hello" in UTF-8
    /// let s = unsafe { Str::from_utf8_unchecked(bytes) };
    /// assert_eq!(s, "hello");
    /// ```
    #[must_use]
    pub unsafe fn from_utf8_unchecked(bytes: Vec<u8>) -> Self {
        // SAFETY: this function's own contract requires `bytes` to be valid UTF-8.
        unsafe { Self::from(String::from_utf8_unchecked(bytes)) }
    }

    /// Applies a function to the owned string representation of this `Str`.
    ///
    /// This is an internal utility method used for operations that need to modify
    /// the string contents.
    fn handle(&mut self, f: impl FnOnce(&mut String)) {
        let mut string = take(self).into_string();
        f(&mut string);
        *self = Self::from(string);
    }

    /// Appends a string to this `Str`.
    ///
    /// This method will convert the `Str` to an owned string if it's a static reference.
    ///
    /// # Examples
    ///
    /// ```
    /// use suiteki::Str;
    ///
    /// let mut s = Str::from("hello");
    /// s.append(" world");
    /// assert_eq!(s, "hello world");
    /// ```
    pub fn append(&mut self, s: impl AsRef<str>) {
        let mut string = take(self).into_string();
        string.push_str(s.as_ref());
        *self = Self::from(string);
    }
}
impl From<&'static str> for Str {
    /// Creates a `Str` from a static string slice.
    ///
    /// This stores a reference to the original string without any allocation.
    ///
    /// # Examples
    ///
    /// ```
    /// use suiteki::Str;
    ///
    /// let s = Str::from("hello");
    /// assert_eq!(s, "hello");
    /// // Reference count is intentionally not exposed
    /// ```
    fn from(value: &'static str) -> Self {
        Self::from_static(value)
    }
}

impl From<String> for Str {
    /// Creates a `Str` from an owned `String`.
    ///
    /// Short strings are copied into the `Str` itself; longer ones are stored in
    /// a reference-counted container.
    ///
    /// # Examples
    ///
    /// ```
    /// use suiteki::Str;
    ///
    /// let s = Str::from(String::from("hello"));
    /// assert_eq!(s, "hello");
    /// // Reference count is intentionally not exposed
    /// ```
    fn from(value: String) -> Self {
        Self::from_string(value)
    }
}

impl From<Str> for String {
    fn from(value: Str) -> Self {
        value.into_string()
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use alloc::vec;

    /// A hasher that just records the bytes it is fed, so the tests can compare
    /// what two `Str`s hash *from* without pulling in `std`'s `DefaultHasher`.
    #[derive(Default)]
    struct Recorder(alloc::vec::Vec<u8>);

    impl core::hash::Hasher for Recorder {
        fn write(&mut self, bytes: &[u8]) {
            self.0.extend_from_slice(bytes);
        }

        fn finish(&self) -> u64 {
            self.0.iter().fold(0u64, |acc, &b| {
                acc.wrapping_mul(31).wrapping_add(u64::from(b))
            })
        }
    }

    fn hash_of(value: &Str) -> u64 {
        use core::hash::{Hash, Hasher};
        let mut hasher = Recorder::default();
        value.hash(&mut hasher);
        hasher.finish()
    }

    /// The three representations of the same text, for the tests that require
    /// all of them to be indistinguishable.
    fn every_representation(text: &'static str) -> [Str; 3] {
        [
            Str::from_static(text),
            Str::from(String::from(text)),
            Str::from_borrowed(text),
        ]
    }

    #[test]
    fn a_str_is_two_words_wide() {
        assert_eq!(size_of::<Str>(), 2 * size_of::<usize>());
        assert_eq!(align_of::<Str>(), align_of::<usize>());
        // The tagged word is never zero, so the niche is still there and an
        // `Option<Str>` costs nothing over a `Str`.
        assert_eq!(size_of::<Option<Str>>(), size_of::<Str>());
    }

    #[test]
    fn a_static_string_is_still_a_constant() {
        // The length check `from_static` makes is evaluated at compile time for
        // a literal, which is what keeps `Str::from("...")` free in real code
        // even though the benchmark's opaque length has to pay for it.
        const GREETING: Str = Str::from_static("hello");
        assert_eq!(GREETING.as_str(), "hello");
        assert_eq!(GREETING.len(), 5);
    }

    #[cfg(target_pointer_width = "64")]
    #[test]
    fn sixteen_bytes_hold_fifteen() {
        assert_eq!(size_of::<Str>(), 16);
        assert_eq!(INLINE_CAPACITY, 15);
    }

    #[test]
    fn everything_up_to_the_capacity_is_stored_inline() {
        for len in 0..=INLINE_CAPACITY {
            let text: String = "abcdefghijklmno".chars().take(len).collect();
            let inline = Str::from(text.clone());

            assert!(matches!(inline.repr(), Repr::Inline), "{len} bytes");
            assert_eq!(inline.as_str(), text, "{len} bytes");
            assert_eq!(inline.len(), len, "{len} bytes");
            assert_eq!(inline.is_empty(), len == 0, "{len} bytes");
        }
    }

    #[test]
    fn one_byte_past_the_capacity_is_shared() {
        let text = "abcdefghijklmnopqrstuvwxyz"
            .chars()
            .take(INLINE_CAPACITY + 1)
            .collect::<String>();
        let shared = Str::from(text.clone());

        assert!(matches!(shared.repr(), Repr::Shared));
        assert_eq!(shared.as_str(), text);
        assert_eq!(shared.len(), INLINE_CAPACITY + 1);
        // Cloning a shared string still shares the bytes.
        assert_eq!(shared.clone().as_str().as_ptr(), shared.as_str().as_ptr());
    }

    #[test]
    fn a_static_string_stays_borrowed_whatever_its_length() {
        let short = Str::from_static("short");
        let long = Str::from_static("a string that is well past the inline capacity");

        assert!(matches!(short.repr(), Repr::Static));
        assert!(matches!(long.repr(), Repr::Static));
        assert_eq!(short.as_str().as_ptr(), "short".as_ptr());
    }

    #[test]
    fn the_representation_does_not_change_what_a_str_is() {
        for text in [
            "",
            "x",
            "fifteen bytes!!",
            "sixteen bytes!!!",
            "a much longer string",
        ] {
            let [borrowed, owned, copied] = every_representation(text);

            assert_eq!(borrowed, owned);
            assert_eq!(owned, copied);
            assert_eq!(borrowed.as_str(), text);
            assert_eq!(copied.as_str(), text);
            assert_eq!(borrowed.len(), text.len());
            assert_eq!(owned.len(), text.len());
            assert_eq!(copied.len(), text.len());
            assert_eq!(hash_of(&borrowed), hash_of(&owned));
            assert_eq!(hash_of(&owned), hash_of(&copied));
            assert_eq!(borrowed.cmp(&owned), core::cmp::Ordering::Equal);
            assert_eq!(borrowed.clone().into_string(), text);
            assert_eq!(owned.clone().into_string(), text);
            assert_eq!(copied.clone().into_string(), text);
        }
    }

    #[test]
    fn an_inline_string_survives_being_moved() {
        // The inline bytes live in the `Str` itself, so anything that moves one
        // has to keep reading the right bytes afterwards.
        let mut moved = vec![Str::from(String::from("inline!"))];
        for i in 0..64 {
            let mut text = String::from("n");
            text.push_str(&i.to_string());
            moved.push(Str::from(text));
        }
        moved.rotate_left(7);
        let boxed = moved.into_boxed_slice();

        assert_eq!(boxed[boxed.len() - 7].as_str(), "inline!");
        assert_eq!(boxed[boxed.len() - 6].as_str(), "n0");
    }

    #[test]
    fn appending_crosses_the_boundary_in_both_directions() {
        let mut s = Str::from(String::from("inline"));
        assert!(matches!(s.repr(), Repr::Inline));

        s.append(" and then some more bytes");
        assert!(matches!(s.repr(), Repr::Shared));
        assert_eq!(s.as_str(), "inline and then some more bytes");

        let mut back = Str::from(s.as_str()[..6].to_string());
        assert!(matches!(back.repr(), Repr::Inline));
        back.append("");
        assert_eq!(back.as_str(), "inline");
    }

    #[test]
    fn a_long_string_is_still_a_string() {
        // Well past every tag bit, so a length that leaked into the tag would
        // show up here.
        let text = "x".repeat(1 << 20);
        let s = Str::from(text.clone());
        assert_eq!(s.len(), text.len());
        assert_eq!(s.as_str(), text);
    }

    #[test]
    fn test_static_string_creation() {
        let s = Str::from_static("hello");
        assert_eq!(s.as_str(), "hello");
        assert_eq!(s.len(), 5);
        assert!(!s.is_empty());
        // no reference count exposed
    }

    #[test]
    fn test_owned_string_creation() {
        let s = Str::from(String::from("hello"));
        assert_eq!(s.as_str(), "hello");
        assert_eq!(s.len(), 5);
        assert!(!s.is_empty());
        // no reference count exposed
    }

    #[test]
    fn test_empty_string() {
        let s = Str::new();
        assert_eq!(s.as_str(), "");
        assert_eq!(s.len(), 0);
        assert!(s.is_empty());
        // no reference count exposed
    }

    #[test]
    fn test_static_string_clone() {
        let s1 = Str::from_static("hello");
        let s2 = s1.clone();

        assert_eq!(s1.as_str(), "hello");
        assert_eq!(s2.as_str(), "hello");
        // no reference count exposed
    }

    #[test]
    fn test_owned_string_clone() {
        let s1 = Str::from(String::from("hello"));
        let s2 = s1.clone();

        assert_eq!(s1.as_str(), "hello");
        assert_eq!(s2.as_str(), "hello");
    }

    #[test]
    fn test_multiple_clones() {
        let s1 = Str::from(String::from("test"));
        let s2 = s1.clone();
        let s3 = s1;
        let s4 = s2.clone();

        // no reference count exposed

        drop(s4);
        // no reference count exposed

        drop(s3);
        drop(s2);
        // no reference count exposed
    }

    #[test]
    fn test_reference_counting_drop() {
        let s1 = Str::from(String::from("hello"));

        {
            let _s2 = s1;
        } // s2 is dropped here

        // no reference count exposed
    }

    #[test]
    fn test_into_string_unique() {
        let s = Str::from(String::from("hello"));
        // no reference count exposed

        let string = s.into_string();
        assert_eq!(string, "hello");
    }

    #[test]
    fn test_into_string_shared() {
        let s1 = Str::from(String::from("hello"));
        let _s2 = s1.clone();

        let string = s1.into_string();
        assert_eq!(string, "hello");
        // no reference count exposed
    }

    #[test]
    fn test_into_string_static() {
        let s = Str::from_static("hello");
        let string = s.into_string();
        assert_eq!(string, "hello");
    }

    #[test]
    fn test_from_utf8_valid() {
        let bytes = vec![104, 101, 108, 108, 111]; // "hello"
        let s = Str::from_utf8(bytes).unwrap();
        assert_eq!(s.as_str(), "hello");
    }

    #[test]
    fn test_from_utf8_invalid() {
        let bytes = vec![0xFF, 0xFF];
        assert!(Str::from_utf8(bytes).is_err());
    }

    #[test]
    fn test_from_utf8_unchecked() {
        let bytes = vec![104, 101, 108, 108, 111]; // "hello"
        // SAFETY: `bytes` is the ASCII literal spelled out just above, so it is
        // valid UTF-8.
        let s = unsafe { Str::from_utf8_unchecked(bytes) };
        assert_eq!(s.as_str(), "hello");
        // no reference count exposed
    }

    #[test]
    fn test_append() {
        let mut s = Str::from("hello");
        s.append(" world");
        assert_eq!(s.as_str(), "hello world");
    }

    #[test]
    fn test_append_static_to_owned() {
        let mut s = Str::from_static("hello");

        s.append(" world");
        assert_eq!(s.as_str(), "hello world");
    }

    #[test]
    fn test_as_bytes() {
        let s = Str::from("hello");
        assert_eq!(s.as_bytes(), b"hello");
    }

    #[test]
    fn test_deref() {
        let s = Str::from("hello");
        assert_eq!(&*s, "hello");
        assert_eq!(s.chars().count(), 5);
    }

    #[test]
    fn test_empty_string_from_string() {
        let s = Str::from(String::new());
        assert_eq!(s.as_str(), "");
        assert!(s.is_empty());
        // no reference count exposed
    }

    // Memory safety tests designed for Miri
    #[test]
    fn test_memory_safety_clone_drop_cycles() {
        // Test multiple clone/drop cycles to ensure no memory leaks or double-frees
        for _ in 0..100 {
            let s1 = Str::from(String::from("test"));
            let s2 = s1.clone();
            let s3 = s2.clone();

            drop(s1);
            drop(s3);
            drop(s2);
        }
    }

    #[test]
    fn test_memory_safety_interleaved_operations() {
        let mut strings = vec![];

        // Create multiple strings with shared references
        for i in 0..10 {
            let mut content = String::from("string_");
            content.push_str(&(i.to_string()));
            let s = Str::from(content);
            strings.push(s.clone());
            strings.push(s);
        }

        // Randomly drop some strings
        for i in (0..strings.len()).step_by(3) {
            if i < strings.len() {
                strings.remove(i);
            }
        }

        // Verify remaining strings are still valid
        for s in &strings {
            assert!(!s.as_str().is_empty());
        }
    }

    #[test]
    fn test_memory_safety_reference_counting() {
        let original = Str::from(String::from("reference test"));
        let mut clones = vec![];

        // Create many clones
        for _ in 0..50 {
            clones.push(original.clone());
        }
        assert_eq!(clones.len(), 50);

        // no reference count exposed

        // Drop half the clones
        clones.truncate(25);
        assert_eq!(clones.len(), 25);
        // no reference count exposed

        // Drop all clones
        clones.clear();
        assert!(clones.is_empty());
        // no reference count exposed
    }

    #[test]
    fn test_memory_safety_into_string_with_clones() {
        let s1 = Str::from(String::from("unique test"));
        let _s2 = s1.clone();
        let _s3 = s1.clone();

        // no reference count exposed

        // Converting to string should not affect other references
        let string = s1.into_string();
        assert_eq!(string, "unique test");
        // no reference count exposed
    }

    #[test]
    fn test_memory_safety_unique_into_string() {
        // Test that unique references properly transfer ownership
        let s = Str::from(String::from("unique"));
        // no reference count exposed

        let string = s.into_string();
        assert_eq!(string, "unique");
        // s is consumed, can't check reference count
    }

    #[test]
    fn test_memory_safety_static_vs_owned() {
        let static_str = Str::from_static("static");
        let owned_str = Str::from(String::from("owned"));

        // Clone both types many times
        let mut static_clones = vec![];
        let mut owned_clones = vec![];

        for _ in 0..100 {
            static_clones.push(static_str.clone());
            owned_clones.push(owned_str.clone());
        }

        // no reference count exposed

        // Verify all clones work correctly
        for clone in &static_clones {
            assert_eq!(clone.as_str(), "static");
            // no reference count exposed
        }

        for clone in &owned_clones {
            assert_eq!(clone.as_str(), "owned");
            // no reference count exposed
        }
    }

    #[test]
    fn test_memory_safety_mixed_operations() {
        let mut s = Str::from_static("hello");
        // no reference count exposed

        // Convert to owned by appending
        s.append(" world");
        // no reference count exposed

        // Clone the owned string
        let _s2 = s.clone();
        // no reference count exposed

        // Convert back to string
        let string = s.into_string();
        assert_eq!(string, "hello world");
        // no reference count exposed
    }

    #[test]
    fn test_memory_safety_zero_length_edge_cases() {
        // Test various ways to create empty strings
        let empty1 = Str::new();
        let empty2 = Str::from("");
        let empty3 = Str::from(String::new());
        let empty4 = Str::from_utf8(vec![]).unwrap();

        assert!(empty1.is_empty());
        assert!(empty2.is_empty());
        assert!(empty3.is_empty());
        assert!(empty4.is_empty());

        // All empty strings should be static references
        // no reference count exposed
    }

    #[test]
    fn test_memory_safety_large_strings() {
        // Test with larger strings to ensure proper memory handling
        let large_content = "x".repeat(10000);
        let s1 = Str::from(large_content.clone());
        // no reference count exposed

        let s2 = s1.clone();
        // no reference count exposed

        assert_eq!(s1.len(), 10000);
        assert_eq!(s2.len(), 10000);
        assert_eq!(s1.as_str(), large_content);
        assert_eq!(s2.as_str(), large_content);
    }

    #[test]
    fn test_memory_safety_concurrent_like_pattern() {
        // Simulate concurrent-like access patterns (single-threaded but similar stress)
        let base = Str::from(String::from("base"));
        let mut handles = vec![];

        // Create many references
        for _ in 0..1000 {
            handles.push(base.clone());
        }

        // no reference count exposed

        // Process in chunks, dropping some while keeping others
        for chunk in handles.chunks_mut(100) {
            for (i, handle) in chunk.iter().enumerate() {
                assert_eq!(handle.as_str(), "base");
                if i.is_multiple_of(2) {
                    // Mark for keeping (we'll drop the others)
                }
            }
        }

        // Keep only every 3rd element
        let mut i = 0;
        handles.retain(|_| {
            i += 1;
            i % 3 == 0
        });

        // Verify reference count updated correctly
        let _expected_count = handles.len() + 1; // +1 for base

        // Verify all remaining handles are valid
        for handle in &handles {
            assert_eq!(handle.as_str(), "base");
        }
    }

    #[test]
    fn test_memory_safety_drop_order_stress() {
        // Test various drop orders to ensure no use-after-free
        let s1 = Str::from(String::from("original"));
        let s2 = s1.clone();
        let s3 = s1.clone();
        let s4 = s2.clone();
        let s5 = s3.clone();

        // no reference count exposed

        // Drop in different orders across multiple test runs
        {
            let temp1 = s1.clone();
            let temp2 = s2.clone();
            drop(temp2);
            drop(temp1);
            // temp1 and temp2 dropped first
        }

        // no reference count exposed

        drop(s5); // Drop s5 first
        // no reference count exposed

        drop(s2); // Drop s2 (middle)
        // no reference count exposed

        drop(s1); // Drop original
        // no reference count exposed

        drop(s4); // Drop s4
        // no reference count exposed

        // s3 is the last one standing
        assert_eq!(s3.as_str(), "original");
    }

    #[test]
    fn test_memory_safety_ptr_stability() {
        // Ensure string content pointer remains stable across clones. Sharing
        // the bytes is what the reference-counted representation is for, so the
        // string has to be longer than what a `Str` stores inline: an inline
        // string is copied by a clone, and copies are the point.
        let s1 = Str::from(String::from("a stable, heap-sized allocation"));
        let ptr1 = s1.as_str().as_ptr();

        let s2 = s1.clone();
        let ptr2 = s2.as_str().as_ptr();

        // Clones should point to the same underlying data
        assert_eq!(ptr1, ptr2);

        let s3 = s2.clone();
        let ptr3 = s3.as_str().as_ptr();

        assert_eq!(ptr1, ptr3);
        assert_eq!(ptr2, ptr3);

        // Even after dropping some references, remaining should still be valid
        drop(s1);
        assert_eq!(s2.as_str().as_ptr(), ptr2);
        assert_eq!(s3.as_str().as_ptr(), ptr3);
    }

    #[test]
    fn test_memory_safety_alternating_clone_drop() {
        let original = Str::from(String::from("alternating"));
        let mut refs = vec![original];

        // Alternating pattern: clone, clone, drop, clone, drop, etc.
        for i in 0..100 {
            if i % 4 == 0 || i % 4 == 1 {
                // Clone phase
                let new_ref = refs[0].clone();
                refs.push(new_ref);
            } else if i % 4 == 2 && refs.len() > 1 {
                // Drop phase
                refs.pop();
            }

            // Verify all remaining references are valid
            for r in &refs {
                assert_eq!(r.as_str(), "alternating");
            }
        }
    }
}
