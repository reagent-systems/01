import { BgVideo, CtaBand, Hero, type HeroPanel, JsonLd, Reveal, SmartLink } from "@01/ui";
import { audiences } from "../lib/audiences";
import { faqs } from "../lib/faqs";
import { processes } from "../lib/processes";
import { faqSchema, pageMetadata } from "../lib/seo";

export const metadata = pageMetadata({
  title: "Design Hardware Without Capital",
  description:
    "Publish a hardware design, let buyers join a waitlist with a saved card, and start every shop in the chain with one button. Custom designs, any process.",
  path: "/",
});

const heroPanels: HeroPanel[] = [
  {
    label: "Publish",
    href: "/start",
    video: "publish",
    alt: "A 3D printer building a model",
    blurb:
      "Upload your STEP, STL, Gerber, and BOM files. We read every part and propose how each one gets made.",
  },
  {
    label: "Fund",
    href: "/designs",
    video: "fund",
    alt: "A machine placing components on a circuit board",
    blurb:
      "Buyers join the waitlist and save a card. The price falls as the count rises. Nobody pays before trigger.",
  },
  {
    label: "Build",
    href: "/for/manufacturers",
    video: "build",
    alt: "A robot working on a production line",
    blurb:
      "One button sends the order to every shop at once. Every part gets a serial code and a full trace.",
  },
];

const promises = [
  {
    title: "Buyers fund the run",
    body: "A card is saved, not charged. Charges happen only at trigger, and a buyer can leave before then at no cost.",
  },
  {
    title: "Every part has a trace",
    body: "Each part carries a serial code. Floor staff scan it at every step, so a fault routes to the shop that made it.",
  },
  {
    title: "Faults are paid by the shop",
    body: "A confirmed fault withholds payment for that part. The shop at fault pays the reship.",
  },
];

const tech = [
  {
    tag: "GEOMETRY",
    title: "Read Every Part",
    body: "A CAD kernel reads STEP files and Gerbers: bounding box, volume, features, and minimum feature size.",
  },
  {
    tag: "QUOTING",
    title: "Price From Geometry",
    body: "Estimates come from geometry, process, and quantity. They carry a confidence range until real quotes arrive.",
  },
  {
    tag: "ROUTING",
    title: "Match Parts To Shops",
    body: "Parts match to qualified shops by process and limits, in parallel, in sequence, or both.",
  },
  {
    tag: "TRACE",
    title: "Serial Code On Every Part",
    body: "One code maps to one node, one part, and one run, from raw stock to delivery.",
  },
];

const why = [
  { title: "No capital", body: "Buyers fund the run. The designer pays with design time." },
  { title: "No factory contacts", body: "Every part matches to qualified shops by process." },
  { title: "No early charges", body: "A card is charged only at trigger." },
  { title: "No unpaid faults", body: "A confirmed fault withholds payment for that part." },
];

