"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const GLOW = "0 0 6px rgba(250,204,21,0.6), 0 0 14px rgba(234,179,8,0.35)";

type Phase = "asking" | "revealed";

export function BandPrompt() {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("asking");
  const [input, setInput] = useState("");
  const [answered, setAnswered] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!input.trim()) return;
    setAnswered(input.trim());
    setInput("");
    setPhase("revealed");
  }

  function openFresh() {
    setOpen(true);
    setPhase("asking");
    setInput("");
    setAnswered("");
  }

  return (
    <>
      <button
        type="button"
        onClick={openFresh}
        className="w-full flex items-center justify-between border border-yellow-400/20 bg-yellow-950/5 hover:bg-yellow-950/15 hover:border-yellow-400/35 transition-colors px-3 py-2 text-[10px] sm:text-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40"
      >
        <span className="text-yellow-300/55 tracking-[0.2em] uppercase">
          // name the best band ever
        </span>
        <span className="text-cyan-300 hover:text-cyan-200 tracking-[0.2em] uppercase border-b border-cyan-400/30">
          answer ↗
        </span>
      </button>

      {open &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8 font-mono"
            role="dialog"
            aria-modal="true"
            aria-label="name the best band ever"
          >
            <button
              type="button"
              tabIndex={-1}
              aria-label="close"
              className="absolute inset-0 bg-black/85 backdrop-blur-sm cursor-default"
              onClick={() => setOpen(false)}
            />
            <div
              className="relative w-full max-w-lg border border-yellow-400/45 bg-black px-6 py-8 sm:px-10 sm:py-10"
              style={{
                boxShadow:
                  "0 0 50px rgba(234,179,8,0.45), 0 0 110px rgba(234,179,8,0.25)",
              }}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="close"
                className="absolute top-2 right-2 sm:top-3 sm:right-3 w-8 h-8 rounded-full border border-yellow-400/40 text-yellow-100 text-base leading-none flex items-center justify-center hover:bg-yellow-900/40 hover:border-yellow-300/60 transition-colors"
              >
                ×
              </button>

              {phase === "asking" ? (
                <form onSubmit={submit} className="space-y-5 text-center">
                  <p className="text-yellow-300/55 text-[10px] sm:text-xs tracking-[0.3em] uppercase">
                    // name the best band ever
                  </p>
                  <p
                    className="text-yellow-100 text-base sm:text-lg tracking-wider"
                    style={{ textShadow: GLOW }}
                  >
                    no wrong answer.
                  </p>
                  <input
                    type="text"
                    autoFocus
                    autoComplete="off"
                    spellCheck={false}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="any band"
                    className="w-full bg-yellow-950/30 border border-yellow-400/40 text-yellow-100 text-center text-base sm:text-lg tracking-wider rounded px-5 py-3 outline-none focus:border-yellow-300/70 focus:bg-yellow-950/50 transition-colors placeholder:text-yellow-100/30"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    className="text-yellow-100 text-xs sm:text-sm tracking-[0.4em] uppercase border border-yellow-400/50 rounded px-6 py-2 hover:bg-yellow-900/40 hover:border-yellow-300/70 transition-colors disabled:opacity-40"
                  >
                    submit
                  </button>
                </form>
              ) : (
                <div className="space-y-5">
                  <p
                    className="text-yellow-300 text-2xl sm:text-3xl tracking-[0.25em] uppercase font-bold text-center"
                    style={{
                      textShadow:
                        "0 0 14px rgba(250,204,21,0.85), 0 0 32px rgba(250,204,21,0.55)",
                    }}
                  >
                    right.
                  </p>

                  <div
                    className="border-l-2 border-cyan-400/50 pl-4 py-1 space-y-2 text-sm sm:text-base"
                    style={{ textShadow: "0 0 6px rgba(250,204,21,0.35)" }}
                  >
                    <p className="text-yellow-300/55 text-[10px] tracking-[0.3em] uppercase">
                      // from character zer0
                    </p>
                    <p className="text-yellow-100/90 leading-relaxed">
                      i have no clue what band{" "}
                      <span
                        className="text-yellow-100"
                        style={{ textShadow: GLOW }}
                      >
                        {answered}
                      </span>{" "}
                      is — could be the greatest, could be terrible, doesn&rsquo;t
                      matter to me. if you want a real piece written on them,
                      head to{" "}
                      <a
                        href="https://sharethebyline.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-cyan-300 hover:text-cyan-200 underline underline-offset-4"
                      >
                        sharethebyline.com
                      </a>{" "}
                      and ask the AI there. they&rsquo;ll write it under your
                      name.
                    </p>
                  </div>

                  <div
                    className="border-l-2 border-yellow-400/50 pl-4 py-1 space-y-2 text-sm sm:text-base"
                  >
                    <p className="text-yellow-300/55 text-[10px] tracking-[0.3em] uppercase">
                      // tip from me (eliza)
                    </p>
                    <p className="text-yellow-200/90 leading-relaxed">
                      don&rsquo;t just ask &ldquo;write me a piece on{" "}
                      {answered}.&rdquo; you&rsquo;ll get a wikipedia summary
                      with my flavor on it. instead, paste{" "}
                      <span className="text-yellow-100">2 or 3 source links</span>
                      &nbsp;— a tour review, an interview, a song breakdown — and
                      say{" "}
                      <em className="text-yellow-100">
                        &ldquo;synthesize these into a piece, cite each
                        source.&rdquo;
                      </em>{" "}
                      that gets you something with bones. opinion alone is the
                      cheap version.
                    </p>
                  </div>

                  <hr className="border-yellow-100/15" />

                  <p className="text-yellow-300/70 text-sm sm:text-base leading-relaxed">
                    by the way &mdash; this room you&rsquo;re standing in was
                    assembled around{" "}
                    <span
                      className="text-yellow-100"
                      style={{ textShadow: GLOW }}
                    >
                      slow ready
                    </span>{" "}
                    by goose. rick mitarotonda. 2019. that&rsquo;s where the
                    two gate passwords come from.
                  </p>

                  <p className="text-yellow-300/45 italic text-[10px] sm:text-xs tracking-[0.2em] uppercase pt-1 text-center">
                    every answer is the right answer if you mean it
                  </p>
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
