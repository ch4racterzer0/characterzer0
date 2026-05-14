"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const SITE_URL = "https://yiswmt.com";

function GivingBackPopup({ onClose }: { onClose: () => void }) {
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
      aria-label="yiswmt — giving back"
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="close"
        className="absolute inset-0 backdrop-blur-[2px] bg-black/75 cursor-default"
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-md flex flex-col items-stretch gap-5 border border-amber-300/45 bg-black/92 backdrop-blur-md rounded-xl px-6 py-7"
        style={{
          boxShadow:
            "0 0 40px rgba(251,191,36,0.28), 0 0 90px rgba(217,119,6,0.16), inset 0 1px 0 rgba(253,230,138,0.30)",
        }}
      >
        <div className="flex items-center justify-between gap-4">
          <p
            className="text-amber-200/85 text-[10px] sm:text-xs tracking-[0.4em] uppercase"
            style={{ textShadow: "0 0 10px rgba(251,191,36,0.55)" }}
          >
            // giving back
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="close"
            className="w-8 h-8 rounded-full border border-amber-300/45 bg-amber-950/60 text-amber-100 text-base leading-none flex items-center justify-center hover:bg-amber-900/70 hover:border-amber-200/70 transition-colors"
          >
            ×
          </button>
        </div>

        <p
          className="text-amber-100 text-lg sm:text-xl tracking-[0.18em] font-light text-center uppercase"
          style={{
            textShadow:
              "0 0 10px rgba(253,230,138,0.65), 0 0 22px rgba(251,191,36,0.35)",
          }}
        >
          YISWMT
        </p>
        <p
          className="text-amber-200/70 text-[10px] sm:text-xs tracking-[0.3em] italic text-center uppercase"
          style={{ textShadow: "0 0 6px rgba(251,191,36,0.30)" }}
        >
          your image stays with me tonight
        </p>

        <p className="text-white/80 text-sm leading-relaxed text-center">
          A free memorial home for the families of service members we&rsquo;ve
          lost. Caring, not militant. Every tee sold puts money in a pot that
          goes back to families. Every paywall ticket is a one-cent receipt of
          a good deed already done somewhere else.
        </p>
        <p className="text-white/55 text-xs italic leading-relaxed text-center">
          The ultimate tether.
        </p>

        <a
          href={SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="self-center text-amber-100 hover:text-white text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase border border-amber-300/55 hover:border-amber-200/85 bg-amber-950/55 hover:bg-amber-900/70 rounded-md px-5 py-2 transition-colors"
          style={{
            textShadow:
              "0 0 8px rgba(253,230,138,0.85), 0 0 18px rgba(217,119,6,0.45)",
            boxShadow:
              "0 0 18px rgba(217,119,6,0.30), inset 0 1px 0 rgba(253,230,138,0.30)",
          }}
        >
          open yiswmt.com ↗
        </a>

        <p className="text-amber-300/55 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase italic text-center">
          esc to close
        </p>
      </div>
    </div>,
    document.body,
  );
}

export function YiswmtTile() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="yiswmt — giving back"
        className="group relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60 rounded-xl"
      >
        <span
          aria-hidden
          className="absolute -inset-6 rounded-full blur-3xl bg-amber-400/18"
        />
        <span
          className="relative block rounded-xl border border-amber-300/45 bg-stone-900/70 hover:bg-stone-800/80 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5 px-5 sm:px-7 py-3 sm:py-4"
          style={{
            transform: "perspective(1200px) rotateX(-8deg)",
            boxShadow:
              "0 0 30px rgba(251,191,36,0.35), 0 0 60px rgba(217,119,6,0.18), 0 12px 28px -10px rgba(217,119,6,0.38), inset 0 1px 0 rgba(253,230,138,0.30)",
          }}
        >
          <span
            className="block text-amber-100 font-light uppercase whitespace-nowrap text-[10px] sm:text-xs tracking-[0.3em]"
            style={{
              textShadow:
                "0 0 10px rgba(253,230,138,0.85), 0 0 22px rgba(251,191,36,0.50)",
            }}
          >
            yiswmt
          </span>
          <span className="mt-1 block text-amber-300/65 text-[8px] sm:text-[9px] tracking-[0.3em] uppercase">
            ↗ giving back
          </span>
        </span>
      </button>
      {mounted && open && <GivingBackPopup onClose={() => setOpen(false)} />}
    </>
  );
}
