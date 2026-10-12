# DEVLOG.md — the live devlog

The plain history of this project. A person who knows nothing about the
code reads this file and knows what happened, in order, with no jargon.
Append only. Never rewrite an old entry — a wrong entry gets a
correction entry, not an edit.

Write every entry in the voice of `TONE.md`.

## Entry shape

Every entry has the same shape:

```
## YYYY-MM-DD — <one line: what happened>

<What we did. What worked. What broke. What we learned.
3–10 short sentences. Plain words. Past tense for what happened,
present tense for how things now stand.>

Evidence: <commit / tag / gate run / screenshot>
```

## When to write

- Every WEEKLY.md cycle writes one entry at step 5 (before merge).
- A failed or abandoned attempt gets an entry too. The devlog records
  what happened, not what succeeded. A week with no shipped feature
  still gets its entry.
- Out-of-band work (security patch, gate repair, big triage) gets one.
- SETUP.md writes the first entry: "Installed the agent kit."

## What does not go here

- Code detail that belongs in commit messages.
- Promises about the future — that is ROADMAP.md.
- State claims — that is STATUS.md. The devlog is the story; STATUS is
  the snapshot.

---

<!-- Entries below, newest first. -->

## 2026-10-12 — Installed the agent kit

The repo was empty. I installed the kit into `agent-kit/` and filled every placeholder. I built the monorepo base: pnpm, Turborepo, Biome, strict TypeScript. I loaded the knowledge map as a register of 105 items and wrote the tools that lint and report on it. I added GitHub issue forms, labels, and workflows so feedback becomes issues, and wrote the routine prompts. I did not build any app. The seeded queue holds 4 items: the web shell with the unknowns page, design tokens, the pricing curve, and Terraform for staging. Terraform is blocked on a GCP project ID. I dropped the `Forge` placeholder name; the product is `01`.

Evidence: `pnpm verify` green; `pnpm unknowns:report` shows 19 open critical items, 41 open high.

## 2026-10-12 — Built the web shell

I built `apps/web`: a Next.js 16 app with a home page and `/ops/unknowns`. The page shows 105 register items, a domain-by-field grid, and the open critical items by phase. A table filters by domain, field, severity, and text. The 19 critical items show when I filter on critical. The page sits behind a password. With no `OPS_PASSWORD` set it returns 404, so a missing secret fails closed. I first looked at Firebase for hosting. It added nothing that Vercel and Google Cloud did not already cover, so the human chose Vercel. The Vercel account is on the Hobby plan, which forbids commercial use.

Evidence: `pnpm verify` green; `agent-kit/unknowns/evidence/ops-unknowns.png`.
