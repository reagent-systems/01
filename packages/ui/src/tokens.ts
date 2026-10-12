/**
 * Design tokens from the reference site's stylesheet (`app/globals.css`).
 * `styles.css` holds the same values as custom properties; tokens.test.ts keeps the two in sync.
 */
export const tokens = {
  color: {
    bg: "#000",
    bg2: "#0b0b0c",
    bg3: "#141416",
    line: "rgba(255, 255, 255, 0.14)",
    lineStrong: "rgba(255, 255, 255, 0.32)",
    text: "#f5f5f5",
    muted: "rgba(245, 245, 245, 0.68)",
    dim: "rgba(245, 245, 245, 0.45)",
    accent: "#c8102e",
    accentSoft: "rgba(200, 16, 46, 0.18)",
    tint: { a: "#c8102e", b: "#1f4f8f", c: "#17705c" },
  },
  font: {
    family: 'Barlow, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    weight: { regular: 400, medium: 500, semibold: 600, bold: 700 },
  },
  space: { gutter: "clamp(1.25rem, 4vw, 3.5rem)" },
  layout: { max: "1440px", headerHeight: "88px" },
  motion: { ease: "cubic-bezier(0.22, 1, 0.36, 1)" },
} as const;
