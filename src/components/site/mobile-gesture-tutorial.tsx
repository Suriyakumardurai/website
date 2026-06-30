"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Hand,
  ArrowLeft,
  RefreshCw,
  Search,
  LayoutGrid,
  X,
  ArrowRight,
} from "lucide-react";

/**
 * Mobile-only Gesture Tutorial.
 *
 * A 4-card swipeable tutorial that teaches users about mobile gestures.
 * Triggered from a "Gestures" button in the menu sheet (or auto-shows once).
 * Persists "seen" state to localStorage.
 *
 * Gestures covered:
 *  1. Swipe from left edge → go back
 *  2. Pull down at top → refresh
 *  3. Long-press logo → search
 *  4. Swipe testimonials horizontally → carousel
 *
 * Desktop (lg+) renders nothing.
 */

const STORAGE_KEY = "apc_gesture_tutorial_seen";

type GestureCard = {
  id: string;
  icon: typeof Hand;
  title: string;
  desc: string;
  animation: "swipe-right" | "pull-down" | "long-press" | "swipe-left";
};

const GESTURES: GestureCard[] = [
  {
    id: "back",
    icon: ArrowLeft,
    title: "Swipe to go back",
    desc: "Swipe from the left edge of the screen to the right to navigate back. A floating arrow follows your finger.",
    animation: "swipe-right",
  },
  {
    id: "refresh",
    icon: RefreshCw,
    title: "Pull to refresh",
    desc: "When at the top of the home page, pull down to refresh the content. Release past the threshold to trigger.",
    animation: "pull-down",
  },
  {
    id: "search",
    icon: Search,
    title: "Long-press to search",
    desc: "Long-press the AutoPlanet logo (top-left) for 0.6s to open the command palette with fuzzy search across all pages and services.",
    animation: "long-press",
  },
  {
    id: "carousel",
    icon: LayoutGrid,
    title: "Swipe to browse",
    desc: "Swipe left/right on testimonials, capabilities, and pricing tiers to browse horizontally. Tap the dots to jump.",
    animation: "swipe-left",
  },
];

export default function MobileGestureTutorial() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  // Expose a global trigger so the menu sheet can open it
  useEffect(() => {
    (window as unknown as { __openGestureTutorial?: () => void }).__openGestureTutorial = () => {
      setOpen(true);
      setStep(0);
    };
    return () => {
      delete (window as unknown as { __openGestureTutorial?: () => void }).__openGestureTutorial;
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

  const close = () => {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
  };

  const current = GESTURES[step];
  const isLast = step === GESTURES.length - 1;
  const Icon = current.icon;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-0 z-[85] bg-foreground/70 backdrop-blur-md"
            onClick={close}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed bottom-0 left-0 right-0 z-[86] rounded-t-3xl bg-background safe-pb"
            style={{
              boxShadow: "0 -24px 60px -20px rgba(13,13,21,0.4)",
            }}
          >
            <div className="m-drag-handle" />
            <div className="px-5 pt-3 pb-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.25em] lime-text mb-1">
                    <Hand className="inline h-3 w-3 mr-1" />
                    Gestures
                  </p>
                  <h2 className="text-xl font-semibold tracking-tight leading-tight">
                    {current.title}
                  </h2>
                </div>
                <button
                  onClick={close}
                  className="m-tap m-press h-10 w-10 rounded-full m-chip flex items-center justify-center shrink-0"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Animation area */}
              <div className="relative h-44 rounded-2xl m-card-flat overflow-hidden mb-5 flex items-center justify-center">
                <GestureAnimation type={current.animation} icon={Icon} />
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {current.desc}
              </p>

              {/* Progress dots */}
              <div className="flex items-center justify-center gap-1.5 mb-4">
                {GESTURES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setStep(i)}
                    aria-label={`Go to gesture ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all m-press ${
                      i === step ? "w-6 lime-bg" : "w-1.5 bg-foreground/20"
                    }`}
                  />
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => setStep(Math.max(0, step - 1))}
                  disabled={step === 0}
                  className="inline-flex items-center gap-1 h-10 px-4 rounded-full m-chip text-xs font-medium m-press disabled:opacity-30 disabled:pointer-events-none"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Prev
                </button>
                <span className="text-[10px] font-mono text-muted-foreground">
                  {String(step + 1).padStart(2, "0")} / {String(GESTURES.length).padStart(2, "0")}
                </span>
                <button
                  onClick={() => (isLast ? close() : setStep(step + 1))}
                  className="inline-flex items-center gap-1 h-10 px-4 rounded-full bg-foreground text-background text-xs font-semibold m-press"
                >
                  {isLast ? "Done" : "Next"}
                  {!isLast && <ArrowRight className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function GestureAnimation({
  type,
  icon: Icon,
}: {
  type: GestureCard["animation"];
  icon: typeof Hand;
}) {
  if (type === "swipe-right") {
    return (
      <div className="relative w-full h-full flex items-center">
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: [0, 80, 0], opacity: [0, 1, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-8 flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background"
        >
          <ArrowLeft className="h-5 w-5 text-lime-400" />
        </motion.div>
        {/* edge highlight */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-0 top-0 bottom-0 w-1 lime-bg"
        />
      </div>
    );
  }

  if (type === "pull-down") {
    return (
      <div className="relative w-full h-full flex items-start justify-center pt-4">
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: [0, 60, 0], opacity: [0, 1, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background"
        >
          <RefreshCw className="h-5 w-5 text-lime-400" />
        </motion.div>
      </div>
    );
  }

  if (type === "long-press") {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 0.92, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", times: [0, 0.6, 1] }}
          className="flex h-14 w-14 items-center justify-center rounded-xl bg-foreground text-background"
        >
          <Icon className="h-6 w-6 text-lime-400" />
        </motion.div>
        {/* pulse rings */}
        <motion.div
          animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          className="absolute h-14 w-14 rounded-xl border-2 border-lime-400"
        />
      </div>
    );
  }

  if (type === "swipe-left") {
    return (
      <div className="relative w-full h-full flex items-center justify-center gap-2">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: [-20, 20, -20] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex gap-2"
        >
          <div className="h-16 w-24 rounded-xl bg-foreground/10 border border-border" />
          <div className="h-16 w-24 rounded-xl bg-foreground text-background flex items-center justify-center">
            <LayoutGrid className="h-6 w-6 text-lime-400" />
          </div>
          <div className="h-16 w-24 rounded-xl bg-foreground/10 border border-border" />
        </motion.div>
      </div>
    );
  }

  return null;
}
