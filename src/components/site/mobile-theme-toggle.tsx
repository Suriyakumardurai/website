"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Monitor } from "lucide-react";

/**
 * Mobile-only Dark Mode toggle.
 *
 * Toggles a `.dark` class on <html> and persists the choice to localStorage.
 * Three states: light, dark, system.
 *
 * Renders as a segmented control inside the MobileNav sheet menu.
 * Desktop (lg+) renders nothing — desktop stays light-only per original design.
 *
 * Note: This only affects mobile view (below lg). We scope the dark theme
 * to `@media (max-width: 1023px)` so desktop is never affected.
 */

const STORAGE_KEY = "apc_mobile_theme";
type Theme = "light" | "dark" | "system";

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "light";
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === "light" || raw === "dark" || raw === "system") return raw;
  } catch {
    // ignore
  }
  return "light";
}

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = theme === "dark" || (theme === "system" && prefersDark);

  // Only apply dark class on mobile viewport (below lg)
  // We use a data attribute and CSS media query to scope it
  if (isDark) {
    root.setAttribute("data-mobile-theme", "dark");
  } else {
    root.setAttribute("data-mobile-theme", "light");
  }
}

export function useMobileTheme() {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const stored = getStoredTheme();
    setThemeState(stored);
    applyTheme(stored);

    // Listen for system theme changes
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (getStoredTheme() === "system") applyTheme("system");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {
      // ignore
    }
    applyTheme(t);
  };

  return { theme, setTheme };
}

export default function MobileThemeToggle() {
  const { theme, setTheme } = useMobileTheme();

  const options: { value: Theme; label: string; icon: typeof Sun }[] = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "Auto", icon: Monitor },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="mt-4 pt-4 border-t border-border"
    >
      <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground mb-2.5 flex items-center gap-1.5">
        <Moon className="h-3 w-3 lime-text" />
        Appearance
      </p>
      <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl m-card-flat">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isActive = theme === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => setTheme(opt.value)}
              aria-label={`Switch to ${opt.label} theme`}
              aria-pressed={isActive}
              className={`relative flex flex-col items-center gap-1 py-2.5 rounded-xl text-[10px] font-medium m-press transition-all ${
                isActive
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {opt.label}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
