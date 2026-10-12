import { CtaBand, PageHero, Reveal, SmartLink } from "@01/ui";
import { insights } from "../../lib/insights";
import { pageMetadata } from "../../lib/seo";
import { site } from "../../lib/site";

export const metadata = pageMetadata({
  title: "Insights: Guides for Hardware Inventors",
  description:
    "Plain guides for hardware inventors: injection molding vs 3D printing, design for manufacture, how group buys work, and how a circuit board gets made.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Insights", path: "/insights" }]}
        baseUrl={site.url}
        eyebrow="Insights"
        title="Plain Guides for Hardware Inventors"
        lead="What each process costs, where it fits, and what can go wrong, in words you can act on."
        short
      />
      <section className="section">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Guides</p>
          </Reveal>
          <div className="card-grid">
            {insights.map((g, i) => (
              <SmartLink href={`/insights/${g.slug}`} className="card" key={g.slug}>
                <span className="card-kicker">
                  {String(i + 1).padStart(2, "0")} · {g.readMinutes} min read
                </span>
                <h2 className="h3">{g.title}</h2>
                <p>{g.description}</p>
                <span className="arrow-link">
                  Read <span aria-hidden="true">→</span>
                </span>
              </SmartLink>
            ))}
          </div>
          <p className="lead" style={{ marginTop: "3rem" }}>
            Looking for local help? See <SmartLink href="/states">hardware by state</SmartLink>.
          </p>
        </div>
      </section>
      <CtaBand
        title="Ready to build without capital?"
        body="Publish a design. Let the waitlist fund the run."
        primary={{ href: "/start", label: "Start a design" }}
        secondary={{ href: "/how-it-works", label: "How it works" }}
      />
    </>
  );
}
