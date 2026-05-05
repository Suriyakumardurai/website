'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

/**
 * POGOSTICKING PREVENTION (Intent Rescue)
 * 
 * Detects when the user is about to leave early and presents
 * a rescue UI to fulfill their intent before they bounce.
 */
export function IntentSatisfier() {
  const [showRescue, setShowRescue] = useState(false);
  const [timeOnPage, setTimeOnPage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTimeOnPage(t => t + 1), 1000);

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger if mouse moves toward top and user has been on page 3-15 seconds
      if (e.clientY < 10 && timeOnPage < 15 && timeOnPage > 3) {
        setShowRescue(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearInterval(timer);
    };
  }, [timeOnPage]);

  if (!showRescue) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
      <div className="bg-[#111] border border-[#333] rounded-2xl p-8 max-w-md w-full text-center relative">
        <button 
          onClick={() => setShowRescue(false)}
          className="absolute top-4 right-4 text-white/40 hover:text-white"
        >
          <X size={20} />
        </button>

        <h3 className="text-2xl font-bold text-white mb-4">
          Looking for something specific?
        </h3>
        <p className="text-white/60 mb-6">
          Before you go, here are our most requested resources:
        </p>
        
        <div className="space-y-3">
          <a href="#services" onClick={() => setShowRescue(false)} className="block p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition text-white text-left font-medium">
            AI Services & Pricing
          </a>
          <a href="#about" onClick={() => setShowRescue(false)} className="block p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition text-white text-left font-medium">
            How our AI automation works
          </a>
          <a href="#cta" onClick={() => setShowRescue(false)} className="block p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition text-white text-left font-medium">
            Book a 1:1 strategy call
          </a>
        </div>
        
        <button
          onClick={() => setShowRescue(false)}
          className="mt-6 text-sm text-white/40 hover:text-white/80 transition"
        >
          No thanks, just browsing
        </button>
      </div>
    </div>
  );
}
