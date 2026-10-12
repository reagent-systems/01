# Design comparison

The design system comes from the reference site's source, `ThyFriendlyFox/ferrera-tooling-website`
(`app/globals.css`, `components/`). `packages/ui/src/styles.css` is that stylesheet with the
reference-specific rules removed. The components follow the same structure: `Hero`, `BgVideo`,
`Reveal`, `Header` with drawer, `CtaBand`, `Footer`.

The first pass worked from screenshots and computed CSS. It matched the numbers but missed the
behavior: the animated hero dividers, hover expand, tint blend, feathered video edges, and the
phone layout. Reading the source fixed that.

## What we took

Tokens, type scale, spacing, the hero, the media sections, the card grid, the footer, the motion.

## What we did not take

The name, logo, copy, phone, address, links, photos, and videos. All copy is ours.

## Our media

Videos are from Mixkit (free commercial licence, no attribution required), cut to 10 seconds,
compressed, and served from `apps/web/public/video`. `CREDITS.md` lists the source of each clip.

## Screenshots

Headless Chromium cannot decode H.264, so these show the poster frames. In a normal browser the clips play.

- `home-hero-1280.png`, `home-hero-hover-1280.png`, `home-technology-1280.png`
- `home-hero-390.png`
