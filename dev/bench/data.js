window.BENCHMARK_DATA = {
  "lastUpdate": 1789344530114,
  "repoUrl": "https://github.com/water-rs/suiteki",
  "entries": {
    "suiteki": [
      {
        "commit": {
          "author": {
            "email": "me@lexo.cool",
            "name": "Lexo Liu",
            "username": "lexoliu"
          },
          "committer": {
            "email": "me@lexo.cool",
            "name": "Lexo Liu",
            "username": "lexoliu"
          },
          "distinct": true,
          "id": "3ed98476adc25d68ea74af35b3a2e7d1ab01f936",
          "message": "chore: make the Miri script carry its own flags\n\n`miri.toml` was inert: Miri reads no such file, so the flags it declared --\nnumber-validity, symbolic alignment, disabled isolation -- were never\nactually passed to the checks it claimed to configure. The flags move into\nthe script that runs Miri, which also stops swallowing failures now that it\nsets `-euo pipefail`. This was pre-existing.\n\nClaude-Session: https://claude.ai/code/session_01XwLTWGKnqhKDu4ym3qEobm",
          "timestamp": "2026-09-01T15:21:28-04:00",
          "tree_id": "dde11e6c5420034b37f9049934778dfbca3872f8",
          "url": "https://github.com/water-rs/suiteki/commit/3ed98476adc25d68ea74af35b3a2e7d1ab01f936"
        },
        "date": 1788292189611,
        "tool": "cargo",
        "benches": [
          {
            "name": "str/from_static/0",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_static/7",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_static/15",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_static/16",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_static/31",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_static/64",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_static/256",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_static/4096",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/0",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/7",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/15",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/16",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/31",
            "value": 17,
            "range": "± 15",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/64",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/256",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/4096",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/0",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/7",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/15",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/16",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/31",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/64",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/256",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/4096",
            "value": 183,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/0",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/7",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/15",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/16",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/31",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/64",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/256",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/4096",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/0",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/7",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/15",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/16",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/31",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/64",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/256",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/4096",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/0",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/7",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/15",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/16",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/31",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/64",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/256",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/4096",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/0",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/7",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/15",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/16",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/31",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/64",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/256",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/4096",
            "value": 62,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/0",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/7",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/15",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/16",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/31",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/64",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/256",
            "value": 69,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/4096",
            "value": 928,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/0",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/7",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/15",
            "value": 28,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/16",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/31",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/64",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/256",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/4096",
            "value": 178,
            "range": "± 0",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "me@lexo.cool",
            "name": "Lexo Liu",
            "username": "lexoliu"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "84d0b370f2adeb3df1f4c5ddae8e5dd764fc0d1e",
          "message": "Merge pull request #3 from water-rs/dev\n\nPromote dev to main for the 0.1.0 release",
          "timestamp": "2026-09-01T16:52:43-04:00",
          "tree_id": "25e4e0b177d7ec75598b01025236656375dc16b3",
          "url": "https://github.com/water-rs/suiteki/commit/84d0b370f2adeb3df1f4c5ddae8e5dd764fc0d1e"
        },
        "date": 1788297184145,
        "tool": "cargo",
        "benches": [
          {
            "name": "str/from_static/0",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_static/7",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_static/15",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_static/16",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_static/31",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_static/64",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_static/256",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_static/4096",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/0",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/7",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/15",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/16",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/31",
            "value": 18,
            "range": "± 12",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/64",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/256",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/4096",
            "value": 21,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/0",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/7",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/15",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/16",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/31",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/64",
            "value": 31,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/256",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/4096",
            "value": 1439,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/0",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/7",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/15",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/16",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/31",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/64",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/256",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/4096",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/0",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/7",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/15",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/16",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/31",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/64",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/256",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/4096",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/0",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/7",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/15",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/16",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/31",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/64",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/256",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/4096",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/0",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/7",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/15",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/16",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/31",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/64",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/256",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/4096",
            "value": 57,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/0",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/7",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/15",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/16",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/31",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/64",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/256",
            "value": 61,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/4096",
            "value": 824,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/0",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/7",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/15",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/16",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/31",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/64",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/256",
            "value": 25,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/4096",
            "value": 1875,
            "range": "± 6",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "me@lexo.cool",
            "name": "Lexo Liu",
            "username": "lexoliu"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "38c98504463a16eb6c36a2e8770aa890c53e33a2",
          "message": "Merge pull request #5 from water-rs/release-plz-2026-09-01T21-28-38Z\n\nchore: release v0.1.0",
          "timestamp": "2026-09-01T19:27:41-04:00",
          "tree_id": "4bd1a7d6af212a7ea7e19df4dd14f717a3466d49",
          "url": "https://github.com/water-rs/suiteki/commit/38c98504463a16eb6c36a2e8770aa890c53e33a2"
        },
        "date": 1788305673872,
        "tool": "cargo",
        "benches": [
          {
            "name": "str/from_static/0",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_static/7",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_static/15",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_static/16",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_static/31",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_static/64",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_static/256",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_static/4096",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/0",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/7",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/15",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/16",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/31",
            "value": 18,
            "range": "± 15",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/64",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/256",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/4096",
            "value": 21,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/0",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/7",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/15",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/16",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/31",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/64",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/256",
            "value": 33,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/4096",
            "value": 182,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/0",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/7",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/15",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/16",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/31",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/64",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/256",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/4096",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/0",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/7",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/15",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/16",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/31",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/64",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/256",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/4096",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/0",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/7",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/15",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/16",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/31",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/64",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/256",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/4096",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/0",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/7",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/15",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/16",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/31",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/64",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/256",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/4096",
            "value": 63,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/0",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/7",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/15",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/16",
            "value": 16,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/31",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/64",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/256",
            "value": 69,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/4096",
            "value": 927,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/0",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/7",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/15",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/16",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/31",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/64",
            "value": 29,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/256",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/4096",
            "value": 113,
            "range": "± 1",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "me@lexo.cool",
            "name": "Lexo Liu",
            "username": "lexoliu"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "07ef234fdde6f329cac0642a42314296d38d86a2",
          "message": "Merge pull request #5 from water-rs/release-plz-2026-09-01T21-28-38Z\n\nchore: release v0.1.0",
          "timestamp": "2026-09-01T19:27:41-04:00",
          "tree_id": "4bd1a7d6af212a7ea7e19df4dd14f717a3466d49",
          "url": "https://github.com/water-rs/suiteki/commit/07ef234fdde6f329cac0642a42314296d38d86a2"
        },
        "date": 1788312968906,
        "tool": "cargo",
        "benches": [
          {
            "name": "str/from_static/0",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_static/7",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_static/15",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_static/16",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_static/31",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_static/64",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_static/256",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_static/4096",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/0",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/7",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/15",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/16",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/31",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/64",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/256",
            "value": 19,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/4096",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/0",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/7",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/15",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/16",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/31",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/64",
            "value": 30,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/256",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/4096",
            "value": 1437,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/0",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/7",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/15",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/16",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/31",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/64",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/256",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/4096",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/0",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/7",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/15",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/16",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/31",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/64",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/256",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/4096",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/0",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/7",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/15",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/16",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/31",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/64",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/256",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/4096",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/0",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/7",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/15",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/16",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/31",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/64",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/256",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/4096",
            "value": 55,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/0",
            "value": 12,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/7",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/15",
            "value": 16,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/16",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/31",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/64",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/256",
            "value": 61,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/4096",
            "value": 823,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/0",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/7",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/15",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/16",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/31",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/64",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/256",
            "value": 25,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/4096",
            "value": 106,
            "range": "± 1",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "me@lexo.cool",
            "name": "Lexo Liu",
            "username": "lexoliu"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "a5b387e37ed7188e1049b9a7ca3c43a45c5e7691",
          "message": "Merge pull request #16 from water-rs/dev\n\nrelease: suiteki 0.1.1",
          "timestamp": "2026-09-13T19:38:22-04:00",
          "tree_id": "899a340de09e42bca15b194bd7a04fd654eb8893",
          "url": "https://github.com/water-rs/suiteki/commit/a5b387e37ed7188e1049b9a7ca3c43a45c5e7691"
        },
        "date": 1789344529468,
        "tool": "cargo",
        "benches": [
          {
            "name": "str/from_static/0",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_static/7",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_static/15",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_static/16",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_static/17",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_static/31",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_static/64",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_static/256",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_static/4096",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/0",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/7",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/15",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/16",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/17",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/31",
            "value": 25,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/64",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/256",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string/4096",
            "value": 28,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/0",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/7",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/15",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/16",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/17",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/31",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/64",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/256",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_borrowed/4096",
            "value": 103,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/0",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/7",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/15",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/16",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/17",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/31",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/64",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/256",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_static/4096",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/0",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/7",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/15",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/16",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/17",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/31",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/64",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/256",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/clone_owned/4096",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/0",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/7",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/15",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/16",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/17",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/31",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/64",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/256",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/as_str/4096",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/0",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/7",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/15",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/16",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/17",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/31",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/64",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/256",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/eq/4096",
            "value": 56,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/0",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/7",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/15",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/16",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/17",
            "value": 11,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/31",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/64",
            "value": 20,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/256",
            "value": 65,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/hash/4096",
            "value": 982,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/0",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string_direct_copy/0",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/baseline_to_string/0",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/baseline_to_string_direct_copy/0",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/7",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string_direct_copy/7",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/baseline_to_string/7",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/baseline_to_string_direct_copy/7",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/15",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string_direct_copy/15",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/baseline_to_string/15",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/baseline_to_string_direct_copy/15",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/16",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string_direct_copy/16",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/baseline_to_string/16",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/baseline_to_string_direct_copy/16",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/17",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string_direct_copy/17",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/baseline_to_string/17",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/baseline_to_string_direct_copy/17",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/31",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string_direct_copy/31",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/baseline_to_string/31",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/baseline_to_string_direct_copy/31",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/64",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string_direct_copy/64",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/baseline_to_string/64",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/baseline_to_string_direct_copy/64",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/256",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string_direct_copy/256",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/baseline_to_string/256",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/baseline_to_string_direct_copy/256",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string/4096",
            "value": 98,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/to_string_direct_copy/4096",
            "value": 87,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/baseline_to_string/4096",
            "value": 92,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "str/baseline_to_string_direct_copy/4096",
            "value": 87,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string_lifecycle/0",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string_lifecycle/7",
            "value": 27,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string_lifecycle/15",
            "value": 26,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string_lifecycle/16",
            "value": 27,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string_lifecycle/17",
            "value": 26,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string_lifecycle/31",
            "value": 28,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string_lifecycle/64",
            "value": 27,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string_lifecycle/256",
            "value": 34,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/from_string_lifecycle/4096",
            "value": 35,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "str/into_string_unique/0",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "str/into_string_unique/7",
            "value": 18,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "str/into_string_unique/15",
            "value": 18,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "str/into_string_unique/16",
            "value": 18,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "str/into_string_unique/17",
            "value": 18,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "str/into_string_unique/31",
            "value": 19,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "str/into_string_unique/64",
            "value": 19,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "str/into_string_unique/256",
            "value": 21,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "str/into_string_unique/4096",
            "value": 15,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "str/append_repeated/0",
            "value": 102,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "str/append_repeated/7",
            "value": 244,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "str/append_repeated/15",
            "value": 234,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "str/append_repeated/16",
            "value": 234,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "str/append_repeated/17",
            "value": 234,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "str/append_repeated/31",
            "value": 235,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "str/append_repeated/64",
            "value": 241,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "str/append_repeated/256",
            "value": 250,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "str/append_repeated/4096",
            "value": 476,
            "range": "± 46",
            "unit": "ns/iter"
          },
          {
            "name": "str/append_copied/0",
            "value": 102,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "str/append_copied/7",
            "value": 108,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "str/append_copied/15",
            "value": 242,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "str/append_copied/16",
            "value": 233,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "str/append_copied/17",
            "value": 234,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "str/append_copied/31",
            "value": 234,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "str/append_copied/64",
            "value": 240,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "str/append_copied/256",
            "value": 251,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "str/append_copied/4096",
            "value": 477,
            "range": "± 44",
            "unit": "ns/iter"
          },
          {
            "name": "repr/static/len/0",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/static/as_str/0",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/static/clone/0",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/static/drop_unique/0",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/static/into_string/0",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/static/len/1",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/static/as_str/1",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/static/clone/1",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/static/drop_unique/1",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/static/into_string/1",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/static/len/14",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/static/as_str/14",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/static/clone/14",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/static/drop_unique/14",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/static/into_string/14",
            "value": 30,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/static/len/15",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/static/as_str/15",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/static/clone/15",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/static/drop_unique/15",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/static/into_string/15",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/static/len/16",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/static/as_str/16",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/static/clone/16",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/static/drop_unique/16",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/static/into_string/16",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/static/len/4096",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/static/as_str/4096",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/static/clone/4096",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/static/drop_unique/4096",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/static/into_string/4096",
            "value": 134,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "repr/owned/len/0",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/owned/as_str/0",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/owned/clone/0",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/owned/drop_unique/0",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/owned/into_string/0",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/owned/len/1",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/owned/as_str/1",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/owned/clone/1",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/owned/drop_unique/1",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/owned/into_string/1",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/owned/len/14",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/owned/as_str/14",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/owned/clone/14",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/owned/drop_unique/14",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/owned/into_string/14",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/owned/len/15",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/owned/as_str/15",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/owned/clone/15",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/owned/drop_unique/15",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/owned/into_string/15",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/owned/len/16",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/owned/as_str/16",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/owned/clone/16",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/owned/drop_unique/16",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/owned/into_string/16",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/owned/len/4096",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/owned/as_str/4096",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/owned/clone/4096",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/owned/drop_unique/4096",
            "value": 101,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "repr/owned/into_string/4096",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/copied/len/0",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/copied/as_str/0",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/copied/clone/0",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/copied/drop_unique/0",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/copied/into_string/0",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/copied/len/1",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/copied/as_str/1",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/copied/clone/1",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/copied/drop_unique/1",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/copied/into_string/1",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/copied/len/14",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/copied/as_str/14",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/copied/clone/14",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/copied/drop_unique/14",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/copied/into_string/14",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/copied/len/15",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/copied/as_str/15",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/copied/clone/15",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/copied/drop_unique/15",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/copied/into_string/15",
            "value": 31,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/copied/len/16",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/copied/as_str/16",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/copied/clone/16",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/copied/drop_unique/16",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/copied/into_string/16",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/copied/len/4096",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/copied/as_str/4096",
            "value": 6,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/copied/clone/4096",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/copied/drop_unique/4096",
            "value": 102,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "repr/copied/into_string/4096",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "ownership/drop_alias/0",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "ownership/into_string_alias/0",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "ownership/round_trip/0",
            "value": 9,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "ownership/append_alias/0",
            "value": 18,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "ownership/append_empty/0",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "ownership/from_string_reserved/0",
            "value": 13,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "ownership/drop_alias/1",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "ownership/into_string_alias/1",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "ownership/round_trip/1",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "ownership/append_alias/1",
            "value": 92,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "ownership/append_empty/1",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "ownership/from_string_reserved/1",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "ownership/drop_alias/14",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "ownership/into_string_alias/14",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "ownership/round_trip/14",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "ownership/append_alias/14",
            "value": 83,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "ownership/append_empty/14",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "ownership/from_string_reserved/14",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "ownership/drop_alias/15",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "ownership/into_string_alias/15",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "ownership/round_trip/15",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "ownership/append_alias/15",
            "value": 83,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "ownership/append_empty/15",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "ownership/from_string_reserved/15",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "ownership/drop_alias/16",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "ownership/into_string_alias/16",
            "value": 32,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "ownership/round_trip/16",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "ownership/append_alias/16",
            "value": 82,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "ownership/append_empty/16",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "ownership/from_string_reserved/16",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "ownership/drop_alias/4096",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "ownership/into_string_alias/4096",
            "value": 134,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "ownership/round_trip/4096",
            "value": 17,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "ownership/append_alias/4096",
            "value": 254,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "ownership/append_empty/4096",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "ownership/from_string_reserved/4096",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "compare/alias/15",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "compare/equal_copy/15",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "compare/static/15",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "compare/first_diff/15",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "compare/last_diff/15",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "compare/shorter/15",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "compare/alias/16",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "compare/equal_copy/16",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "compare/static/16",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "compare/first_diff/16",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "compare/last_diff/16",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "compare/shorter/16",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "compare/alias/4096",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "compare/equal_copy/4096",
            "value": 57,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "compare/static/4096",
            "value": 63,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "compare/first_diff/4096",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "compare/last_diff/4096",
            "value": 59,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "compare/shorter/4096",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "text/parse_utf8/0",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "text/from_utf8/0",
            "value": 10,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "text/display/0",
            "value": 135,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "text/parse_utf8/2",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "text/from_utf8/2",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "text/display/2",
            "value": 133,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "text/parse_utf8/15",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "text/from_utf8/15",
            "value": 38,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "text/display/15",
            "value": 123,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "text/parse_utf8/16",
            "value": 27,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "text/from_utf8/16",
            "value": 39,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "text/display/16",
            "value": 121,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "text/parse_utf8/3",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "text/from_utf8/3",
            "value": 35,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "text/display/3",
            "value": 130,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "text/parse_utf8/384",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "text/from_utf8/384",
            "value": 302,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "text/display/384",
            "value": 115,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "concatenate/collect/1",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "concatenate/extend/1",
            "value": 21,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "concatenate/collect/15",
            "value": 47,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "concatenate/extend/15",
            "value": 48,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "concatenate/collect/16",
            "value": 77,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "concatenate/extend/16",
            "value": 78,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "concatenate/collect/64",
            "value": 285,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "concatenate/extend/64",
            "value": 286,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "constructor_pair/current_from_static/0",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "constructor_pair/baseline_from_static/0",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "constructor_pair/current_from_string/0",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "constructor_pair/baseline_from_string/0",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "constructor_pair/current_from_borrowed/0",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "constructor_pair/baseline_from_borrowed/0",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "constructor_pair/current_as_str/0",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "constructor_pair/baseline_as_str/0",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "constructor_pair/current_from_static/15",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "constructor_pair/baseline_from_static/15",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "constructor_pair/current_from_string/15",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "constructor_pair/baseline_from_string/15",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "constructor_pair/current_from_borrowed/15",
            "value": 8,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "constructor_pair/baseline_from_borrowed/15",
            "value": 28,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "constructor_pair/current_as_str/15",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "constructor_pair/baseline_as_str/15",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "constructor_pair/current_from_static/4096",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "constructor_pair/baseline_from_static/4096",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "constructor_pair/current_from_string/4096",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "constructor_pair/baseline_from_string/4096",
            "value": 26,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "constructor_pair/current_from_borrowed/4096",
            "value": 95,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "constructor_pair/baseline_from_borrowed/4096",
            "value": 95,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "constructor_pair/current_as_str/4096",
            "value": 0,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "constructor_pair/baseline_as_str/4096",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "format_pair/current_display/15",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "format_pair/current_direct_copy/15",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "format_pair/baseline_display/15",
            "value": 24,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "format_pair/baseline_direct_copy/15",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "format_pair/current_display/256",
            "value": 23,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "format_pair/current_direct_copy/256",
            "value": 15,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "format_pair/baseline_display/256",
            "value": 25,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "format_pair/baseline_direct_copy/256",
            "value": 14,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "format_pair/current_display/4096",
            "value": 93,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "format_pair/current_direct_copy/4096",
            "value": 86,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "format_pair/baseline_display/4096",
            "value": 92,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "format_pair/baseline_direct_copy/4096",
            "value": 86,
            "range": "± 0",
            "unit": "ns/iter"
          }
        ]
      }
    ]
  }
}