"use client";

import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, CornerDownLeft, ArrowRight, Command, Clock, Trash2, Mic } from "lucide-react";
import { services, company } from "@/lib/content";
import MobileVoiceSearch from "@/components/site/mobile-voice-search";

/**
 * Mobile-only Command Palette.
 *
 * Opens via long-press on the AutoPlanet logo in the top brand strip
 * (or via a hidden 3-finger tap anywhere).
 * Provides fuzzy search across all pages + services.
 * Keyboard-less: tap to navigate, with a most-recent-results bias.
 *
 * Desktop (lg+) renders nothing.
 */

type SearchItem = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  group: "Page" | "Service" | "Action";
  keywords: string[];
};

const ITEMS: SearchItem[] = [
  { id: "home", title: "Home", subtitle: "Landing page", href: "/", group: "Page", keywords: ["home", "main", "landing"] },
  { id: "services", title: "Services", subtitle: "All capabilities", href: "/services", group: "Page", keywords: ["services", "capabilities", "what we do"] },
  { id: "process", title: "Process", subtitle: "How we ship", href: "/process", group: "Page", keywords: ["process", "how", "ship", "workflow"] },
  { id: "pricing", title: "Pricing", subtitle: "Fixed-price tiers", href: "/pricing", group: "Page", keywords: ["pricing", "cost", "price", "quote"] },
  { id: "about", title: "About", subtitle: "AI-native team", href: "/about", group: "Page", keywords: ["about", "team", "company"] },
  { id: "careers", title: "Careers", subtitle: "Open roles", href: "/careers", group: "Page", keywords: ["careers", "jobs", "work", "hiring"] },
  { id: "faq", title: "FAQ", subtitle: "Questions answered", href: "/faq", group: "Page", keywords: ["faq", "questions", "help"] },
  { id: "contact", title: "Contact", subtitle: "Book a call", href: "/contact", group: "Page", keywords: ["contact", "call", "email", "reach"] },
  { id: "contact-action", title: "Start a project", subtitle: "Book a discovery call", href: "/contact", group: "Action", keywords: ["start", "project", "book", "call"] },
  // Add all services
  ...services.map((s) => ({
    id: `svc-${s.id}`,
    title: s.title,
    subtitle: s.desc.slice(0, 50) + "…",
    href: "/services",
    group: "Service" as const,
    keywords: [s.title.toLowerCase(), s.id, ...s.points.map((p) => p.toLowerCase())],
  })),
];

const RECENT_KEY = "apc_cmd_recent";
const MAX_RECENT = 4;

function readRecent(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((s) => typeof s === "string").slice(0, MAX_RECENT);
  } catch {
    return [];
  }
}

function writeRecent(queries: string[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(queries.slice(0, MAX_RECENT)));
  } catch {
    // ignore
  }
}

