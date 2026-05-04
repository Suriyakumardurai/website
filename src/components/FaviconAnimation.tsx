"use client";

import { useEffect } from "react";

export default function FaviconAnimation() {
  useEffect(() => {
    // 1. Find or create the favicon link tag
    let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      link.id = "dynamic-favicon";
      link.type = "image/svg+xml";
      document.head.appendChild(link);
    }

    const duration = 3000;
    
    // 2. The Animation Loop
    const interval = setInterval(() => {
      const now = Date.now();
      const progress = now % duration;
      const phase = progress / duration;
      
      let text = "/";
      let fontSize = "95";

      if (phase < 0.5) {
        text = "/";
        fontSize = "95";
      } else {
        text = "APC";
        fontSize = "55";
      }

      // Generate the SVG string mimicking apc.svg style
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <text 
            x="50" 
            y="50" 
            font-family="'Didot', 'Bodoni MT', 'Playfair Display', serif" 
            font-weight="600" 
            font-size="${fontSize}" 
            text-anchor="middle" 
            dominant-baseline="central" 
            fill="#FFD700"
          >
            ${text}
          </text>
        </svg>
      `;

      // Update favicon
      link!.href = `data:image/svg+xml;base64,${btoa(svg)}`;
    }, 100); // 10 FPS is enough for step-based animation

    return () => clearInterval(interval);
  }, []);

  return null;
}
