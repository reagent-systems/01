import type { MetadataRoute } from "next";
import { audiences } from "../lib/audiences";
import { designs } from "../lib/designs";
import { insights } from "../lib/insights";
import { platforms } from "../lib/platforms";
import { processes } from "../lib/processes";
import { site } from "../lib/site";
import { researchedStates } from "../lib/state-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (
    path: string,
    priority: number,
    changeFrequency: "weekly" | "monthly" | "yearly" = "monthly",
  ) => ({
    url: new URL(path, site.url).toString(),
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    entry("/", 1, "weekly"),
    entry("/how-it-works", 0.9),
    entry("/start", 0.9),
    entry("/processes", 0.9, "weekly"),
    entry("/for", 0.8),
    entry("/designs", 0.8, "weekly"),
    entry("/platforms", 0.7),
    entry("/insights", 0.8, "weekly"),
    entry("/states", 0.8, "weekly"),
    entry("/compliance", 0.6),
    entry("/contact", 0.6),
    ...processes.map((p) => entry(`/processes/${p.slug}`, 0.8)),
    ...audiences.map((a) => entry(`/for/${a.slug}`, 0.8)),
    ...insights.map((i) => entry(`/insights/${i.slug}`, 0.7)),
    ...researchedStates().map((s) => entry(`/states/${s.slug}`, 0.7)),
    ...platforms.map((p) => entry(`/platforms/${p.slug}`, 0.6)),
    ...designs.map((d) => entry(`/designs/${d.slug}`, 0.7, "weekly")),
    entry("/terms", 0.2, "yearly"),
    entry("/privacy", 0.2, "yearly"),
    entry("/designer-agreement", 0.2, "yearly"),
    entry("/supplier-agreement", 0.2, "yearly"),
  ];
}
