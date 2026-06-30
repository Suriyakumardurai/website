"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";

/**
 * Mobile-only edge-swipe back gesture.
 *
 * Detects touchstart near the left edge (within 24px) and tracks horizontal
 * swipe distance. If the user swipes right past a threshold (80px), navigate back.
 *
 * Shows a visual arrow indicator that follows the finger during the swipe.
 *
 * Only active on non-home pages (no "back" from home).
 * Desktop (lg+) renders nothing.
 */

const EDGE_WIDTH = 24; // px from left edge where swipe begins
const SWIPE_THRESHOLD = 80; // px to trigger back navigation
const SWIPE_CANCEL = 20; // px below which we cancel if released

export default function MobileBackGesture() {
  const router = useRouter();
  const pathname = usePathname();
  const [dragX, setDragX] = useState(0);
  const [active, setActive] = useState(false);
  const touchStartY = useRef(0);
  const touchActive = useRef(false);

  const isHome = pathname === "/";

  useEffect(() => {
    if (isHome) return;

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch.clientX <= EDGE_WIDTH) {
        touchActive.current = true;
        touchStartY.current = touch.clientY;
        setActive(true);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!touchActive.current) return;
      const touch = e.touches[0];
      const dx = touch.clientX;
      const dy = Math.abs(touch.clientY - touchStartY.current);
      // Only treat as horizontal swipe if dy is small relative to dx
      if (dy > 60 && dx < 100) {
        // Vertical scroll — cancel the gesture
        touchActive.current = false;
        setDragX(0);
        setActive(false);
        return;
      }
      if (dx > 0) {
        setDragX(Math.min(dx, 140));
      }
    };

    const onTouchEnd = () => {
      if (!touchActive.current) return;
      touchActive.current = false;
      if (dragX > SWIPE_THRESHOLD) {
        // Trigger back navigation
        setDragX(0);
        setActive(false);
        router.back();
      } else {
        // Animate back to 0
        setDragX(0);
        setActive(false);
      }
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [isHome, dragX, router]);

  if (isHome) return null;

  const progress = Math.min(dragX / SWIPE_THRESHOLD, 1);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 z-[70] pointer-events-none"
          style={{
            background: progress > 0.3
              ? `linear-gradient(90deg, rgba(13,13,21,${progress * 0.15}) 0%, transparent 50%)`
              : "transparent",
          }}
        >
          {/* Floating arrow that follows the finger */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center"
            style={{
              left: `${Math.max(8, dragX - 20)}px`,
              scale: 0.6 + progress * 0.4,
            }}
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
                progress >= 1
                  ? "bg-lime-400 text-foreground"
                  : "bg-foreground/90 text-background backdrop-blur"
              }`}
              style={{
                boxShadow: progress > 0.5 ? "0 0 24px 4px rgba(132,204,22,0.4)" : "0 8px 24px -6px rgba(13,13,21,0.4)",
              }}
            >
              <ArrowLeft className="h-5 w-5" />
            </div>
          </motion.div>

          {/* Hint text that appears once the threshold is hit */}
          {progress >= 1 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute top-1/2 -translate-y-1/2 text-xs font-mono uppercase tracking-wider text-foreground"
              style={{ left: `${dragX + 40}px` }}
            >
              Release to go back
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
