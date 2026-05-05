"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { TheHole } from "./yoursphere/hole";

export function HoleTile() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-blue-100/80 text-[10px] sm:text-xs tracking-[0.4em] uppercase font-light">
        hole &mdash; k
      </span>

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open the hole"
        className="relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 rounded-xl"
      >
        <span
          aria-hidden
          className="absolute -inset-6 rounded-full blur-3xl bg-blue-500/15"
        />
        <span
          className="relative block rounded-xl border border-blue-400/40 bg-blue-950/40 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5 px-5 sm:px-7 py-3 sm:py-4"
          style={{
            transform: "perspective(1200px) rotateX(-8deg)",
            boxShadow:
              "0 0 30px rgba(59, 130, 246, 0.40), 0 0 60px rgba(59, 130, 246, 0.18), 0 12px 28px -10px rgba(59, 130, 246, 0.40), inset 0 1px 0 rgba(147, 197, 253, 0.35)",
          }}
        >
          <span
            aria-hidden
            className="block w-12 h-12 sm:w-16 sm:h-16 rounded-full mx-auto"
            style={{
              background: `
                radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%, rgba(30,58,138,0.85) 55%, rgba(0,0,0,0) 100%),
                conic-gradient(from 220deg at 50% 50%, #000 0deg, #1e3a8a 80deg, #1e40af 160deg, #000 240deg, #1e3a8a 320deg, #000 360deg)
              `,
              boxShadow:
                "inset 0 0 18px rgba(0,0,0,0.95), 0 0 22px rgba(59,130,246,0.45), 0 0 4px rgba(0,0,0,1)",
            }}
          />
        </span>
      </button>

      {open &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="the hole"
          >
            <button
              type="button"
              aria-label="Close"
              tabIndex={-1}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm cursor-default"
              onClick={() => setOpen(false)}
            />
            <div
              className="relative w-full max-w-2xl rounded-2xl border border-blue-400/40 bg-black p-8 sm:p-12"
              style={{
                boxShadow:
                  "0 0 80px rgba(59, 130, 246, 0.50), 0 0 160px rgba(59, 130, 246, 0.25), inset 0 1px 0 rgba(147, 197, 253, 0.30)",
              }}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-blue-950/80 border border-blue-400/40 text-blue-100 text-lg leading-none flex items-center justify-center hover:bg-blue-900/80 transition-colors"
              >
                ×
              </button>
              <TheHole />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
