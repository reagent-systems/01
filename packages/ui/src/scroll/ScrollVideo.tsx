"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion, registerGsap } from "./register";

/**
 * A fixed full-screen background video whose playhead follows the page's scroll position.
 * Encode the clip with a keyframe every few frames so seeking is instant. With reduced motion
 * it shows the poster only. Small screens load the lighter file.
 */
export function ScrollVideo({
  src,
  srcSmall,
  poster,
}: {
  src: string;
  srcSmall?: string;
  poster: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v || prefersReducedMotion()) return;
    const { gsap } = registerGsap();

    if (srcSmall && window.matchMedia("(max-width: 760px)").matches) {
      v.src = srcSmall;
      v.load();
    }
    // Decode a first frame so mobile browsers allow seeking.
    v.play()
      .then(() => v.pause())
      .catch(() => {});

    let shown = 0;
    const tick = () => {
      if (!v.duration || Number.isNaN(v.duration)) return;
      // Measured live: pinned sections add height after load, so a cached range would drift.
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const target = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      shown += (target - shown) * 0.14;
      const t = shown * (v.duration - 0.05);
      if (Math.abs(v.currentTime - t) > 0.03) v.currentTime = t;
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
    };
  }, [srcSmall]);

  return (
    <div className="scroll-video" aria-hidden="true" style={{ backgroundImage: `url(${poster})` }}>
      <video ref={ref} muted playsInline preload="auto" poster={poster} tabIndex={-1}>
        <source src={src} />
      </video>
      <div className="scroll-video-shade" />
    </div>
  );
}
