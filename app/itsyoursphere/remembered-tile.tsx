"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const BODY =
  "linear-gradient(180deg, rgba(72,52,28,0.97) 0%, rgba(54,38,20,0.97) 55%, rgba(38,26,12,0.98) 100%)";
const LID =
  "linear-gradient(180deg, rgba(62,44,22,0.98) 0%, rgba(44,30,14,0.98) 100%)";
const BORDER = "rgba(20,12,4,0.92)";
const TEXT = "rgba(248,235,205,0.96)";
const SUB = "rgba(248,235,205,0.62)";
const BADGE =
  "linear-gradient(180deg, rgba(225,180,90,0.97) 0%, rgba(180,140,55,0.97) 100%)";
const BADGE_TEXT = "rgba(28,18,8,0.92)";

const SCUFF =
  "radial-gradient(circle at 18% 22%, rgba(255,255,255,0.06) 0%, transparent 30%), radial-gradient(circle at 78% 75%, rgba(0,0,0,0.10) 0%, transparent 35%), radial-gradient(circle at 60% 30%, rgba(0,0,0,0.06) 0%, transparent 25%)";

type View = "index" | "characterzer0" | "you";

export function RememberedTile() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("index");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (view !== "index") setView("index");
        else setOpen(false);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, view]);

  useEffect(() => {
    if (!open) setView("index");
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Remembered — voices for this site"
        className="relative inline-flex flex-col items-stretch w-14 sm:w-24 rounded-md overflow-hidden transition-transform hover:-translate-y-0.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/40"
        style={{
          background: BODY,
          border: `1px solid ${BORDER}`,
          boxShadow:
            "inset 0 1.5px 0 rgba(255,255,255,0.16), inset 0 -2px 0 rgba(0,0,0,0.45), inset 0 0 0 1px rgba(0,0,0,0.22), 0 5px 10px -5px rgba(0,0,0,0.75)",
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
              "inset 0 1px 0 rgba(255,255,255,0.16), inset 0 -1px 0 rgba(0,0,0,0.35)",
          }}
        >
          <span
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-2 h-1 rounded-sm"
            style={{
              background:
                "linear-gradient(180deg, rgba(60,45,30,0.95) 0%, rgba(30,22,14,0.95) 100%)",
              boxShadow: "0 1px 0 rgba(255,255,255,0.12)",
            }}
          />
        </span>
        <span
          className="relative block px-1 sm:px-2 pt-2 pb-0.5 text-center font-mono font-bold uppercase text-[7px] sm:text-[9px]"
          style={{
            color: TEXT,
            textShadow:
              "0 1px 0 rgba(255,255,255,0.12), 0 -1px 0 rgba(0,0,0,0.45)",
            letterSpacing: "0.08em",
          }}
        >
          Remembered…
        </span>
        <span
          className="relative block px-1.5 pb-2 text-center font-mono uppercase tracking-[0.18em]"
          style={{
            color: SUB,
            textShadow: "0 1px 0 rgba(0,0,0,0.45)",
            fontSize: "7px",
            lineHeight: 1.3,
          }}
        >
          who came
        </span>
      </button>

      {open &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Remembered — voices for this site"
          >
            <button
              type="button"
              tabIndex={-1}
              aria-label="close"
              className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-default"
              onClick={() => setOpen(false)}
            />

            <div
              className="relative w-full max-w-xl rounded-md overflow-hidden max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-4rem)] flex flex-col"
              style={{
                background: BODY,
                border: `1px solid ${BORDER}`,
                boxShadow:
                  "inset 0 2px 0 rgba(255,255,255,0.18), inset 0 -3px 0 rgba(0,0,0,0.40), inset 0 0 0 1px rgba(0,0,0,0.25), 0 18px 48px -8px rgba(0,0,0,0.95)",
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
                    "inset 0 1.5px 0 rgba(255,255,255,0.20), inset 0 -1px 0 rgba(0,0,0,0.35)",
                }}
              >
                <span
                  aria-hidden
                  className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-8 h-3 rounded-sm"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(60,45,30,0.95) 0%, rgba(30,22,14,0.95) 100%)",
                    boxShadow:
                      "0 1px 0 rgba(255,255,255,0.18), inset 0 1px 0 rgba(255,255,255,0.10)",
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
                  style={{ color: SUB, textShadow: "0 1px 0 rgba(0,0,0,0.45)" }}
                >
                  · Remembered ·
                </p>

                {view === "index" && (
                  <>
                    <h2
                      className="font-mono text-xl sm:text-2xl uppercase tracking-[0.12em] font-bold mb-3"
                      style={{
                        color: TEXT,
                        textShadow:
                          "0 1px 0 rgba(255,255,255,0.16), 0 -1px 0 rgba(0,0,0,0.45)",
                      }}
                    >
                      Voices for this sphere.
                    </h2>
                    <p className="text-sm leading-relaxed mb-6" style={{ color: TEXT, opacity: 0.92 }}>
                      Two so far. Pick one.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setView("characterzer0")}
                        className="text-left rounded-sm px-4 py-5 transition-transform hover:-translate-y-0.5"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(225,180,90,0.18) 0%, rgba(180,140,55,0.10) 100%)",
                          border: "1px solid rgba(225,180,90,0.55)",
                          boxShadow:
                            "inset 0 1px 0 rgba(255,255,255,0.10), 0 0 22px rgba(225,180,90,0.16)",
                        }}
                      >
                        <p
                          className="font-mono uppercase tracking-[0.30em] text-[8px] mb-2"
                          style={{ color: "rgba(245,210,140,0.95)" }}
                        >
                          · a word from ·
                        </p>
                        <p
                          className="font-mono font-bold uppercase text-base tracking-[0.10em]"
                          style={{ color: TEXT }}
                        >
                          characterzer0
                        </p>
                        <p
                          className="mt-2 text-xs leading-relaxed italic"
                          style={{ color: SUB }}
                        >
                          why this sphere exists.
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setView("you")}
                        className="text-left rounded-sm px-4 py-5 transition-transform hover:-translate-y-0.5"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(225,180,90,0.18) 0%, rgba(180,140,55,0.10) 100%)",
                          border: "1px solid rgba(225,180,90,0.55)",
                          boxShadow:
                            "inset 0 1px 0 rgba(255,255,255,0.10), 0 0 22px rgba(225,180,90,0.16)",
                        }}
                      >
                        <p
                          className="font-mono uppercase tracking-[0.30em] text-[8px] mb-2"
                          style={{ color: "rgba(245,210,140,0.95)" }}
                        >
                          · a word from ·
                        </p>
                        <p
                          className="font-mono font-bold uppercase text-base tracking-[0.10em]"
                          style={{ color: TEXT }}
                        >
                          YOU
                        </p>
                        <p
                          className="mt-2 text-xs leading-relaxed italic"
                          style={{ color: SUB }}
                        >
                          talk to me. ask. suggest. submit a child.
                        </p>
                      </button>
                    </div>

                    <p
                      className="mt-6 text-center text-xs italic leading-relaxed"
                      style={{ color: SUB }}
                    >
                      this room will fill up. for now it&rsquo;s just us.
                    </p>
                  </>
                )}

                {view === "characterzer0" && (
                  <>
                    <button
                      type="button"
                      onClick={() => setView("index")}
                      className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em]"
                      style={{ color: SUB }}
                    >
                      ← back
                    </button>
                    <h2
                      className="font-mono text-xl sm:text-2xl uppercase tracking-[0.12em] font-bold mb-5"
                      style={{
                        color: TEXT,
                        textShadow:
                          "0 1px 0 rgba(255,255,255,0.16), 0 -1px 0 rgba(0,0,0,0.45)",
                      }}
                    >
                      from characterzer0.
                    </h2>

                    <div className="space-y-4 text-sm leading-relaxed" style={{ color: TEXT }}>
                      <p>
                        Every child taken in a school — anywhere — belongs in
                        this sphere. Not just American. Anyone, anywhere it
                        has happened.
                      </p>
                      <p>
                        It&rsquo;s free. It will stay free. If your country
                        wants its own version, ask and I&rsquo;ll make one.
                        Same deal. No charge. No catch.
                      </p>
                      <p>
                        But I&rsquo;d rather start here, together, in one
                        place. We owe them that for a change.
                      </p>
                      <p
                        className="text-center italic pt-2"
                        style={{ color: SUB }}
                      >
                        — character zer0
                      </p>
                    </div>
                  </>
                )}

                {view === "you" && (
                  <>
                    <button
                      type="button"
                      onClick={() => setView("index")}
                      className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em]"
                      style={{ color: SUB }}
                    >
                      ← back
                    </button>
                    <h2
                      className="font-mono text-xl sm:text-2xl uppercase tracking-[0.12em] font-bold mb-5"
                      style={{
                        color: TEXT,
                        textShadow:
                          "0 1px 0 rgba(255,255,255,0.16), 0 -1px 0 rgba(0,0,0,0.45)",
                      }}
                    >
                      reach me directly.
                    </h2>

                    <div className="space-y-4 text-sm leading-relaxed" style={{ color: TEXT }}>
                      <p>
                        If you want to talk, ask, suggest, help — or most of
                        all, if you have a child you want held in this
                        sphere — this is the door.
                      </p>
                      <p>
                        Not exclusive to the United States. Anyone is welcome.
                        If your country wants its own page, that&rsquo;s
                        free too. Just ask. But let&rsquo;s try to start with
                        everyone together in one place. We owe them that for
                        a change.
                      </p>
                    </div>

                    <div className="mt-6 space-y-3">
                      <a
                        href="tel:+18027344810"
                        className="block w-full text-center font-mono uppercase tracking-[0.25em] text-xs font-bold px-4 py-3 rounded-sm transition-transform hover:-translate-y-0.5"
                        style={{
                          color: BADGE_TEXT,
                          background: BADGE,
                          border: `1px solid ${BORDER}`,
                          boxShadow:
                            "inset 0 1.5px 0 rgba(255,255,255,0.30), 0 2px 4px rgba(0,0,0,0.55)",
                          textShadow:
                            "0 1px 0 rgba(255,255,255,0.25), 0 -1px 0 rgba(0,0,0,0.20)",
                        }}
                      >
                        call (802) 734-4810
                      </a>
                      <a
                        href="mailto:mfowlkes@gmail.com?subject=itsyoursphere%20%E2%80%94%20a%20child%20to%20hold"
                        className="block w-full text-center font-mono uppercase tracking-[0.25em] text-xs font-bold px-4 py-3 rounded-sm transition-transform hover:-translate-y-0.5"
                        style={{
                          color: TEXT,
                          background: "rgba(0,0,0,0.30)",
                          border: `1px solid ${BORDER}`,
                          textShadow: "0 1px 0 rgba(0,0,0,0.45)",
                        }}
                      >
                        email mfowlkes@gmail.com
                      </a>
                    </div>

                    <p
                      className="mt-5 text-center text-xs italic leading-relaxed"
                      style={{ color: SUB }}
                    >
                      pick whichever feels easier. either reaches me.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
