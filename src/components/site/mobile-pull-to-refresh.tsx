"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { RefreshCw, Sparkles } from "lucide-react";

/**
 * Mobile-only pull-to-refresh feel.
 *
 * Detects touch-drag-down when the page is scrolled to the very top.
 * Shows a spinning lime indicator that follows the finger.
 * If released past the threshold, triggers a "refresh" animation that
 * briefly re-mounts the page content (giving a refreshed feel).
 *
 * Only active on the home page (where users are most likely to pull-refresh).
 * Desktop (lg+) renders nothing.
 */

const PULL_THRESHOLD = 70; // px to trigger refresh
const MAX_PULL = 120; // px max visual pull
const RESISTANCE = 0.5; // 0-1, how much the indicator follows the finger

export default function MobilePullToRefresh() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [pullDistance, setPullDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef(0);
  const pulling = useRef(false);

  useEffect(() => {
    if (!isHome) return;

    const onTouchStart = (e: TouchEvent) => {
      // Only start tracking if at the very top
      if (window.scrollY <= 0) {
        startY.current = e.touches[0].clientY;
        pulling.current = true;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!pulling.current || refreshing) return;
      const dy = e.touches[0].clientY - startY.current;
      if (dy > 0 && window.scrollY <= 0) {
        // Apply resistance so it feels "elastic"
        const resisted = Math.min(dy * RESISTANCE, MAX_PULL);
        setPullDistance(resisted);
        // Prevent default scroll when actively pulling
        if (dy > 8) {
          e.preventDefault();
        }
      } else if (dy <= 0) {
        setPullDistance(0);
      }
    };

    const onTouchEnd = () => {
      if (!pulling.current) return;
      pulling.current = false;
      if (pullDistance >= PULL_THRESHOLD && !refreshing) {
        triggerRefresh();
      } else {
        setPullDistance(0);
      }
    };

    const triggerRefresh = () => {
      setRefreshing(true);
      setPullDistance(PULL_THRESHOLD);
      // Simulate refresh — re-animate entrance of content after 900ms
      setTimeout(() => {
        setRefreshing(false);
        setPullDistance(0);
        // Force a re-trigger of the m-rise animations by dispatching a scroll event
        window.dispatchEvent(new Event("scroll"));
      }, 900);
    };

    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [isHome, pullDistance, refreshing]);

  if (!isHome) return null;

  const progress = Math.min(pullDistance / PULL_THRESHOLD, 1);
  const ready = pullDistance >= PULL_THRESHOLD;
  const rotation = refreshing ? 360 : progress * 270;

  return (
    <AnimatePresence>
      {(pullDistance > 0 || refreshing) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed left-1/2 -translate-x-1/2 z-[55] pointer-events-none"
          style={{ top: `calc(env(safe-area-inset-top) + ${Math.max(pullDistance - 28, 8)}px)` }}
        >
          <motion.div
            animate={{ rotate: rotation }}
            transition={{ duration: refreshing ? 0.8 : 0.2, ease: "easeOut", repeat: refreshing ? Infinity : 0 }}
            className={`relative flex items-center justify-center h-9 w-9 rounded-full ${
              ready ? "bg-lime-400 text-foreground" : "m-glass text-foreground"
            }`}
            style={{
              boxShadow: ready
                ? "0 0 24px 4px rgba(132,204,22,0.4)"
                : "0 4px 12px -2px rgba(13,13,21,0.15)",
            }}
          >
            {ready ? (
              <Sparkles className="h-4 w-4" />
            ) : (
              <RefreshCw className="h-4 w-4 lime-text" />
            )}
          </motion.div>
          {ready && !refreshing && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-[9px] font-mono uppercase tracking-wider text-foreground whitespace-nowrap"
            >
              Release to refresh
            </motion.p>
          )}
          {refreshing && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-[9px] font-mono uppercase tracking-wider lime-text whitespace-nowrap"
            >
              Refreshing…
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
