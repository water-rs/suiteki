//! Benchmarks for every operation whose cost depends on how a `Str` is stored.
//!
//! The byte lengths bracket the 15-byte inline boundary: 0, 7 and 15 bytes fit
//! inline in a two-word `Str`, 16 and 17 do not, and the rest establish how
//! each path scales once the string is clearly heap-sized. Keeping all nine
//! lengths in the trend series is what makes the small-string optimization
//! visible as a step at 15/16 rather than a uniform shift.

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
const LENGTHS: [usize; 9] = [0, 7, 15, 16, 17, 31, 64, 256, 4096];

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

fn ownership(c: &mut Criterion) {
    bench_lengths(c, "str/from_string_lifecycle", |b, len| {
        let source = String::from(static_str(len));
        b.iter_batched(
            || source.clone(),
            |owned| drop(black_box(Str::from(black_box(owned)))),
            BatchSize::SmallInput,
        );
    });
    bench_lengths(c, "str/into_string_unique", |b, len| {
        let source = String::from(static_str(len));
        b.iter_batched(
            || Str::from(source.clone()),
            |owned| black_box(owned).into_string(),
            BatchSize::SmallInput,
        );
    });
    bench_lengths(c, "str/append_repeated", |b, len| {
        let source = String::from(static_str(len));
        b.iter_batched(
            || Str::from(source.clone()),
            |mut owned| {
                for _ in 0..8 {
                    owned.append(black_box("x"));
                }
                black_box(owned)
            },
            BatchSize::SmallInput,
        );
    });
    bench_lengths(c, "str/append_copied", |b, len| {
        let source = String::from(static_str(len));
        b.iter_batched(
            || Str::from_str(source.as_str()).unwrap(),
            |mut value| {
                for _ in 0..8 {
                    value.append(black_box("x"));
                }
                black_box(value)
            },
            BatchSize::SmallInput,
        );
    });
}

const INLINE_CAPACITY: usize = 2 * size_of::<usize>() - 1;
const EDGE_LENGTHS: [usize; 6] = [
    0,
    1,
    INLINE_CAPACITY - 1,
    INLINE_CAPACITY,
    INLINE_CAPACITY + 1,
    4096,
];
const BATCH: BatchSize = BatchSize::NumIterations(256);

fn representations(c: &mut Criterion) {
    type Source = (&'static str, fn(&'static str) -> Str);
    let sources: [Source; 3] = [
        ("static", Str::from_static),
        ("owned", |text| Str::from(String::from(text))),
        ("copied", |text| Str::from_str(text).unwrap()),
    ];
    for (name, make) in sources {
        let mut group = c.benchmark_group(format!("repr/{name}"));
        for len in EDGE_LENGTHS {
            let text = static_str(len);
            let value = make(text);
            group.bench_function(BenchmarkId::new("len", len), |b| {
                b.iter(|| black_box(&value).len());
            });
            group.bench_function(BenchmarkId::new("as_str", len), |b| {
                b.iter(|| black_box(black_box(&value).as_str()));
            });
            group.bench_function(BenchmarkId::new("clone", len), |b| {
                b.iter(|| black_box(&value).clone());
            });
            group.bench_function(BenchmarkId::new("drop_unique", len), |b| {
                b.iter_batched(|| make(text), |value| drop(black_box(value)), BATCH);
            });
            group.bench_function(BenchmarkId::new("into_string", len), |b| {
                b.iter_batched(|| make(text), |value| black_box(value).into_string(), BATCH);
            });
        }
        group.finish();
    }
}

fn shared_ownership(c: &mut Criterion) {
    let mut group = c.benchmark_group("ownership");
    for len in EDGE_LENGTHS {
        let source = String::from(static_str(len));
        let value = Str::from(source.clone());
        group.bench_function(BenchmarkId::new("drop_alias", len), |b| {
            b.iter_batched(|| value.clone(), |alias| drop(black_box(alias)), BATCH);
        });
        group.bench_function(BenchmarkId::new("into_string_alias", len), |b| {
            b.iter_batched(
                || value.clone(),
                |alias| black_box(alias).into_string(),
                BATCH,
            );
        });
        group.bench_function(BenchmarkId::new("round_trip", len), |b| {
            b.iter_batched(
                || source.clone(),
                |owned| Str::from(black_box(owned)).into_string(),
                BATCH,
            );
        });
        group.bench_function(BenchmarkId::new("append_alias", len), |b| {
            b.iter_batched(
                || value.clone(),
                |mut alias| {
                    alias.append(black_box("x"));
                    black_box(alias)
                },
                BATCH,
            );
        });
        group.bench_function(BenchmarkId::new("append_empty", len), |b| {
            b.iter_batched(
                || value.clone(),
                |mut alias| {
                    alias.append(black_box(""));
                    black_box(alias)
                },
                BATCH,
            );
        });
        group.bench_function(BenchmarkId::new("from_string_reserved", len), |b| {
            b.iter_batched(
                || {
                    let mut owned = String::with_capacity(source.len() + 64);
                    owned.push_str(&source);
                    owned
                },
                |owned| Str::from(black_box(owned)),
                BATCH,
            );
        });
    }
    group.finish();
}

