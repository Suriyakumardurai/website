"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import {
  Zap,
  Calculator,
  MessageSquare,
  Bookmark,
  Search,
  GitCompare,
  X,
  ArrowRight,
  Hand,
} from "lucide-react";

/**
 * Mobile-only Quick Actions.
 *
 * Long-press on any bottom nav tab opens a radial/half-sheet menu
 * with quick actions related to that tab's section.
 *
 * Actions per tab:
 *  - Home: Open menu, Find on page, Replay tour
 *  - Services: Compare services, Find on page
 *  - Pricing: Quick quote calculator, Compare quotes
 *  - Contact: Quick contact form, Save to reading list
 *  - Menu: (no quick actions — it opens the menu)
 *
 * Desktop (lg+) renders nothing.
 */

type QuickAction = {
  id: string;
  label: string;
  desc: string;
  icon: typeof Zap;
  action: () => void;
};

type TabId = "home" | "services" | "pricing" | "contact";

const TAB_LABELS: Record<TabId, string> = {
  home: "Home",
  services: "Services",
  pricing: "Pricing",
  contact: "Contact",
};

export default function MobileQuickActions() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId | null>(null);
  const pressTimer = useRef<number | null>(null);

  // Expose a global trigger so the bottom nav can open it
  useEffect(() => {
    (window as unknown as { __openQuickActions?: (tab: TabId) => void }).__openQuickActions = (tab: TabId) => {
      setActiveTab(tab);
      setOpen(true);
    };
    return () => {
      delete (window as unknown as { __openQuickActions?: (tab: TabId) => void }).__openQuickActions;
    };
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  const getActions = (tab: TabId): QuickAction[] => {
    switch (tab) {
      case "home":
        return [
          {
            id: "menu",
            label: "Open menu",
            desc: "All pages + bookmarks",
            icon: Hand,
            action: () => {
              setOpen(false);
              setTimeout(() => {
                (window as unknown as { __openMobileMenu?: () => void }).__openMobileMenu?.();
              }, 350);
            },
          },
          {
            id: "find",
            label: "Find on page",
            desc: "Search current page",
            icon: Search,
            action: () => {
              setOpen(false);
              setTimeout(() => {
                (window as unknown as { __openContentSearch?: () => void }).__openContentSearch?.();
              }, 350);
            },
          },
          {
            id: "tour",
            label: "Replay tour",
            desc: "Mobile guide",
            icon: Zap,
            action: () => {
              setOpen(false);
              setTimeout(() => {
                (window as unknown as { __replayOnboarding?: () => void }).__replayOnboarding?.();
              }, 350);
            },
          },
        ];
      case "services":
        return [
          {
            id: "compare",
            label: "Compare services",
            desc: "Side-by-side matrix",
            icon: GitCompare,
            action: () => {
              setOpen(false);
              setTimeout(() => {
                (window as unknown as { __openCompare?: () => void }).__openCompare?.();
              }, 350);
            },
          },
          {
            id: "find",
            label: "Find on page",
            desc: "Search services",
            icon: Search,
            action: () => {
              setOpen(false);
              setTimeout(() => {
                (window as unknown as { __openContentSearch?: () => void }).__openContentSearch?.();
              }, 350);
            },
          },
        ];
      case "pricing":
        return [
          {
            id: "quote",
            label: "Quick quote",
            desc: "3-tap estimate",
            icon: Calculator,
            action: () => {
              setOpen(false);
              // Scroll to top where the quote calculator is
              window.scrollTo({ top: 0, behavior: "smooth" });
            },
          },
          {
            id: "compare-quotes",
            label: "Compare quotes",
            desc: "Saved estimates",
            icon: GitCompare,
            action: () => {
              setOpen(false);
              setTimeout(() => {
                (window as unknown as { __openQuoteCompare?: () => void }).__openQuoteCompare?.();
              }, 350);
            },
          },
        ];
      case "contact":
        return [
          {
            id: "quick-contact",
            label: "Quick message",
            desc: "3-field form",
            icon: MessageSquare,
            action: () => {
              setOpen(false);
              setTimeout(() => {
                (window as unknown as { __openQuickContact?: () => void }).__openQuickContact?.();
              }, 350);
            },
          },
          {
            id: "save",
            label: "Save to reading list",
            desc: "Read later",
            icon: Bookmark,
            action: () => {
              setOpen(false);
              setTimeout(() => {
                (window as unknown as { __toggleReadingList?: () => void }).__toggleReadingList?.();
              }, 350);
            },
          },
        ];
    }
  };

  const actions = activeTab ? getActions(activeTab) : [];

  return (
    <AnimatePresence>
      {open && activeTab && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-0 z-[65] bg-foreground/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed bottom-0 left-0 right-0 z-[66] rounded-t-3xl bg-background safe-pb"
            style={{ boxShadow: "0 -24px 60px -20px rgba(13,13,21,0.32)" }}
          >
            <div className="m-drag-handle" />
            <div className="px-5 pt-3 pb-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.25em] lime-text mb-1">
                    <Zap className="inline h-3 w-3 mr-1" />
                    Quick actions
                  </p>
                  <h2 className="text-xl font-semibold tracking-tight leading-tight">
                    {TAB_LABELS[activeTab]}
                  </h2>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="m-tap m-press h-10 w-10 rounded-full m-chip flex items-center justify-center shrink-0"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                {actions.map((a, i) => {
                  const Icon = a.icon;
                  return (
                    <motion.button
                      key={a.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.3 }}
                      onClick={a.action}
                      className="w-full flex items-center justify-between rounded-2xl m-card p-3.5 m-press text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-foreground text-background flex items-center justify-center">
                          <Icon className="h-4 w-4 text-lime-400" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold">{a.label}</div>
                          <div className="text-[10px] text-muted-foreground">{a.desc}</div>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </motion.button>
                  );
                })}
              </div>

              {/* Hint */}
              <p className="mt-4 text-center text-[10px] font-mono uppercase tracking-wider text-muted-foreground/60">
                <Hand className="inline h-2.5 w-2.5 mr-1" />
                Long-press any tab for quick actions
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
