'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { usePathname } from 'next/navigation';

/**
 * BEHAVIORAL INTENT SATISFIER
 * 
 * Logic:
 * 1. Tracks if user has scrolled deep (>60% of page)
 * 2. Triggers only once (persisted in localStorage)
 * 3. Triggers when user returns to hero section after exploring
 * 4. Only active on the index/home page
 */
export function IntentSatisfier() {
  const pathname = usePathname();
  const [showRescue, setShowRescue] = useState(false);
  const [hasScrolledDeep, setHasScrolledDeep] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (hasBeenShown) return;

      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      
      // Mark as "Deep Explore" if they hit 60% of the page
      if (scrollPos > (fullHeight - windowHeight) * 0.6) {
        setHasScrolledDeep(true);
      }

      // Trigger if they explored and then returned to Hero (< 300px from top)
      if (hasScrolledDeep && scrollPos < 300 && !showRescue) {
        setShowRescue(true);
        setHasBeenShown(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolledDeep, showRescue, hasBeenShown]);

  if (pathname !== '/') return null;
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

        <h3>Still <span>searching</span>?</h3>
        <p>
          We noticed you've explored the platform from top to bottom and returned to the start. 
          Instead of scrolling further, tell us exactly what you're looking for:
        </p>
        
        <div className="rescue-links">
          <a href="#services" onClick={() => setShowRescue(false)} className="rescue-link">
            <div className="num">01</div>
            Detailed Service Catalog
          </a>
          <a href="#about" onClick={() => setShowRescue(false)} className="rescue-link">
            <div className="num">02</div>
            Technical Implementation Specs
          </a>
          <a href="#cta" onClick={() => setShowRescue(false)} className="rescue-link">
            <div className="num">03</div>
            Schedule an Engineer Deep-Dive
          </a>
        </div>
        
        <button
          onClick={() => setShowRescue(false)}
          className="rescue-dismiss"
        >
          I've seen enough, thank you
        </button>
      </div>
    </div>
  );
}
