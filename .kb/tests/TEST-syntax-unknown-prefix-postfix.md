---
title: An unknown prefix or postfix operator is an error in its own clause
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
    recovers_from_unknown_operator:
      symbol_id: SYM-proof-recovers-from-unknown-operator
      export: recoversFromUnknownOperator
      harness_for:
        - SYM-grammar-rules
  domains:
    operator_position:
      symbol_id: SYM-proof-unknown-operator-positions
      export: UNKNOWN_OPERATOR_POSITIONS
  proves:
    - CLAIM-C6B7A283A9D4D6DD
origin:
  kind: agent
  recorded_at: '2026-11-02T12:19:23.864Z'
id: TEST-syntax-unknown-prefix-postfix
type: test
proof_receipts:
  - version: kibi.proof-receipt.v2
    receipt_id: PR-d3d0d25eb4ea06b36b69bfd8
    test_id: TEST-syntax-unknown-prefix-postfix
    scope: end_to_end
    outcome: passed
    code_snapshot: b96f4c994e3fb7d656374a49615746b3438d168f0c1b5f11aad5ffd082a60aaa
    environment_hash: 0fe4faff3abd9383846f773ccd03a2e551c0e1792023b3084ed58b8687bccfaa
    started_at: '2026-11-03T07:52:21.956Z'
    finished_at: '2026-11-03T07:52:38.485Z'
    artifact_digest: 3bcdaf8671bc9ea8434eb81cb9b41a515f68d2539dc891dfd844440180677500
    contract_hash: 11eecf9b1001a9706626a5bd18b1d89801afbe9664dc67cbb684c41e92072a86
    binding_hash: 6540e13d111a58a1011bf2a4fb24d01f7fde9d236b943eb16ae8129922089018
    fingerprint: 0d6f3d8e0ad8835a911932b078f24715656b6aa79484996eba981648b32c8b2a
    fingerprint_components:
      contract: 11eecf9b1001a9706626a5bd18b1d89801afbe9664dc67cbb684c41e92072a86
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
      test_id: TEST-syntax-unknown-prefix-postfix
      domains:
        operator_position:
          symbol_id: SYM-proof-unknown-operator-positions
          members:
            - prefix
            - postfix
      predicates:
        recovers_from_unknown_operator:
          symbol_id: SYM-proof-recovers-from-unknown-operator
          arg_types:
            - operator_position
          rows:
            - args:
                - prefix
              value: true
            - args:
                - postfix
              value: true
    certificate_digest: eb74328d01aac9ec607610c29f28f0b3c118e343990b82c096f6edf5f950b464
    claim_bindings:
      - claim_key: CLAIM-C6B7A283A9D4D6DD
        requirement_id: REQ-AUTO-575A7DACDE738B4E
        fact_id: FACT-PROP-EC8D4F45D9A9B658
        binding: derived
        scope: harness
        obligation:
          kind: every_member
          members:
            - postfix
            - prefix
          predicate: recovers_from_unknown_operator
---
Rule certificate: Kibi calls recoversFromUnknownOperator on prefix and postfix and checks that each sample clause's error stays inside that clause.