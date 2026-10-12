import { CtaBand, JsonLd, PageHero, Reveal, SmartLink } from "@01/ui";
import { notFound } from "next/navigation";
import { processes } from "../../../lib/processes";
import { faqSchema, pageMetadata } from "../../../lib/seo";
import { site } from "../../../lib/site";
import {
  getResearch,
  hasEnoughResearch,
  researchedStates,
  sourcesFor,
} from "../../../lib/state-data";
import { getState } from "../../../lib/states";

type Params = { params: Promise<{ state: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return researchedStates().map((s) => ({ state: s.slug }));
}

const list = (items: string[]) =>
  items.length < 2
    ? items.join("")
    : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;

export async function generateMetadata({ params }: Params) {
  const st = getState((await params).state);
  const r = st && getResearch(st.slug);
  if (!st || !hasEnoughResearch(r)) return {};
  const where = list(r.makerspaces.slice(0, 2).map((m) => m.name));
  return pageMetadata({
    title: `Hardware Prototyping and Manufacturing in ${st.name}`,
    description: `Where to prototype hardware in ${st.name}: ${where ? `makerspaces like ${where}, ` : ""}events, university programs, manufacturing specialties, and state support. Every entry has a source.`,
    path: `/states/${st.slug}`,
  });
}

export default async function StatePage({ params }: Params) {
  const st = getState((await params).state);
  const r = st && getResearch(st.slug);
  if (!st || !hasEnoughResearch(r)) notFound();

  const all = researchedStates();
  const idx = all.findIndex((s) => s.slug === st.slug);
  const neighbors =
    all.length > 1 ? [-1, 1].map((o) => all[(idx + o + all.length) % all.length]) : [];

  const faqs = [
    r.makerspaces.length > 0 && {
      q: `Where can I prototype hardware in ${st.name}?`,
      a: `${st.name} has makerspaces and fab labs such as ${list(r.makerspaces.slice(0, 3).map((m) => `${m.name} in ${m.city}`))}. Check each space for current equipment and membership rules.`,
    },
    r.support.length > 0 && {
      q: `What support exists for small manufacturers in ${st.name}?`,
      a: `${list(r.support.slice(0, 2).map((s) => s.name))} ${r.support.length > 1 ? "offer" : "offers"} support to small manufacturers and inventors. See each program for what it covers today.`,
    },
    r.events.length > 0 && {
      q: `Which hardware events happen in ${st.name}?`,
      a: `Recurring events include ${list(r.events.slice(0, 3).map((e) => `${e.name} in ${e.city}`))}. Dates change, so check each event page.`,
    },
  ].filter((x): x is { q: string; a: string } => Boolean(x));

  const sources = sourcesFor(r);

  return (
    <>
      <JsonLd data={faqs.length ? faqSchema(faqs) : []} />
      <PageHero
        crumbs={[
          { name: "Hardware by state", path: "/states" },
          { name: st.name, path: `/states/${st.slug}` },
        ]}
        baseUrl={site.url}
        eyebrow={`Insights · ${st.abbr}`}
        title={`Hardware in ${st.name}`}
        lead={`Where to prototype, which events to attend, and which programs back small manufacturers in ${st.name}. Researched ${r.researched}, with a source on every entry.`}
        short
      >
        <SmartLink href="/start" className="btn btn-solid">
          Start a design
        </SmartLink>
      </PageHero>

      {r.makerspaces.length > 0 && (
        <section className="section">
          <div className="container two-col">
            <Reveal>
              <p className="eyebrow">Makerspaces and fab labs</p>
              <h2 className="h2">Build a first prototype</h2>
              <p className="lead">
                Shared shops where you can print, cut, and wire a prototype before you publish the
                design.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <ul className="fact-list">
                {r.makerspaces.map((m) => (
                  <li key={m.name}>
                    <b>{m.name}</b>
                    <span>{m.note}</span>
                    <small>
                      {m.city} ·{" "}
                      <a href={m.url} rel="noopener noreferrer" target="_blank">
                        Website
                      </a>
                    </small>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      {r.events.length > 0 && (
        <section className="section-tight bordered-top">
          <div className="container two-col">
            <Reveal>
              <p className="eyebrow">Events</p>
              <h2 className="h2">Meet other builders</h2>
            </Reveal>
            <Reveal delay={100}>
              <ul className="fact-list">
                {r.events.map((e) => (
                  <li key={e.name}>
                    <b>{e.name}</b>
                    <span>{e.note}</span>
                    <small>
                      {e.city}
                      {e.month ? ` · ${e.month}` : ""} ·{" "}
                      <a href={e.url} rel="noopener noreferrer" target="_blank">
                        Event page
                      </a>
                    </small>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      {r.programs.length > 0 && (
        <section className="section-tight bordered-top">
          <div className="container two-col">
            <Reveal>
              <p className="eyebrow">Programs</p>
              <h2 className="h2">Labs, incubators, accelerators</h2>
            </Reveal>
            <Reveal delay={100}>
              <ul className="fact-list">
                {r.programs.map((p) => (
                  <li key={p.name}>
                    <b>{p.name}</b>
                    <span>{p.note}</span>
                    <small>
                      {p.city} ·{" "}
                      <a href={p.url} rel="noopener noreferrer" target="_blank">
                        Website
                      </a>
                    </small>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      {r.specialties.length > 0 && (
        <section className="section-tight bordered-top">
          <div className="container two-col">
            <Reveal>
              <p className="eyebrow">Manufacturing specialties</p>
              <h2 className="h2">What {st.name} makes</h2>
            </Reveal>
            <Reveal delay={100}>
              <ul className="fact-list">
                {r.specialties.map((s) => (
                  <li key={s.name}>
                    <b>{s.name}</b>
                    <span>{s.note}</span>
                    <small>
                      <a href={s.source} rel="noopener noreferrer" target="_blank">
                        Source
                      </a>
                    </small>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      {r.support.length > 0 && (
        <section className="section-tight bordered-top">
          <div className="container two-col">
            <Reveal>
              <p className="eyebrow">Support</p>
              <h2 className="h2">Help for small manufacturers</h2>
            </Reveal>
            <Reveal delay={100}>
              <ul className="fact-list">
                {r.support.map((s) => (
                  <li key={s.name}>
                    <b>{s.name}</b>
                    <span>{s.note}</span>
                    <small>
                      <a href={s.url} rel="noopener noreferrer" target="_blank">
                        Website
                      </a>
                    </small>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      <section className="section bordered-top" aria-labelledby="how-title">
        <div className="container two-col">
          <Reveal>
            <p className="eyebrow">With 01</p>
            <h2 id="how-title" className="h2">
              A {st.name} design, made by the right shops
            </h2>
            <p className="lead">
              Publish a design from {st.name}. 01 matches each part to a shop by process, buyers
              fund the run through a waitlist, and every part is traced to the buyer.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <ul className="tag-list">
              {processes.map((p) => (
                <li key={p.slug} style={{ padding: 0, border: 0 }}>
                  <SmartLink href={`/processes/${p.slug}`}>{p.title}</SmartLink>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {faqs.length > 0 && (
        <section className="section-tight bordered-top" aria-labelledby="sfaq-title">
          <div className="container two-col">
            <div>
              <p className="eyebrow">FAQ</p>
              <h2 id="sfaq-title" className="h2">
                {st.name} questions
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
      )}

      <section className="section-tight bordered-top" aria-label="Sources">
        <div className="container two-col">
          <div>
            <p className="eyebrow">Sources</p>
            <p className="lead" style={{ margin: 0 }}>
              Every entry above links to the page it came from. Details change. Confirm a space’s
              hours, an event’s dates, and a program’s terms with the organizer.
            </p>
          </div>
          <ul className="source-list">
            {sources.map((u) => (
              <li key={u}>
                <a href={u} rel="noopener noreferrer" target="_blank">
                  {u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {neighbors.length > 0 && (
        <section className="section-tight bordered-top" aria-label="More states">
          <div className="container">
            <p className="eyebrow">More states</p>
            <ul className="state-cloud">
              {neighbors.map(
                (n) =>
                  n && (
                    <li key={n.slug}>
                      <SmartLink href={`/states/${n.slug}`}>
                        {n.name} <abbr>{n.abbr}</abbr>
                      </SmartLink>
                    </li>
                  ),
              )}
              <li>
                <SmartLink href="/states">All states</SmartLink>
              </li>
            </ul>
          </div>
        </section>
      )}

      <CtaBand
        title={`Building in ${st.name}?`}
        body="Publish the design. Let the waitlist fund the run."
        primary={{ href: "/start", label: "Start a design" }}
        secondary={{ href: "/states", label: "All states" }}
      />
    </>
  );
}
