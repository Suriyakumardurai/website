"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, X, History } from "lucide-react";

/**
 * Mobile-only Recently Closed.
 *
 * Tracks recently closed sheets/overlays so users can quickly re-open them.
 * Renders a small "Recently closed" pill that appears briefly after closing
 * any major sheet (menu, quick contact, compare, feedback, etc.).
 *
 * Persists to localStorage.
 * Desktop (lg+) renders nothing.
 */

const STORAGE_KEY = "apc_recently_closed";
const MAX_ITEMS = 4;
const SHOW_DURATION = 8000; // 8 seconds

type ClosedItem = {
  id: string;
  label: string;
  trigger: string; // global function name to re-open
  ts: number;
};

function readRecent(): ClosedItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((r) => r && typeof r.label === "string");
  } catch {
    return [];
  }
}

function writeRecent(items: ClosedItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_ITEMS)));
  } catch {
    // ignore
  }
}

/**
 * Hook to track a closed item.
 * Call from any sheet's onClose handler.
 */
export function useTrackClosed() {
  return (item: Omit<ClosedItem, "ts">) => {
    const existing = readRecent();
    const filtered = existing.filter((r) => r.id !== item.id);
    writeRecent([{ ...item, ts: Date.now() }, ...filtered].slice(0, MAX_ITEMS));
  };
}

/**
 * Floating "Recently closed" pill that appears briefly.
 */
export default function MobileRecentlyClosed() {
  const [items, setItems] = useState<ClosedItem[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => {
      const recent = readRecent();
      if (recent.length === 0) {
        setVisible(false);
        return;
      }
      const newest = recent[0];
      const ageMs = Date.now() - newest.ts;
      // Show pill if most recent close was within 8 seconds
      if (ageMs < SHOW_DURATION) {
        setItems(recent);
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    check();
    const interval = setInterval(check, 1000);
    return () => clearInterval(interval);
  }, []);

  const reopen = (item: ClosedItem) => {
    const fn = (window as unknown as Record<string, (() => void) | undefined>)[item.trigger];
    fn?.();
    setVisible(false);
  };

  const dismiss = () => {
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && items.length > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="lg:hidden fixed left-3 right-3 z-[45]"
          style={{ bottom: "calc(var(--m-nav-h) + env(safe-area-inset-bottom) + 16px)" }}
        >
          <div className="rounded-2xl m-glass p-2.5 flex items-center gap-2 shadow-[0_8px_24px_-6px_rgba(13,13,21,0.24)]">
            <div className="flex items-center gap-1.5 shrink-0 pl-1">
              <History className="h-3 w-3 lime-text" />
              <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                Closed
              </span>
            </div>
            <div className="flex-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {items.slice(0, 3).map((item) => (
                <button
                  key={item.id}
                  onClick={() => reopen(item)}
                  className="shrink-0 inline-flex items-center gap-1 rounded-full m-chip px-2.5 py-1 text-[10px] font-medium text-foreground/85 m-press"
                >
                  <RotateCcw className="h-2.5 w-2.5 lime-text" />
                  {item.label}
                </button>
              ))}
            </div>
            <button
              onClick={dismiss}
              aria-label="Dismiss"
              className="m-tap m-press h-6 w-6 rounded-full m-card-flat flex items-center justify-center text-muted-foreground shrink-0"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
