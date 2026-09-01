# suiteki

[![crates.io](https://img.shields.io/crates/v/suiteki.svg)](https://crates.io/crates/suiteki)
[![docs.rs](https://docs.rs/suiteki/badge.svg)](https://docs.rs/suiteki)

A string type that borrows static strings and reference-counts owned ones.

`Str` is two words wide — a pointer and a signed length — and stores one of two
things. A `&'static str` is kept as-is: no allocation, and cloning is a pointer
copy. An owned `String` is moved into a reference-counted box: one allocation,
and cloning is a counter increment rather than a copy of the bytes. The sign of
the length tells the two apart, so nothing is spent on a discriminant.

It derefs to `str`, so every `str` method is available, and it implements the
usual traits (`Debug`, `Display`, `Hash`, `Ord`, `Borrow<str>`, `FromStr`,
`FromIterator`, `Add`, `Extend`, `Index`) so it drops into existing code.

The crate is `no_std` and needs only `alloc`.

```rust
use suiteki::Str;

// A literal costs nothing to store and nothing to clone.
let greeting = Str::from("hello");
assert_eq!(greeting.len(), 5);
assert!(greeting.starts_with("hel"));

// An owned string is refcounted, so this clone copies no bytes.
let owned = Str::from(String::from("world"));
let alias = owned.clone();
assert_eq!(alias, "world");

// It concatenates and compares like any other string type.
let combined = greeting + " " + &owned;
assert_eq!(combined, "hello world");
```

Empty strings always take the static representation, however they are built:

```rust
use suiteki::Str;

assert!(Str::new().is_empty());
assert!(Str::from("").is_empty());
assert!(Str::from(String::new()).is_empty());
```

`into_string` takes the allocation back when this is the last reference, and
copies only when it is not:

```rust
use suiteki::Str;

let s = Str::from(String::from("owned"));
let shared = s.clone();

let copied = s.into_string(); // `shared` is still alive, so this copies.
assert_eq!(copied, "owned");

let moved = shared.into_string(); // Last reference: takes the `String`.
assert_eq!(moved, "owned");
```

## Installation

```toml
[dependencies]
suiteki = "0.1"
```

## Features

| Feature | Default | Effect |
| --- | --- | --- |
| `std` | yes | `AsRef<OsStr>`, `AsRef<Path>`, `TryFrom<OsString>` and `ToSocketAddrs`. Turn it off for a `no_std` build. |
| `serde` | no | `Serialize` and `Deserialize` for `Str`. |
| `nami` | no | Registers `Str` as a constant signal for the [`nami`](https://crates.io/crates/nami) reactive framework. |

## Reference counting

The count is not part of the public API, and there is no way to read it. That
keeps `Str` a value type: code cannot branch on how many aliases exist, and the
representation stays free to change. The count is non-atomic, so `Str` is
neither `Send` nor `Sync` — it is meant to be cheap on one thread, not shared
across several.

## Benchmarks

```sh
cargo bench --all-features
```

The suite covers construction from a `&'static str`, from a `String` and from a
borrowed `&str`, plus clone, deref, equality, hashing and `to_string`, at byte
lengths from 0 to 4096. `tests/allocations.rs` pins the allocation counts those
paths are allowed to make.

## Miri

The type is built on raw pointers and a hand-written reference count, so the
test suite doubles as a memory-safety suite:

```sh
./run_miri_tests.sh
```

## Origin

`suiteki` (水滴, "water droplet") was extracted from the
[WaterUI](https://github.com/water-rs/waterui) framework, where it lived as
`waterui-str`, and is maintained as a standalone library.

## License

Licensed under either of [Apache License, Version 2.0](LICENSE-APACHE) or
[MIT license](LICENSE-MIT) at your option.
