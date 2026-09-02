use core::cell::Cell;

use alloc::string::String;

/// The heap allocation behind a shared `Str`: the bytes, and a count of how
/// many `Str`s currently describe them.
///
/// A `Shared` is created by `Str::from_string`, which leaks it into a `Box` and
/// keeps the pointer. Every `Str` that points at it owns exactly one of its
/// counts: `Clone` takes one more, `Drop` and `into_string` release the one
/// they own, and whichever owner finds itself unique reclaims the box instead
/// of releasing. The count therefore never reaches zero in a correct program —
/// it stands at one when the last owner takes the allocation back — so a
/// decrement that would take it below zero is a double release, and
/// [`Shared::decrement_count`] panics rather than absorbing it.
///
/// The count is a plain [`Cell`]: `Str` holds a [`core::ptr::NonNull`] and so
/// is neither `Send` nor `Sync`, and every count is taken and released on the
/// one thread that owns the `Str`s.
#[derive(Debug)]
pub struct Shared {
    data: String,
    count: Cell<usize>,
}

impl Default for Shared {
    fn default() -> Self {
        Self::new(String::new())
    }
}

impl Shared {
    /// Wraps `data` in a fresh allocation whose count is one: the single count
    /// the caller owns and is responsible for releasing or reclaiming.
    pub const fn new(data: String) -> Self {
        Self {
            data,
            count: Cell::new(1),
        }
    }

    // Internal: do not expose reference count publicly.
    const fn reference_count(&self) -> usize {
        self.count.get()
    }

    /// The bytes this `Shared` owns.
    ///
    /// # Safety
    ///
    /// At least one count on this `Shared` must remain unreleased for the whole
    /// life of the returned `&str`, so that the allocation cannot be reclaimed
    /// while the borrow is live. The returned lifetime is inferred from
    /// `&self`, which for a `Shared` reached through a raw pointer is whatever
    /// the caller asks for; it is the surviving count, not the borrow checker,
    /// that keeps the bytes alive.
    ///
    /// `Str::as_str` upholds this by borrowing through a `Str` that still owns
    /// its own count. `Str::into_string` upholds it in the non-unique branch:
    /// it releases only the count that `Str` owned, and it took that branch
    /// because the count was greater than one, so at least one other owner is
    /// left behind.
    pub const unsafe fn as_str(&self) -> &str {
        self.data.as_str()
    }

    /// Whether the caller's count is the only one left, and the allocation is
    /// therefore theirs to reclaim.
    pub const fn is_unique(&self) -> bool {
        self.reference_count() == 1
    }

    /// Moves the bytes out, consuming the allocation.
    ///
    /// # Safety
    ///
    /// The caller must own the last count — [`Shared::is_unique`] must have
    /// answered `true` — and must have taken the leaked allocation back with
    /// `Box::from_raw`, so that this `Shared` is moved out of a box it now
    /// owns. No other `Str` may describe these bytes, and the caller's own
    /// count must not also be released: taking the allocation *is* how that
    /// count ends.
    ///
    /// `Str::into_string` upholds this in the unique branch, where `self` is
    /// held in a [`core::mem::ManuallyDrop`] so `Drop` cannot release the same
    /// count afterwards.
    pub unsafe fn take(self) -> String {
        self.data
    }

    /// Takes one more count on this `Shared`.
    ///
    /// # Safety
    ///
    /// The caller must already own an unreleased count on this `Shared`, which
    /// is what proves the allocation is live. The count this call creates must
    /// be handed to exactly one new `Str`, which will release it exactly once.
    /// The count must not already stand at [`usize::MAX`].
    ///
    /// `Str::clone` upholds this: it reaches the `Shared` through a `Str` that
    /// owns a count, and gives the new count to the `Str` it returns.
    pub unsafe fn increment_count(&self) {
        self.count.set(self.count.get() + 1);
    }

    /// Releases one count on this `Shared`.
    ///
    /// # Safety
    ///
    /// The caller must own an unreleased count on a live `Shared`, and this
    /// call releases exactly that one: the caller must not release it again,
    /// and must not reach the `Shared` through it afterwards. The caller must
    /// not be the last owner either — freeing the allocation is the unique
    /// owner's job, done by reclaiming the leaked box, and this call never
    /// frees anything.
    ///
    /// `Str::drop` and `Str::into_string` uphold this by asking
    /// [`Shared::is_unique`] first and releasing only in the `false` branch.
    ///
    /// # Panics
    ///
    /// Panics if there is no count left to release. Reaching zero means some
    /// count was released twice, which is a bug in the caller; the count is
    /// checked rather than saturated so that the double release fails here
    /// instead of surfacing later as a use-after-free.
    pub unsafe fn decrement_count(&self) {
        let count = self.count.get();
        let remaining = count.checked_sub(1).expect(
            "`Shared` reference count underflow: a count was released twice (double release)",
        );
        self.count.set(remaining);
    }
}

#[cfg(test)]
mod tests {
    use super::Shared;
    use alloc::string::{String, ToString};

    #[test]
    fn a_taken_count_can_be_released() {
        let shared = Shared::new("a string long enough to be shared".to_string());
        assert!(shared.is_unique());

        // SAFETY: `shared` is live and the count `Shared::new` handed out is
        // still held here, which is what `increment_count` requires; the
        // release below is of that second count, taken a line earlier and not
        // released anywhere else, and it leaves the original owner behind as
        // `decrement_count` requires.
        unsafe {
            shared.increment_count();
            assert!(!shared.is_unique());
            shared.decrement_count();
        }

        assert!(shared.is_unique());
    }

    #[test]
    #[should_panic(expected = "reference count underflow")]
    fn releasing_a_count_twice_panics() {
        let shared = Shared::new(String::from("a string long enough to be shared"));

        // SAFETY: `shared` is live and this releases the one count
        // `Shared::new` handed out, which nothing else has released.
        unsafe { shared.decrement_count() };

        // SAFETY: the allocation is still live and this call only reads and
        // writes its count. Releasing a count that is no longer held is exactly
        // the contract violation under test: `decrement_count` must report it
        // rather than silently leave the count at zero.
        unsafe { shared.decrement_count() };
    }
}
