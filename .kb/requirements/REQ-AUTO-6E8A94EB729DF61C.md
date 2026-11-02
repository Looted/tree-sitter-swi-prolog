---
title: A `.` followed by any other character must not end the clause.
status: open
text_ref: readme:README.md#L14
tags:
  - strict-modeling
  - confidence:0.80
  - confidence-band:medium
  - provenance:mcp-kibi-model-requirement
  - lane:strict
semantic_text: A `.` followed by any other character must not end the clause.
logic_claims:
  - CLAIM-ADB9C3F48A5A53C9
semantic_clauses:
  - A `.` followed by any other character must not end the clause.
semantic_inventory_version: kibi.semantic-inventory.v1
semantic_source_field: semantic_text
semantic_source_hash: 18074a17e0fd8225a8a9afdde8790eeec60ebdd8e4b45358399bff313eabdcd0
semantic_inventory:
  - claim_key: CLAIM-ADB9C3F48A5A53C9
    claim_text: A `.` followed by any other character must not end the clause
    role: normative
    status: modeled
    span:
      start: 0
      end: 61
origin:
  kind: agent
  recorded_at: '2026-11-02T15:30:30.650Z'
id: REQ-AUTO-6E8A94EB729DF61C
type: req
---
A `.` followed by any other character must not end the clause.

## Context

Piotr asked (2026-11-02) to prove everything about the project's own code that can honestly be proved. This is the other half of the clause terminator rule that src/scanner.c implements: a `.` inside a term, as in a dict call, `=..` or a float, must not end the clause. The other characters are not a finite list Kibi can range over, so the test checks every character of the Basic Multilingual Plane and a few beyond it, which makes this requirement tested rather than proved.

## Source

> the clause terminator: a `.` followed by layout (any Unicode white space character), a `%` comment or the end of the input ends the clause, and a `.` followed by any other character does not, as in `a.b` or `X =.. L`

Source: tree-sitter-swi-prolog README - README.md#L14
