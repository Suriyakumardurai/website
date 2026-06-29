"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

/**
 * AutoPlanet scroll-driven brand logo.
 *
 * Layout (all vertically centered in the navbar):
 *  - brand-visual (relative, fixed size) holds:
 *    - logo image (55×55, shifts X on scroll)
 *    - hidden reveal text "BUILT BEYOND" / "BETTER" centered on the logo's original spot
 *  - brand-text (ml overlap so it sits near the logo) holds:
 *    - "AUTOPLANET CORPORATION" (serif, fades out letter-by-letter)
 *    - tagline "APC AI-POWERED AUTOMATION | SOLUTIONS" (fades as unit)
 *
 * All scroll ranges are derived dynamically from the page's scrollable height
 * so shorter pages still complete the full animation.
 */

function AnimatedChar({
  char,
  scrollY,
  range,
  output,
  maxBlur,
}: {
  char: string;
  scrollY: MotionValue<number>;
  range: [number, number];
  output: [number, number];
  maxBlur: number;
}) {
  const opacity = useTransform(scrollY, range, output);
  const blurRange: [number, number] = [output[0] === 1 ? 0 : maxBlur, output[1] === 1 ? 0 : maxBlur];
  const blur = useTransform(scrollY, range, blurRange);
  const filter = useTransform(blur, (v) => (v === 0 ? "none" : `blur(${v}px)`));
  return (
    <motion.span style={{ opacity, filter, display: "inline-block" }}>
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

const BRAND_TEXT = "AUTOPLANET CORPORATION";
const REVEAL_LINE1 = "BUILT BEYOND";
const REVEAL_LINE2 = "BETTER";

const SERIF = "var(--font-instrument-serif), serif";
const SANS = "var(--font-geist-sans), sans-serif";

/** Cap so the animation always finishes within the scrollable area */
const MAX_RANGE = 1900;

function useMaxScroll(pathname: string) {
  const [max, setMax] = useState(MAX_RANGE);

  const measure = useCallback(() => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    // Use the smaller of the page's scrollable height or the ideal range,
    // but ensure at least 300px so it doesn't feel instant.
    setMax(Math.max(300, Math.min(scrollable, MAX_RANGE)));
  }, []);

  useEffect(() => {
    // Measure immediately
    measure();
    // Re-measure after a short delay to catch late-rendering content
    const t = setTimeout(measure, 200);
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
    };
  }, [pathname, measure]);

  return max;
}

export default function BrandLogo() {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const S = useMaxScroll(pathname);

  // Proportional ranges derived from S
  const logoX = useTransform(scrollY, [0, S * 0.63], [0, 65]);
  const taglineOpacity = useTransform(scrollY, [S * 0.21, S * 0.58], [1, 0]);
  const hiddenScale = useTransform(scrollY, [S * 0.1, S * 0.55], [0.95, 1]);
  const hiddenClip = useTransform(
    scrollY,
    [S * 0.16, S * 0.6],
    ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );

  const totalChars = BRAND_TEXT.length;

  const renderStaggered = (
    text: string,
    baseIndex: number,
    type: "logo" | "reveal"
  ) => {
    return text.split("").map((char, i) => {
      const charIndex = baseIndex + i;
      let range: [number, number];
      let output: [number, number];
      let maxBlur: number;
      if (type === "logo") {
        const start = (charIndex / totalChars) * S * 0.5;
        const end = start + S * 0.2;
        range = [start, end];
        output = [1, 0];
        maxBlur = 0;
      } else {
        const startIn = S * 0.05 + (charIndex / totalChars) * S * 0.4;
        const endIn = startIn + S * 0.2;
        range = [startIn, endIn];
        output = [0, 1];
        maxBlur = 0;
      }
      return (
        <AnimatedChar
          key={`${type}-${baseIndex}-${i}`}
          char={char}
          scrollY={scrollY}
          range={range}
          output={output}
          maxBlur={maxBlur}
        />
      );
    });
  };

  return (
    <Link
      href="/"
      className="flex items-center relative h-full"
      aria-label="AutoPlanet Corporation home"
      style={{ textDecoration: "none" }}
    >
      {/* brand-visual: holds logo + hidden reveal text */}
      <div
        className="relative flex items-center"
        style={{ width: 220, height: 86, overflow: "visible", flexShrink: 0 }}
      >
        {/* Hidden reveal text — centered on the logo's original position (8 + 55/2 = 35.5) */}
        <motion.div
          className="absolute flex flex-col items-center"
          style={{
            left: 35.5,
            top: "50%",
            x: "-50%",
            y: "-50%",
            scale: hiddenScale,
            clipPath: hiddenClip,
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontFamily: SERIF,
              fontSize: "0.72rem",
              letterSpacing: "0.14em",
              fontWeight: 500,
              color: "#080808",
              whiteSpace: "nowrap",
              textTransform: "uppercase",
              lineHeight: 1.1,
              display: "block",
              textAlign: "center",
            }}
          >
            {renderStaggered(REVEAL_LINE1, 0, "reveal")}
          </span>
          <span
            style={{
              fontFamily: SERIF,
              fontSize: "0.95rem",
              letterSpacing: "0.14em",
              fontWeight: 600,
              color: "#080808",
              whiteSpace: "nowrap",
              textTransform: "uppercase",
              lineHeight: 1.1,
              marginTop: "3px",
              display: "block",
              textAlign: "center",
            }}
          >
            {renderStaggered(REVEAL_LINE2, REVEAL_LINE1.length, "reveal")}
          </span>
        </motion.div>

        {/* Logo image — 55×55, shifts right on scroll */}
        <motion.div
          style={{
            x: logoX,
            width: 55,
            height: 55,
            marginLeft: 8,
            zIndex: 2,
            position: "relative",
            flexShrink: 0,
          }}
        >
          <img
            src="/autoplanet-logo.png"
            alt="AutoPlanet Corporation logo"
            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
          />
        </motion.div>
      </div>

      {/* brand-text: pulled left to overlap the logo, vertically centered */}
      <div
        className="flex flex-col justify-center relative"
        style={{ marginLeft: -140, zIndex: 3 }}
      >
        <span
          style={{
            fontFamily: SERIF,
            fontSize: "1.37rem",
            letterSpacing: "0.03em",
            fontWeight: 600,
            color: "#080808",
            lineHeight: 0.9,
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            display: "block",
          }}
        >
          {renderStaggered(BRAND_TEXT, 0, "logo")}
        </span>
        <motion.span
          style={{
            fontFamily: SANS,
            fontSize: "0.4rem",
            letterSpacing: "0.1em",
            color: "rgba(8, 8, 8, 0.6)",
            whiteSpace: "nowrap",
            display: "block",
            marginTop: 6,
            paddingTop: 6,
            borderTop: "1px solid rgba(8, 8, 8, 0.15)",
            opacity: taglineOpacity,
            textTransform: "uppercase",
          }}
        >
          APC · AI-POWERED AUTOMATION | SOLUTIONS
        </motion.span>
      </div>
    </Link>
  );
}
