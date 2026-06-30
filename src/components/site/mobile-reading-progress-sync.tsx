"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { BookmarkCheck, X, ArrowUp, RotateCcw } from "lucide-react";

/**
 * Mobile-only Reading Progress Sync.
 *
 * Remembers the user's scroll position on each page.
 * When they return to a page they've previously visited,
 * shows a "Continue reading?" prompt to jump back to that position.
 *
 * Persists scroll positions per page in localStorage.
 * Expires after 1 hour.
 *
 * Desktop (lg+) renders nothing.
 */

const STORAGE_KEY = "apc_scroll_positions";
const EXPIRY_MS = 60 * 60 * 1000; // 1 hour

type ScrollRecord = { y: number; ts: number };

function readPositions(): Record<string, ScrollRecord> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return {};
    // Filter expired entries
    const now = Date.now();
    const valid: Record<string, ScrollRecord> = {};
    for (const [path, rec] of Object.entries(parsed)) {
      const r = rec as ScrollRecord;
      if (r && typeof r.y === "number" && typeof r.ts === "number") {
        if (now - r.ts < EXPIRY_MS) {
          valid[path] = r;
        }
      }
    }
    return valid;
  } catch {
    return {};
  }
}

function writePosition(path: string, y: number) {
  if (typeof window === "undefined") return;
  try {
    const positions = readPositions();
    positions[path] = { y, ts: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
  } catch {
    // ignore
  }
}

function clearPosition(path: string) {
  if (typeof window === "undefined") return;
  try {
    const positions = readPositions();
    delete positions[path];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
  } catch {
    // ignore
  }
}

export default function MobileReadingProgressSync() {
  const pathname = usePathname();
  const [savedY, setSavedY] = useState<number | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  // Check for saved scroll position on page load
  useEffect(() => {
    const positions = readPositions();
    const record = positions[pathname];
    if (record && record.y > 600) {
      // Only show prompt if saved position is significant (>600px)
      setSavedY(record.y);
      setShowPrompt(true);
    } else {
      setSavedY(null);
      setShowPrompt(false);
    }
  }, [pathname]);

  // Save scroll position on unmount/scroll (debounced)
  useEffect(() => {
    let timer: number | undefined;
    const onScroll = () => {
      if (timer) return;
      timer = window.setTimeout(() => {
        writePosition(pathname, window.scrollY);
        timer = undefined;
      }, 1000);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Save on unmount
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timer) clearTimeout(timer);
      writePosition(pathname, window.scrollY);
    };
  }, [pathname]);

  const resume = () => {
    if (savedY) {
      window.scrollTo({ top: savedY, behavior: "smooth" });
    }
    setShowPrompt(false);
  };

  const dismiss = () => {
    clearPosition(pathname);
    setShowPrompt(false);
  };

  return (
    <AnimatePresence>
      {showPrompt && savedY && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="lg:hidden fixed left-3 right-3 z-[50]"
          style={{ bottom: "calc(var(--m-nav-h) + env(safe-area-inset-bottom) + 16px)" }}
        >
          <div className="rounded-2xl m-glass p-3 flex items-center justify-between gap-2 shadow-[0_8px_24px_-6px_rgba(13,13,21,0.24)]">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="h-8 w-8 rounded-full bg-foreground text-background flex items-center justify-center shrink-0">
                <BookmarkCheck className="h-4 w-4 lime-text" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold">Continue reading?</p>
                <p className="text-[10px] text-muted-foreground">
                  You left off at {Math.round((savedY / (document.body.scrollHeight - window.innerHeight)) * 100)}%
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={resume}
                className="inline-flex items-center gap-1 h-8 px-3 rounded-full bg-foreground text-background text-[10px] font-semibold m-press"
              >
                <ArrowUp className="h-3 w-3" />
                Resume
              </button>
              <button
                onClick={dismiss}
                aria-label="Dismiss"
                className="m-tap m-press h-8 w-8 rounded-full m-card-flat flex items-center justify-center text-muted-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
