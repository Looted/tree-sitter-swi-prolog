---
title: String, character code and number literals parse
status: active
origin:
  kind: agent
  recorded_at: '2026-10-30T23:31:51.881Z'
id: SCEN-syntax-literals
type: scenario
---
Given a string, a back-quoted string, `0'c`, `16'FF`, `1 000 000`, `1r3` and `1.0Inf`, when each is parsed as a value, then it is a single `string`, `back_quoted_string`, `char_code`, `integer`, `integer`, `rational` or `float` node covering the whole literal, with no errors.

The expected behavior comes from the README line this requirement cites.
