"use client";

import { useEffect, useRef, useState } from "react";

const MIN = 25;
const MAX = 1000;
const STEP = 5;

const tiers = [
  { from: 25, price: 140, process: "3D printing" },
  { from: 100, price: 96, process: "3D printing" },
  { from: 250, price: 74, process: "Injection molding" },
  { from: 500, price: 58, process: "Injection molding" },
  { from: 1000, price: 46, process: "Injection molding" },
];

/**
 * An illustrative price-drop calculator. Numbers are examples, never quotes.
 * The waitlist count follows the scroll position while the card crosses the screen,
 * so the bar fills and the price falls as you scroll past. With reduced motion the
 * slider is manual instead.
 */
export function PriceCalc() {
  const [count, setCount] = useState(MIN);
  const [manual, setManual] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setManual(true);
      setCount(250);
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = root.current;
      if (!el) return;
      const vh = window.innerHeight;
      // 0 when the card's top is at 90% of the screen, 1 when it reaches 20%.
      const p = (vh * 0.9 - el.getBoundingClientRect().top) / (vh * 0.7);
      const clamped = Math.min(1, Math.max(0, p));
      setCount(Math.round((MIN + clamped * (MAX - MIN)) / STEP) * STEP);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const tier = [...tiers].reverse().find((t) => count >= t.from) ?? tiers[0];
  const next = tiers.find((t) => t.from > count);
  if (!tier) return null;

  return (
    <div className="calc" ref={root}>
      <div className="calc-controls">
        <label htmlFor="calc-count">
          Buyers on the waitlist <strong>{count}</strong>
        </label>
        <input
          id="calc-count"
          type="range"
          min={MIN}
          max={MAX}
          step={STEP}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          tabIndex={manual ? 0 : -1}
          style={manual ? undefined : { pointerEvents: "none" }}
        />
        <div className="calc-ticks" aria-hidden="true">
          <span>25</span>
          <span>1,000</span>
        </div>
      </div>
      <dl className="calc-out">
        <div>
          <dt>Unit price</dt>
          <dd className="calc-big">${tier.price}</dd>
        </div>
        <div>
          <dt>Case process</dt>
          <dd>{tier.process}</dd>
        </div>
        <div>
          <dt>Next price break</dt>
          <dd>
            {next ? `${next.from - count} more buyers, to $${next.price}` : "Top tier reached"}
          </dd>
        </div>
        <div>
          <dt>Charged</dt>
          <dd>Only at trigger</dd>
        </div>
      </dl>
      <p className="run-note">
        Example numbers for a small desk device. Real prices come from shop quotes.
      </p>
    </div>
  );
}
