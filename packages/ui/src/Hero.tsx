import { BgVideo } from "./BgVideo";

export type HeroPanel = {
  label: string;
  href: string;
  video: string;
  alt: string;
  blurb: string;
};

/** Three video panels split by diagonal white lines. Each panel is a link. */
export function Hero({ panels, label }: { panels: HeroPanel[]; label: string }) {
  return (
    <section className="hero-split" aria-label={label}>
      {panels.map((p, i) => (
        <a key={p.label} href={p.href} className={`hero-panel hero-panel-${i + 1}`}>
          <span className="hero-panel-media">
            <BgVideo name={p.video} priority label={p.alt} />
          </span>
          <span className="hero-panel-tint" aria-hidden="true" />
          <span className="hero-panel-label">
            <span className="hero-link">{p.label}</span>
            <span className="hero-panel-rule" aria-hidden="true" />
            <span className="hero-panel-blurb">{p.blurb}</span>
          </span>
        </a>
      ))}
    </section>
  );
}
