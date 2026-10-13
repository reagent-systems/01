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
      "Parts cut from solid metal or plastic. A program and a fixture are the only setup, so small runs stay affordable.",
    intro:
      "A CNC machine cuts a part out of a block or a bar, following the CAD model. The setup is a program and a way to hold the stock, which costs far less than a mold. That makes machining the usual choice for the first tiers of a waitlist, and for metal parts with tight features.",
    points: [
      {
        title: "Cheap to start",
        body: "There is no mold to buy. A run of ten and a run of a thousand both make sense.",
      },
      {
        title: "Tight features",
        body: "Bores, threads, and flat faces can hold the tolerances an assembly needs.",
      },
      {
        title: "Where it hands off",
        body: "At higher counts the price curve may move a part to casting or molding, and the page shows that break.",
      },
    ],
    specs: [
      { label: "Setup cost", value: "Low: a program and a fixture" },
      { label: "Best at", value: "Low to mid quantities, metal parts" },
      { label: "Input", value: "STEP model, plus a drawing for tight tolerances" },
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
    summary:
      "Flat stock cut by laser and folded on a press brake. Brackets, panels, and enclosure shells.",
    intro:
      "A sheet metal part starts as a flat pattern. A laser or a punch cuts the outline, a press brake makes the bends, and hardware such as threaded inserts is pressed in. Most brackets, panels, and enclosure shells are made this way.",
    points: [
      {
        title: "Start from the flat pattern",
        body: "A pattern that accounts for bend allowance keeps the part buildable and the quote accurate.",
      },
      {
        title: "Quick to a first part",
        body: "Cutting and bending need no custom tooling for most shapes.",
      },
      {
        title: "Stamping later",
        body: "Large runs can move to a stamping die once the count pays for it.",
      },
    ],
    specs: [
      { label: "Setup cost", value: "Low for cut and bent parts, high for stamping dies" },
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
    summary:
      "Plastic parts molded in quantity. The mold is a large one-time cost, and each part after it is cheap.",
    intro:
      "Molding injects hot plastic into a steel or aluminum mold. Cutting that mold is the big expense. Once it exists, each part costs a small fraction of a printed or machined one. That is why molding only appears at the higher tiers of a waitlist.",
    points: [
      {
        title: "The mold sets the minimum",
        body: "The price curve shows the count at which a mold pays for itself.",
      },
      { title: "Lowest price per part", body: "At volume nothing else in plastic comes close." },
      {
        title: "Design rules apply",
        body: "Draft angles, wall thickness, and undercuts are checked before any mold is cut.",
      },
    ],
    specs: [
      { label: "Setup cost", value: "High: the mold" },
      { label: "Best at", value: "High quantities, plastic housings" },
      { label: "Input", value: "STEP model, checked for draft and wall thickness" },
      { label: "Common materials", value: "ABS, polycarbonate, nylon, polypropylene" },
    ],
  },
  {
    slug: "3d-printing",
    title: "3D Printing",
    keyword: "3D printing",
    kind: "Low setup",
    summary:
      "Parts printed layer by layer, with no tooling. A good fit for the first tier of a run and for odd shapes.",
    intro:
      "A printer builds a part layer by layer from a model. There is no mold and no fixture, so a case or a bracket costs about the same at ten units as at a hundred. First tiers of a run often print, and later tiers switch to molding.",
    points: [
      { title: "No tooling", body: "Any shape the model describes can be built, in any quantity." },
      {
        title: "Fits the first tier",
        body: "A small first run prints. The curve moves to a tooled process when the count grows.",
      },
      {
        title: "Proves the fit",
        body: "A printed case shows that a board fits before anyone pays for a mold.",
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
    summary: "Bare circuit boards made from your Gerber files.",
    intro:
      "A fabrication shop etches, drills, and finishes a bare board from your Gerber files. Layer count, board size, and surface finish set the price. What comes out has no components on it yet and goes on to assembly.",
    points: [
      {
        title: "Read from the files",
        body: "Layer count, board size, and the smallest features come straight from the Gerbers.",
      },
      {
        title: "Checked against the shop",
        body: "Minimum trace width, hole size, and layer count are matched to what the shop can make.",
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
      { label: "Options", value: "Layer count, thickness, surface finish, solder mask color" },
    ],
  },
  {
    slug: "pcb-assembly",
    title: "PCB Assembly",
    keyword: "PCB assembly",
    kind: "Electronics",
    summary: "Components placed and soldered onto the board from your bill of materials.",
    intro:
      "Machines place most components from your bill of materials, and an oven solders them. Parts the machines cannot place are fitted by hand. Shortages and fine-pitch packages cause most of the trouble, so both are flagged early.",
    points: [
      {
        title: "BOM in, board out",
        body: "A CSV bill of materials and a placement file drive the line.",
      },
      {
        title: "Shortages are checked",
        body: "Part availability is checked before a run is triggered.",
      },
      {
        title: "Counterfeit risk",
        body: "Parts come from known sources, and a scan trace follows each board.",
      },
    ],
    specs: [
      { label: "Setup cost", value: "Low: a stencil and a program" },
      { label: "Best at", value: "Any quantity" },
      { label: "Input", value: "BOM (CSV), placement file, Gerbers" },
      { label: "Watch for", value: "Fine-pitch parts and long lead times" },
    ],
    video: "fund",
  },
  {
    slug: "casting",
    title: "Casting",
    keyword: "metal casting",
    kind: "Tooled",
    summary: "Metal poured or injected into a mold, for shapes that cost too much to machine.",
    intro:
      "Casting pours or injects molten metal into a mold. At higher counts it makes complex metal shapes for less than machining would. Sand, investment, and die casting differ in tooling cost and in how good the surface is.",
    points: [
      {
        title: "Complex shapes",
        body: "Internal channels and thick-to-thin sections are practical.",
      },
      {
        title: "A tooling threshold",
        body: "Die casting needs a die and sand casting needs a pattern. Either sets a minimum run.",
      },
      {
        title: "Often finished by machining",
        body: "Faces that must be flat are usually cut after the part is cast.",
      },
    ],
    specs: [
      { label: "Setup cost", value: "Medium to high: a pattern or a die" },
      { label: "Best at", value: "Mid to high quantities, metal housings" },
      { label: "Input", value: "STEP model, checked for draft and wall thickness" },
      { label: "Common materials", value: "Aluminum, zinc, bronze, iron" },
    ],
  },
  {
    slug: "finishing",
    title: "Finishing",
    keyword: "part finishing",
    kind: "Finishing and assembly",
    summary:
      "Anodizing, plating, powder coat, paint, and cleaning, applied after the part is made.",
    intro:
      "A finish protects a part and sets how it looks. Anodizing, plating, powder coating, and paint each run in their own shops. In a chain, the finish node sits between the node that makes the part and the node that assembles it.",
    points: [
      {
        title: "A node like any other",
        body: "A finishing step is routed on the chain graph like a machined part.",
      },
      {
        title: "Marks have to survive",
        body: "Heat, coating, and cleaning can destroy a printed label. Laser marking is the fallback.",
      },
      { title: "Coatings add thickness", body: "The drawing says where that matters." },
    ],
    specs: [
      { label: "Setup cost", value: "Low to medium: racks and masking" },
      { label: "Best at", value: "Metal and plastic parts after forming" },
      { label: "Input", value: "A finish call-out on the drawing" },
      { label: "Common finishes", value: "Anodize, powder coat, plating, paint, bead blast" },
    ],
  },
  {
    slug: "assembly",
    title: "Assembly",
    keyword: "product assembly",
    kind: "Finishing and assembly",
    summary: "The node that joins parts from other nodes into one product.",
    intro:
      "An assembler receives parts from several nodes and joins them with fasteners, adhesive, cable harnesses, or by fitting a board into its case. In a parallel chain many nodes feed one assembler. In a sequential chain each node adds a part and passes the unit on.",
    points: [
      {
        title: "Parallel or in sequence",
        body: "The chain graph handles both, and mixes of the two.",
      },
      {
        title: "Checked on arrival",
        body: "Each incoming part is scanned. A bad one is routed back to the node that made it.",
      },
      {
        title: "Instructions travel with the design",
        body: "Assembly instructions are a versioned file attached to the design.",
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
      "A test step flashes the firmware and checks that the unit works. Failures are scanned and sent back. On a sampled unit the shop also records measurements and photos, and a failed sample pauses the node until an operator has looked at it.",
    points: [
      {
        title: "Firmware is a step",
        body: "Programming happens in the chain, before final packing.",
      },
      {
        title: "Sample inspections",
        body: "One unit in each interval gets a full inspection record.",
      },
      {
        title: "A failure stops the line",
        body: "A failed sample pauses the node and alerts an operator.",
      },
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
    summary: "Boxes, inserts, labels, and a shipping label for each buyer.",
    intro:
      "The last node packs the unit, adds inserts and a manual, and prints a shipping label for each buyer. A buyer gets one tracking page that follows the unit from raw stock to the front door.",
    points: [
      { title: "One tracking page", body: "It stays the same whichever shops touched the unit." },
      { title: "A label per buyer", body: "Labels come from a single shipping integration." },
      { title: "Kits", body: "Several parts can ship together as one kit." },
    ],
    specs: [
      { label: "Setup cost", value: "Low" },
      { label: "Best at", value: "The last node in the chain" },
      { label: "Input", value: "Packing spec and buyer list" },
      { label: "Records", value: "A tracking number per unit" },
    ],
  },
];

export const getProcess = (slug: string) => processes.find((p) => p.slug === slug);
