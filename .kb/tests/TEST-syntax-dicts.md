---
title: Dicts and functional notation on dicts parse
status: passing
verification_scope: end_to_end
verification_perspective: consumer
proof_contract:
  version: kibi.proof-contract.v1
  integration: unit
  success_policy: all_required_first_attempt
  required_proofs:
    - symbol_id: SYM-proof-syntax-tests
      target: default
origin:
  kind: agent
  recorded_at: '2026-10-30T23:31:45.164Z'
id: TEST-syntax-dicts
type: test
proof_receipts:
  - version: kibi.proof-receipt.v2
    receipt_id: PR-4a27062fd699d3fcd9999e9e
    test_id: TEST-syntax-dicts
    scope: end_to_end
    outcome: passed
    code_snapshot: 7b85d4f642b5ec9822107fa8eece7de71d60e710c0fc174f1c9998af5e9b6902
    environment_hash: 70794eb189f6bb0bd59b638fedca584356a0b61f01329f6f9f4e9f53a3b5be53
    started_at: '2026-10-30T23:35:24.842Z'
    finished_at: '2026-10-30T23:35:28.917Z'
    artifact_digest: 34fd9b2b3b69894063898b3bc245a338e3e07c21039248b571a10cd76d3d96ac
    contract_hash: 107df8049231adf2d44bf6091aaa259ba7e56c86d7e2d122ba5b12fb44940b10
    binding_hash: d380a1c9d45b07571449fb71ec4d586aa48e21ef984743d6017ef10e4b00bcd3
    fingerprint: fa49ce7d26d15c92de65d2e295a57e2ad200b38ec4c024956261f0b0d18b55e4
    fingerprint_components:
      contract: 107df8049231adf2d44bf6091aaa259ba7e56c86d7e2d122ba5b12fb44940b10
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
      - symbol_id: SYM-proof-syntax-tests
        target: default
        outcome: passed
        binding: aggregate_run
        attempts:
          status: unavailable
    kind: e2e
    evidence_level: tested
---
End-to-end test `Dicts and functional notation on dicts parse` in test/proof/syntax.test.js, run through `kibi prove`.