const steps = [
  {
    href: "/start",
    title: "Publish a design",
    body: "Upload STEP, STL, DXF, Gerber, and BOM files. The geometry service reads every part. The DFM agent proposes a parts tree.",
  },
  {
    href: "/processes",
    title: "Get a price",
    body: "Each part gets an estimate from its geometry, process, and quantity. Real shop quotes replace the estimates before trigger.",
  },
  {
    href: "/designs",
    title: "Join the waitlist",
    body: "Buyers save a card and pay nothing. The unit price falls at each tier as the count rises.",
  },
  {
    href: "/how-it-works#run",
    title: "Press start",
    body: "One button confirms every shop, charges every buyer, and sends a purchase order to the whole chain at once.",
  },
  {
    href: "/how-it-works#trace",
    title: "Track every part",
    body: "Each part carries a serial code. Floor staff scan it at every step. A bad part routes to the shop that made it.",
  },
  {
    href: "/how-it-works#ship",
    title: "Ship to buyers",
    body: "The last shop ships the unit. Buyers see one tracking view from raw stock to their desk.",
  },
];

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <Hero panels={heroPanels} label="01" />

      <div className="section-seam" aria-hidden="true" />

      <section id="mission" className="media-section" aria-labelledby="mission-title">
        <div className="media-bg">
          <BgVideo name="mission" />
        </div>
        <div className="media-shade" />
        <div className="media-content narrow">
          <Reveal>
            <p className="eyebrow">Our Mission</p>
            <h1 id="mission-title" className="display">
              Hardware Without Capital
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="lead" style={{ marginTop: "1.75rem" }}>
              A good design should not need a factory contact or a seed round. Today it does.
              Tooling costs, order minimums, and a chain of shops that never talk to each other keep
              most ideas on the screen.
            </p>
            <p className="lead">
              01 turns that chain into one order. Buyers fund the run. Every shop starts at once.
              Every part carries its history from raw stock to a buyer’s desk.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-label="Three promises">
        <div className="container">
          <div className="section-head">
            <Reveal>
              <p className="eyebrow">What it means to us</p>
              <h2 className="h2">Three promises behind every run</h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="lead" style={{ margin: 0 }}>
                Every run follows the same rules, whatever the part and whatever the quantity.
              </p>
            </Reveal>
          </div>
          <div className="pillars">
            {promises.map((p, i) => (
              <Reveal key={p.title} className="pillar" delay={i * 120}>
                <span className="pillar-num">0{i + 1}</span>
                <h3 className="h3">{p.title}</h3>
                <p>{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="technology" className="media-section" aria-labelledby="tech-title">
        <div className="media-bg">
          <BgVideo name="technology" />
        </div>
        <div className="media-shade" />
        <div className="media-content">
          <Reveal>
            <p className="eyebrow">Technology</p>
            <h2 id="tech-title" className="display" style={{ maxWidth: "16ch" }}>
              Any Design, Broken Into Processes
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="lead" style={{ marginTop: "1.75rem" }}>
              Printify standardizes the product. 01 standardizes the process. Every part maps to a
              process, every shop declares the processes it runs, and the platform matches the two.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="tech-grid" style={{ marginBottom: "2.5rem" }}>
              {tech.map((t) => (
                <div className="tech-card" key={t.title}>
                  <span className="tag">{t.tag}</span>
                  <h3 className="h3">{t.title}</h3>
                  <p>{t.body}</p>
                </div>
              ))}
            </div>
            <SmartLink href="/how-it-works" className="btn">
              How it works
            </SmartLink>
          </Reveal>
        </div>
      </section>

      <section id="why" className="split" aria-labelledby="why-title">
        <div className="split-text">
          <Reveal>
            <p className="eyebrow">Why 01</p>
            <h2 id="why-title" className="h2">
              Funded. Traced. Paid on proof.
            </h2>
            <p className="lead">
              A run only works if every party can see what happened. Each step leaves a record that
              the buyers, the shops, and the designer can read.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ul className="checklist">
              {why.map((g) => (
                <li key={g.title}>
                  <span className="ck" aria-hidden="true">
                    ✓
                  </span>
                  <div>
                    <strong>{g.title}</strong>
                    <span>{g.body}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="btn-row">
              <SmartLink href="/how-it-works" className="btn btn-solid">
                How it works
              </SmartLink>
              <SmartLink href="/#faq" className="btn">
                FAQ
              </SmartLink>
            </div>
          </Reveal>
        </div>
        <div className="split-media">
          <BgVideo name="guarantee" label="Engineers watching a 3D printer work" />
        </div>
      </section>

      <section id="how" className="section bordered-top" aria-labelledby="how-title">
        <div className="container">
          <div className="section-head">
            <Reveal>
              <p className="eyebrow">How it works</p>
              <h2 id="how-title" className="h2">
                One button starts every shop
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="lead" style={{ margin: 0 }}>
                Six steps take a design from upload to a buyer’s desk. The orchestrator runs them as
                one chain.
              </p>
            </Reveal>
          </div>
          <div className="card-grid">
            {steps.map((s, i) => (
              <SmartLink href={s.href} className="card" id={`step-${i + 1}`} key={s.title}>
                <span className="card-kicker">{String(i + 1).padStart(2, "0")} · Step</span>
                <h3 className="h3">{s.title}</h3>
                <p>{s.body}</p>
                <span className="arrow-link">
                  Learn more <span aria-hidden="true">→</span>
                </span>
              </SmartLink>
            ))}
          </div>
        </div>
      </section>

      <section className="section bordered-top" aria-labelledby="proc-title">
        <div className="container">
          <div className="section-head">
            <Reveal>
              <p className="eyebrow">Processes</p>
              <h2 id="proc-title" className="h2">
                Every part finds its process
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="lead" style={{ margin: 0 }}>
                Machining, molding, printing, boards, finishing, and assembly. Each shop declares
                what it runs, and parts match to shops by process and limits.
              </p>
            </Reveal>
          </div>
          <div className="card-grid">
            {processes.slice(0, 6).map((p, i) => (
              <SmartLink href={`/processes/${p.slug}`} className="card" key={p.slug}>
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
          <p style={{ marginTop: "2rem" }}>
            <SmartLink href="/processes" className="arrow-link">
              All processes <span aria-hidden="true">→</span>
            </SmartLink>
          </p>
        </div>
      </section>

      <section className="section-tight bordered-top" aria-label="Who it is for">
        <div className="container">
          <p className="eyebrow">Who it’s for</p>
          <ul className="tag-list">
            {audiences.map((a) => (
              <li key={a.slug} style={{ padding: 0, border: 0 }}>
                <SmartLink href={`/for/${a.slug}`}>{a.name}</SmartLink>
              </li>
            ))}
          </ul>
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
    </>
  );
}
