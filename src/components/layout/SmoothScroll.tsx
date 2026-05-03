'use client';

import { useEffect, useRef } from 'react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null;
    let raf: number;

    async function init() {
      try {
        const Lenis = (await import('lenis')).default;
        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          touchMultiplier: 2,
          infinite: false,
        });

        function animate(time: number) {
          lenis?.raf(time);
          raf = requestAnimationFrame(animate);
        }

        raf = requestAnimationFrame(animate);
      } catch (e) {
        console.warn('Lenis init failed, falling back to native scroll:', e);
      }
    }

    init();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
