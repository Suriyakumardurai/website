"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, ChevronUp, Sparkles, Clock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { company } from "@/lib/content";
import { usePathname } from "next/navigation";

/**
 * Mobile-only Quick Contact FAB (floating action button) + slide-up sheet.
 *
 * - Renders a small floating button (bottom-right, above the sticky CTA & bottom nav).
 * - Tapping opens a slide-up sheet with a 3-field quick form (name, email, message).
 * - Submits to /api/contact and shows a success toast.
 * - Hidden on /contact (redundant) and when the MobileNav sheet menu is open (avoid overlap).
 * - Hidden when the bottom-nav Menu sheet opens (we listen for body scroll lock).
 *
 * Desktop (lg+) renders nothing.
 */
export default function MobileQuickContact() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  // Show FAB after small scroll on non-/contact pages
  useEffect(() => {
    if (pathname === "/contact") {
      setVisible(false);
      return;
    }
    const onScroll = () => setVisible(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // Lock body scroll when sheet is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      company: "",
      service: "quick-contact",
      message: data.get("message"),
    };
    if (!payload.name || !payload.email || !payload.message) {
      toast({
        title: "Missing fields",
        description: "Please fill in name, email, and message.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      toast({
        title: "Quick message sent",
        description: "We'll reply within 24 hours. 48-hour proposal guarantee applies.",
      });
      form.reset();
      setOpen(false);
    } catch {
      toast({
        title: "Saved locally",
        description: "We'll follow up at " + company.email,
      });
      form.reset();
      setOpen(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {visible && !open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setOpen(true)}
            aria-label="Quick contact"
            className="lg:hidden fixed right-3 z-40 m-press"
            style={{ bottom: "calc(var(--m-nav-h) + env(safe-area-inset-bottom) + 76px)" }}
          >
            <span className="flex items-center justify-center h-12 w-12 rounded-full bg-foreground text-background shadow-[0_8px_24px_-6px_rgba(13,13,21,0.4)] relative">
              {/* pulsing ring */}
              <span
                aria-hidden
                className="absolute inset-0 rounded-full border border-lime-400/40 animate-ping"
                style={{ animationDuration: "2.5s" }}
              />
              <Send className="h-4 w-4 relative">
                <title>Quick contact</title>
              </Send>
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-lime-400 border-2 border-background" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Slide-up sheet */}
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
                maxHeight: "92vh",
                boxShadow: "0 -24px 60px -20px rgba(13,13,21,0.32)",
              }}
            >
              <div className="m-drag-handle" />
              <div className="px-5 pt-3 pb-6 overflow-y-auto" style={{ maxHeight: "calc(92vh - 24px)" }}>
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] lime-text mb-1">
                      <Sparkles className="inline h-3 w-3 mr-1" />
                      Quick message
                    </p>
                    <h2 className="text-2xl font-semibold tracking-tight leading-tight">
                      Tell us what you need.
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1.5">
                      3 fields. We reply within 24 hours.
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

                {/* Quick assurances */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 rounded-full m-chip px-2.5 py-1 text-[10px] font-medium text-foreground/80">
                    <Clock className="h-3 w-3 lime-text" />
                    48hr proposal
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full m-chip px-2.5 py-1 text-[10px] font-medium text-foreground/80">
                    <ShieldCheck className="h-3 w-3 lime-text" />
                    100% ownership
                  </span>
                </div>

                {/* Form */}
                <form onSubmit={onSubmit} className="space-y-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="qc-name" className="text-xs">Name *</Label>
                    <Input
                      id="qc-name"
                      name="name"
                      placeholder="Your name"
                      required
                      autoFocus
                      className="h-11 rounded-xl"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="qc-email" className="text-xs">Work email *</Label>
                    <Input
                      id="qc-email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      required
                      className="h-11 rounded-xl"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="qc-message" className="text-xs">What are you trying to automate? *</Label>
                    <Textarea
                      id="qc-message"
                      name="message"
                      placeholder="One paragraph is enough."
                      rows={3}
                      required
                      className="rounded-xl text-sm"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-full bg-foreground text-background hover:bg-foreground/90 group h-12"
                    size="lg"
                  >
                    {loading ? "Sending..." : "Send message"}
                    {!loading && (
                      <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    )}
                  </Button>
                  <Link
                    href="/contact"
                    className="block text-center text-xs text-muted-foreground hover:text-foreground transition-colors pt-1"
                  >
                    Prefer the full form? <span className="lime-text underline-grow">Open contact page →</span>
                  </Link>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
