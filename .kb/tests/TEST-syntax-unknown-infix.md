---
title: An unknown infix operator reads at priority 700
status: passing
verification_scope: end_to_end
verification_perspective: consumer
proof_contract:
  version: kibi.proof-contract.v1
  integration: unit
  success_policy: all_required_first_attempt
  kind: rule
  required_proofs:
    - symbol_id: SYM-proof-syntax-tests
      target: default
  predicate_source:
    reads_as_unknown_infix:
      symbol_id: SYM-proof-reads-as-unknown-infix
      export: readsAsUnknownInfix
      harness_for:
        - SYM-grammar-rules
  domains:
    operator_kind:
      symbol_id: SYM-grammar-unknown-infix-kinds
      export: UNKNOWN_INFIX_KINDS
  proves:
    - CLAIM-DB70804A1AF3917A
origin:
  kind: agent
  recorded_at: '2026-10-30T23:32:18.658Z'
id: TEST-syntax-unknown-infix
type: test
proof_receipts:
  - version: kibi.proof-receipt.v2
    receipt_id: PR-3c0a1097c5fd31b0502a6935
    test_id: TEST-syntax-unknown-infix
    scope: end_to_end
    outcome: passed
    code_snapshot: 517ffe0f4de155e769c6370fc24763776556a8a3b4c15539f1b4cdaa9560a584
    environment_hash: 0fe4faff3abd9383846f773ccd03a2e551c0e1792023b3084ed58b8687bccfaa
    started_at: '2026-11-02T12:11:17.185Z'
    finished_at: '2026-11-02T12:11:23.501Z'
    artifact_digest: 3b9631206df8c2774729c5a553a1c3782acfa682b43c5b6e355cbccfe21eda3a
    contract_hash: 49a948be71d7625ff5f009131745443a8ca100dc71365199c04005c69712d99f
    binding_hash: 27d72259acf45539ae5615a24bb742863ea14aa4486a4997a32e63537360308b
    fingerprint: 4ccf8ad2f28b4f8058bb03429cc4843e0f46ec35f9bb841c89dfff4b53e5252e
    fingerprint_components:
      contract: 49a948be71d7625ff5f009131745443a8ca100dc71365199c04005c69712d99f
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
    kind: rule
    evidence_level: proved
    certificate:
      version: kibi.code-certificate.v1
      kind: rule
      test_id: TEST-syntax-unknown-infix
      domains:
        operator_kind:
          symbol_id: SYM-grammar-unknown-infix-kinds
          members:
            - symbolic
            - alphanumeric
      predicates:
        reads_as_unknown_infix:
          symbol_id: SYM-proof-reads-as-unknown-infix
          arg_types:
            - operator_kind
          rows:
            - args:
                - symbolic
              value: true
            - args:
                - alphanumeric
              value: true
    certificate_digest: 1d58c4d1989e3ce7c4e25abc8895c1a416fcaf8f1321b84a4986159410d3329b
    claim_bindings:
      - claim_key: CLAIM-DB70804A1AF3917A
        requirement_id: REQ-AUTO-3F73C36BFAA4E7AD
        fact_id: FACT-PROP-B6A914EFF335B73E
        binding: derived
        scope: harness
        obligation:
          kind: every_member
          members:
            - alphanumeric
            - symbolic
          predicate: reads_as_unknown_infix
---
End-to-end test `An unknown infix operator reads at priority 700` in test/proof/syntax.test.js, run through `kibi prove`.
