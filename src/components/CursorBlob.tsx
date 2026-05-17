"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorBlob() {
  const blob = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Skip on mobile/touch devices
    const hasMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!hasMouse) return;
    setIsMobile(false);

    let x = 0, y = 0;
    let cx = 0, cy = 0;
    let raf: number;
    let isMoving = false;
    let idleTimer: ReturnType<typeof setTimeout>;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!isMoving) {
        isMoving = true;
        tick();
      }
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => { isMoving = false; }, 3000);
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      if (!isMoving) return;
      cx = lerp(cx, x, 0.08);
      cy = lerp(cy, y, 0.08);
      if (blob.current) {
        blob.current.style.transform = `translate3d(${cx - 250}px, ${cy - 250}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      clearTimeout(idleTimer);
    };
  }, []);

  if (isMobile) return null;

  return (
    <div
      ref={blob}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 500,
        height: 500,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(200,169,110,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
        willChange: "transform",
        contain: "layout style paint",
      }}
    />
  );
}
