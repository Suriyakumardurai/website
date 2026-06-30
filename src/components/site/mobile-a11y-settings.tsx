"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Accessibility,
  Type,
  Zap,
  Eye,
  Minus,
  Plus,
  Check,
  RotateCcw,
  Sparkles,
} from "lucide-react";

/**
 * Mobile-only Accessibility Settings.
 *
 * Three settings:
 *  1. Font size (Small / Default / Large / XLarge) — adjusts root font-size on mobile.
 *  2. Reduce motion — disables animations.
 *  3. High contrast — increases contrast ratios.
 *
 * Persists to localStorage. Applies via data attributes on <html>.
 * Renders inside the MobileNav sheet menu (below the theme toggle).
 *
 * Desktop (lg+) renders nothing.
 */

const STORAGE_KEY = "apc_mobile_a11y";

type A11ySettings = {
  fontSize: "sm" | "default" | "lg" | "xl";
  reduceMotion: boolean;
  highContrast: boolean;
};

const DEFAULT_SETTINGS: A11ySettings = {
  fontSize: "default",
  reduceMotion: false,
  highContrast: false,
};

function readSettings(): A11ySettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function writeSettings(s: A11ySettings) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    // ignore
  }
}

function applySettings(s: A11ySettings) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;

  // Font size (only on mobile via CSS)
  root.setAttribute("data-m-font", s.fontSize);

  // Reduce motion
  root.setAttribute("data-m-motion", s.reduceMotion ? "reduce" : "normal");

  // High contrast
  root.setAttribute("data-m-contrast", s.highContrast ? "high" : "normal");
}

const FONT_SIZES: { value: A11ySettings["fontSize"]; label: string; sample: string }[] = [
  { value: "sm", label: "S", sample: "Aa" },
  { value: "default", label: "M", sample: "Aa" },
  { value: "lg", label: "L", sample: "Aa" },
  { value: "xl", label: "XL", sample: "Aa" },
];

export function useA11ySettings() {
  const [settings, setSettings] = useState<A11ySettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const loaded = readSettings();
    setSettings(loaded);
    applySettings(loaded);
  }, []);

  const update = useCallback((partial: Partial<A11ySettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...partial };
      writeSettings(next);
      applySettings(next);
      return next;
    });
  }, []);

  return { settings, update };
}

export default function MobileA11ySettings() {
  const { settings, update } = useA11ySettings();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="mt-4 pt-4 border-t border-border"
    >
      <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground mb-3 flex items-center gap-1.5">
        <Accessibility className="h-3 w-3 lime-text" />
        Accessibility
      </p>

      {/* Font size */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold flex items-center gap-1.5">
            <Type className="h-3.5 w-3.5 text-muted-foreground" />
            Text size
          </p>
          <span className="text-[10px] font-mono text-muted-foreground uppercase">
            {settings.fontSize}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {FONT_SIZES.map((fs) => {
            const isActive = settings.fontSize === fs.value;
            return (
              <button
                key={fs.value}
                onClick={() => update({ fontSize: fs.value })}
                aria-label={`Set font size to ${fs.label}`}
                aria-pressed={isActive}
                className={`flex flex-col items-center gap-1 py-2.5 rounded-xl m-press transition-all border ${
                  isActive
                    ? "border-foreground bg-foreground text-background"
                    : "border-border m-card-flat hover:bg-muted/40"
                }`}
              >
                <span
                  className="font-semibold leading-none"
                  style={{
                    fontSize: fs.value === "sm" ? "11px" : fs.value === "default" ? "13px" : fs.value === "lg" ? "15px" : "17px",
                  }}
                >
                  {fs.sample}
                </span>
                <span className="text-[9px] font-medium">{fs.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Reduce motion toggle */}
      <button
        onClick={() => update({ reduceMotion: !settings.reduceMotion })}
        aria-pressed={settings.reduceMotion}
        className="w-full flex items-center justify-between rounded-2xl m-card-flat p-3 m-press mb-2"
      >
        <div className="flex items-center gap-2.5">
          <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${settings.reduceMotion ? "bg-foreground text-background" : "m-card"}`}>
            <Zap className="h-4 w-4" />
          </div>
          <div className="text-left">
            <div className="text-xs font-semibold">Reduce motion</div>
            <div className="text-[10px] text-muted-foreground">Minimize animations</div>
          </div>
        </div>
        <span
          className={`relative h-5 w-9 rounded-full transition-colors ${
            settings.reduceMotion ? "lime-bg" : "bg-foreground/15"
          }`}
        >
          <span
            className={`absolute top-0.5 h-4 w-4 rounded-full bg-background shadow-sm transition-transform ${
              settings.reduceMotion ? "translate-x-4" : "translate-x-0.5"
            }`}
          />
        </span>
      </button>

      {/* High contrast toggle */}
      <button
        onClick={() => update({ highContrast: !settings.highContrast })}
        aria-pressed={settings.highContrast}
        className="w-full flex items-center justify-between rounded-2xl m-card-flat p-3 m-press mb-2"
      >
        <div className="flex items-center gap-2.5">
          <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${settings.highContrast ? "bg-foreground text-background" : "m-card"}`}>
            <Eye className="h-4 w-4" />
          </div>
          <div className="text-left">
            <div className="text-xs font-semibold">High contrast</div>
            <div className="text-[10px] text-muted-foreground">Stronger color contrast</div>
          </div>
        </div>
        <span
          className={`relative h-5 w-9 rounded-full transition-colors ${
            settings.highContrast ? "lime-bg" : "bg-foreground/15"
          }`}
        >
          <span
            className={`absolute top-0.5 h-4 w-4 rounded-full bg-background shadow-sm transition-transform ${
              settings.highContrast ? "translate-x-4" : "translate-x-0.5"
            }`}
          />
        </span>
      </button>

      {/* Replay onboarding tour */}
      <button
        onClick={() => {
          try {
            localStorage.removeItem("apc_onboarding_complete");
            localStorage.removeItem("apc_onboarding_skipped");
          } catch {
            // ignore
          }
          // Trigger the onboarding via the global hook
          (window as unknown as { __replayOnboarding?: () => void }).__replayOnboarding?.();
        }}
        className="w-full flex items-center justify-between rounded-2xl m-card-flat p-3 m-press"
      >
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-foreground text-background flex items-center justify-center">
            <RotateCcw className="h-4 w-4 text-lime-400" />
          </div>
          <div className="text-left">
            <div className="text-xs font-semibold">Replay tour</div>
            <div className="text-[10px] text-muted-foreground">See the mobile guide again</div>
          </div>
        </div>
        <Sparkles className="h-4 w-4 lime-text" />
      </button>
    </motion.div>
  );
}
