---
title: An unknown infix operator is read at priority 700
status: active
origin:
  kind: agent
  recorded_at: '2026-10-30T23:32:16.978Z'
id: SCEN-syntax-unknown-infix
type: scenario
---
Given `a, b ===> c + d` and `a, b cis c + d`, where `===>` and `cis` are not in the operator table, when the clause is parsed, then it has no errors and the unknown operator is an infix operator between `b` and `c + d`, below `,` (1000) and above `+` (500), as priority 700 groups it.

The expected behavior comes from the README line this requirement cites.
