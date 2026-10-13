/**
 * Design tokens from the reference site's stylesheet (`app/globals.css`).
 * `styles.css` holds the same values as custom properties; tokens.test.ts keeps the two in sync.
 */
export const tokens = {
  color: {
    bg: "#000",
    bg2: "#0b0b0c",
    bg3: "#141416",
    line: "rgba(255, 255, 255, 0.12)",
    lineStrong: "rgba(255, 255, 255, 0.28)",
    text: "#f5f5f5",
    muted: "rgba(245, 245, 245, 0.68)",
    dim: "rgba(245, 245, 245, 0.45)",
    accent: "#ffd100",
    accentSoft: "rgba(255, 209, 0, 0.18)",
  },
  font: {
    family: 'Barlow, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    weight: { regular: 400, medium: 500, semibold: 600, bold: 700 },
  },
  space: { gutter: "clamp(1.25rem, 4vw, 3.5rem)" },
  layout: { container: "83rem", headerHeight: "8rem" },
  motion: { ease: "cubic-bezier(0.22, 1, 0.36, 1)" },
} as const;
