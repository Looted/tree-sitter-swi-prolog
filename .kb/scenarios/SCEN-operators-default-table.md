---
title: Operators of the default SWI-Prolog table parse as operators
status: active
origin:
  kind: agent
  recorded_at: '2026-10-30T23:25:16.846Z'
id: SCEN-operators-default-table
type: scenario
---
Given the grammar's operator table, when each of `:`, `=>`, `=@=`, `>:<`, `:<`, `as`, `$`, `dynamic`, `discontiguous`, `meta_predicate`, `multifile` and `table` is written in every role the table gives it (clause neck, infix between two operands, prefix before an argument), then the parser reads it as that operator and the term has no ERROR or MISSING node.

The operators come from the README's list of default SWI-Prolog operators the grammar supports.
