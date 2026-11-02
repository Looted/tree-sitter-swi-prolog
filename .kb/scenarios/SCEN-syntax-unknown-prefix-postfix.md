---
title: An unknown prefix or postfix operator is an error in its own clause
status: active
origin:
  kind: agent
  recorded_at: '2026-11-02T12:19:21.935Z'
id: SCEN-syntax-unknown-prefix-postfix
type: scenario
---
Given a clause that uses an undeclared operator as a prefix (`p :- fy q.`) or a postfix (`t(X) :- X xf.`) operator between two clean clauses, when it is parsed, then the clause has an ERROR node, still ends at its own `.`, and the clauses before and after it parse without errors.

The expected behavior comes from the README line this requirement cites.