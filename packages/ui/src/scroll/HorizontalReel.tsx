"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { registerGsap } from "./register";

/**
 * A row of cards that scrolls sideways while the page is pinned (desktop, motion allowed).
 * On phones and with reduced motion it is a native scroll-snap row.
 */
export function HorizontalReel({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const tr = track.current;
    if (!el || !tr) return;
    const { gsap } = registerGsap();
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const dist = () => Math.max(0, tr.scrollWidth - window.innerWidth + 80);
      const tween = gsap.to(tr, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${dist()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(tr, { clearProps: "transform" });
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={root} className="reel">
      <div ref={track} className="reel-track">
        {children}
      </div>
    </div>
  );
}
