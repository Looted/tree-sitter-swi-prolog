---
title: Syntax Tree Every Top Level Term
status: active
text_ref: readme:README.md#L15
tags:
  - strict-modeling
  - confidence:0.90
  - confidence-band:high
  - provenance:readme-readme-md-l15
  - lane:strict
  - fact:subject
fact_kind: subject
subject_key: syntax_tree.every_top_level_term
canonical_key: syntax_tree.every_top_level_term
claim_key: CLAIM-AD1DB6E52F6BEADE
claim_text: Every top-level term must be a clause with head, neck and body fields, a directive or a query.
origin:
  kind: agent
  recorded_at: '2026-10-30T19:53:04.809Z'
id: FACT-SUBJECT-60615C81AAC616E8
type: fact
---

Each term at the top level of a parsed source file (a child of the root `source_file` node): a clause (`head`, `neck`, `body` fields), a directive (`:- Goal.`) or a query (`?- Goal.`). The allowed node types are listed in `grammar/node-types.js` (TOP_LEVEL_TERM_TYPES).
