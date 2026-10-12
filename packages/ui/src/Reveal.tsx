"use client";

import { type ElementType, type ReactNode, useEffect, useRef } from "react";

type Props = { children: ReactNode; as?: ElementType; delay?: number; className?: string };

export function Reveal({ children, as: Tag = "div", delay = 0, className = "" }: Props) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={{ ["--delay" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
