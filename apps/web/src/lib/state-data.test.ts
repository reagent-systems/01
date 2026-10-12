import { describe, expect, it } from "vitest";
import { getResearch, hasEnoughResearch, researchedStates, sourcesFor } from "./state-data";
import { states } from "./states";

describe("state research", () => {
  it("lists all 50 states", () => {
    expect(states).toHaveLength(50);
    expect(new Set(states.map((s) => s.slug)).size).toBe(50);
  });

  it("publishes only states with at least three sourced entries", () => {
    const live = researchedStates();
    expect(live.length).toBeGreaterThan(0);
    for (const s of live) {
      const r = getResearch(s.slug);
      expect(hasEnoughResearch(r)).toBe(true);
    }
  });

  it("gives every published entry an http(s) source", () => {
    for (const s of researchedStates()) {
      const r = getResearch(s.slug);
      if (!r) continue;
      const urls = sourcesFor(r);
      expect(urls.length).toBeGreaterThan(0);
      for (const u of urls) expect(u).toMatch(/^https?:\/\//);
    }
  });

  it("rejects missing research", () => {
    expect(hasEnoughResearch(undefined)).toBe(false);
  });
});
