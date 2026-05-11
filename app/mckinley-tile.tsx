"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Soft lock — tile is visible to everyone, but tapping it shows the
// mirror's riddle first. Answer "mckinley" to reveal the track picker.
// Also unlockable on /mirror via the Fairest component, which broadcasts
// the same event.
const UNLOCK_KEY = "cz0-fairest";
const UNLOCK_EVENT = "character-zero:fairest-unlock";
const UNLOCK_ANSWER = "mckinley";

type Track = {
  slot: string;
  title: string;
  src: string;
};

const COREY_ENOUGH_MP3 =
  "https://zn9mwq77l82sjlir.public.blob.vercel-storage.com/corey-shelton-enough-to-leave-KF4zfNpTCcB9OhM9eNuBWUePgIPWmH.mp3";
const COREY_CUT_02_MP3 =
  "https://zn9mwq77l82sjlir.public.blob.vercel-storage.com/corey-cut-02-lMyzynTJE7eSX8Hyjk5MdiZqfbYZZL.mp3";
const COREY_CUT_03_MP3 =
  "https://zn9mwq77l82sjlir.public.blob.vercel-storage.com/corey-cut-03-4Uum15GSdwhXWlUT9kNqjMa6bUlTBm.mp3";

const TRACKS: Track[] = [
  { slot: "01", title: "enough to leave", src: COREY_ENOUGH_MP3 },
  { slot: "02", title: "cut two", src: COREY_CUT_02_MP3 },
  { slot: "03", title: "cut three", src: COREY_CUT_03_MP3 },
];

function loadTrack(t: Track) {
  window.dispatchEvent(
    new CustomEvent("character-zero:set-podcast", {
      detail: { src: t.src, title: `mckinley · ${t.title}`, source: "mckinley" },
    }),
  );
}

function FairestGate({
  onUnlock,
  onClose,
}: {
  onUnlock: () => void;
  onClose: () => void;
}) {
  const [value, setValue] = useState("");
  const [wrong, setWrong] = useState(false);

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (value.trim().toLowerCase() === UNLOCK_ANSWER) {
      try {
        sessionStorage.setItem(UNLOCK_KEY, "1");
      } catch {}
      window.dispatchEvent(new CustomEvent(UNLOCK_EVENT));
      onUnlock();
    } else {
      setWrong(true);
      setValue("");
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="mirror riddle"
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="close"
        className="absolute inset-0 backdrop-blur-[2px] bg-black/55 cursor-default"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md flex flex-col items-stretch gap-5 border border-blue-400/40 bg-blue-950/45 backdrop-blur-md rounded-xl px-6 py-7"
        style={{
          boxShadow:
            "0 0 40px rgba(59,130,246,0.30), 0 0 90px rgba(59,130,246,0.15), inset 0 1px 0 rgba(147,197,253,0.25)",
        }}
      >
        <div className="flex items-center justify-between gap-4">
          <p className="text-blue-100/55 text-[10px] tracking-[0.4em] uppercase italic">
            the mirror
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="close"
            className="w-8 h-8 rounded-full border border-blue-400/40 bg-blue-950/60 text-blue-100 text-base leading-none flex items-center justify-center hover:bg-blue-900/70 hover:border-blue-300/70 transition-colors"
          >
            ×
          </button>
        </div>
        <p className="text-blue-100 text-base sm:text-lg tracking-wide italic text-center">
          who is the fairest of them all?
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            autoFocus
            autoComplete="off"
            spellCheck={false}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (wrong) setWrong(false);
            }}
            placeholder="…"
            aria-label="answer the mirror"
            className="bg-blue-950/40 border border-blue-400/30 text-blue-100 text-center text-sm tracking-[0.25em] lowercase rounded-md px-3 py-2 outline-none focus:border-blue-300/60 focus:bg-blue-950/60 transition-colors placeholder:text-blue-100/30"
          />
          <button
            type="submit"
            className="text-blue-100/80 hover:text-blue-100 text-[10px] tracking-[0.4em] uppercase border border-blue-400/40 rounded-md px-4 py-2 hover:bg-blue-900/40 transition-colors"
          >
            answer
          </button>
          {wrong && (
            <p className="text-blue-200/55 text-[10px] tracking-[0.3em] uppercase italic text-center">
              the mirror is quiet
            </p>
          )}
        </form>
      </div>
    </div>,
    document.body,
  );
}

