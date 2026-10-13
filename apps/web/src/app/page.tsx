import {
  CtaBand,
  HeroParallax,
  HorizontalReel,
  JsonLd,
  PinnedRun,
  PriceCalc,
  Reveal,
  ScrollSequence,
  SmartLink,
  WordReveal,
} from "@01/ui";
import { audiences } from "../lib/audiences";
import { faqs } from "../lib/faqs";
import { insights } from "../lib/insights";
import { processes } from "../lib/processes";
import { faqSchema, pageMetadata } from "../lib/seo";
import { researchedStates } from "../lib/state-data";

export const metadata = pageMetadata({
  title: "Design Hardware Without Capital",
  description:
    "Publish a hardware design, let buyers join a waitlist with a saved card, and start every shop in the chain with one button. Custom designs, any process, no capital up front.",
  path: "/",
});

const Check = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M3 9.5l4 4 8-9" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
  </svg>
);

const ticks = ["Designers pay nothing up front", "Buyers pay only at trigger", "Any custom design"];

const proof = [
  { k: "01", v: "Charged only at trigger" },
  { k: "02", v: "A serial code on every part" },
  { k: "03", v: "Faults paid by the shop that made them" },
  { k: "04", v: "Any design, any process" },
];

const steps = [
  {
    title: "Upload your design",
    body: "Send STEP, STL, Gerber, and BOM files. 01 reads every part, picks a process for each, and shows you a price curve.",
  },
  {
    title: "Buyers join the waitlist",
    body: "People save a card and pay nothing. The price falls at every tier as the count rises, and the page always shows the next break.",
  },
  {
    title: "One button builds it",
    body: "At the target count you press start. Every shop gets its order at once, buyers are charged, and every part is traced to your buyer.",
  },
];

