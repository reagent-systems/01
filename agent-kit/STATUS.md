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
| `apps/web` with `/ops/unknowns` | ✅ | Screenshot `unknowns/evidence/ops-unknowns.png`; page counts equal `pnpm unknowns:report` (test in `apps/web/src/lib/register-view.test.ts`) |
| Vercel preview deploy of `apps/web` | ❌ | Blocked: the Vercel GitHub app has no access to `reagent-systems/01`. `create_git_project` failed with 400 |
| Design tokens, `packages/ui` | ❌ | ROADMAP queue item 1 |
| `packages/core` | ❌ | ROADMAP queue items 2 and 4 |
| Backend on Vercel | ❌ | ROADMAP queue item 3 |
| Phases 2–8 | ❌ | ROADMAP "Later" |

States: ✅ done (gated) · 🚧 in progress · ❌ not started · 🧊 frozen/won't do.

## Current week

- **Shipping:** between cycles
- **Last release:** none
- **Known red:** none
- **Needs the human:** merge the install branch to `main`; set `OPS_PASSWORD` in the Vercel project; run the `Labels` workflow once; turn on branch protection (CI.md); grant the Vercel GitHub app access to `reagent-systems/01` (the web deploy waits on it); create the routines (ROUTINES.md).
