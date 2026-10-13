import { CtaBand, PageHero, Reveal, SmartLink } from "@01/ui";
import { platforms } from "../../lib/platforms";
import { pageMetadata } from "../../lib/seo";
import { site } from "../../lib/site";

export const metadata = pageMetadata({
  title: "Base Platforms: Shortcuts for Faster Quotes",
  description:
    "Base platforms are standard cases and footprints that make quoting faster and cheaper. They are shortcuts, never a requirement. Every custom design still works.",
  path: "/platforms",
});

export default function PlatformsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Platforms", path: "/platforms" }]}
        baseUrl={site.url}
        eyebrow="Platforms"
        title="Base Platforms"
        lead="A base platform is a standard case or footprint that is already quoted and routed. Custom designs do not need one."
        short
      />
      <section className="section">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Available</p>
          </Reveal>
          <div className="card-grid">
            {platforms.map((p, i) => (
              <SmartLink href={`/platforms/${p.slug}`} className="card" key={p.slug}>
                <span className="card-kicker">
                  {String(i + 1).padStart(2, "0")} · {p.status}
                </span>
                <h2 className="h3">{p.title}</h2>
                <p>{p.summary}</p>
                <span className="arrow-link">
                  Learn more <span aria-hidden="true">→</span>
                </span>
              </SmartLink>
            ))}
          </div>
          <p className="lead" style={{ marginTop: "3rem" }}>
            Next: a modular housing frame for a scale model. The first model is not chosen yet.
          </p>
        </div>
      </section>
      <CtaBand
        title="Have a design that fits?"
        body="Publish it. If it matches a platform, the case is already quoted."
        primary={{ href: "/start", label: "Start a design" }}
        secondary={{ href: "/designs", label: "Designs" }}
      />
    </>
  );
}
