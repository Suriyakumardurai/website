"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, ThumbsUp, ThumbsDown, Send, Heart, Star } from "lucide-react";

/**
 * Mobile-only Feedback Widget.
 *
 * A small floating feedback button (bottom-left, above section nav).
 * Tapping opens a slide-up sheet with:
 *  - Quick reaction (👍 / 👎 / ❤️ / ⭐)
 *  - Optional comment text field
 *  - Submit button
 *
 * Feedback is saved to localStorage (no backend) and shows a thank-you toast.
 * After submitting, the widget hides for 24 hours.
 *
 * Desktop (lg+) renders nothing.
 */

const STORAGE_KEY = "apc_feedback_submitted";
const HIDE_HOURS = 24;

type Reaction = "thumbs-up" | "thumbs-down" | "heart" | "star";

function isRecentlySubmitted(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const ts = localStorage.getItem(STORAGE_KEY);
    if (!ts) return false;
    const hoursSince = (Date.now() - parseInt(ts, 10)) / (1000 * 60 * 60);
    return hoursSince < HIDE_HOURS;
  } catch {
    return false;
  }
}

function markSubmitted() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
  } catch {
    // ignore
  }
}

export default function MobileFeedback() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [reaction, setReaction] = useState<Reaction | null>(null);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    // Only show if not recently submitted + after 5s delay
    if (isRecentlySubmitted()) return;
    const t = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(t);
  }, []);

  // Lock body scroll when sheet is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  const reactions: { value: Reaction; icon: typeof ThumbsUp; label: string; color: string }[] = [
    { value: "thumbs-up", icon: ThumbsUp, label: "Good", color: "lime-text" },
    { value: "heart", icon: Heart, label: "Love", color: "lime-text" },
    { value: "star", icon: Star, label: "Great", color: "lime-text" },
    { value: "thumbs-down", icon: ThumbsDown, label: "Meh", color: "text-muted-foreground" },
  ];

  const handleSubmit = () => {
    if (!reaction) return;
    markSubmitted();
    setSubmitted(true);
    setShowThankYou(true);
    setTimeout(() => {
      setOpen(false);
      setVisible(false);
      setSubmitted(false);
      setReaction(null);
      setComment("");
    }, 1800);
  };

  return (
    <>
      {/* Floating feedback button */}
      <AnimatePresence>
        {visible && !open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setOpen(true)}
            aria-label="Share feedback"
            className="lg:hidden fixed z-40 m-press"
            style={{ bottom: "calc(var(--m-nav-h) + env(safe-area-inset-bottom) + 140px)", left: 12 }}
          >
            <span className="flex items-center justify-center h-10 w-10 rounded-full m-glass shadow-[0_4px_12px_-2px_rgba(13,13,21,0.2)]">
              <MessageCircle className="h-4 w-4 lime-text" />
              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-lime-500 border-2 border-background" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Slide-up feedback sheet */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden fixed inset-0 z-[60] bg-foreground/50 backdrop-blur-sm"
              onClick={() => !submitted && setOpen(false)}
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
                {!submitted ? (
                  <>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-5">
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-[0.25em] lime-text mb-1">
                          <MessageCircle className="inline h-3 w-3 mr-1" />
                          Feedback
                        </p>
                        <h2 className="text-xl font-semibold tracking-tight leading-tight">
                          How&apos;s the mobile experience?
                        </h2>
                        <p className="text-xs text-muted-foreground mt-1.5">
                          Your input shapes future updates.
                        </p>
                      </div>
                      <button
                        onClick={() => setOpen(false)}
                        className="m-tap m-press h-10 w-10 rounded-full m-chip flex items-center justify-center shrink-0"
                        aria-label="Close"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Reactions */}
                    <p className="text-xs font-semibold mb-2.5">Quick reaction</p>
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {reactions.map((r) => {
                        const Icon = r.icon;
                        const isSelected = reaction === r.value;
                        return (
                          <button
                            key={r.value}
                            onClick={() => setReaction(r.value)}
                            aria-label={r.label}
                            aria-pressed={isSelected}
                            className={`flex flex-col items-center gap-1.5 py-3 rounded-2xl m-press transition-all border ${
                              isSelected
                                ? "border-foreground bg-foreground text-background"
                                : "border-border m-card-flat hover:bg-muted/40"
                            }`}
                          >
                            <Icon className={`h-5 w-5 ${isSelected ? "text-lime-400" : r.color}`} />
                            <span className="text-[10px] font-medium">{r.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Comment */}
                    <p className="text-xs font-semibold mb-2">Comment (optional)</p>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Tell us more…"
                      rows={3}
                      className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-lime-500/30 resize-none"
                    />

                    {/* Submit */}
                    <button
                      onClick={handleSubmit}
                      disabled={!reaction}
                      className="mt-4 w-full flex items-center justify-center gap-1.5 h-11 rounded-full bg-foreground text-background text-sm font-semibold m-press disabled:opacity-40 disabled:pointer-events-none"
                    >
                      <Send className="h-4 w-4" />
                      Send feedback
                    </button>
                  </>
                ) : (
                  /* Thank-you state */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, ease: "backOut" }}
                      className="inline-flex h-16 w-16 rounded-full bg-lime-400 text-foreground items-center justify-center mb-4"
                    >
                      <Heart className="h-7 w-7 fill-foreground" />
                    </motion.div>
                    <h2 className="text-xl font-semibold tracking-tight mb-2">Thank you!</h2>
                    <p className="text-sm text-muted-foreground max-w-[260px] mx-auto leading-relaxed">
                      Your feedback helps us ship a better mobile experience.
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Brief thank-you toast (after sheet closes) */}
      <AnimatePresence>
        {showThankYou && (
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onAnimationComplete={() => {
              setTimeout(() => setShowThankYou(false), 2000);
            }}
            className="lg:hidden fixed left-1/2 -translate-x-1/2 z-[55]"
            style={{ bottom: "calc(var(--m-nav-h) + env(safe-area-inset-bottom) + 20px)" }}
          >
            <div className="flex items-center gap-2 rounded-full bg-foreground text-background px-4 py-2.5 shadow-lg">
              <Heart className="h-3.5 w-3.5 text-lime-400 fill-lime-400" />
              <span className="text-xs font-semibold">Thanks for your feedback!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
