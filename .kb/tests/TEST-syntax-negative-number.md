---
title: A negative number is prefix minus on the number
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
  kind: rule
  predicate_source:
    negates_as_prefix_minus:
      symbol_id: SYM-proof-negates-as-prefix-minus
      export: negatesAsPrefixMinus
      harness_for:
        - SYM-grammar-rules
  domains:
    node_type:
      symbol_id: SYM-grammar-named-node-types
      export: NAMED_NODE_TYPES
  proves:
    - CLAIM-EDFA4363877F2614
origin:
  kind: agent
  recorded_at: '2026-10-30T23:32:27.084Z'
id: TEST-syntax-negative-number
type: test
proof_receipts:
  - version: kibi.proof-receipt.v2
    receipt_id: PR-de10545e1ca22eaf0c9de84e
    test_id: TEST-syntax-negative-number
    scope: end_to_end
    outcome: passed
    code_snapshot: 0202941c4f45423b9416dc21798f1ccf171b9c35629d7da4498a2019fecaedee
    environment_hash: 0fe4faff3abd9383846f773ccd03a2e551c0e1792023b3084ed58b8687bccfaa
    started_at: '2026-11-02T12:19:39.355Z'
    finished_at: '2026-11-02T12:19:45.638Z'
    artifact_digest: 1b0fdc7e9111a88a8f7116cae95e74d5a9792e1bf756beb9536e6c6efb06744f
    contract_hash: 0d7685e473ce2336b53dcd66bfeeb0b0daf474a4bac361121cd34f6795ae5253
    binding_hash: af737ca9ae11f491aa1023d3d9aea5080df051d6bf460ab8592516462018250d
    fingerprint: 9c06e9ddbda3d20d4d3cc40f73c62814abf0c8508869c3499947f459bc3be450
    fingerprint_components:
      contract: 0d7685e473ce2336b53dcd66bfeeb0b0daf474a4bac361121cd34f6795ae5253
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
      test_id: TEST-syntax-negative-number
      domains:
        node_type:
          symbol_id: SYM-grammar-named-node-types
          members:
            - arguments
            - atom
            - binary_operation
            - clause
            - compound_term
            - curly_term
            - dict
            - dict_call
            - dict_pair
            - directive
            - index_term
            - list
            - parenthesized_term
            - prefix_operation
            - query
            - source_file
            - back_quoted_string
            - char_code
            - comment
            - end
            - float
            - integer
            - operator
            - rational
            - shebang
            - string
            - variable
      predicates:
        negates_as_prefix_minus:
          symbol_id: SYM-proof-negates-as-prefix-minus
          arg_types:
            - node_type
          rows:
            - args:
                - arguments
              value: false
            - args:
                - atom
              value: false
            - args:
                - binary_operation
              value: false
            - args:
                - clause
              value: false
            - args:
                - compound_term
              value: false
            - args:
                - curly_term
              value: false
            - args:
                - dict
              value: false
            - args:
                - dict_call
              value: false
            - args:
                - dict_pair
              value: false
            - args:
                - directive
              value: false
            - args:
                - index_term
              value: false
            - args:
                - list
              value: false
            - args:
                - parenthesized_term
              value: false
            - args:
                - prefix_operation
              value: false
            - args:
                - query
              value: false
            - args:
                - source_file
              value: false
            - args:
                - back_quoted_string
              value: false
            - args:
                - char_code
              value: false
            - args:
                - comment
              value: false
            - args:
                - end
              value: false
            - args:
                - float
              value: true
            - args:
                - integer
              value: true
            - args:
                - operator
              value: false
            - args:
                - rational
              value: true
            - args:
                - shebang
              value: false
            - args:
                - string
              value: false
            - args:
                - variable
              value: false
    certificate_digest: 23a433d079905dea6def256a506f4be0cbaf42b2e96067239b71b0cd3f775432
    claim_bindings:
      - claim_key: CLAIM-EDFA4363877F2614
        requirement_id: REQ-AUTO-0307D6FD09C88974
        fact_id: FACT-PROP-4523463EDEDE2A83
        binding: derived
        scope: harness
        obligation:
          kind: every_member
          members:
            - float
            - integer
            - rational
          predicate: negates_as_prefix_minus
---
Rule certificate: `negatesAsPrefixMinus` parses `-N` for every example of a number type and checks it is the prefix operator `-` applied to that number. Kibi calls it on every named node type of the generated parser and checks it holds for `integer`, `float` and `rational`.