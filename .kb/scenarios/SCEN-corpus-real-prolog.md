---
title: SWI-Prolog's own sources parse
status: active
origin:
  kind: agent
  recorded_at: '2026-10-30T23:32:57.821Z'
id: SCEN-corpus-real-prolog
type: scenario
---
Given SWI-Prolog's current `boot/` and `library/` sources, when scripts/check-corpus.mjs parses them with the Wasm parser, then at least 99.5% of top-level terms parse without ERROR or MISSING nodes.

The expected behavior comes from the README line this requirement cites.
