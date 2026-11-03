---
title: 'Unicode names, multi-line quotes, comments and #! parse'
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
    parses_examples:
      symbol_id: SYM-proof-parses-examples
      export: parsesExamples
      harness_for:
        - SYM-grammar-rules
  domains:
    node_type:
      symbol_id: SYM-grammar-named-node-types
      export: NAMED_NODE_TYPES
  proves:
    - CLAIM-3A543BE7F509CFD2
origin:
  kind: agent
  recorded_at: '2026-10-30T23:32:02.320Z'
id: TEST-syntax-lexical
type: test
proof_receipts:
  - version: kibi.proof-receipt.v2
    receipt_id: PR-0c3c861f59f828c6259e3741
    test_id: TEST-syntax-lexical
    scope: end_to_end
    outcome: passed
    code_snapshot: b96f4c994e3fb7d656374a49615746b3438d168f0c1b5f11aad5ffd082a60aaa
    environment_hash: 0fe4faff3abd9383846f773ccd03a2e551c0e1792023b3084ed58b8687bccfaa
    started_at: '2026-11-03T07:52:21.956Z'
    finished_at: '2026-11-03T07:52:38.485Z'
    artifact_digest: 3bcdaf8671bc9ea8434eb81cb9b41a515f68d2539dc891dfd844440180677500
    contract_hash: 9524877c6d242587ed94bc3e79081027748ed49a7af2b63306d8f15dbab62c41
    binding_hash: 35175df728a9dad2bc91d024e662377ac977f9f3c4d76fbf7500954ced515426
    fingerprint: 2509adfb9de0395a4fa9d4b70afc3c3c7d4dd839703e6b06b8bb8c9b0cefdcad
    fingerprint_components:
      contract: 9524877c6d242587ed94bc3e79081027748ed49a7af2b63306d8f15dbab62c41
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
      test_id: TEST-syntax-lexical
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
        parses_examples:
          symbol_id: SYM-proof-parses-examples
          arg_types:
            - node_type
          rows:
            - args:
                - arguments
              value: false
            - args:
                - atom
              value: true
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
              value: true
            - args:
                - dict_call
              value: true
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
              value: true
            - args:
                - char_code
              value: true
            - args:
                - comment
              value: true
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
              value: true
            - args:
                - string
              value: true
            - args:
                - variable
              value: true
    certificate_digest: f8e45eedab6a18df4a82d6ce746beb13b6bd71f2e73b99b7c7ecbb31aae1a65f
    claim_bindings:
      - claim_key: CLAIM-3A543BE7F509CFD2
        requirement_id: REQ-AUTO-C460B818EDA9A21D
        fact_id: FACT-PROP-754BCE2B3399FCCE
        binding: derived
        scope: harness
        obligation:
          kind: every_member
          members:
            - atom
            - comment
            - shebang
            - string
            - variable
          predicate: parses_examples
---
Rule certificate: `parsesExamples` parses every README example of a node type (Unicode atoms and variables, multi-line quoted text, both comment forms, `#!`) and checks the node it gives. Kibi calls it on every named node type of the generated parser.