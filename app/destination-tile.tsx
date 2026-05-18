"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function DestinationTile({
  label,
  tagline,
  modalTitle,
  description,
  url,
}: {
  label: string;
  tagline: string;
  modalTitle: string;
  description: string;
  url: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

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

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group block w-full rounded-md border border-black/25 bg-white hover:bg-black hover:text-white transition-colors px-6 py-4 text-center"
      >
        <span className="block text-base tracking-[0.5em] uppercase font-light">
          {label}
        </span>
        <span className="block mt-1 text-[10px] tracking-[0.25em] uppercase text-black/55 group-hover:text-white/65">
          {tagline}
        </span>
      </button>
      {open && mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label={modalTitle}
          >
            <button
              type="button"
              tabIndex={-1}
              aria-label="close"
              className="absolute inset-0 bg-black/40 backdrop-blur-[2px] cursor-default"
              onClick={() => setOpen(false)}
            />
            <div className="relative w-full max-w-md bg-white text-black border border-black/15 rounded-md p-6 flex flex-col gap-5 shadow-2xl">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xs tracking-[0.4em] uppercase text-black/55">
                  {modalTitle}
                </h2>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="close"
                  className="w-8 h-8 rounded-full border border-black/20 text-black/60 text-lg leading-none flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors"
                >
                  ×
                </button>
              </div>
              <p className="text-sm leading-relaxed text-black/80">
                {description}
              </p>
              <div className="flex flex-row items-center justify-end gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-md border border-black/25 px-4 py-2 text-xs tracking-[0.3em] uppercase font-light text-black/70 hover:bg-black/5 transition-colors"
                >
                  Close
                </button>
                <a
                  href={url}
                  className="rounded-md border border-black bg-black px-4 py-2 text-xs tracking-[0.3em] uppercase font-light text-white hover:bg-black/85 transition-colors"
                >
                  Go
                </a>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
