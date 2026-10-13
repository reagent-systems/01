import { processes } from "./processes";

export type Role = "designer" | "buyer" | "shop" | "looking";

export type Option = { value: string; label: string; desc: string };
export type Question = {
  id: string;
  title: string;
  help: string;
  /** More than one answer allowed. */
  multi?: boolean;
  options: Option[];
};

export const roleQuestion: Question = {
  id: "role",
  title: "What brings you to 01?",
  help: "Pick the closest one. This just helps us start you in the right place.",
  options: [
    {
      value: "designer",
      label: "I design hardware",
      desc: "You have a design or an idea and no money for a run.",
    },
    {
      value: "buyer",
      label: "I want to buy",
      desc: "You want a product built and a price that falls as buyers join.",
    },
    {
      value: "shop",
      label: "I run a shop",
      desc: "You make parts and want jobs that come with the money in place.",
    },
    { value: "looking", label: "I'm just looking", desc: "You want to see how it works first." },
  ],
};

const how: Question = {
  id: "heard",
  title: "How did you hear about 01?",
  help: "One answer is enough.",
  options: [
    { value: "search", label: "A search", desc: "Google or another search engine." },
    { value: "social", label: "Social media", desc: "A post, a video, or a link someone shared." },
    { value: "person", label: "A person", desc: "A friend, a colleague, or a community." },
    { value: "other", label: "Somewhere else", desc: "Press, an event, or anything not listed." },
  ],
};

