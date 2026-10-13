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

## 2026-10-12 — Built the full route tree, the footer, and the SEO set

The human said I had not copied the footer, the SEO, or the routes. I read the reference repo's footer, `seo.ts`, `site.ts`, `robots.ts`, `sitemap.ts`, `manifest.ts`, `opengraph-image.tsx`, `next.config.ts`, and its smoke test. I ported each one. The footer now has the brand block, four link columns, a dotted list, and a legal row. I built 34 routes from the spec's own page list: how it works, 11 process pages, 8 audience pages, platforms, designs, compliance, start, contact, and four legal placeholders. The forms file a GitHub issue labeled `feedback`, `lead`, and `needs-triage`, so the triage routine sees them. The smoke gate checks every sitemap URL for a title, canonical, description, and one `h1`. A vitest run picked up the smoke file and hung; I scoped vitest to the unit tests. The logo is now a stencil 0 and a blocky italic yellow 1. My first 1 read as a 7, so I gave it an angled flag. Form submissions put an email address into a GitHub issue, so keep the repo private (register item LEG-13).

Evidence: `pnpm verify` green with 11 smoke tests; `agent-kit/launch/logo-options/logo-01.png`.


## 2026-10-12 — Redesigned the site: hook, scrollytelling, state guides

The human asked for a redesign built on three references. For the scrollytelling they pointed at an archived AutoGPT page. This environment blocks `web.archive.org`, and the live `agpt.co` is a different, newer site. So I built the scroll story from technique, not from that page, and I said so. For the flow I read Printify's page: a centered hook, three ticks, one call to action, a plain three-step explainer, and a header with labelled dropdowns. I used the same order. From the Ferrera site I kept the deep footer and the state-by-state backlinks. Five research agents wrote sourced notes for all 50 states, but their shared search budget ran out. 27 states have three or more sourced entries and are published; 23 are not. Many entries came from search snippets, so I opened MKT-07 to re-check them. The human then asked to stitch the Mixkit clips into the scrolling. I joined six clips with crossfades into one 43-second video and tied its playhead to scroll position as a fixed background. Headless Chromium cannot decode H.264, so I tested with a WebM copy served through the same static server. My first version ended the video at 60% of the page, because pinned sections add height after the trigger measures. It now measures live. A stale server from an earlier run held port 3199 and answered the smoke tests with an old build; the smoke test now refuses to run if the port is taken.

Evidence: `pnpm verify` green with 12 smoke tests against a fresh build.

## 2026-10-13 — Replaced the scrubbed video with a frame sequence

The human said the background video did not follow the scroll: it caught up after they stopped. Seeking a video file is asynchronous, so it cannot keep pace with a scroll. I extracted the stitched clip into 522 WebP frames (12 per second, 854 by 480, 3.7 MB) and draw them to a fixed canvas. The frame comes directly from the scroll position and neighbouring frames cross-fade. Frames load coarse first, so scrubbing works at once. I measured the frame against the actual scroll position on 90 animation frames of a fast scroll: the error was 0 frames. I changed the hero to the three lines the human asked for: Design It, Fund It, Build It.

Evidence: `pnpm verify` green with 12 smoke tests, including a check for the canvas and the three hero lines.

## 2026-10-13 — Polished the design system, split the six steps, opened the site to bots

The human asked for three things: plainer copy, the polish of a reference manufacturer's site, and shorter scenes. Kern's site blocks automated reads, so I worked from the screenshot the human sent: pill search and buttons, a two-row header, an inset rounded hero, sentence-case labels. I rewrote the stylesheet around tokens. Spacing, radius, type size, and the container width each come from one scale, and no page sets its own. The six steps are now six separate sections, each a text block beside a small visual, with no pinned scene. I rewrote the copy that read like generated marketing: turns like "X, not Y", slogans, and borrowed Printify wording. For bots I added a site search, a human site map, `llms.txt`, an RSS feed, a JSON search index, a search action in the structured data, and a no-script fallback. The step 4 chain graph clipped inside its card in my first screenshot; it now stacks inside step visuals. Still open: I have not seen Kern's pages in motion, so spacing is matched to the screenshot only.

Evidence: `pnpm verify` green with 13 smoke tests; screenshots at 1440 and 390 wide show no horizontal overflow.
