"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Highlighter, X, Trash2, ArrowRight, BookOpen } from "lucide-react";

/**
 * Mobile-only Content Bookmarks.
 *
 * Lets users select text on any page and save it as a "content bookmark".
 * Saved selections appear in the menu sheet under "Saved highlights".
 *
 * Uses the Selection API to capture text selections.
 * Persists to localStorage with page path + timestamp.
 *
 * Desktop (lg+) renders nothing.
 */

const STORAGE_KEY = "apc_content_bookmarks";
const MAX_ITEMS = 8;

type ContentBookmark = {
  id: string;
  text: string;
  path: string;
  pageTitle: string;
  ts: number;
};

const PAGE_TITLES: Record<string, string> = {
  "/": "Home",
  "/services": "Services",
  "/pricing": "Pricing",
  "/about": "About",
  "/process": "Process",
  "/faq": "FAQ",
  "/careers": "Careers",
  "/contact": "Contact",
};

function getTitle(path: string): string {
  return PAGE_TITLES[path] ?? "Page";
}

function readBookmarks(): ContentBookmark[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((b) => b && typeof b.text === "string");
  } catch {
    return [];
  }
}

function writeBookmarks(items: ContentBookmark[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_ITEMS)));
  } catch {
    // ignore
  }
}

/**
 * Hook to capture text selection and offer to save it.
 * Returns the current selection + a save function.
 */
export function useContentBookmark() {
  const [selection, setSelection] = useState<string>("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const onSelect = () => {
      const sel = window.getSelection();
      const text = sel?.toString().trim() ?? "";
      if (text.length >= 3 && text.length <= 200) {
        setSelection(text);
        setShowPrompt(true);
        setSaved(false);
      } else {
        setShowPrompt(false);
      }
    };

    document.addEventListener("selectionchange", onSelect);
    return () => document.removeEventListener("selectionchange", onSelect);
  }, []);

  const save = useCallback(() => {
    if (!selection) return;
    const path = window.location.pathname;
    const item: ContentBookmark = {
      id: `cb-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      text: selection,
      path,
      pageTitle: getTitle(path),
      ts: Date.now(),
    };
    const existing = readBookmarks();
    // Dedupe by text
    const filtered = existing.filter((b) => b.text !== selection);
    writeBookmarks([item, ...filtered].slice(0, MAX_ITEMS));
    setSaved(true);
    setShowPrompt(false);
    // Clear selection
    window.getSelection()?.removeAllRanges();
    setTimeout(() => setSaved(false), 2000);
  }, [selection]);

  return { selection, showPrompt, save, saved };
}

/**
 * Floating prompt that appears when user selects text.
 */
export function MobileContentBookmarkPrompt() {
  const { selection, showPrompt, save, saved } = useContentBookmark();

  return (
    <AnimatePresence>
      {(showPrompt || saved) && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="lg:hidden fixed left-1/2 -translate-x-1/2 z-[55]"
          style={{ bottom: "calc(var(--m-nav-h) + env(safe-area-inset-bottom) + 20px)" }}
        >
          {saved ? (
            <div className="flex items-center gap-2 rounded-full bg-lime-400 text-foreground px-4 py-2.5 shadow-lg">
              <Highlighter className="h-3.5 w-3.5" />
              <span className="text-xs font-semibold">Highlight saved!</span>
            </div>
          ) : (
            <button
              onClick={save}
              className="flex items-center gap-2 rounded-full bg-foreground text-background px-4 py-2.5 shadow-lg m-press"
            >
              <Highlighter className="h-3.5 w-3.5 text-lime-400" />
              <span className="text-xs font-semibold">Save highlight</span>
              <span className="text-[10px] text-background/60 max-w-[120px] truncate">
                "{selection.slice(0, 30)}…"
              </span>
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * List of saved highlights — renders inside the MobileNav sheet menu.
 */
export default function MobileContentBookmarks() {
  const [bookmarks, setBookmarks] = useState<ContentBookmark[]>([]);

  useEffect(() => {
    setBookmarks(readBookmarks());
  }, []);

  const clearAll = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    writeBookmarks([]);
    setBookmarks([]);
  };

  const removeOne = (id: string) => {
    const updated = bookmarks.filter((b) => b.id !== id);
    writeBookmarks(updated);
    setBookmarks(updated);
  };

  if (bookmarks.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="mt-4 pt-4 border-t border-border"
    >
      <div className="flex items-center justify-between mb-2.5">
        <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground flex items-center gap-1.5">
          <Highlighter className="h-3 w-3 lime-text" />
          Saved highlights
          <span className="ml-1 inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-foreground text-background text-[9px] font-mono font-semibold">
            {bookmarks.length}
          </span>
        </p>
        <button
          onClick={clearAll}
          className="text-[10px] text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 m-press"
          aria-label="Clear all highlights"
        >
          <Trash2 className="h-3 w-3" />
          Clear
        </button>
      </div>
      <div className="space-y-1.5">
        {bookmarks.map((b, i) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 + i * 0.05, duration: 0.3 }}
            className="flex items-start gap-2 group"
          >
            <Link
              href={b.path}
              className="flex-1 rounded-xl m-card-flat p-2.5 m-press"
            >
              <p className="text-[11px] text-foreground/90 leading-snug line-clamp-2 mb-1">
                "{b.text}"
              </p>
              <div className="flex items-center gap-1.5">
                <BookOpen className="h-2.5 w-2.5 text-muted-foreground/60" />
                <span className="text-[9px] font-mono text-muted-foreground">
                  {b.pageTitle}
                </span>
              </div>
            </Link>
            <button
              onClick={() => removeOne(b.id)}
              aria-label="Remove highlight"
              className="m-tap m-press h-7 w-7 rounded-full m-card-flat flex items-center justify-center text-muted-foreground hover:text-foreground shrink-0 mt-0.5"
            >
              <X className="h-3 w-3" />
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