const byRole: Record<Role, Question[]> = {
  designer: [
    {
      id: "design",
      title: "Do you already have a design?",
      help: "Either way works. This just helps us start you in the right place.",
      options: [
        {
          value: "files",
          label: "Yes, I have files",
          desc: "STEP, STL, Gerber, KiCad, or a bill of materials.",
        },
        {
          value: "sketch",
          label: "Yes, a sketch or an idea",
          desc: "You know what it does, but it is not modeled yet.",
        },
        { value: "none", label: "Not yet", desc: "You want to see what a design needs first." },
      ],
    },
    {
      id: "category",
      title: "What kind of hardware is it?",
      help: "Pick the closest fit.",
      options: [
        {
          value: "electronics",
          label: "Electronics",
          desc: "A board, a display, sensors, a case.",
        },
        {
          value: "mechanical",
          label: "Mechanical",
          desc: "Machined, bent, or molded parts, with no board.",
        },
        {
          value: "tool",
          label: "Tool or fixture",
          desc: "Something that helps people make other things.",
        },
        {
          value: "consumer",
          label: "Consumer product",
          desc: "Something people use at home or carry.",
        },
      ],
    },
    {
      id: "units",
      title: "How many do you think people would buy?",
      help: "A guess is fine. Real numbers come from the waitlist.",
      options: [
        { value: "under-100", label: "Under 100", desc: "A small, specific audience." },
        { value: "100-500", label: "100 to 500", desc: "A hobby or niche community." },
        { value: "500-plus", label: "500 or more", desc: "A broad audience." },
        { value: "unknown", label: "No idea yet", desc: "That is what the waitlist tells you." },
      ],
    },
  ],
  buyer: [
    {
      id: "category",
      title: "What kind of hardware are you after?",
      help: "Pick the closest fit.",
      options: [
        {
          value: "electronics",
          label: "Gadgets and electronics",
          desc: "Desk devices, displays, small computers.",
        },
        { value: "tools", label: "Tools and fixtures", desc: "Things for a workshop or a lab." },
        {
          value: "parts",
          label: "Cases and parts",
          desc: "Enclosures, brackets, and custom pieces.",
        },
        {
          value: "open",
          label: "Anything interesting",
          desc: "You want to see what people design.",
        },
      ],
    },
    {
      id: "who",
      title: "Who is it for?",
      help: "This tells us how many you might order.",
      options: [
        { value: "me", label: "Me", desc: "One or two for my own use." },
        {
          value: "team",
          label: "My team or work",
          desc: "A handful for a team, a class, or a lab.",
        },
        { value: "gift", label: "A gift", desc: "For someone else." },
        { value: "resale", label: "To resell", desc: "A larger number for a shop or a community." },
      ],
    },
    {
      id: "when",
      title: "When would you want it?",
      help: "Runs take time. We would rather say so now.",
      options: [
        { value: "soon", label: "As soon as possible", desc: "Within a few months." },
        { value: "later", label: "I can wait", desc: "Price matters more than speed." },
        { value: "unsure", label: "Not sure", desc: "You are browsing." },
      ],
    },
  ],
  shop: [
    {
      id: "processes",
      title: "Which processes do you run?",
      help: "Pick all that apply.",
      multi: true,
      options: processes.map((p) => ({
        value: p.slug,
        label: p.title,
        desc: p.kind,
      })),
    },
    {
      id: "size",
      title: "How big is your shop?",
      help: "People on the floor, including you.",
      options: [
        { value: "solo", label: "Just me", desc: "One person, one or two machines." },
        { value: "small", label: "2 to 10", desc: "A small team." },
        { value: "mid", label: "11 to 50", desc: "A mid-size shop." },
        { value: "large", label: "More than 50", desc: "A large operation." },
      ],
    },
    {
      id: "capacity",
      title: "How much open capacity do you have?",
      help: "On a normal month.",
      options: [
        { value: "lots", label: "Plenty", desc: "We could take several new jobs." },
        { value: "some", label: "Some", desc: "We could take a few." },
        { value: "little", label: "Very little", desc: "We are close to full." },
      ],
    },
  ],
  looking: [
    {
      id: "first",
      title: "What do you want to know first?",
      help: "We will point you there.",
      options: [
        { value: "runs", label: "How a run works", desc: "From a design to a unit on a desk." },
        { value: "price", label: "How the price falls", desc: "What buyers pay and when." },
        { value: "design", label: "How to publish a design", desc: "What files and what steps." },
        { value: "shop", label: "How shops get paid", desc: "Jobs, terms, and proof." },
      ],
    },
    {
      id: "level",
      title: "How much do you know about hardware?",
      help: "Either way works.",
      options: [
        { value: "new", label: "I'm new to it", desc: "Plain words, please." },
        {
          value: "hobby",
          label: "I make things as a hobby",
          desc: "You have built a few projects.",
        },
        { value: "pro", label: "I work in hardware", desc: "You do this for a living." },
      ],
    },
    {
      id: "makes",
      title: "Do you design hardware today?",
      help: "Your answer shapes what we show you.",
      options: [
        { value: "yes", label: "Yes", desc: "You have designs of your own." },
        { value: "want", label: "Not yet, but I want to", desc: "You are thinking about it." },
        { value: "no", label: "No", desc: "You are here to buy or to learn." },
      ],
    },
  ],
};

/** The question list for a role: role, three role questions, how they heard. Contact is the last screen. */
export const questionsFor = (role: Role | null): Question[] => [
  roleQuestion,
  ...(role ? byRole[role] : []),
  ...(role ? [how] : []),
];

/** Steps including the contact screen. Every role has the same count so "Step n of N" stays steady. */
export const TOTAL_STEPS = 6;

export type Answers = Record<string, string | string[]>;

const labelOf = (q: Question, value: string) =>
  q.options.find((o) => o.value === value)?.label ?? value;

/** One readable line per answer, for the issue body. */
export function summarize(answers: Answers): string {
  const role = answers.role as Role | undefined;
  return questionsFor(role ?? null)
    .map((q) => {
      const a = answers[q.id];
      if (!a || (Array.isArray(a) && a.length === 0)) return null;
      const text = (Array.isArray(a) ? a : [a]).map((v) => labelOf(q, v)).join(", ");
      return `${q.title} ${text}`;
    })
    .filter(Boolean)
    .join("\n");
}

export const nextHref: Record<Role, { href: string; label: string }> = {
  designer: { href: "/start", label: "Share your files" },
  buyer: { href: "/designs", label: "See the first design" },
  shop: { href: "/for/manufacturers", label: "How shops work with 01" },
  looking: { href: "/how-it-works", label: "See how it works" },
};
