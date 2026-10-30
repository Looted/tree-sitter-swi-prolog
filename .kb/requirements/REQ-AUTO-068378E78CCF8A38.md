---
title: CI must fail if fewer than 99.5% of top-level terms in SWI-Prolog's own boot/ and library/ sources parse without errors.
status: open
text_ref: readme:README.md#L29
tags:
  - strict-modeling
  - confidence:0.90
  - confidence-band:high
  - provenance:readme-readme-md-l29
  - lane:strict
semantic_text: CI must fail if fewer than 99.5% of top-level terms in SWI-Prolog's own boot/ and library/ sources parse without errors.
logic_claims:
  - CLAIM-AA6721CEB10806BB
semantic_clauses:
  - CI must fail if fewer than 99.5% of top-level terms in SWI-Prolog's own boot/ and library/ sources parse without errors.
semantic_inventory_version: kibi.semantic-inventory.v1
semantic_source_field: semantic_text
semantic_source_hash: 2abcfb325fd73429482eb1882701d781c68aa4bb5226f8c164d0c79cceb8cfc3
semantic_inventory:
  - claim_key: CLAIM-AA6721CEB10806BB
    claim_text: CI must fail if fewer than 99.5% of top-level terms in SWI-Prolog's own boot/ and library/ sources parse without errors
    role: normative
    status: modeled
    span:
      start: 0
      end: 119
origin:
  kind: import
  ref: readme:README.md#L29
  recorded_at: '2026-10-30T19:53:05.107Z'
firmness: firm
required_evidence: asserted
id: REQ-AUTO-068378E78CCF8A38
type: req
---
CI must fail if fewer than 99.5% of top-level terms in SWI-Prolog's own boot/ and library/ sources parse without errors.

## Source

> CI parses SWI-Prolog's own `boot/` and `library/` sources and fails if fewer than 99.5% of top-level terms parse without errors. On SWI-Prolog's current `boot/` and `library/` 99.88% of terms parse cleanly, and on the full SWI-Prolog 10.0.2 library with packages (413 files, about 240,000 lines) 99.91%; the rest use prefix operators their files declare themselves.

Source: tree-sitter-swi-prolog README - README.md#L29
