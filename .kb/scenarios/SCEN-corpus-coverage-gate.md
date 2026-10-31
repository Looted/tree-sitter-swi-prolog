---
title: CI fails when the corpus parse rate drops below 99.5%
status: active
origin:
  kind: agent
  recorded_at: '2026-10-30T23:33:15.938Z'
id: SCEN-corpus-coverage-gate
type: scenario
---
Given the CI workflow, when its corpus job runs, then it fetches SWI-Prolog's sources and runs `node scripts/check-corpus.mjs --min 0.995` on `boot/` and `library/`; and given a directory where some terms do not parse, check-corpus exits 1 with `--min 1` and 0 with `--min 0`.

The expected behavior comes from the README line this requirement cites.
