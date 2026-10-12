export type Platform = {
  slug: string;
  title: string;
  status: string;
  summary: string;
  intro: string;
  fits: string[];
  specs: { label: string; value: string }[];
};

export const platforms: Platform[] = [
  {
    slug: "desk-case",
    title: "Desk Case Platform",
    status: "In design",
    summary:
      "A small case for a PCB. The board footprint and the standoff pattern are fixed, so later boards reuse the case.",
    intro:
      "A base platform is a shortcut, never a requirement. This one fixes the PCB footprint and the standoff pattern of the first desk device. A designer with a board that fits the footprint gets a case that is already quoted and already routed.",
    fits: ["Desk gadgets with one board", "Small display devices", "USB-powered tools"],
    specs: [
      { label: "Fixed", value: "PCB footprint and standoff pattern" },
      { label: "Case process", value: "3D printing at low tiers, injection molding at high tiers" },
      { label: "Board", value: "Any board that fits the footprint" },
      { label: "Dimensions", value: "Published with the first design" },
    ],
  },
];

export const getPlatform = (slug: string) => platforms.find((p) => p.slug === slug);