const resources = [
  {
    href: "/how-it-works",
    k: "Platform",
    t: "How it works",
    b: "The seven steps from upload to a unit on a desk.",
  },
  {
    href: "/insights",
    k: "Insights",
    t: "Guides",
    b: "Molding vs printing, DFM, group buys, and boards.",
  },
  {
    href: "/states",
    k: "Insights",
    t: "Hardware by state",
    b: "Makerspaces, events, programs, and specialties in each state.",
  },
  {
    href: "/compliance",
    k: "Platform",
    t: "Compliance",
    b: "FCC, batteries, and export control, before you publish.",
  },
  {
    href: "/designs",
    k: "Designs",
    t: "Join a waitlist",
    b: "See a live design and how its price curve works.",
  },
  {
    href: "/for/manufacturers",
    k: "Shops",
    t: "Join as a shop",
    b: "Declare your processes and get matched to funded orders.",
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
          Publish a hardware design. People join a waitlist, and the price drops as more join. At
          the target count, one button sends the order to every shop in the chain.
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
        <p className="hero-micro">No factory contacts. No seed round.</p>
        <span className="scroll-cue" aria-hidden="true" />
      </HeroParallax>

      <div className="proof" aria-label="What to expect">
        {proof.map((p) => (
          <div key={p.k}>
            <b>{p.k}</b>
            {p.v}
          </div>
        ))}
      </div>

      <section id="mission" className="statement" aria-label="Why 01 exists">
        <div className="statement-wrap">
          <WordReveal text="Hardware is hard to fund. Tooling, minimums, and a chain of shops that never talk. 01 turns that chain into one order." />
        </div>
      </section>

      <section id="start" className="section section-yellow" aria-labelledby="start-title">
        <div className="container steps3">
          <div className="steps3-head">
            <p className="eyebrow">How it works</p>
            <h2 id="start-title" className="h2" style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)" }}>
              Start with no capital
            </h2>
            <p className="lead">
              Three steps take a design from your screen to a buyer’s desk. You never hold inventory
              and you never pay for tooling up front.
            </p>
            <SmartLink href="/how-it-works" className="btn btn-solid">
              The full flow
            </SmartLink>
          </div>
          <div>
            {steps.map((s, i) => (
              <Reveal key={s.title} className="step3" delay={i * 90}>
                <span className="step3-n">{i + 1}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PinnedRun />

      <section id="price" className="section" aria-labelledby="calc-title">
        <div className="container">
          <div className="section-head">
            <Reveal>
              <p className="eyebrow">The price curve</p>
              <h2 id="calc-title" className="h2">
                Watch the price fall
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="lead" style={{ margin: 0 }}>
                Slide the waitlist count. Every price break lowers the unit price, and at a high
                tier the case moves from printing to molding.
              </p>
            </Reveal>
          </div>
          <Reveal>
            <PriceCalc />
          </Reveal>
        </div>
      </section>

      <section className="section-tight bordered-top" aria-labelledby="proc-title">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Processes</p>
            <h2 id="proc-title" className="h2">
              Every part finds a process
            </h2>
            <p className="lead">
              Machining, molding, printing, boards, finishing, and assembly. Each shop declares what
              it runs, and parts match to shops by process and limits.
            </p>
          </Reveal>
        </div>
      </section>
      <HorizontalReel>
        {processes.map((p, i) => (
          <SmartLink key={p.slug} href={`/processes/${p.slug}`} className="reel-card">
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
        <SmartLink href="/processes" className="reel-card">
          <span className="card-kicker">All</span>
          <h3 className="h3">See every process</h3>
          <p>The full catalog, with what each one is best at.</p>
          <span className="arrow-link">
            All processes <span aria-hidden="true">→</span>
          </span>
        </SmartLink>
      </HorizontalReel>

      <section className="section bordered-top" aria-labelledby="who-title">
        <div className="container">
          <div className="section-head">
            <Reveal>
              <p className="eyebrow">Who it’s for</p>
              <h2 id="who-title" className="h2">
                One answer, for eight kinds of people
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="lead" style={{ margin: 0 }}>
                I want to design hardware, but I do not have the capital. Pick the page that sounds
                like you.
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
        <section className="section-tight bordered-top" aria-labelledby="states-title">
          <div className="container two-col">
            <Reveal>
              <p className="eyebrow">Insights</p>
              <h2 id="states-title" className="h2">
                Hardware, state by state
              </h2>
              <p className="lead">
                Where to prototype, which events to go to, and which programs back small
                manufacturers in your state, with a source for every line.
              </p>
              <SmartLink href="/states" className="btn">
                All states
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

      <section className="section bordered-top" aria-labelledby="res-title">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Resources</p>
            <h2 id="res-title" className="h2">
              Everything you need to go from idea to unit
            </h2>
          </Reveal>
          <div className="res-grid" style={{ marginTop: "3rem" }}>
            {resources.map((r) => (
              <SmartLink href={r.href} className="card" key={r.href}>
                <span className="card-kicker">{r.k}</span>
                <h3 className="h3">{r.t}</h3>
                <p>{r.b}</p>
                <span className="arrow-link">
                  Open <span aria-hidden="true">→</span>
                </span>
              </SmartLink>
            ))}
          </div>
          <p style={{ marginTop: "2rem", color: "var(--dim)", fontSize: "0.85rem" }}>
            Latest guide:{" "}
            <SmartLink
              href={`/insights/${insights[0]?.slug}`}
              style={{ textDecoration: "underline" }}
            >
              {insights[0]?.title}
            </SmartLink>
          </p>
        </div>
      </section>

      <section id="faq" className="section bordered-top" aria-labelledby="faq-title">
        <div className="container two-col">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-title" className="h2">
              Questions people ask
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
        title="Ready to build without capital?"
        body="Publish a design. Let the waitlist fund the run."
        primary={{ href: "/start", label: "Start a design" }}
        secondary={{ href: "/contact", label: "Contact" }}
      />
    </div>
  );
}
