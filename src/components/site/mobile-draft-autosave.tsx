"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, RotateCw, X, Check } from "lucide-react";

/**
 * Mobile-only Contact Form Draft Autosave.
 *
 * Automatically saves form field values to localStorage as the user types.
 * On page load, if a draft exists, offers to restore it.
 * Shows a subtle "Draft saved" indicator.
 *
 * Designed to wrap any form. Pass field names to track.
 *
 * Desktop (lg+) — the autosave runs but the UI indicators are mobile-only.
 */

const STORAGE_KEY = "apc_contact_draft";
const DEBOUNCE_MS = 800;

type DraftData = Record<string, string>;

function readDraft(): DraftData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    // Expire drafts after 24 hours
    if (parsed._ts && Date.now() - parsed._ts > 24 * 60 * 60 * 1000) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed as DraftData;
  } catch {
    return null;
  }
}

function writeDraft(data: DraftData) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, _ts: Date.now() }));
  } catch {
    // ignore
  }
}

function clearDraft() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

/**
 * Hook — call from a contact form to enable autosave + restore prompt.
 *
 *   const { draftValues, restoreDraft, dismissDraft, savedAt } = useContactDraft();
 *
 * Returns:
 *  - draftValues: the saved draft (or null if none)
 *  - restoreDraft: function to apply draft to form
 *  - dismissDraft: function to dismiss the restore prompt
 *  - saveDraft: function to manually save current values
 *  - savedAt: timestamp of last save (for "saved Xs ago" indicator)
 *  - clearDraft: function to clear the draft
 */
export function useContactDraft() {
  const [draftValues, setDraftValues] = useState<DraftData | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    const draft = readDraft();
    if (draft && Object.keys(draft).some((k) => k !== "_ts" && draft[k])) {
      setDraftValues(draft);
      setSavedAt(draft._ts ?? null);
    }
  }, []);

  const restoreDraft = useCallback(() => {
    // The form component reads draftValues and applies them
    setDismissed(true);
  }, []);

  const dismissPrompt = useCallback(() => {
    setDismissed(true);
    clearDraft();
    setDraftValues(null);
  }, []);

  const saveDraft = useCallback((data: DraftData) => {
    // Only save if there's actual content
    const hasContent = Object.values(data).some((v) => v && v.trim().length > 0);
    if (!hasContent) return;
    writeDraft(data);
    setSavedAt(Date.now());
  }, []);

  const clear = useCallback(() => {
    clearDraft();
    setDraftValues(null);
    setSavedAt(null);
  }, []);

  return {
    draftValues: dismissed ? null : draftValues,
    restoreDraft,
    dismissPrompt,
    saveDraft,
    savedAt,
    clearDraft: clear,
  };
}

/**
 * Mobile-only draft restore prompt — shows at the top of the contact form
 * if a saved draft exists.
 */
export function MobileDraftRestorePrompt({
  onRestore,
  onDismiss,
}: {
  onRestore: () => void;
  onDismiss: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10, height: 0 }}
        animate={{ opacity: 1, y: 0, height: "auto" }}
        exit={{ opacity: 0, y: -10, height: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="lg:hidden rounded-2xl border border-lime-600/30 bg-lime-500/[0.06] p-3 mb-3 flex items-center justify-between gap-2"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="h-8 w-8 rounded-full bg-foreground text-background flex items-center justify-center shrink-0">
            <Save className="h-3.5 w-3.5 lime-text" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold">Draft found</p>
            <p className="text-[10px] text-muted-foreground">Restore your previous message?</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={onRestore}
            className="inline-flex items-center gap-1 h-8 px-3 rounded-full bg-foreground text-background text-[11px] font-semibold m-press"
          >
            <RotateCw className="h-3 w-3" />
            Restore
          </button>
          <button
            onClick={onDismiss}
            aria-label="Dismiss draft"
            className="m-tap m-press h-8 w-8 rounded-full m-card-flat flex items-center justify-center text-muted-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Mobile-only "Draft saved" indicator — shows briefly after autosave.
 */
export function MobileDraftSavedIndicator({ savedAt }: { savedAt: number | null }) {
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!savedAt) return;
    setVisible(true);
    const updateLabel = () => {
      const diff = Date.now() - savedAt;
      if (diff < 5000) setLabel("Saved just now");
      else if (diff < 60000) setLabel(`Saved ${Math.floor(diff / 1000)}s ago`);
      else setLabel(`Saved ${Math.floor(diff / 60000)}m ago`);
    };
    updateLabel();
    const interval = setInterval(updateLabel, 5000);
    const hide = setTimeout(() => setVisible(false), 3000);
    return () => {
      clearInterval(interval);
      clearTimeout(hide);
    };
  }, [savedAt]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.25 }}
          className="lg:hidden flex items-center justify-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground mt-2"
        >
          <Check className="h-3 w-3 lime-text" />
          {label}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
