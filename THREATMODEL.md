# Hedge Threat Model

> Generated from repository evidence. This document surfaces design-level risks; it is not a vulnerability verdict or a replacement for SAST, DAST, review, or penetration testing.

**Generated:** 2026-07-19T22:04:33.298Z
**Framework:** nextjs
**Open risks:** 8

## Attack-surface graph

```mermaid
flowchart LR
  n_auth_control_7bf2b37d213596d1[Authentication check: auth]
  class n_auth_control_7bf2b37d213596d1 application;
  n_authorization_control_20b83844dc80aa0d[Resource ownership derivation]
  class n_authorization_control_20b83844dc80aa0d application;
  n_authorization_control_f2e1d5e80a7ef898[Resource ownership constraint]
  class n_authorization_control_f2e1d5e80a7ef898 application;
  n_data_model_Note[Note]
  class n_data_model_Note data;
  n_data_model_User[User]
  class n_data_model_User data;
  n_database_754eec4f7490bdab[Database read: note.findMany]
  class n_database_754eec4f7490bdab data;
  n_dependency__aws_sdk_client_s3[@aws-sdk/client-s3@^3.0.0]
  class n_dependency__aws_sdk_client_s3 external;
  n_dependency_next[next@16.0.0]
  class n_dependency_next external;
  n_dependency_prisma[prisma@^6.0.0]
  class n_dependency_prisma external;
  n_entrypoint_4b2ea28c1d4f8a82([Workflow Hedge Codex remediation issue_comment])
  class n_entrypoint_4b2ea28c1d4f8a82 risk;
  n_entrypoint_7687698fbe395d3f([GET /api/notes])
  class n_entrypoint_7687698fbe395d3f public;
  n_entrypoint_7821443e29938cb4([POST /api/files/upload])
  class n_entrypoint_7821443e29938cb4 risk;
  n_entrypoint_990d177729aa156e([Workflow Hedge risk acceptance issue_comment])
  class n_entrypoint_990d177729aa156e risk;
  n_entrypoint_9a322eb01dabea6f([Workflow Hedge counterfactual verification workflow_dispatch])
  class n_entrypoint_9a322eb01dabea6f application;
  n_entrypoint_b076fdc38a2fd3cc([Workflow Refresh Hedge model push])
  class n_entrypoint_b076fdc38a2fd3cc application;
  n_entrypoint_e5ae053d65935696([Workflow Hedge security diff pull_request_target])
  class n_entrypoint_e5ae053d65935696 risk;
  n_secret_07d154c042bee004[OPENAI_API_KEY]
  class n_secret_07d154c042bee004 risk;
  n_storage_ac193b90989396d6[Storage write]
  class n_storage_ac193b90989396d6 verified;
  n_entrypoint_7821443e29938cb4 -->|Storage write| n_storage_ac193b90989396d6
  n_entrypoint_7687698fbe395d3f -->|authorizes| n_authorization_control_f2e1d5e80a7ef898
  n_entrypoint_7687698fbe395d3f -->|authorizes| n_authorization_control_20b83844dc80aa0d
  n_entrypoint_e5ae053d65935696 -->|Workflow uses OPENAI_API_KEY| n_secret_07d154c042bee004
  n_entrypoint_7687698fbe395d3f -->|Database read: note.findMany| n_database_754eec4f7490bdab
  n_database_754eec4f7490bdab -->|Database read: note.findMany| n_data_model_Note
  n_entrypoint_4b2ea28c1d4f8a82 -->|Workflow uses OPENAI_API_KEY| n_secret_07d154c042bee004
  n_entrypoint_7687698fbe395d3f -->|authenticates| n_auth_control_7bf2b37d213596d1
  linkStyle 0 stroke:#dc2626,stroke-width:3px;
  linkStyle 3 stroke:#dc2626,stroke-width:3px;
  linkStyle 6 stroke:#dc2626,stroke-width:3px;
  classDef public fill:#f4f4f5,stroke:#71717a,color:#18181b;
  classDef application fill:#dcfce7,stroke:#15803d,color:#14532d;
  classDef privileged fill:#fef3c7,stroke:#b45309,color:#78350f;
  classDef data fill:#dbeafe,stroke:#1d4ed8,color:#1e3a8a;
  classDef external fill:#ede9fe,stroke:#7c3aed,color:#4c1d95;
  classDef unknown fill:#f4f4f5,stroke:#a1a1aa,color:#3f3f46,stroke-dasharray: 5 5;
  classDef added fill:#ecfccb,stroke:#65a30d,color:#365314,stroke-width:2px;
  classDef verified fill:#dcfce7,stroke:#16a34a,color:#14532d,stroke-width:3px;
  classDef risk fill:#fee2e2,stroke:#dc2626,color:#7f1d1d,stroke-width:3px;
```

