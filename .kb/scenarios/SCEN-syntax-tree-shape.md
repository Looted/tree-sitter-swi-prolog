---
title: Top-level terms are clauses, directives or queries
status: active
origin:
  kind: agent
  recorded_at: '2026-10-30T23:32:08.731Z'
id: SCEN-syntax-tree-shape
type: scenario
---
Given a file with a module directive, a fact, a rule, a DCG rule, a single-sided-unification rule and a query, when it is parsed, then its top-level nodes are exactly `directive`, `clause` x4 and `query`, each rule has `head`, `neck` and `body` fields with the right neck, and the fact has a head and no neck.

The expected behavior comes from the README line this requirement cites.
