//! Pins how many allocations each construction path is allowed to make.
//!
//! The whole point of `Str` is which of these numbers are zero: a string that
//! fits inline never reaches the allocator at all, a static string never
//! reaches it either, and a longer owned one reaches it exactly once, for the
//! reference-counted box. Clones, comparisons, hashes and derefs never allocate
//! whatever the representation. Those are claims about behaviour, not about
//! wall-clock time, so they belong in a test rather than in the benchmarks —
//! and they are what keeps the small-string optimization from being undone by
//! accident.

use std::alloc::{GlobalAlloc, Layout, System};
use std::collections::hash_map::DefaultHasher;
use std::hash::{Hash, Hasher};
use std::hint::black_box;
use std::ops::Deref;
use std::str::FromStr;
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

    let owned = String::from("an owned string, too long to fit inline");
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

    // Not a `#[test]` of its own: the counter is process-global and the harness
    // would run two tests on two threads at once.
    #[cfg(target_pointer_width = "64")]
    short_strings_never_reach_the_allocator();
}

/// What one string cost, on every path that has an opinion about allocation.
#[derive(Debug)]
struct Counts {
    from_string: usize,
    from_borrowed: usize,
    clone: usize,
    compare: usize,
    hash: usize,
    deref: usize,
}

/// Measures every one of those paths for `text`.
///
/// The `String` and the `&str` the constructors are handed are built outside
/// the measured region, so what is counted is what `Str` itself does.
fn counts_for(text: &str) -> Counts {
    let source = String::from(text);

    let (from_string, value) = allocations_during(|| Str::from(black_box(source)));
    let (from_borrowed, parsed) = allocations_during(|| Str::from_str(black_box(text)).unwrap());
    let (clone, cloned) = allocations_during(|| black_box(&value).clone());
    let (compare, equal) = allocations_during(|| black_box(&value) == black_box(&parsed));
    let (hash, _) = allocations_during(|| {
        let mut hasher = DefaultHasher::new();
        black_box(&value).hash(&mut hasher);
        hasher.finish()
    });
    let (deref, length) = allocations_during(|| black_box(&value).deref().len());

    assert!(equal, "the two constructions disagree about {text:?}");
    assert_eq!(
        length,
        text.len(),
        "the deref of {text:?} is the wrong length"
    );
    drop((value, parsed, cloned));

    Counts {
        from_string,
        from_borrowed,
        clone,
        compare,
        hash,
        deref,
    }
}

/// The small-string optimization, as a claim about the allocator.
///
/// Fifteen bytes is the inline capacity of a two-word `Str` on a 64-bit target;
/// on a 32-bit one the same reasoning holds at seven, so the exact numbers are
/// only asserted where they are the right ones.
#[cfg(target_pointer_width = "64")]
fn short_strings_never_reach_the_allocator() {
    for text in ["", "x", "fifteen bytes!!"] {
        assert!(text.len() <= 15, "{text:?} is not a short string");
        let counts = counts_for(text);
        assert_eq!(
            counts.from_string,
            0,
            "a {}-byte string fits inline: {counts:?}",
            text.len()
        );
        assert_eq!(
            counts.from_borrowed, 0,
            "and so does a copy of one: {counts:?}"
        );
        assert_eq!(
            counts.clone, 0,
            "cloning inline bytes copies them: {counts:?}"
        );
        assert_eq!(counts.compare, 0, "comparing reads bytes: {counts:?}");
        assert_eq!(counts.hash, 0, "hashing reads bytes: {counts:?}");
        assert_eq!(counts.deref, 0, "and so does a deref: {counts:?}");
    }

    // One byte past the inline capacity, the shared box appears — once.
    let counts = counts_for("sixteen bytes!!!");
    assert_eq!(
        counts.from_string, 1,
        "sixteen bytes allocate the shared box: {counts:?}"
    );
    assert_eq!(
        counts.from_borrowed, 2,
        "from a borrowed `&str`, the `String` it is copied into as well: {counts:?}"
    );
    assert_eq!(
        counts.clone, 0,
        "cloning a shared string bumps a counter: {counts:?}"
    );
    assert_eq!(counts.compare, 0, "comparing reads bytes: {counts:?}");
    assert_eq!(counts.hash, 0, "hashing reads bytes: {counts:?}");
    assert_eq!(counts.deref, 0, "and so does a deref: {counts:?}");
}