## Security invariants

No repository-defined security invariants were evaluated in the latest persisted run.

## Assets and surfaces

- **Authentication check: auth** — auth-control; trust zone: application; evidence: `app/api/notes/route.ts:2`
- **Resource ownership derivation** — authorization-control; trust zone: application; evidence: `app/api/notes/route.ts:9`
- **Resource ownership constraint** — authorization-control; trust zone: application; evidence: `app/api/notes/route.ts:4`
- **Note** — data-model; trust zone: data; evidence: `prisma/schema.prisma:6`
- **User** — data-model; trust zone: data; evidence: `prisma/schema.prisma:1`
- **Database read: note.findMany** — database; trust zone: data; evidence: `app/api/notes/route.ts:4`
- **@aws-sdk/client-s3@^3.0.0** — dependency; trust zone: external; evidence: `package.json:1`
- **next@16.0.0** — dependency; trust zone: external; evidence: `package.json:1`
- **prisma@^6.0.0** — dependency; trust zone: external; evidence: `package.json:1`
- **Workflow Hedge Codex remediation (issue_comment)** — entrypoint; trust zone: public; evidence: `.github/workflows/hedge-fix.yml:4`
- **GET /api/notes** — entrypoint; trust zone: public; evidence: `app/api/notes/route.ts:1`
- **POST /api/files/upload** — entrypoint; trust zone: public; evidence: `app/api/files/upload/route.ts:3`
- **Workflow Hedge risk acceptance (issue_comment)** — entrypoint; trust zone: public; evidence: `.github/workflows/hedge-prune.yml:3`
- **Workflow Hedge counterfactual verification (workflow_dispatch)** — entrypoint; trust zone: application; evidence: `.github/workflows/hedge-verify.yml:4`
- **Workflow Refresh Hedge model (push)** — entrypoint; trust zone: application; evidence: `.github/workflows/hedge-refresh.yml:3`
- **Workflow Hedge security diff (pull_request_target)** — entrypoint; trust zone: public; evidence: `.github/workflows/hedge.yml:7`
- **OPENAI_API_KEY** — secret; trust zone: privileged; evidence: `.github/workflows/hedge-fix.yml:174`, `.github/workflows/hedge.yml:92`
- **Storage write** — storage; trust zone: data; evidence: `app/api/files/upload/route.ts:6`

## Open risk register

### HEDGE-001: Publicly triggerable workflow adds repository write permissions

- **Severity:** high
- **Status:** open
- **Attack path:** External contributor → Workflow Hedge Codex remediation (issue_comment) → Write permissions: job:publish-draft:contents, job:publish-draft:pull-requests
- **Security invariant:** Publicly triggerable jobs must remain read-only unless a separate trusted approval gate authorizes a narrowly scoped write.
- **Missing controls:** Least-privilege job permissions, Separate untrusted analysis from privileged publication
- **Evidence:** `.github/workflows/hedge-fix.yml:4`
- **Confidence:** 86%

### HEDGE-002: Publicly triggerable workflow adds repository write permissions

- **Severity:** high
- **Status:** open
- **Attack path:** External contributor → Workflow Hedge risk acceptance (issue_comment) → Write permissions: workflow:contents, workflow:pull-requests
- **Security invariant:** Publicly triggerable jobs must remain read-only unless a separate trusted approval gate authorizes a narrowly scoped write.
- **Missing controls:** Least-privilege job permissions, Separate untrusted analysis from privileged publication
- **Evidence:** `.github/workflows/hedge-prune.yml:3`
- **Confidence:** 86%

### HEDGE-003: pull_request_target workflow newly combines untrusted PR context with secrets

- **Severity:** critical
- **Status:** open
- **Attack path:** Pull request author → Workflow Hedge security diff (pull_request_target) → Repository secret or write token
- **Security invariant:** A pull_request_target workflow must never execute or interpolate untrusted PR content in a privileged context.
- **Missing controls:** Strict separation between untrusted PR data and privileged jobs, No execution of PR-controlled code in the secret-bearing job
- **Evidence:** `.github/workflows/hedge.yml:7`, `.github/workflows/hedge.yml:92`
- **Confidence:** 94%

### HEDGE-004: Publicly triggerable workflow adds repository write permissions

- **Severity:** high
- **Status:** open
- **Attack path:** External contributor → Workflow Hedge security diff (pull_request_target) → Write permissions: job:publish:pull-requests, job:publish:security-events
- **Security invariant:** Publicly triggerable jobs must remain read-only unless a separate trusted approval gate authorizes a narrowly scoped write.
- **Missing controls:** Least-privilege job permissions, Separate untrusted analysis from privileged publication
- **Evidence:** `.github/workflows/hedge.yml:7`
- **Confidence:** 86%

