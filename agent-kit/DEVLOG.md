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

## 2026-10-12 — Restyled the site from the reference

The first web shell looked plain. I opened the reference site in a browser, took screenshots at 1280px and 390px, and read its computed CSS. I wrote the values into `packages/ui` as tokens and rebuilt its patterns as components: header, three slanted hero panels, numbered card grid, checklist, FAQ, closing band, and footer. The first hero had edges that did not meet the white rules. I rewrote the geometry so the slant is a fixed share of the hero height. I took only the design system: no name, text, photo, video, or link. The hero uses gradients until we film our own footage. My first measurement script missed the hero label and footer heading, so I matched those by eye and said so in the comparison notes.

Evidence: `agent-kit/launch/design-compare/`; `pnpm verify` green.

## 2026-10-12 — Ported the reference source and added video

The human pointed out that I had copied the reference site from screenshots, not from its code. They were right. Screenshots gave me the numbers but not the behavior. I read the repo `ThyFriendlyFox/ferrera-tooling-website` and ported its stylesheet and component structure into `packages/ui`: the animated hero dividers, hover expand with a blurb, the tint blend, feathered video edges, the phone layout, the drawer header, and scroll reveal. I wrote all copy fresh. For video I took six clips from Mixkit, cut each to 10 seconds, and compressed them to 4.3 MB total. I could not play them here because headless Chromium lacks H.264, so the screenshots show poster frames. I did not check the clips in a real browser.

Evidence: `pnpm verify` green; `agent-kit/launch/design-compare/`.

## 2026-10-12 — Switched to yellow and black, drafted logo options

The human asked for yellow and black, not red. I changed the accent to `#ffd100` and the hero tints to yellow, grey, and amber. Yellow multiplied over the colored footage turned it acid green, so I made all footage monochrome. The logo now sets the 1 in yellow italic. I drew nine logo options, A to I, in `agent-kit/launch/logo-options/`. Each shows a white 0 on black and a black 0 on light grey. Saira Condensed has no italic, so option B is a synthetic slant. The human picks one; the site keeps the Barlow 0 and italic 1 until then.

Evidence: `pnpm verify` green; `agent-kit/launch/logo-options/logo-options.png`.