fn comparisons(c: &mut Criterion) {
    let mut group = c.benchmark_group("compare");
    for len in [INLINE_CAPACITY, INLINE_CAPACITY + 1, 4096] {
        let text = static_str(len);
        let left = Str::from(String::from(text));
        let mut first = String::from(text);
        first.replace_range(..1, "!");
        let mut last = String::from(text);
        last.replace_range(len - 1.., "!");
        for (name, right) in [
            ("alias", left.clone()),
            ("equal_copy", Str::from_str(text).unwrap()),
            ("static", Str::from_static(text)),
            ("first_diff", Str::from(first)),
            ("last_diff", Str::from(last)),
            ("shorter", Str::from_str(&text[..len - 1]).unwrap()),
        ] {
            group.bench_function(BenchmarkId::new(name, len), |b| {
                b.iter(|| black_box(&left) == black_box(&right));
            });
        }
    }
    group.finish();
}

fn text_inputs(c: &mut Criterion) {
    let long = "水滴".repeat(64);
    {
        let mut group = c.benchmark_group("text");
        for text in ["", "é", "水滴水滴水", "水滴水滴水x", "a\0b", long.as_str()] {
            let len = text.len();
            let bytes = text.as_bytes().to_vec();
            let value = Str::from_str(text).unwrap();
            group.bench_function(BenchmarkId::new("parse_utf8", len), |b| {
                b.iter(|| Str::from_str(black_box(text)).unwrap());
            });
            group.bench_function(BenchmarkId::new("from_utf8", len), |b| {
                b.iter_batched(
                    || bytes.clone(),
                    |bytes| Str::from_utf8(black_box(bytes)).unwrap(),
                    BATCH,
                );
            });
            group.bench_function(BenchmarkId::new("display", len), |b| {
                b.iter(|| format!("{:>20.8}", black_box(&value)));
            });
        }
        group.finish();
    }
    let mut concatenate = c.benchmark_group("concatenate");
    for count in [1, INLINE_CAPACITY, INLINE_CAPACITY + 1, 64] {
        let pieces = vec!["x"; count];
        concatenate.bench_function(BenchmarkId::new("collect", count), |b| {
            b.iter(|| black_box(&pieces).iter().copied().collect::<Str>());
        });
        concatenate.bench_function(BenchmarkId::new("extend", count), |b| {
            b.iter(|| {
                let mut value = Str::new();
                value.extend(black_box(&pieces).iter().copied());
                value
            });
        });
    }
    concatenate.finish();
}

fn constructor_pairs(c: &mut Criterion) {
    let mut group = c.benchmark_group("constructor_pair");
    for len in [0, 15, 4096] {
        let text = static_str(len);
        let source = String::from(text);
        group.bench_function(BenchmarkId::new("current_from_static", len), |b| {
            b.iter(|| Str::from_static(black_box(text)));
        });
        group.bench_function(BenchmarkId::new("baseline_from_static", len), |b| {
            b.iter(|| suiteki_baseline::Str::from_static(black_box(text)));
        });
        group.bench_function(BenchmarkId::new("current_from_string", len), |b| {
            b.iter_batched(
                || source.clone(),
                |owned| Str::from(black_box(owned)),
                BATCH,
            );
        });
        group.bench_function(BenchmarkId::new("baseline_from_string", len), |b| {
            b.iter_batched(
                || source.clone(),
                |owned| suiteki_baseline::Str::from(black_box(owned)),
                BATCH,
            );
        });
        group.bench_function(BenchmarkId::new("current_from_borrowed", len), |b| {
            b.iter(|| Str::from_str(black_box(source.as_str())).unwrap());
        });
        group.bench_function(BenchmarkId::new("baseline_from_borrowed", len), |b| {
            b.iter(|| suiteki_baseline::Str::from_str(black_box(source.as_str())).unwrap());
        });
        let current = Str::from(source.clone());
        let baseline = suiteki_baseline::Str::from(source.clone());
        group.bench_function(BenchmarkId::new("current_as_str", len), |b| {
            b.iter(|| {
                let slice = black_box(&current).as_str();
                slice.len() + usize::from(slice.as_bytes().last().copied().unwrap_or(0))
            });
        });
        group.bench_function(BenchmarkId::new("baseline_as_str", len), |b| {
            b.iter(|| {
                let slice = black_box(&baseline).as_str();
                slice.len() + usize::from(slice.as_bytes().last().copied().unwrap_or(0))
            });
        });
    }
    group.finish();
}

fn format_pairs(c: &mut Criterion) {
    let mut group = c.benchmark_group("format_pair");
    for len in [15, 256, 4096] {
        let current = Str::from(String::from(static_str(len)));
        let pointer = current.as_str().as_ptr();
        group.bench_function(BenchmarkId::new("current_display", len), |b| {
            b.iter(|| black_box(&current).to_string());
        });
        group.bench_function(BenchmarkId::new("current_direct_copy", len), |b| {
            b.iter(|| black_box(current.as_str()).to_owned());
        });
        let buffer = current.into_string();
        assert_eq!(buffer.as_ptr(), pointer);
        let baseline = suiteki_baseline::Str::from(buffer);
        assert_eq!(baseline.as_str().as_ptr(), pointer);
        group.bench_function(BenchmarkId::new("baseline_display", len), |b| {
            b.iter(|| black_box(&baseline).to_string());
        });
        group.bench_function(BenchmarkId::new("baseline_direct_copy", len), |b| {
            b.iter(|| black_box(baseline.as_str()).to_owned());
        });
    }
    group.finish();
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
    targets = construction, clone, access, ownership, representations, shared_ownership, comparisons, text_inputs, constructor_pairs, format_pairs
}
criterion_main!(benches);
