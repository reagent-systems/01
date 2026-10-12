import type { ReactNode } from "react";

type Action = { href: string; label: string };

export function CtaBand({
  title,
  body,
  primary,
  secondary,
}: {
  title: ReactNode;
  body: string;
  primary: Action;
  secondary: Action;
}) {
  return (
    <section className="cta-band">
      <div className="container">
        <div style={{ maxWidth: "44rem" }}>
          <h2 className="h2">{title}</h2>
          <p className="lead" style={{ margin: 0 }}>
            {body}
          </p>
        </div>
        <div className="btn-row">
          <a href={primary.href} className="btn btn-solid">
            {primary.label}
          </a>
          <a href={secondary.href} className="btn">
            {secondary.label}
          </a>
        </div>
      </div>
    </section>
  );
}
