export type Design = {
  slug: string;
  title: string;
  summary: string;
  intro: string;
  platform?: string;
  /** Chain stages: each inner array is one stage; its nodes run in parallel. */
  chain: string[][];
  parts: { name: string; low: string; high?: string }[];
  video?: string;
};

export const designs: Design[] = [
  {
    slug: "desk-ai-token-counter",
    title: "Desk AI Token Counter",
    summary: "A small desk device in a case, built around one board.",
    intro:
      "The first design on 01 is a desk-sized AI token counter: a PCB in a case. It is the test of the whole flow, from upload to a unit on a desk. The waitlist opens when the first real shop quotes are in.",
    platform: "desk-case",
    chain: [
      ["PCB fabrication", "Case"],
      ["PCB assembly"],
      ["Final assembly and test"],
      ["Pack and ship"],
    ],
    parts: [
      { name: "Circuit board", low: "PCB fabrication, then PCB assembly" },
      { name: "Case", low: "3D printing", high: "Injection molding" },
      { name: "Hardware and cable", low: "Bought parts, kitted at assembly" },
    ],
    video: "guarantee",
  },
];

export const getDesign = (slug: string) => designs.find((d) => d.slug === slug);
