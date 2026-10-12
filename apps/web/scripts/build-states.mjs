// Validates the per-state research files and bundles them into src/generated/states.json.
// Source: agent-kit/unknowns/evidence/states/<slug>.json. A bad file fails the build loudly.
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const src = resolve(here, "../../../agent-kit/unknowns/evidence/states");
const out = resolve(here, "../src/generated/states.json");

const isUrl = (u) => typeof u === "string" && /^https?:\/\/[^\s]+$/.test(u);
const SECTIONS = {
  hardwareHubs: ["city", "note", "source"],
  makerspaces: ["name", "city", "note", "url"],
  events: ["name", "city", "note", "url"],
  programs: ["name", "city", "note", "url"],
  specialties: ["name", "note", "source"],
  support: ["name", "note", "url"],
};

const result = {};
const problems = [];
if (existsSync(src)) {
  for (const f of readdirSync(src).filter((n) => n.endsWith(".json"))) {
    let d;
    try {
      d = JSON.parse(readFileSync(resolve(src, f), "utf8"));
    } catch (e) {
      problems.push(`${f}: not valid JSON`);
      continue;
    }
    if (d.slug !== f.replace(/\.json$/, "")) problems.push(`${f}: slug must match the file name`);
    for (const [key, fields] of Object.entries(SECTIONS)) {
      const list = d[key] ?? [];
      d[key] = list.filter((item) => {
        const missing = fields.filter(
          (k) => !item[k] || (k === "url" || k === "source" ? !isUrl(item[k]) : false),
        );
        if (missing.length)
          problems.push(`${f}: dropped a ${key} entry (bad ${missing.join(", ")})`);
        return missing.length === 0;
      });
    }
    result[d.slug] = d;
  }
}
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, `${JSON.stringify(result)}\n`);
for (const p of problems) console.warn(`states: ${p}`);
console.log(`states: ${Object.keys(result).length} researched`);
