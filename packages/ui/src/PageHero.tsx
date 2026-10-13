import type { ReactNode } from "react";
import { BgVideo } from "./BgVideo";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

type Props = {
  eyebrow?: string | undefined;
  title: ReactNode;
  lead?: ReactNode | undefined;
  crumbs?: Crumb[] | undefined;
  baseUrl?: string | undefined;
  video?: string | undefined;
  short?: boolean | undefined;
  children?: ReactNode | undefined;
};

/** Hero for inner pages: full-bleed video when given, otherwise a technical grid backdrop. */
export function PageHero({ eyebrow, title, lead, crumbs, baseUrl, video, short, children }: Props) {
  return (
    <section className={`page-hero${short ? " short" : ""}${video ? "" : " page-hero-plain"}`}>
      {video ? (
        <>
          <div className="media-bg">
            <BgVideo name={video} priority />
          </div>
          <div className="media-shade" />
        </>
      ) : (
        <div className="grid-lines" aria-hidden="true" />
      )}
      <div className="container page-hero-inner">
        {crumbs && baseUrl && <Breadcrumbs items={crumbs} baseUrl={baseUrl} />}
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="display">{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
