# CI.md — what runs in GitHub Actions

The workflows live in `.github/`. This file lists them; the files are the
source of truth. CI runs the same command as local: `pnpm verify`.

| File | Trigger | Job |
|---|---|---|
| `workflows/ci.yml` | PR, push to `main` | `pnpm verify` |
| `workflows/nightly.yml` | 06:17 UTC daily | `pnpm verify`; opens one `ci-failure` + `needs-triage` issue on failure |
| `workflows/release.yml` | tag `v*.*.*` | `pnpm build`, publish GitHub Release |
| `workflows/stale.yml` | Mondays | Marks issues stale after 60 days. Exempts `unknown`, `security`, `blocked`, `accepted`, critical and high |
| `workflows/labels.yml` | push to `main` touching `labels.yml`, manual | Syncs `.github/labels.yml` to the repo |
| `dependabot.yml` | weekly | npm and Actions updates, minor and patch grouped |
| `PULL_REQUEST_TEMPLATE.md` | PR open | What / Why / Evidence / checklist |
| `ISSUE_TEMPLATE/*.yml` | issue open | Forms: feedback, surprise, unknown, bug, roadmap. Each adds `needs-triage` |

## Branch protection on `main` (repo Settings, set by a human)

- Require the `verify` check; require PRs; require up-to-date branches.
- Squash-merge only; auto-delete head branches.

## Deploys

Not wired yet. Staging deploys on merge to `main` and prod deploys on tag
once Terraform and the Vercel projects exist (ROADMAP.md).
