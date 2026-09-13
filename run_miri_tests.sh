#!/bin/bash
#
# Runs the test suite under Miri. `Str` is built on raw pointers and a
# hand-written reference count, so the suite doubles as a memory-safety suite:
# use-after-free, double free, leaks and invalid dereferences all show up here.
#
# Install Miri first: rustup +nightly component add miri
set -euo pipefail

# Number validity is checked unconditionally now; `-Zmiri-check-number-validity`
# was removed, and passing it makes Miri refuse to start at all.
export MIRIFLAGS="-Zmiri-symbolic-alignment-check -Zmiri-disable-isolation"
export RUST_BACKTRACE=1

cargo +nightly miri test --all-features
