"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, X, Search, Volume2 } from "lucide-react";

/**
 * Mobile-only Voice Search.
 *
 * Uses the Web Speech API (SpeechRecognition) to let users search by voice.
 * Opens via a mic button in the command palette or content search.
 * Transcribes speech in real-time and can trigger search.
 *
 * Desktop (lg+) renders nothing.
 *
 * Note: Web Speech API is only available in Chrome/Edge and some mobile browsers.
 * Falls back gracefully with a "not supported" message on unsupported browsers.
 */

type SpeechRecognitionResult = {
  transcript: string;
  isFinal: boolean;
};

export default function MobileVoiceSearch({
  onResult,
  onClose,
}: {
  onResult: (transcript: string) => void;
  onClose: () => void;
}) {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interim, setInterim] = useState("");
  const recognitionRef = useRef<unknown>(null);

  useEffect(() => {
    // Check for Web Speech API support
    const SpeechRecognition =
      (typeof window !== "undefined" &&
        ((window as unknown as { SpeechRecognition?: unknown }).SpeechRecognition ||
          (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition)) ||
      null;

    if (SpeechRecognition) {
      setSupported(true);
      const recognition = new (SpeechRecognition as { new (): {
        lang: string;
        continuous: boolean;
        interimResults: boolean;
        start: () => void;
        stop: () => void;
        onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => void) | null;
        onerror: (() => void) | null;
        onend: (() => void) | null;
      } })();
      recognition.lang = "en-US";
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onresult = (e) => {
        let finalTranscript = "";
        let interimTranscript = "";
        for (let i = 0; i < e.results.length; i++) {
          const result = e.results[i];
          const text = result[0].transcript;
          if (result.isFinal) {
            finalTranscript += text;
          } else {
            interimTranscript += text;
          }
        }
        if (finalTranscript) {
          setTranscript(finalTranscript);
          setInterim("");
        } else {
          setInterim(interimTranscript);
        }
      };

      recognition.onerror = () => {
        setListening(false);
      };

      recognition.onend = () => {
        setListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      try {
        (recognitionRef.current as { stop?: () => void } | null)?.stop?.();
      } catch {
        // ignore
      }
    };
  }, []);

  const toggleListening = () => {
    if (!supported || !recognitionRef.current) return;
    const recognition = recognitionRef.current as {
      start: () => void;
      stop: () => void;
    };
    if (listening) {
      recognition.stop();
      setListening(false);
    } else {
      setTranscript("");
      setInterim("");
      try {
        recognition.start();
        setListening(true);
      } catch {
        // ignore start errors
      }
    }
  };

  const handleSearch = () => {
    const query = transcript || interim;
    if (query.trim()) {
      onResult(query.trim());
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="lg:hidden fixed inset-0 z-[75] bg-foreground/60 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 20, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-background safe-pb"
          style={{ boxShadow: "0 -24px 60px -20px rgba(13,13,21,0.4)" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="m-drag-handle" />
          <div className="px-5 pt-3 pb-6 text-center">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] lime-text flex items-center gap-1.5">
                <Mic className="h-3 w-3" />
                Voice search
              </p>
              <button
                onClick={onClose}
                className="m-tap m-press h-9 w-9 rounded-full m-chip flex items-center justify-center"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {!supported ? (
              <div className="py-10">
                <div className="inline-flex h-14 w-14 rounded-full m-card-flat items-center justify-center mb-3">
                  <MicOff className="h-6 w-6 text-muted-foreground/60" />
                </div>
                <p className="text-sm font-medium">Not supported</p>
                <p className="text-xs text-muted-foreground mt-1 max-w-[260px] mx-auto">
                  Voice search requires Chrome, Edge, or Safari. Try typing your search instead.
                </p>
              </div>
            ) : (
              <>
                {/* Mic button */}
                <motion.button
                  onClick={toggleListening}
                  whileTap={{ scale: 0.95 }}
                  className="relative inline-flex h-20 w-20 items-center justify-center rounded-full mb-4"
                  aria-label={listening ? "Stop listening" : "Start listening"}
                >
                  {/* Pulse rings when listening */}
                  {listening && (
                    <>
                      <motion.span
                        animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                        className="absolute inset-0 rounded-full bg-lime-400/30"
                      />
                      <motion.span
                        animate={{ scale: [1, 2.2], opacity: [0.3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
                        className="absolute inset-0 rounded-full bg-lime-400/20"
                      />
                    </>
                  )}
                  <span
                    className={`relative flex h-20 w-20 items-center justify-center rounded-full transition-colors ${
                      listening ? "bg-lime-400 text-foreground" : "bg-foreground text-background"
                    }`}
                    style={{
                      boxShadow: listening
                        ? "0 0 40px 8px rgba(132,204,22,0.4)"
                        : "0 8px 24px -6px rgba(13,13,21,0.3)",
                    }}
                  >
                    {listening ? (
                      <Volume2 className="h-8 w-8" />
                    ) : (
                      <Mic className="h-8 w-8 text-lime-400" />
                    )}
                  </span>
                </motion.button>

                {/* Status text */}
                <p className="text-sm font-semibold mb-3">
                  {listening ? "Listening…" : transcript ? "Got it!" : "Tap to speak"}
                </p>

                {/* Transcript display */}
                {(transcript || interim) && (
                  <div className="mb-4 rounded-2xl m-card-flat p-3 min-h-[44px]">
                    <p className="text-sm text-foreground">
                      {transcript}
                      <span className="text-muted-foreground">{interim}</span>
                    </p>
                  </div>
                )}

                {/* Search button */}
                {(transcript || interim) && (
                  <motion.button
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={handleSearch}
                    className="inline-flex items-center gap-1.5 h-11 px-5 rounded-full bg-foreground text-background text-sm font-semibold m-press"
                  >
                    <Search className="h-4 w-4 text-lime-400" />
                    Search
                  </motion.button>
                )}

                {/* Hint */}
                <p className="mt-4 text-[10px] font-mono uppercase tracking-wider text-muted-foreground/60">
                  {listening ? "Say a page name, service, or question" : "Try: services, pricing, AI agent"}
                </p>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
