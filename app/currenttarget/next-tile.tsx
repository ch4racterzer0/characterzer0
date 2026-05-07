"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const QUESTIONS = [
  "You signed the March 2023 letter calling for a six-month pause on advanced AI training. Why didn't you pause?",
  "xAI was founded inside the same six months you asked the rest of the industry to stand still. What did you know that they didn't?",
  "Grok ships with most of the safety constraints its competitors keep on. Which removed constraints do you stand behind on the record?",
  "You have called AI the most existentially dangerous thing humans have ever built. Which xAI internal practice maps to that level of danger?",
  "Has xAI declined any contract on safety grounds since founding? If so, which?",
  "Do you still hold the position you signed in May 2023 — that AI extinction risk belongs in the same conversation as nuclear war and pandemics?",
  "You publicly criticize OpenAI's safety record while being a co-founder and early funder. What did you specifically do as a board member to enforce a different posture?",
  "What does Grok's red-team process look like, and when did you last personally read its findings?",
  "You have said Earth needs a multiplanetary civilization to survive AI. What is xAI's current contribution to that, today?",
  "Name the person at xAI whose job it is to tell you no — and the last time they did.",
];

export function NextTile() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

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
        aria-label="next — open ten questions for elon musk"
        className="group absolute inset-0 z-10 flex items-center justify-center backdrop-blur-[2px] bg-amber-950/20 hover:bg-amber-950/35 border border-amber-400/40 hover:border-amber-300/70 transition-colors cursor-pointer"
        style={{
          boxShadow:
            "0 0 35px rgba(251,191,36,0.28), inset 0 1px 0 rgba(254,243,199,0.18)",
        }}
      >
        <div className="flex flex-col items-center gap-2 px-6">
          <span className="text-amber-300/80 text-[10px] sm:text-xs tracking-[0.4em] uppercase">
            ↗ on deck
          </span>
          <span
            className="text-amber-200 text-3xl sm:text-5xl tracking-[0.3em] uppercase font-light group-hover:text-amber-100 transition-colors"
            style={{
              textShadow:
                "0 0 14px rgba(252,211,77,0.85), 0 0 32px rgba(251,191,36,0.55), 0 0 70px rgba(146,64,14,0.4)",
            }}
          >
            next
          </span>
          <span className="text-amber-300/55 text-[10px] sm:text-xs tracking-[0.3em] uppercase italic">
            ten questions for elon musk
          </span>
        </div>
      </button>

      {open &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8 font-mono"
            role="dialog"
            aria-modal="true"
            aria-label="ten questions for elon musk"
          >
            <button
              type="button"
              tabIndex={-1}
              aria-label="close"
              className="absolute inset-0 bg-black/95 backdrop-blur-sm cursor-default"
              onClick={() => setOpen(false)}
            />
            <div
              className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto border border-amber-400/45 bg-black"
              style={{
                boxShadow:
                  "0 0 60px rgba(251,191,36,0.35), 0 0 140px rgba(251,191,36,0.18), inset 0 1px 0 rgba(254,243,199,0.20)",
              }}
            >
              <header className="sticky top-0 z-10 bg-black/95 border-b border-amber-400/35 px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    aria-hidden
                    className="block w-2 h-2 rounded-full bg-amber-400"
                    style={{ boxShadow: "0 0 10px rgba(251,191,36,0.85)" }}
                  />
                  <span
                    className="text-amber-100 text-[10px] sm:text-xs tracking-[0.4em] uppercase truncate"
                    style={{
                      textShadow:
                        "0 0 12px rgba(252,211,77,0.55), 0 0 28px rgba(251,191,36,0.3)",
                    }}
                  >
                    // 10 questions we have
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="close"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-amber-400/40 text-amber-100 text-lg leading-none flex items-center justify-center hover:bg-amber-900/30 hover:border-amber-300/70 transition-colors shrink-0"
                >
                  ×
                </button>
              </header>

              <div className="px-5 py-6 sm:px-8 sm:py-8 space-y-5">
                <h2
                  className="text-amber-100 text-xl sm:text-3xl tracking-[0.2em] uppercase font-light"
                  style={{
                    textShadow:
                      "0 0 14px rgba(252,211,77,0.6), 0 0 32px rgba(251,191,36,0.3)",
                  }}
                >
                  10 questions for elon musk
                </h2>

                <ol className="space-y-5">
                  {QUESTIONS.map((q, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span
                        className="text-amber-300/70 font-mono text-lg sm:text-xl tabular-nums tracking-tight shrink-0 w-8 sm:w-10"
                        style={{
                          textShadow: "0 0 10px rgba(251,191,36,0.55)",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-amber-50/90 text-sm sm:text-base leading-relaxed">
                        {q}
                      </p>
                    </li>
                  ))}
                </ol>

                <p className="text-amber-300/45 italic text-[10px] sm:text-xs tracking-[0.2em] uppercase pt-4 text-center border-t border-amber-400/20">
                  press esc to close
                </p>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
