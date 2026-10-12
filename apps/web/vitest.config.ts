import { defineConfig } from "vitest/config";

export default defineConfig({
  // The smoke test (tests/*.test.mjs) runs under node:test, not vitest.
  test: { include: ["src/**/*.test.ts"] },
});
