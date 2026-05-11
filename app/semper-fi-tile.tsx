"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function SemperFiPopup({ onClose }: { onClose: () => void }) {
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
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="semper fi — what we owe"
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="close"
        className="absolute inset-0 backdrop-blur-sm bg-black/85 cursor-default"
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-2xl rounded-2xl border border-red-500/55 bg-black/90 px-6 sm:px-10 py-8 sm:py-10 flex flex-col gap-6"
        style={{
          boxShadow:
            "0 0 60px rgba(220,38,38,0.45), 0 0 130px rgba(146,64,14,0.30), inset 0 1px 0 rgba(254,202,202,0.30)",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="close"
          className="absolute top-3 right-3 w-9 h-9 rounded-full border border-red-400/45 bg-red-950/70 text-red-100 text-lg leading-none flex items-center justify-center hover:bg-red-900/80 hover:border-red-300/70 transition-colors"
        >
          ×
        </button>

        <header className="flex flex-col gap-2">
          <p
            className="text-amber-300/85 text-[10px] sm:text-xs tracking-[0.45em] uppercase"
            style={{ textShadow: "0 0 10px rgba(252,211,77,0.55)" }}
          >
            // semper fi
          </p>
          <h2
            className="text-red-100 text-2xl sm:text-3xl tracking-[0.18em] uppercase font-light"
            style={{
              textShadow:
                "0 0 14px rgba(254,202,202,0.65), 0 0 36px rgba(220,38,38,0.35)",
            }}
          >
            what we owe
          </h2>
        </header>

        <div className="space-y-4 text-red-100/90 text-base sm:text-lg leading-relaxed font-light">
          <p>
            some of us went to college. some of us built companies. some of
            us picked up a rifle and stood at the post nobody else wanted.
            they came home with footage in their head we will never see.
          </p>
          <p>
            the bills for that have been quietly due for a very long time.
            tonight, while you&rsquo;re listening, you can pay one of
            them.
          </p>
          <p>
            the{" "}
            <span className="text-amber-200/95 italic">
              marine corps &mdash; law enforcement foundation
            </span>{" "}
            has been writing scholarship checks since 1995 to the children
            of marines and federal officers killed in the line of duty.
            no overhead skimmed off the top &mdash; one hundred percent of
            every dollar goes to a kid&rsquo;s tuition.
          </p>
          <p className="text-red-200/85 italic text-sm sm:text-base">
            this isn&rsquo;t character zer0&rsquo;s ask. it&rsquo;s
            mckinley&rsquo;s, by way of a friend who hadn&rsquo;t seen
            him in twenty-five years.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a
            href="https://thefund.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center rounded-lg border border-red-400/55 hover:border-red-200/85 bg-red-950/55 hover:bg-red-900/70 px-5 py-3 text-red-100 text-xs sm:text-sm tracking-[0.3em] uppercase transition-colors"
            style={{
              boxShadow:
                "0 0 22px rgba(248,113,113,0.30), inset 0 1px 0 rgba(254,202,202,0.25)",
            }}
          >
            ↗ visit thefund.org
          </a>
          <a
            href="https://thefund.org/donate/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center rounded-lg border border-amber-300/65 hover:border-amber-200/85 bg-amber-950/55 hover:bg-amber-900/70 px-5 py-3 text-amber-100 text-xs sm:text-sm tracking-[0.3em] uppercase transition-colors"
            style={{
              boxShadow:
                "0 0 22px rgba(251,191,36,0.40), inset 0 1px 0 rgba(254,243,199,0.30)",
            }}
          >
            ↗ donate now
          </a>
        </div>

        <p
          className="text-amber-300/70 italic text-center text-base sm:text-lg pt-2"
          style={{ textShadow: "0 0 10px rgba(252,211,77,0.45)" }}
        >
          semper fidelis.
        </p>
      </div>
    </div>,
    document.body,
  );
}

export function SemperFiTile() {
  const [currentSource, setCurrentSource] = useState<string>("default");
  const [playing, setPlaying] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onSet = (e: Event) => {
      const detail = (
        e as CustomEvent<{ src: string; title?: string; source?: string }>
      ).detail;
      if (!detail) return;
      setCurrentSource(detail.source ?? "default");
    };
    const onPlay = () => setPlaying(true);
    const onStop = () => setPlaying(false);
    window.addEventListener("character-zero:set-podcast", onSet);
    window.addEventListener("character-zero:orb-play", onPlay);
    window.addEventListener("character-zero:orb-pause", onStop);
    window.addEventListener("character-zero:orb-ended", onStop);
    return () => {
      window.removeEventListener("character-zero:set-podcast", onSet);
      window.removeEventListener("character-zero:orb-play", onPlay);
      window.removeEventListener("character-zero:orb-pause", onStop);
      window.removeEventListener("character-zero:orb-ended", onStop);
    };
  }, []);

  const visible = currentSource === "mckinley" && playing;
  if (!visible) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="semper fi — open"
        className="fixed top-3 right-3 z-[35] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 rounded-xl pointer-events-auto"
      >
        <span
          aria-hidden
          className="absolute -inset-3 rounded-full blur-2xl bg-red-600/30"
        />
        <span
          className="relative block rounded-xl border border-amber-400/55 bg-red-950/70 backdrop-blur-sm px-4 py-2 sm:px-5 sm:py-2.5 flex flex-col items-center gap-0.5"
          style={{
            boxShadow:
              "0 0 30px rgba(220,38,38,0.55), 0 0 70px rgba(146,64,14,0.30), inset 0 1px 0 rgba(254,202,202,0.35)",
          }}
        >
          <span
            className="text-amber-300/85 text-[7px] sm:text-[8px] tracking-[0.4em] uppercase"
            style={{ textShadow: "0 0 6px rgba(252,211,77,0.55)" }}
          >
            ↗ honor
          </span>
          <span
            className="text-red-100 text-sm sm:text-base tracking-[0.3em] uppercase font-light"
            style={{
              textShadow:
                "0 0 10px rgba(254,202,202,0.85), 0 0 22px rgba(220,38,38,0.55)",
            }}
          >
            Semper Fi
          </span>
        </span>
      </button>
      {open && mounted && <SemperFiPopup onClose={() => setOpen(false)} />}
    </>
  );
}
