"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function Gallery({ onClose }: { onClose: () => void }) {
  const [pics, setPics] = useState<string[] | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/drop-artwork", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        const list = Array.isArray(data?.pics) ? (data.pics as string[]) : [];
        setPics(list);
      })
      .catch(() => {
        if (!cancelled) setPics([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="artwork gallery"
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="close"
        className="absolute inset-0 backdrop-blur-[3px] bg-black/70 cursor-default"
        onClick={onClose}
      />
      <div className="relative w-full max-w-6xl max-h-[88vh] flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <p
            className="text-cyan-200/85 text-[10px] sm:text-xs tracking-[0.4em] uppercase"
            style={{ textShadow: "0 0 10px rgba(103,232,249,0.55)" }}
          >
            // artwork &middot; in-house
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="close"
            className="w-9 h-9 rounded-full border border-white/35 bg-black/60 text-white text-lg leading-none flex items-center justify-center hover:bg-white/10 hover:border-white/70 transition-colors"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto rounded-md border border-white/15 bg-black/60 backdrop-blur-sm p-3 sm:p-5">
          {pics === null ? (
            <p className="text-white/45 text-[10px] tracking-[0.35em] uppercase text-center py-12">
              loading…
            </p>
          ) : pics.length === 0 ? (
            <p className="text-white/45 text-[10px] tracking-[0.35em] uppercase text-center py-12">
              nothing yet
            </p>
          ) : (
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {pics.map((src) => (
                <li
                  key={src}
                  className="relative aspect-square rounded-md overflow-hidden border border-white/15 bg-black"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-cover select-none"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="text-white/45 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase italic text-center">
          scroll for more. esc to close.
        </p>
      </div>
    </div>,
    document.body,
  );
}

export function ArtworkGalleryButton() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-block text-white/85 hover:text-white text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase border border-cyan-300/55 hover:border-cyan-200/85 bg-cyan-950/35 hover:bg-cyan-900/55 rounded-md px-4 py-2 transition-colors cursor-pointer"
        style={{
          textShadow:
            "0 0 8px rgba(103,232,249,0.65), 0 0 18px rgba(59,130,246,0.30)",
          boxShadow:
            "0 0 18px rgba(103,232,249,0.30), inset 0 1px 0 rgba(207,250,254,0.30)",
        }}
      >
        click here to see some ↗
      </button>
      {mounted && open && <Gallery onClose={() => setOpen(false)} />}
    </>
  );
}
