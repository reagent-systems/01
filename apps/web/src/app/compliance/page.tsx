import { CtaBand, PageHero, Reveal } from "@01/ui";
import { pageMetadata } from "../../lib/seo";
import { site } from "../../lib/site";

export const metadata = pageMetadata({
  title: "Compliance: FCC, Batteries, Export Control",
  description:
    "What a hardware design needs before it ships: FCC Part 15 for digital devices, certification for radios, lithium battery shipping rules, and a block on export-controlled uploads.",
  path: "/compliance",
});

const items = [
  {
    title: "FCC status per design",
    body: "Every digital device needs Part 15 compliance. A device with a radio needs certification. A pre-certified module reduces the work but does not remove every duty of the host device. Before publish, 01 shows the designer what the design needs.",
  },
  {
    title: "Lithium batteries",
    body: "Designs with lithium cells are flagged for shipping rules, so the cost and the limits are known before the run starts.",
  },
  {
    title: "Export control",
    body: "Uploads marked as ITAR-controlled are blocked. Defense work does not run on this platform.",
  },
  {
    title: "Banned categories",
    body: "Some categories do not belong on the platform, such as weapons and weapon parts, and designs that make medical claims. The list is published as it is set.",
  },
];

export default function CompliancePage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Compliance", path: "/compliance" }]}
        baseUrl={site.url}
        eyebrow="Compliance"
        title="Know What a Design Needs Before It Ships"
        lead="Compliance flags are part of the product, not a note at the bottom. Each one shows up before publish."
        short
      />
      <section className="section">
        <div className="container">
          <div className="pillars">
            {items.map((it, i) => (
              <Reveal key={it.title} className="pillar" delay={i * 90}>
                <span className="pillar-num">0{i + 1}</span>
                <h2 className="h3">{it.title}</h2>
                <p>{it.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section-tight bordered-top">
        <div className="container">
          <div className="notice">
            <strong>Not legal advice</strong>
            This page describes how the product works. Terms and agreements are placeholders until a
            lawyer reviews them.
          </div>
        </div>
      </section>
      <CtaBand
        title="Questions about a design?"
        body="Tell us what you are building and we will say what it needs."
        primary={{ href: "/start", label: "Start a design" }}
        secondary={{ href: "/contact", label: "Contact" }}
      />
    </>
  );
}
