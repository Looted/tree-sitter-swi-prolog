---
title: SWI-Prolog's own boot/ and library/ parse
status: passing
verification_scope: end_to_end
verification_perspective: consumer
proof_contract:
  version: kibi.proof-contract.v1
  integration: unit
  success_policy: all_required_first_attempt
  required_proofs:
    - symbol_id: SYM-proof-corpus-tests
      target: default
origin:
  kind: agent
  recorded_at: '2026-10-30T23:32:59.425Z'
id: TEST-corpus-real-prolog
type: test
proof_receipts:
  - version: kibi.proof-receipt.v2
    receipt_id: PR-ad0619abfa437b6cee65de8f
    test_id: TEST-corpus-real-prolog
    scope: end_to_end
    outcome: passed
    code_snapshot: 7b85d4f642b5ec9822107fa8eece7de71d60e710c0fc174f1c9998af5e9b6902
    environment_hash: 70794eb189f6bb0bd59b638fedca584356a0b61f01329f6f9f4e9f53a3b5be53
    started_at: '2026-10-30T23:35:24.842Z'
    finished_at: '2026-10-30T23:35:28.917Z'
    artifact_digest: 34fd9b2b3b69894063898b3bc245a338e3e07c21039248b571a10cd76d3d96ac
    contract_hash: 662295058add4c7d165413df194ca90d2ab73786888707ede78598dfc99706e6
    binding_hash: b2cb942c15957894091feffd55209ad75c3fccdc294814dedbf6d08030a5fa79
    fingerprint: 5c68291f608560e286f09a50c79cacf095401f32e3c14ac8008b93e2c2b3ba7b
    fingerprint_components:
      contract: 662295058add4c7d165413df194ca90d2ab73786888707ede78598dfc99706e6
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
    kind: e2e
    evidence_level: tested
---
End-to-end test `SWI-Prolog's own boot/ and library/ parse` in test/proof/corpus.test.js, run through `kibi prove`.
