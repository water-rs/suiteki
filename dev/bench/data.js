window.BENCHMARK_DATA = {
  "lastUpdate": 1788292190139,
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
      }
    ]
  }
}