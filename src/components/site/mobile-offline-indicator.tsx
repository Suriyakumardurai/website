"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WifiOff, Wifi, CloudOff, RefreshCw } from "lucide-react";

/**
 * Mobile-only Offline Indicator.
 *
 * Monitors navigator.onLine + online/offline events.
 * Shows a sticky banner at the top when the network is lost.
 * Shows a brief "Back online" toast when connection restores.
 *
 * Desktop (lg+) renders nothing — the site is desktop-first and
 * less likely to lose connectivity mid-session.
 */

export default function MobileOfflineIndicator() {
  const [online, setOnline] = useState(true);
  const [wasOffline, setWasOffline] = useState(false);
  const [showBackOnline, setShowBackOnline] = useState(false);

  useEffect(() => {
    // Initialize from navigator
    setOnline(navigator.onLine);

    const onOnline = () => {
      setOnline(true);
      if (wasOffline) {
        setShowBackOnline(true);
        setTimeout(() => setShowBackOnline(false), 3000);
      }
      setWasOffline(false);
    };
    const onOffline = () => {
      setOnline(false);
      setWasOffline(true);
    };

    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, [wasOffline]);

  return (
    <>
      {/* Offline banner — sticky at top */}
      <AnimatePresence>
        {!online && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed top-0 left-0 right-0 z-[80] safe-pt"
            style={{
              background: "linear-gradient(180deg, oklch(0.58 0.22 27) 0%, oklch(0.52 0.2 27) 100%)",
              boxShadow: "0 4px 20px -4px rgba(0,0,0,0.3)",
            }}
          >
            <div className="safe-px py-2.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 text-white">
                <div className="relative">
                  <WifiOff className="h-4 w-4" />
                  <span
                    className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-white/80 animate-ping"
                    style={{ animationDuration: "1.5s" }}
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold">You&apos;re offline</p>
                  <p className="text-[10px] text-white/70">Some features may be unavailable</p>
                </div>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full bg-white/15 text-white text-[10px] font-medium m-press"
              >
                <RefreshCw className="h-3 w-3" />
                Retry
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back online toast — brief celebration */}
      <AnimatePresence>
        {showBackOnline && online && (
          <motion.div
            initial={{ y: -40, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -40, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed top-14 left-1/2 -translate-x-1/2 z-[80]"
          >
            <div
              className="flex items-center gap-2 rounded-full px-4 py-2 shadow-lg"
              style={{
                background: "linear-gradient(135deg, oklch(0.7 0.19 128) 0%, oklch(0.65 0.18 128) 100%)",
                color: "oklch(0.13 0.005 264)",
              }}
            >
              <Wifi className="h-3.5 w-3.5" />
              <span className="text-xs font-semibold">Back online</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
