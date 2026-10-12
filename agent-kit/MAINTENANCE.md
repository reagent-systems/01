# MAINTENANCE.md — the between-features runbook

## Cadence

| Task | When | How |
|---|---|---|
| Issue/PR triage | Weekly, start of cycle | Label, ask for repro, close-with-reason or queue on ROADMAP.md |
| Dependency updates | Weekly (automated) | Merge green Dependabot PRs; batch minors |
| Security advisories | Immediately | SECURITY.md |
| Stale sweep | Automated | `stale.yml` (CI.md) |
| Health check | Per PR + nightly | `pnpm verify` in CI |

## Triage labels

`bug` · `enhancement` · `docs` · `good first issue` · `help wanted` ·
`needs-repro` · `blocked` · `wontfix` · `security` · `ci-failure` ·
`feedback` · `surprise` · `unknown` · `roadmap` · `needs-triage` (the intake labels; `ROUTINES.md`).
The full set, with colors, is `.github/labels.yml`.

## Issue lifecycle

new → labeled → (needs-repro?) → accepted (queued on ROADMAP.md if it's
feature-shaped) → in progress → closed by PR or closed-with-reason.
Never close silently; one sentence of why is the minimum.

## Deprecation policy

Deprecate in release N with a warning; remove no earlier than N+2.
Every deprecation gets a CHANGELOG entry under "Deprecated".

## Bus factor

Maintainers: Kyle and Colt (Reagent Systems). If unmaintained, the intent is
to archive the repo with a notice that names the successor.
