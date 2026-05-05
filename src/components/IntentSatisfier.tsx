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
      // Trigger if mouse moves toward top and user has been on page > 15 seconds
      if (e.clientY < 5 && timeOnPage > 15) {
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
    <div className="intent-rescue-overlay">
      <div className="intent-rescue-card">
        <button 
          onClick={() => setShowRescue(false)}
          className="rescue-close"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <h3>Looking for something <span>specific</span>?</h3>
        <p>
          Before you go, our lead engineers suggest these high-value starting points:
        </p>
        
        <div className="rescue-links">
          <a href="#services" onClick={() => setShowRescue(false)} className="rescue-link">
            <div className="num">01</div>
            AI Services & Pricing
          </a>
          <a href="#about" onClick={() => setShowRescue(false)} className="rescue-link">
            <div className="num">02</div>
            How our AI automation works
          </a>
          <a href="#cta" onClick={() => setShowRescue(false)} className="rescue-link">
            <div className="num">03</div>
            Book a 1:1 strategy call
          </a>
        </div>
        
        <button
          onClick={() => setShowRescue(false)}
          className="rescue-dismiss"
        >
          No thanks, just browsing
        </button>
      </div>
    </div>
  );
}
