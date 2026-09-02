use core::cell::Cell;

use alloc::string::String;

// Only for `std::process::abort`, which is the shortest hard stop this crate
// can reach on a target that has the standard library at all.
#[cfg(feature = "std")]
extern crate std;

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
/// [`Shared::decrement_count`] panics rather than absorbing it. An increment
/// past [`usize::MAX`] is the same hazard from the other end — the count would
/// wrap back through zero — and [`Shared::increment_count`] ends the process
/// rather than absorb that.
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
    /// A count standing at [`usize::MAX`] ends the process rather than wrap:
    /// a wrapped count runs back down through zero, and the owner that reaches
    /// zero first reclaims an allocation the other owners still describe, so
    /// wrapping trades a count that cannot be represented for a use-after-free.
    /// There is no value left to return either — the count that was asked for
    /// does not exist — which is why this is a stop rather than an error.
    /// [`alloc::rc::Rc`] guards the same hazard the same way.
    ///
    /// # Safety
    ///
    /// The caller must already own an unreleased count on this `Shared`, which
    /// is what proves the allocation is live. The count this call creates must
    /// be handed to exactly one new `Str`, which will release it exactly once.
    ///
    /// `Str::clone` upholds this: it reaches the `Shared` through a `Str` that
    /// owns a count, and gives the new count to the `Str` it returns.
    pub unsafe fn increment_count(&self) {
        let Some(taken) = self.count.get().checked_add(1) else {
            reference_count_overflow()
        };
        self.count.set(taken);
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

/// What both build shapes say on the way out.
const OVERFLOW_MESSAGE: &str =
    "`Shared` reference count overflow: more counts were taken than a `usize` can hold";

/// Ends the process, because a reference count was asked to pass
/// [`usize::MAX`].
///
/// Kept out of line and marked cold so the check costs
/// [`Shared::increment_count`] a branch that is never taken and nothing else,
/// which is the shape `Rc` gives the same guard.
///
/// The two build shapes reach the same stop by different routes. With `std`
/// there is `std::process::abort` to call. Without it there is no `abort` in
/// `core` that stable Rust may call — `core::intrinsics::abort` is unstable —
/// so this panics with a live panic already in flight, which the language
/// turns into an abort with no unwinding past it. A `no_std` build compiled
/// with `panic = "abort"`, which is the usual choice on the targets that have
/// no `std`, has already aborted at the first panic and never reaches the
/// second.
#[cold]
#[inline(never)]
fn reference_count_overflow() -> ! {
    #[cfg(feature = "std")]
    {
        use std::io::Write as _;

        // The abort itself says nothing, and a bare `SIGABRT` is a poor account
        // of what happened. Stderr is unbuffered, so the message is out before
        // the process ends; a write that fails cannot be handled on the way out
        // and is dropped rather than turned into a second failure.
        let _ = writeln!(std::io::stderr(), "{OVERFLOW_MESSAGE}");
        std::process::abort()
    }

    #[cfg(not(feature = "std"))]
    {
        /// Panics from its own `Drop`, so the panic below runs into a second
        /// panic while unwinding rather than escaping this function.
        struct PanicOnUnwind;

        impl Drop for PanicOnUnwind {
            fn drop(&mut self) {
                panic!("{OVERFLOW_MESSAGE}");
            }
        }

        let _abort_on_unwind = PanicOnUnwind;
        panic!("{OVERFLOW_MESSAGE}");
    }
}

#[cfg(test)]
mod tests {
    use super::Shared;
    use alloc::string::{String, ToString};

    // The test harness links the standard library whatever the crate's own
    // features say, which is what lets the abort below be watched from a child
    // process even in a build where the crate itself has no `std`.
    extern crate std;

    use std::{env, process::Command, string::String as StdString};

    /// Set in the child process the overflow test spawns, telling it to run the
    /// guard rather than spawn a child of its own.
    const RUN_GUARD: &str = "SUITEKI_TEST_RUN_REFERENCE_COUNT_OVERFLOW_GUARD";

    /// The name the harness knows the overflow test by, so the child can be
    /// asked for that one test and nothing else.
    const GUARD_TEST: &str = "shared::tests::taking_a_count_past_usize_max_ends_the_process";

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

    /// The guard ends the process, so it cannot be watched from inside the
    /// process it ends: this test runs itself again as a child, marked by
    /// [`RUN_GUARD`], and reads the child's exit status. The child stands the
    /// count at [`usize::MAX`] directly — reaching it by taking counts one at a
    /// time would mean `usize::MAX` calls — and the only way out of the child
    /// that does not end the process is the successful exit below, which is
    /// therefore what "the count wrapped instead" looks like from here.
    #[test]
    #[cfg_attr(miri, ignore = "Miri cannot spawn the child process this test watches")]
    fn taking_a_count_past_usize_max_ends_the_process() {
        if env::var_os(RUN_GUARD).is_some() {
            let shared = Shared::new("a string long enough to be shared".to_string());

            // `count` belongs to this module's parent, so the test can stand it
            // at the edge itself rather than the crate carrying a method whose
            // only caller is this line.
            shared.count.set(usize::MAX);

            // SAFETY: `shared` is live and the count `Shared::new` handed out is
            // still held here. No `Str` takes the count this call asks for,
            // because the call is not expected to return at all — that it does
            // not is what the parent process asserts.
            unsafe { shared.increment_count() };

            // Reached only if the guard let the count wrap, which is the
            // failure this test exists to catch. Every other way out of this
            // process is an abort, so a clean exit is how the child reports it.
            std::process::exit(0);
        }

        let exe = env::current_exe().expect("the test binary must have a path");
        let child = Command::new(exe)
            .args([GUARD_TEST, "--exact"])
            .env(RUN_GUARD, "1")
            .output()
            .expect("the test binary must be runnable as a child process");
        // The two build shapes account for themselves through different
        // streams: with `std` the guard writes to stderr itself, while without
        // it the guard panics and the child's own harness captures that onto
        // its stdout. Reading both is what lets one assertion cover both.
        let mut said = StdString::from_utf8_lossy(&child.stdout).into_owned();
        said.push_str(&StdString::from_utf8_lossy(&child.stderr));

        assert!(
            !child.status.success(),
            "taking a count past `usize::MAX` let the count wrap instead of ending the process: {said}"
        );

        assert!(
            said.contains("reference count overflow"),
            "the child ended without saying why, so the guard is not what stopped it: {said}"
        );

        // A child that merely failed a test would have unwound and exited with
        // a status of its own; an aborted one is killed by a signal instead,
        // which is what tells "the guard fired" from "something else went
        // wrong". Windows has no signals to read, so there the exit status
        // above is the whole answer.
        #[cfg(unix)]
        {
            use std::os::unix::process::ExitStatusExt;

            assert!(
                child.status.signal().is_some(),
                "the child ended without being aborted, so the guard is not what stopped it: {said}"
            );
        }
    }
}
