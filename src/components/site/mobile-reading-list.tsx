"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookMarked,
  X,
  Trash2,
  ArrowRight,
  Clock,
  BookOpen,
  Check,
} from "lucide-react";
import { usePathname } from "next/navigation";

/**
 * Mobile-only Reading List.
 *
 * Distinct from bookmarks — a "read later" list with estimated reading time.
 * Saves pages to localStorage with their reading time estimate.
 * Renders:
 *  1. <MobileReadingListButton /> — floating button on content pages.
 *  2. <MobileReadingList /> — list view inside the MobileNav sheet menu.
 *
 * Desktop (lg+) renders nothing.
 */

const STORAGE_KEY = "apc_reading_list";
const MAX_ITEMS = 10;

type ReadingItem = {
  path: string;
  title: string;
  readingTime: number; // minutes
  ts: number;
};

const PAGE_TITLES: Record<string, string> = {
  "/services": "Services",
  "/process": "Process",
  "/pricing": "Pricing",
  "/about": "About",
  "/careers": "Careers",
  "/faq": "FAQ",
  "/contact": "Contact",
};

function getTitle(path: string): string {
  return PAGE_TITLES[path] ?? "Page";
}

function estimateReadingTime(): number {
  if (typeof document === "undefined") return 1;
  const main = document.querySelector("main");
  if (!main) return 1;
  const text = main.innerText || main.textContent || "";
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function readList(): ReadingItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((r) => r && typeof r.path === "string");
  } catch {
    return [];
  }
}

function writeList(items: ReadingItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_ITEMS)));
  } catch {
    // ignore
  }
}

/**
 * Floating "Add to reading list" button — appears on content pages.
 */
export function MobileReadingListButton() {
  const pathname = usePathname();
  const [inList, setInList] = useState(false);
  const [justToggled, setJustToggled] = useState(false);

  const canAdd = Object.keys(PAGE_TITLES).includes(pathname);

  useEffect(() => {
    if (!canAdd) {
      setInList(false);
      return;
    }
    const list = readList();
    setInList(list.some((r) => r.path === pathname));
  }, [pathname, canAdd]);

  if (!canAdd) return null;

  const toggle = () => {
    const list = readList();
    const existing = list.findIndex((r) => r.path === pathname);
    let updated: ReadingItem[];
    if (existing >= 0) {
      updated = list.filter((r) => r.path !== pathname);
      setInList(false);
    } else {
      const item: ReadingItem = {
        path: pathname,
        title: getTitle(pathname),
        readingTime: estimateReadingTime(),
        ts: Date.now(),
      };
      updated = [item, ...list].slice(0, MAX_ITEMS);
      setInList(true);
    }
    writeList(updated);
    setJustToggled(true);
    setTimeout(() => setJustToggled(false), 1500);
  };

  return (
    <motion.button
      onClick={toggle}
      aria-label={inList ? "Remove from reading list" : "Add to reading list"}
      aria-pressed={inList}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25 }}
      className="lg:hidden fixed z-40 m-press"
      style={{ top: "calc(env(safe-area-inset-top) + 56px)", right: 100 }}
    >
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
          inList ? "bg-foreground text-background" : "m-glass text-foreground"
        }`}
        style={{
          boxShadow: inList
            ? "0 0 12px 1px rgba(132,204,22,0.3)"
            : "0 4px 12px -2px rgba(13,13,21,0.15)",
        }}
      >
        {inList ? (
          <Check className="h-4 w-4 lime-text" strokeWidth={2.5} />
        ) : (
          <BookMarked className="h-4 w-4" />
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
            {inList ? "Added to list" : "Removed"}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/**
 * Reading list view — renders inside the MobileNav sheet menu.
 */
export default function MobileReadingList() {
  const [items, setItems] = useState<ReadingItem[]>([]);

  useEffect(() => {
    setItems(readList());
  }, []);

  const clearAll = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    writeList([]);
    setItems([]);
  };

  const removeOne = (path: string) => {
    const updated = items.filter((r) => r.path !== path);
    writeList(updated);
    setItems(updated);
  };

  if (items.length === 0) return null;

  // Calculate total reading time
  const totalMinutes = items.reduce((sum, r) => sum + r.readingTime, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="mt-4 pt-4 border-t border-border"
    >
      <div className="flex items-center justify-between mb-2.5">
        <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground flex items-center gap-1.5">
          <BookOpen className="h-3 w-3 lime-text" />
          Reading list
          <span className="ml-1 inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-foreground text-background text-[9px] font-mono font-semibold">
            {items.length}
          </span>
        </p>
        <button
          onClick={clearAll}
          className="text-[10px] text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 m-press"
          aria-label="Clear reading list"
        >
          <Trash2 className="h-3 w-3" />
          Clear
        </button>
      </div>

      {/* Total reading time badge */}
      <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full m-chip px-2.5 py-1 text-[10px] font-medium text-foreground/80">
        <Clock className="h-3 w-3 lime-text" />
        <span className="font-mono uppercase tracking-wider">
          {totalMinutes} min total
        </span>
      </div>

      <div className="space-y-1.5">
        {items.map((r, i) => (
          <motion.div
            key={r.path}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.05, duration: 0.3 }}
            className="flex items-center gap-2 group"
          >
            <Link
              href={r.path}
              className="flex-1 flex items-center justify-between rounded-xl m-card-flat px-3 py-2 m-press"
            >
              <div className="min-w-0">
                <span className="text-xs font-medium text-foreground/90 block truncate">
                  {r.title}
                </span>
                <span className="text-[9px] font-mono text-muted-foreground">
                  {r.readingTime} min read
                </span>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:lime-text transition-colors shrink-0" />
            </Link>
            <button
              onClick={() => removeOne(r.path)}
              aria-label={`Remove ${r.title} from reading list`}
              className="m-tap m-press h-8 w-8 rounded-full m-card-flat flex items-center justify-center text-muted-foreground hover:text-foreground shrink-0"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
