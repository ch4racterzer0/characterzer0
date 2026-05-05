"use client";

import { useEffect, useState } from "react";

export function CreatorTile() {
  const [open, setOpen] = useState(false);

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
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 rounded-xl"
        aria-label="Open The Creator"
      >
        <span
          aria-hidden
          className="absolute -inset-12 rounded-full blur-3xl bg-blue-500/20"
        />
        <span
          className="relative block rounded-xl border border-blue-400/40 bg-blue-950/40 backdrop-blur-sm px-8 sm:px-12 py-4 sm:py-6 transition-transform duration-300 hover:-translate-y-0.5"
          style={{
            transform: "perspective(1200px) rotateX(-8deg)",
            boxShadow:
              "0 0 60px rgba(59, 130, 246, 0.55), 0 0 120px rgba(59, 130, 246, 0.30), 0 25px 50px -10px rgba(59, 130, 246, 0.50), inset 0 1px 0 rgba(147, 197, 253, 0.45)",
          }}
        >
          <span className="block text-blue-100 font-light uppercase whitespace-nowrap text-base sm:text-xl md:text-2xl tracking-[0.3em] sm:tracking-[0.4em]">
            The Creator
          </span>
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="The Creator"
        >
          <button
            type="button"
            aria-label="Close"
            tabIndex={-1}
            className="absolute inset-0 bg-black/85 backdrop-blur-sm cursor-default"
            onClick={() => setOpen(false)}
          />
          <div
            className="relative w-full max-w-6xl h-[88vh] rounded-2xl overflow-hidden border border-blue-400/40 bg-black"
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
            <iframe
              src="https://www.itethered.com/trey"
              title="The Creator"
              sandbox=""
              className="w-full h-full border-0"
            />
          </div>
        </div>
      )}
    </>
  );
}
