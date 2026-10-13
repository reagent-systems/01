import { CtaBand, PageHero, Reveal, SmartLink } from "@01/ui";
import { ChainGraph } from "../../components/ChainGraph";
import { pageMetadata } from "../../lib/seo";
import { site } from "../../lib/site";

export const metadata = pageMetadata({
  title: "How It Works",
  description:
    "From upload to a unit on a desk: publish a design, get a price curve, join a waitlist, press start, trace every part, and ship to buyers.",
  path: "/how-it-works",
});

const stages = [
  {
    id: "publish",
    title: "Publish a design",
    body: "A designer uploads STEP, STL, DXF, Gerber, KiCad, and BOM files, plus drawings and assembly instructions. Every file is versioned and never overwritten. The geometry service reads each part: bounding box, volume, surface area, holes, pockets, threads, thin walls, undercuts, and minimum feature size. For boards it reads layers, size, part count, and fine-pitch parts.",
  },
  {
    id: "decompose",
    title: "Break it into processes",
    body: "The DFM agent builds a parts tree. Each part gets a process, a material, and a quantity, with alternatives and their cost and lead-time trade-offs. The designer confirms or edits the tree. Every flag links to the exact feature it concerns.",
  },
  {
    id: "price",
    title: "Get a price curve",
    body: "Each part gets an estimate from its geometry, process, material, and quantity. Estimates carry a confidence range. When the waitlist reaches a set share of its target, real quotes are requested from matched shops and replace the estimates.",
  },
  {
    id: "wait",
    title: "Join the waitlist",
    body: "Buyers save a card. Nothing is charged. The page shows the current price, the next price break, and the count to trigger. The ship date is shown before anyone joins. A buyer can leave at any time before trigger and pay nothing.",
  },
  {
    id: "run",
    title: "Press start",
    body: "At the target count, the designer or an operator presses one button. The orchestrator confirms that each node accepted its quote, charges every buyer, sends a purchase order to every node at once, generates serial codes, and sends label files to each node.",
  },
  {
    id: "trace",
    title: "Trace every part",
    body: "Floor staff scan a part’s serial code at each step and add a photo when needed. A downstream node or a buyer can report a bad part by scanning its code. The report routes to the node that made it, and an operator reviews it before any money is withheld.",
  },
  {
    id: "ship",
    title: "Ship to buyers",
    body: "Each node quotes with shipping to the next node included. The last node ships to buyers. Buyers see one tracking view for their unit.",
  },
];

const faults = [
  {
    title: "Routed to the maker",
    body: "A fault goes to the node that made the part, not to the whole chain.",
  },
  {
    title: "Reviewed by a person",
    body: "An operator reviews every dispute before money is withheld.",
  },
  {
    title: "Paid on proof",
    body: "A confirmed fault withholds payment for that part. The node at fault pays the reship.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "How it works", path: "/how-it-works" }]}
        baseUrl={site.url}
        eyebrow="How it works"
        title="One Button Starts Every Shop"
        lead="Any custom design breaks into parts, every part into processes, and every process into shops that run it."
        video="technology"
      >
        <SmartLink href="/start" className="btn btn-solid">
          Start a design
        </SmartLink>
      </PageHero>

      <section className="section">
        <div className="container">
          <Reveal>
            <p className="eyebrow">The chain</p>
            <h2 className="h2">Every shop starts together</h2>
            <p className="lead">
              Nodes inside a stage run in parallel. Stages run in order. One assembler can join
              parts from many nodes, and a sequential chain can pass a part from node to node.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <ChainGraph
              animated
              stages={[
                ["PCB fabrication", "Sheet metal", "3D printing"],
                ["PCB assembly", "Finishing"],
                ["Final assembly and test"],
                ["Pack and ship"],
              ]}
            />
          </Reveal>
        </div>
      </section>

      {stages.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          className="section-tight bordered-top"
          aria-labelledby={`${s.id}-title`}
        >
          <div className="container two-col">
            <Reveal>
              <p className="eyebrow">Step {String(i + 1).padStart(2, "0")}</p>
              <h2 id={`${s.id}-title`} className="h2">
                {s.title}
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="lead" style={{ margin: 0 }}>
                {s.body}
              </p>
            </Reveal>
          </div>
        </section>
      ))}

      <section id="price" className="section bordered-top" aria-labelledby="curve-title">
        <div className="container two-col">
          <Reveal>
            <p className="eyebrow">Price break</p>
            <h2 id="curve-title" className="h2">
              The price drops, and the process can change
            </h2>
            <p className="lead">
              Low tiers use low-setup processes: machining and 3D printing. High tiers unlock tooled
              processes: injection molding, casting, and stamping. The waitlist page shows each
              switch as a price break.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <table className="spec-table">
              <caption className="sr-only">Process by tier</caption>
              <tbody>
                <tr>
                  <th scope="row">Low tiers</th>
                  <td>CNC machining, 3D printing, sheet metal</td>
                </tr>
                <tr>
                  <th scope="row">High tiers</th>
                  <td>Injection molding, casting, stamping</td>
                </tr>
                <tr>
                  <th scope="row">Estimates</th>
                  <td>A range, until real quotes arrive</td>
                </tr>
                <tr>
                  <th scope="row">Quotes</th>
                  <td>Re-requested before trigger if they expire</td>
                </tr>
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <section id="faults" className="section-tight bordered-top" aria-label="Faults">
        <div className="container">
          <p className="eyebrow">When a part is bad</p>
          <div className="pillars">
            {faults.map((f, i) => (
              <Reveal key={f.title} className="pillar" delay={i * 100}>
                <span className="pillar-num">0{i + 1}</span>
                <h3 className="h3">{f.title}</h3>
                <p>{f.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Have a design?"
        body="Publish a design. Let the waitlist fund the run."
        primary={{ href: "/start", label: "Start a design" }}
        secondary={{ href: "/for", label: "Who it’s for" }}
      />
    </>
  );
}
