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
origin:
  kind: agent
  recorded_at: '2026-10-30T23:33:17.598Z'
id: TEST-corpus-coverage-gate
type: test
proof_receipts:
  - version: kibi.proof-receipt.v2
    receipt_id: PR-86bed0ea9d8739ccc176c091
    test_id: TEST-corpus-coverage-gate
    scope: end_to_end
    outcome: passed
    code_snapshot: eaec8849b72521aed9373f166419bd88bcca4986ee6b1cc249715aa547ee74f9
    environment_hash: 70794eb189f6bb0bd59b638fedca584356a0b61f01329f6f9f4e9f53a3b5be53
    started_at: '2026-10-30T23:37:18.161Z'
    finished_at: '2026-10-30T23:37:22.227Z'
    artifact_digest: d42a7d80c5e829f4cc8b5b246592257ab7848f6f9fd9fcf5936e9c2d2c7b46e2
    contract_hash: a7c6e45dc92a6407a16d80fa57cf982f0e68d41241c90e4eef77e7678eccfa5c
    binding_hash: 9aba7bb097c3d07c5fa89482c332beeb3abfdb0f82c3aee78851c638129094c3
    fingerprint: 4d061abb79a323284321e46829261c43ff0c4e2d67f5a26e1be7d6397cf6a77d
    fingerprint_components:
      contract: a7c6e45dc92a6407a16d80fa57cf982f0e68d41241c90e4eef77e7678eccfa5c
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
---
Source certificate: Kibi reads the `run` of each step of the `corpus` job in .github/workflows/ci.yml and checks the requirement's fact against it. The test also runs check-corpus above and below its minimum.
