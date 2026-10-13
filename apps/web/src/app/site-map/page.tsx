import { CtaBand, PageHero, SmartLink } from "@01/ui";
import { allPages } from "../../lib/pages";
import { pageMetadata } from "../../lib/seo";
import { site } from "../../lib/site";

export const metadata = pageMetadata({
  title: "Site Map",
  description:
    "Every page on 01 in one list: processes, audiences, guides, designs, platforms, and state guides.",
  path: "/site-map",
});

export default function SiteMapPage() {
  const pages = allPages();
  const groups = [...new Set(pages.map((p) => p.group))];
  return (
    <>
      <PageHero
        crumbs={[{ name: "Site map", path: "/site-map" }]}
        baseUrl={site.url}
        eyebrow="Site map"
        title="Every Page"
        lead="One list of everything on the site. A machine-readable version is at /sitemap.xml."
        short
      />
      <section className="section">
        <div className="container">
          {groups.map((g) => (
            <div key={g} style={{ marginBottom: "var(--sp-7)" }}>
              <p className="eyebrow">{g}</p>
              <ul className="fact-list">
                {pages
                  .filter((p) => p.group === g)
                  .map((p) => (
                    <li key={p.url}>
                      <b>
                        <SmartLink href={p.url}>{p.title}</SmartLink>
                      </b>
                      <span>{p.description}</span>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <CtaBand
        title="Can’t find it?"
        body="Search the site, or ask us."
        primary={{ href: "/search", label: "Search" }}
        secondary={{ href: "/contact", label: "Contact" }}
      />
    </>
  );
}
