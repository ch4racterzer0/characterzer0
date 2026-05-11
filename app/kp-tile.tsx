"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function KPPopup({ onClose }: { onClose: () => void }) {
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
      aria-label="kp — special thanks"
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="close"
        className="absolute inset-0 backdrop-blur-sm bg-black/85 cursor-default"
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-2xl rounded-2xl border border-sky-400/55 bg-black/90 px-6 sm:px-10 py-8 sm:py-10 flex flex-col gap-6"
        style={{
          boxShadow:
            "0 0 60px rgba(56,189,248,0.40), 0 0 130px rgba(14,165,233,0.25), inset 0 1px 0 rgba(186,230,253,0.30)",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="close"
          className="absolute top-3 right-3 w-9 h-9 rounded-full border border-sky-400/45 bg-sky-950/70 text-sky-100 text-lg leading-none flex items-center justify-center hover:bg-sky-900/80 hover:border-sky-300/70 transition-colors"
        >
          ×
        </button>

        <header className="flex flex-col gap-2">
          <p
            className="text-sky-300/85 text-[10px] sm:text-xs tracking-[0.45em] uppercase"
            style={{ textShadow: "0 0 10px rgba(125,211,252,0.55)" }}
          >
            // kp
          </p>
          <h2
            className="text-sky-100 text-2xl sm:text-3xl tracking-[0.18em] uppercase font-light"
            style={{
              textShadow:
                "0 0 14px rgba(186,230,253,0.65), 0 0 36px rgba(56,189,248,0.35)",
            }}
          >
            for the men on the front line
          </h2>
        </header>

        <div className="space-y-4 text-sky-100/90 text-base sm:text-lg leading-relaxed font-light">
          <p>
            most of us never have to think about who keeps the line. you
            sleep, you wake up, the day works because somebody walked it
            for you in the dark. quietly. without a thank you.
          </p>
          <p>
            this one is for them &mdash; the officers and the dogs they
            run with. the partners who don&rsquo;t get a pension, who go
            in first, who come out with a wound in the side and a wagging
            tail and no complaint about either.
          </p>
          <p>
            the{" "}
            <span className="text-sky-200/95 italic">
              charleston police k-9 unit
            </span>{" "}
            takes the call when the call is the worst one. learn what they
            do, support them however you can.
          </p>
          <p className="text-sky-200/85 italic text-sm sm:text-base">
            this one&rsquo;s on mckinley too. he knows the cost.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a
            href="https://www.charleston-sc.gov/1157/K-9-Unit"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center rounded-lg border border-sky-400/55 hover:border-sky-200/85 bg-sky-950/55 hover:bg-sky-900/70 px-5 py-3 text-sky-100 text-xs sm:text-sm tracking-[0.3em] uppercase transition-colors"
            style={{
              boxShadow:
                "0 0 22px rgba(56,189,248,0.30), inset 0 1px 0 rgba(186,230,253,0.25)",
            }}
          >
            ↗ charleston k-9 unit
          </a>
        </div>

        <p
          className="text-sky-300/70 italic text-center text-base sm:text-lg pt-2"
          style={{ textShadow: "0 0 10px rgba(125,211,252,0.45)" }}
        >
          quietly. in the dark. thank you.
        </p>
      </div>
    </div>,
    document.body,
  );
}

export function KPTile() {
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
        aria-label="kp — open"
        className="fixed top-[72px] right-3 z-[35] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 rounded-xl pointer-events-auto"
      >
        <span
          aria-hidden
          className="absolute -inset-3 rounded-full blur-2xl bg-sky-500/30"
        />
        <span
          className="relative block rounded-xl border border-sky-400/55 bg-sky-950/70 backdrop-blur-sm px-4 py-2 sm:px-5 sm:py-2.5 flex flex-col items-center gap-0.5"
          style={{
            boxShadow:
              "0 0 30px rgba(56,189,248,0.50), 0 0 70px rgba(14,165,233,0.25), inset 0 1px 0 rgba(186,230,253,0.35)",
          }}
        >
          <span
            className="text-sky-300/85 text-[7px] sm:text-[8px] tracking-[0.4em] uppercase"
            style={{ textShadow: "0 0 6px rgba(125,211,252,0.55)" }}
          >
            ↗ thanks
          </span>
          <span
            className="text-sky-100 text-sm sm:text-base tracking-[0.3em] uppercase font-light"
            style={{
              textShadow:
                "0 0 10px rgba(186,230,253,0.85), 0 0 22px rgba(56,189,248,0.55)",
            }}
          >
            KP
          </span>
        </span>
      </button>
      {open && mounted && <KPPopup onClose={() => setOpen(false)} />}
    </>
  );
}
