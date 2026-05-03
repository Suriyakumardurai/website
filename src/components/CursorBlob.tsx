"use client";

import { useEffect, useRef } from "react";

export default function CursorBlob() {
  const blob = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let x = 0, y = 0;
    let cx = 0, cy = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      cx = lerp(cx, x, 0.08);
      cy = lerp(cy, y, 0.08);
      if (blob.current) {
        blob.current.style.transform = `translate(${cx - 200}px, ${cy - 200}px)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={blob}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 400,
        height: 400,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(200,169,110,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
        willChange: "transform",
      }}
    />
  );
}
