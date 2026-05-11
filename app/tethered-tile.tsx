"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Episode = {
  chapter: string;
  title: string;
  src: string;
};

const SUMMONS_MP3 =
  "https://rrri5gycujcgopya.public.blob.vercel-storage.com/ep011-hy0rf1c2Ld1BgpPxbwrV9EPZ4DR63J.mp3";

const EPISODES: Episode[] = [
  { chapter: "20", title: "chapter twenty", src: SUMMONS_MP3 },
];

function loadEpisode(ep: Episode) {
  window.dispatchEvent(
    new CustomEvent("character-zero:set-podcast", {
      detail: { src: ep.src, title: `ch${ep.chapter} — ${ep.title}` },
    }),
  );
}

function TetheredPopup({ onClose }: { onClose: () => void }) {
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
      aria-label="tethered episode picker"
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="close"
        className="absolute inset-0 backdrop-blur-[2px] bg-black/55 cursor-default"
        onClick={onClose}
      />
      <div className="relative w-full max-w-3xl flex flex-col items-stretch gap-5">
        <div className="flex items-center justify-between gap-4">
          <p
            className="text-indigo-200/85 text-[10px] sm:text-xs tracking-[0.4em] uppercase"
            style={{ textShadow: "0 0 10px rgba(165,180,252,0.55)" }}
          >
            // tethered &middot; terrapin series
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="close"
            className="w-9 h-9 rounded-full border border-indigo-400/45 bg-indigo-950/60 text-indigo-100 text-lg leading-none flex items-center justify-center hover:bg-indigo-900/70 hover:border-indigo-300/70 transition-colors"
          >
            ×
          </button>
        </div>

        <ul className="flex justify-center">
          {EPISODES.map((ep) => (
            <li key={ep.chapter} className="w-40 sm:w-44">
              <button
                type="button"
                onClick={() => {
                  loadEpisode(ep);
                  onClose();
                }}
                aria-label={`Play chapter ${ep.chapter} — ${ep.title}`}
                className="group w-full aspect-square rounded-md border border-indigo-400/45 hover:border-indigo-200/85 bg-indigo-950/45 hover:bg-indigo-900/60 backdrop-blur-[2px] flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors px-2"
                style={{
                  boxShadow:
                    "0 0 22px rgba(129,140,248,0.30), 0 0 50px rgba(99,102,241,0.18), 0 8px 22px -8px rgba(0,0,0,0.65), inset 0 1px 0 rgba(199,210,254,0.30)",
                }}
              >
                <span className="text-indigo-300/70 text-[8px] sm:text-[9px] tracking-[0.4em] uppercase">
                  ch
                </span>
                <span
                  className="text-indigo-100 text-2xl sm:text-3xl font-light tracking-[0.1em]"
                  style={{
                    textShadow:
                      "0 0 10px rgba(199,210,254,0.85), 0 0 22px rgba(129,140,248,0.55)",
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, monospace",
                  }}
                >
                  {ep.chapter}
                </span>
                <span className="text-indigo-300/70 text-[8px] sm:text-[9px] tracking-[0.25em] uppercase italic text-center leading-tight">
                  {ep.title}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <p className="text-indigo-300/55 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase italic text-center">
          one chapter for now — new series in the works. esc to close.
        </p>
      </div>
    </div>,
    document.body,
  );
}

export function TetheredTile() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="tethered — open episode picker"
        className="group relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 rounded-xl"
      >
        <span
          aria-hidden
          className="absolute -inset-6 rounded-full blur-3xl bg-indigo-500/20"
        />
        <span
          className="relative block rounded-xl border border-indigo-400/45 bg-indigo-950/45 hover:bg-indigo-900/60 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5 px-5 sm:px-7 py-3 sm:py-4"
          style={{
            transform: "perspective(1200px) rotateX(-8deg)",
            boxShadow:
              "0 0 30px rgba(129,140,248,0.40), 0 0 60px rgba(99,102,241,0.22), 0 12px 28px -10px rgba(99,102,241,0.40), inset 0 1px 0 rgba(199,210,254,0.35)",
          }}
        >
          <span
            className="block text-indigo-100 font-light uppercase whitespace-nowrap text-[10px] sm:text-xs tracking-[0.3em]"
            style={{
              textShadow:
                "0 0 10px rgba(199,210,254,0.85), 0 0 22px rgba(129,140,248,0.55)",
            }}
          >
            Tethered
          </span>
          <span className="mt-1 block text-indigo-300/55 text-[8px] sm:text-[9px] tracking-[0.3em] uppercase">
            ↗ chapters
          </span>
        </span>
      </button>
      {open && mounted && <TetheredPopup onClose={() => setOpen(false)} />}
    </>
  );
}
