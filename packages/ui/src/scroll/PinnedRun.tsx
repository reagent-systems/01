"use client";

import { useEffect, useRef } from "react";
import { registerGsap } from "./register";

const captions = [
  {
    t: "A designer publishes",
    b: "STEP, Gerber, and BOM files go in. The platform reads every part and builds a parts tree.",
  },
  {
    t: "Buyers join the waitlist",
    b: "Each buyer saves a card. Nothing is charged. The count climbs.",
  },
  {
    t: "The price breaks",
    b: "At each tier the unit price falls. At a high tier the case moves from printing to molding.",
  },
  {
    t: "One button",
    b: "The order goes to every shop at once. Buyers are charged. Purchase orders go out.",
  },
  {
    t: "Parts move and get scanned",
    b: "Every part carries a serial code, scanned at every step. A bad part routes back to its maker.",
  },
  {
    t: "Units ship",
    b: "The last shop packs and ships to every buyer, with one tracking view for each.",
  },
];

const stages = [
  ["PCB fabrication", "Case"],
  ["PCB assembly"],
  ["Final assembly and test"],
  ["Pack and ship"],
];

const tiers = [
  { from: 0, price: 120 },
  { from: 100, price: 96 },
  { from: 250, price: 78 },
  { from: 400, price: 64 },
];

const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));

/**
 * The run, told by scrolling. The section pins; scroll progress drives the buyer count, the price
 * tier, the active caption, and the chain lighting up node by node. Numbers are an example.
 */
export function PinnedRun() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const { gsap, ScrollTrigger } = registerGsap();
    const mm = gsap.matchMedia();

    const q = <T extends Element>(s: string) => [...el.querySelectorAll<T>(s)];
    const buyers = el.querySelector<HTMLElement>("[data-buyers]");
    const price = el.querySelector<HTMLElement>("[data-price]");
    const caseLabel = el.querySelector<HTMLElement>("[data-case]");
    const fill = el.querySelector<HTMLElement>("[data-fill]");
    const bar = el.querySelector<HTMLElement>("[data-bar]");

    const paint = (p: number) => {
      const idx = Math.min(captions.length - 1, Math.floor(p * captions.length));
      q<HTMLElement>("[data-caption]").forEach((c, i) =>
        c.classList.toggle("is-active", i === idx),
      );
      q<HTMLElement>("[data-dot]").forEach((c, i) => c.classList.toggle("is-on", i <= idx));
      const n = Math.round(500 * clamp((p - 0.12) / 0.4));
      if (buyers) buyers.textContent = String(n);
      const tier = [...tiers].reverse().find((t) => n >= t.from) ?? tiers[0];
      if (price && tier) price.textContent = `$${tier.price}`;
      if (caseLabel)
        caseLabel.textContent = n >= 250 ? "Case · injection molding" : "Case · 3D printing";
      if (bar) bar.style.transform = `scaleX(${clamp(n / 500)})`;
      const run = clamp((p - 0.5) / 0.4);
      if (fill) fill.style.transform = `scaleX(${run})`;
      q<HTMLElement>("[data-stage]").forEach((s, i) =>
        s.classList.toggle("is-lit", p >= 0.5 + i * 0.11),
      );
      el.classList.toggle("is-started", p >= 0.5);
    };

    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      el.classList.add("is-pinned");
      paint(0);
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "+=420%",
        pin: true,
        scrub: true,
        onUpdate: (self) => paint(self.progress),
      });
      return () => {
        trigger.kill();
        el.classList.remove("is-pinned");
        paint(1);
      };
    });
    mm.add("(max-width: 899px), (prefers-reduced-motion: reduce)", () => {
      paint(1);
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={root} className="run">
      <div className="run-inner">
        <div className="run-left">
          <p className="eyebrow">One run, start to finish</p>
          <ol className="run-captions">
            {captions.map((c, i) => (
              <li key={c.t} data-caption className={i === 0 ? "is-active" : ""}>
                <span className="run-n">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h3">{c.t}</h3>
                <p>{c.b}</p>
              </li>
            ))}
          </ol>
          <div className="run-dots" aria-hidden="true">
            {captions.map((c, i) => (
              <span key={c.t} data-dot className={i === 0 ? "is-on" : ""} />
            ))}
          </div>
        </div>

        <div className="run-right" aria-label="Example run, with illustrative numbers">
          <div className="run-stats">
            <div>
              <span data-buyers>0</span>
              <small>buyers on the waitlist</small>
              <i className="run-bar">
                <b data-bar />
              </i>
            </div>
            <div>
              <span data-price>$120</span>
              <small>unit price</small>
            </div>
          </div>

          <div className="run-chain">
            {stages.map((nodes, s) => (
              <div key={nodes.join("|")} data-stage className="run-stage">
                {nodes.map((n) => (
                  <div
                    className="chain-node"
                    key={n}
                    {...(n === "Case" ? { "data-case": "" } : {})}
                  >
                    {n === "Case" ? "Case · 3D printing" : n}
                  </div>
                ))}
                <small>{String(s + 1).padStart(2, "0")}</small>
              </div>
            ))}
          </div>
          <i className="run-track">
            <b data-fill />
          </i>
          <p className="run-note">
            Example run. The numbers are illustrative; real prices come from shop quotes.
          </p>
        </div>
      </div>
    </div>
  );
}
