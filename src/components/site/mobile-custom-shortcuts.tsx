"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pin, X, Plus, Check, Zap } from "lucide-react";

/**
 * Mobile-only Custom Shortcuts.
 *
 * Lets users pin up to 2 favorite quick actions to the bottom nav bar.
 * Accessed via a "Shortcuts" button in the menu sheet.
 * 
 * Pinned shortcuts appear as small icons in the top brand strip
 * (next to the Menu button) for instant access.
 *
 * Available shortcuts:
 *  - Quick quote, Quick contact, Compare services, Find on page,
 *    Voice search, Reading list, Dark mode toggle
 *
 * Persists to localStorage.
 * Desktop (lg+) renders nothing.
 */

const STORAGE_KEY = "apc_custom_shortcuts";
const MAX_SHORTCUTS = 2;

type Shortcut = {
  id: string;
  label: string;
  icon: string; // lucide icon name
  trigger: string; // global function name
};

const AVAILABLE_SHORTCUTS: Shortcut[] = [
  { id: "quote", label: "Quick quote", icon: "Calculator", trigger: "__scrollToQuote" },
  { id: "contact", label: "Quick contact", icon: "Send", trigger: "__openQuickContact" },
  { id: "compare", label: "Compare services", icon: "GitCompare", trigger: "__openCompare" },
  { id: "find", label: "Find on page", icon: "Search", trigger: "__openContentSearch" },
  { id: "voice", label: "Voice search", icon: "Mic", trigger: "__openVoiceSearch" },
  { id: "reading", label: "Reading list", icon: "BookOpen", trigger: "__scrollToReadingList" },
  { id: "darkmode", label: "Dark mode", icon: "Moon", trigger: "__toggleDarkMode" },
  { id: "menu", label: "Open menu", icon: "Menu", trigger: "__openMobileMenu" },
];

function readShortcuts(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((s) => typeof s === "string").slice(0, MAX_SHORTCUTS);
  } catch {
    return [];
  }
}

function writeShortcuts(ids: string[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids.slice(0, MAX_SHORTCUTS)));
  } catch {
    // ignore
  }
}

/**
 * Hook to get pinned shortcuts — used by MobileNav to render them in the top strip.
 */
export function useCustomShortcuts() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setIds(readShortcuts());
    const refresh = () => setIds(readShortcuts());
    window.addEventListener("storage", refresh);
    const interval = setInterval(refresh, 2000);
    return () => {
      window.removeEventListener("storage", refresh);
      clearInterval(interval);
    };
  }, []);

  const shortcuts = ids
    .map((id) => AVAILABLE_SHORTCUTS.find((s) => s.id === id))
    .filter((s): s is Shortcut => Boolean(s));

  return { shortcuts };
}

/**
 * Shortcuts manager — renders inside the MobileNav sheet menu.
 * Lets users toggle which shortcuts are pinned.
 */
export default function MobileCustomShortcuts() {
  const [pinned, setPinned] = useState<string[]>([]);
  const [justToggled, setJustToggled] = useState<string | null>(null);

  useEffect(() => {
    setPinned(readShortcuts());
  }, []);

  const toggle = (id: string) => {
    let updated: string[];
    if (pinned.includes(id)) {
      updated = pinned.filter((x) => x !== id);
    } else {
      if (pinned.length >= MAX_SHORTCUTS) return;
      updated = [...pinned, id];
    }
    writeShortcuts(updated);
    setPinned(updated);
    setJustToggled(id);
    setTimeout(() => setJustToggled(null), 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="mt-4 pt-4 border-t border-border"
    >
      <div className="flex items-center justify-between mb-2.5">
        <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground flex items-center gap-1.5">
          <Pin className="h-3 w-3 lime-text" />
          Quick shortcuts
          <span className="text-muted-foreground/50">({pinned.length}/{MAX_SHORTCUTS})</span>
        </p>
      </div>
      <p className="text-[10px] text-muted-foreground/70 mb-3 leading-relaxed">
        Pin your favorite actions for instant access from the top bar.
      </p>
      <div className="grid grid-cols-2 gap-1.5">
        {AVAILABLE_SHORTCUTS.map((s) => {
          const isPinned = pinned.includes(s.id);
          const isMaxed = pinned.length >= MAX_SHORTCUTS && !isPinned;
          return (
            <button
              key={s.id}
              onClick={() => toggle(s.id)}
              disabled={isMaxed}
              className={`flex items-center gap-2 rounded-xl p-2.5 m-press transition-all border text-left ${
                isPinned
                  ? "border-foreground bg-foreground text-background"
                  : isMaxed
                  ? "border-border m-card-flat opacity-40"
                  : "border-border m-card-flat hover:bg-muted/40"
              }`}
            >
              <span className={`h-6 w-6 rounded-lg flex items-center justify-center shrink-0 ${
                isPinned ? "bg-lime-400 text-foreground" : "bg-foreground/5 text-muted-foreground"
              }`}>
                {isPinned ? (
                  <Check className="h-3 w-3" strokeWidth={2.5} />
                ) : (
                  <Plus className="h-3 w-3" />
                )}
              </span>
              <span className={`text-[10px] font-medium ${isPinned ? "text-background" : "text-foreground/80"}`}>
                {s.label}
              </span>
              <AnimatePresence>
                {justToggled === s.id && isPinned && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="ml-auto text-lime-400"
                  >
                    <Zap className="h-3 w-3" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
