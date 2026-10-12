import { CtaBand, JsonLd, PageHero, Reveal, SmartLink } from "@01/ui";
import { notFound } from "next/navigation";
import { audiences } from "../../../lib/audiences";
import { getProcess, processes } from "../../../lib/processes";
import { pageMetadata, serviceSchema } from "../../../lib/seo";
import { site } from "../../../lib/site";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return processes.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params) {
  const p = getProcess((await params).slug);
  if (!p) return {};
  return pageMetadata({
    title: `${p.title} on 01`,
    description: `${p.summary} See how ${p.keyword} fits a 01 run and where the price curve switches to it.`,
    path: `/processes/${p.slug}`,
  });
}

export default async function ProcessPage({ params }: Params) {
  const p = getProcess((await params).slug);
  if (!p) notFound();
  const others = processes.filter((o) => o.slug !== p.slug);

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: p.title,
          description: p.summary,
          path: `/processes/${p.slug}`,
        })}
      />
      <PageHero
        crumbs={[
          { name: "Processes", path: "/processes" },
          { name: p.title, path: `/processes/${p.slug}` },
        ]}
        baseUrl={site.url}
        eyebrow={p.kind}
        title={p.title}
        lead={p.summary}
        video={p.video}
      >
        <SmartLink href="/start" className="btn btn-solid">
          Start a design
        </SmartLink>
      </PageHero>

      <section className="section">
        <div className="container two-col">
          <Reveal>
            <p className="eyebrow">Overview</p>
            <h2 className="h2">{p.keyword}</h2>
            <p className="lead">{p.intro}</p>
          </Reveal>
          <Reveal delay={100}>
            <table className="spec-table">
              <caption className="sr-only">{p.title} summary</caption>
              <tbody>
                {p.specs.map((s) => (
                  <tr key={s.label}>
                    <th scope="row">{s.label}</th>
                    <td>{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="pillars">
            {p.points.map((pt, i) => (
              <Reveal key={pt.title} className="pillar" delay={i * 100}>
                <span className="pillar-num">0{i + 1}</span>
                <h3 className="h3">{pt.title}</h3>
                <p>{pt.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bordered-top">
        <div className="container two-col">
          <div>
            <p className="eyebrow">Who uses it</p>
            <h2 className="h3">Designers who need {p.keyword}</h2>
            <ul className="tag-list" style={{ marginTop: "1.5rem" }}>
              {audiences
                .filter((a) => !a.shop)
                .map((a) => (
                  <li key={a.slug} style={{ padding: 0, border: 0 }}>
                    <SmartLink href={`/for/${a.slug}`}>{a.name}</SmartLink>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Related</p>
            <h2 className="h3">More processes</h2>
            <ul className="tag-list" style={{ marginTop: "1.5rem" }}>
              {others.map((o) => (
                <li key={o.slug} style={{ padding: 0, border: 0 }}>
                  <SmartLink href={`/processes/${o.slug}`}>{o.title}</SmartLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand
        title={`Need ${p.keyword}?`}
        body="Publish the design. The platform matches each part to a shop that runs the process."
        primary={{ href: "/start", label: "Start a design" }}
        secondary={{ href: "/for/manufacturers", label: "Join as a shop" }}
      />
    </>
  );
}
