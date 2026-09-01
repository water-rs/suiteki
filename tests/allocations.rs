//! Pins how many allocations each construction path is allowed to make.
//!
//! The whole point of `Str` is which of these numbers are zero: a static string
//! never reaches the allocator, and an owned one reaches it exactly once, for
//! the reference-counted box. Clones never allocate at all. Those are claims
//! about behaviour, not about wall-clock time, so they belong in a test rather
//! than in the benchmarks — and they are the baseline any future small-string
//! optimization has to move deliberately rather than by accident.

use std::alloc::{GlobalAlloc, Layout, System};
use std::hint::black_box;
use std::sync::atomic::{AtomicUsize, Ordering};

use suiteki::Str;

static ALLOCATIONS: AtomicUsize = AtomicUsize::new(0);

/// `System`, plus a counter on the allocating half of the interface.
struct Counting;

// SAFETY: every method forwards to `System` with the arguments it was given and
// returns exactly what `System` returned, so the allocator contract is upheld by
// `System` itself. The counter is a relaxed atomic add with no bearing on it.
unsafe impl GlobalAlloc for Counting {
    unsafe fn alloc(&self, layout: Layout) -> *mut u8 {
        ALLOCATIONS.fetch_add(1, Ordering::Relaxed);
        // SAFETY: `layout` is forwarded unchanged from our own caller, which is
        // bound by the same contract.
        unsafe { System.alloc(layout) }
    }

    unsafe fn alloc_zeroed(&self, layout: Layout) -> *mut u8 {
        ALLOCATIONS.fetch_add(1, Ordering::Relaxed);
        // SAFETY: as above.
        unsafe { System.alloc_zeroed(layout) }
    }

    unsafe fn realloc(&self, ptr: *mut u8, layout: Layout, new_size: usize) -> *mut u8 {
        ALLOCATIONS.fetch_add(1, Ordering::Relaxed);
        // SAFETY: `ptr` and `layout` describe a block this allocator handed out
        // through `System`, forwarded unchanged.
        unsafe { System.realloc(ptr, layout, new_size) }
    }

    unsafe fn dealloc(&self, ptr: *mut u8, layout: Layout) {
        // SAFETY: as above; freeing is not counted.
        unsafe { System.dealloc(ptr, layout) }
    }
}

#[global_allocator]
static ALLOCATOR: Counting = Counting;

/// Counts the allocations `f` makes.
///
/// The counter is process-global, so everything measured here lives in one test
/// function: two of these running on different threads would count each other's
/// allocations.
fn allocations_during<T>(f: impl FnOnce() -> T) -> (usize, T) {
    let before = ALLOCATIONS.load(Ordering::Relaxed);
    let value = f();
    let after = ALLOCATIONS.load(Ordering::Relaxed);
    (after - before, value)
}

#[test]
fn construction_allocates_only_where_it_has_to() {
    // The first allocation in a process can be the runtime's rather than ours.
    drop(black_box(String::from("warm the allocator up")));

    let (from_static, kept) = allocations_during(|| Str::from(black_box("a static string")));
    drop(kept);

    let owned = String::from("an owned string");
    let (from_string, kept) = allocations_during(|| Str::from(black_box(owned)));

    let (clone_owned, clones) = allocations_during(|| (kept.clone(), kept.clone()));
    drop(clones);

    let static_str = Str::from("a static string");
    let (clone_static, clone) = allocations_during(|| static_str.clone());
    drop(clone);

    let (from_empty_string, empty) = allocations_during(|| Str::from(black_box(String::new())));
    drop(empty);

    let (into_string_unique, string) = allocations_during(|| kept.into_string());
    drop(string);

    assert_eq!(
        from_static, 0,
        "a static string must not reach the allocator"
    );
    assert_eq!(from_string, 1, "an owned string allocates its shared box");
    assert_eq!(clone_owned, 0, "cloning an owned string bumps a counter");
    assert_eq!(clone_static, 0, "cloning a static string copies a pointer");
    assert_eq!(
        from_empty_string, 0,
        "an empty string takes the static representation"
    );
    assert_eq!(
        into_string_unique, 0,
        "the last reference hands its `String` back without copying"
    );
}
