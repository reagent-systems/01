"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** Base name of a file in `base` (without extension). */
  name: string;
  base?: string;
  /** Load and play immediately. Use for above-the-fold video only. */
  priority?: boolean;
  label?: string;
};

/**
 * Background video that only downloads and plays while on screen,
 * and falls back to its poster for users who prefer reduced motion.
 */
export function BgVideo({ name, base = "/video", priority = false, label }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || reduced) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          if (v.preload === "none") v.preload = "auto";
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduced]);

  const poster = `${base}/${name}.jpg`;
  if (reduced) {
    return <img src={poster} alt={label ?? ""} />;
  }

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      autoPlay={priority}
      preload={priority ? "auto" : "none"}
      poster={poster}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <source src={`${base}/${name}.mp4`} type="video/mp4" />
    </video>
  );
}
