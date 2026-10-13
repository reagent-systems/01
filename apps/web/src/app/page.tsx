import {
  CtaBand,
  HeroParallax,
  JsonLd,
  PriceCalc,
  Reveal,
  ScrollSequence,
  SmartLink,
  WordReveal,
} from "@01/ui";
import type { ReactNode } from "react";
import { ChainGraph } from "../components/ChainGraph";
import { audiences } from "../lib/audiences";
import { faqs } from "../lib/faqs";
import { processes } from "../lib/processes";
import { faqSchema, pageMetadata } from "../lib/seo";
import { researchedStates } from "../lib/state-data";

export const metadata = pageMetadata({
  title: "Design Hardware Without Capital",
  description:
    "Upload a hardware design and open a waitlist. The price falls as buyers join, and one button starts every shop in the chain. Custom designs, any process, nothing up front.",
  path: "/",
});

const Check = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M3 9.5l4 4 8-9" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
  </svg>
);

const ticks = [
  "You pay nothing up front",
  "Buyers are charged when the run starts",
  "Works for any custom design",
];

const proof = [
  { k: "01", v: "Buyers are charged only when the run starts" },
  { k: "02", v: "Every part gets a serial code" },
  { k: "03", v: "The shop that made a bad part pays for it" },
  { k: "04", v: "Custom designs, not a fixed catalog" },
];

type Step = {
  id: string;
  title: string;
  body: string;
  href: string;
  link: string;
  visual: ReactNode;
};

const Visual = ({
  title,
  children,
  note,
}: {
  title: string;
  children: ReactNode;
  note?: string;
}) => (
  <div className="visual">
    <p className="visual-title">{title}</p>
    {children}
    {note && <p className="visual-note">{note}</p>}
  </div>
);

