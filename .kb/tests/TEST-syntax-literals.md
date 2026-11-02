---
title: Strings, codes and number forms parse
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
    - CLAIM-AAE71208779D2969
origin:
  kind: agent
  recorded_at: '2026-10-30T23:31:54.232Z'
id: TEST-syntax-literals
type: test
proof_receipts:
  - version: kibi.proof-receipt.v2
    receipt_id: PR-40bc40392e70aa70a136d3b7
    test_id: TEST-syntax-literals
    scope: end_to_end
    outcome: passed
    code_snapshot: b195ac80a85bbe18a6d3c36c38b7c7fb507dfc97fbf1abeb6442dd1874d951ad
    environment_hash: 0fe4faff3abd9383846f773ccd03a2e551c0e1792023b3084ed58b8687bccfaa
    started_at: '2026-11-02T11:25:38.876Z'
    finished_at: '2026-11-02T11:25:44.673Z'
    artifact_digest: d8abba9dd9acc7ddf27039478ad8a1a45901df502cbbd61e66f88ce259c49943
    contract_hash: 1c8ef79452f81d9250bc1a33fb53bfee8fe8333b3bd7aa224570c6bd80ddf81e
    binding_hash: 3f664e4876b52253627ee68d5122eda8d15e83c4d0761f2be1bc94ec9094b666
    fingerprint: 6bd5e15017cf4ab02af097fe3d6cd0ac08b646c7ac1c6f7fcaed1cfe0b88bd48
    fingerprint_components:
      contract: 1c8ef79452f81d9250bc1a33fb53bfee8fe8333b3bd7aa224570c6bd80ddf81e
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
      test_id: TEST-syntax-literals
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
    certificate_digest: 9e66fd7c16ed9dcb532e371a55ec5683cf03ba7ad9f25904b1b21d1a727bcf28
    claim_bindings:
      - claim_key: CLAIM-AAE71208779D2969
        requirement_id: REQ-AUTO-2A03F61D571A151C
        fact_id: FACT-PROP-8B99186EB128A655
        binding: derived
        scope: harness
        obligation:
          kind: every_member
          members:
            - back_quoted_string
            - char_code
            - float
            - integer
            - rational
            - string
          predicate: parses_examples
---
Rule certificate: `parsesExamples` parses every README example of a node type and checks the node it gives. Kibi calls it on every named node type of the generated parser (`NAMED_NODE_TYPES`, read from src/node-types.json) and checks that it holds for the literal types the requirement names.