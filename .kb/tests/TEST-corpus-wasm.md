---
title: The Wasm parser loads in web-tree-sitter
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
  kind: rule
  predicate_source:
    loads_in_web_tree_sitter:
      symbol_id: SYM-proof-loads-in-web-tree-sitter
      export: loadsInWebTreeSitter
      harness_for:
        - SYM-grammar-rules
  domains:
    wasm_file:
      source:
        reader: glob
        pattern: '*.wasm'
  proves:
    - CLAIM-2346716B42273929
origin:
  kind: agent
  recorded_at: '2026-10-30T23:33:09.018Z'
id: TEST-corpus-wasm
type: test
proof_receipts:
  - version: kibi.proof-receipt.v2
    receipt_id: PR-b80f6de13bdf75a87fac1784
    test_id: TEST-corpus-wasm
    scope: end_to_end
    outcome: passed
    code_snapshot: b96f4c994e3fb7d656374a49615746b3438d168f0c1b5f11aad5ffd082a60aaa
    environment_hash: 0fe4faff3abd9383846f773ccd03a2e551c0e1792023b3084ed58b8687bccfaa
    started_at: '2026-11-03T07:52:21.956Z'
    finished_at: '2026-11-03T07:52:38.485Z'
    artifact_digest: 3bcdaf8671bc9ea8434eb81cb9b41a515f68d2539dc891dfd844440180677500
    contract_hash: 093203579ff0cf0c453254120ed21230364ef68e3aa63dd886424bb8f5d91abd
    binding_hash: 0d07ef171fa708c2ed26a1a0cc13f737819a4f85d206cb406d960c5a197082bf
    fingerprint: f19e2522e4c1df3fadd75367390af35305b673ce7a6001561e5c5adf60f6b801
    fingerprint_components:
      contract: 093203579ff0cf0c453254120ed21230364ef68e3aa63dd886424bb8f5d91abd
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
    kind: rule
    evidence_level: proved
    certificate:
      version: kibi.code-certificate.v1
      kind: rule
      test_id: TEST-corpus-wasm
      domains:
        wasm_file:
          members:
            - tree-sitter-swi_prolog.wasm
      predicates:
        loads_in_web_tree_sitter:
          symbol_id: SYM-proof-loads-in-web-tree-sitter
          arg_types:
            - wasm_file
          rows:
            - args:
                - tree-sitter-swi_prolog.wasm
              value: true
    certificate_digest: 898588b93f89d893f7f73b36487d94193cf53bb710e25a9defd32e743571f9e9
    claim_bindings:
      - claim_key: CLAIM-2346716B42273929
        requirement_id: REQ-AUTO-2EB5D8FC1F5670C3
        fact_id: FACT-PROP-3CB88C0D09E2810A
        binding: derived
        scope: harness
        obligation:
          kind: every_member
          members:
            - tree-sitter-swi_prolog.wasm
          predicate: loads_in_web_tree_sitter
---
Rule certificate: steps.json builds the parser with `tree-sitter build --wasm`, then Kibi finds the `*.wasm` files in the repository root itself and calls `loadsInWebTreeSitter` on each: it loads the file in web-tree-sitter and parses a clause without errors.