/**
 * Tiny global scroll store. Updated by a single rAF-throttled scroll listener
 * (mounted in GlobalBackground) and read by both the 3D canvas (in useFrame)
 * and UI components (in effects / motion values).
 *
 * Avoids per-component scroll listeners and keeps the 3D loop allocation-free.
 */
export const scrollState = {
  /** 0 → 1 progress through the whole page */
  progress: 0,
  /** pixels scrolled */
  y: 0,
  /** -1 → 1 velocity (scroll direction, smoothed) */
  velocity: 0,
};

let _lastY = 0;
let _targetVel = 0;

export function updateScrollState() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const y = window.scrollY;
  scrollState.y = y;
  scrollState.progress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;

  const delta = y - _lastY;
  _targetVel = Math.max(-1, Math.min(1, delta / 40));
  _lastY = y;
}

/** Call each frame to smooth the velocity toward the target */
export function tickScrollVelocity() {
  scrollState.velocity += (_targetVel - scrollState.velocity) * 0.12;
  // decay target so it settles to 0 when not scrolling
  _targetVel *= 0.9;
}
