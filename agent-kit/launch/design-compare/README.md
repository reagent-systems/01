# Design comparison

Screenshots of our home page at 1280px and 390px. The reference screenshots are not stored here: they hold the reference site's photos and text.

## What matched, read from the reference site's computed CSS at 1280px

| Token | Reference | Ours |
|---|---|---|
| Font | Barlow 400/500/600/700 | same, via `next/font/google` |
| Background, text | `#000`, `#f5f5f5` | same |
| Muted, dim text | `#f5f5f5ad`, `#f5f5f573` | same |
| Line, strong line | `#ffffff24`, `#ffffff52` | same |
| Accent | `#c8102e` | same |
| Section padding | 144px vertical, `clamp(1.25rem, 4vw, 3.5rem)` gutter, 1440px max | same |
| Section heading | 56.32px, 600, line-height 1.02, 0.01em, uppercase | same at 1280px, scales down on small screens |
| Eyebrow | 12.8px, 600, 0.22em, uppercase, 68% text | same |
| Nav link | 12.8px, 600, 0.14em, uppercase | same |
| Outline button | 12px, 600, 0.16em, 11.2px 19.2px padding, 1px line | same |
| Large button | 13.6px, 600, 16px 36px padding, 2px white border | same |
| Card | 11.2px number at 0.2em; 20.48px title at 0.04em; 15.2px body | same |
| Footer heading | 12.8px, 0.2em, 2px accent underline | same (estimated, not measured) |
| Motion | `cubic-bezier(.22, 1, .36, 1)`; header 0.5s; button 0.3s; link 0.2s | same |

## What differs on purpose

- No photos or video. The hero panels use CSS gradients until we film our own footage (spec section 8).
- Our logo is a text mark, `01`.
- No copy, name, phone, address, or link from the reference site.
- The hero label size (about 44px, 700, 0.1em) and the footer heading were matched by eye. The first measurement script missed them.
- Cards have no "Learn more" link yet. The pages they would open do not exist.
