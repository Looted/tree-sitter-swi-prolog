---
title: Operators from common SWI-Prolog libraries parse as operators
status: active
origin:
  kind: agent
  recorded_at: '2026-10-30T23:25:30.332Z'
id: SCEN-operators-library-tables
type: scenario
---
Given the grammar's operator table, when each of the library operators `#=`, `in`, `..` (clpfd), `<=>`, `==>`, `\` (chr), `^^` (semweb/rdf_db), `#` (wasm) and the declarations `rdf_meta`, `persistent`, `record` and `html_meta` is written in every role the table gives it, then the parser reads it as that operator and the term has no ERROR or MISSING node.

The operators come from the README's list of library operators the grammar supports.
