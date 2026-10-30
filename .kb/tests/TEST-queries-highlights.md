---
title: highlights.scm captures comments, strings, numbers and variables
status: passing
verification_scope: end_to_end
verification_perspective: consumer
proof_contract:
  version: kibi.proof-contract.v1
  integration: unit
  success_policy: all_required_first_attempt
  required_proofs:
    - symbol_id: SYM-proof-queries-tests
      target: default
origin:
  kind: agent
  recorded_at: '2026-10-30T23:32:35.219Z'
id: TEST-queries-highlights
type: test
proof_receipts:
  - version: kibi.proof-receipt.v2
    receipt_id: PR-7380e1358ec67536a0b4d714
    test_id: TEST-queries-highlights
    scope: end_to_end
    outcome: passed
    code_snapshot: eaec8849b72521aed9373f166419bd88bcca4986ee6b1cc249715aa547ee74f9
    environment_hash: 70794eb189f6bb0bd59b638fedca584356a0b61f01329f6f9f4e9f53a3b5be53
    started_at: '2026-10-30T23:37:18.161Z'
    finished_at: '2026-10-30T23:37:22.227Z'
    artifact_digest: d42a7d80c5e829f4cc8b5b246592257ab7848f6f9fd9fcf5936e9c2d2c7b46e2
    contract_hash: b90808221958492f1e9ae18b8f147aac97b1cf0de42ed919e1a07138e718d52a
    binding_hash: e2d89d1472075d6a254c121e492523ab3b5c6e2a2e5a48c776eacc3460677ff6
    fingerprint: 4d874c32746e19d66944824a805244a0e3afda243998a6f15b2d5d0dd30f4697
    fingerprint_components:
      contract: b90808221958492f1e9ae18b8f147aac97b1cf0de42ed919e1a07138e718d52a
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
      - symbol_id: SYM-proof-queries-tests
        target: default
        outcome: passed
        binding: aggregate_run
        attempts:
          status: unavailable
    kind: e2e
    evidence_level: tested
---
End-to-end test `highlights.scm captures comments, strings, numbers and variables` in test/proof/queries.test.js, run through `kibi prove`.
