---
title: A `.` followed by layout (any Unicode white space character), a `%` comment or the end of the input must end the clause.
status: open
text_ref: readme:README.md#L14
tags:
  - strict-modeling
  - confidence:0.80
  - confidence-band:medium
  - provenance:mcp-kibi-model-requirement
  - lane:strict
semantic_text: A `.` followed by layout (any Unicode white space character), a `%` comment or the end of the input must end the clause.
logic_claims:
  - CLAIM-DF75498C8D46506A
semantic_clauses:
  - A `.` followed by layout (any Unicode white space character), a `%` comment or the end of the input must end the clause.
semantic_inventory_version: kibi.semantic-inventory.v1
semantic_source_field: semantic_text
semantic_source_hash: 4f921de41e82414d46316435615bad4503cd3e14b9e07f7e5c3ce4ce4503173f
semantic_inventory:
  - claim_key: CLAIM-DF75498C8D46506A
    claim_text: A `.` followed by layout (any Unicode white space character), a `%` comment or the end of the input must end the clause
    role: normative
    status: modeled
    span:
      start: 0
      end: 119
origin:
  kind: agent
  recorded_at: '2026-11-02T15:30:18.485Z'
id: REQ-AUTO-86BD3B0BF0F0C58F
type: req
---
A `.` followed by layout (any Unicode white space character), a `%` comment or the end of the input must end the clause.

## Context

Piotr asked (2026-11-02) to prove everything about the project's own code that can honestly be proved. src/scanner.c had no requirement of its own: its one job is to lex the clause terminator, so this requirement states it. Writing it down found that a `.` before a Unicode white space character such as a no-break space did not end the clause, and that such characters were not skipped as layout; both were fixed with it.

## Source

> the clause terminator: a `.` followed by layout (any Unicode white space character), a `%` comment or the end of the input ends the clause, and a `.` followed by any other character does not, as in `a.b` or `X =.. L`

Source: tree-sitter-swi-prolog README - README.md#L14
