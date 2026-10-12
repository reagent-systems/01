# STATUS.md — where the project actually stands

The single source of truth for project state. Claims require evidence: a
passing gate, a linked run, a tag. Updated in the same commit as the
behavior change. The weekly cycle (WEEKLY.md step 5) refreshes it.

| Area | State | Evidence |
|---|---|---|
| Agent kit installed, no unfilled placeholder | ✅ | `pnpm verify` green on branch `claude/compassionate-knuth-fd44s7` |
| Monorepo (pnpm, Turborepo, Biome, TypeScript strict) | ✅ | `pnpm verify` |
| `packages/config` env helper | ✅ | 2 tests in `pnpm test` |
| Unknowns register: 105 seeded items, lint, report, issue drafts, link | ✅ | `pnpm unknowns:lint` reports 0 errors; tests in `tools/unknowns/test` |
| GitHub intake: issue forms, labels, triage label, CI, nightly | 🚧 | Files committed. Labels sync and branch protection need `main` and a human (see below) |
| Routines | 🚧 | Prompts in `ROUTINES.md`. No schedule created yet |
| `/ops/unknowns` page | ❌ | ROADMAP queue item 1 |
| Design tokens, `packages/ui` | ❌ | ROADMAP queue item 2 |
| `packages/core` | ❌ | ROADMAP queue item 3 |
| Terraform, Cloud Run, Vercel deploys | ❌ | ROADMAP queue item 4; blocked on a GCP project |
| Phases 2–8 | ❌ | ROADMAP "Later" |

States: ✅ done (gated) · 🚧 in progress · ❌ not started · 🧊 frozen/won't do.

## Current week

- **Shipping:** between cycles
- **Last release:** none
- **Known red:** none
- **Needs the human:** merge the install branch to `main`; run the `Labels` workflow once; turn on branch protection (CI.md); give the GCP staging project ID; create the routines (ROUTINES.md).
