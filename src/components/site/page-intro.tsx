"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; href?: string };

/**
 * Enterprise page intro — eyebrow with rule, large display title,
 * description, and a metadata stat row for visual density + credibility.
 */
export default function PageIntro({
  eyebrow,
  title,
  titleAccent,
  description,
  crumbs,
  align = "left",
  stats,
}: {
  eyebrow: string;
  title: React.ReactNode;
  titleAccent?: string;
  description?: string;
  crumbs?: Crumb[];
  align?: "left" | "center";
  stats?: { value: string; label: string }[];
}) {
  return (
    <section className="relative pt-32 pb-14 sm:pt-40 sm:pb-20 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {crumbs && crumbs.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground mb-8 ${
              align === "center" ? "justify-center" : ""
            }`}
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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`flex items-center gap-3 mb-5 ${align === "center" ? "justify-center" : ""}`}
        >
          <span className="h-px w-8 bg-lime" />
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] lime-text">
            {eyebrow}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className={`display text-[clamp(1.9rem,3.8vw,3rem)] ${
            align === "center" ? "text-center mx-auto" : ""
          } max-w-4xl`}
        >
          {title} {titleAccent && <span className="lime-text">{titleAccent}</span>}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className={`mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed ${
              align === "center" ? "text-center mx-auto" : ""
            } max-w-2xl`}
          >
            {description}
          </motion.p>
        )}

        {/* Stat row — enterprise density */}
        {stats && stats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`mt-8 flex flex-wrap gap-x-8 gap-y-4 ${align === "center" ? "justify-center" : ""}`}
          >
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-lg sm:text-xl font-semibold tracking-tight tnum">
                  {s.value}
                </span>
                <span className="text-[11px] text-muted-foreground mt-1 uppercase tracking-wider">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
