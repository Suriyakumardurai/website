"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { GitCompare, X, Check, Plus, ArrowRight, Sparkles, Table, LayoutGrid } from "lucide-react";
import { services } from "@/lib/content";
import MobileCompareMatrix from "@/components/site/mobile-compare-matrix";

/**
 * Mobile-only Service Compare feature.
 *
 * Lets users select 2-3 services to compare side-by-side in a slide-up sheet.
 * Selected services are stored in localStorage so the comparison persists.
 *
 * Renders:
 *  1. A floating "Compare" FAB that shows the count of selected services.
 *  2. A slide-up sheet with a side-by-side comparison table.
 *  3. Per-service cards on /services have a "Add to compare" toggle.
 *
 * Desktop (lg+) renders nothing.
 */

const STORAGE_KEY = "apc_compare_services";
const MAX_COMPARE = 3;

type ServiceSummary = {
  id: string;
  num: string;
  title: string;
  desc: string;
  points: string[];
};

function readCompare(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((s) => typeof s === "string").slice(0, MAX_COMPARE);
  } catch {
    return [];
  }
}

function writeCompare(ids: string[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids.slice(0, MAX_COMPARE)));
  } catch {
    // ignore
  }
}

/**
 * Hook to manage compare state from service cards.
 */
export function useCompareToggle() {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    setSelected(readCompare());
  }, []);

  const toggle = (id: string) => {
    setSelected((prev) => {
      let next: string[];
      if (prev.includes(id)) {
        next = prev.filter((x) => x !== id);
      } else {
        if (prev.length >= MAX_COMPARE) return prev;
        next = [...prev, id];
      }
      writeCompare(next);
      return next;
    });
  };

  const clear = () => {
    writeCompare([]);
    setSelected([]);
  };

  return { selected, toggle, clear, max: MAX_COMPARE };
}

/**
 * Floating Compare FAB + slide-up comparison sheet.
 * Renders globally on mobile.
 */
