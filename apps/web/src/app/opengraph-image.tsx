import { ImageResponse } from "next/og";
import { site } from "../lib/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "radial-gradient(ellipse at 85% 0%, #3a3000 0%, #000 60%)",
        color: "#fff",
        fontFamily: "sans-serif",
      }}
    >
      <svg width="176" height="128" viewBox="0 0 88 64" role="img" aria-label="01">
        <title>01</title>
        <path fill="#fff" fillRule="evenodd" d="M0 0h44v30H32V12H12v18H0z" />
        <path fill="#fff" fillRule="evenodd" d="M0 34h12v18h20V34h12v30H0z" />
        <path fill="#ffd100" transform="skewX(-10)" d="M50 20 L66 0 H88 V64 H72 V22 H50 Z" />
      </svg>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 22, letterSpacing: 6, color: "#bbb", textTransform: "uppercase" }}>
          Custom hardware · Waitlist pricing · One button
        </div>
        <div
          style={{
            fontSize: 84,
            fontWeight: 700,
            lineHeight: 1,
            marginTop: 18,
            textTransform: "uppercase",
          }}
        >
          {site.tagline}
        </div>
      </div>
      <div style={{ display: "flex", height: 6, width: 160, background: "#ffd100" }} />
    </div>,
    size,
  );
}
