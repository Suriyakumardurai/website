"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight, ArrowRight, Image as ImageIcon } from "lucide-react";
import { testimonials } from "@/lib/content";
import MobileShare from "@/components/site/mobile-share";
import MobileShareImage from "@/components/site/mobile-share-image";

/**
 * Mobile-only swipeable testimonials carousel.
 *
 * Horizontal snap-scroll with peek-card effect, dots indicator,
 * and share button on each card.
 *
 * Desktop (lg+) renders nothing.
 */

const ease = [0.22, 1, 0.36, 1] as const;

export default function MobileSwipeTestimonials() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [shareImageContent, setShareImageContent] = useState<{ quote: string; author: string; role?: string } | null>(null);
  const railRef = useRef<HTMLDivElement>(null);

  // Track active card via scroll position
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const cardWidth = rail.scrollWidth / testimonials.length;
        const idx = Math.round(rail.scrollLeft / cardWidth);
        setActiveIdx(Math.max(0, Math.min(idx, testimonials.length - 1)));
        raf = 0;
      });
    };
    rail.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      rail.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const scrollTo = (idx: number) => {
    const rail = railRef.current;
    if (!rail) return;
    const cardWidth = rail.scrollWidth / testimonials.length;
    rail.scrollTo({ left: cardWidth * idx, behavior: "smooth" });
  };

  const goPrev = () => scrollTo(Math.max(0, activeIdx - 1));
  const goNext = () => scrollTo(Math.min(testimonials.length - 1, activeIdx + 1));

  return (
    <section className="lg:hidden py-12 relative overflow-hidden">
      {/* Top decorative glow */}
      <div
        aria-hidden
        className="absolute -top-10 right-1/4 w-40 h-32 rounded-full bg-lime-400/8 blur-[60px] pointer-events-none"
      />

      <div className="safe-px relative">
        <p className="text-[10px] font-mono uppercase tracking-[0.25em] lime-text mb-2">
          In production
        </p>
        <div className="flex items-end justify-between gap-3 mb-5">
          <h2 className="text-2xl font-semibold tracking-tight leading-tight">
            Teams who refused
            <br />
            <span className="text-muted-foreground">to stay slow.</span>
          </h2>
          {/* Arrow controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={goPrev}
              disabled={activeIdx === 0}
              aria-label="Previous testimonial"
              className="m-tap m-press h-8 w-8 rounded-full m-chip flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={goNext}
              disabled={activeIdx === testimonials.length - 1}
              aria-label="Next testimonial"
              className="m-tap m-press h-8 w-8 rounded-full m-chip flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Swipe rail */}
      <div
        ref={railRef}
        className="snap-rail no-scrollbar overflow-x-auto flex gap-3 safe-px pb-2"
      >
        {testimonials.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.45, delay: i * 0.08, ease }}
            className="shrink-0 w-[85vw] max-w-[330px] snap-start rounded-3xl m-card p-5 relative"
          >
            {/* Card index badge */}
            <div className="absolute -top-2 -left-2 h-7 w-7 rounded-full bg-foreground text-background flex items-center justify-center text-[10px] font-mono font-semibold">
              {String(i + 1).padStart(2, "0")}
            </div>
            {/* Quote icon decoration */}
            <Quote className="absolute top-4 right-4 h-7 w-7 lime-text opacity-25" />

            {/* 5-star rating */}
            <div className="flex items-center gap-0.5 mb-3">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} className="h-3 w-3 fill-lime-500 text-lime-500" />
              ))}
            </div>

            <blockquote className="text-base text-foreground leading-relaxed mb-5 pr-6">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            <figcaption className="flex items-center justify-between gap-2.5 pt-3 border-t border-border">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-full bg-foreground text-background flex items-center justify-center font-semibold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-semibold">{t.name}</div>
                  <div className="text-[10px] text-muted-foreground">{t.role}</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setShareImageContent({ quote: t.quote, author: t.name, role: t.role })}
                  aria-label="Share as image"
                  className="m-tap m-press h-8 w-8 rounded-full m-card-flat flex items-center justify-center text-muted-foreground hover:text-foreground"
                >
                  <ImageIcon className="h-3.5 w-3.5" />
                </button>
                <MobileShare
                  title={`AutoPlanet testimonial — ${t.name}`}
                  text={`"${t.quote}" — ${t.name}, ${t.role}`}
                  variant="icon"
                />
              </div>
            </figcaption>
          </motion.figure>
        ))}

        {/* Trailing CTA card */}
        <Link
          href="/contact"
          className="shrink-0 w-[70vw] max-w-[260px] snap-start rounded-3xl bg-foreground text-background p-5 flex flex-col justify-between m-press relative overflow-hidden"
        >
          <div
            aria-hidden
            className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-lime-400/20 blur-2xl"
          />
          <div className="relative">
            <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-background/60 mb-2">
              Your turn
            </p>
            <p className="text-base font-semibold leading-tight">
              See what 10x feels like.
            </p>
            <p className="text-[11px] text-background/70 mt-2 leading-relaxed">
              Book a discovery call. 48-hour proposal guarantee.
            </p>
          </div>
          <div className="relative mt-4 flex items-center gap-1.5 text-sm font-semibold lime-text">
            Start a project
            <ArrowRight className="h-4 w-4" />
          </div>
        </Link>
      </div>

      {/* Dots indicator */}
      <div className="safe-px mt-4 flex items-center justify-center gap-1.5">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`h-1.5 rounded-full transition-all m-press ${
              i === activeIdx
                ? "w-6 lime-bg"
                : "w-1.5 bg-foreground/20 hover:bg-foreground/40"
            }`}
          />
        ))}
      </div>

      {/* Progress count */}
      <div className="safe-px mt-2 text-center">
        <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/70">
          {String(activeIdx + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
        </span>
      </div>

      {/* Share as image overlay */}
      {shareImageContent && (
        <MobileShareImage
          content={shareImageContent}
          onClose={() => setShareImageContent(null)}
        />
      )}
    </section>
  );
}
