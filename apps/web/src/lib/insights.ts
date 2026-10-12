export type Insight = {
  slug: string;
  title: string;
  description: string;
  published: string;
  readMinutes: number;
  sections: { heading: string; body: string[] }[];
};

export const insights: Insight[] = [
  {
    slug: "injection-molding-vs-3d-printing",
    title: "Injection Molding vs 3D Printing: Where the Price Curve Flips",
    description:
      "3D printing has no tooling and a flat price per part. Injection molding has a mold and a very low price per part. Here is how to find the quantity where one beats the other.",
    published: "2026-10-12",
    readMinutes: 4,
    sections: [
      {
        heading: "Two different cost shapes",
        body: [
          "3D printing has almost no setup. The first part costs about what the hundredth part costs, because each part takes machine time and material. The price per part stays nearly flat as the count grows.",
          "Injection molding is the opposite. A steel or aluminum mold has to be cut before one part exists. That mold costs thousands to tens of thousands of dollars, depending on size and complexity. After that, each part is cheap because a cycle takes seconds.",
        ],
      },
      {
        heading: "The crossover",
        body: [
          "Divide the mold cost by the count and add the molded price per part. When that total drops below the printed price per part, molding wins. For a small enclosure the crossover often sits in the hundreds to low thousands of parts. A large or complex part pushes it higher.",
          "That is why a waitlist price curve can change process at a tier. The first tiers print the case. A high tier pays for a mold, and the unit price falls at that break.",
        ],
      },
      {
        heading: "What molding asks of your design",
        body: [
          "Molded parts need draft angles so they release from the mold, even wall thickness so they cool evenly, and few undercuts. A design made for printing often breaks these rules. Check them before you commit to a mold.",
          "01 flags draft, wall thickness, and undercuts on upload and links each flag to the feature. That keeps a design printable now and moldable later.",
        ],
      },
      {
        heading: "When to stay with printing",
        body: [
          "If the count never reaches the crossover, stay with printing. Printing also suits shapes that molds cannot make, and early runs that may change after buyers see the product.",
        ],
      },
    ],
  },
  {
    slug: "what-is-dfm",
    title: "What Design for Manufacture Means, and Why It Saves Money",
    description:
      "Design for manufacture, or DFM, means shaping a part so a shop can make it cheaply and repeatably. Learn the checks that matter most before you request a quote.",
    published: "2026-10-12",
    readMinutes: 4,
    sections: [
      {
        heading: "A definition",
        body: [
          "Design for manufacture is the habit of designing a part around how it will be made. A part that looks fine on screen can be slow, costly, or impossible to cut, mold, or bend. DFM catches that before a shop does.",
        ],
      },
      {
        heading: "Checks that move the price",
        body: [
          "Tolerances: a tight tolerance on a feature that does not need one adds machining and inspection time. Call out tight tolerances only where the assembly needs them.",
          "Wall thickness and minimum feature size: thin walls warp or break, and tiny features need small tools and slow cuts.",
          "Internal corners and deep pockets: sharp internal corners need small tools. A radius that matches a standard tool is cheaper.",
          "Undercuts and draft: these decide whether a molded or cast part can leave its mold.",
          "Material and finish: a common alloy or resin costs less and ships faster than an exotic one.",
        ],
      },
      {
        heading: "How 01 helps",
        body: [
          "On upload, the geometry service reads each part and the DFM agent proposes a process and a material. It flags tolerance problems, missing drawings, features no shop in the network can make, and cheaper design changes. Each flag links to the exact feature. You decide what to change.",
        ],
      },
    ],
  },
  {
    slug: "how-hardware-group-buys-work",
    title: "How Hardware Group Buys Work, and Where They Go Wrong",
    description:
      "A hardware group buy pools demand so a run can be made at a lower price. Learn how waitlists, saved cards, and triggers work, and the failure modes to plan for.",
    published: "2026-10-12",
    readMinutes: 5,
    sections: [
      {
        heading: "The idea",
        body: [
          "A group buy collects buyers before production. The more buyers join, the lower the price per unit, because shops quote lower prices for larger runs. When the count reaches a target, the run starts and buyers pay.",
        ],
      },
      {
        heading: "Why a saved card, not a hold",
        body: [
          "A card authorization holds funds for a short time, often days. A waitlist can run for months. So a waitlist should save the payment method and charge it once, at the trigger. Buyers pay nothing until then.",
        ],
      },
      {
        heading: "Where group buys go wrong",
        body: [
          "Quotes expire. A price promised months ago may no longer hold, so quotes need to be re-requested before the trigger.",
          "Charges fail. Cards saved months earlier can be declined or need the buyer to confirm. A plan for retries and for a run that starts at a lower tier is part of the design.",
          "Dates slip. Parts run short and shops fill up. Buyers should see a ship date before they join, and be told early and offered a refund if it moves.",
          "Quality surprises. A part made by one shop can fail at the next. Serial codes and a clear rule for who pays for a bad part keep the dispute short.",
        ],
      },
      {
        heading: "A note on rules",
        body: [
          "In the United States, selling goods ahead of delivery comes with rules about ship dates and delay notices. This page is general information, not legal advice. Get legal review before you sell.",
        ],
      },
    ],
  },
  {
    slug: "from-gerber-to-assembled-board",
    title: "From Gerber Files to an Assembled Board: What Each Shop Needs",
    description:
      "A circuit board takes two steps: fabrication makes the bare board from Gerber files, and assembly places the parts from a bill of materials. Here is what to send each shop.",
    published: "2026-10-12",
    readMinutes: 4,
    sections: [
      {
        heading: "Step one: fabrication",
        body: [
          "A fabrication shop makes the bare board. It needs Gerber files, one for each copper, mask, and silkscreen layer, plus a drill file. The layer count, board size, thickness, and surface finish set the price.",
          "Check the shop's limits before you design: minimum trace width, minimum hole size, and the layer count it can make.",
        ],
      },
      {
        heading: "Step two: assembly",
        body: [
          "An assembly shop places and solders the parts. It needs the Gerbers, a bill of materials as a CSV, and a placement file that gives each part's position and rotation.",
          "Machines place most parts and an oven solders them. Parts the machines cannot place are fitted by hand.",
        ],
      },
      {
        heading: "What usually goes wrong",
        body: [
          "Shortages: a part may be out of stock or have a long lead time. Check availability before the run triggers.",
          "Fine-pitch parts: tiny packages need tighter process control and cost more to assemble and inspect.",
          "Counterfeit parts: buy from known sources and keep a trace for every board.",
        ],
      },
      {
        heading: "In a 01 chain",
        body: [
          "Fabrication and assembly are two nodes in the chain. The fabricated board ships to the assembler, and the assembled board ships to final assembly and test. Each board carries a serial code that is scanned at every step.",
        ],
      },
    ],
  },
];

export const getInsight = (slug: string) => insights.find((i) => i.slug === slug);