### HEDGE-005: Privileged workflow checks out untrusted pull request code

- **Severity:** critical
- **Status:** open
- **Attack path:** Pull request author → PR head code → Workflow Hedge security diff (pull_request_target) → Privileged runner
- **Security invariant:** A secret-bearing or write-capable workflow must not execute code from an untrusted pull request revision.
- **Missing controls:** Never execute PR head code in the privileged job, Artifact-only handoff to a separate credential-free verification job
- **Evidence:** `.github/workflows/hedge.yml:7`
- **Confidence:** 97%

### HEDGE-006: Public entry point newly depends on a privileged secret

- **Severity:** medium
- **Status:** open
- **Attack path:** External user → Workflow Hedge security diff (pull_request_target) → OPENAI_API_KEY
- **Security invariant:** A public request must never control, reveal, or redirect use of a privileged credential.
- **Missing controls:** Secret-safe error handling, Outbound destination allowlist where relevant, Log redaction
- **Evidence:** `.github/workflows/hedge.yml:7`, `.github/workflows/hedge-fix.yml:174`, `.github/workflows/hedge.yml:92`
- **Confidence:** 72%

### HEDGE-007: Public entry point newly depends on a privileged secret

- **Severity:** medium
- **Status:** open
- **Attack path:** External user → Workflow Hedge Codex remediation (issue_comment) → OPENAI_API_KEY
- **Security invariant:** A public request must never control, reveal, or redirect use of a privileged credential.
- **Missing controls:** Secret-safe error handling, Outbound destination allowlist where relevant, Log redaction
- **Evidence:** `.github/workflows/hedge-fix.yml:4`, `.github/workflows/hedge-fix.yml:174`, `.github/workflows/hedge.yml:92`
- **Confidence:** 72%

### HEDGE-008: New mutating entry point has no detected authentication control

- **Severity:** high
- **Status:** open
- **Attack path:** Public user → POST /api/files/upload → Privileged application operation
- **Security invariant:** Only authenticated and authorized principals may invoke POST /api/files/upload.
- **Missing controls:** Verified authentication, Authorization scoped to the target resource
- **Evidence:** `app/api/files/upload/route.ts:3`
- **Confidence:** 90%


## Recorded decisions and verified risks

- **HEDGE-009** — verified: New storage write crosses a trust boundary without complete upload controls
  - Verification recorded by Caleb-Todd-commits on 2026-07-19T22:03:03.472Z; vulnerable outcome: reproduced; repaired outcome: blocked-by-control; immutable witness: yes; legitimate behavior passed: true; evidence-linked architecture control changed: true.

## Recent model history

| Recorded | Revision | Nodes | Edges | Open risks | Highest | Analysis |
|---|---|---:|---:|---:|---|---|
| 2026-07-19T22:04:33.315Z | 51957874d426d600ec426a12505541608a4485bf | 18 | 8 | 8 | critical | deterministic |
| 2026-07-19T21:21:14.314Z | 167f78776f78c8fd2cf9ba4fe13e80fdedc60af0 | 18 | 8 | 9 | critical | deterministic |
| 2026-07-19T20:13:42.945Z | unknown | 16 | 7 | 7 | critical | deterministic |
| 2026-07-19T19:58:14.435Z | unknown | 16 | 7 | 7 | critical | deterministic |

## Assumptions

- Detected controls are evidence that relevant code exists, not proof that the control is correct or complete.
- Public exposure is inferred from supported route and workflow conventions and must be confirmed against deployment configuration.
- AST analysis is handler-scoped for supported TypeScript and JavaScript entry points; same-file helpers and supported Next.js middleware are followed, while arbitrary imported helper behavior remains partially unknown.
- Repository evidence coverage: 17/17 candidate files and 164813 bytes analyzed.

## Unknowns

- Sensitive assets were not confirmed in .hedge/context.yml.
- Internet-facing deployment surfaces were not confirmed in .hedge/context.yml.
- Authentication mechanisms were inferred from code and not confirmed in .hedge/context.yml.
- Privileged roles were not confirmed in .hedge/context.yml.
- Trusted external services were not confirmed in .hedge/context.yml.

## Update contract

- `hedge init` establishes or refreshes this baseline.
- Pull-request checks rebuild graphs from the exact base and head commits; integrity-bound stored state supplies lifecycle history, not comparison authority.
- A finding moves to `verified` only when one immutable witness reproduces on the vulnerable revision, is blocked by the intended control on the repaired revision, legitimate behavior succeeds, and the exact graph delta proves a relevant architecture control or path change.
- Deterministic observations, security inferences, and merge decisions remain separate artifacts.
- Risk acceptance must record who, when, and why; it is never inferred from silence.
