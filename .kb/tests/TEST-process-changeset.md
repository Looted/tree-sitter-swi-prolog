---
title: CI fails a pull request without a changeset
status: passing
verification_scope: end_to_end
verification_perspective: consumer
proof_contract:
  version: kibi.proof-contract.v1
  integration: unit
  success_policy: all_required_first_attempt
  kind: source
  required_proofs:
    - symbol_id: SYM-proof-process-tests
      target: default
  source:
    reader: yaml
    file: .github/workflows/ci.yml
    path: jobs.changeset.steps
    select: items
    field: run
  proves:
    - CLAIM-6C373613BEB8EB55
origin:
  kind: agent
  recorded_at: '2026-11-02T12:14:41.523Z'
id: TEST-process-changeset
type: test
proof_receipts:
  - version: kibi.proof-receipt.v2
    receipt_id: PR-947eee8dff9b6f5a4057f0cd
    test_id: TEST-process-changeset
    scope: end_to_end
    outcome: passed
    code_snapshot: ed7a44eb133eaa920d5aa961ffae01808b5817e516c84f325fed905d008cbb83
    environment_hash: 0fe4faff3abd9383846f773ccd03a2e551c0e1792023b3084ed58b8687bccfaa
    started_at: '2026-11-02T12:15:45.361Z'
    finished_at: '2026-11-02T12:15:51.423Z'
    artifact_digest: 7009b368b790f00982372d1c8ad367fcc3a378f97cc29696340347a190185758
    contract_hash: 919989cbd6a51f0d38ee436328e1ebd7820e790b4aad08adea4d7596b9ff6818
    binding_hash: 595e24fdc130e6b3942a1b4aaee860dfe8ca19fc4030d712b6d23ae480cbee3c
    fingerprint: bc638d7d9e77af4d1b3b245b59c39474e67ae6af727f9809e71f3d9e88578b6b
    fingerprint_components:
      contract: 919989cbd6a51f0d38ee436328e1ebd7820e790b4aad08adea4d7596b9ff6818
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
      - symbol_id: SYM-proof-process-tests
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
      test_id: TEST-process-changeset
      source:
        reader: yaml
        file: .github/workflows/ci.yml
        path: jobs.changeset.steps
        select: items
        field: run
      model:
        members:
          - npm ci --ignore-scripts
          - npx changeset status --since=origin/${{ github.base_ref }}
        sequence:
          - npm ci --ignore-scripts
          - npx changeset status --since=origin/${{ github.base_ref }}
    certificate_digest: 08b6954578f45ea1596871507852953b521d18d67ecb9c7bcd190b8894ea63b0
    claim_bindings:
      - claim_key: CLAIM-6C373613BEB8EB55
        requirement_id: REQ-AUTO-D9317CC01F8900DD
        fact_id: FACT-PROP-AC937A9DDC7A22B4
        binding: derived
        scope: source
        obligation:
          kind: set_relation
          members:
            - npx changeset status --since=origin/${{ github.base_ref }}
          operator: includes
---
Source certificate: Kibi reads the `run` of each step of the `changeset` job in .github/workflows/ci.yml and checks the requirement's fact against it.