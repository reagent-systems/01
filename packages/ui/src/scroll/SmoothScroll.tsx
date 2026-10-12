"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { prefersReducedMotion, registerGsap } from "./register";

/** Inertial smooth scrolling, wired into GSAP's ticker so ScrollTrigger stays in sync. */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const { gsap, ScrollTrigger } = registerGsap();
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, anchors: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
  return null;
}