const steps: Step[] = [
  {
    id: "step-1",
    title: "You upload the design",
    body: "Send STEP, STL, DXF, Gerber, and BOM files. The geometry service reads each part, and an agent proposes a process and a material for it. You review the list and fix whatever looks wrong.",
    href: "/how-it-works#publish",
    link: "What we read from a file",
    visual: (
      <Visual
        title="Parts tree"
        note="Example for a small desk device. You edit the tree before anything is quoted."
      >
        <ul className="rows">
          <li>
            <b>Case</b>
            <span>3D printing, then injection molding</span>
          </li>
          <li>
            <b>Circuit board</b>
            <span>PCB fabrication, then PCB assembly</span>
          </li>
          <li>
            <b>Screws and cable</b>
            <span>Bought parts, kitted at assembly</span>
          </li>
        </ul>
      </Visual>
    ),
  },
  {
    id: "step-2",
    title: "You get a price range",
    body: "Each part is priced from its geometry, process, and quantity. Early numbers are ranges. Once the waitlist reaches a set share of its target, shops quote for real and the ranges narrow to prices.",
    href: "/how-it-works#price",
    link: "How estimates become quotes",
    visual: (
      <Visual title="Unit estimate" note="Example numbers. Real prices come from shop quotes.">
        <ul className="rows">
          <li>
            <b>Case, printed</b>
            <span>$14 to $19</span>
          </li>
          <li>
            <b>Board, assembled</b>
            <span>$31 to $42</span>
          </li>
          <li>
            <b>Screws and cable</b>
            <span>$4 to $6</span>
          </li>
          <li className="total">
            <b>Total</b>
            <span>$49 to $67</span>
          </li>
        </ul>
      </Visual>
    ),
  },
  {
    id: "step-3",
    title: "Buyers join, and the price falls",
    body: "A buyer saves a card and pays nothing. The page shows the current price, the next price break, and how many more people it takes. Past a certain count a part can move from printing to molding, which is why the price drops in steps.",
    href: "/designs",
    link: "See a design page",
    visual: (
      <div className="visual">
        <PriceCalc />
      </div>
    ),
  },
  {
    id: "step-4",
    title: "You press one button",
    body: "When the count is high enough, the run starts. Every shop confirms, buyers are charged, and each shop receives its purchase order in the same moment.",
    href: "/how-it-works#run",
    link: "What happens at trigger",
    visual: (
      <Visual title="The chain" note="Shops in one column work in parallel. Columns run in order.">
        <div className="press">
          <span>Start run</span>
        </div>
        <ChainGraph
          animated
          stages={[
            ["PCB fabrication", "Case"],
            ["PCB assembly"],
            ["Final assembly and test"],
            ["Pack and ship"],
          ]}
        />
      </Visual>
    ),
  },
  {
    id: "step-5",
    title: "Every part is scanned",
    body: "Each part gets a serial code, and shop staff scan it at every step with a phone. If a part arrives bad, the scan shows who made it. After an operator confirms the fault, that shop pays for the reship.",
    href: "/how-it-works#trace",
    link: "How faults are handled",
    visual: (
      <Visual title="Scan log" note="Example trace for one unit.">
        <span className="serial">01-0042-0317</span>
        <ul className="log">
          <li>
            <i>✓</i>
            PCB fabrication<span>Scanned</span>
          </li>
          <li>
            <i>✓</i>
            PCB assembly<span>Scanned</span>
          </li>
          <li>
            <i>✓</i>
            Final assembly and test<span>Passed</span>
          </li>
          <li className="pending">
            <i />
            Pack and ship<span>Next</span>
          </li>
        </ul>
      </Visual>
    ),
  },
  {
    id: "step-6",
    title: "It lands on a desk",
    body: "The last shop packs each unit and ships it. Every buyer gets one tracking page that covers the whole trip, from raw stock to the front door.",
    href: "/how-it-works#ship",
    link: "Shipping and tracking",
    visual: (
      <Visual title="Tracking" note="Example for one buyer.">
        <ul className="log">
          <li>
            <i>✓</i>
            Packed<span>Done</span>
          </li>
          <li>
            <i>✓</i>
            Handed to the carrier<span>Done</span>
          </li>
          <li>
            <i>✓</i>
            In transit<span>Done</span>
          </li>
          <li className="pending">
            <i />
            Delivered<span>Next</span>
          </li>
        </ul>
      </Visual>
    ),
  },
];

