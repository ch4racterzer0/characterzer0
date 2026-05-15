"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const CHANNEL_URL = "https://www.youtube.com/@chracterzer0";

function ChannelPopup({ onClose }: { onClose: () => void }) {
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

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Chracterzer零号 youtube channel"
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="close"
        className="absolute inset-0 backdrop-blur-[2px] bg-black/70 cursor-default"
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-md flex flex-col items-stretch gap-5 border border-red-400/45 bg-black/90 backdrop-blur-md rounded-xl px-6 py-7"
        style={{
          boxShadow:
            "0 0 40px rgba(248,113,113,0.35), 0 0 90px rgba(220,38,38,0.18), inset 0 1px 0 rgba(254,202,202,0.30)",
        }}
      >
        <div className="flex items-center justify-between gap-4">
          <p
            className="text-red-200/85 text-[10px] sm:text-xs tracking-[0.4em] uppercase"
            style={{ textShadow: "0 0 10px rgba(248,113,113,0.55)" }}
          >
            // youtube · channel
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="close"
            className="w-8 h-8 rounded-full border border-red-400/45 bg-red-950/60 text-red-100 text-base leading-none flex items-center justify-center hover:bg-red-900/70 hover:border-red-300/70 transition-colors"
          >
            ×
          </button>
        </div>

        <p
          className="text-white text-lg sm:text-xl tracking-[0.1em] font-light text-center"
          style={{
            textShadow:
              "0 0 10px rgba(255,255,255,0.55), 0 0 22px rgba(248,113,113,0.35)",
          }}
        >
          Chracterzer零号
        </p>

        <p className="text-white/75 text-sm leading-relaxed text-center">
          Every Tethered chapter lands here as a short. Full season runs go up
          as singles. New episodes drop as life unfolds — same room you&rsquo;re
          in now, just unrolled.
        </p>

        <a
          href={CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="self-center text-red-100 hover:text-white text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase border border-red-400/55 hover:border-red-200/85 bg-red-950/55 hover:bg-red-900/70 rounded-md px-5 py-2 transition-colors"
          style={{
            textShadow:
              "0 0 8px rgba(254,202,202,0.85), 0 0 18px rgba(220,38,38,0.45)",
            boxShadow:
              "0 0 18px rgba(220,38,38,0.30), inset 0 1px 0 rgba(254,202,202,0.30)",
          }}
        >
          open channel ↗
        </a>

        <p className="text-red-300/55 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase italic text-center">
          esc to close
        </p>
      </div>
    </div>,
    document.body,
  );
}

export function ChracterzerTile() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Chracterzer零号 — youtube channel"
        className="group relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/60 rounded-xl"
      >
        <span
          aria-hidden
          className="absolute -inset-6 rounded-full blur-3xl bg-red-500/18"
        />
        <span
          className="relative block rounded-xl border border-red-400/45 bg-red-950/45 hover:bg-red-900/60 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5 px-5 sm:px-7 py-3 sm:py-4"
          style={{
            transform: "perspective(1200px) rotateX(-8deg)",
            boxShadow:
              "0 0 30px rgba(248,113,113,0.38), 0 0 60px rgba(220,38,38,0.20), 0 12px 28px -10px rgba(220,38,38,0.40), inset 0 1px 0 rgba(254,202,202,0.35)",
          }}
        >
          <span
            className="block text-white font-light uppercase whitespace-nowrap text-[10px] sm:text-xs tracking-[0.25em]"
            style={{
              textShadow:
                "0 0 10px rgba(255,255,255,0.85), 0 0 22px rgba(248,113,113,0.55)",
            }}
          >
            Chracterzer零号
          </span>
          <span className="mt-1 block text-red-300/65 text-[8px] sm:text-[9px] tracking-[0.3em] uppercase">
            ↗ youtube
          </span>
        </span>
      </button>
      {mounted && open && <ChannelPopup onClose={() => setOpen(false)} />}
    </>
  );
}
