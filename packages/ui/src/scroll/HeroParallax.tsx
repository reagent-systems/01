"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { prefersReducedMotion, registerGsap } from "./register";

/** Wraps the hero: as the page scrolls, the media drifts and dims while the copy lifts away. */
export function HeroParallax({ media, children }: { media?: ReactNode; children: ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      const st = { trigger: el, start: "top top", end: "bottom top", scrub: true };
      if (el.querySelector(".hero-media")) {
        gsap.to(".hero-media", { yPercent: 18, scale: 1.12, ease: "none", scrollTrigger: st });
        gsap.to(".hero-shade", { opacity: 0.85, ease: "none", scrollTrigger: st });
      }
      gsap.to(".hero-copy", {
        yPercent: -14,
        opacity: 0,
        ease: "none",
        scrollTrigger: { ...st, end: "70% top" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="hero-hook">
      {media && (
        <>
          <div className="hero-media" aria-hidden="true">
            {media}
          </div>
          <div className="hero-shade" aria-hidden="true" />
        </>
      )}
      <div className="hero-copy">{children}</div>
    </section>
  );
}