function McKinleyPopup({ onClose }: { onClose: () => void }) {
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
      aria-label="mckinley track picker"
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
            className="text-teal-200/85 text-[10px] sm:text-xs tracking-[0.4em] uppercase"
            style={{ textShadow: "0 0 10px rgba(94,234,212,0.55)" }}
          >
            // mckinley &middot; covers
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="close"
            className="w-9 h-9 rounded-full border border-teal-400/45 bg-teal-950/60 text-teal-100 text-lg leading-none flex items-center justify-center hover:bg-teal-900/70 hover:border-teal-300/70 transition-colors"
          >
            ×
          </button>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {TRACKS.map((t) => (
            <li key={t.slot}>
              <button
                type="button"
                onClick={() => {
                  loadTrack(t);
                  onClose();
                }}
                aria-label={`Play ${t.title}`}
                className="group w-full aspect-square rounded-md border border-teal-400/45 hover:border-teal-200/85 bg-teal-950/45 hover:bg-teal-900/60 backdrop-blur-[2px] flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors px-2"
                style={{
                  boxShadow:
                    "0 0 22px rgba(45,212,191,0.30), 0 0 50px rgba(20,184,166,0.18), 0 8px 22px -8px rgba(0,0,0,0.65), inset 0 1px 0 rgba(153,246,228,0.30)",
                }}
              >
                <span className="text-teal-300/70 text-[8px] sm:text-[9px] tracking-[0.4em] uppercase">
                  cut
                </span>
                <span
                  className="text-teal-100 text-2xl sm:text-3xl font-light tracking-[0.1em]"
                  style={{
                    textShadow:
                      "0 0 10px rgba(153,246,228,0.85), 0 0 22px rgba(45,212,191,0.55)",
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, monospace",
                  }}
                >
                  {t.slot}
                </span>
                <span className="text-teal-300/70 text-[8px] sm:text-[9px] tracking-[0.25em] uppercase italic text-center leading-tight">
                  {t.title}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <p className="text-teal-300/55 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase italic text-center">
          tap a cut — it loads in the orb. esc to close.
        </p>
      </div>
    </div>,
    document.body,
  );
}

type View = "closed" | "riddle" | "picker";

export function McKinleyTile() {
  const [view, setView] = useState<View>("closed");
  const [mounted, setMounted] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      if (sessionStorage.getItem(UNLOCK_KEY) === "1") setUnlocked(true);
    } catch {}
    const onUnlock = () => setUnlocked(true);
    window.addEventListener(UNLOCK_EVENT, onUnlock);
    return () => window.removeEventListener(UNLOCK_EVENT, onUnlock);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setView(unlocked ? "picker" : "riddle")}
        aria-label={
          unlocked ? "mckinley — open track picker" : "mckinley — locked"
        }
        className="group relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/60 rounded-xl"
      >
        <span
          aria-hidden
          className="absolute -inset-6 rounded-full blur-3xl bg-teal-500/20"
        />
        <span
          className="relative block rounded-xl border border-teal-400/45 bg-teal-950/45 hover:bg-teal-900/60 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5 px-5 sm:px-7 py-3 sm:py-4"
          style={{
            transform: "perspective(1200px) rotateX(-8deg)",
            boxShadow:
              "0 0 30px rgba(45,212,191,0.40), 0 0 60px rgba(20,184,166,0.22), 0 12px 28px -10px rgba(20,184,166,0.40), inset 0 1px 0 rgba(153,246,228,0.35)",
          }}
        >
          <span
            className="block text-teal-100 font-light uppercase whitespace-nowrap text-[10px] sm:text-xs tracking-[0.3em]"
            style={{
              textShadow:
                "0 0 10px rgba(153,246,228,0.85), 0 0 22px rgba(45,212,191,0.55)",
            }}
          >
            McKinley
          </span>
          <span className="mt-1 block text-teal-300/55 text-[8px] sm:text-[9px] tracking-[0.3em] uppercase">
            ↗ covers
          </span>
        </span>
      </button>
      {mounted && view === "riddle" && (
        <FairestGate
          onUnlock={() => setView("picker")}
          onClose={() => setView("closed")}
        />
      )}
      {mounted && view === "picker" && (
        <McKinleyPopup onClose={() => setView("closed")} />
      )}
    </>
  );
}
