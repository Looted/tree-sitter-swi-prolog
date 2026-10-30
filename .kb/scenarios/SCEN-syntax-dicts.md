---
title: Dicts and dict functional notation parse
status: active
origin:
  kind: agent
  recorded_at: '2026-10-30T23:31:43.465Z'
id: SCEN-syntax-dicts
type: scenario
---
Given `_{name: "x"}`, `Tag{a: 1, b: 2}`, `D.key` and `D.put(k, V)`, when each is parsed as a value, then the first two are `dict` nodes with their tag and pairs, and the last two are `dict_call` nodes with the dict and the key or call.

The expected behavior comes from the README line this requirement cites.
