"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, BookmarkCheck, X, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Mobile-only Bookmark/Save feature.
 *
 * Two parts:
 *  1. <MobileBookmarkButton /> — a small icon button that toggles bookmark state for the current page.
 *     Renders as a floating chip in the top-right (below the reading ring on long pages).
 *  2. <MobileBookmarkList /> — renders inside the MobileNav sheet menu, showing all saved pages.
 *
 * Bookmarks are stored in localStorage as `apc_bookmarks`.
 * Desktop (lg+) renders nothing.
 */

const STORAGE_KEY = "apc_bookmarks";
const MAX_BOOKMARKS = 8;

type Bookmark = { path: string; title: string; ts: number };

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

// Pages that can be bookmarked (skip home — no point bookmarking the home page)
const BOOKMARKABLE = Object.keys(PAGE_TITLES);

function readBookmarks(): Bookmark[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((b) => b && typeof b.path === "string");
  } catch {
    return [];
  }
}

function writeBookmarks(b: Bookmark[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(b.slice(0, MAX_BOOKMARKS)));
  } catch {
    // ignore
  }
}

/**
 * Floating bookmark toggle button — renders in top-right area on bookmarkable pages.
 */
export function MobileBookmarkButton() {
  const pathname = usePathname();
  const [bookmarked, setBookmarked] = useState(false);
  const [justToggled, setJustToggled] = useState(false);

  const canBookmark = BOOKMARKABLE.includes(pathname);

  useEffect(() => {
    if (!canBookmark) {
      setBookmarked(false);
      return;
    }
    const list = readBookmarks();
    setBookmarked(list.some((b) => b.path === pathname));
  }, [pathname, canBookmark]);

  if (!canBookmark) return null;

  const toggle = () => {
    const list = readBookmarks();
    const existing = list.findIndex((b) => b.path === pathname);
    let updated: Bookmark[];
    if (existing >= 0) {
      updated = list.filter((b) => b.path !== pathname);
      setBookmarked(false);
    } else {
      updated = [{ path: pathname, title: getTitle(pathname), ts: Date.now() }, ...list].slice(0, MAX_BOOKMARKS);
      setBookmarked(true);
    }
    writeBookmarks(updated);
    setJustToggled(true);
    setTimeout(() => setJustToggled(false), 1200);
  };

  return (
    <motion.button
      onClick={toggle}
      aria-label={bookmarked ? "Remove bookmark" : "Save page"}
      aria-pressed={bookmarked}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25 }}
      className="lg:hidden fixed z-40 m-press"
      style={{ top: "calc(env(safe-area-inset-top) + 56px)", right: 56 }}
    >
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
          bookmarked
            ? "bg-lime-400 text-foreground"
            : "m-glass text-foreground"
        }`}
        style={{
          boxShadow: bookmarked
            ? "0 0 16px 2px rgba(132,204,22,0.35)"
            : "0 4px 12px -2px rgba(13,13,21,0.15)",
        }}
      >
        {bookmarked ? (
          <BookmarkCheck className="h-4 w-4" strokeWidth={2.5} />
        ) : (
          <Bookmark className="h-4 w-4" />
        )}
      </div>
      <AnimatePresence>
        {justToggled && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.8 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full right-0 mt-1.5 whitespace-nowrap rounded-full bg-foreground text-background px-2.5 py-1 text-[10px] font-medium shadow-lg"
          >
            {bookmarked ? "Saved" : "Removed"}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/**
 * Bookmark list — renders inside the MobileNav sheet menu.
 */
export default function MobileBookmarkList() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    setBookmarks(readBookmarks());
  }, []);

  const clearAll = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    writeBookmarks([]);
    setBookmarks([]);
  };

  const removeOne = (path: string) => {
    const updated = bookmarks.filter((b) => b.path !== path);
    writeBookmarks(updated);
    setBookmarks(updated);
  };

  if (bookmarks.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="mt-4 pt-4 border-t border-border"
    >
      <div className="flex items-center justify-between mb-2.5">
        <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground flex items-center gap-1.5">
          <BookmarkCheck className="h-3 w-3 lime-text" />
          Saved pages
          <span className="ml-1 inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-foreground text-background text-[9px] font-mono font-semibold">
            {bookmarks.length}
          </span>
        </p>
        <button
          onClick={clearAll}
          className="text-[10px] text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 m-press"
          aria-label="Clear all bookmarks"
        >
          <Trash2 className="h-3 w-3" />
          Clear
        </button>
      </div>
      <div className="space-y-1.5">
        {bookmarks.map((b, i) => (
          <motion.div
            key={b.path}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 + i * 0.05, duration: 0.3 }}
            className="flex items-center gap-2 group"
          >
            <Link
              href={b.path}
              className="flex-1 flex items-center justify-between rounded-xl m-card-flat px-3 py-2 m-press"
            >
              <span className="text-xs font-medium text-foreground/90">{b.title}</span>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:lime-text transition-colors" />
            </Link>
            <button
              onClick={() => removeOne(b.path)}
              aria-label={`Remove ${b.title}`}
              className="m-tap m-press h-8 w-8 rounded-full m-card-flat flex items-center justify-center text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
