export type Process = {
  slug: string;
  title: string;
  /** Short keyword-rich label for titles and link text. */
  keyword: string;
  kind: "Low setup" | "Tooled" | "Electronics" | "Finishing and assembly";
  summary: string;
  intro: string;
  points: { title: string; body: string }[];
  specs: { label: string; value: string }[];
  video?: string;
};

export const processes: Process[] = [
  {
    slug: "cnc-machining",
    title: "CNC Machining",
    keyword: "CNC machining",
    kind: "Low setup",
    summary:
      "Milled and turned parts cut from solid stock. No tooling to buy, so it fits the first tiers of a run.",
    intro:
      "CNC machining removes material from a block or bar to match the CAD model. Setup is a program and a fixture, not a mold, so a run of ten and a run of a thousand both make sense. Metal and plastic parts with tight features start here.",
    points: [
      {
        title: "No tooling cost",
        body: "A program and a fixture replace a mold. Low tiers stay affordable.",
      },
      {
        title: "Tight features",
        body: "Bores, threads, and flat faces hold the tolerances an assembly needs.",
      },
      {
        title: "Switch point",
        body: "At higher counts the price curve can move a part to casting or molding.",
      },
    ],
    specs: [
      { label: "Setup cost", value: "Low: program and fixture" },
      { label: "Best at", value: "Low to mid quantities, metal parts" },
      { label: "Input", value: "STEP model and a drawing for tight tolerances" },
      {
        label: "Common materials",
        value: "Aluminum, steel, stainless, brass, engineering plastics",
      },
    ],
    video: "mission",
  },
  {
    slug: "sheet-metal",
    title: "Sheet Metal",
    keyword: "sheet metal fabrication",
    kind: "Low setup",
    summary: "Laser-cut and bent flat stock for brackets, panels, and enclosures.",
    intro:
      "Sheet metal parts start as a flat pattern. A laser or punch cuts the profile, a press brake makes the bends, and hardware is pressed in. It is the usual route for brackets, panels, and enclosure shells.",
    points: [
      {
        title: "Flat pattern first",
        body: "A bend-aware flat pattern keeps the part makeable and the price honest.",
      },
      {
        title: "Fast to first part",
        body: "Cutting and bending need no custom tooling for most shapes.",
      },
      {
        title: "Stamping at volume",
        body: "Large runs can move to a stamping die when the count justifies it.",
      },
    ],
    specs: [
      { label: "Setup cost", value: "Low for cut and bent parts; high for stamping dies" },
      { label: "Best at", value: "Enclosures, brackets, panels" },
      { label: "Input", value: "DXF flat pattern or a STEP model" },
      { label: "Common materials", value: "Aluminum, mild steel, stainless steel, copper" },
    ],
  },
  {
    slug: "injection-molding",
    title: "Injection Molding",
    keyword: "injection molding",
    kind: "Tooled",
    summary: "Molded plastic parts. A mold is the one-time cost; each part after that is cheap.",
    intro:
      "A mold is cut once, then molten plastic is injected into it for every part. The mold is the large up-front cost. The unit price then falls far below printing or machining. That is why molding unlocks at the higher tiers of a waitlist.",
    points: [
      {
        title: "Tooling is the cost",
        body: "The mold sets the minimum run. The price curve shows where it pays off.",
      },
      {
        title: "Lowest unit price",
        body: "At volume, no other plastic process comes close per part.",
      },
      {
        title: "Design rules matter",
        body: "Draft, wall thickness, and undercuts are flagged before any mold is cut.",
      },
    ],
    specs: [
      { label: "Setup cost", value: "High: the mold" },
      { label: "Best at", value: "High quantities, plastic housings" },
      { label: "Input", value: "STEP model checked for draft and wall thickness" },
      { label: "Common materials", value: "ABS, polycarbonate, nylon, polypropylene" },
    ],
  },
  {
    slug: "3d-printing",
    title: "3D Printing",
    keyword: "3D printing",
    kind: "Low setup",
    summary:
      "Printed parts with no tooling. Good for the first tier of a run and for complex shapes.",
    intro:
      "Printing builds a part layer by layer from a model. There is no mold and no fixture, so a case or a bracket can be made in small numbers for little money. Low tiers of a run often print; higher tiers move to molding.",
    points: [
      { title: "No tooling", body: "Any shape the model describes can be built, in any count." },
      {
        title: "Low-tier fit",
        body: "A small first run prints, then the curve switches to a tooled process.",
      },
      {
        title: "Fit checks",
        body: "Printed parts prove a case fits a board before a mold is cut.",
      },
    ],
    specs: [
      { label: "Setup cost", value: "None" },
      { label: "Best at", value: "Low quantities, complex shapes, enclosures" },
      { label: "Input", value: "STL or STEP model" },
      { label: "Common materials", value: "PLA, PETG, nylon, resin" },
    ],
    video: "publish",
  },
  {
    slug: "pcb-fabrication",
    title: "PCB Fabrication",
    keyword: "PCB fabrication",
    kind: "Electronics",
    summary: "Bare circuit boards made from Gerber files.",
    intro:
      "A bare board is etched, drilled, and finished from your Gerber files. The layer count, board size, and finish set the price. The result is a board with no parts on it, ready for assembly.",
    points: [
      {
        title: "Read from Gerbers",
        body: "Layer count, board size, and fine features come straight from the files.",
      },
      {
        title: "Shop limits checked",
        body: "Minimum trace, hole size, and layer count are matched to the shop.",
      },
      {
        title: "Feeds assembly",
        body: "The finished board ships to the assembly node in the chain.",
      },
    ],
    specs: [
      { label: "Setup cost", value: "Low per design" },
      { label: "Best at", value: "Any quantity" },
      { label: "Input", value: "Gerber and drill files" },
      {
        label: "Common options",
        value: "Layer count, board thickness, surface finish, solder mask color",
      },
    ],
  },
  {
    slug: "pcb-assembly",
    title: "PCB Assembly",
    keyword: "PCB assembly",
    kind: "Electronics",
    summary: "Parts placed and soldered onto the board from your BOM.",
    intro:
      "Machines place the parts from your bill of materials and an oven solders them. Hand work covers parts the machines cannot place. Part shortages and fine-pitch parts are the usual risks, so they are flagged early.",
    points: [
      {
        title: "BOM in, board out",
        body: "A CSV bill of materials and a placement file drive the line.",
      },
      { title: "Shortage checks", body: "Part availability is checked before a run is triggered." },
      {
        title: "Counterfeit risk",
        body: "Parts come from known sources, and a scan trace follows every board.",
      },
    ],
    specs: [
      { label: "Setup cost", value: "Low: stencil and programming" },
      { label: "Best at", value: "Any quantity" },
      { label: "Input", value: "BOM (CSV), placement file, Gerbers" },
      { label: "Watch for", value: "Fine-pitch parts, long lead-time parts" },
    ],
    video: "fund",
  },
  {
    slug: "casting",
    title: "Casting",
    keyword: "metal casting",
    kind: "Tooled",
    summary: "Poured or injected metal parts for shapes that machining makes too costly.",
    intro:
      "Casting pours or injects molten metal into a mold. It makes complex metal shapes at a unit price below machining once the count is high. Sand, investment, and die casting differ in tooling cost and finish.",
    points: [
      {
        title: "Complex shapes",
        body: "Internal channels and thick-to-thin sections are practical.",
      },
      {
        title: "Tooling threshold",
        body: "Die casting needs a die; sand casting needs a pattern. Both set a minimum run.",
      },
      {
        title: "Finish after",
        body: "Cast parts often go to machining for the faces that must be flat.",
      },
    ],
    specs: [
      { label: "Setup cost", value: "Medium to high: pattern or die" },
      { label: "Best at", value: "Mid to high quantities, metal housings" },
      { label: "Input", value: "STEP model checked for draft and wall thickness" },
      { label: "Common materials", value: "Aluminum, zinc, bronze, iron" },
    ],
  },
  {
    slug: "finishing",
    title: "Finishing",
    keyword: "part finishing",
    kind: "Finishing and assembly",
    summary: "Anodizing, plating, powder coat, paint, and cleaning applied after a part is made.",
    intro:
      "Finishing protects a part and sets how it looks. Anodizing, plating, powder coating, and paint each need their own shop. A finish node sits between the node that makes the part and the node that assembles it.",
    points: [
      {
        title: "Own node in the chain",
        body: "A finish step is routed like any other part of the graph.",
      },
      {
        title: "Marks must survive",
        body: "Heat, coating, and cleaning can destroy a printed label. Laser marking is the fallback.",
      },
      {
        title: "Tolerance impact",
        body: "Coatings add thickness. The drawing states where it matters.",
      },
    ],
    specs: [
      { label: "Setup cost", value: "Low to medium: racks and masking" },
      { label: "Best at", value: "Metal and plastic parts after forming" },
      { label: "Input", value: "Finish call-out on the drawing" },
      { label: "Common finishes", value: "Anodize, powder coat, plating, paint, bead blast" },
    ],
  },
  {
    slug: "assembly",
    title: "Assembly",
    keyword: "product assembly",
    kind: "Finishing and assembly",
    summary: "The node that joins parts from parallel nodes into one product.",
    intro:
      "An assembler receives parts from several nodes and joins them: fasteners, adhesives, cable harnesses, and the board in its case. In a parallel chain, many nodes feed one assembler. In a sequential chain, each node adds a part and ships forward.",
    points: [
      {
        title: "Parallel or sequential",
        body: "The chain graph supports both, and any mix of them.",
      },
      {
        title: "Inspection on arrival",
        body: "Each incoming part is scanned. A bad one routes back to the node that made it.",
      },
      {
        title: "Build instructions",
        body: "Assembly instructions travel with the design as a versioned file.",
      },
    ],
    specs: [
      { label: "Setup cost", value: "Low: a work instruction and fixtures" },
      { label: "Best at", value: "Final product assembly" },
      { label: "Input", value: "Assembly instructions, BOM, drawings" },
      { label: "Records", value: "A scan per part and per step" },
    ],
  },
  {
    slug: "testing",
    title: "Testing",
    keyword: "product testing",
    kind: "Finishing and assembly",
    summary: "Functional tests and firmware programming before a unit ships.",
    intro:
      "A test step flashes firmware and checks that the unit works. Failures are scanned and routed back. Sampling inspections add measurements and photos, and a failed sample pauses the node until an operator looks.",
    points: [
      {
        title: "Firmware included",
        body: "Programming is a step in the chain, not an afterthought.",
      },
      { title: "Sample QC", body: "One unit in a set interval gets a full inspection record." },
      { title: "Stop on failure", body: "A failed sample pauses the node and alerts an operator." },
    ],
    specs: [
      { label: "Setup cost", value: "Low to medium: a test fixture and a script" },
      { label: "Best at", value: "Electronics and moving assemblies" },
      { label: "Input", value: "Test procedure and firmware image" },
      { label: "Records", value: "Pass or fail per serial code, with photos on sampled units" },
    ],
  },
  {
    slug: "packing-and-kitting",
    title: "Packing and Kitting",
    keyword: "packing and kitting",
    kind: "Finishing and assembly",
    summary: "Boxes, inserts, labels, and the last shipping label for each buyer.",
    intro:
      "The final node packs the unit, adds inserts and a manual, and prints a shipping label for each buyer. One tracking view follows the unit from raw stock to the buyer’s desk.",
    points: [
      {
        title: "One tracking view",
        body: "Buyers see one page for their unit, whatever shops touched it.",
      },
      { title: "Label per buyer", body: "Shipping labels come from one shipping integration." },
      { title: "Kits", body: "Several parts can ship together as one kit." },
    ],
    specs: [
      { label: "Setup cost", value: "Low" },
      { label: "Best at", value: "The last node in the chain" },
      { label: "Input", value: "Packing spec and buyer list" },
      { label: "Records", value: "Tracking number per unit" },
    ],
  },
];

export const getProcess = (slug: string) => processes.find((p) => p.slug === slug);
