"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Check, Copy, X, Twitter, Linkedin, Mail, MessageCircle } from "lucide-react";

/**
 * Mobile-only native share button.
 *
 * Uses the Web Share API on supported devices (iOS Safari, Android Chrome).
 * Falls back to a custom share sheet with copy-link + social links on desktop
 * browsers that don't support navigator.share.
 *
 * Props:
 *  - title: shared text title
 *  - text: shared text body
 *  - url: URL to share (defaults to current page)
 *  - variant: "fab" (floating pill) | "icon" (just the icon) | "pill" (small button)
 *
 * Desktop (lg+) renders nothing — share is mobile-only.
 */

type Props = {
  title: string;
  text?: string;
  url?: string;
  variant?: "fab" | "icon" | "pill";
  className?: string;
};

export default function MobileShare({
  title,
  text,
  url,
  variant = "icon",
  className = "",
}: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = url ?? (typeof window !== "undefined" ? window.location.href : "https://autoplanetcorp.com");
  const shareText = text ?? title;

  const handleShare = async () => {
    // Try native Web Share API first
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({
          title,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch {
        // User cancelled or share failed — fall through to custom sheet
      }
    }
    // Fallback: open custom share sheet
    setOpen(true);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const socialLinks = [
    {
      icon: Twitter,
      label: "X",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      color: "text-foreground",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: "text-foreground",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
      color: "text-foreground",
    },
    {
      icon: Mail,
      label: "Email",
      href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareText + "\n\n" + shareUrl)}`,
      color: "text-foreground",
    },
  ];

  const baseClasses =
    variant === "fab"
      ? "m-press flex items-center gap-2 h-10 rounded-full m-glass px-4 shadow-[0_8px_24px_-8px_rgba(13,13,21,0.24)]"
      : variant === "pill"
      ? "m-press inline-flex items-center gap-1.5 h-9 rounded-full m-chip px-3 text-xs font-medium"
      : "m-press m-tap flex items-center justify-center h-9 w-9 rounded-full m-chip";

  return (
    <>
      <button
        onClick={handleShare}
        aria-label={`Share: ${title}`}
        className={`lg:hidden ${baseClasses} ${className}`}
      >
        <Share2 className={variant === "icon" ? "h-4 w-4" : "h-3.5 w-3.5"} />
        {variant !== "icon" && (
          <span className="text-xs font-medium">Share</span>
        )}
      </button>

      {/* Custom share sheet fallback */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden fixed inset-0 z-[60] bg-foreground/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden fixed bottom-0 left-0 right-0 z-[61] rounded-t-3xl bg-background safe-pb"
              style={{
                boxShadow: "0 -24px 60px -20px rgba(13,13,21,0.32)",
              }}
            >
              <div className="m-drag-handle" />
              <div className="px-5 pt-3 pb-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] lime-text mb-1">
                      <Share2 className="inline h-3 w-3 mr-1" />
                      Share
                    </p>
                    <h2 className="text-lg font-semibold tracking-tight leading-tight line-clamp-2">
                      {title}
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

                {/* Social links grid */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {socialLinks.map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <motion.a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * i + 0.1, duration: 0.3 }}
                        className="flex flex-col items-center gap-2 p-3 rounded-2xl m-card-flat m-press"
                      >
                        <span className="h-9 w-9 rounded-full bg-foreground text-background flex items-center justify-center">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="text-[10px] font-medium">{s.label}</span>
                      </motion.a>
                    );
                  })}
                </div>

                {/* Copy link */}
                <button
                  onClick={copyLink}
                  className="w-full flex items-center justify-between rounded-2xl m-card-flat p-3.5 m-press"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="h-9 w-9 rounded-full bg-foreground text-background flex items-center justify-center shrink-0">
                      {copied ? <Check className="h-4 w-4 lime-text" /> : <Copy className="h-4 w-4" />}
                    </span>
                    <div className="min-w-0 text-left">
                      <div className="text-xs font-semibold">
                        {copied ? "Copied!" : "Copy link"}
                      </div>
                      <div className="text-[10px] text-muted-foreground truncate font-mono">
                        {shareUrl}
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
