"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitCompare, X, ArrowRight, Check, TrendingDown, TrendingUp, Minus } from "lucide-react";
import Link from "next/link";

/**
 * Mobile-only Quote Comparison.
 *
 * Lets users compare two saved quotes side-by-side to see which is cheaper.
 * Renders as a "Compare quotes" button in the MobileQuoteHistory section
 * (only visible when ≥2 quotes are saved).
 *
 * Opens a slide-up sheet with:
 *  - Two quote columns
 *  - Diff highlighting (cheaper values get lime, more expensive get muted)
 *  - Total savings calculation
 *  - "Get exact quote" CTA
 *
 * Desktop (lg+) renders nothing.
 */

type SavedQuote = {
  id: string;
  capability: string;
  scope: string;
  timeline: string;
  low: number;
  high: number;
  mid: number;
  ts: number;
};

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
  return `${Math.floor(hours / 24)}d ago`;
}

function readHistory(): SavedQuote[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("apc_quote_history");
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export default function MobileQuoteCompare({ onClose }: { onClose: () => void }) {
  const [quotes, setQuotes] = useState<SavedQuote[]>([]);
  const [leftId, setLeftId] = useState<string | null>(null);
  const [rightId, setRightId] = useState<string | null>(null);

  useEffect(() => {
    const history = readHistory();
    setQuotes(history);
    if (history.length >= 2) {
      setLeftId(history[0].id);
      setRightId(history[1].id);
    }
  }, []);

  if (quotes.length < 2) {
    return (
      <div className="text-center py-10">
        <div className="inline-flex h-12 w-12 rounded-full m-card-flat items-center justify-center mb-3">
          <GitCompare className="h-5 w-5 text-muted-foreground/60" />
        </div>
        <p className="text-sm font-medium">Need 2+ saved quotes</p>
        <p className="text-xs text-muted-foreground mt-1 max-w-[240px] mx-auto">
          Calculate at least 2 different quotes to compare them side-by-side.
        </p>
      </div>
    );
  }

  const left = quotes.find((q) => q.id === leftId);
  const right = quotes.find((q) => q.id === rightId);

  if (!left || !right) return null;

  const cheaper = left.mid <= right.mid ? "left" : "right";
  const savings = Math.abs(left.mid - right.mid);
  const savingsPct = Math.round((savings / Math.max(left.mid, right.mid)) * 100);

  const rows: { label: string; left: string; right: string; cheaperSide: "left" | "right" | "tie" }[] = [
    { label: "Capability", left: left.capability, right: right.capability, cheaperSide: "tie" },
    { label: "Scope", left: left.scope, right: right.scope, cheaperSide: "tie" },
    { label: "Timeline", left: left.timeline, right: right.timeline, cheaperSide: "tie" },
    { label: "Low estimate", left: formatINR(left.low), right: formatINR(right.low), cheaperSide: left.low <= right.low ? "left" : "right" },
    { label: "High estimate", left: formatINR(left.high), right: formatINR(right.high), cheaperSide: left.high <= right.high ? "left" : "right" },
    { label: "Mid estimate", left: formatINR(left.mid), right: formatINR(right.mid), cheaperSide: left.mid <= right.mid ? "left" : "right" },
  ];

  return (
    <div>
      {/* Quote selectors */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div>
          <p className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground mb-1.5">Quote A</p>
          <select
            value={leftId ?? ""}
            onChange={(e) => setLeftId(e.target.value)}
            className="w-full h-9 rounded-lg border border-border bg-background px-2 text-xs font-medium outline-none"
          >
            {quotes.map((q) => (
              <option key={q.id} value={q.id}>
                {q.capability} · {q.scope}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground mb-1.5">Quote B</p>
          <select
            value={rightId ?? ""}
            onChange={(e) => setRightId(e.target.value)}
            className="w-full h-9 rounded-lg border border-border bg-background px-2 text-xs font-medium outline-none"
          >
            {quotes.map((q) => (
              <option key={q.id} value={q.id}>
                {q.capability} · {q.scope}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison table */}
      <div className="rounded-2xl m-card-flat overflow-hidden">
        {rows.map((row, i) => (
          <div
            key={i}
            className={`grid grid-cols-[1fr_auto_1fr] items-center ${
              i > 0 ? "border-t border-border" : ""
            }`}
          >
            {/* Left value */}
            <div
              className={`p-2.5 text-center ${
                row.cheaperSide === "left"
                  ? "bg-lime-500/[0.08]"
                  : ""
              }`}
            >
              <span
                className={`text-xs font-semibold ${
                  row.cheaperSide === "left" ? "lime-text" : "text-foreground/80"
                }`}
              >
                {row.left}
              </span>
            </div>
            {/* Label */}
            <div className="p-2 text-center min-w-[80px]">
              <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground/70">
                {row.label}
              </span>
            </div>
            {/* Right value */}
            <div
              className={`p-2.5 text-center ${
                row.cheaperSide === "right"
                  ? "bg-lime-500/[0.08]"
                  : ""
              }`}
            >
              <span
                className={`text-xs font-semibold ${
                  row.cheaperSide === "right" ? "lime-text" : "text-foreground/80"
                }`}
              >
                {row.right}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Savings summary */}
      {savings > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-3 rounded-2xl bg-foreground text-background p-3.5 flex items-center justify-between"
        >
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-full bg-lime-400 text-foreground flex items-center justify-center">
              <TrendingDown className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-background/60">
                Save with Quote {cheaper === "left" ? "A" : "B"}
              </p>
              <p className="text-sm font-semibold lime-text">
                {formatINR(savings)} <span className="text-background/60 text-xs">({savingsPct}% less)</span>
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* CTA */}
      <Link
        href="/contact"
        onClick={onClose}
        className="mt-3 w-full flex items-center justify-center gap-1.5 h-11 rounded-full bg-foreground text-background text-sm font-semibold m-press"
      >
        Get exact quote
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
