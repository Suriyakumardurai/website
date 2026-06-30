"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Users, Eye, X } from "lucide-react";

/**
 * Mobile-only Social Proof widget.
 *
 * Shows a small floating "N people reading this page" indicator.
 * Uses a simulated counter (base + random fluctuation) that feels live.
 * Appears after 4 seconds on content pages, auto-hides after 30 seconds.
 *
 * Desktop (lg+) renders nothing.
 */

const CONTENT_PAGES = ["/services", "/pricing", "/about", "/process", "/faq", "/careers"];

// Simulated base reader counts per page (feels realistic for a B2B site)
const BASE_READERS: Record<string, number> = {
  "/services": 14,
  "/pricing": 23,
  "/about": 8,
  "/process": 11,
  "/faq": 17,
  "/careers": 6,
};

export default function MobileSocialProof() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!CONTENT_PAGES.includes(pathname) || dismissed) {
      setVisible(false);
      return;
    }

    const base = BASE_READERS[pathname] ?? 10;

    // Show after 4 seconds
    const showTimer = setTimeout(() => {
      setVisible(true);
      setCount(base + Math.floor(Math.random() * 5));
    }, 4000);

    // Fluctuate count every 5-8 seconds
    const fluctuate = () => {
      setCount((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
        return Math.max(base - 3, prev + delta);
      });
    };
    const interval = setInterval(fluctuate, 5000 + Math.random() * 3000);

    // Auto-hide after 30 seconds
    const hideTimer = setTimeout(() => setVisible(false), 30000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearInterval(interval);
    };
  }, [pathname, dismissed]);

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="lg:hidden fixed left-3 z-[42]"
          style={{ bottom: "calc(var(--m-nav-h) + env(safe-area-inset-bottom) + 100px)" }}
        >
          <div className="flex items-center gap-2 rounded-full m-glass px-3 py-2 shadow-[0_4px_12px_-2px_rgba(13,13,21,0.2)]">
            {/* Pulsing dot */}
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-lime-500 animate-ping opacity-75" style={{ animationDuration: "2s" }} />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-500" />
            </span>

            {/* Reader count */}
            <div className="flex items-center gap-1.5">
              <Users className="h-3 w-3 text-muted-foreground" />
              <span className="text-[11px] font-medium text-foreground tabular-nums">
                <motion.span
                  key={count}
                  initial={{ opacity: 0.5, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="inline-block"
                >
                  {count}
                </motion.span>
                {" "}
                <span className="text-muted-foreground">reading</span>
              </span>
            </div>

            {/* Eye icon */}
            <Eye className="h-3 w-3 text-muted-foreground/50" />

            {/* Dismiss */}
            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss"
              className="m-tap -mr-1 h-5 w-5 rounded-full flex items-center justify-center text-muted-foreground/60 hover:text-foreground"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
