"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const Globe = dynamic(() => import("../three/Globe"), { ssr: false });

export default function BrandLogo() {
  const { scrollY } = useScroll();
  
  // Slowed down by another 10%
  const textRange = [0, 1900];
  const opacityRange = [0, 980];
  
  // Character-by-character stagger logic
  const renderStaggeredText = (text: string, baseIndex: number, totalChars: number) => {
    return text.split("").map((char, i) => {
      const charIndex = baseIndex + i;
      const start = (charIndex / totalChars) * textRange[1] * 0.5;
      const end = start + (textRange[1] * 0.2);
      
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const opacity = useTransform(scrollY, [start, end], [1, 0]);
      
      return (
        <motion.span key={i} style={{ opacity, display: "inline-block" }}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      );
    });
  };

  const name1 = "AUTOPLANET";
  const name2 = "CORPORATION";
  const tagline = "APC AI-POWERED AUTOMATION | SOLUTIONS";
  const totalLength = name1.length + name2.length + tagline.length;

  // Move globe to center behind the A logo
  const globeX = useTransform(scrollY, [0, 1200], ["-50%", "-75%"]);
  const globeY = useTransform(scrollY, [0, 1200], ["-50%", "-50%"]);
  const globeScale = useTransform(scrollY, [0, 1200], [1, 1.05]);

  // Move A logo significantly right
  const logoX = useTransform(scrollY, [0, 1200], [0, 82]);
  
  // reveal hidden text between globe and A logo
  const hiddenTextOpacity = useTransform(scrollY, [200, 1040], [0, 1]);
  const hiddenTextScale = useTransform(scrollY, [200, 1040], [0.95, 1]);
  const hiddenTextClip = useTransform(scrollY, [300, 1140], ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"]);
  
  const rawRotationSpeed = useTransform(scrollY, [0, 1200], [1, 6], { clamp: false });
  const rotationSpeed = useSpring(rawRotationSpeed, { stiffness: 50, damping: 20 });

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
            opacity: hiddenTextOpacity,
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
          <span>Built beyond</span>
          <span style={{ fontSize: "1.2em", marginTop: "2px" }}>better</span>
        </motion.div>

        <motion.div
          style={{ x: logoX, zIndex: 2, width: 111, height: 111, position: 'relative' }}
          className="brand-image"
        >
          <Image 
            src="/logo.png" 
            alt="AutoPlanet Corporation Logo" 
            fill
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
            {renderStaggeredText(name1, 0, Math.max(name1.length, name2.length))}
          </div>
          <div className="brand-name">
            {renderStaggeredText(name2, 0, Math.max(name1.length, name2.length))}
          </div>
        </div>
        <div className="brand-tagline-wrap">
          <div className="brand-tagline">
            {renderStaggeredText(tagline, 0, tagline.length)}
          </div>
        </div>
      </motion.div>
    </a>
  );
}



