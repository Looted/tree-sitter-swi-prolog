---
title: tags.scm tags definitions, module declarations and calls
status: active
origin:
  kind: agent
  recorded_at: '2026-10-30T23:32:41.651Z'
id: SCEN-queries-tags
type: scenario
---
Given a module with a plain clause, a module-qualified head, a single-sided-unification head with a guard and a fact, when queries/tags.scm runs on it, then it tags the module as `definition.module`, each predicate as `definition.function` by name, and calls as `reference.call`.

The expected behavior comes from the README line this requirement cites.
