import { CtaBand, PageHero, Reveal, SmartLink } from "@01/ui";
import { pageMetadata } from "../../lib/seo";
import { site } from "../../lib/site";
import { researchedStates } from "../../lib/state-data";
import { states } from "../../lib/states";

export const metadata = pageMetadata({
  title: "Hardware Prototyping and Manufacturing by State",
  description:
    "Where to prototype hardware in each US state: makerspaces and fab labs, recurring events, university and incubator programs, manufacturing specialties, and state support, each with a source.",
  path: "/states",
});

export default function StatesPage() {
  const live = researchedStates();
  const liveSlugs = new Set(live.map((s) => s.slug));
  const pending = states.filter((s) => !liveSlugs.has(s.slug));
  return (
    <>
      <PageHero
        crumbs={[{ name: "Hardware by state", path: "/states" }]}
        baseUrl={site.url}
        eyebrow="Insights"
        title="Hardware, State by State"
        lead="Where to prototype, which events to attend, and which programs back small manufacturers, researched for each state with a source on every line."
        short
      />
      <section className="section">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Researched ({live.length})</p>
          </Reveal>
          <ul className="states-grid">
            {live.map((s) => (
              <li key={s.slug}>
                <SmartLink href={`/states/${s.slug}`}>
                  {s.name} <abbr>{s.abbr}</abbr>
                </SmartLink>
              </li>
            ))}
          </ul>
          {pending.length > 0 && (
            <>
              <p className="eyebrow" style={{ marginTop: "4rem" }}>
                In research ({pending.length})
              </p>
              <p className="lead">
                A state page goes live when it has enough sourced entries. These states are still
                being researched.
              </p>
              <ul className="tag-list">
                {pending.map((s) => (
                  <li key={s.slug}>{s.name}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>
      <CtaBand
        title="Know a space we missed?"
        body="Tell us about a makerspace, event, or program in your state. We add it with a source."
        primary={{ href: "/contact", label: "Tell us" }}
        secondary={{ href: "/start", label: "Start a design" }}
      />
    </>
  );
}
