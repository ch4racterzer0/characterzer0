"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const STORAGE_KEY = "zero-thoughts-v1";
const SAVE_DEBOUNCE_MS = 600;
const POLL_INTERVAL_MS = 15_000;

export function useZeroThoughtsBroadcast() {
  const [text, setText] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const r = await fetch("/api/thoughts", { cache: "no-store" });
        if (!r.ok) return;
        const j = (await r.json()) as { text?: string };
        if (!cancelled && typeof j.text === "string") setText(j.text);
      } catch {}
    }
    load();
    const id = setInterval(load, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  return text;
}

export function ZeroThoughts() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [text, setText] = useState("");
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [broadcasting, setBroadcasting] = useState<"idle" | "saving" | "live" | "error">(
    "idle",
  );
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
    let cached = "";
    try {
      cached = localStorage.getItem(STORAGE_KEY) ?? "";
      if (cached) setText(cached);
    } catch {}
    fetch("/api/thoughts", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j: { text?: string } | null) => {
        if (j && typeof j.text === "string") {
          setText(j.text);
          try {
            localStorage.setItem(STORAGE_KEY, j.text);
          } catch {}
          setBroadcasting("live");
        }
      })
      .catch(() => {});
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

  function broadcast(value: string) {
    setBroadcasting("saving");
    fetch("/api/thoughts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: value }),
    })
      .then((r) => {
        if (!r.ok) throw new Error("save failed");
        setBroadcasting("live");
      })
      .catch(() => setBroadcasting("error"));
  }

  function scheduleBroadcast(value: string) {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => broadcast(value), SAVE_DEBOUNCE_MS);
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const next = e.target.value;
    setText(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
      setSavedAt(Date.now());
    } catch {}
    scheduleBroadcast(next);
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
    broadcast("");
  }

  function copyAll() {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    navigator.clipboard.writeText(text).catch(() => {});
  }

  const charCount = text.length;
  const lineCount = text ? text.split("\n").length : 0;

  return (
    <>
      <div
        aria-hidden
        className="hidden sm:flex relative items-start justify-center w-full max-w-md sm:max-w-lg h-20 sm:h-24 rounded-md border border-blue-400/35 overflow-hidden bg-black"
        style={{
          backgroundImage: "url('/itsyoursphere-banner.png')",
          backgroundSize: "200% auto",
          backgroundPosition: "center 35%",
          boxShadow:
            "inset 0 0 30px rgba(59,130,246,0.15), 0 0 18px rgba(59,130,246,0.18)",
        }}
      >
        <span
          className="relative z-10 mt-1.5 text-blue-100/85 text-[10px] sm:text-xs tracking-[0.4em] uppercase"
          style={{
            textShadow:
              "0 0 10px rgba(96,165,250,0.55), 0 0 22px rgba(59,130,246,0.3), 0 0 30px rgba(0,0,0,0.85)",
          }}
        >
          // zer0&rsquo;s thoughts
        </span>
      </div>

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
                placeholder="anything you want to come back to.&#10;&#10;this broadcasts. whatever you write here lights up inside every sphere."
                spellCheck={false}
                className="flex-1 min-h-[40vh] w-full bg-transparent text-blue-100 text-sm sm:text-base leading-relaxed font-mono px-5 py-5 sm:px-7 sm:py-6 outline-none resize-none placeholder:text-blue-100/30"
                autoFocus
              />
              <footer className="flex items-center justify-between gap-3 border-t border-blue-400/30 px-4 py-2 sm:px-5 sm:py-3 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase">
                <span className="text-blue-300/55 tabular-nums">
                  {lineCount} {lineCount === 1 ? "line" : "lines"} ·{" "}
                  {charCount.toLocaleString()} chars
                </span>
                <span
                  className={`italic ${
                    broadcasting === "error"
                      ? "text-red-300/70"
                      : broadcasting === "saving"
                        ? "text-blue-200/70"
                        : "text-blue-300/55"
                  }`}
                >
                  {broadcasting === "saving"
                    ? "broadcasting…"
                    : broadcasting === "error"
                      ? "save failed · cached locally"
                      : broadcasting === "live"
                        ? "● live in every sphere"
                        : "○ ready"}
                </span>
              </footer>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
