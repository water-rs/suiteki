#!/bin/bash
#
# Runs the test suite under Miri. `Str` is built on raw pointers and a
# hand-written reference count, so the suite doubles as a memory-safety suite:
# use-after-free, double free, leaks and invalid dereferences all show up here.
#
# Install Miri first: rustup +nightly component add miri
set -euo pipefail

export MIRIFLAGS="-Zmiri-check-number-validity -Zmiri-symbolic-alignment-check -Zmiri-disable-isolation"
export RUST_BACKTRACE=1

cargo +nightly miri test --all-features
