---
title: check-corpus fails below the minimum and CI runs it at 99.5%
status: passing
verification_scope: end_to_end
verification_perspective: consumer
proof_contract:
  version: kibi.proof-contract.v1
  integration: unit
  success_policy: all_required_first_attempt
  kind: source
  required_proofs:
    - symbol_id: SYM-proof-corpus-tests
      target: default
  source:
    reader: yaml
    file: .github/workflows/ci.yml
    path: jobs.corpus.steps
    select: items
    field: run
  proves:
    - CLAIM-AA6721CEB10806BB
    - CLAIM-CDF1760D312B3643
origin:
  kind: agent
  recorded_at: '2026-10-30T23:33:17.598Z'
id: TEST-corpus-coverage-gate
type: test
proof_receipts:
  - version: kibi.proof-receipt.v2
    receipt_id: PR-672a39ede93827b0f93454c0
    test_id: TEST-corpus-coverage-gate
    scope: end_to_end
    outcome: passed
    code_snapshot: b4f66d64f064bd88b7605aff8379d77655b8a18899ef9493b1f5e2f2cca6a5d3
    environment_hash: 0fe4faff3abd9383846f773ccd03a2e551c0e1792023b3084ed58b8687bccfaa
    started_at: '2026-11-02T12:15:27.096Z'
    finished_at: '2026-11-02T12:15:32.714Z'
    artifact_digest: 5288d130e127ec079878d2c58c728dffe474b010be6ef7925903e726c7ab1307
    contract_hash: f5374fb45b31c81c1cca21ce5e03c63f436d6abe7d506ba6e939d3b9841db605
    binding_hash: 169943c80b7c98f2a9d6167d4466eade58013ff3ad1510290e7c52dcae103b0c
    fingerprint: 997fd5de4bedc53dfc8a54eca43e02008137ee064b85bb4bf35e045a864266cc
    fingerprint_components:
      contract: f5374fb45b31c81c1cca21ce5e03c63f436d6abe7d506ba6e939d3b9841db605
      integration: af87672080273366855cb4df145063c269d9f3126f8fdd25ceb7fb1373fea76d
      command: 299e4663ffa1f966e4081e6a5aed2b64cbe3a0e010b03f09d04d5616344a1346
      bindings: 4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945
      producer: 3f1ef45ea6f7a150dff44ba43ea098e729d8dcd4e35f67bb455191a7f38609be
    integration_id: unit
    producer:
      name: kibi-command-producer
    command_argv:
      - npx
      - '--no-install'
      - kibi
      - proof
      - run-steps
      - test/proof/steps.json
    run_outcome: passed
    proof_results:
      - symbol_id: SYM-proof-corpus-tests
        target: default
        outcome: passed
        binding: aggregate_run
        attempts:
          status: unavailable
    kind: source
    evidence_level: proved
    certificate:
      version: kibi.code-certificate.v1
      kind: source
      test_id: TEST-corpus-coverage-gate
      source:
        reader: yaml
        file: .github/workflows/ci.yml
        path: jobs.corpus.steps
        select: items
        field: run
      model:
        members:
          - git clone https://github.com/SWI-Prolog/swipl-devel examples/swipl-devel --depth=1 --filter=blob:none
          - node scripts/check-corpus.mjs --min 0.995 examples/swipl-devel/boot examples/swipl-devel/library
          - npm ci --ignore-scripts
          - tree-sitter build --wasm
        sequence:
          - npm ci --ignore-scripts
          - tree-sitter build --wasm
          - git clone https://github.com/SWI-Prolog/swipl-devel examples/swipl-devel --depth=1 --filter=blob:none
          - node scripts/check-corpus.mjs --min 0.995 examples/swipl-devel/boot examples/swipl-devel/library
    certificate_digest: 759f0cfb3ad771e8698c62330c619a8468f301130631ac56989e770233b8d5aa
    claim_bindings:
      - claim_key: CLAIM-AA6721CEB10806BB
        requirement_id: REQ-AUTO-068378E78CCF8A38
        fact_id: FACT-PROP-296A2FA7182CF7DC
        binding: derived
        scope: source
        obligation:
          kind: set_relation
          members:
            - git clone https://github.com/SWI-Prolog/swipl-devel examples/swipl-devel --depth=1 --filter=blob:none
            - node scripts/check-corpus.mjs --min 0.995 examples/swipl-devel/boot examples/swipl-devel/library
          operator: includes
      - claim_key: CLAIM-CDF1760D312B3643
        requirement_id: REQ-AUTO-54C43C681D60ACFD
        fact_id: FACT-PROP-AAEAA668C6FE5485
        binding: derived
        scope: source
        obligation:
          kind: set_relation
          members:
            - node scripts/check-corpus.mjs --min 0.995 examples/swipl-devel/boot examples/swipl-devel/library
          operator: includes
---
Source certificate: Kibi reads the `run` of each step of the `corpus` job in .github/workflows/ci.yml and checks the requirement's fact against it. The test also runs check-corpus above and below its minimum.
