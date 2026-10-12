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

export const primaryNav: NavLink[] = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Processes", href: "/processes" },
  { label: "Who it’s for", href: "/for" },
  { label: "Platforms", href: "/platforms" },
  { label: "Designs", href: "/designs" },
];

export const drawerNav: NavLink[] = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Processes", href: "/processes" },
  { label: "Who it’s for", href: "/for" },
  { label: "Platforms", href: "/platforms" },
  { label: "Designs", href: "/designs" },
  { label: "Compliance", href: "/compliance" },
  { label: "Join as a shop", href: "/for/manufacturers" },
  { label: "Start a design", href: "/start" },
  { label: "Contact", href: "/contact" },
];

export const fileTypes = ["STEP", "STL", "DXF", "PDF drawings", "KiCad", "Gerber", "BOM (CSV)"];
