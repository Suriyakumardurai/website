"use client";

import React from 'react';
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const dotTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const smoothDotTop = useSpring(dotTop, { stiffness: 100, damping: 30 });

  return (
    <>
      <style jsx>{`
        .scroll-progress-wrapper {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 1px;
          z-index: 1000;
          pointer-events: none;
          background: rgba(255, 255, 255, 0.05);
          will-change: transform;
        }

        .dot-container {
          position: fixed;
          top: 0;
          right: 6px;
          height: 100%;
          width: 10px;
          z-index: 1001;
          pointer-events: none;
        }

        .floating-dot {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #c8a96e;
          border-radius: 50%;
          right: 0;
          box-shadow: 0 0 10px #c8a96e, 0 0 20px rgba(200, 169, 110, 0.5);
          will-change: transform;
        }

        .dot-glow {
          position: absolute;
          inset: -4px;
          background: #c8a96e;
          border-radius: 50%;
          opacity: 0.3;
          filter: blur(4px);
        }
      `}</style>

      <div className="scroll-progress-wrapper">
        <motion.div
          style={{
            scaleY,
            height: '100%',
            background: 'linear-gradient(to bottom, transparent, #c8a96e, transparent)',
            originY: 0
          }}
        />
      </div>

      <div className="dot-container">
        <motion.div 
          className="floating-dot"
          style={{ y: smoothDotTop }}
        >
          <motion.div 
            className="dot-glow"
            animate={{ scale: [1, 2, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </>
  );
}
