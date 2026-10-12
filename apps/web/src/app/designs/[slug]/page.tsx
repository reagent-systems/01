import { CtaBand, PageHero, Reveal, SmartLink } from "@01/ui";
import { notFound } from "next/navigation";
import { ChainGraph } from "../../../components/ChainGraph";
import { designs, getDesign } from "../../../lib/designs";
import { getPlatform } from "../../../lib/platforms";
import { pageMetadata } from "../../../lib/seo";
import { site } from "../../../lib/site";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return designs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Params) {
  const d = getDesign((await params).slug);
  if (!d) return {};
  return pageMetadata({
    title: `${d.title}: Waitlist`,
    description: `${d.summary} See the parts, the chain of shops, and how the price curve works.`,
    path: `/designs/${d.slug}`,
  });
}

export default async function DesignPage({ params }: Params) {
  const d = getDesign((await params).slug);
  if (!d) notFound();
  const platform = d.platform ? getPlatform(d.platform) : undefined;

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Designs", path: "/designs" },
          { name: d.title, path: `/designs/${d.slug}` },
        ]}
        baseUrl={site.url}
        eyebrow="Design · Waitlist opens soon"
        title={d.title}
        lead={d.summary}
        video={d.video}
      >
        <SmartLink href="/contact" className="btn btn-solid">
          Tell me when it opens
        </SmartLink>
      </PageHero>

      <section className="section">
        <div className="container two-col">
          <Reveal>
            <p className="eyebrow">About</p>
            <h2 className="h2">The first run</h2>
            <p className="lead">{d.intro}</p>
            {platform && (
              <p className="lead">
                Built on the{" "}
                <SmartLink href={`/platforms/${platform.slug}`}>{platform.title}</SmartLink>.
              </p>
            )}
          </Reveal>
          <Reveal delay={100}>
            <table className="spec-table">
              <caption className="sr-only">Parts and processes</caption>
              <tbody>
                {d.parts.map((p) => (
                  <tr key={p.name}>
                    <th scope="row">{p.name}</th>
                    <td>
                      {p.low}
                      {p.high ? `. At higher tiers: ${p.high}.` : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <section className="section bordered-top" aria-labelledby="chain-title">
        <div className="container">
          <Reveal>
            <p className="eyebrow">The chain</p>
            <h2 id="chain-title" className="h2">
              Who makes what
            </h2>
            <ChainGraph stages={d.chain} animated />
          </Reveal>
        </div>
      </section>

      <section className="section-tight bordered-top" aria-label="Price curve">
        <div className="container two-col">
          <Reveal>
            <p className="eyebrow">Price curve</p>
            <h2 className="h3">Set by real quotes</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="lead" style={{ margin: 0 }}>
              Tier prices are set from real shop quotes, so none are shown yet. When the waitlist
              opens, this page shows the current price, the next price break, and the count to
              trigger. Joining takes a saved card and charges nothing.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Want one on your desk?"
        body="Tell us you are interested. We will say when the waitlist opens."
        primary={{ href: "/contact", label: "Tell me when it opens" }}
        secondary={{ href: "/designs", label: "All designs" }}
      />
    </>
  );
}
