---
title: highlights.scm highlights comments, strings, numbers and variables
status: active
origin:
  kind: agent
  recorded_at: '2026-10-30T23:32:33.493Z'
id: SCEN-queries-highlights
type: scenario
---
Given a module with comments, strings, numbers and variables, when queries/highlights.scm runs on it, then it captures the comment as `@comment`, the string as `@string`, the number as `@number` and every variable as `@variable`.

The expected behavior comes from the README line this requirement cites.
