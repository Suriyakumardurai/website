"use client";

/**
 * Mobile-only haptic feedback via the Vibration API.
 *
 * Returns a function that triggers a short vibration pattern.
 * Silently no-ops on devices/browsers that don't support vibration (iOS Safari, desktop).
 *
 * Usage:
 *   const haptic = useHaptic();
 *   <button onClick={() => { haptic("light"); doSomething(); }}>...</button>
 *
 * Patterns:
 *  - "light"  — 8ms single tap (subtle, for taps)
 *  - "medium" — 15ms single tap (for selections)
 *  - "heavy"  — 25ms single tap (for confirmations)
 *  - "success" — [10, 30, 10] pattern (for success states)
 *  - "error"   — [30, 50, 30, 50, 30] pattern (for errors)
 */

export type HapticPattern = "light" | "medium" | "heavy" | "success" | "error" | "warning";

const PATTERNS: Record<HapticPattern, number | number[]> = {
  light: 8,
  medium: 15,
  heavy: 25,
  success: [10, 30, 10],
  error: [30, 50, 30, 50, 30],
  warning: [20, 40, 20],
};

export function useHaptic() {
  return (pattern: HapticPattern = "light") => {
    if (typeof window === "undefined") return;
    if (!("vibrate" in navigator)) return;
    try {
      navigator.vibrate(PATTERNS[pattern]);
    } catch {
      // ignore (some browsers throw in certain contexts)
    }
  };
}

/**
 * Convenience hook: returns a tap handler enhancer.
 * Wrap any onClick to add haptic feedback.
 *
 *   const withHaptic = useHapticTap();
 *   <button onClick={withHaptic("medium", () => setOpen(true))}>...</button>
 */
export function useHapticTap() {
  const haptic = useHaptic();
  return (pattern: HapticPattern, fn?: () => void) => () => {
    haptic(pattern);
    fn?.();
  };
}
