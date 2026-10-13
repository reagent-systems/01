import { audiences } from "./audiences";
import { designs } from "./designs";
import { insights } from "./insights";
import { platforms } from "./platforms";
import { processes } from "./processes";
import { researchedStates } from "./state-data";

export type PageEntry = { title: string; description: string; url: string; group: string };

/** Every public page, once. The search index, the HTML sitemap, and llms.txt all read this. */
export function allPages(): PageEntry[] {
  const fixed: PageEntry[] = [
    { group: "Start", url: "/", title: "01", description: "Design hardware without capital." },
    {
      group: "Start",
      url: "/how-it-works",
      title: "How it works",
      description: "The steps from upload to a unit on a desk.",
    },
    {
      group: "Start",
      url: "/welcome",
      title: "Get started",
      description: "Answer a few questions and join as a designer, buyer, or shop.",
    },
    {
      group: "Start",
      url: "/start",
      title: "Start a design",
      description: "Tell us about your design or your shop.",
    },
    {
      group: "Start",
      url: "/contact",
      title: "Contact",
      description: "Questions about a design, a shop, or the platform.",
    },
    {
      group: "Start",
      url: "/compliance",
      title: "Compliance",
      description: "FCC, batteries, and export control for hardware.",
    },
    {
      group: "Start",
      url: "/platforms",
      title: "Platforms",
      description: "Base platforms that make quotes faster.",
    },
    { group: "Start", url: "/designs", title: "Designs", description: "Designs with a waitlist." },
    {
      group: "Start",
      url: "/processes",
      title: "Processes",
      description: "The catalog of manufacturing processes.",
    },
    {
      group: "Start",
      url: "/for",
      title: "Who it is for",
      description: "Pages for each kind of person who uses 01.",
    },
    {
      group: "Insights",
      url: "/insights",
      title: "Insights",
      description: "Guides for hardware inventors.",
    },
    {
      group: "Insights",
      url: "/states",
      title: "Hardware by state",
      description: "Makerspaces, events, programs, and support in each state.",
    },
  ];
  return [
    ...fixed,
    ...processes.map((p) => ({
      group: "Processes",
      url: `/processes/${p.slug}`,
      title: p.title,
      description: p.summary,
    })),
    ...audiences.map((a) => ({
      group: "Who it is for",
      url: `/for/${a.slug}`,
      title: a.name,
      description: a.summary,
    })),
    ...platforms.map((p) => ({
      group: "Platforms",
      url: `/platforms/${p.slug}`,
      title: p.title,
      description: p.summary,
    })),
    ...designs.map((d) => ({
      group: "Designs",
      url: `/designs/${d.slug}`,
      title: d.title,
      description: d.summary,
    })),
    ...insights.map((i) => ({
      group: "Insights",
      url: `/insights/${i.slug}`,
      title: i.title,
      description: i.description,
    })),
    ...researchedStates().map((s) => ({
      group: "Hardware by state",
      url: `/states/${s.slug}`,
      title: `Hardware in ${s.name}`,
      description: `Makerspaces, events, programs, and support for hardware inventors in ${s.name}.`,
    })),
  ];
}
