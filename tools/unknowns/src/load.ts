import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";
import type { Item } from "./schema";

const here = dirname(fileURLToPath(import.meta.url));
export const UNKNOWNS_DIR = resolve(here, "../../../agent-kit/unknowns");
export const REGISTER_PATH = resolve(UNKNOWNS_DIR, "register.yaml");

export function loadRegister(path = REGISTER_PATH): Item[] {
  const data = parse(readFileSync(path, "utf8"));
  if (!Array.isArray(data)) throw new Error(`${path}: expected a YAML list of items`);
  return data as Item[];
}
