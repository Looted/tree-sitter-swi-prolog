---
title: Corpus Job Runs includes git clone https://github.com/SWI-Prolog/swipl-devel examples/swipl-devel --depth=1 --filter=blob:none, node scripts/check-corpus.mjs --min 0.995 examples/swipl-devel/boot examples/swipl-devel/library
status: active
text_ref: mcp://kibi/model-requirement
tags:
  - strict-modeling
  - confidence:0.80
  - confidence-band:medium
  - provenance:mcp-kibi-model-requirement
  - lane:strict
  - fact:property_value
fact_kind: property_value
subject_key: coverage.ci
property_key: corpus_job_runs
canonical_key: mcp-kibi-model-requirement:coverage.ci:corpus_job_runs:includes:git_clone_https_github.com_swi-prolog_swipl-devel_examples_swipl-devel_--depth_1_--filter_blob_none_node_scripts_check-corpus.mjs_--min_0.995_examples_swipl-devel_boot_examples_swipl-devel_library
operator: includes
value_type: set
value_set:
  - git clone https://github.com/SWI-Prolog/swipl-devel examples/swipl-devel --depth=1 --filter=blob:none
  - node scripts/check-corpus.mjs --min 0.995 examples/swipl-devel/boot examples/swipl-devel/library
claim_key: CLAIM-AA6721CEB10806BB
claim_text: CI must fail if fewer than 99.5% of top-level terms in SWI-Prolog's own boot/ and library/ sources parse without errors.
origin:
  kind: agent
  recorded_at: '2026-10-30T23:30:49.155Z'
id: FACT-PROP-296A2FA7182CF7DC
type: fact
---
