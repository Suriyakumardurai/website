"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { updateScrollState } from "@/lib/scroll-store";
import type { BgVariant } from "@/components/three/data-stream-bg";

const DataStreamBackground = dynamic(() => import("@/components/three/data-stream-bg"), {
  ssr: false,
});

/** Map pathname → background variant so each page feels distinct */
function variantForPath(pathname: string): BgVariant {
  if (pathname.startsWith("/services")) return "services";
  if (pathname.startsWith("/process")) return "process";
  if (pathname.startsWith("/case-studies")) return "case-studies";
  if (pathname.startsWith("/pricing")) return "pricing";
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/careers")) return "careers";
  if (pathname.startsWith("/blog")) return "blog";
  if (pathname.startsWith("/faq")) return "faq";
  if (pathname.startsWith("/contact")) return "contact";
  return "home";
}

export default function GlobalBackground() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const pathname = usePathname();
  const variant = variantForPath(pathname);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (!raf)
        raf = requestAnimationFrame(() => {
          updateScrollState();
          raf = 0;
        });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateScrollState();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Ambient 3D data streams — variant per page */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 opacity-60">
          {/* key forces remount on route change so the new variant's camera/seed takes effect */}
          <DataStreamBackground key={variant} variant={variant} />
        </div>
        {/* Light scrim for content readability on white theme */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.55) 60%, rgba(255,255,255,0.8) 100%)",
          }}
        />
      </div>

      {/* Scroll progress bar — lime, glowing */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left lime-bg"
        style={{ scaleX: progress, boxShadow: "0 0 12px 0 rgba(132,204,22,0.6)" }}
      />
    </>
  );
}
