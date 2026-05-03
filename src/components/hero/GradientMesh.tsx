'use client';

import { useEffect, useRef } from 'react';

export default function GradientMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const blobs = [
      { x: 0.2, y: 0.2, radius: 500, color: [124, 58, 237], vx: 0.0002, vy: 0.00015 },
      { x: 0.8, y: 0.5, radius: 400, color: [168, 85, 247], vx: -0.00015, vy: 0.0002 },
      { x: 0.5, y: 0.85, radius: 350, color: [6, 182, 212], vx: 0.00015, vy: -0.0001 },
      { x: 0.15, y: 0.7, radius: 300, color: [139, 92, 246], vx: -0.0002, vy: -0.00015 },
    ];

    const animate = () => {
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      blobs.forEach((blob) => {
        blob.x += Math.sin(time * blob.vx * 8) * 0.0008;
        blob.y += Math.cos(time * blob.vy * 8) * 0.0008;
        blob.x = Math.max(0.05, Math.min(0.95, blob.x));
        blob.y = Math.max(0.05, Math.min(0.95, blob.y));

        const scale = canvas.width / 1920;
        const gradient = ctx.createRadialGradient(
          blob.x * canvas.width, blob.y * canvas.height, 0,
          blob.x * canvas.width, blob.y * canvas.height, blob.radius * Math.max(scale, 0.5)
        );
        gradient.addColorStop(0, `rgba(${blob.color.join(',')}, 0.08)`);
        gradient.addColorStop(0.5, `rgba(${blob.color.join(',')}, 0.03)`);
        gradient.addColorStop(1, `rgba(${blob.color.join(',')}, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  );
}
