'use client';

import React, { useEffect, useRef } from 'react';

/**
 * SCROLL DEPTH PROGRESSIVE DISCLOSURE
 * 
 * Instead of showing everything at once, reveal content as the user scrolls.
 * This increases time-on-page (dwell time signal) and reduces bounce rate.
 */
export function ProgressiveReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = ref.current?.querySelectorAll('.reveal-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return <div ref={ref}>{children}</div>;
}
