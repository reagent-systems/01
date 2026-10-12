import { Logo } from "./Logo";
import { SmartLink } from "./SmartLink";

type FooterLink = { href: string; label: string };

export type FooterProps = {
  legalName: string;
  /** Optional detail rows, such as Email or Phone. Hidden when empty. */
  details?: { label: string; value: string; href?: string }[];
  cta?: FooterLink;
  columns: { title: string; links: FooterLink[] }[];
  /** A dotted list under the columns. Items without an href render as plain text. */
  list?: { title: string; href?: string; items: { label: string; href?: string }[] };
  legal: string;
  legalLinks: FooterLink[];
};

export function Footer({ legalName, details, cta, columns, list, legal, legalLinks }: FooterProps) {
  return (
    <footer className="footer">
      <div className="container">
        <div
          className="footer-top"
          style={{
            gridTemplateColumns: `minmax(260px, 1.2fr) repeat(${columns.length}, minmax(0, 1fr))`,
          }}
        >
          <div className="footer-brand">
            <Logo />
            <address>{legalName}</address>
            {details && details.length > 0 && (
              <dl>
                {details.map((d) => (
                  <div key={d.label} style={{ display: "contents" }}>
                    <dt>{d.label}</dt>
                    <dd>{d.href ? <SmartLink href={d.href}>{d.value}</SmartLink> : d.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {cta && (
              <SmartLink href={cta.href} className="btn">
                {cta.label}
              </SmartLink>
            )}
          </div>

          {columns.map((c) => (
            <div key={c.title}>
              <h2>{c.title}</h2>
              <ul>
                {c.links.map((l) => (
                  <li key={l.href + l.label}>
                    <SmartLink href={l.href}>{l.label}</SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {list && (
          <div className="footer-areas">
            <h2>{list.href ? <SmartLink href={list.href}>{list.title}</SmartLink> : list.title}</h2>
            <ul>
              {list.items.map((i) => (
                <li key={i.label}>
                  {i.href ? <SmartLink href={i.href}>{i.label}</SmartLink> : i.label}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="footer-bottom">
          <p style={{ margin: 0 }}>{legal}</p>
          <nav aria-label="Legal">
            {legalLinks.map((l) => (
              <SmartLink key={l.href} href={l.href}>
                {l.label}
              </SmartLink>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
