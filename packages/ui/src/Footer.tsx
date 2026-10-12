import { Logo } from "./Logo";

type FooterLink = { href: string; label: string };

export function Footer({
  blurb,
  columns,
  legal,
}: {
  blurb: string;
  columns: { title: string; links: FooterLink[] }[];
  legal: string;
}) {
  return (
    <footer className="footer">
      <div
        className="footer-top"
        style={{
          gridTemplateColumns: `minmax(260px, 1.2fr) repeat(${columns.length}, minmax(0, 1fr))`,
        }}
      >
        <div className="footer-brand">
          <Logo />
          <address>{blurb}</address>
        </div>
        {columns.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h2>{c.title}</h2>
            <ul>
              {c.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="footer-bottom">
        <span>{legal}</span>
      </div>
    </footer>
  );
}
