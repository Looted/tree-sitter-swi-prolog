---
title: CI fails a pull request without a changeset
status: active
origin:
  kind: agent
  recorded_at: '2026-11-02T12:14:37.222Z'
id: SCEN-process-changeset
type: scenario
---
Given a pull request, when CI runs its `changeset` job, then it runs `npx changeset status` against the base branch, which fails unless the pull request adds a changeset (an empty one for a change users do not see). The Version packages pull request is exempt, because it consumes the changesets.

The expected behavior comes from the README line this requirement cites.