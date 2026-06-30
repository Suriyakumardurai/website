"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Smartphone, Sparkles } from "lucide-react";

/**
 * Mobile-only PWA Install Prompt.
 *
 * Captures the `beforeinstallprompt` event and shows a custom install
 * banner at the bottom of the screen (above the bottom nav).
 * If the user dismisses it, remembers the choice for 7 days.
 *
 * Desktop (lg+) renders nothing — desktop users are less likely to install
 * and the original desktop design should not be interrupted.
 */

const DISMISS_KEY = "apc_pwa_install_dismissed";
const DISMISS_DAYS = 7;

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function isDismissed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const ts = localStorage.getItem(DISMISS_KEY);
    if (!ts) return false;
    const dismissedAt = parseInt(ts, 10);
    const daysSince = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);
    return daysSince < DISMISS_DAYS;
  } catch {
    return false;
  }
}

function setDismissed() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
  } catch {
    // ignore
  }
}

export default function MobilePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [installing, setInstalling] = useState(false);

  useEffect(() => {
    // Only show if not previously dismissed
    if (isDismissed()) return;

    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show after 3 seconds (don't interrupt immediately)
      setTimeout(() => setVisible(true), 3000);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);

    // Hide if already installed
    const onAppInstalled = () => {
      setVisible(false);
      setDeferredPrompt(null);
    };
    window.addEventListener("appinstalled", onAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    setInstalling(true);
    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setVisible(false);
        setDeferredPrompt(null);
      } else {
        setDismissed();
        setVisible(false);
      }
    } catch {
      // ignore
    } finally {
      setInstalling(false);
    }
  };

  const handleDismiss = () => {
    setDismissed();
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="lg:hidden fixed left-3 right-3 z-50"
          style={{ bottom: "calc(var(--m-nav-h) + env(safe-area-inset-bottom) + 16px)" }}
        >
          <div className="rounded-2xl bg-foreground text-background p-4 relative overflow-hidden shadow-[0_12px_40px_-8px_rgba(13,13,21,0.5)]">
            {/* Lime glow */}
            <div
              aria-hidden
              className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-lime-400/20 blur-3xl"
            />
            {/* Dismiss button */}
            <button
              onClick={handleDismiss}
              aria-label="Dismiss install prompt"
              className="absolute top-2.5 right-2.5 m-tap m-press h-7 w-7 rounded-full bg-background/10 text-background/70 flex items-center justify-center hover:bg-background/20 hover:text-background"
            >
              <X className="h-3.5 w-3.5" />
            </button>

            <div className="relative flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-lime-400 text-foreground flex items-center justify-center shrink-0">
                <Smartphone className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0 pr-6">
                <p className="text-sm font-semibold flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-lime-400" />
                  Install AutoPlanet
                </p>
                <p className="text-[11px] text-background/70 mt-1 leading-relaxed">
                  Add to your home screen for faster access. Works offline.
                </p>
                <button
                  onClick={handleInstall}
                  disabled={installing}
                  className="mt-3 inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-lime-400 text-foreground text-xs font-semibold m-press disabled:opacity-60"
                >
                  <Download className="h-3.5 w-3.5" />
                  {installing ? "Installing…" : "Install now"}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
