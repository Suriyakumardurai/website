"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Home, LayoutGrid, IndianRupee, Phone, Menu, X, ArrowRight, Sparkles, Hand, Search, RotateCcw } from "lucide-react";
import { company } from "@/lib/content";
import MobileRecentlyViewed, { useRecentlyViewedTracker } from "@/components/site/mobile-recently-viewed";
import MobileBookmarkList from "@/components/site/mobile-bookmarks";
import MobileContentBookmarks from "@/components/site/mobile-content-bookmarks";
import MobileCustomShortcuts from "@/components/site/mobile-custom-shortcuts";
import { useHaptic } from "@/hooks/use-haptic";

/**
 * Mobile-only top brand strip + bottom tab bar navigation.
 *
 * - Replaces the desktop `Navbar` on screens below `lg`.
 * - Top strip: minimal logo + menu button, glass background, hides on scroll-down, reappears on scroll-up.
 * - Bottom tab bar: 5 fixed tabs with haptic-style press + active glow.
 * - Full-screen slide-up sheet menu with staggered nav links and CTA.
 *
 * Desktop (lg+) renders nothing — the original `Navbar` takes over.
 */
export default function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const haptic = useHaptic();
  const pressTimerRef = useRef<number | null>(null);
  // Track every route change into localStorage for the "Recently viewed" feature
  useRecentlyViewedTracker();

  // Expose global trigger for opening the menu (used by Quick Actions)
  useEffect(() => {
    (window as unknown as { __openMobileMenu?: () => void }).__openMobileMenu = () => setOpen(true);
    return () => {
      delete (window as unknown as { __openMobileMenu?: () => void }).__openMobileMenu;
    };
  }, []);

  // Hide-on-scroll-down / show-on-scroll-up behavior for the top strip
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      // Don't hide until past 200px so the hero doesn't flicker
      if (y > 200 && y > lastY + 8) setHidden(true);
      else if (y < lastY - 8) setHidden(false);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

  // Close sheet on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const tabs = [
    { icon: Home, label: "Home", href: "/" },
    { icon: LayoutGrid, label: "Services", href: "/services" },
    { icon: IndianRupee, label: "Pricing", href: "/pricing" },
    { icon: Phone, label: "Contact", href: "/contact" },
    { icon: Menu, label: "Menu", href: "#menu", onClick: () => setOpen(true) },
  ];

  const menuLinks = [
    { label: "Services", href: "/services", desc: "14 AI capabilities" },
    { label: "Process", href: "/process", desc: "How we ship" },
    { label: "Pricing", href: "/pricing", desc: "Fixed-price only" },
    { label: "About", href: "/about", desc: "AI-native team" },
    { label: "Careers", href: "/careers", desc: "Open roles" },
    { label: "FAQ", href: "/faq", desc: "Answers" },
    { label: "Contact", href: "/contact", desc: "Book a call" },
  ];

  return (
    <>
      {/* Reading progress bar — fixed at very top, always visible (even when top strip auto-hides) */}
      <motion.div
        aria-hidden
        className="lg:hidden fixed top-0 left-0 right-0 h-[3px] z-[55] origin-left lime-bg safe-pt"
        style={{ scaleX: progress, boxShadow: "0 0 10px 0 rgba(132,204,22,0.6)" }}
      />

      {/* ── Mobile top strip ── */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: hidden ? -110 : 0 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className={`lg:hidden fixed top-0 left-0 right-0 z-50 safe-pt transition-colors duration-300 ${
          scrolled ? "m-glass border-b border-border/60" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between h-14 safe-px">
          <Link href="/" className="flex items-center gap-2.5 m-press" aria-label="AutoPlanet home">
            <div className="relative h-8 w-8 rounded-lg overflow-hidden ring-1 ring-border/50">
              <img
                src="/autoplanet-logo.png"
                alt="AutoPlanet Corporation logo"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[13px] font-semibold tracking-tight text-foreground">
                AutoPlanet
              </span>
              <span className="text-[8px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                AI · Engineered
              </span>
            </div>
          </Link>

          <button
            onClick={() => { haptic("light"); setOpen(true); }}
            className="m-tap m-press flex items-center gap-1.5 px-3 h-9 rounded-full m-chip text-foreground"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
            <span className="text-xs font-medium">Menu</span>
          </button>
        </div>
      </motion.div>

      {/* ── Bottom tab bar (native-app feel) ── */}
      <nav
        aria-label="Mobile primary"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 safe-pb"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.98))",
          backdropFilter: "blur(20px) saturate(1.2)",
          WebkitBackdropFilter: "blur(20px) saturate(1.2)",
          borderTop: "1px solid oklch(0.92 0 0)",
          boxShadow: "0 -8px 32px -16px rgba(13,13,21,0.12)",
        }}
      >
        <div className="grid grid-cols-5 h-16 max-w-md mx-auto">
          {tabs.map((t) => {
            const isActive = t.href === pathname || (t.href !== "/" && pathname.startsWith(t.href));
            const Icon = t.icon;
            if (t.onClick) {
              return (
                <button
                  key={t.label}
                  onClick={() => { haptic("light"); t.onClick?.(); }}
                  className="m-tap m-press flex flex-col items-center justify-center gap-0.5 text-muted-foreground active:text-foreground"
                  aria-label={t.label}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-[10px] font-medium tracking-tight">{t.label}</span>
                </button>
              );
            }
            // Long-press detection for quick actions
            const tabId = t.href === "/" ? "home" : t.href === "/services" ? "services" : t.href === "/pricing" ? "pricing" : t.href === "/contact" ? "contact" : null;
            const handlePressStart = () => {
              if (!tabId) return;
              pressTimerRef.current = window.setTimeout(() => {
                haptic("medium");
                (window as unknown as { __openQuickActions?: (tab: string) => void }).__openQuickActions?.(tabId);
              }, 500);
            };
            const handlePressEnd = () => {
              if (pressTimerRef.current) {
                clearTimeout(pressTimerRef.current);
                pressTimerRef.current = null;
              }
            };
            return (
              <Link
                key={t.label}
                href={t.href}
                onTouchStart={handlePressStart}
                onTouchEnd={handlePressEnd}
                onTouchMove={handlePressEnd}
                onMouseDown={handlePressStart}
                onMouseUp={handlePressEnd}
                onMouseLeave={handlePressEnd}
                className="m-tap m-press flex flex-col items-center justify-center gap-0.5 relative"
                aria-label={t.label}
                aria-current={isActive ? "page" : undefined}
              >
                <span
                  className={`flex h-7 w-12 items-center justify-center rounded-full transition-all ${
                    isActive ? "m-nav-glow bg-foreground text-background" : "text-muted-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span
                  className={`text-[10px] font-medium tracking-tight transition-colors ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {t.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ── Full-screen slide-up menu sheet ── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden fixed inset-0 z-[60] bg-foreground/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden fixed bottom-0 left-0 right-0 z-[61] rounded-t-3xl bg-background safe-pb"
              style={{
                maxHeight: "88vh",
                boxShadow: "0 -24px 60px -20px rgba(13,13,21,0.32)",
              }}
            >
              <div className="m-drag-handle" />
              <div className="px-5 pt-3 pb-6 overflow-y-auto" style={{ maxHeight: "calc(88vh - 24px)" }}>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] lime-text">
                      Navigate
                    </p>
                    <h2 className="text-2xl font-semibold tracking-tight mt-1">
                      Where to?
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        haptic("light");
                        setOpen(false);
                        setTimeout(() => {
                          (window as unknown as { __openContentSearch?: () => void }).__openContentSearch?.();
                        }, 350);
                      }}
                      className="m-tap m-press h-9 px-3 rounded-full m-chip flex items-center gap-1.5 text-[10px] font-medium text-foreground/80"
                      aria-label="Search this page"
                    >
                      <Search className="h-3.5 w-3.5 lime-text" />
                      Find
                    </button>
                    <button
                      onClick={() => {
                        haptic("light");
                        setOpen(false);
                        setTimeout(() => {
                          (window as unknown as { __openGestureTutorial?: () => void }).__openGestureTutorial?.();
                        }, 350);
                      }}
                      className="m-tap m-press h-9 px-3 rounded-full m-chip flex items-center gap-1.5 text-[10px] font-medium text-foreground/80"
                      aria-label="Open gesture tutorial"
                    >
                      <Hand className="h-3.5 w-3.5 lime-text" />
                      Gestures
                    </button>
                    <button
                      onClick={() => setOpen(false)}
                      className="m-tap m-press h-10 w-10 rounded-full m-chip flex items-center justify-center"
                      aria-label="Close menu"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Links — staggered, large touch targets */}
                <div className="space-y-2">
                  {menuLinks.map((l, i) => {
                    const active = pathname === l.href;
                    return (
                      <motion.div
                        key={l.href}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.04 * i + 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Link
                          href={l.href}
                          className={`flex items-center justify-between rounded-2xl px-4 py-4 m-press transition-colors ${
                            active ? "bg-foreground text-background" : "m-card-flat hover:bg-muted/60"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`font-mono text-[10px] ${
                                active ? "text-background/60" : "text-muted-foreground/60"
                              }`}
                            >
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <div>
                              <div className="text-base font-semibold tracking-tight">{l.label}</div>
                              <div
                                className={`text-[11px] ${
                                  active ? "text-background/60" : "text-muted-foreground"
                                }`}
                              >
                                {l.desc}
                              </div>
                            </div>
                          </div>
                          <ArrowRight
                            className={`h-4 w-4 ${active ? "text-background" : "text-muted-foreground"}`}
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Recently viewed chips */}
                <MobileRecentlyViewed />

                {/* Bookmarks list */}
                <MobileBookmarkList />



                {/* Custom shortcuts */}
                <MobileCustomShortcuts />

                {/* CTA card */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * menuLinks.length + 0.1, duration: 0.4 }}
                  className="mt-5 rounded-2xl bg-foreground text-background p-5 relative overflow-hidden"
                >
                  <div
                    aria-hidden
                    className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-lime-400/20 blur-2xl"
                  />
                  <div className="relative flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-lime-400 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm">Start a project</p>
                      <p className="text-xs text-background/70 mt-1 leading-relaxed">
                        48-hour proposal guarantee. Or your next sprint is free.
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/contact"
                    className="relative mt-4 flex items-center justify-center gap-2 h-11 rounded-full bg-lime-400 text-foreground font-semibold text-sm m-press"
                  >
                    Book a discovery call
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <p className="relative text-center text-[10px] text-background/50 mt-3 font-mono">
                    {company.email}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
