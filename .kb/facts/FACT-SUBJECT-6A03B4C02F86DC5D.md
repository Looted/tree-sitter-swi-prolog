---
title: Lexical Clause Terminator
status: active
text_ref: mcp://kibi/model-requirement
tags:
  - strict-modeling
  - confidence:0.80
  - confidence-band:medium
  - provenance:mcp-kibi-model-requirement
  - lane:strict
  - fact:subject
  - vocabulary:new-subject
fact_kind: subject
subject_key: lexical.clause_terminator
canonical_key: lexical.clause_terminator
claim_key: CLAIM-DF75498C8D46506A
claim_text: A `.` followed by layout (any Unicode white space character), a `%` comment or the end of the input must end the clause.
origin:
  kind: agent
  recorded_at: '2026-11-02T15:30:15.892Z'
id: FACT-SUBJECT-6A03B4C02F86DC5D
type: fact
---

The end token `.` that closes a clause, directive or query. The external scanner (`src/scanner.c`) emits it only when the `.` is followed by layout, a `%` comment or end of input; the follower set is `CLAUSE_END_FOLLOWERS` in `grammar/lexical.js`.
