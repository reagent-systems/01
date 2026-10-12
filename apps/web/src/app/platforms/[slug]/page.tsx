import { CtaBand, PageHero, Reveal, SmartLink } from "@01/ui";
import { notFound } from "next/navigation";
import { designs } from "../../../lib/designs";
import { getPlatform, platforms } from "../../../lib/platforms";
import { pageMetadata } from "../../../lib/seo";
import { site } from "../../../lib/site";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return platforms.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params) {
  const p = getPlatform((await params).slug);
  if (!p) return {};
  return pageMetadata({ title: p.title, description: p.summary, path: `/platforms/${p.slug}` });
}

export default async function PlatformPage({ params }: Params) {
  const p = getPlatform((await params).slug);
  if (!p) notFound();
  const on = designs.filter((d) => d.platform === p.slug);

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Platforms", path: "/platforms" },
          { name: p.title, path: `/platforms/${p.slug}` },
        ]}
        baseUrl={site.url}
        eyebrow={`Platform · ${p.status}`}
        title={p.title}
        lead={p.summary}
        short
      />
      <section className="section">
        <div className="container two-col">
          <Reveal>
            <p className="eyebrow">Overview</p>
            <h2 className="h2">One case, many boards</h2>
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
      <section className="section-tight bordered-top">
        <div className="container two-col">
          <div>
            <p className="eyebrow">Fits</p>
            <ul className="tag-list">
              {p.fits.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Designs on this platform</p>
            <ul className="tag-list">
              {on.map((d) => (
                <li key={d.slug} style={{ padding: 0, border: 0 }}>
                  <SmartLink href={`/designs/${d.slug}`}>{d.title}</SmartLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <CtaBand
        title="Building on this platform?"
        body="Publish your board. The case is already quoted."
        primary={{ href: "/start", label: "Start a design" }}
        secondary={{ href: "/platforms", label: "All platforms" }}
      />
    </>
  );
}
