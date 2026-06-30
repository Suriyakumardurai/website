"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Table, X, GitCompare, ArrowRight, Check, Minus, Layers } from "lucide-react";
import Link from "next/link";
import { services } from "@/lib/content";

/**
 * Mobile-only Service Comparison Matrix.
 *
 * A tabular view alternative to the card-based compare.
 * Shows selected services in a horizontal-scroll matrix with rows for each feature.
 *
 * Triggered from the MobileCompareSheet when 2+ services are selected.
 * Renders as a toggle inside the compare sheet (Cards / Matrix view).
 *
 * Desktop (lg+) renders nothing.
 */

type MatrixRow = {
  label: string;
  values: (string | boolean)[];
};

export default function MobileCompareMatrix({
  selectedIds,
  onClose,
}: {
  selectedIds: string[];
  onClose: () => void;
}) {
  const selected = selectedIds
    .map((id) => services.find((s) => s.id === id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  if (selected.length < 2) {
    return (
      <div className="text-center py-10">
        <p className="text-sm text-muted-foreground">Add at least 2 services to compare</p>
      </div>
    );
  }

  // Build matrix rows: description + each point
  const allPoints = Array.from(
    new Set(selected.flatMap((s) => s.points))
  ).slice(0, 8); // cap at 8 rows for mobile readability

  const rows: MatrixRow[] = [
    {
      label: "Overview",
      values: selected.map((s) => s.desc.slice(0, 60) + (s.desc.length > 60 ? "…" : "")),
    },
    ...allPoints.map((point) => ({
      label: point,
      values: selected.map((s) => s.points.includes(point)),
    })),
  ];

  return (
    <div>
      {/* Matrix table — horizontal scroll */}
      <div className="snap-rail no-scrollbar overflow-x-auto -mx-5 px-5 pb-2">
        <div style={{ minWidth: "max-content" }}>
          {/* Header row — service titles */}
          <div className="flex gap-2 mb-2 sticky top-0 z-10">
            <div className="w-[100px] shrink-0" />
            {selected.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="w-[130px] shrink-0 rounded-xl bg-foreground text-background p-2.5"
              >
                <div className="text-[9px] font-mono text-background/60">{s.num}</div>
                <div className="text-xs font-semibold leading-tight mt-0.5">{s.title}</div>
              </motion.div>
            ))}
          </div>

          {/* Data rows */}
          {rows.map((row, ri) => (
            <motion.div
              key={ri}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: ri * 0.03 }}
              className="flex gap-2 mb-1.5"
            >
              {/* Row label */}
              <div className="w-[100px] shrink-0 flex items-center">
                <span className="text-[10px] font-medium text-muted-foreground leading-tight line-clamp-2">
                  {row.label}
                </span>
              </div>
              {/* Values */}
              {row.values.map((val, vi) => (
                <div
                  key={vi}
                  className={`w-[130px] shrink-0 rounded-lg p-2.5 flex items-center justify-center min-h-[44px] ${
                    ri === 0
                      ? "m-card-flat"
                      : typeof val === "boolean"
                      ? val
                        ? "bg-lime-500/[0.08] border border-lime-600/20"
                        : "m-card-flat"
                      : "m-card-flat"
                  }`}
                >
                  {typeof val === "boolean" ? (
                    val ? (
                      <Check className="h-4 w-4 lime-text" strokeWidth={2.5} />
                    ) : (
                      <Minus className="h-4 w-4 text-muted-foreground/40" />
                    )
                  ) : (
                    <span className="text-[10px] text-foreground/80 leading-tight">{val}</span>
                  )}
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary row */}
      <div className="mt-4 rounded-2xl bg-foreground text-background p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-lime-400" />
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-background/60">
              Comparing
            </div>
            <div className="text-xs font-semibold">{selected.length} services</div>
          </div>
        </div>
        <Link
          href="/contact"
          onClick={onClose}
          className="inline-flex items-center gap-1 h-8 px-3 rounded-full bg-lime-400 text-foreground text-[10px] font-semibold m-press"
        >
          Get quote
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
