---
title: A . before layout, a % comment or the end of the input ends the clause
status: active
origin:
  kind: agent
  recorded_at: '2026-11-02T15:31:59.102Z'
id: SCEN-lexical-clause-terminator
type: scenario
---
Given a clause whose `.` is followed by a layout character (any Unicode white space character, such as a space, a newline, a no-break space or an ideographic space), by a `%` comment or by the end of the input, when it is parsed, then the clause ends with an `end` token that is exactly that `.`, and the text after it starts the next clause.

The expected behavior comes from the README line this requirement cites.