export default function MobileCompareSheet() {
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"cards" | "matrix">("cards");

  useEffect(() => {
    const refresh = () => setSelected(readCompare());
    refresh();
    // Listen for storage changes from service cards
    window.addEventListener("storage", refresh);
    // Also poll every 1s in case storage event doesn't fire (same tab)
    const interval = setInterval(refresh, 1000);
    return () => {
      window.removeEventListener("storage", refresh);
      clearInterval(interval);
    };
  }, []);

  const selectedServices: ServiceSummary[] = selected
    .map((id) => services.find((s) => s.id === id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
    .map((s) => ({
      id: s.id,
      num: s.num,
      title: s.title,
      desc: s.desc,
      points: s.points,
    }));

  const clearAll = () => {
    writeCompare([]);
    setSelected([]);
  };

  const removeOne = (id: string) => {
    const next = selected.filter((x) => x !== id);
    writeCompare(next);
    setSelected(next);
  };

  return (
    <>
      {/* Floating Compare FAB — only visible when ≥1 service selected */}
      <AnimatePresence>
        {selected.length > 0 && !open && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed left-1/2 -translate-x-1/2 z-40"
            style={{ bottom: "calc(var(--m-nav-h) + env(safe-area-inset-bottom) + 76px)" }}
          >
            <button
              onClick={() => setOpen(true)}
              className="m-press flex items-center gap-2.5 h-11 rounded-full bg-foreground text-background px-4 shadow-[0_8px_24px_-6px_rgba(13,13,21,0.4)]"
              aria-label="Compare selected services"
            >
              <span className="relative">
                <GitCompare className="h-4 w-4 text-lime-400" />
                {selected.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-lime-400 text-foreground text-[9px] font-mono font-bold flex items-center justify-center">
                    {selected.length}
                  </span>
                )}
              </span>
              <span className="text-xs font-semibold">Compare ({selected.length}/{MAX_COMPARE})</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide-up comparison sheet */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden fixed inset-0 z-[60] bg-foreground/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden fixed bottom-0 left-0 right-0 z-[61] rounded-t-3xl bg-background safe-pb"
              style={{
                maxHeight: "92vh",
                boxShadow: "0 -24px 60px -20px rgba(13,13,21,0.32)",
              }}
            >
              <div className="m-drag-handle" />
              <div className="px-5 pt-3 pb-6 overflow-y-auto" style={{ maxHeight: "calc(92vh - 24px)" }}>
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] lime-text mb-1">
                      <GitCompare className="inline h-3 w-3 mr-1" />
                      Compare services
                    </p>
                    <h2 className="text-xl font-semibold tracking-tight leading-tight">
                      {selectedServices.length === 0
                        ? "Nothing to compare yet"
                        : `${selectedServices.length} service${selectedServices.length !== 1 ? "s" : ""} side by side`}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    {selected.length > 0 && (
                      <button
                        onClick={clearAll}
                        className="text-[10px] text-muted-foreground hover:text-foreground transition-colors m-press"
                      >
                        Clear all
                      </button>
                    )}
                    <button
                      onClick={() => setOpen(false)}
                      className="m-tap m-press h-10 w-10 rounded-full m-chip flex items-center justify-center shrink-0"
                      aria-label="Close"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {selectedServices.length === 0 ? (
                  <div className="text-center py-10">
                    <div className="inline-flex h-14 w-14 rounded-full m-card-flat items-center justify-center mb-3">
                      <GitCompare className="h-6 w-6 text-muted-foreground/60" />
                    </div>
                    <p className="text-sm font-medium">No services selected</p>
                    <p className="text-xs text-muted-foreground mt-1 max-w-[260px] mx-auto leading-relaxed">
                      Tap the + button on any service card on the Services page to add it here for comparison.
                    </p>
                    <Link
                      href="/services"
                      className="mt-4 inline-flex items-center gap-1.5 h-9 rounded-full bg-foreground text-background px-4 text-xs font-semibold m-press"
                    >
                      Browse services <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                ) : (
                  <>
                    {/* View toggle: Cards / Matrix */}
                    <div className="flex items-center gap-1.5 p-1 rounded-full m-card-flat mb-3 w-fit mx-auto">
                      <button
                        onClick={() => setViewMode("cards")}
                        aria-pressed={viewMode === "cards"}
                        className={`inline-flex items-center gap-1 h-7 px-3 rounded-full text-[10px] font-medium m-press transition-all ${
                          viewMode === "cards" ? "bg-foreground text-background" : "text-muted-foreground"
                        }`}
                      >
                        <LayoutGrid className="h-3 w-3" />
                        Cards
                      </button>
                      <button
                        onClick={() => setViewMode("matrix")}
                        aria-pressed={viewMode === "matrix"}
                        className={`inline-flex items-center gap-1 h-7 px-3 rounded-full text-[10px] font-medium m-press transition-all ${
                          viewMode === "matrix" ? "bg-foreground text-background" : "text-muted-foreground"
                        }`}
                      >
                        <Table className="h-3 w-3" />
                        Matrix
                      </button>
                    </div>

                    {viewMode === "matrix" ? (
                      <MobileCompareMatrix
                        selectedIds={selected}
                        onClose={() => setOpen(false)}
                      />
                    ) : (
                    <>
                    {/* Comparison table — horizontal scroll */}
                    <div className="snap-rail no-scrollbar overflow-x-auto -mx-5 px-5 pb-2">
                      <div className="flex gap-2.5" style={{ minWidth: "max-content" }}>
                        {selectedServices.map((s, i) => (
                          <motion.div
                            key={s.id}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08, duration: 0.35 }}
                            className="shrink-0 w-[240px] rounded-2xl m-card p-4 relative"
                          >
                            <button
                              onClick={() => removeOne(s.id)}
                              aria-label="Remove from compare"
                              className="absolute top-2 right-2 m-tap m-press h-6 w-6 rounded-full m-card-flat flex items-center justify-center text-muted-foreground hover:text-foreground"
                            >
                              <X className="h-3 w-3" />
                            </button>
                            <span className="font-mono text-[9px] text-muted-foreground/60">{s.num}</span>
                            <h3 className="font-semibold text-sm mt-1 mb-2 pr-6">{s.title}</h3>
                            <p className="text-[10px] text-muted-foreground leading-relaxed mb-3">{s.desc}</p>
                            <div className="space-y-1.5">
                              {s.points.map((p) => (
                                <div key={p} className="flex items-start gap-1.5 text-[10px]">
                                  <Check className="h-3 w-3 lime-text mt-0.5 shrink-0" />
                                  <span className="text-foreground/85">{p}</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        ))}

                        {/* Add more card (if below max) */}
                        {selectedServices.length < MAX_COMPARE && (
                          <Link
                            href="/services"
                            className="shrink-0 w-[180px] rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center p-4 text-center m-press"
                          >
                            <div className="h-10 w-10 rounded-full m-card-flat flex items-center justify-center mb-2">
                              <Plus className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <p className="text-xs font-semibold">Add another</p>
                            <p className="text-[10px] text-muted-foreground mt-0.5">
                              {MAX_COMPARE - selectedServices.length} more
                            </p>
                          </Link>
                        )}
                      </div>
                    </div>
                    </>
                    )}

                    {/* CTA */}
                    <div className="mt-4 rounded-2xl bg-foreground text-background p-4 relative overflow-hidden">
                      <div
                        aria-hidden
                        className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-lime-400/15 blur-2xl"
                      />
                      <div className="relative flex items-start gap-2.5">
                        <Sparkles className="h-4 w-4 text-lime-400 shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-xs font-semibold">Ready to decide?</p>
                          <p className="text-[10px] text-background/70 mt-0.5">
                            Book a discovery call — we&apos;ll recommend the right scope within 48 hours.
                          </p>
                        </div>
                      </div>
                      <Link
                        href="/contact"
                        className="relative mt-3 flex items-center justify-center gap-1.5 h-10 rounded-full bg-lime-400 text-foreground text-xs font-semibold m-press"
                      >
                        Get exact quote <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
