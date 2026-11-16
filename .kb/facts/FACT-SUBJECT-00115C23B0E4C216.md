---
title: Release Github
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
subject_key: release.github
canonical_key: release.github
claim_key: CLAIM-F6B3DF6E32FAF19E
claim_text: The vX.Y.Z tag and GitHub release must be created by the Release workflow.
origin:
  kind: agent
  recorded_at: '2026-11-02T12:13:34.452Z'
id: FACT-SUBJECT-00115C23B0E4C216
type: fact
---

The GitHub side of a release of this package: the `vX.Y.Z` git tag and the GitHub release that `.github/workflows/release.yml` creates when the Version packages pull request is merged. It is not the npm publish or the version bump itself (those come from changesets).
