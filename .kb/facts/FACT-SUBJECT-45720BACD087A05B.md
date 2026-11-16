---
title: Ci Changeset
status: active
text_ref: mcp://kibi/model-requirement
tags:
  - strict-modeling
  - confidence:0.80
  - confidence-band:medium
  - provenance:mcp-kibi-model-requirement
  - lane:strict
  - fact:subject
fact_kind: subject
subject_key: ci.changeset
canonical_key: ci.changeset
claim_key: CLAIM-6C373613BEB8EB55
claim_text: A pull request with a user-visible change must add a changeset.
origin:
  kind: agent
  recorded_at: '2026-11-02T12:12:58.800Z'
id: FACT-SUBJECT-45720BACD087A05B
type: fact
---

The changeset check in CI (`.github/workflows/ci.yml`), which runs `changeset status` on pull requests so that every user-visible change carries a `.changeset/` entry. Changes with no user-visible effect add an empty changeset.
