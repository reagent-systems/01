import { CtaBand, PageHero, Reveal, SmartLink } from "@01/ui";
import { notFound } from "next/navigation";
import { ChainGraph } from "../../../components/ChainGraph";
import { audiences, getAudience } from "../../../lib/audiences";
import { designs } from "../../../lib/designs";
import { platforms } from "../../../lib/platforms";
import { pageMetadata } from "../../../lib/seo";
import { site } from "../../../lib/site";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return audiences.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params) {
  const a = getAudience((await params).slug);
  if (!a) return {};
  return pageMetadata({
    title: `01 for ${a.name}`,
    description: a.summary,
    path: `/for/${a.slug}`,
  });
}

const path = [
  "Publish the design",
  "Get a price curve",
  "Buyers join the waitlist",
  "Press start",
  "Every part is traced",
  "Units ship to buyers",
];

export default async function AudiencePage({ params }: Params) {
  const a = getAudience((await params).slug);
  if (!a) notFound();
  const fit = platforms.filter((p) => a.platforms.includes(p.slug));
  const design = designs[0];
  const others = audiences.filter((o) => o.slug !== a.slug);

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Who it’s for", path: "/for" },
          { name: a.name, path: `/for/${a.slug}` },
        ]}
        baseUrl={site.url}
        eyebrow={a.eyebrow}
        title={a.title}
        lead={a.summary}
      >
        <SmartLink href={a.shop ? "/start" : "/start"} className="btn btn-solid">
          {a.shop ? "Join as a shop" : "Start a design"}
        </SmartLink>
      </PageHero>

      <section className="section">
        <div className="container two-col">
          <Reveal>
            <p className="eyebrow">The problem</p>
            <h2 className="h2">{a.shop ? "Quotes that never close" : "Capital is the wall"}</h2>
            <p className="lead">{a.problem}</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="h3">What you skip</h2>
            <ul className="checklist">
              {a.skip.map((t) => (
                <li key={t}>
                  <span className="ck" aria-hidden="true">
                    ✓
                  </span>
                  <div>
                    <strong>No {t.toLowerCase()}</strong>
                  </div>
                </li>
              ))}
            </ul>
            <h2 className="h3">What you bring</h2>
            <ul className="tag-list">
              {a.bring.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="pillars">
            {a.gets.map((g, i) => (
              <Reveal key={g.title} className="pillar" delay={i * 100}>
                <span className="pillar-num">0{i + 1}</span>
                <h3 className="h3">{g.title}</h3>
                <p>{g.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bordered-top" aria-labelledby="path-title">
        <div className="container two-col">
          <Reveal>
            <p className="eyebrow">{a.shop ? "How a job reaches you" : "Idea to shipped unit"}</p>
            <h2 id="path-title" className="h2">
              The path
            </h2>
            <ol className="checklist" style={{ listStyle: "none" }}>
              {path.map((t, i) => (
                <li key={t}>
                  <span className="ck" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <strong>{t}</strong>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow">Example chain</p>
            <ChainGraph stages={a.chain} />
          </Reveal>
        </div>
      </section>

      {!a.shop && (
        <section className="section-tight bordered-top" aria-label="Live design and platforms">
          <div className="container two-col">
            <div>
              <p className="eyebrow">Live example design</p>
              <SmartLink
                href={`/designs/${design?.slug}`}
                className="card"
                style={{ minHeight: 0 }}
              >
                <span className="card-kicker">Design</span>
                <h3 className="h3">{design?.title}</h3>
                <p>{design?.summary}</p>
                <span className="arrow-link">
                  See the design <span aria-hidden="true">→</span>
                </span>
              </SmartLink>
            </div>
            <div>
              <p className="eyebrow">Platforms that fit</p>
              {fit.length === 0 ? (
                <p className="lead" style={{ margin: 0 }}>
                  Custom designs are the main path. A base platform is an optional shortcut.{" "}
                  <SmartLink href="/platforms">See the platforms.</SmartLink>
                </p>
              ) : (
                <ul className="tag-list">
                  {fit.map((p) => (
                    <li key={p.slug} style={{ padding: 0, border: 0 }}>
                      <SmartLink href={`/platforms/${p.slug}`}>{p.title}</SmartLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="section-tight bordered-top" aria-label="Related">
        <div className="container">
          <p className="eyebrow">Also for</p>
          <ul className="tag-list">
            {others.map((o) => (
              <li key={o.slug} style={{ padding: 0, border: 0 }}>
                <SmartLink href={`/for/${o.slug}`}>{o.name}</SmartLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title={a.shop ? "Ready to join the network?" : "Ready to build without capital?"}
        body={
          a.shop
            ? "Tell us which processes you run and the limits you hold."
            : "Publish a design. Let the waitlist fund the run."
        }
        primary={{
          href: a.shop ? "/start" : "/start",
          label: a.shop ? "Join as a shop" : "Start a design",
        }}
        secondary={{ href: "/how-it-works", label: "How it works" }}
      />
    </>
  );
}
