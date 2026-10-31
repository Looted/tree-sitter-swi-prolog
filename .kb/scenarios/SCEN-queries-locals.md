---
title: locals.scm scopes variables to their clause, directive or query
status: active
origin:
  kind: agent
  recorded_at: '2026-10-30T23:32:49.940Z'
id: SCEN-queries-locals
type: scenario
---
Given clauses, a directive and a query that reuse variable names, when queries/locals.scm runs on them, then each clause, directive and query is a `local.scope` and every variable reference lies inside exactly one scope.

The expected behavior comes from the README line this requirement cites.
