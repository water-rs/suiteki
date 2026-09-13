use core::fmt;
use core::{
    cmp::Ordering,
    convert::Infallible,
    fmt::Display,
    hash::{Hash, Hasher},
    ops::{Add, AddAssign, Deref, Index},
    slice::SliceIndex,
    str::FromStr,
};

use alloc::string::String;

use crate::Str;

impl Hash for Str {
    fn hash<H: Hasher>(&self, state: &mut H) {
        self.deref().hash(state);
    }
}

impl PartialEq for Str {
    #[inline]
    fn eq(&self, other: &Self) -> bool {
        let left = self.as_str();
        let right = other.as_str();
        left.len() == right.len() && (core::ptr::eq(left.as_ptr(), right.as_ptr()) || left == right)
    }
}

impl PartialEq<&str> for Str {
    fn eq(&self, other: &&str) -> bool {
        self.deref().eq(*other)
    }
}

impl PartialEq<str> for Str {
    fn eq(&self, other: &str) -> bool {
        self.deref().eq(other)
    }
}

impl PartialEq<String> for Str {
    fn eq(&self, other: &String) -> bool {
        self.deref().eq(other)
    }
}

impl PartialEq<Str> for &str {
    fn eq(&self, other: &Str) -> bool {
        (*self).eq(&**other)
    }
}

impl PartialEq<Str> for str {
    fn eq(&self, other: &Str) -> bool {
        self.eq(&**other)
    }
}

impl PartialEq<Str> for String {
    fn eq(&self, other: &Str) -> bool {
        self.eq(&**other)
    }
}

impl<I: SliceIndex<str>> Index<I> for Str {
    type Output = <I as SliceIndex<str>>::Output;
    fn index(&self, index: I) -> &Self::Output {
        self.deref().index(index)
    }
}

impl FromStr for Str {
    type Err = Infallible;

    /// Copies the string, inline when it fits.
    #[inline]
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        Ok(Self::from_borrowed(s))
    }
}

impl<S: AsRef<str>> FromIterator<S> for Str {
    fn from_iter<T: IntoIterator<Item = S>>(iter: T) -> Self {
        let mut value = Self::new();
        value.extend_parts(iter);
        value
    }
}

impl Eq for Str {}

impl PartialOrd for Str {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

impl Ord for Str {
    fn cmp(&self, other: &Self) -> Ordering {
        self.deref().cmp(&**other)
    }
}

impl Display for Str {
    #[inline]
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let text = self.as_str();
        if f.width().is_none() && f.precision().is_none() {
            f.write_str(text)
        } else {
            f.pad(text)
        }
    }
}

/// Prints the string, the way every other string type does.
///
/// The derived implementation exposed the tagged representation instead — a
/// raw pointer and a length that is negative whenever the string is owned — so
/// `{:?}` on a `Str` produced `Str { ptr: .., len: -9 }`. That is unreadable
/// where `Debug` matters most: assertion failures, tracing fields, and the
/// `{:?}` of any type holding one.
impl fmt::Debug for Str {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt::Debug::fmt(&**self, f)
    }
}

impl<'a> Extend<&'a str> for Str {
    fn extend<T: IntoIterator<Item = &'a str>>(&mut self, iter: T) {
        self.extend_parts(iter);
    }
}

impl Extend<String> for Str {
    fn extend<T: IntoIterator<Item = String>>(&mut self, iter: T) {
        self.extend_parts(iter);
    }
}

impl Extend<Self> for Str {
    fn extend<T: IntoIterator<Item = Self>>(&mut self, iter: T) {
        self.extend_parts(iter);
    }
}

impl<T> Add<T> for &Str
where
    T: AsRef<str>,
{
    type Output = Str;
    fn add(self, rhs: T) -> Self::Output {
        self.clone().add(rhs)
    }
}

impl<T> Add<T> for Str
where
    T: AsRef<str>,
{
    type Output = Self;
    fn add(mut self, rhs: T) -> Self::Output {
        self.append(rhs);
        self
    }
}

impl<T> AddAssign<T> for Str
where
    T: AsRef<str>,
{
    fn add_assign(&mut self, rhs: T) {
        self.append(rhs);
    }
}

#[cfg(feature = "serde")]
mod serde {
    use core::fmt;
    use core::ops::Deref;

    use super::Str;
    use alloc::string::String;
    use serde::{Deserialize, Deserializer, Serialize, de::Visitor};
    struct StrVisitor;

    impl Serialize for Str {
        fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: serde::Serializer,
        {
            self.deref().serialize(serializer)
        }
    }

    impl Visitor<'_> for StrVisitor {
        type Value = Str;

        fn expecting(&self, formatter: &mut fmt::Formatter) -> fmt::Result {
            formatter.write_str("a string")
        }

        fn visit_str<E>(self, v: &str) -> Result<Self::Value, E> {
            Ok(Str::from_borrowed(v))
        }

        fn visit_string<E>(self, v: String) -> Result<Self::Value, E> {
            Ok(v.into())
        }
    }

    impl<'de> Deserialize<'de> for Str {
        fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
        where
            D: Deserializer<'de>,
        {
            deserializer.deserialize_string(StrVisitor)
        }
    }
}
