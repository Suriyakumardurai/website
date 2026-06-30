"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import MobileReadingTime from "@/components/site/mobile-reading-time";

type Crumb = { label: string; href?: string };

/**
 * Mobile-only page intro — compact, full-bleed, sticky-feeling.
 *
 * - Slimmer top padding (accounts for mobile top strip).
 * - Crumbs become a single line that scrolls horizontally if needed.
 * - Stat row becomes a horizontal swipe rail.
 *
 * Desktop (lg+) renders nothing — original `PageIntro` takes over.
 */
export default function MobilePageIntro({
  eyebrow,
  title,
  titleAccent,
  description,
  crumbs,
  stats,
}: {
  eyebrow: string;
  title: React.ReactNode;
  titleAccent?: string;
  description?: string;
  crumbs?: Crumb[];
  stats?: { value: string; label: string }[];
}) {
  return (
    <section className="lg:hidden relative pt-24 pb-8 border-b border-border">
      {/* top lime accent rule */}
      <div className="absolute top-0 left-0 right-0 h-px m-section-rule" />

      <div className="safe-px">
        {crumbs && crumbs.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="no-scrollbar overflow-x-auto flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground mb-4 whitespace-nowrap"
          >
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {c.href ? (
                  <Link href={c.href} className="hover:text-foreground transition-colors">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-foreground">{c.label}</span>
                )}
                {i < crumbs.length - 1 && <ChevronRight className="h-3 w-3 opacity-50" />}
              </span>
            ))}
          </motion.nav>
        )}

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-3"
        >
          <span className="h-px w-6 bg-lime" />
          <span className="text-[10px] font-mono uppercase tracking-[0.22em] lime-text">
            {eyebrow}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="display text-[clamp(2rem,8.5vw,3rem)] leading-[0.98]"
        >
          {title} {titleAccent && <span className="lime-text">{titleAccent}</span>}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-3 text-sm text-muted-foreground leading-relaxed"
          >
            {description}
          </motion.p>
        )}

        {stats && stats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="mt-5 snap-rail no-scrollbar overflow-x-auto flex gap-2.5"
          >
            {stats.map((s, i) => (
              <div
                key={i}
                className="shrink-0 min-w-[110px] rounded-2xl m-card-flat p-3"
              >
                <div className="text-lg font-semibold tracking-tight tnum lime-text">
                  {s.value}
                </div>
                <div className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wider leading-tight">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Reading time estimate (mobile-only) */}
        <MobileReadingTime />
      </div>
    </section>
  );
}
