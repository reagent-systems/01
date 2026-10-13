"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion, registerGsap } from "./register";

/**
 * A fixed full-screen background that plays an image sequence frame by frame as the page
 * scrolls. The frame comes straight from the scroll position, so it never lags or catches up:
 * there is no video to seek. Frames load coarse first (every 16th, then 8th, and so on), so
 * scrubbing works at once and sharpens as more frames arrive. Neighbouring frames are
 * cross-faded, which keeps a low frame count smooth.
 */
export function ScrollSequence({
  base,
  count,
  poster,
  ext = "webp",
  lowPower = false,
}: {
  /** Folder of numbered frames, for example `/frames/story` (0001.webp ... NNNN.webp). */
  base: string;
  count: number;
  poster: string;
  ext?: string;
  /** Skip every second frame to save data. */
  lowPower?: boolean;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvas.current;
    if (!cv || prefersReducedMotion()) return;
    const ctx = cv.getContext("2d", { alpha: false });
    if (!ctx) return;
    const { gsap } = registerGsap();

    const frames: (HTMLImageElement | undefined)[] = new Array(count);
    const url = (i: number) => `${base}/${String(i + 1).padStart(4, "0")}.${ext}`;
    const small = lowPower || window.matchMedia("(max-width: 760px)").matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      cv.width = Math.round(window.innerWidth * dpr);
      cv.height = Math.round(window.innerHeight * dpr);
      lastKey = "";
    };

    const drawCover = (img: HTMLImageElement, alpha: number) => {
      const s = Math.max(cv.width / img.naturalWidth, cv.height / img.naturalHeight);
      const w = img.naturalWidth * s;
      const h = img.naturalHeight * s;
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, (cv.width - w) / 2, (cv.height - h) / 2, w, h);
    };

    /** The nearest loaded frame at or below (dir -1) or above (dir 1) index i. */
    const near = (i: number, dir: 1 | -1) => {
      for (let k = i; k >= 0 && k < count; k += dir) if (frames[k]) return k;
      return -1;
    };

    let lastKey = "";
    const render = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const pos = p * (count - 1);
      const lo = near(Math.floor(pos), -1);
      const hi = near(Math.ceil(pos), 1);
      if (lo < 0 && hi < 0) return;
      const a = lo < 0 ? hi : lo;
      const b = hi < 0 ? lo : hi;
      const mix = a === b ? 0 : Math.min(1, Math.max(0, (pos - a) / (b - a)));
      const key = `${a}:${b}:${mix.toFixed(2)}:${cv.width}`;
      if (key === lastKey) return;
      lastKey = key;
      const ia = frames[a];
      const ib = frames[b];
      if (!ia || !ib) return;
      drawCover(ia, 1);
      if (mix > 0.01 && a !== b) drawCover(ib, mix);
      ctx.globalAlpha = 1;
      cv.dataset.frame = String(Math.round(pos));
    };

    const load = (i: number) =>
      new Promise<void>((resolve) => {
        if (frames[i]) return resolve();
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          frames[i] = img;
          lastKey = "";
          resolve();
        };
        img.onerror = () => resolve();
        img.src = url(i);
      });

    // Coarse to fine, so any scroll position has a nearby frame almost immediately.
    const order: number[] = [];
    const seen = new Set<number>();
    for (const stride of [16, 8, 4, 2, 1]) {
      if (small && stride === 1) break;
      for (let i = 0; i < count; i += stride) {
        if (!seen.has(i)) {
          seen.add(i);
          order.push(i);
        }
      }
      if (!seen.has(count - 1)) {
        seen.add(count - 1);
        order.push(count - 1);
      }
    }
    let cancelled = false;
    let cursor = 0;
    const worker = async () => {
      while (!cancelled && cursor < order.length) {
        const i = order[cursor++];
        if (i !== undefined) await load(i);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    gsap.ticker.add(render);
    for (let w = 0; w < 6; w++) void worker();

    return () => {
      cancelled = true;
      window.removeEventListener("resize", resize);
      gsap.ticker.remove(render);
    };
  }, [base, count, ext, lowPower]);

  return (
    <div className="scroll-video" aria-hidden="true" style={{ backgroundImage: `url(${poster})` }}>
      <canvas ref={canvas} />
      <div className="scroll-video-shade" />
    </div>
  );
}
