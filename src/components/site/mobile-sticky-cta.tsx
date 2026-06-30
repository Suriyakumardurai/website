"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { usePathname } from "next/navigation";

/**
 * Mobile-only sticky CTA bar that floats just above the bottom tab bar.
 *
 * - Hidden on /contact (the CTA's destination) to avoid redundancy.
 * - Appears after the user scrolls past the hero (≈ 60% of viewport height).
 * - Slides away when the user reaches the page footer to avoid clutter.
 * - Haptic-style press animation, glass surface, lime accent.
 */
export default function MobileStickyCTA() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pathname === "/contact") {
      // Hide on contact page — the CTA's destination is already in view.
      // Use a flag rather than setState directly in the effect body.
      const timeout = setTimeout(() => setVisible(false), 0);
      return () => clearTimeout(timeout);
    }
    const onScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const doc = document.documentElement.scrollHeight;
      // Show after scrolling 60% of viewport
      const pastHero = y > vh * 0.6;
      // Hide when within 1.5x viewport of the bottom (footer area)
      const nearFooter = y + vh > doc - vh * 1.5;
      setVisible(pastHero && !nearFooter);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="lg:hidden fixed left-3 right-3 z-40"
          style={{ bottom: "calc(var(--m-nav-h) + env(safe-area-inset-bottom) + 12px)" }}
        >
          <Link
            href="/contact"
            className="m-press flex items-center gap-3 rounded-2xl m-glass px-3 py-2.5 shadow-[0_8px_32px_-8px_rgba(13,13,21,0.24)]"
          >
            <span className="flex h-9 w-9 rounded-xl bg-foreground text-background items-center justify-center shrink-0">
              <Calendar className="h-4 w-4 text-lime-400" />
            </span>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                48-hour proposal
              </p>
              <p className="text-sm font-semibold leading-tight">Book a discovery call</p>
            </div>
            <span className="flex h-9 items-center rounded-full bg-lime-400 text-foreground px-3 text-xs font-semibold m-press">
              Start
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
