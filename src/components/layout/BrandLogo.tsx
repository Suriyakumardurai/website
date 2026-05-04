"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const Globe = dynamic(() => import("../three/Globe"), { ssr: false });

function AnimatedChar({ char, scrollY, range, output, maxBlur }: { char: string, scrollY: any, range: number[], output: number[], maxBlur: number }) {
  const opacity = useTransform(scrollY, range, output);
  
  // Feathering effect (blur)
  // We want blur when opacity is 0, and no blur when opacity is 1
  const blurRange = output.map(v => v === 1 ? 0 : maxBlur);
  const blur = useTransform(scrollY, range, blurRange);
  const filter = useTransform(blur, (v) => v === 0 ? "none" : `blur(${v}px)`);

  return (
    <motion.span style={{ opacity, filter, display: "inline-block" }}>
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

export default function BrandLogo() {
  const { scrollY } = useScroll();
  
  const textRange = [0, 1900];

  const name1 = "AUTOPLANET";
  const name2 = "CORPORATION";
  const tagline = "APC AI-POWERED AUTOMATION | SOLUTIONS";

  // Globe transforms
  const globeX = useTransform(scrollY, [0, 1200], ["-50%", "-75%"]);
  const globeY = useTransform(scrollY, [0, 1200], ["-50%", "-50%"]);
  const globeScale = useTransform(scrollY, [0, 1200], [1, 1.05]);

  // Logo transform
  const logoX = useTransform(scrollY, [0, 1200], [0, 82]);
  
  // Reveal text transforms
  const hiddenTextScale = useTransform(scrollY, [200, 1040], [0.95, 1]);
  const hiddenTextClip = useTransform(scrollY, [300, 1140], ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"]);
  
  const rawRotationSpeed = useTransform(scrollY, [0, 1200], [1, 6], { clamp: false });
  const rotationSpeed = useSpring(rawRotationSpeed, { stiffness: 50, damping: 20 });

  const renderStaggered = (text: string, baseIndex: number, totalChars: number, type: 'logo' | 'reveal') => {
    return text.split("").map((char, i) => {
      const charIndex = baseIndex + i;
      let range: number[];
      let output: number[];
      let maxBlur: number;

      if (type === 'logo') {
        const start = (charIndex / totalChars) * textRange[1] * 0.5;
        const end = start + (textRange[1] * 0.2);
        range = [start, end];
        output = [1, 0];
        maxBlur = 0; // Remove feather for logo
      } else {
        // Built Beyond Better - stays visible, no fade out
        const startIn = 200 + (charIndex / totalChars) * 400;
        const endIn = startIn + 300;
        range = [startIn, endIn];
        output = [0, 1];
        maxBlur = 4; // Slightly increased feather for "Built Beyond Better"
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
    <a href="#" className="brand-logo">
      <div className="brand-visual">
        <motion.div 
          className="globe-container"
          style={{ 
            translateX: globeX, 
            translateY: globeY,
            scale: globeScale 
          }}
        >
          <Globe speed={rotationSpeed} />
        </motion.div>
        
        <motion.div
          className="brand-reveal-text"
          style={{ 
            scale: hiddenTextScale,
            clipPath: hiddenTextClip,
            position: "absolute",
            left: "50%",
            top: "50%",
            translateX: "-50%",
            translateY: "-50%",
            zIndex: 1,
            pointerEvents: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center"
          }}
        >
          <div style={{ display: "flex" }}>
            {renderStaggered("BUILT BEYOND", 0, 18, 'reveal')}
          </div>
          <div style={{ fontSize: "1.2em", marginTop: "2px", display: "flex" }}>
            {renderStaggered("BETTER", 12, 18, 'reveal')}
          </div>
        </motion.div>

        <motion.div
          style={{ x: logoX, zIndex: 2, width: 111, height: 111, position: 'relative' }}
          className="brand-image"
        >
          <Image 
            src="/logo.png" 
            alt="AutoPlanet Corporation Logo" 
            fill
            sizes="111px"
            style={{ objectFit: 'contain' }}
            priority
          />
        </motion.div>
      </div>
      <motion.div 
        className="brand-text"
        style={{ y: 4 }}
      >
        <div className="brand-name-group">
          <div className="brand-name">
            {renderStaggered(name1, 0, 10, 'logo')}
          </div>
          <div className="brand-name">
            {renderStaggered(name2, 0, 11, 'logo')}
          </div>
        </div>
        <motion.div 
          className="brand-tagline-wrap"
          style={{ opacity: useTransform(scrollY, [400, 1100], [1, 0]) }}
        >
          <div className="brand-tagline">
            {renderStaggered(tagline, 0, tagline.length, 'logo')}
          </div>
        </motion.div>
      </motion.div>
    </a>
  );
}



