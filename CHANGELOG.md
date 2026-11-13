# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0](https://github.com/water-rs/suiteki/compare/v0.1.1...v0.2.0) - 2026-11-13

### Added

- *(nami)* [**breaking**] implement the signal traits of nami-core 0.5 for Str

### Fixed

- satisfy Rust 1.100 clippy redundant_clone lint

### Other

- release from main and retire dev
- drop the typos check
- pass the release pull request's gate without CI
- Merge remote-tracking branch 'origin/dev' into deps/24-nami-core-0.4-breaking
- [**breaking**] implement Signal for nami-core 0.4
- satisfy clippy::assert_is_empty
- gate the declared rust-version on the floor toolchain ([#23](https://github.com/water-rs/suiteki/pull/23))
- disable incremental builds and trim debuginfo ([#22](https://github.com/water-rs/suiteki/pull/22))
- run tests with cargo nextest ([#21](https://github.com/water-rs/suiteki/pull/21))

## [0.1.1](https://github.com/water-rs/suiteki/compare/v0.1.0...v0.1.1) - 2026-09-13

### Added

- Inline storage for short borrowed strings: fifteen bytes on 64-bit targets and seven on 32-bit targets, with `Str` and `Option<Str>` remaining two words wide.
- Benchmark coverage for storage representations, ownership lifecycles, reserved capacity, Unicode, comparisons, and concatenation.
- Memory-safety tests for ownership transitions, buffer reuse, UTF-8 boundaries, alias release orders, and iterator unwinding.

### Changed

- Preserve the buffer and capacity of nonempty owned `String` inputs instead of forcing them into inline storage.
- Batch iterator concatenation in a stack buffer, then reuse one owned string when the inline capacity is exceeded.
- Avoid allocation for short inline appends and empty mutations, and avoid rescanning identical shared buffers during equality checks.

### Fixed

- Abort rather than wrap an overflowing reference count, and detect reference-count underflow.
- Remove the obsolete Miri number-validity flag.

## [0.1.0](https://github.com/water-rs/suiteki/releases/tag/v0.1.0) - 2026-09-01

First standalone release. `suiteki` is the string type formerly published as
`waterui-str` (last released as 0.2.1 from the WaterUI monorepo); the type,
its API and its semantics are unchanged.

### Added

- `Str`: a `no_std + alloc` string that borrows `&'static str` and
  reference-counts owned strings, so clones never copy bytes
- `std` feature (default on) for the impls that need standard-library types
  (`OsStr`, `Path`, `ToSocketAddrs`)
- `serde` feature for `Serialize` / `Deserialize`
- `nami` feature for the nami reactive integration (`impl_constant!`)
- Criterion benchmarks for construction, clone, deref, equality, hashing and
  display at 0, 7, 15, 16, 31, 64, 256 and 4096 bytes, with the trend series
  published from CI
- A deterministic allocation-count test pinning which construction paths
  reach the allocator

### Changed

- [**breaking**] renamed from `waterui-str` to `suiteki`; replace
  `waterui_str::Str` with `suiteki::Str`
