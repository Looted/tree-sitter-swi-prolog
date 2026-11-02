---
title: The Go binding returns the generated parser
status: passing
verification_scope: end_to_end
verification_perspective: consumer
proof_contract:
  version: kibi.proof-contract.v1
  integration: unit
  success_policy: all_required_first_attempt
  kind: source
  required_proofs:
    - symbol_id: SYM-proof-bindings-tests
      target: default
  source:
    reader: references
    files:
      - bindings/go/binding.go
    extract: calls
  proves:
    - CLAIM-B78AC7F12E2A5ACA
origin:
  kind: agent
  recorded_at: '2026-11-02T11:24:38.590Z'
id: TEST-bindings-go-language
type: test
proof_receipts:
  - version: kibi.proof-receipt.v2
    receipt_id: PR-ca4e80b94a05a057db2cccdc
    test_id: TEST-bindings-go-language
    scope: end_to_end
    outcome: passed
    code_snapshot: b195ac80a85bbe18a6d3c36c38b7c7fb507dfc97fbf1abeb6442dd1874d951ad
    environment_hash: 0fe4faff3abd9383846f773ccd03a2e551c0e1792023b3084ed58b8687bccfaa
    started_at: '2026-11-02T11:25:38.876Z'
    finished_at: '2026-11-02T11:25:44.673Z'
    artifact_digest: d8abba9dd9acc7ddf27039478ad8a1a45901df502cbbd61e66f88ce259c49943
    contract_hash: ed40e2c85437130c074363a11da61a1a1e7050348c391440dc6d0951df0123bc
    binding_hash: 41a1e85aea42a6b8e236ec2db5ca2a634d3fa32c32cb9727d464d33fd4f606c7
    fingerprint: e610a5423b920f055d758101eb7e36111db8972fa4fc620ca17a989641506f82
    fingerprint_components:
      contract: ed40e2c85437130c074363a11da61a1a1e7050348c391440dc6d0951df0123bc
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
      - symbol_id: SYM-proof-bindings-tests
        target: default
        outcome: passed
        binding: aggregate_run
        attempts:
          status: unavailable
    kind: source
    evidence_level: proved
    certificate:
      version: kibi.code-certificate.v1
      kind: source
      test_id: TEST-bindings-go-language
      source:
        reader: references
        files:
          - bindings/go/binding.go
        extract: calls
      model:
        members:
          - C.tree_sitter_swi_prolog
          - unsafe.Pointer
    certificate_digest: 074be2152deb794d3c5d293ee6765b77564b13336cc6b918db5d986d93ee43ef
    claim_bindings:
      - claim_key: CLAIM-B78AC7F12E2A5ACA
        requirement_id: REQ-AUTO-5E8305031338D030
        fact_id: FACT-PROP-FBB95D466F572051
        binding: derived
        scope: source
        obligation:
          kind: set_relation
          members:
            - C.tree_sitter_swi_prolog
          operator: includes
---
Source certificate: Kibi parses bindings/go/binding.go with kibi-plugin-treesitter and the kibi-lang-go grammar pack, lists what it calls and checks the requirement's fact against it.