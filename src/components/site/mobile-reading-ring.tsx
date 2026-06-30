"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import { usePathname } from "next/navigation";
import { Check } from "lucide-react";

/**
 * Mobile-only circular reading progress ring.
 *
 * A small circular progress indicator that floats just below the top brand strip
 * on long content pages (FAQ, Process). Shows % read and a check when complete.
 *
 * Desktop (lg+) renders nothing.
 */

const LONG_PAGES = ["/faq", "/process", "/about", "/services", "/pricing", "/careers"];

export default function MobileReadingRing() {
  const pathname = usePathname();
  const isLong = LONG_PAGES.includes(pathname);
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 25, mass: 0.4 });
  const [pct, setPct] = useState(0);
  const [visible, setVisible] = useState(false);

  // Always called (hooks order must be stable)
  const circumference = 2 * Math.PI * 14; // r=14
  const dashOffset = useTransform(smooth, (v) => circumference * (1 - v));

  useEffect(() => {
    if (!isLong) return;
    const unsub = smooth.on("change", (v) => {
      setPct(Math.round(v * 100));
    });
    return () => unsub();
  }, [isLong, smooth]);

  useEffect(() => {
    if (!isLong) {
      setVisible(false);
      return;
    }
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isLong]);

  if (!isLong) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="lg:hidden fixed z-40"
          style={{ top: "calc(env(safe-area-inset-top) + 56px)", right: 12 }}
        >
          <div className="relative h-9 w-9 rounded-full m-glass flex items-center justify-center shadow-[0_4px_12px_-4px_rgba(13,13,21,0.2)]">
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 36 36">
              {/* track */}
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="oklch(0.9 0 0)"
                strokeWidth="2.5"
              />
              {/* progress */}
              <motion.circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="oklch(0.7 0.19 128)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={circumference}
                style={{ strokeDashoffset: dashOffset }}
              />
            </svg>
            <div className="relative text-[9px] font-mono font-semibold tabular-nums text-foreground">
              {pct >= 100 ? (
                <Check className="h-3.5 w-3.5 lime-text" strokeWidth={3} />
              ) : (
                `${pct}%`
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
