"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion, registerGsap } from "./register";

/** Text that lights up word by word as it scrolls through the viewport. */
export function WordReveal({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      const words = el.querySelectorAll(".word");
      gsap.fromTo(
        words,
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 38%", scrub: 0.5 },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <p ref={ref} className={`word-reveal ${className}`} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span className="word" aria-hidden="true" key={i}>
          {w}{" "}
        </span>
      ))}
    </p>
  );
}
