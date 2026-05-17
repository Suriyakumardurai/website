"use client";

import { useEffect, useRef } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only load Lenis on desktop - mobile has native smooth scroll
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    let lenis: any;
    let rafId: number;

    import("lenis").then((mod) => {
      lenis = new mod.default({
        duration: 1.0,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 0,
      });

      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
