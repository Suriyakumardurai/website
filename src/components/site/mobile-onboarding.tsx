"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Menu,
  Navigation,
  Calculator,
  Bookmark,
  Search,
  Moon,
  X,
  ArrowRight,
  Check,
  Hand,
  RefreshCw,
} from "lucide-react";

/**
 * Mobile-only Onboarding Tour.
 *
 * Shows on first visit (no localStorage flag) to introduce key mobile features.
 * 6-step tour with:
 *  - Animated highlight pointing to each feature
 *  - Skip / Next / Done buttons
 *  - Progress dots
 *  - Remembers completion in localStorage (never shows again)
 *
 * Desktop (lg+) renders nothing.
 */

const STORAGE_KEY = "apc_onboarding_complete";
const STORAGE_SKIP = "apc_onboarding_skipped";

type Step = {
  id: string;
  icon: typeof Menu;
  title: string;
  desc: string;
  highlight?: string; // CSS selector to highlight
  position: "center" | "top" | "bottom";
};

const STEPS: Step[] = [
  {
    id: "welcome",
    icon: Sparkles,
    title: "Welcome to AutoPlanet mobile",
    desc: "A completely redesigned mobile experience. Let's take a 30-second tour of what's new.",
    position: "center",
  },
  {
    id: "menu",
    icon: Menu,
    title: "Slide-up menu",
    desc: "Tap the Menu button (top-right or bottom tab) to access all pages, recently viewed, bookmarks, and theme settings.",
    position: "top",
  },
  {
    id: "nav",
    icon: Navigation,
    title: "Bottom tab navigation",
    desc: "Quick switch between Home, Services, Pricing, Contact, and Menu — always at your fingertips.",
    position: "bottom",
  },
  {
    id: "quote",
    icon: Calculator,
    title: "Quick Quote Calculator",
    desc: "On the Pricing page, get an instant cost estimate in 3 taps. Your quotes are saved to history.",
    position: "center",
  },
  {
    id: "gestures",
    icon: Hand,
    title: "Swipe gestures",
    desc: "Swipe left-edge to go back. Pull down at top to refresh. Long-press the logo to search. Swipe testimonials horizontally.",
    position: "center",
  },
  {
    id: "theme",
    icon: Moon,
    title: "Dark mode & more",
    desc: "Open the menu to toggle dark mode, bookmark pages, share content, and send feedback. Enjoy!",
    position: "center",
  },
];

export default function MobileOnboarding() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Only show on home page + only on first visit
    if (pathname !== "/") return;
    try {
      const completed = localStorage.getItem(STORAGE_KEY);
      const skipped = localStorage.getItem(STORAGE_SKIP);
      if (completed || skipped) return;
    } catch {
      return;
    }
    // Show after 1.5s delay (let the page settle)
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, [pathname]);

  // Expose a global trigger for "Replay tour" button
  useEffect(() => {
    (window as unknown as { __replayOnboarding?: () => void }).__replayOnboarding = () => {
      setStep(0);
      setVisible(true);
    };
    return () => {
      delete (window as unknown as { __replayOnboarding?: () => void }).__replayOnboarding;
    };
  }, []);

  // Lock body scroll when visible
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [visible]);

  if (!mounted) return null;

  const finish = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    setVisible(false);
    setStep(0);
  };

  const skip = () => {
    try {
      localStorage.setItem(STORAGE_SKIP, "1");
    } catch {
      // ignore
    }
    setVisible(false);
    setStep(0);
  };

  const next = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      finish();
    }
  };

  const currentStep = STEPS[step];
  const isLast = step === STEPS.length - 1;
  const Icon = currentStep.icon;

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 z-[90] bg-foreground/70 backdrop-blur-md"
            onClick={skip}
          />

          {/* Tour card */}
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={`lg:hidden fixed left-4 right-4 z-[91] ${
              currentStep.position === "bottom"
                ? "bottom-24"
                : currentStep.position === "top"
                ? "top-20"
                : "top-1/2 -translate-y-1/2"
            }`}
          >
            <div className="rounded-3xl bg-background p-5 relative overflow-hidden shadow-[0_24px_60px_-20px_rgba(13,13,21,0.5)]">
              {/* Lime glow */}
              <div
                aria-hidden
                className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-lime-400/15 blur-3xl pointer-events-none"
              />

              {/* Skip button */}
              <button
                onClick={skip}
                className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors z-10"
                aria-label="Skip tour"
              >
                Skip
              </button>

              {/* Step counter */}
              <div className="relative flex items-center gap-2 mb-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] lime-text">
                  {String(step + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
                </span>
                <div className="flex-1 flex items-center gap-1">
                  {STEPS.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1 rounded-full transition-all ${
                        i === step ? "w-6 lime-bg" : i < step ? "w-1.5 bg-foreground/40" : "w-1.5 bg-foreground/15"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: "backOut" }}
                className="relative inline-flex h-14 w-14 rounded-2xl bg-foreground text-background items-center justify-center mb-4"
              >
                <Icon className="h-7 w-7 text-lime-400" />
              </motion.div>

              {/* Title + desc */}
              <h2 className="relative text-xl font-semibold tracking-tight leading-tight mb-2">
                {currentStep.title}
              </h2>
              <p className="relative text-sm text-muted-foreground leading-relaxed">
                {currentStep.desc}
              </p>

              {/* Actions */}
              <div className="relative mt-5 flex items-center justify-between gap-2">
                <button
                  onClick={skip}
                  className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors m-press"
                >
                  Skip tour
                </button>
                <button
                  onClick={next}
                  className="inline-flex items-center gap-1.5 h-10 px-5 rounded-full bg-foreground text-background text-xs font-semibold m-press"
                >
                  {isLast ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      Got it
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
