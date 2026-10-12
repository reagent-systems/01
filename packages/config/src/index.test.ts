import { describe, expect, it } from "vitest";
import { baseEnvSchema, parseEnv } from "./index";

describe("parseEnv", () => {
  it("applies defaults", () => {
    expect(parseEnv(baseEnvSchema, {})).toEqual({ APP_ENV: "local", LOG_LEVEL: "info" });
  });

  it("names the failing keys and not their values", () => {
    expect(() => parseEnv(baseEnvSchema, { APP_ENV: "secret-value" })).toThrow(
      "Invalid environment: APP_ENV",
    );
  });
});
