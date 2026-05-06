"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const STORAGE_KEY = "wopr_lit";

type Phase = "idle" | "asking" | "wrong" | "banned";

export function LightSwitch({ onLit }: { onLit: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [input, setInput] = useState("");
  const [remaining, setRemaining] = useState<number | null>(null);
  const [retryAfterHrs, setRetryAfterHrs] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [on, setOn] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") {
        setOn(true);
        onLit();
      }
    } catch {}
  }, [onLit]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function submit(e?: React.FormEvent) {
    e?.preventDefault();
    if (submitting || phase === "banned") return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/wopr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: input }),
      });
      const body = await res.json().catch(() => ({}));

      if (res.ok && body?.ok) {
        try {
          sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {}
        setOn(true);
        setOpen(false);
        setPhase("idle");
        setInput("");
        onLit();
      } else if (res.status === 403 && body?.banned) {
        setPhase("banned");
        setRetryAfterHrs(
          body.retryAfterMs ? Math.ceil(body.retryAfterMs / 3600000) : 24
        );
      } else {
        setPhase("wrong");
        setRemaining(typeof body?.remaining === "number" ? body.remaining : 0);
        setInput("");
      }
    } catch {
      setPhase("wrong");
      setRemaining(0);
    } finally {
      setSubmitting(false);
    }
  }

  if (!mounted || on) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          setPhase("asking");
        }}
        aria-label="light switch"
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[70] block focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60 cursor-pointer transition-transform duration-300 hover:scale-105"
        style={{
          width: "44px",
          height: "72px",
          filter:
            "drop-shadow(0 0 12px rgba(251,191,36,0.85)) drop-shadow(0 0 26px rgba(245,158,11,0.5)) drop-shadow(0 0 50px rgba(217,119,6,0.35))",
        }}
      >
        <svg viewBox="0 0 44 72" className="w-full h-full">
          <rect
            x="2"
            y="2"
            width="40"
            height="68"
            rx="2"
            fill="#1a1a1a"
            stroke="#3f3f46"
            strokeWidth="1"
          />
          <rect x="6" y="6" width="32" height="60" rx="1" fill="#0a0a0a" />
          <rect
            x="14"
            y="38"
            width="16"
            height="22"
            rx="2"
            fill="#fbbf24"
            stroke="#92400e"
            strokeWidth="1"
            opacity="0.95"
          />
          <line
            x1="14"
            y1="44"
            x2="30"
            y2="44"
            stroke="#92400e"
            strokeWidth="0.5"
            opacity="0.6"
          />
          <circle cx="22" cy="14" r="1.4" fill="#27272a" />
          <circle cx="22" cy="62" r="1.4" fill="#27272a" />
        </svg>
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8 font-mono"
            role="dialog"
            aria-modal="true"
            aria-label="light switch"
          >
            <button
              type="button"
              tabIndex={-1}
              aria-label="close"
              className="absolute inset-0 bg-black/85 backdrop-blur-sm cursor-default"
              onClick={() => {
                setOpen(false);
                setInput("");
              }}
            />

            <div
              className={`relative w-full max-w-md border ${
                phase === "banned"
                  ? "border-red-500/60"
                  : phase === "wrong"
                    ? "border-amber-400/60"
                    : "border-amber-300/50"
              } bg-black px-6 py-8 sm:px-8 sm:py-10 text-center`}
              style={{
                boxShadow:
                  phase === "banned"
                    ? "0 0 50px rgba(239,68,68,0.55), 0 0 110px rgba(127,29,29,0.4)"
                    : "0 0 40px rgba(251,191,36,0.45), 0 0 90px rgba(245,158,11,0.3)",
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setInput("");
                }}
                aria-label="close"
                className="absolute top-2 right-2 sm:top-3 sm:right-3 w-8 h-8 rounded-full border border-amber-400/40 text-amber-200 text-base leading-none flex items-center justify-center hover:bg-amber-900/40 hover:border-amber-300/60 transition-colors"
              >
                ×
              </button>

              {phase === "banned" ? (
                <>
                  <p className="text-red-300/70 text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-3">
                    ⚠ banned
                  </p>
                  <p
                    className="text-red-300 text-lg sm:text-2xl tracking-[0.2em] uppercase font-bold"
                    style={{
                      textShadow:
                        "0 0 14px rgba(239,68,68,0.85), 0 0 32px rgba(239,68,68,0.55)",
                    }}
                  >
                    come back in {retryAfterHrs ?? 24}h
                  </p>
                  <p className="text-red-200/55 italic text-[10px] sm:text-xs tracking-[0.2em] uppercase mt-4">
                    the room remembers your address
                  </p>
                </>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <p className="text-amber-200/80 italic text-[10px] sm:text-xs tracking-[0.4em] uppercase">
                    light switch
                  </p>
                  <input
                    type="password"
                    autoFocus
                    autoComplete="off"
                    spellCheck={false}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="········"
                    className="w-full bg-amber-950/20 border border-amber-300/40 text-amber-100 text-center text-base sm:text-lg tracking-[0.3em] uppercase rounded px-5 py-3 outline-none focus:border-amber-200/70 focus:bg-amber-950/40 transition-colors placeholder:text-amber-100/25"
                  />
                  <button
                    type="submit"
                    disabled={submitting || !input.trim()}
                    className="text-amber-100 text-xs sm:text-sm tracking-[0.4em] uppercase border border-amber-300/50 rounded px-6 py-2 hover:bg-amber-900/40 hover:border-amber-200/70 transition-colors disabled:opacity-40"
                  >
                    {submitting ? "checking..." : "flip"}
                  </button>
                  {phase === "wrong" && (
                    <p className="text-amber-300/85 italic text-[10px] sm:text-xs tracking-[0.25em] uppercase">
                      {remaining === 1
                        ? "you have one more chance"
                        : "wrong"}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
