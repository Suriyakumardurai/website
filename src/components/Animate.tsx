"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as any } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export function FadeUp({ children, delay = 0, className = "", style }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 32 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] as any } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerGrid({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className} style={style} initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger}>
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div className={className} style={style} variants={fadeUp}>
      {children}
    </motion.div>
  );
}

export function SlideIn({ children, from = "left", className = "", style }: { children: React.ReactNode; from?: "left" | "right"; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, x: from === "left" ? -48 : 48 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as any }}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as any }}
    >
      {children}
    </motion.div>
  );
}

export function LineReveal({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  return (
    <div ref={ref} style={{ overflow: "hidden" }}>
      <motion.div
        className={className}
        initial={{ y: "100%" }}
        animate={inView ? { y: 0 } : {}}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] as any }}
      >
        {text}
      </motion.div>
    </div>
  );
}

export function WordReveal({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const words = text.split(" ");

  return (
    <div ref={ref} className={className} style={{ display: 'inline-block', transform: 'translateZ(0)' }}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(15px)',
            transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay + i * 0.08}s`,
            marginRight: '0.25em',
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden'
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}

export function RevealSection({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as any }}
    >
      {children}
    </motion.div>
  );
}

export function Typewriter({ text, className = "", delay = 0, speed = 0.02 }: { text: string; className?: string; delay?: number; speed?: number }) {
  const [displayText, setDisplayText] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  useEffect(() => {
    if (inView) {
      const timeout = setTimeout(() => setIsStarted(true), delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [inView, delay]);

  useEffect(() => {
    if (isStarted) {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayText(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, speed * 1000); 
      return () => clearInterval(interval);
    }
  }, [isStarted, text, speed]);

  return (
    <span ref={ref} className={className} style={{ display: 'inline', whiteSpace: 'pre-wrap', transform: 'translateZ(0)' }}>
      {displayText}
      {isStarted && displayText.length < text.length && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          style={{ 
            display: 'inline-block', 
            width: '2px', 
            height: '1em', 
            background: 'var(--accent)', 
            marginLeft: '2px',
            verticalAlign: 'middle'
          }}
        />
      )}
    </span>
  );
}

export function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.1, y: y * 0.1 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      style={{ display: "inline-block" }}
    >
      {children}
    </motion.div>
  );
}
