---
title: The vX.Y.Z tag and GitHub release must be created by the Release workflow.
status: open
text_ref: readme:README.md#L79
tags:
  - strict-modeling
  - confidence:0.80
  - confidence-band:medium
  - provenance:mcp-kibi-model-requirement
  - lane:strict
semantic_text: The vX.Y.Z tag and GitHub release must be created by the Release workflow.
logic_claims:
  - CLAIM-F6B3DF6E32FAF19E
semantic_clauses:
  - The vX.Y.Z tag and GitHub release must be created by the Release workflow.
semantic_inventory_version: kibi.semantic-inventory.v1
semantic_source_field: semantic_text
semantic_source_hash: 3031caf2d3814bdb02e59bcc3ef062e2ad30c96cf4309bb898b35a3aa89797c6
semantic_inventory:
  - claim_key: CLAIM-F6B3DF6E32FAF19E
    claim_text: The vX.Y.Z tag and GitHub release must be created by the Release workflow
    role: normative
    status: modeled
    span:
      start: 0
      end: 73
firmness: firm
origin:
  kind: import
  ref: readme:README.md#L77
  recorded_at: '2026-11-02T12:13:44.572Z'
id: REQ-AUTO-65EF0234A0D677D8
type: req
---
The vX.Y.Z tag and GitHub release must be created by the Release workflow.

## Context

Replaces "Tags and releases must not be created by hand" (REQ-AUTO-53A457EEBD3E6B24). Piotr set the proof boundary to what the repository's own code can show: the code shows that the Release workflow's `github` job creates the tag and the release with `gh release create`. Stopping someone from creating one by hand is a GitHub tag ruleset, which lives outside the repository. Requested by Piotr on 2026-11-02.

## Why this changed

The old statement, "Tags and releases must not be created by hand", cannot be shown by the repository: only a GitHub tag ruleset stops a person. This statement keeps the part the Release workflow's code proves.

## Source

> Merging that pull request releases the new version: the `vX.Y.Z` tag and GitHub release (with the changelog section as notes and the Wasm parser attached), npm, crates.io and PyPI. [...] Don't create tags or releases by hand.

Source: tree-sitter-swi-prolog README - README.md#L75-L77
