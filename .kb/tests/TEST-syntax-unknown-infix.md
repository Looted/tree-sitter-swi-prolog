---
title: An unknown infix operator reads at priority 700
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
  recorded_at: '2026-10-30T23:32:18.658Z'
id: TEST-syntax-unknown-infix
type: test
proof_receipts:
  - version: kibi.proof-receipt.v2
    receipt_id: PR-0e428991256ea6cdd2e1ed38
    test_id: TEST-syntax-unknown-infix
    scope: end_to_end
    outcome: passed
    code_snapshot: b195ac80a85bbe18a6d3c36c38b7c7fb507dfc97fbf1abeb6442dd1874d951ad
    environment_hash: 0fe4faff3abd9383846f773ccd03a2e551c0e1792023b3084ed58b8687bccfaa
    started_at: '2026-11-02T11:24:53.103Z'
    finished_at: '2026-11-02T11:24:59.210Z'
    artifact_digest: 1246b8a0eeb12625bf902dcd4d24f74fd2e40aa72872809b791e248c8db2518a
    contract_hash: 107df8049231adf2d44bf6091aaa259ba7e56c86d7e2d122ba5b12fb44940b10
    binding_hash: 20116190b18eac3f8f127869f7509acdbc318c024fe1ad04493a8353c64dd83f
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
End-to-end test `An unknown infix operator reads at priority 700` in test/proof/syntax.test.js, run through `kibi prove`.
