---
title: A . before any other character does not end the clause
status: active
origin:
  kind: agent
  recorded_at: '2026-11-02T15:32:02.039Z'
id: SCEN-lexical-dot-in-term
type: scenario
expects: success
---
Given a clause with a `.` followed by any character that is not layout or `%`, such as in `a.b`, `1.5` or `=..`, when it is parsed, then that `.` does not end the clause.

The expected behavior comes from the README line this requirement cites.
