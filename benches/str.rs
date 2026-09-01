//! Benchmarks for every operation whose cost depends on how a `Str` is stored.
//!
//! The byte lengths bracket the 15-byte boundary a small-string optimization
//! would introduce: 0, 7 and 15 bytes fit inline in a two-word `Str`, 16 does
//! not, and the rest establish how each path scales once the string is clearly
//! heap-sized. Keeping all eight lengths in the trend series is what makes a
//! future SSO visible as a step at 15/16 rather than a uniform shift.

use std::collections::hash_map::DefaultHasher;
use std::hash::{Hash, Hasher};
use std::hint::black_box;
use std::str::FromStr;
use std::time::Duration;

use criterion::measurement::WallTime;
use criterion::{
    BatchSize, Bencher, BenchmarkId, Criterion, Throughput, criterion_group, criterion_main,
};
use suiteki::Str;

/// Byte lengths every group is measured at.
const LENGTHS: [usize; 8] = [0, 7, 15, 16, 31, 64, 256, 4096];

/// The bytes the pool cycles through.
const ALPHABET: &[u8; 26] = b"abcdefghijklmnopqrstuvwxyz";

/// Backing bytes for every string used here, so that a `&'static str` of any
/// measured length is a subslice rather than a literal in the source.
static POOL_BYTES: [u8; 4096] = {
    let mut bytes = [0u8; 4096];
    let mut i = 0;
    while i < bytes.len() {
        bytes[i] = ALPHABET[i % ALPHABET.len()];
        i += 1;
    }
    bytes
};

/// The pool as a string. Every byte is a lowercase letter, so this cannot fail.
static POOL: &str = match str::from_utf8(&POOL_BYTES) {
    Ok(pool) => pool,
    Err(_) => panic!("the pool is ASCII by construction"),
};

/// A `&'static str` of exactly `len` bytes.
fn static_str(len: usize) -> &'static str {
    &POOL[..len]
}

/// Runs one routine at every measured length, as a single named group.
///
/// Throughput is only set where there are bytes to move: criterion divides by
/// the byte count, which the empty string would make a division by zero, so the
/// zero-length point is reported as a time alone.
fn bench_lengths(
    c: &mut Criterion,
    name: &str,
    mut routine: impl FnMut(&mut Bencher<'_, WallTime>, usize),
) {
    let mut group = c.benchmark_group(name);
    for len in LENGTHS {
        if len > 0 {
            group.throughput(Throughput::Bytes(len as u64));
        }
        group.bench_with_input(BenchmarkId::from_parameter(len), &len, |b, &len| {
            routine(b, len);
        });
    }
    group.finish();
}

fn construction(c: &mut Criterion) {
    bench_lengths(c, "str/from_static", |b, len| {
        b.iter(|| Str::from(black_box(static_str(len))));
    });

    bench_lengths(c, "str/from_string", |b, len| {
        let source = String::from(static_str(len));
        b.iter_batched(
            || source.clone(),
            |owned| Str::from(black_box(owned)),
            BatchSize::SmallInput,
        );
    });

    bench_lengths(c, "str/from_borrowed", |b, len| {
        let borrowed = String::from(static_str(len));
        b.iter(|| Str::from_str(black_box(borrowed.as_str())).unwrap());
    });
}

fn clone(c: &mut Criterion) {
    bench_lengths(c, "str/clone_static", |b, len| {
        let value = Str::from(static_str(len));
        b.iter(|| black_box(&value).clone());
    });

    bench_lengths(c, "str/clone_owned", |b, len| {
        let value = Str::from(String::from(static_str(len)));
        b.iter(|| black_box(&value).clone());
    });
}

fn access(c: &mut Criterion) {
    bench_lengths(c, "str/as_str", |b, len| {
        let value = Str::from(String::from(static_str(len)));
        b.iter(|| {
            let slice = black_box(&value).as_str();
            slice.len() + usize::from(slice.as_bytes().last().copied().unwrap_or(0))
        });
    });

    bench_lengths(c, "str/eq", |b, len| {
        let left = Str::from(String::from(static_str(len)));
        let right = Str::from(String::from(static_str(len)));
        b.iter(|| black_box(&left) == black_box(&right));
    });

    bench_lengths(c, "str/hash", |b, len| {
        let value = Str::from(String::from(static_str(len)));
        b.iter(|| {
            let mut hasher = DefaultHasher::new();
            black_box(&value).hash(&mut hasher);
            hasher.finish()
        });
    });

    bench_lengths(c, "str/to_string", |b, len| {
        let value = Str::from(String::from(static_str(len)));
        b.iter(|| black_box(&value).to_string());
    });
}

criterion_group! {
    name = benches;
    // Every measurement here is a handful of nanoseconds, so criterion's
    // default 3s warm-up and 5s measurement collect millions of samples per
    // point. A second and two seconds still collect far more than the
    // statistics need, and turn a twenty-minute suite into a four-minute one.
    config = Criterion::default()
        .warm_up_time(Duration::from_secs(1))
        .measurement_time(Duration::from_secs(2));
    targets = construction, clone, access
}
criterion_main!(benches);
