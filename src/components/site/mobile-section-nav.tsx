"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ChevronUp } from "lucide-react";

/**
 * Mobile-only floating section navigator.
 *
 * Shows a small floating chip on the bottom-left (above the bottom nav)
 * that displays the current section the user is viewing.
 * Tapping it scrolls to the next section.
 *
 * Supports multiple pages: home, services, about, pricing, process, faq, careers.
 * Each page has a custom set of named sections.
 *
 * Desktop (lg+) renders nothing.
 */

type SectionDef = { id: string; label: string };

// Per-page section definitions — must match the order of visible mobile sections on each page.
const PAGE_SECTIONS: Record<string, SectionDef[]> = {
  "/": [
    { id: "m-sec-top", label: "Top" },
    { id: "m-sec-tech", label: "Stack" },
    { id: "m-sec-stats", label: "Stats" },
    { id: "m-sec-services", label: "Services" },
    { id: "m-sec-ops", label: "Live Ops" },
    { id: "m-sec-process", label: "Process" },
    { id: "m-sec-pricing", label: "Pricing" },
    { id: "m-sec-voices", label: "Voices" },
    { id: "m-sec-cta", label: "Get Started" },
  ],
  "/services": [
    { id: "m-sec-intro", label: "Overview" },
    { id: "m-sec-core", label: "Core AI" },
    { id: "m-sec-product", label: "Product" },
    { id: "m-sec-enterprise", label: "Enterprise" },
    { id: "m-sec-tech", label: "Stack" },
    { id: "m-sec-cta", label: "Get Started" },
  ],
  "/about": [
    { id: "m-sec-intro", label: "Story" },
    { id: "m-sec-arch", label: "Architecture" },
    { id: "m-sec-pillars", label: "Principles" },
    { id: "m-sec-values", label: "Values" },
    { id: "m-sec-tech", label: "Stack" },
    { id: "m-sec-ops", label: "Live Ops" },
    { id: "m-sec-cta", label: "Get Started" },
  ],
  "/pricing": [
    { id: "m-sec-intro", label: "Overview" },
    { id: "m-sec-quote", label: "Quick Quote" },
    { id: "m-sec-tiers", label: "Tiers" },
    { id: "m-sec-compare", label: "Compare" },
    { id: "m-sec-cta", label: "Get Started" },
  ],
  "/process": [
    { id: "m-sec-intro", label: "Overview" },
    { id: "m-sec-timeline", label: "Timeline" },
    { id: "m-sec-cta", label: "Get Started" },
  ],
  "/faq": [
    { id: "m-sec-intro", label: "Overview" },
    { id: "m-sec-faqs", label: "Questions" },
    { id: "m-sec-cta", label: "Get Started" },
  ],
  "/careers": [
    { id: "m-sec-intro", label: "Overview" },
    { id: "m-sec-jobs", label: "Open Roles" },
    { id: "m-sec-cta", label: "Get Started" },
  ],
};

export default function MobileSectionNav() {
  const pathname = usePathname();
  const [activeIdx, setActiveIdx] = useState(0);
  const [visible, setVisible] = useState(false);
  const [sections, setSections] = useState<HTMLElement[]>([]);

  const sectionsDef = PAGE_SECTIONS[pathname];

  useEffect(() => {
    if (!sectionsDef) {
      setSections([]);
      return;
    }

    // Tag visible (mobile) sections with the predefined IDs in order
    const allSections = Array.from(document.querySelectorAll("section"));
    const visibleSections = allSections.filter((s) => {
      const style = window.getComputedStyle(s);
      if (style.display === "none") return false;
      if (s.classList.contains("hidden") && s.classList.contains("lg:block")) return false;
      return true;
    });

    // Tag the first N visible sections with the predefined IDs
    const tagged: HTMLElement[] = [];
    visibleSections.slice(0, sectionsDef.length).forEach((s, i) => {
      const def = sectionsDef[i];
      if (def) {
        s.id = def.id;
        tagged.push(s as HTMLElement);
      }
    });
    setSections(tagged);

    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y > 400);

      let current = 0;
      const offset = 200;
      for (let i = 0; i < tagged.length; i++) {
        const rect = tagged[i].getBoundingClientRect();
        if (rect.top <= offset) current = i;
      }
      setActiveIdx(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname, sectionsDef]);

  if (!sectionsDef || sections.length === 0) return null;

  const goToNext = () => {
    const nextIdx = Math.min(activeIdx + 1, sectionsDef.length - 1);
    const target = document.getElementById(sectionsDef[nextIdx].id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isLast = activeIdx >= sectionsDef.length - 1;
  const currentLabel = sectionsDef[activeIdx]?.label ?? "";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="lg:hidden fixed left-3 z-40"
          style={{ bottom: "calc(var(--m-nav-h) + env(safe-area-inset-bottom) + 76px)" }}
        >
          <button
            onClick={isLast ? goToTop : goToNext}
            aria-label={isLast ? "Back to top" : `Next section: ${sectionsDef[activeIdx + 1]?.label}`}
            className="m-press flex items-center gap-2 h-9 rounded-full m-glass px-3 shadow-[0_8px_24px_-8px_rgba(13,13,21,0.24)]"
          >
            {/* progress dots — show a window of 5 around the active index */}
            <div className="flex items-center gap-1">
              {sectionsDef.map((_, i) => {
                const distance = Math.abs(i - activeIdx);
                if (distance > 2) return null;
                return (
                  <span
                    key={i}
                    className={`h-1 rounded-full transition-all ${
                      i === activeIdx
                        ? "w-3 lime-bg"
                        : i < activeIdx
                        ? "w-1 bg-foreground/40"
                        : "w-1 bg-foreground/15"
                    }`}
                  />
                );
              })}
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-foreground/80">
              {currentLabel}
            </span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-background">
              <ChevronUp
                className={`h-3 w-3 transition-transform ${isLast ? "" : "rotate-180"}`}
              />
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
