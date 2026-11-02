---
title: The Release workflow creates the tag and release
status: active
origin:
  kind: agent
  recorded_at: '2026-11-02T12:14:38.271Z'
id: SCEN-process-release-workflow
type: scenario
---
Given a version that has no GitHub release yet, when the Release workflow's `github` job runs, then it creates the `vX.Y.Z` tag and GitHub release with `gh release create`, with the changelog notes and the Wasm parser attached.

The expected behavior comes from the README lines this requirement cites.