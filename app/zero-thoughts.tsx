"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const STORAGE_KEY = "zero-thoughts-v1";

export function ZeroThoughts() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [text, setText] = useState("");
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setText(saved);
    } catch {}
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const next = e.target.value;
    setText(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
      setSavedAt(Date.now());
    } catch {}
  }

  function clearAll() {
    if (typeof window === "undefined") return;
    if (!window.confirm("clear all of zer0's thoughts? this can't be undone.")) {
      return;
    }
    setText("");
    try {
      localStorage.removeItem(STORAGE_KEY);
      setSavedAt(Date.now());
    } catch {}
  }

  function copyAll() {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    navigator.clipboard.writeText(text).catch(() => {});
  }

  const charCount = text.length;
  const lineCount = text ? text.split("\n").length : 0;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="open zer0's thoughts"
        className="hidden sm:flex relative items-center justify-between gap-3 w-full max-w-md sm:max-w-lg px-4 py-3 sm:px-5 sm:py-3 rounded-md border border-blue-400/35 bg-blue-950/15 hover:bg-blue-950/30 hover:border-blue-300/60 cursor-pointer transition-colors"
        style={{
          boxShadow:
            "inset 0 0 30px rgba(59,130,246,0.15), 0 0 18px rgba(59,130,246,0.18)",
        }}
      >
        <span
          className="text-blue-100/85 text-[10px] sm:text-xs tracking-[0.4em] uppercase"
          style={{
            textShadow:
              "0 0 10px rgba(96,165,250,0.55), 0 0 22px rgba(59,130,246,0.3)",
          }}
        >
          // zer0&rsquo;s thoughts
        </span>
        <span className="text-blue-300/55 text-[8px] sm:text-[10px] tracking-[0.3em] uppercase italic">
          open ↗
        </span>
      </button>

      {open &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8 font-mono"
            role="dialog"
            aria-modal="true"
            aria-label="zer0's thoughts"
          >
            <button
              type="button"
              tabIndex={-1}
              aria-label="close"
              className="absolute inset-0 bg-black/85 backdrop-blur-sm cursor-default"
              onClick={() => setOpen(false)}
            />
            <div
              className="relative w-full max-w-2xl max-h-[88vh] flex flex-col border border-blue-400/45 bg-black"
              style={{
                boxShadow:
                  "0 0 60px rgba(59,130,246,0.45), 0 0 140px rgba(59,130,246,0.22), inset 0 1px 0 rgba(147,197,253,0.30)",
              }}
            >
              <header className="flex items-center justify-between gap-3 border-b border-blue-400/30 px-4 py-3 sm:px-5 sm:py-4">
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    aria-hidden
                    className="block w-2 h-2 rounded-full bg-blue-300"
                    style={{ boxShadow: "0 0 10px rgba(147,197,253,0.85)" }}
                  />
                  <span
                    className="text-blue-100 text-[10px] sm:text-xs tracking-[0.4em] uppercase truncate"
                    style={{
                      textShadow:
                        "0 0 12px rgba(96,165,250,0.55), 0 0 28px rgba(59,130,246,0.3)",
                    }}
                  >
                    // zer0&rsquo;s thoughts
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={copyAll}
                    disabled={!text}
                    className="text-blue-200/80 hover:text-blue-100 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase border border-blue-400/40 hover:border-blue-300/70 rounded px-2 py-1 hover:bg-blue-900/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    copy all
                  </button>
                  <button
                    type="button"
                    onClick={clearAll}
                    disabled={!text}
                    className="text-red-300/80 hover:text-red-200 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase border border-red-400/40 hover:border-red-300/70 rounded px-2 py-1 hover:bg-red-900/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    clear
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="close"
                    className="w-8 h-8 rounded-full border border-blue-400/40 text-blue-100 text-lg leading-none flex items-center justify-center hover:bg-blue-900/40 hover:border-blue-300/70 transition-colors"
                  >
                    ×
                  </button>
                </div>
              </header>
              <textarea
                value={text}
                onChange={handleChange}
                placeholder="anything you want to come back to.&#10;&#10;writes only to your browser. nobody else sees it unless you copy it out and hand it to them."
                spellCheck={false}
                className="flex-1 min-h-[40vh] w-full bg-transparent text-blue-100 text-sm sm:text-base leading-relaxed font-mono px-5 py-5 sm:px-7 sm:py-6 outline-none resize-none placeholder:text-blue-100/30"
                autoFocus
              />
              <footer className="flex items-center justify-between gap-3 border-t border-blue-400/30 px-4 py-2 sm:px-5 sm:py-3 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase">
                <span className="text-blue-300/55 tabular-nums">
                  {lineCount} {lineCount === 1 ? "line" : "lines"} ·{" "}
                  {charCount.toLocaleString()} chars
                </span>
                <span className="text-blue-300/45 italic">
                  {savedAt ? "saved · localstorage" : "auto-saves as you type"}
                </span>
              </footer>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
