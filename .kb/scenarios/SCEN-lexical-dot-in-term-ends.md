---
title: A parser that ends a clause at a . before another character is rejected
status: active
expects: rejection
origin:
  kind: agent
  recorded_at: '2026-11-02T15:40:11.392Z'
id: SCEN-lexical-dot-in-term-ends
type: scenario
---
Given a parser where a `.` followed by one character that is not layout or `%` (such as the `b` of `a.b`) ends the clause, when the test checks every character, then it fails and names that character.

The expected behavior comes from the README line this requirement cites.
