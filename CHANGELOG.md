# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0](https://github.com/water-rs/suiteki/releases/tag/v0.1.0) - 2026-09-01

### Added

- compile without the standard library
- gate the nami integration behind a feature
- continue deep review fixes and ffi fast-fail cleanup
- implement ErrorView and ErrorViewBuilder for enhanced error handling; add overlay method to ViewExt
- update dependencies with versioning and improve documentation clarity
- Add template member to workspace and enhance FFI with new environment handling

### Fixed

- *(str)* make Debug print the string instead of the tagged representation
- remove redundant safety note from README.md
- *(deps)* update nami to 0.7.1 and add nami-core dependency; adjust serde features

### Other

- *(bench)* keep criterion baselines out of the cached target tree
- Merge pull request #2 from water-rs/ci/dedupe-branch-runs
- *(bench)* let the alert comment reach pull requests
- run the push trigger on integration branches only
- make the Miri script carry its own flags
- add CI, benchmark history and release-plz
- measure every representation-dependent operation
- pin the allocation count of every construction path
- [**breaking**] rename waterui-str to suiteki
- ship the licence texts in every published crate
- prepare WaterUI 0.3 release versions
- Give every unsafe a reason the compiler can check, workspace-wide
- Fix second-wave CI failures
- clean up clippy warnings across the workspace
- Prepare dev for release automation
- Clean dev CI and example builds
- Use imports for type paths
- release
- remove optional serde feature documentation from README.md
- Refactor layout tests to use approximate equality for floating-point comparisons
- Add waterui-color, waterui-str, and waterui-url crates with comprehensive documentation
- Refactor layout documentation and examples for clarity and completeness
- hide reference count from public API and update documentation
- enhance FormBuilder derive macro and examples; update form handling and component mappings
- Make compiler happy
- Implement FFI bindings for navigation and text components, enhancing the interoperability of the WaterUI framework with C. This includes the addition of structures for navigation views, links, and tabs, as well as text configurations and font representations. The changes also streamline the conversion between Rust and FFI types, ensuring safe memory management and improved performance. Additionally, several utility functions for string manipulation have been updated to return pointers instead of structures, optimizing memory usage and access patterns.
- Add FFI bindings for WaterUI and enhance Str utility functions
- Add Miri configuration and testing scripts for waterui-str
- Add more lints and docs
- Add more lints and fix all warnings
- Remove more ffi module, making whole project work
- Remove unfinished FFI modules from main branch
- Use uniffi for FFI binding
- Polish document
- Refine project and Migrate to Rust 2024
