"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, FileText, ArrowRight, Loader2 } from "lucide-react";

/**
 * Mobile-only Content Search.
 *
 * Unlike the Command Palette (which searches page titles + service names),
 * this searches the ACTUAL TEXT CONTENT on the current page.
 *
 * Opens via a "Search this page" button that can be placed anywhere.
 * Highlights matches and lets users jump to them.
 *
 * Desktop (lg+) renders nothing.
 */

type SearchResult = {
  text: string;
  element: HTMLElement;
  rect: DOMRect;
  matchIndex: number;
};

export default function MobileContentSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Search page content when query changes
  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    const t = setTimeout(() => {
      const found = searchPageContent(query);
      setResults(found);
      setCurrentIdx(0);
      setLoading(false);
    }, 200);
    return () => clearTimeout(t);
  }, [query]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 200);
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  const scrollToResult = (idx: number) => {
    const result = results[idx];
    if (!result) return;
    result.element.scrollIntoView({ behavior: "smooth", block: "center" });
    // Brief highlight
    // eslint-disable-next-line react-hooks/immutability
    result.element.style.transition = "background-color 0.3s ease";
    const originalBg = result.element.style.backgroundColor;
     
    result.element.style.backgroundColor = "oklch(0.7 0.19 128 / 0.2)";
    setTimeout(() => {
       
      result.element.style.backgroundColor = originalBg;
    }, 1500);
    setCurrentIdx(idx);
  };

  const totalMatches = results.length;

  return (
    <>
      {/* Trigger button — placed by parent */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden fixed inset-0 z-[70] bg-foreground/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ y: -20, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden fixed top-0 left-0 right-0 z-[71] safe-pt"
            >
              <div className="m-glass border-b border-border/60">
                <div className="safe-px py-3">
                  <div className="flex items-center gap-2.5">
                    <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                    <input
                      ref={inputRef}
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search this page…"
                      className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                    />
                    {loading && <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />}
                    <button
                      onClick={() => setOpen(false)}
                      aria-label="Close search"
                      className="m-tap m-press h-7 w-7 rounded-full m-chip flex items-center justify-center shrink-0"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p className="mt-2 text-[9px] font-mono uppercase tracking-wider text-muted-foreground/60 flex items-center gap-1">
                    <FileText className="h-2.5 w-2.5" />
                    Searching current page content
                  </p>
                </div>
              </div>

              {/* Results */}
              <div className="bg-background safe-px max-h-[60vh] overflow-y-auto">
                {query.trim().length >= 2 && !loading && totalMatches === 0 && (
                  <div className="py-10 text-center">
                    <p className="text-sm text-muted-foreground">
                      No matches for &ldquo;{query}&rdquo;
                    </p>
                    <p className="text-[10px] text-muted-foreground/60 mt-1">
                      Try a different keyword
                    </p>
                  </div>
                )}

                {totalMatches > 0 && (
                  <div className="py-2">
                    <p className="text-[9px] font-mono uppercase tracking-[0.22em] text-muted-foreground/60 px-1 py-1.5">
                      {totalMatches} match{totalMatches !== 1 ? "es" : ""} on this page
                    </p>
                    {results.slice(0, 10).map((r, i) => (
                      <button
                        key={i}
                        onClick={() => scrollToResult(i)}
                        className={`w-full text-left rounded-xl px-3 py-3 m-press transition-colors ${
                          i === currentIdx ? "bg-foreground text-background" : "hover:bg-muted/60"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className={`text-[10px] font-mono ${i === currentIdx ? "text-background/60" : "text-muted-foreground/60"}`}>
                            Match {i + 1}
                          </span>
                          <ArrowRight className="h-3 w-3 shrink-0" />
                        </div>
                        <p className={`text-xs mt-1 line-clamp-2 ${i === currentIdx ? "text-background/90" : "text-foreground/80"}`}>
                          …{r.text}…
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer with navigation */}
              {totalMatches > 0 && (
                <div className="bg-background border-t border-border safe-px py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => scrollToResult(Math.max(0, currentIdx - 1))}
                      disabled={currentIdx === 0}
                      className="text-[10px] font-mono text-muted-foreground hover:text-foreground disabled:opacity-30 m-press"
                    >
                      ← Prev
                    </button>
                    <span className="text-[9px] font-mono text-muted-foreground">
                      {currentIdx + 1} / {Math.min(totalMatches, 10)}
                    </span>
                    <button
                      onClick={() => scrollToResult(Math.min(results.length - 1, currentIdx + 1))}
                      disabled={currentIdx >= results.length - 1}
                      className="text-[10px] font-mono text-muted-foreground hover:text-foreground disabled:opacity-30 m-press"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function searchPageContent(query: string): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results: SearchResult[] = [];
  const walker = document.createTreeWalker(
    document.querySelector("main") ?? document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        // Skip script, style, hidden elements
        const tag = parent.tagName;
        if (["SCRIPT", "STYLE", "NOSCRIPT"].includes(tag)) return NodeFilter.FILTER_REJECT;
        if (parent.offsetParent === null && parent.getClientRects().length === 0) return NodeFilter.FILTER_REJECT;
        if (!node.textContent?.toLowerCase().includes(q)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    }
  );

  while (walker.nextNode() && results.length < 20) {
    const node = walker.currentNode as Text;
    const text = node.textContent ?? "";
    const lowerText = text.toLowerCase();
    const idx = lowerText.indexOf(q);
    if (idx >= 0) {
      // Extract context around the match
      const start = Math.max(0, idx - 40);
      const end = Math.min(text.length, idx + q.length + 40);
      const context = text.slice(start, end).trim();
      results.push({
        text: context,
        element: node.parentElement as HTMLElement,
        rect: (node.parentElement as HTMLElement)?.getBoundingClientRect(),
        matchIndex: idx,
      });
    }
  }

  return results;
}

/**
 * Trigger button for opening content search.
 */
export function MobileContentSearchButton() {
  const [show, setShow] = useState(false);

  // Expose a global trigger
  useEffect(() => {
    (window as unknown as { __openContentSearch?: () => void }).__openContentSearch = () => setShow(true);
    return () => {
      delete (window as unknown as { __openContentSearch?: () => void }).__openContentSearch;
    };
  }, []);

  // This component just renders the search UI when triggered
  // The actual trigger button is placed elsewhere (e.g., in the menu)
  return <MobileContentSearchController show={show} setShow={setShow} />;
}

function MobileContentSearchController({
  show,
  setShow,
}: {
  show: boolean;
  setShow: (v: boolean) => void;
}) {
  // This is a wrapper that renders the actual search when show=true
  // We can't conditionally render MobileContentSearch because it has its own AnimatePresence
  // So we pass the open state down
  return <MobileContentSearchWrapper open={show} setOpen={setShow} />;
}

function MobileContentSearchWrapper({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  // Render the search overlay
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    const t = setTimeout(() => {
      const found = searchPageContent(query);
      setResults(found);
      setCurrentIdx(0);
      setLoading(false);
    }, 200);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 200);
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  const scrollToResult = (idx: number) => {
    const result = results[idx];
    if (!result) return;
    result.element.scrollIntoView({ behavior: "smooth", block: "center" });
    // eslint-disable-next-line react-hooks/immutability
    result.element.style.transition = "background-color 0.3s ease";
    const originalBg = result.element.style.backgroundColor;
     
    result.element.style.backgroundColor = "oklch(0.7 0.19 128 / 0.2)";
    setTimeout(() => {
       
      result.element.style.backgroundColor = originalBg;
    }, 1500);
    setCurrentIdx(idx);
  };

  const totalMatches = results.length;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-0 z-[70] bg-foreground/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ y: -20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed top-0 left-0 right-0 z-[71] safe-pt"
          >
            <div className="m-glass border-b border-border/60">
              <div className="safe-px py-3">
                <div className="flex items-center gap-2.5">
                  <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search this page…"
                    className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                  />
                  {loading && <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />}
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close search"
                    className="m-tap m-press h-7 w-7 rounded-full m-chip flex items-center justify-center shrink-0"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                <p className="mt-2 text-[9px] font-mono uppercase tracking-wider text-muted-foreground/60 flex items-center gap-1">
                  <FileText className="h-2.5 w-2.5" />
                  Searching current page content
                </p>
              </div>
            </div>

            <div className="bg-background safe-px max-h-[60vh] overflow-y-auto">
              {query.trim().length >= 2 && !loading && totalMatches === 0 && (
                <div className="py-10 text-center">
                  <p className="text-sm text-muted-foreground">
                    No matches for &ldquo;{query}&rdquo;
                  </p>
                  <p className="text-[10px] text-muted-foreground/60 mt-1">
                    Try a different keyword
                  </p>
                </div>
              )}

              {totalMatches > 0 && (
                <div className="py-2">
                  <p className="text-[9px] font-mono uppercase tracking-[0.22em] text-muted-foreground/60 px-1 py-1.5">
                    {totalMatches} match{totalMatches !== 1 ? "es" : ""} on this page
                  </p>
                  {results.slice(0, 10).map((r, i) => (
                    <button
                      key={i}
                      onClick={() => scrollToResult(i)}
                      className={`w-full text-left rounded-xl px-3 py-3 m-press transition-colors ${
                        i === currentIdx ? "bg-foreground text-background" : "hover:bg-muted/60"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[10px] font-mono ${i === currentIdx ? "text-background/60" : "text-muted-foreground/60"}`}>
                          Match {i + 1}
                        </span>
                        <ArrowRight className="h-3 w-3 shrink-0" />
                      </div>
                      <p className={`text-xs mt-1 line-clamp-2 ${i === currentIdx ? "text-background/90" : "text-foreground/80"}`}>
                        …{r.text}…
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {totalMatches > 0 && (
              <div className="bg-background border-t border-border safe-px py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => scrollToResult(Math.max(0, currentIdx - 1))}
                    disabled={currentIdx === 0}
                    className="text-[10px] font-mono text-muted-foreground hover:text-foreground disabled:opacity-30 m-press"
                  >
                    ← Prev
                  </button>
                  <span className="text-[9px] font-mono text-muted-foreground">
                    {currentIdx + 1} / {Math.min(totalMatches, 10)}
                  </span>
                  <button
                    onClick={() => scrollToResult(Math.min(results.length - 1, currentIdx + 1))}
                    disabled={currentIdx >= results.length - 1}
                    className="text-[10px] font-mono text-muted-foreground hover:text-foreground disabled:opacity-30 m-press"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
