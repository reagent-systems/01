import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { tokens } from "./tokens";

const css = readFileSync(new URL("./styles.css", import.meta.url), "utf8");
const rootVar = (name: string) => new RegExp(`--${name}:\\s*([^;]+);`).exec(css)?.[1]?.trim();

describe("tokens match styles.css", () => {
  it("keeps color custom properties in sync", () => {
    expect(rootVar("bg")).toBe(tokens.color.bg);
    expect(rootVar("bg-2")).toBe(tokens.color.bg2);
    expect(rootVar("bg-3")).toBe(tokens.color.bg3);
    expect(rootVar("line")).toBe(tokens.color.line);
    expect(rootVar("line-strong")).toBe(tokens.color.lineStrong);
    expect(rootVar("text")).toBe(tokens.color.text);
    expect(rootVar("muted")).toBe(tokens.color.muted);
    expect(rootVar("dim")).toBe(tokens.color.dim);
    expect(rootVar("accent")).toBe(tokens.color.accent);
    expect(rootVar("accent-soft")).toBe(tokens.color.accentSoft);
  });

  it("keeps layout and motion in sync", () => {
    expect(rootVar("gutter")).toBe(tokens.space.gutter);
    expect(rootVar("container")).toBe(tokens.layout.container);
    expect(rootVar("header-h")).toBe(tokens.layout.headerHeight);
    expect(rootVar("ease")).toBe(tokens.motion.ease);
  });
});
