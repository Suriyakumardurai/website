"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, X, Download, Share2, Check } from "lucide-react";

/**
 * Mobile-only Share as Image.
 *
 * Generates a shareable image card from a testimonial or quote.
 * Uses HTML Canvas to render a visually appealing card that can be
 * downloaded or shared via the Web Share API (with files).
 *
 * Desktop (lg+) renders nothing.
 */

type ShareableContent = {
  quote: string;
  author: string;
  role?: string;
  company?: string;
};

export default function MobileShareImage({
  content,
  onClose,
}: {
  content: ShareableContent;
  onClose: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Generate the image on mount
    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = 1080;
    const H = 1080;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background — dark gradient
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, "#0d0d15");
    bgGrad.addColorStop(1, "#1a1a2e");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Lime accent glow
    const glowGrad = ctx.createRadialGradient(W * 0.8, H * 0.2, 0, W * 0.8, H * 0.2, 400);
    glowGrad.addColorStop(0, "rgba(132, 204, 22, 0.15)");
    glowGrad.addColorStop(1, "rgba(132, 204, 22, 0)");
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, W, H);

    // Border
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 40, W - 80, H - 80);

    // Brand name at top
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.font = "500 24px monospace";
    ctx.textAlign = "left";
    ctx.fillText("AUTOPLANET CORPORATION", 80, 100);

    // Lime accent line
    ctx.fillStyle = "#84cc16";
    ctx.fillRect(80, 120, 60, 3);

    // Quote mark
    ctx.fillStyle = "rgba(132, 204, 22, 0.2)";
    ctx.font = "bold 120px serif";
    ctx.fillText('"', 70, 280);

    // Quote text — word wrap
    ctx.fillStyle = "#ffffff";
    ctx.font = "600 42px sans-serif";
    ctx.textAlign = "left";
    const maxWidth = W - 160;
    const words = content.quote.split(" ");
    const lines: string[] = [];
    let currentLine = "";
    for (const word of words) {
      const testLine = currentLine ? currentLine + " " + word : word;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);

    let y = 260;
    for (const line of lines.slice(0, 8)) {
      ctx.fillText(line, 80, y);
      y += 56;
    }

    // Author section
    y += 40;
    // Lime divider
    ctx.fillStyle = "#84cc16";
    ctx.fillRect(80, y, 40, 2);
    y += 30;

    // Author name
    ctx.fillStyle = "#ffffff";
    ctx.font = "600 32px sans-serif";
    ctx.fillText(content.author, 80, y);

    // Role
    if (content.role) {
      y += 40;
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.font = "400 26px sans-serif";
      ctx.fillText(content.role, 80, y);
    }

    // Company
    if (content.company) {
      y += 36;
      ctx.fillStyle = "rgba(132, 204, 22, 0.8)";
      ctx.font = "500 24px sans-serif";
      ctx.fillText(content.company, 80, y);
    }

    // Bottom URL
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.font = "400 22px monospace";
    ctx.textAlign = "center";
    ctx.fillText("autoplanetcorp.com", W / 2, H - 60);

    // Convert to data URL
    const dataUrl = canvas.toDataURL("image/png");
    setImageUrl(dataUrl);
  }, [content]);

  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement("a");
    link.download = `autoplanet-${content.author.toLowerCase().replace(/\s+/g, "-")}.png`;
    link.href = imageUrl;
    link.click();
  };

  const handleShare = async () => {
    if (!imageUrl) return;
    try {
      // Convert data URL to blob
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], `autoplanet-${content.author}.png`, {
        type: "image/png",
      });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: `AutoPlanet — ${content.author}`,
          text: content.quote,
          files: [file],
        });
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // Fallback to download
        handleDownload();
      }
    } catch {
      // ignore
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="lg:hidden fixed inset-0 z-[80] bg-foreground/70 backdrop-blur-md flex items-center justify-center p-5"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="bg-background rounded-3xl p-5 max-w-[340px] w-full relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 m-tap m-press h-8 w-8 rounded-full m-chip flex items-center justify-center z-10"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Header */}
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] lime-text mb-1 flex items-center gap-1.5">
            <ImageIcon className="h-3 w-3" />
            Share as image
          </p>
          <h2 className="text-lg font-semibold tracking-tight mb-4">
            Generated card
          </h2>

          {/* Image preview */}
          {imageUrl ? (
            <div className="rounded-2xl overflow-hidden mb-4 border border-border">
              { }
              <img
                src={imageUrl}
                alt={`Quote from ${content.author}`}
                className="w-full h-auto"
              />
            </div>
          ) : (
            <div className="aspect-square rounded-2xl m-card-flat flex items-center justify-center mb-4">
              <div className="text-xs text-muted-foreground">Generating…</div>
            </div>
          )}

          {/* Hidden canvas for rendering */}
          <canvas ref={canvasRef} style={{ display: "none" }} />

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleDownload}
              disabled={!imageUrl}
              className="flex items-center justify-center gap-1.5 h-10 rounded-full m-chip text-xs font-semibold m-press disabled:opacity-50"
            >
              <Download className="h-3.5 w-3.5" />
              Download
            </button>
            <button
              onClick={handleShare}
              disabled={!imageUrl}
              className="flex items-center justify-center gap-1.5 h-10 rounded-full bg-foreground text-background text-xs font-semibold m-press disabled:opacity-50"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 lime-text" />
                  Shared!
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5 text-lime-400" />
                  Share
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
