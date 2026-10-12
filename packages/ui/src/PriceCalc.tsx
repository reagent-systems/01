"use client";

import { useState } from "react";

const tiers = [
  { from: 25, price: 140, process: "3D printing" },
  { from: 100, price: 96, process: "3D printing" },
  { from: 250, price: 74, process: "Injection molding" },
  { from: 500, price: 58, process: "Injection molding" },
  { from: 1000, price: 46, process: "Injection molding" },
];

/** An illustrative price-drop calculator. Numbers are examples, never quotes. */
export function PriceCalc() {
  const [count, setCount] = useState(250);
  const tier = [...tiers].reverse().find((t) => count >= t.from) ?? tiers[0];
  const next = tiers.find((t) => t.from > count);
  if (!tier) return null;

  return (
    <div className="calc">
      <div className="calc-controls">
        <label htmlFor="calc-count">
          Buyers on the waitlist <strong>{count}</strong>
        </label>
        <input
          id="calc-count"
          type="range"
          min={25}
          max={1000}
          step={5}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
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
