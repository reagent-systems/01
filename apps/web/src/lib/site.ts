/**
 * Central site configuration. Every fact the site shows, and every fact it emits as
 * structured data, lives here. Optional fields stay hidden until they are filled in.
 */

const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

type Site = {
  name: string;
  legalName: string;
  url: string;
  tagline: string;
  description: string;
  /** GitHub repo that receives form submissions as issues. */
  repo: string;
  email?: string;
  phone?: string;
  phoneDisplay?: string;
  address?: { street: string; city: string; region: string; postalCode: string; country: string };
  social: Record<string, string>;
};

export const site: Site = {
  name: "01",
  legalName: "Reagent Systems",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (vercelHost ? `https://${vercelHost}` : "http://localhost:3000"),
  tagline: "Hardware Without Capital",
  description:
    "01 turns a hardware design into a funded production run. Designers publish a design, buyers join a waitlist with a saved card, and one button starts every shop in the chain.",
  repo: process.env.GITHUB_ISSUES_REPO ?? "reagent-systems/01",
  social: {},
};

export type NavLink = { label: string; href: string };

import type { NavMenu } from "@01/ui";
import { audiences } from "./audiences";
import { insights } from "./insights";
import { processes } from "./processes";

export const menus: NavMenu[] = [
  {
    label: "How it works",
    groups: [
      {
        title: "The platform",
        items: [
          {
            label: "The flow",
            href: "/how-it-works",
            desc: "Seven steps from upload to a unit on a desk",
          },
          {
            label: "Price drops",
            href: "/how-it-works#price",
            desc: "How the price falls and the process changes",
          },
          {
            label: "When a part is bad",
            href: "/how-it-works#faults",
            desc: "How faults are routed and paid",
          },
        ],
      },
      {
        title: "Before you start",
        items: [
          { label: "Platforms", href: "/platforms", desc: "Shortcuts that make quotes faster" },
          { label: "Compliance", href: "/compliance", desc: "FCC, batteries, export control" },
          { label: "Start a design", href: "/start", desc: "Tell us what you are building" },
        ],
      },
    ],
  },
  {
    label: "Processes",
    groups: [
      {
        title: "Make the parts",
        items: processes
          .filter((p) => p.kind === "Low setup" || p.kind === "Tooled")
          .map((p) => ({
            label: p.title,
            href: `/processes/${p.slug}`,
            desc: p.summary.split(".")[0] ?? "",
          })),
      },
      {
        title: "Boards, finish, and assembly",
        items: [
          ...processes
            .filter((p) => p.kind === "Electronics" || p.kind === "Finishing and assembly")
            .map((p) => ({
              label: p.title,
              href: `/processes/${p.slug}`,
              desc: p.summary.split(".")[0] ?? "",
            })),
        ],
      },
    ],
  },
  {
    label: "Who it’s for",
    groups: [
      {
        items: audiences
          .slice(0, 4)
          .map((a) => ({ label: a.name, href: `/for/${a.slug}`, desc: a.eyebrow })),
      },
      {
        items: audiences
          .slice(4)
          .map((a) => ({ label: a.name, href: `/for/${a.slug}`, desc: a.eyebrow })),
      },
    ],
  },
  {
    label: "Insights",
    groups: [
      {
        title: "Guides",
        items: insights.map((i) => ({
          label: i.title.split(":")[0] ?? i.title,
          href: `/insights/${i.slug}`,
        })),
      },
      {
        title: "By state",
        items: [
          {
            label: "Hardware by state",
            href: "/states",
            desc: "Makerspaces, events, programs, and specialties",
          },
          { label: "All insights", href: "/insights" },
        ],
      },
    ],
  },
  { label: "Designs", href: "/designs" },
];

export const utilityNav: NavLink[] = [
  { label: "Platforms", href: "/platforms" },
  { label: "Compliance", href: "/compliance" },
  { label: "Contact", href: "/contact" },
];

export const fileTypes = ["STEP", "STL", "DXF", "PDF drawings", "KiCad", "Gerber", "BOM (CSV)"];
