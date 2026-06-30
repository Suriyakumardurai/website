"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Clock, X } from "lucide-react";

/**
 * Mobile-only "Recently Viewed" chips.
 *
 * Two parts:
 *  1. useRecentlyViewed() hook — tracks visited pages in localStorage on every route change.
 *     Must be called from a layout-level component so it's always mounted.
 *  2. <MobileRecentlyViewed /> display component — reads localStorage and renders chips.
 *     Used inside the MobileNav sheet menu.
 *
 * Desktop (lg+) renders nothing.
 */

const STORAGE_KEY = "apc_recent_pages";
const MAX_HISTORY = 5;
const MAX_DISPLAY = 3;

type PageRecord = { path: string; title: string; ts: number };

const PAGE_TITLES: Record<string, string> = {
  "/services": "Services",
  "/process": "Process",
  "/pricing": "Pricing",
  "/about": "About",
  "/careers": "Careers",
  "/faq": "FAQ",
  "/contact": "Contact",
  "/classified": "Vault",
};

function getTitle(path: string): string {
  if (PAGE_TITLES[path]) return PAGE_TITLES[path];
  if (path === "/") return "Home";
  const seg = path.split("/").filter(Boolean)[0];
  if (seg) return seg.charAt(0).toUpperCase() + seg.slice(1);
  return "Page";
}

function readHistory(): PageRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((p) => p && typeof p.path === "string" && typeof p.ts === "number");
  } catch {
    return [];
  }
}

function writeHistory(records: PageRecord[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records.slice(0, MAX_HISTORY)));
  } catch {
    // ignore
  }
}

/**
 * Hook — call this from a layout-level component so it tracks every route change.
 */
export function useRecentlyViewedTracker() {
  const pathname = usePathname();
  useEffect(() => {
    if (!pathname) return;
    // Skip home and the vault (don't pollute history)
    if (pathname === "/" || pathname === "/classified") return;
    const current = readHistory();
    const existing = current.findIndex((p) => p.path === pathname);
    const record: PageRecord = { path: pathname, title: getTitle(pathname), ts: Date.now() };
    let updated: PageRecord[];
    if (existing >= 0) {
      updated = [record, ...current.filter((p) => p.path !== pathname)];
    } else {
      updated = [record, ...current];
    }
    updated = updated.slice(0, MAX_HISTORY);
    writeHistory(updated);
  }, [pathname]);
}

export default function MobileRecentlyViewed() {
  const [history, setHistory] = useState<PageRecord[]>([]);

  // Read history on mount (when sheet opens)
  useEffect(() => {
    setHistory(readHistory());
  }, []);

  const display = history
    .filter((p) => p.path !== "/" )
    .slice(0, MAX_DISPLAY);

  if (display.length === 0) return null;

  const clearHistory = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    writeHistory([]);
    setHistory([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="mt-5 pt-4 border-t border-border"
    >
      <div className="flex items-center justify-between mb-2.5">
        <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground flex items-center gap-1.5">
          <Clock className="h-3 w-3 lime-text" />
          Recently viewed
        </p>
        <button
          onClick={clearHistory}
          className="text-[10px] text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 m-press"
          aria-label="Clear recently viewed"
        >
          <X className="h-3 w-3" />
          Clear
        </button>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {display.map((p, i) => (
          <motion.div
            key={p.path}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.06, duration: 0.3 }}
          >
            <Link
              href={p.path}
              className="inline-flex items-center gap-1.5 rounded-full m-chip px-3 py-1.5 text-xs font-medium text-foreground/85 m-press"
            >
              <span className="h-1.5 w-1.5 rounded-full lime-bg" />
              {p.title}
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
