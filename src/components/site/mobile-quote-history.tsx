"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { History, Trash2, ArrowRight, Clock, TrendingUp, X, GitCompare } from "lucide-react";
import Link from "next/link";
import MobileQuoteCompare from "@/components/site/mobile-quote-compare";

/**
 * Mobile-only Quick Quote History.
 *
 * Saves recent quote calculations to localStorage and displays them
 * as a compact list below the Quick Quote Calculator on /pricing.
 *
 * Each saved quote: { id, capability, scope, timeline, low, high, mid, ts }
 * Max 5 saved quotes.
 *
 * Desktop (lg+) renders nothing.
 */

const STORAGE_KEY = "apc_quote_history";
const MAX_HISTORY = 5;

export type SavedQuote = {
  id: string;
  capability: string;
  scope: string;
  timeline: string;
  low: number;
  high: number;
  mid: number;
  ts: number;
};

function readHistory(): SavedQuote[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (q) => q && typeof q.id === "string" && typeof q.mid === "number"
    );
  } catch {
    return [];
  }
}

function writeHistory(q: SavedQuote[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(q.slice(0, MAX_HISTORY)));
  } catch {
    // ignore
  }
}

/**
 * Hook to add a quote to history.
 * Call from the Quick Quote Calculator when a quote is completed.
 */
export function useSaveQuote() {
  return (quote: Omit<SavedQuote, "id" | "ts">) => {
    const full: SavedQuote = {
      ...quote,
      id: `q-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      ts: Date.now(),
    };
    const existing = readHistory();
    // Avoid exact duplicates (same cap/scope/tl)
    const filtered = existing.filter(
      (q) =>
        !(q.capability === full.capability && q.scope === full.scope && q.timeline === full.timeline)
    );
    writeHistory([full, ...filtered].slice(0, MAX_HISTORY));
  };
}

function formatINR(n: number): string {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "INR",
  }).format(n);
}

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function MobileQuoteHistory() {
  const [history, setHistory] = useState<SavedQuote[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);

  // Refresh on mount + when window regains focus
  useEffect(() => {
    const refresh = () => setHistory(readHistory());
    refresh();
    window.addEventListener("focus", refresh);
    // Also refresh on storage event (other tabs)
    window.addEventListener("storage", refresh);
    const interval = setInterval(refresh, 30000); // refresh "time ago" labels
    return () => {
      window.removeEventListener("focus", refresh);
      window.removeEventListener("storage", refresh);
      clearInterval(interval);
    };
  }, []);

  const clearAll = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    writeHistory([]);
    setHistory([]);
  };

  const removeOne = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = history.filter((q) => q.id !== id);
    writeHistory(updated);
    setHistory(updated);
  };

  if (history.length === 0) return null;

  // Find the cheapest quote for a "best price" highlight
  const cheapest = history.reduce((min, q) => (q.mid < min.mid ? q : min), history[0]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="safe-px mt-6"
    >
      <div className="rounded-3xl m-card p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground flex items-center gap-1.5">
            <History className="h-3 w-3 lime-text" />
            Your quote history
            <span className="ml-1 inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-foreground text-background text-[9px] font-mono font-semibold">
              {history.length}
            </span>
          </p>
          <div className="flex items-center gap-3">
            {history.length >= 2 && (
              <button
                onClick={() => setCompareOpen(true)}
                className="text-[10px] font-medium lime-text hover:text-foreground transition-colors inline-flex items-center gap-1 m-press"
                aria-label="Compare quotes"
              >
                <GitCompare className="h-3 w-3" />
                Compare
              </button>
            )}
            <button
              onClick={clearAll}
              className="text-[10px] text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 m-press"
              aria-label="Clear all quotes"
            >
              <Trash2 className="h-3 w-3" />
              Clear
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <AnimatePresence initial={false}>
            {history.map((q, i) => {
              const isCheapest = q.id === cheapest.id && history.length > 1;
              return (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10, height: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  layout
                  className={`relative rounded-2xl p-3 m-press ${
                    isCheapest
                      ? "border border-lime-600/30 bg-lime-500/[0.06]"
                      : "m-card-flat"
                  }`}
                >
                  {/* Best price badge */}
                  {isCheapest && (
                    <span className="absolute -top-2 right-3 inline-flex items-center gap-1 rounded-full bg-lime-400 text-foreground px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider">
                      <TrendingUp className="h-2.5 w-2.5" />
                      Best
                    </span>
                  )}

                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-semibold">{q.capability}</span>
                        <span className="text-[9px] font-mono text-muted-foreground">
                          {q.scope} · {q.timeline}
                        </span>
                      </div>
                      <div className="mt-1.5 flex items-baseline gap-1.5">
                        <span className="text-base font-semibold tabular-nums lime-text">
                          {formatINR(q.low)}
                        </span>
                        <span className="text-[10px] text-muted-foreground">–</span>
                        <span className="text-sm font-medium tabular-nums text-muted-foreground">
                          {formatINR(q.high)}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-1.5">
                        <Clock className="h-2.5 w-2.5 text-muted-foreground/60" />
                        <span className="text-[9px] font-mono text-muted-foreground/70">
                          {timeAgo(q.ts)}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <button
                        onClick={(e) => removeOne(q.id, e)}
                        aria-label="Remove quote"
                        className="m-tap m-press h-6 w-6 rounded-full m-card-flat flex items-center justify-center text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* CTA to get exact quote */}
        <Link
          href="/contact"
          className="mt-3 flex items-center justify-center gap-1.5 h-10 rounded-full bg-foreground text-background text-xs font-semibold m-press"
        >
          Get exact quote
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Quote comparison sheet */}
      <AnimatePresence>
        {compareOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden fixed inset-0 z-[60] bg-foreground/50 backdrop-blur-sm"
              onClick={() => setCompareOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden fixed bottom-0 left-0 right-0 z-[61] rounded-t-3xl bg-background safe-pb"
              style={{ boxShadow: "0 -24px 60px -20px rgba(13,13,21,0.32)" }}
            >
              <div className="m-drag-handle" />
              <div className="px-5 pt-3 pb-6 overflow-y-auto" style={{ maxHeight: "calc(92vh - 24px)" }}>
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] lime-text mb-1">
                      <GitCompare className="inline h-3 w-3 mr-1" />
                      Compare quotes
                    </p>
                    <h2 className="text-xl font-semibold tracking-tight leading-tight">
                      Side by side
                    </h2>
                  </div>
                  <button
                    onClick={() => setCompareOpen(false)}
                    className="m-tap m-press h-10 w-10 rounded-full m-chip flex items-center justify-center shrink-0"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <MobileQuoteCompare onClose={() => setCompareOpen(false)} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
