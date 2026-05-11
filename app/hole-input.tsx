"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const DAILY_LIMIT = 2;

function todayKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `hole-drops-${y}-${m}-${day}`;
}

export function HoleInput() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState("");
  const [dropping, setDropping] = useState<{ id: number; text: string } | null>(
    null,
  );
  const [count, setCount] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setMounted(true);
    setHydrated(true);
    try {
      const raw = localStorage.getItem(todayKey());
      if (raw) setCount(parseInt(raw, 10) || 0);
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

  const remaining = Math.max(0, DAILY_LIMIT - count);
  const blocked = hydrated && remaining <= 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = value.trim();
    if (!text || blocked) return;
    const next = count + 1;
    setCount(next);
    try {
      localStorage.setItem(todayKey(), String(next));
    } catch {}
    setDropping({ id: Date.now(), text });
    setValue("");
    setTimeout(() => setDropping(null), 1800);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="零号"
        className="group w-44 sm:w-48 backdrop-blur-[2px] bg-blue-950/40 hover:bg-blue-950/60 border border-blue-300/55 hover:border-blue-200/85 px-3 py-2 rounded-xl transition-colors flex flex-col items-center gap-0.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
        style={{
          boxShadow:
            "0 0 22px rgba(96,165,250,0.45), 0 0 50px rgba(59,130,246,0.22), 0 8px 22px -8px rgba(0,0,0,0.65), inset 0 1px 0 rgba(147,197,253,0.30)",
        }}
      >
        <span className="flex items-center gap-1.5 text-blue-200/80 text-[8px] tracking-[0.4em] uppercase">
          <span
            aria-hidden
            className="block w-2 h-2 rounded-full"
            style={{
              background: `
                radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 28%, rgba(30,58,138,0.85) 52%, rgba(0,0,0,0) 100%),
                conic-gradient(from 220deg at 50% 50%, #000 0deg, #1e3a8a 80deg, #1e40af 160deg, #000 240deg, #1e3a8a 320deg, #000 360deg)
              `,
              boxShadow:
                "inset 0 0 4px rgba(0,0,0,0.95), 0 0 6px rgba(59,130,246,0.55)",
              animation: "blackhole-spin 8s linear infinite",
            }}
          />
          ↗ hole
        </span>
        <span
          className="text-blue-100 text-base sm:text-lg tracking-[0.25em]"
          style={{
            textShadow:
              "0 0 10px rgba(147,197,253,0.85), 0 0 22px rgba(96,165,250,0.55)",
          }}
        >
          零号
        </span>
        <span className="text-blue-300/65 text-[8px] tracking-[0.3em] uppercase italic">
          drops to eliza
        </span>
      </button>

      {open &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="hole — l"
          >
            <button
              type="button"
              tabIndex={-1}
              aria-label="close"
              className="absolute inset-0 bg-black/85 backdrop-blur-sm cursor-default"
              onClick={() => setOpen(false)}
            />
            <form
              onSubmit={handleSubmit}
              className="relative w-full max-w-lg rounded-2xl border border-blue-400/45 bg-black p-6 sm:p-8 overflow-hidden"
              style={{
                boxShadow:
                  "0 0 80px rgba(59, 130, 246, 0.50), 0 0 160px rgba(59, 130, 246, 0.25), inset 0 1px 0 rgba(147, 197, 253, 0.30)",
              }}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="close"
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-blue-950/80 border border-blue-400/40 text-blue-100 text-lg leading-none flex items-center justify-center hover:bg-blue-900/80 transition-colors"
              >
                ×
              </button>

              <div className="flex items-baseline justify-between gap-3 mb-4 pr-10">
                <span
                  className="text-blue-100/85 text-[11px] sm:text-xs tracking-[0.4em] uppercase font-mono"
                  style={{
                    textShadow:
                      "0 0 10px rgba(96,165,250,0.55), 0 0 22px rgba(59,130,246,0.3)",
                  }}
                >
                  // hole &mdash; l
                </span>
                <span className="text-blue-300/55 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase italic font-mono tabular-nums">
                  {hydrated
                    ? blocked
                      ? "the hole is full for today"
                      : `${remaining}/${DAILY_LIMIT} drops left today`
                    : "drops to eliza"}
                </span>
              </div>

              <div className="flex items-stretch gap-2 font-mono">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={
                    blocked ? "come back tomorrow" : "drop something in"
                  }
                  aria-label="drop something in the hole"
                  disabled={blocked}
                  autoFocus
                  className="flex-1 bg-blue-950/40 border border-blue-400/30 text-blue-100 text-sm sm:text-base tracking-wider rounded px-3 py-2 outline-none focus:border-blue-300/70 focus:bg-blue-950/60 transition-colors placeholder:text-blue-100/30 disabled:opacity-40 disabled:cursor-not-allowed"
                />
                <button
                  type="submit"
                  disabled={!value.trim() || blocked}
                  className="text-blue-100/85 hover:text-blue-100 text-[10px] sm:text-xs tracking-[0.4em] uppercase border border-blue-400/40 hover:border-blue-300/70 rounded px-4 py-2 hover:bg-blue-900/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  drop ↓
                </button>
              </div>

              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 bottom-[-8px] -translate-x-1/2 w-32 h-4 rounded-full"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0) 100%)",
                  boxShadow:
                    "0 0 22px rgba(0,0,0,0.85), inset 0 1px 0 rgba(59,130,246,0.35)",
                }}
              />
              {dropping && (
                <div
                  key={dropping.id}
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-4 text-blue-100 text-sm sm:text-base font-mono tracking-wider whitespace-nowrap"
                  style={{
                    textShadow:
                      "0 0 10px rgba(96,165,250,0.7), 0 0 22px rgba(59,130,246,0.5)",
                    animation: "drop-into-hole 1.6s ease-in forwards",
                  }}
                >
                  {dropping.text}
                </div>
              )}
            </form>
          </div>,
          document.body,
        )}
    </>
  );
}
