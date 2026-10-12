import { CtaBand, PageHero, Reveal, SmartLink } from "@01/ui";
import { designs } from "../../lib/designs";
import { pageMetadata } from "../../lib/seo";
import { site } from "../../lib/site";

export const metadata = pageMetadata({
  title: "Designs: Join a Waitlist",
  description:
    "Designs published on 01. Each page shows the price curve, the next price break, and the count to trigger. Join with a saved card and pay nothing until the run starts.",
  path: "/designs",
});

export default function DesignsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Designs", path: "/designs" }]}
        baseUrl={site.url}
        eyebrow="Designs"
        title="Join a Waitlist. Fund a Run."
        lead="Every design has a page with its price, the next price break, and the count to trigger. A saved card is charged only when the run starts."
        short
      />
      <section className="section">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Published</p>
          </Reveal>
          <div className="card-grid">
            {designs.map((d, i) => (
              <SmartLink href={`/designs/${d.slug}`} className="card" key={d.slug}>
                <span className="card-kicker">
                  {String(i + 1).padStart(2, "0")} · Waitlist opens soon
                </span>
                <h2 className="h3">{d.title}</h2>
                <p>{d.summary}</p>
                <span className="arrow-link">
                  See the design <span aria-hidden="true">→</span>
                </span>
              </SmartLink>
            ))}
          </div>
        </div>
      </section>
      <CtaBand
        title="Have a design?"
        body="Publish it and open your own waitlist."
        primary={{ href: "/start", label: "Start a design" }}
        secondary={{ href: "/how-it-works", label: "How it works" }}
      />
    </>
  );
}
