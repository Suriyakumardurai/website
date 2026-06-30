"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Flame, Trophy, Calendar, X, Sparkles } from "lucide-react";

/**
 * Mobile-only Reading Streak.
 *
 * Gamifies reading by tracking daily page visits.
 * Each day the user visits at least 1 page counts as a "streak day".
 * Shows a flame badge in the menu with current streak count.
 * Milestone celebrations at 3, 7, 14, 30 days.
 *
 * Persists to localStorage with date-based tracking.
 * Desktop (lg+) renders nothing.
 */

const STORAGE_KEY = "apc_reading_streak";

type StreakData = {
  current: number;
  longest: number;
  lastVisit: string; // YYYY-MM-DD
  totalDays: number;
  milestonesShown: string[]; // milestone IDs already celebrated
};

const DEFAULT_DATA: StreakData = {
  current: 0,
  longest: 0,
  lastVisit: "",
  totalDays: 0,
  milestonesShown: [],
};

const MILESTONES = [3, 7, 14, 30];

function todayStr(): string {
  return new Date().toISOString().split("T")[0];
}

function daysBetween(d1: string, d2: string): number {
  if (!d1 || !d2) return 999;
  const ms = Math.abs(new Date(d2).getTime() - new Date(d1).getTime());
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

function readData(): StreakData {
  if (typeof window === "undefined") return DEFAULT_DATA;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_DATA;
    return { ...DEFAULT_DATA, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_DATA;
  }
}

function writeData(data: StreakData) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

function useStreakTracker() {
  const [data, setData] = useState<StreakData>(DEFAULT_DATA);
  const [milestone, setMilestone] = useState<number | null>(null);

  useEffect(() => {
    const today = todayStr();
    const current = readData();

    if (current.lastVisit === today) {
      // Already counted today
      setData(current);
      return;
    }

    const gap = daysBetween(current.lastVisit, today);
    let newCurrent: number;
    if (gap === 1) {
      // Consecutive day
      newCurrent = current.current + 1;
    } else if (gap === 0) {
      // Same day (shouldn't happen but just in case)
      newCurrent = current.current;
    } else {
      // Streak broken
      newCurrent = 1;
    }

    const updated: StreakData = {
      current: newCurrent,
      longest: Math.max(current.longest, newCurrent),
      lastVisit: today,
      totalDays: current.totalDays + 1,
      milestonesShown: current.milestonesShown,
    };

    // Check for new milestone
    const newMilestone = MILESTONES.find(
      (m) => m === newCurrent && !current.milestonesShown.includes(`m-${m}`)
    );
    if (newMilestone) {
      updated.milestonesShown = [...current.milestonesShown, `m-${newMilestone}`];
      setMilestone(newMilestone);
    }

    writeData(updated);
    setData(updated);
  }, []);

  return { data, milestone, clearMilestone: () => setMilestone(null) };
}

export default function MobileReadingStreak() {
  const { data, milestone, clearMilestone } = useStreakTracker();

  if (data.current === 0) return null;

  const nextMilestone = MILESTONES.find((m) => m > data.current);
  const progressToNext = nextMilestone
    ? Math.round((data.current / nextMilestone) * 100)
    : 100;

  return (
    <>
      {/* Streak card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mt-4 pt-4 border-t border-border"
      >
        <div className="rounded-2xl bg-foreground text-background p-4 relative overflow-hidden">
          {/* Glow */}
          <div
            aria-hidden
            className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-lime-400/20 blur-2xl"
          />
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-background/60 flex items-center gap-1.5">
                <Flame className="h-3 w-3 text-lime-400" />
                Reading streak
              </p>
              <span className="text-[10px] font-mono text-background/60">
                Best: {data.longest}d
              </span>
            </div>

            {/* Current streak */}
            <div className="flex items-end gap-2 mb-3">
              <motion.span
                key={data.current}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "backOut" }}
                className="text-4xl font-bold lime-text tabular-nums leading-none"
              >
                {data.current}
              </motion.span>
              <span className="text-sm text-background/70 mb-1">
                day{data.current !== 1 ? "s" : ""}
              </span>
              <Flame className="h-5 w-5 text-lime-400 mb-1 ml-auto" />
            </div>

            {/* Progress to next milestone */}
            {nextMilestone && (
              <div className="mb-2">
                <div className="flex items-center justify-between text-[9px] font-mono text-background/50 mb-1">
                  <span>Next: {nextMilestone} days</span>
                  <span>{progressToNext}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-background/15 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressToNext}%` }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    className="h-full lime-bg rounded-full"
                  />
                </div>
              </div>
            )}

            {/* Total days + trophy */}
            <div className="flex items-center gap-3 text-[10px] text-background/60">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {data.totalDays} total
              </span>
              {data.longest >= 7 && (
                <span className="flex items-center gap-1 text-lime-400">
                  <Trophy className="h-3 w-3" />
                  {data.longest}d best
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Milestone celebration overlay */}
      <AnimatePresence>
        {milestone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 z-[85] bg-foreground/70 backdrop-blur-md flex items-center justify-center p-5"
            onClick={clearMilestone}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "backOut" }}
              className="bg-background rounded-3xl p-6 max-w-[280px] text-center relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Confetti glow */}
              <div
                aria-hidden
                className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-lime-400/20 blur-3xl"
              />
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "backOut" }}
                className="relative inline-flex h-16 w-16 rounded-full bg-lime-400 text-foreground items-center justify-center mb-4"
              >
                <Flame className="h-8 w-8" />
              </motion.div>
              <p className="relative text-[10px] font-mono uppercase tracking-[0.22em] lime-text mb-1">
                <Sparkles className="inline h-3 w-3 mr-1" />
                Milestone reached
              </p>
              <h2 className="relative text-2xl font-bold tracking-tight mb-2">
                {milestone} day streak!
              </h2>
              <p className="relative text-sm text-muted-foreground leading-relaxed mb-4">
                You&apos;ve visited AutoPlanet {milestone} days in a row.
                Keep the momentum going!
              </p>
              <button
                onClick={clearMilestone}
                className="relative inline-flex items-center justify-center h-10 px-6 rounded-full bg-foreground text-background text-sm font-semibold m-press"
              >
                Keep reading
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
