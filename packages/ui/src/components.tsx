import type { ReactNode } from "react";

export const cx = (...parts: (string | false | undefined)[]) => parts.filter(Boolean).join(" ");

export function Logo() {
  return (
    <a className="logo" href="/" aria-label="01">
      0<i>1</i>
    </a>
  );
}

export function Button({
  href,
  children,
  variant = "outline",
  size = "small",
}: {
  href: string;
  children: ReactNode;
  variant?: "outline" | "solid";
  size?: "small" | "large";
}) {
  return (
    <a
      className={cx("btn", size === "large" && "btn--large", variant === "solid" && "btn--solid")}
      href={href}
    >
      {children}
    </a>
  );
}

export function Header({
  links,
  action,
}: {
  links: { href: string; label: string }[];
  action?: { href: string; label: string };
}) {
  return (
    <header className="header">
      <div className="header__left">
        <Logo />
        <nav className="nav" aria-label="Main">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
      {action && <Button href={action.href}>{action.label}</Button>}
    </header>
  );
}

export function Hero({ panels }: { panels: { href: string; label: string }[] }) {
  const tone = ["a", "b", "c"];
  return (
    <section className="hero">
      <h1 className="sr-only">01</h1>
      <div className="hero__panels">
        {panels.map((p, i) => (
          <a
            key={p.href}
            className={cx("hero__panel", `hero__panel--${tone[i % 3]}`)}
            href={p.href}
          >
            <span className="hero__label">{p.label}</span>
          </a>
        ))}
      </div>
      <span className="hero__rule hero__rule--1" aria-hidden />
      <span className="hero__rule hero__rule--2" aria-hidden />
    </section>
  );
}

export function Section({
  id,
  children,
  compact,
  first,
  className,
}: {
  id?: string;
  children: ReactNode;
  compact?: boolean;
  first?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cx("section", compact && "section--compact", first && "section--first", className)}
    >
      <div className="wrap">{children}</div>
    </section>
  );
}

export const Eyebrow = ({ children }: { children: ReactNode }) => (
  <span className="eyebrow">{children}</span>
);

export const Heading = ({ children }: { children: ReactNode }) => (
  <h2 className="heading">{children}</h2>
);

export function CardGrid({
  cards,
}: {
  cards: { id?: string; type: string; title: string; body: string; href?: string }[];
}) {
  return (
    <div className="grid reveal">
      {cards.map((c, i) => (
        <article className="card" id={c.id} key={c.title}>
          <p className="card__num">
            {String(i + 1).padStart(2, "0")} · {c.type}
          </p>
          <h3 className="card__title">{c.title}</h3>
          <p className="card__body">{c.body}</p>
          {c.href && (
            <a className="card__more" href={c.href}>
              Learn more <span aria-hidden>→</span>
            </a>
          )}
        </article>
      ))}
    </div>
  );
}

const Check = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
    <path d="M3 9.5l4 4 8-9" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
  </svg>
);

export function Checklist({ items }: { items: { lead: string; text: string }[] }) {
  return (
    <ul className="checks">
      {items.map((i) => (
        <li key={i.lead}>
          <Check />
          <p>
            <b>{i.lead}</b> <span>{i.text}</span>
          </p>
        </li>
      ))}
    </ul>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((i) => (
        <details key={i.q}>
          <summary>{i.q}</summary>
          <p>{i.a}</p>
        </details>
      ))}
    </div>
  );
}

export function CtaBand({
  title,
  body,
  primary,
  secondary,
}: {
  title: ReactNode;
  body: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
}) {
  return (
    <section className="section section--compact cta">
      <div className="wrap cta__inner">
        <div>
          <h2 className="heading">{title}</h2>
          <p className="lede">{body}</p>
        </div>
        <div className="cta__buttons">
          <Button href={primary.href} variant="solid" size="large">
            {primary.label}
          </Button>
          <Button href={secondary.href} size="large">
            {secondary.label}
          </Button>
        </div>
      </div>
    </section>
  );
}

export function Footer({
  blurb,
  columns,
  legal,
}: {
  blurb: string;
  columns: { title: string; links: { href: string; label: string }[] }[];
  legal: string;
}) {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo />
            <p>{blurb}</p>
          </div>
          {columns.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h3>{c.title}</h3>
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
        <div className="footer__bottom">
          <span>{legal}</span>
        </div>
      </div>
    </footer>
  );
}
