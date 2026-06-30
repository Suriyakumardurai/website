"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * useLocalStorage — persistent state hook for mobile-only features.
 *
 * Usage:
 *   const [bookmarks, setBookmarks] = useLocalStorage("key", defaultValue);
 *
 * Automatically JSON-serializes/deserializes values.
 * Silently fails on storage errors (private browsing, quota).
 */

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  // Read from storage on mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) {
        setValue(JSON.parse(raw) as T);
      }
    } catch {
      // ignore
    }
  }, [key]);

  // Write to storage on change
  const set = useCallback(
    (v: T | ((prev: T) => T)) => {
      try {
        setValue((prev) => {
          const next = typeof v === "function" ? (v as (p: T) => T)(prev) : v;
          window.localStorage.setItem(key, JSON.stringify(next));
          return next;
        });
      } catch {
        // ignore
      }
    },
    [key]
  );

  return [value, set] as const;
}
