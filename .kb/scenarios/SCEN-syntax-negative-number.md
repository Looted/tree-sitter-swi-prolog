---
title: A negative number is prefix minus applied to the number
status: active
origin:
  kind: agent
  recorded_at: '2026-10-30T23:32:25.445Z'
id: SCEN-syntax-negative-number
type: scenario
---
Given `X = -1`, when it is parsed, then the value is a `prefix_operation` whose operator is `-` and whose argument is the integer `1`.

The expected behavior comes from the README line this requirement cites.
