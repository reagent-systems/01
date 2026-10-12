import { CtaBand, JsonLd, PageHero, Reveal, SmartLink } from "@01/ui";
import { processes } from "../../lib/processes";
import { pageMetadata, serviceSchema } from "../../lib/seo";
import { site } from "../../lib/site";

export const metadata = pageMetadata({
  title: "Processes: CNC, Sheet Metal, Molding, Printing, Boards and Assembly",
  description:
    "The process catalog behind every 01 run: CNC machining, sheet metal, injection molding, 3D printing, PCB fabrication and assembly, casting, finishing, assembly, testing, and packing.",
  path: "/processes",
});

const kinds = ["Low setup", "Tooled", "Electronics", "Finishing and assembly"] as const;

export default function ProcessesPage() {
  return (
    <>
      <JsonLd
        data={processes.map((p) =>
          serviceSchema({ name: p.title, description: p.summary, path: `/processes/${p.slug}` }),
        )}
      />
      <PageHero
        crumbs={[{ name: "Processes", path: "/processes" }]}
        baseUrl={site.url}
        eyebrow="Processes"
        title="Standardize the Process, Not the Product"
        lead="Every shop declares the processes it runs, with limits. Every part of every design maps to one. That is how any custom design finds the right shops."
        video="mission"
      />

      {kinds.map((kind) => (
        <section className="section bordered-top" key={kind} aria-label={kind}>
          <div className="container">
            <Reveal>
              <p className="eyebrow">{kind}</p>
            </Reveal>
            <div className="card-grid">
              {processes
                .filter((p) => p.kind === kind)
                .map((p, i) => (
                  <SmartLink href={`/processes/${p.slug}`} className="card" key={p.slug}>
                    <span className="card-kicker">{String(i + 1).padStart(2, "0")}</span>
                    <h2 className="h3">{p.title}</h2>
                    <p>{p.summary}</p>
                    <span className="arrow-link">
                      Learn more <span aria-hidden="true">→</span>
                    </span>
                  </SmartLink>
                ))}
            </div>
          </div>
        </section>
      ))}

      <CtaBand
        title="Run a shop?"
        body="Declare your processes and limits, and get matched to parts."
        primary={{ href: "/for/manufacturers", label: "Join as a shop" }}
        secondary={{ href: "/start", label: "Start a design" }}
      />
    </>
  );
}
