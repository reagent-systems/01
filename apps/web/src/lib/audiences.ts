export type Audience = {
  slug: string;
  name: string;
  eyebrow: string;
  title: string;
  /** Meta description and hero lead. */
  summary: string;
  problem: string;
  gets: { title: string; body: string }[];
  bring: string[];
  skip: string[];
  chain: string[][];
  platforms: string[];
  /** Shops get a different page: they join the network instead of publishing a design. */
  shop?: boolean;
};

const designerSkip = ["A factory contact", "A seed round", "Order minimums you cannot afford"];

export const audiences: Audience[] = [
  {
    slug: "inventors",
    name: "Inventors",
    eyebrow: "For inventors",
    title: "One Person. One Idea. No Factory Contacts.",
    summary:
      "You have a hardware idea and no factory contacts. Publish the design, let buyers join a waitlist, and 01 matches every part to a shop.",
    problem:
      "The hard part of a first product is not the design. It is knowing which shop makes which part, what they charge, and how to pay for it all before a single unit sells.",
    gets: [
      {
        title: "A parts tree",
        body: "Upload the model. The DFM agent splits it into parts and proposes a process for each.",
      },
      {
        title: "A price curve",
        body: "Estimates start the waitlist page. Real shop quotes replace them before trigger.",
      },
      { title: "A funded run", body: "Buyers pay at trigger. You pay with design time." },
    ],
    bring: ["A CAD model or a clear sketch", "A target count", "Patience for a first run"],
    skip: designerSkip,
    chain: [
      ["PCB fabrication", "Case"],
      ["PCB assembly"],
      ["Final assembly and test"],
      ["Pack and ship"],
    ],
    platforms: ["desk-case"],
  },
  {
    slug: "hobbyists",
    name: "Hobbyists",
    eyebrow: "For hobbyists",
    title: "Maker Projects That Deserve a Real Run",
    summary:
      "Your maker project works on the bench. 01 turns it into a real run: a waitlist funds it, and every shop starts at once.",
    problem:
      "A project that works on your bench still has a long road to a box on someone else’s desk. One-off parts do not scale, and small orders get ignored.",
    gets: [
      {
        title: "Bench to batch",
        body: "Printed parts become molded parts when the waitlist is big enough.",
      },
      {
        title: "A real BOM",
        body: "Upload a CSV. Part shortages are flagged before the run starts.",
      },
      {
        title: "Every unit traced",
        body: "Each unit carries a serial code from raw stock to the buyer.",
      },
    ],
    bring: ["A working prototype", "STL or STEP files", "A bill of materials"],
    skip: designerSkip,
    chain: [
      ["3D printing", "PCB fabrication"],
      ["PCB assembly"],
      ["Final assembly and test"],
      ["Pack and ship"],
    ],
    platforms: ["desk-case"],
  },
  {
    slug: "startups",
    name: "Startups",
    eyebrow: "For startups",
    title: "Your First Production Run Without a Seed Round",
    summary:
      "Run a first production batch funded by buyers, not investors. Waitlist demand shows up before money is spent on tooling.",
    problem:
      "A first production run usually needs tooling, minimums, and months of supplier work paid in advance. Few teams can carry that before they have revenue.",
    gets: [
      {
        title: "Demand first",
        body: "The waitlist count is real demand, visible before any tooling is cut.",
      },
      {
        title: "Process switch points",
        body: "Low tiers print or machine. High tiers unlock molding and casting.",
      },
      {
        title: "One chain",
        body: "One order reaches every shop. You do not manage a stack of purchase orders.",
      },
    ],
    bring: ["A design ready for review", "A target count and price", "A launch audience"],
    skip: ["A seed round", "Prepaid tooling", "A purchasing team"],
    chain: [
      ["PCB fabrication", "Sheet metal", "Case"],
      ["PCB assembly"],
      ["Final assembly and test"],
      ["Pack and ship"],
    ],
    platforms: ["desk-case"],
  },
  {
    slug: "creators",
    name: "Creators",
    eyebrow: "For creators",
    title: "Turn an Audience Into a First Run",
    summary:
      "You have an audience and a product idea. A waitlist turns followers into funded buyers, and 01 builds the product.",
    problem:
      "An audience wants the product, and you have never run a factory. A drop that is not funded in advance leaves you holding inventory or refunds.",
    gets: [
      {
        title: "A waitlist page",
        body: "Each design gets a public page with a price, the next price break, and the count to trigger.",
      },
      {
        title: "Charged at trigger",
        body: "Fans save a card. Nothing is charged until the run starts.",
      },
      {
        title: "A ship date",
        body: "The date is shown before anyone joins. If it slips, buyers are told and can get a refund.",
      },
    ],
    bring: ["A product design", "An audience", "A launch plan"],
    skip: ["Inventory risk", "A fulfillment team", "Order minimums you cannot afford"],
    chain: [
      ["3D printing", "Sheet metal"],
      ["Finishing"],
      ["Final assembly and test"],
      ["Pack and ship"],
    ],
    platforms: [],
  },
  {
    slug: "open-source",
    name: "Open Source Projects",
    eyebrow: "For open-source hardware",
    title: "Open Hardware That Needs a Funded Batch",
    summary:
      "Your open hardware project has files and a community. 01 gets a batch made from those files and funded by the people who want one.",
    problem:
      "Open designs are easy to share and hard to build in volume. A batch needs money up front, and the people who want one are scattered across a community.",
    gets: [
      {
        title: "Files in, parts out",
        body: "KiCad, Gerber, and STEP files go straight into the parts tree.",
      },
      {
        title: "A group buy",
        body: "The community joins a waitlist. The price falls as it grows.",
      },
      {
        title: "Shared trace",
        body: "Every unit has a serial code, so field reports route to the right batch.",
      },
    ],
    bring: ["Published design files", "A BOM", "A community"],
    skip: designerSkip,
    chain: [["PCB fabrication"], ["PCB assembly"], ["Test"], ["Pack and ship"]],
    platforms: [],
  },
  {
    slug: "educators",
    name: "Educators",
    eyebrow: "For educators",
    title: "Kits for Classrooms and Labs",
    summary:
      "Run a kit for a class or a lab. Pool the order on a waitlist and let a shop chain build, test, and pack it.",
    problem:
      "A classroom set of one hardware kit needs a dozen parts from a dozen sources, all arriving before the term starts.",
    gets: [
      {
        title: "A kit as one order",
        body: "Parts, board, and fasteners ship together as one kit.",
      },
      {
        title: "Tested before shipping",
        body: "A test step checks each kit works before it leaves.",
      },
      {
        title: "Pooled demand",
        body: "Several classes can join one run and share the price break.",
      },
    ],
    bring: ["A kit design", "A class size", "A term start date"],
    skip: ["A procurement scramble", "Parts from a dozen vendors", "Untested kits"],
    chain: [["PCB fabrication", "3D printing"], ["PCB assembly"], ["Test"], ["Pack and ship"]],
    platforms: ["desk-case"],
  },
  {
    slug: "engineers",
    name: "Engineers",
    eyebrow: "For engineers",
    title: "A Side Project With No Capital",
    summary:
      "You are an engineer with a side project and no capital. Publish the design and let a waitlist pay for the first run.",
    problem:
      "You know how to design the part. Your day job does not give you a factory, and a side project cannot carry a purchase order for tooling.",
    gets: [
      {
        title: "DFM feedback",
        body: "The agent flags tolerance problems, missing drawings, and cheaper design changes, each linked to the feature.",
      },
      {
        title: "You approve changes",
        body: "Engineering changes go through you before they take effect.",
      },
      {
        title: "Real quotes",
        body: "Shop quotes feed the price model, so estimates improve over time.",
      },
    ],
    bring: ["A STEP model", "Drawings for tight tolerances", "A target price"],
    skip: designerSkip,
    chain: [
      ["CNC machining", "PCB fabrication"],
      ["Finishing", "PCB assembly"],
      ["Final assembly and test"],
      ["Pack and ship"],
    ],
    platforms: [],
  },
  {
    slug: "manufacturers",
    name: "Manufacturers",
    eyebrow: "For shops",
    title: "Join the Network as a Shop",
    summary:
      "Join 01 as a node. Declare the processes you run, get matched to parts by your real limits, and receive purchase orders at trigger.",
    problem:
      "Small and mid-size shops spend time quoting jobs that never become orders. A run on 01 arrives funded, with the drawing, the quantity, and the purchase order together.",
    gets: [
      {
        title: "Matched by process",
        body: "Pick processes from the catalog and fill in your limits. Parts match to you by those limits.",
      },
      {
        title: "Funded orders",
        body: "A purchase order is issued only when the run triggers and buyers are charged.",
      },
      {
        title: "Net-60 terms",
        body: "Payment to nodes is net-60. A confirmed fault withholds payment for that part after an operator review.",
      },
    ],
    bring: [
      "One or more processes from the catalog",
      "Declared limits and lead times",
      "A phone for scanning",
    ],
    skip: ["A custom portal build", "Chasing quotes that never close", "A new ERP"],
    chain: [["Your shop"], ["Next node"], ["Final assembly and test"], ["Pack and ship"]],
    platforms: [],
    shop: true,
  },
];

export const getAudience = (slug: string) => audiences.find((a) => a.slug === slug);
