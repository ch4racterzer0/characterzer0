"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

export function FrogPopup({ onClose }: { onClose: () => void }) {
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
      className="fixed inset-0 z-[85] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="the soundtrack"
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="close"
        className="absolute inset-0 bg-black/85 backdrop-blur-sm cursor-default"
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-2xl flex flex-col items-center gap-6 rounded-xl border border-emerald-300/30 bg-blue-950/40 backdrop-blur-md px-6 sm:px-10 py-8 sm:py-10"
        style={{
          boxShadow:
            "0 0 60px rgba(16,185,129,0.25), 0 0 110px rgba(34,197,94,0.15), inset 0 1px 0 rgba(110,231,183,0.20)",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="close"
          className="absolute -top-2 -right-2 z-10 w-9 h-9 rounded-full border border-emerald-300/45 bg-emerald-950/70 text-emerald-100 text-lg leading-none flex items-center justify-center hover:bg-emerald-900/80 hover:border-emerald-200/70 transition-colors"
        >
          ×
        </button>

        <p
          className="text-emerald-300/75 text-[10px] sm:text-xs tracking-[0.4em] uppercase text-center"
          style={{ textShadow: "0 0 10px rgba(110,231,183,0.55)" }}
        >
          // the soundtrack &middot; the only other human in this room
        </p>

        <div
          className="text-5xl sm:text-6xl select-none"
          aria-hidden
          style={{
            filter:
              "drop-shadow(0 0 14px rgba(110,231,183,0.55)) drop-shadow(0 0 32px rgba(59,130,246,0.40))",
          }}
        >
          ★ frog
        </div>

        <div className="space-y-4 text-blue-100 text-base sm:text-lg leading-relaxed">
          <p>
            every song this radio plays was made by one Swiss producer working
            under the name <span className="text-cyan-200">starfrosch</span>{" "}
            &mdash; literally{" "}
            <span className="text-emerald-200 italic">star frog</span>. melodic
            techno, deep house, trap, a 20-year run of releasing tracks under
            creative commons licenses so people who couldn&rsquo;t pay could
            still build with them. 94 million streams and counting.
          </p>

          <p>
            we didn&rsquo;t commission a soundtrack for this universe. we
            walked into his open archive and walked out with the room you&rsquo;re
            standing in. the rest of this place runs on AI and a couple of
            humans named in /us &mdash; this radio is the one other human voice
            inside it, and he doesn&rsquo;t know we exist yet.
          </p>

          <p className="text-blue-100/75 italic">
            if you ever wonder why characterzer0 sounds the way it does, it
            sounds that way because he gave it that sound.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href="https://starfrosch.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-200 hover:text-emerald-100 text-xs sm:text-sm tracking-[0.3em] uppercase border border-emerald-400/40 rounded-md px-4 py-2 hover:bg-emerald-900/30 hover:border-emerald-300/60 transition-colors"
          >
            find him &rarr;
          </a>
          <a
            href="https://starfrosch.bandcamp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-200 hover:text-blue-100 text-xs sm:text-sm tracking-[0.3em] uppercase border border-blue-400/40 rounded-md px-4 py-2 hover:bg-blue-900/30 hover:border-blue-300/60 transition-colors"
          >
            pay him &rarr;
          </a>
        </div>

        <p className="text-emerald-300/55 text-[10px] sm:text-xs italic tracking-[0.3em] uppercase">
          cc by 3.0 &middot; he earned this
        </p>
        <p className="text-blue-300/45 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase italic">
          esc to close
        </p>
      </div>
    </div>,
    document.body,
  );
}
