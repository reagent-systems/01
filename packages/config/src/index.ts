import { z } from "zod";

export const baseEnvSchema = z.object({
  APP_ENV: z.enum(["local", "staging", "prod"]).default("local"),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
});

export type BaseEnv = z.infer<typeof baseEnvSchema>;

/** Parses env for one app. Every app builds its schema from `baseEnvSchema.extend(...)`. */
export function parseEnv<T extends z.ZodType>(
  schema: T,
  source: Record<string, string | undefined> = process.env,
): z.infer<T> {
  const result = schema.safeParse(source);
  if (!result.success) {
    const keys = [...new Set(result.error.issues.map((i) => i.path.join(".")))].join(", ");
    throw new Error(`Invalid environment: ${keys}`);
  }
  return result.data;
}
