/**
 * Design tokens read from the computed CSS of the reference site at 1280px.
 * `styles.css` mirrors these as custom properties; tokens.test.ts keeps the two in sync.
 */
export const tokens = {
  color: {
    bg: "#000",
    bg2: "#0b0b0c",
    bg3: "#141416",
    line: "#ffffff24",
    lineStrong: "#ffffff52",
    lineFaint: "#ffffff24",
    text: "#f5f5f5",
    muted: "#f5f5f5ad",
    dim: "#f5f5f573",
    accent: "#c8102e",
    accentSoft: "#c8102e2e",
  },
  font: {
    family: 'Barlow, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    weight: { regular: 400, medium: 500, semibold: 600, bold: 700 },
  },
  /** px at the 1280px reference width; the CSS uses rem. */
  size: {
    body: 16,
    nav: 12.8,
    eyebrow: 12.8,
    button: 12,
    buttonLarge: 13.6,
    cardNumber: 11.2,
    cardTitle: 20.48,
    cardBody: 15.2,
    footerLink: 14.72,
    small: 12.8,
    sectionHeading: 56.32,
  },
  letterSpacing: {
    nav: "0.14em",
    eyebrow: "0.22em",
    button: "0.16em",
    cardNumber: "0.2em",
    cardTitle: "0.04em",
    sectionHeading: "0.01em",
    learn: "0.18em",
  },
  space: { section: "9rem", sectionCompact: "8rem", gutter: "clamp(1.25rem, 4vw, 3.5rem)" },
  layout: { max: "1440px", headerHeight: "88px" },
  motion: {
    ease: "cubic-bezier(0.22, 1, 0.36, 1)",
    header: "0.5s",
    button: "0.3s",
    link: "0.2s",
    reveal: "1s",
  },
  border: { width: "1px", widthStrong: "2px" },
  radius: { none: "0" },
} as const;