export default function MobileCommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const logoPressTimer = useRef<number | null>(null);

  // Load recent searches on mount + when palette opens
  useEffect(() => {
    if (open) {
      setRecentSearches(readRecent());
    }
  }, [open]);

  const saveRecent = useCallback((q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    const existing = readRecent();
    const filtered = existing.filter((s) => s.toLowerCase() !== trimmed.toLowerCase());
    const updated = [trimmed, ...filtered].slice(0, MAX_RECENT);
    writeRecent(updated);
    setRecentSearches(updated);
  }, []);

  const clearRecent = useCallback(() => {
    writeRecent([]);
    setRecentSearches([]);
  }, []);

  // Long-press detection on the logo
  useEffect(() => {
    const logo = document.querySelector('a[aria-label="AutoPlanet home"]');
    if (!logo) return;

    const onPressStart = (e: TouchEvent | MouseEvent) => {
      logoPressTimer.current = window.setTimeout(() => {
        e.preventDefault();
        setOpen(true);
      }, 600);
    };
    const onPressEnd = () => {
      if (logoPressTimer.current) {
        clearTimeout(logoPressTimer.current);
        logoPressTimer.current = null;
      }
    };

    logo.addEventListener("touchstart", onPressStart, { passive: true });
    logo.addEventListener("touchend", onPressEnd);
    logo.addEventListener("touchmove", onPressEnd);
    logo.addEventListener("mousedown", onPressStart);
    logo.addEventListener("mouseup", onPressEnd);
    logo.addEventListener("mouseleave", onPressEnd);

    return () => {
      logo.removeEventListener("touchstart", onPressStart);
      logo.removeEventListener("touchend", onPressEnd);
      logo.removeEventListener("touchmove", onPressEnd);
      logo.removeEventListener("mousedown", onPressStart);
      logo.removeEventListener("mouseup", onPressEnd);
      logo.removeEventListener("mouseleave", onPressEnd);
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

  // Filter items
  const filtered = useMemo(() => {
    if (!query.trim()) return ITEMS.slice(0, 8);
    const q = query.toLowerCase().trim();
    return ITEMS.filter((item) => {
      if (item.title.toLowerCase().includes(q)) return true;
      if (item.subtitle.toLowerCase().includes(q)) return true;
      return item.keywords.some((k) => k.includes(q));
    }).slice(0, 8);
  }, [query]);

  // Reset active index when filter changes
  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  if (!open) return null;

  const grouped = filtered.reduce((acc, item) => {
    if (!acc[item.group]) acc[item.group] = [];
    acc[item.group].push(item);
    return acc;
  }, {} as Record<string, SearchItem[]>);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="lg:hidden fixed inset-0 z-[70] bg-foreground/50 backdrop-blur-md"
        onClick={() => setOpen(false)}
      />
      <motion.div
        initial={{ y: -20, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -20, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="lg:hidden fixed top-0 left-0 right-0 z-[71] safe-pt"
      >
        <div className="m-glass border-b border-border/60">
          <div className="safe-px py-3">
            {/* Search input */}
            <div className="flex items-center gap-2.5">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages, services, actions…"
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
              {/* Voice search button */}
              <button
                onClick={() => setVoiceOpen(true)}
                aria-label="Voice search"
                className="m-tap m-press h-7 w-7 rounded-full m-chip flex items-center justify-center shrink-0"
              >
                <Mic className="h-3.5 w-3.5 lime-text" />
              </button>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close search"
                className="m-tap m-press h-7 w-7 rounded-full m-chip flex items-center justify-center shrink-0"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="mt-2 text-[9px] font-mono uppercase tracking-wider text-muted-foreground/60 flex items-center gap-1">
              <Command className="h-2.5 w-2.5" />
              Long-press logo anytime to open
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="bg-background safe-px max-h-[60vh] overflow-y-auto">
          {/* Recent searches (only when no query) */}
          {!query.trim() && recentSearches.length > 0 && (
            <div className="py-2 border-b border-border">
              <div className="flex items-center justify-between px-1 py-1.5">
                <p className="text-[9px] font-mono uppercase tracking-[0.22em] text-muted-foreground/60 flex items-center gap-1.5">
                  <Clock className="h-2.5 w-2.5 lime-text" />
                  Recent
                </p>
                <button
                  onClick={clearRecent}
                  className="text-[9px] text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 m-press"
                  aria-label="Clear recent searches"
                >
                  <Trash2 className="h-2.5 w-2.5" />
                  Clear
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 px-1 pb-1.5">
                {recentSearches.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="inline-flex items-center gap-1 rounded-full m-chip px-2.5 py-1 text-[10px] font-medium text-foreground/85 m-press"
                  >
                    <Clock className="h-2.5 w-2.5 text-muted-foreground/60" />
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-sm text-muted-foreground">No results for &ldquo;{query}&rdquo;</p>
              <p className="text-[10px] text-muted-foreground/60 mt-1">Try: services, pricing, agent</p>
            </div>
          ) : (
            <div className="py-2">
              {Object.entries(grouped).map(([group, items]) => (
                <div key={group} className="mb-2">
                  <p className="text-[9px] font-mono uppercase tracking-[0.22em] text-muted-foreground/60 px-1 py-1.5">
                    {group}
                  </p>
                  {items.map((item) => {
                    const idx = filtered.indexOf(item);
                    const isActive = idx === activeIdx;
                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => {
                          saveRecent(query);
                          setOpen(false);
                        }}
                        className={`flex items-center justify-between rounded-xl px-3 py-3 m-press transition-colors ${
                          isActive ? "bg-foreground text-background" : "hover:bg-muted/60"
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-semibold truncate">{item.title}</div>
                          <div className={`text-[10px] truncate ${isActive ? "text-background/60" : "text-muted-foreground"}`}>
                            {item.subtitle}
                          </div>
                        </div>
                        {isActive ? (
                          <CornerDownLeft className="h-3.5 w-3.5 shrink-0 ml-2" />
                        ) : (
                          <ArrowRight className="h-3.5 w-3.5 shrink-0 ml-2 text-muted-foreground" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-background border-t border-border safe-px py-2 flex items-center justify-between">
          <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground/60">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
          <span className="text-[9px] font-mono text-muted-foreground/60">
            {company.short}
          </span>
        </div>
      </motion.div>

      {/* Voice search overlay */}
      {voiceOpen && (
        <MobileVoiceSearch
          onResult={(transcript) => {
            setQuery(transcript);
            setVoiceOpen(false);
          }}
          onClose={() => setVoiceOpen(false)}
        />
      )}
    </>
  );
}
