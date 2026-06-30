"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, BookOpen } from "lucide-react";

/**
 * Mobile-only reading time estimate.
 *
 * Calculates the approximate reading time for the current page's content
 * based on word count (200 wpm average). Renders a small chip at the top
 * of long pages (just below the page intro).
 *
 * Only renders on long content pages.
 * Desktop (lg+) renders nothing — desktop has its own layout.
 */

const LONG_PAGES = ["/faq", "/process", "/about", "/services", "/pricing", "/careers"];

function estimateReadingTime(): number {
  if (typeof document === "undefined") return 1;
  // Get all text content from the main element
  const main = document.querySelector("main");
  if (!main) return 1;
  const text = main.innerText || main.textContent || "";
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  // 200 words per minute, minimum 1 minute
  return Math.max(1, Math.round(words / 200));
}

export default function MobileReadingTime() {
  const [minutes, setMinutes] = useState<number | null>(null);
  const pathname = typeof window !== "undefined" ? window.location.pathname : "/";

  useEffect(() => {
    if (!LONG_PAGES.includes(pathname)) {
      setMinutes(null);
      return;
    }
    // Wait for content to render
    const t = setTimeout(() => {
      setMinutes(estimateReadingTime());
    }, 300);
    return () => clearTimeout(t);
  }, [pathname]);

  if (!minutes || !LONG_PAGES.includes(pathname)) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="lg:hidden safe-px -mt-4 mb-2"
    >
      <div className="inline-flex items-center gap-2 rounded-full m-chip px-3 py-1.5 text-[10px] font-medium text-foreground/80">
        <Clock className="h-3 w-3 lime-text" />
        <span className="font-mono uppercase tracking-wider">{minutes} min read</span>
        <span className="text-muted-foreground/40">·</span>
        <BookOpen className="h-3 w-3 text-muted-foreground" />
        <span className="text-muted-foreground">200 wpm</span>
      </div>
    </motion.div>
  );
}
