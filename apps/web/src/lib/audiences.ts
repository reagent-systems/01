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
    title: "You Have the Idea. We Find the Shops.",
    summary:
      "You have a hardware idea and no factory contacts. Upload the design and 01 matches each part to a shop, while a waitlist pays for the run.",
    problem:
      "The design is rarely the hard part of a first product. Knowing which shop makes which part, what each one charges, and how to pay for all of it before a single unit sells is.",
    gets: [
      {
        title: "A parts tree",
        body: "Upload the model and an agent splits it into parts and suggests a process for each one.",
      },
      {
        title: "A price range",
        body: "Estimates start the waitlist page. Real shop quotes replace them before trigger.",
      },
      { title: "A funded run", body: "Buyers pay at trigger. You pay with your design time." },
    ],
    bring: ["A CAD model or a clear sketch", "A target count", "Some patience with a first run"],
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
    title: "From Bench Prototype to Batch",
    summary:
      "Your maker project works on the bench. 01 turns it into a batch: a waitlist funds the run and the shops start together.",
    problem:
      "A project that works on your bench still has a long way to go before it is a box on someone else’s desk. One-off parts do not scale, and small orders get ignored.",
    gets: [
      {
        title: "Printed parts become molded parts",
        body: "When the waitlist is big enough, the curve moves from printing to molding.",
      },
      {
        title: "A real bill of materials",
        body: "Upload a CSV. Part shortages are flagged before the run starts.",
      },
      {
        title: "A serial code on each unit",
        body: "Each unit can be traced from raw stock to the buyer.",
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
    title: "A First Production Run Without a Seed Round",
    summary:
      "Fund a first production batch with buyers instead of investors. The waitlist shows demand before you spend on tooling.",
    problem:
      "A first production run usually needs tooling, minimum orders, and months of supplier work, all paid for in advance. Few teams can carry that before they have revenue.",
    gets: [
      {
        title: "Demand you can see",
        body: "The waitlist count is real demand, visible before any tooling is cut.",
      },
      {
        title: "Process switch points",
        body: "Low tiers print or machine. High tiers can move to molding and casting.",
      },
      {
        title: "One order for the chain",
        body: "A single order reaches every shop, so you do not juggle a stack of purchase orders.",
      },
    ],
    bring: ["A design ready for review", "A target count and price", "An audience to launch to"],
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
      "You have an audience and a product idea. A waitlist turns followers into funded buyers, and 01 gets the product made.",
    problem:
      "Your audience wants the product and you have never run a factory. A drop that nobody paid for in advance leaves you with inventory or with refunds.",
    gets: [
      {
        title: "A waitlist page",
        body: "Each design gets a public page with its price, the next price break, and the count needed to start.",
      },
      {
        title: "Charged at trigger",
        body: "Fans save a card. Nothing is charged until the run starts.",
      },
      {
        title: "A ship date up front",
        body: "The date shows before anyone joins. If it slips, buyers are told and can ask for a refund.",
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
    title: "A Funded Batch for Open Hardware",
    summary:
      "Your open hardware project has published files and a community. 01 gets a batch made from those files, funded by the people who want one.",
    problem:
      "Open designs are easy to share and hard to build in volume. A batch needs money up front, and the people who want one are scattered across a community.",
    gets: [
      { title: "Files go straight in", body: "KiCad, Gerber, and STEP files feed the parts tree." },
      {
        title: "A group buy",
        body: "The community joins a waitlist, and the price falls as it grows.",
      },
      {
        title: "A shared trace",
        body: "Each unit has a serial code, so a field report points to the right batch.",
      },
    ],
    bring: ["Published design files", "A bill of materials", "A community"],
    skip: designerSkip,
    chain: [["PCB fabrication"], ["PCB assembly"], ["Test"], ["Pack and ship"]],
    platforms: [],
  },
  {
    slug: "educators",
    name: "Educators",
    eyebrow: "For educators",
    title: "Hardware Kits for Classrooms and Labs",
    summary:
      "Run a kit for a class or a lab. Pool the order on a waitlist and let a chain of shops build, test, and pack it.",
    problem:
      "A classroom set of one hardware kit means a dozen parts from a dozen sources, all arriving before the term starts.",
    gets: [
      { title: "The kit is one order", body: "Parts, board, and fasteners ship together." },
      {
        title: "Tested before shipping",
        body: "A test step checks that each kit works before it leaves.",
      },
      { title: "Pooled demand", body: "Several classes can join one run and share a price break." },
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
      "You are an engineer with a side project and no capital. Upload the design and let a waitlist pay for the first run.",
    problem:
      "You know how to design the part. Your day job does not give you a factory, and a side project cannot carry a purchase order for tooling.",
    gets: [
      {
        title: "Design-for-manufacture feedback",
        body: "The agent flags tolerance problems, missing drawings, and cheaper changes, each linked to the feature it concerns.",
      },
      {
        title: "You approve the changes",
        body: "Engineering changes go through you before they take effect.",
      },
      {
        title: "Quotes that teach the model",
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
      "Join 01 as a node. List the processes you run, get matched to parts by your actual limits, and receive purchase orders when a run starts.",
    problem:
      "Small and mid-size shops spend hours quoting jobs that never become orders. A run on 01 arrives already funded, with the drawing, the quantity, and the purchase order together.",
    gets: [
      {
        title: "Matched by process",
        body: "Pick processes from the catalog and fill in your limits. Parts match to you by those limits.",
      },
      {
        title: "Orders that are already funded",
        body: "A purchase order is issued only when the run starts and buyers have been charged.",
      },
      {
        title: "Net-60 payment",
        body: "Nodes are paid net-60. A confirmed fault withholds payment for that part, after an operator reviews it.",
      },
    ],
    bring: [
      "One or more processes from the catalog",
      "Your limits and lead times",
      "A phone for scanning",
    ],
    skip: ["A custom portal build", "Quotes that never close", "A new ERP"],
    chain: [["Your shop"], ["Next node"], ["Final assembly and test"], ["Pack and ship"]],
    platforms: [],
    shop: true,
  },
];

export const getAudience = (slug: string) => audiences.find((a) => a.slug === slug);
