import { CtaBand, PageHero, Reveal, SmartLink } from "@01/ui";
import { audiences } from "../../lib/audiences";
import { pageMetadata } from "../../lib/seo";
import { site } from "../../lib/site";

export const metadata = pageMetadata({
  title: "Who It’s For: Inventors, Makers, Startups, Creators, Educators and Shops",
  description:
    "I want to design hardware but I do not have the capital. See how 01 works for inventors, hobbyists, startups, creators, open-source projects, educators, engineers, and manufacturers.",
  path: "/for",
});

export default function ForPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Who it’s for", path: "/for" }]}
        baseUrl={site.url}
        eyebrow="Who it’s for"
        title="Who 01 Is For"
        lead="Eight kinds of people use 01. Publish a design, let buyers fund the run, and let the shops build it."
        video="guarantee"
      />
      <section className="section">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Pick yours</p>
          </Reveal>
          <div className="card-grid">
            {audiences.map((a, i) => (
              <SmartLink href={`/for/${a.slug}`} className="card" key={a.slug}>
                <span className="card-kicker">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="h3">{a.name}</h2>
                <p>{a.title}</p>
                <span className="arrow-link">
                  Learn more <span aria-hidden="true">→</span>
                </span>
              </SmartLink>
            ))}
          </div>
        </div>
      </section>
      <CtaBand
        title="Not sure which one you are?"
        body="Tell us about the design. We will point you to the right path."
        primary={{ href: "/start", label: "Start a design" }}
        secondary={{ href: "/contact", label: "Contact" }}
      />
    </>
  );
}
