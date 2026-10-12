import { CtaBand, JsonLd, PageHero, Reveal, SmartLink } from "@01/ui";
import { notFound } from "next/navigation";
import { getInsight, insights } from "../../../lib/insights";
import { absoluteUrl, pageMetadata } from "../../../lib/seo";
import { site } from "../../../lib/site";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Params) {
  const g = getInsight((await params).slug);
  if (!g) return {};
  return pageMetadata({ title: g.title, description: g.description, path: `/insights/${g.slug}` });
}

export default async function InsightPage({ params }: Params) {
  const g = getInsight((await params).slug);
  if (!g) notFound();
  const others = insights.filter((o) => o.slug !== g.slug);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: g.title,
          description: g.description,
          datePublished: g.published,
          dateModified: g.published,
          mainEntityOfPage: absoluteUrl(`/insights/${g.slug}`),
          author: { "@type": "Organization", name: site.legalName },
          publisher: {
            "@type": "Organization",
            name: site.name,
            logo: { "@type": "ImageObject", url: absoluteUrl("/brand/01-mark-512.png") },
          },
        }}
      />
      <PageHero
        crumbs={[
          { name: "Insights", path: "/insights" },
          { name: g.title, path: `/insights/${g.slug}` },
        ]}
        baseUrl={site.url}
        eyebrow={`Guide · ${g.readMinutes} min read`}
        title={g.title}
        lead={g.description}
        short
      />
      <article className="section">
        <div className="container">
          <div className="prose">
            {g.sections.map((s) => (
              <Reveal key={s.heading}>
                <h2>{s.heading}</h2>
                {s.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </Reveal>
            ))}
          </div>
        </div>
      </article>
      <section className="section-tight bordered-top" aria-label="More guides">
        <div className="container">
          <p className="eyebrow">More guides</p>
          <ul className="tag-list">
            {others.map((o) => (
              <li key={o.slug} style={{ padding: 0, border: 0 }}>
                <SmartLink href={`/insights/${o.slug}`}>{o.title}</SmartLink>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand
        title="Ready to build without capital?"
        body="Publish a design. Let the waitlist fund the run."
        primary={{ href: "/start", label: "Start a design" }}
        secondary={{ href: "/insights", label: "All guides" }}
      />
    </>
  );
}
