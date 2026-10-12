import { PageHero } from "@01/ui";
import { InquiryForm } from "../../components/InquiryForm";
import { pageMetadata } from "../../lib/seo";
import { site } from "../../lib/site";

export const metadata = pageMetadata({
  title: "Start a Design",
  description:
    "Tell us about your hardware design, or your shop. We read STEP, STL, DXF, Gerber, KiCad, and BOM files and will say how a run would work.",
  path: "/start",
});

const bring = [
  "A STEP or STL model",
  "Gerber or KiCad files for boards",
  "A bill of materials (CSV)",
  "Drawings for tight tolerances",
  "A target count",
];

export default function StartPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Start a design", path: "/start" }]}
        baseUrl={site.url}
        eyebrow="Start a design"
        title="Tell Us What You’re Building"
        lead="Share the design, or tell us about your shop. A person reads every message."
        short
      />
      <section className="section">
        <div
          className="container two-col"
          style={{ gridTemplateColumns: "minmax(0,1fr) minmax(0,2fr)" }}
        >
          <aside>
            <p className="eyebrow">What to include</p>
            <ul className="checklist">
              {bring.map((t) => (
                <li key={t}>
                  <span className="ck" aria-hidden="true">
                    ✓
                  </span>
                  <div>
                    <strong>{t}</strong>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
          <InquiryForm kind="start" />
        </div>
      </section>
    </>
  );
}