export default function Home() {
  const stateList = researchedStates();
  return (
    <div className="has-scroll-video">
      <ScrollSequence base="/frames/story" count={522} poster="/video/story.jpg" />
      <JsonLd data={faqSchema(faqs)} />

      <HeroParallax>
        <h1 className="hook">
          <span className="hook-line">
            <span>Design It</span>
          </span>
          <span className="hook-line">
            <span>Fund It</span>
          </span>
          <span className="hook-line">
            <span>
              <em>Build It</em>
            </span>
          </span>
        </h1>
        <p className="hook-sub">
          Upload a hardware design and open a waitlist. The price falls as people join. When the
          count is high enough, you press one button and every shop starts at once.
        </p>
        <ul className="ticks">
          {ticks.map((t) => (
            <li key={t}>
              <Check />
              {t}
            </li>
          ))}
        </ul>
        <div className="hero-cta">
          <SmartLink href="/start" className="btn btn-yellow">
            Start a design
          </SmartLink>
          <SmartLink href="/how-it-works" className="btn">
            See how it works
          </SmartLink>
        </div>
        <span className="scroll-cue" aria-hidden="true" />
      </HeroParallax>

      <section className="section-tight" aria-label="At a glance">
        <div className="container proof">
          {proof.map((p) => (
            <div key={p.k}>
              <b>{p.k}</b>
              {p.v}
            </div>
          ))}
        </div>
      </section>

      <section id="mission" className="statement" aria-label="Why 01 exists">
        <div className="container">
          <WordReveal text="Most hardware ideas stall at the tooling quote. Shops want minimums and money up front, and none of them talk to each other. 01 puts the whole chain behind a single order." />
        </div>
      </section>

      <section id="how" className="section-yellow" aria-labelledby="how-title">
        <div className="container two-col">
          <div>
            <p className="eyebrow">How a run works</p>
            <h2 id="how-title" className="h2">
              Six steps from file to doorstep
            </h2>
          </div>
          <div>
            <p className="lead">
              Each step below is a short stop. Skim them in order, or open the full write-up.
            </p>
            <SmartLink href="/how-it-works" className="btn btn-solid">
              Read the full flow
            </SmartLink>
          </div>
        </div>
      </section>

      {steps.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          className={`step-section${i % 2 ? " step-section--flip" : ""}`}
          aria-labelledby={`${s.id}-title`}
        >
          <div className="container step-grid">
            <Reveal className="step-copy">
              <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
              <h2 id={`${s.id}-title`} className="h2">
                {s.title}
              </h2>
              <p className="lead">{s.body}</p>
              <SmartLink href={s.href} className="arrow-link">
                {s.link} <span aria-hidden="true">→</span>
              </SmartLink>
            </Reveal>
            <Reveal delay={120}>{s.visual}</Reveal>
          </div>
        </section>
      ))}

      <section className="section" aria-labelledby="proc-title">
        <div className="container">
          <div className="section-head">
            <Reveal>
              <p className="eyebrow">Processes</p>
              <h2 id="proc-title" className="h2">
                Eleven processes, one catalog
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="lead">
                Every shop lists the processes it runs and the limits it holds. Parts go to the
                shops whose limits fit.
              </p>
            </Reveal>
          </div>
        </div>
        <div className="rail" role="list" aria-label="Processes">
          {processes.map((p, i) => (
            <SmartLink key={p.slug} href={`/processes/${p.slug}`} className="card" role="listitem">
              <span className="card-kicker">
                {String(i + 1).padStart(2, "0")} · {p.kind}
              </span>
              <h3 className="h3">{p.title}</h3>
              <p>{p.summary}</p>
              <span className="arrow-link">
                Learn more <span aria-hidden="true">→</span>
              </span>
            </SmartLink>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="who-title">
        <div className="container">
          <div className="section-head">
            <Reveal>
              <p className="eyebrow">Who uses 01</p>
              <h2 id="who-title" className="h2">
                Made for people without a factory
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="lead">
                If you have a design and no capital, one of these pages is about you.
              </p>
            </Reveal>
          </div>
          <div className="card-grid">
            {audiences.map((a, i) => (
              <SmartLink href={`/for/${a.slug}`} className="card" key={a.slug}>
                <span className="card-kicker">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h3">{a.name}</h3>
                <p>{a.summary}</p>
                <span className="arrow-link">
                  Learn more <span aria-hidden="true">→</span>
                </span>
              </SmartLink>
            ))}
          </div>
        </div>
      </section>

      {stateList.length > 0 && (
        <section className="section" aria-labelledby="states-title">
          <div className="container two-col">
            <Reveal>
              <p className="eyebrow">Insights</p>
              <h2 id="states-title" className="h2">
                Where to build near you
              </h2>
              <p className="lead">
                We research makerspaces, events, university programs, and manufacturing support in
                each state, and link the source for every entry.
              </p>
              <SmartLink href="/states" className="btn">
                Browse all states
              </SmartLink>
            </Reveal>
            <Reveal delay={100}>
              <ul className="state-cloud">
                {stateList.map((s) => (
                  <li key={s.slug}>
                    <SmartLink href={`/states/${s.slug}`}>
                      {s.name} <abbr>{s.abbr}</abbr>
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      <section id="faq" className="section" aria-labelledby="faq-title">
        <div className="container two-col">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-title" className="h2">
              Common questions
            </h2>
          </div>
          <div>
            {faqs.map((f) => (
              <details key={f.q} className="faq">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Have a design?"
        body="Upload it and open a waitlist."
        primary={{ href: "/start", label: "Start a design" }}
        secondary={{ href: "/contact", label: "Contact" }}
      />
    </div>
  );
}
