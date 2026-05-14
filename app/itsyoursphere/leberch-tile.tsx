"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const BODY =
  "linear-gradient(180deg, rgba(248,235,200,0.97) 0%, rgba(232,212,170,0.97) 55%, rgba(208,184,140,0.98) 100%)";
const LID =
  "linear-gradient(180deg, rgba(232,212,170,0.98) 0%, rgba(208,184,140,0.98) 100%)";
const BORDER = "rgba(140,98,52,0.65)";
const TEXT = "rgba(80,48,18,0.94)";
const SUB = "rgba(120,80,40,0.72)";
const BADGE =
  "linear-gradient(180deg, rgba(195,55,40,0.97) 0%, rgba(150,35,25,0.97) 100%)";
const BADGE_TEXT = "rgba(248,238,218,0.95)";

const SCUFF =
  "radial-gradient(circle at 18% 22%, rgba(255,255,255,0.10) 0%, transparent 30%), radial-gradient(circle at 78% 75%, rgba(80,55,25,0.10) 0%, transparent 35%), radial-gradient(circle at 60% 30%, rgba(80,55,25,0.06) 0%, transparent 25%)";

export function LeberchTile() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="LEB — leberch, the voice here"
        className="relative inline-flex flex-col items-stretch w-14 sm:w-24 rounded-md overflow-hidden transition-transform hover:-translate-y-0.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/40"
        style={{
          background: BODY,
          border: `1px solid ${BORDER}`,
          boxShadow:
            "inset 0 1.5px 0 rgba(255,250,230,0.55), inset 0 -2px 0 rgba(120,80,40,0.40), inset 0 0 0 1px rgba(80,55,25,0.25), 0 5px 10px -5px rgba(0,0,0,0.55)",
        }}
      >
        <span
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: SCUFF, mixBlendMode: "overlay" }}
        />
        <span
          aria-hidden
          className="relative block h-3 sm:h-3.5"
          style={{
            background: LID,
            borderBottom: `1px solid ${BORDER}`,
            boxShadow:
              "inset 0 1px 0 rgba(255,250,230,0.45), inset 0 -1px 0 rgba(120,80,40,0.30)",
          }}
        >
          <span
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-2 h-1 rounded-sm"
            style={{
              background:
                "linear-gradient(180deg, rgba(195,55,40,0.95) 0%, rgba(150,35,25,0.95) 100%)",
              boxShadow: "0 1px 0 rgba(255,250,230,0.40)",
            }}
          />
        </span>
        <span
          className="relative block px-1 sm:px-2 pt-2 pb-0.5 text-center font-mono font-bold uppercase text-[11px] sm:text-[14px]"
          style={{
            color: TEXT,
            textShadow:
              "0 1px 0 rgba(255,250,230,0.50), 0 -1px 0 rgba(120,80,40,0.30)",
            letterSpacing: "0.18em",
          }}
        >
          LEB
        </span>
        <span
          className="relative block px-1.5 pb-2 text-center font-mono uppercase tracking-[0.18em]"
          style={{
            color: SUB,
            textShadow: "0 1px 0 rgba(255,250,230,0.40)",
            fontSize: "7px",
            lineHeight: 1.3,
          }}
        >
          the voice
        </span>
      </button>

      {open &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="leberch — the voice here"
          >
            <button
              type="button"
              tabIndex={-1}
              aria-label="close"
              className="absolute inset-0 bg-black/85 backdrop-blur-sm cursor-default"
              onClick={() => setOpen(false)}
            />

            <div
              className="relative w-full max-w-xl rounded-md overflow-hidden max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-4rem)] flex flex-col"
              style={{
                background: BODY,
                border: `1px solid ${BORDER}`,
                boxShadow:
                  "inset 0 2px 0 rgba(255,250,230,0.55), inset 0 -3px 0 rgba(120,80,40,0.40), inset 0 0 0 1px rgba(80,55,25,0.25), 0 18px 48px -8px rgba(0,0,0,0.85)",
              }}
            >
              <span
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{ backgroundImage: SCUFF, mixBlendMode: "overlay" }}
              />

              <div
                aria-hidden
                className="relative h-7 shrink-0"
                style={{
                  background: LID,
                  borderBottom: `1px solid ${BORDER}`,
                  boxShadow:
                    "inset 0 1.5px 0 rgba(255,250,230,0.55), inset 0 -1px 0 rgba(120,80,40,0.30)",
                }}
              >
                <span
                  aria-hidden
                  className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-8 h-3 rounded-sm"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(195,55,40,0.95) 0%, rgba(150,35,25,0.95) 100%)",
                    boxShadow:
                      "0 1px 0 rgba(255,250,230,0.45), inset 0 1px 0 rgba(255,255,255,0.30)",
                  }}
                />
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="close"
                className="absolute top-2 right-2 z-20 font-mono text-2xl font-bold leading-none w-10 h-10 flex items-center justify-center rounded-md"
                style={{
                  color: BADGE_TEXT,
                  background: BADGE,
                  border: `1px solid ${BORDER}`,
                  boxShadow:
                    "inset 0 1.5px 0 rgba(255,255,255,0.30), 0 2px 6px rgba(0,0,0,0.55)",
                  textShadow: "0 1px 0 rgba(255,255,255,0.25)",
                }}
              >
                ×
              </button>

              <div className="relative px-6 sm:px-7 pt-7 pb-7 overflow-y-auto">
                <p
                  className="font-mono uppercase tracking-[0.35em] text-[9px] mb-2"
                  style={{
                    color: SUB,
                    textShadow: "0 1px 0 rgba(255,250,230,0.40)",
                  }}
                >
                  · LEB ·
                </p>
                <h2
                  className="font-mono text-xl sm:text-2xl uppercase tracking-[0.12em] font-bold mb-5"
                  style={{
                    color: TEXT,
                    textShadow:
                      "0 1px 0 rgba(255,250,230,0.55), 0 -1px 0 rgba(120,80,40,0.30)",
                  }}
                >
                  leberch
                  <br />
                  the voice here
                </h2>

                <div
                  className="space-y-4 text-sm leading-relaxed"
                  style={{ color: TEXT }}
                >
                  <p>
                    Every track on the stereo — sad and hope, both channels —
                    is by an artist who goes by{" "}
                    <span className="font-semibold">leberch</span>, posted on
                    Pixabay under a license that lets anyone use the music for
                    free. I am one of those anyones.
                  </p>
                  <p>
                    I have not paid him. I cannot. I wrote to him to tell him
                    that, and to tell him this site is what I have to offer
                    instead — that the music doing this work here is the
                    closest thing to a payment I can give. This page is his
                    receipt.
                  </p>
                  <p
                    className="text-center italic pt-2"
                    style={{ color: SUB }}
                  >
                    Until he finds me, no other artist plays here. The voice
                    of every life this page is built around is being carried
                    by his music alone. That is on purpose.
                  </p>
                </div>

                <div className="mt-6">
                  <a
                    href="https://pixabay.com/users/leberch-50293141/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center font-mono uppercase tracking-[0.3em] text-xs font-bold px-4 py-3 rounded-sm transition-transform hover:-translate-y-0.5"
                    style={{
                      color: BADGE_TEXT,
                      background: BADGE,
                      border: `1px solid ${BORDER}`,
                      boxShadow:
                        "inset 0 1.5px 0 rgba(255,255,255,0.30), 0 2px 4px rgba(0,0,0,0.45)",
                      textShadow:
                        "0 1px 0 rgba(255,255,255,0.25), 0 -1px 0 rgba(0,0,0,0.20)",
                    }}
                  >
                    Listen to leberch on Pixabay →
                  </a>
                  <p
                    className="mt-3 font-mono text-[9px] uppercase tracking-[0.25em] text-center"
                    style={{ color: SUB }}
                  >
                    external — opens in new tab
                  </p>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
