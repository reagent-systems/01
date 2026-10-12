import { PageHero } from "@01/ui";
import type { ReactNode } from "react";
import { site } from "../lib/site";

/** Placeholder legal page. Every one carries the same notice until a lawyer signs off. */
export function LegalPage({
  title,
  path,
  sections,
  children,
}: {
  title: string;
  path: string;
  sections: string[];
  children?: ReactNode;
}) {
  return (
    <>
      <PageHero
        crumbs={[{ name: title, path }]}
        baseUrl={site.url}
        eyebrow="Legal"
        title={title}
        short
      />
      <section className="section">
        <div className="container">
          <div className="notice">
            <strong>Needs legal review</strong>
            This page is a placeholder. It is not final and it is not legal advice. Do not rely on
            it.
          </div>
          <div className="prose">
            {children}
            <h2>What this document will cover</h2>
            <ul>
              {sections.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
