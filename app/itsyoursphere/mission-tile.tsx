"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const BODY =
  "linear-gradient(180deg, rgba(28,42,78,0.97) 0%, rgba(20,32,62,0.97) 55%, rgba(14,22,46,0.98) 100%)";
const LID =
  "linear-gradient(180deg, rgba(22,34,64,0.98) 0%, rgba(14,22,46,0.98) 100%)";
const BORDER = "rgba(8,14,32,0.92)";
const TEXT = "rgba(245,235,215,0.96)";
const SUB = "rgba(245,235,215,0.65)";
const BADGE =
  "linear-gradient(180deg, rgba(225,180,90,0.97) 0%, rgba(180,140,55,0.97) 100%)";
const BADGE_TEXT = "rgba(28,18,8,0.92)";

const SCUFF =
  "radial-gradient(circle at 18% 22%, rgba(255,255,255,0.06) 0%, transparent 30%), radial-gradient(circle at 78% 75%, rgba(0,0,0,0.10) 0%, transparent 35%), radial-gradient(circle at 60% 30%, rgba(0,0,0,0.06) 0%, transparent 25%)";

export function IysTile() {
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
        aria-label="IYS — It's Your Sphere"
        className="relative inline-flex flex-col items-stretch w-14 sm:w-24 rounded-md overflow-hidden transition-transform hover:-translate-y-0.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/40"
        style={{
          background: BODY,
          border: `1px solid ${BORDER}`,
          boxShadow:
            "inset 0 1.5px 0 rgba(255,255,255,0.18), inset 0 -2px 0 rgba(0,0,0,0.45), inset 0 0 0 1px rgba(0,0,0,0.22), 0 5px 10px -5px rgba(0,0,0,0.75)",
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
              "inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.35)",
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
          className="relative block px-1 sm:px-2 pt-2 pb-0.5 text-center font-mono font-bold uppercase text-[11px] sm:text-[14px]"
          style={{
            color: TEXT,
            textShadow:
              "0 1px 0 rgba(255,255,255,0.12), 0 -1px 0 rgba(0,0,0,0.45)",
            letterSpacing: "0.18em",
          }}
        >
          IYS
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
          their sphere
        </span>
      </button>

      {open &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="It's Your Sphere"
          >
            <button
              type="button"
              tabIndex={-1}
              aria-label="close"
              className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-default"
              onClick={() => setOpen(false)}
            />

            <div
              className="relative w-full max-w-xl rounded-md overflow-hidden max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)] flex flex-col"
              style={{
                background: BODY,
                border: `1px solid ${BORDER}`,
                boxShadow:
                  "inset 0 2px 0 rgba(255,255,255,0.20), inset 0 -3px 0 rgba(0,0,0,0.40), inset 0 0 0 1px rgba(0,0,0,0.25), 0 18px 48px -8px rgba(0,0,0,0.95)",
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
                {/* mobile-only notice — this site isn't designed for phones */}
                <div
                  className="sm:hidden mb-6 rounded-sm px-4 py-4"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(225,180,90,0.12) 0%, rgba(180,140,55,0.08) 100%)",
                    border: "1px solid rgba(225,180,90,0.55)",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.10), 0 0 22px rgba(225,180,90,0.18)",
                  }}
                >
                  <p
                    className="font-mono uppercase tracking-[0.30em] text-[8px] mb-2"
                    style={{
                      color: "rgba(245,210,140,0.95)",
                      textShadow: "0 0 10px rgba(225,180,90,0.40)",
                    }}
                  >
                    · a note for mobile ·
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(245,235,215,0.95)" }}
                  >
                    this site is not designed for mobile, but too important to
                    block you. if you found us here, please enjoy what we are
                    able to provide — but please come back with a computer.
                  </p>
                  <p
                    className="mt-3 text-sm italic leading-relaxed"
                    style={{ color: "rgba(245,235,215,0.78)" }}
                  >
                    i would salute you all... but i did not earn that right.
                    this is the only salute i have to offer... this is my
                    receipt.
                  </p>
                </div>

                <p
                  className="font-mono uppercase tracking-[0.35em] text-[9px] mb-2"
                  style={{ color: SUB, textShadow: "0 1px 0 rgba(0,0,0,0.45)" }}
                >
                  · IYS ·
                </p>
                <h2
                  className="font-mono text-xl sm:text-2xl uppercase tracking-[0.12em] font-bold mb-5"
                  style={{
                    color: TEXT,
                    textShadow:
                      "0 1px 0 rgba(255,255,255,0.16), 0 -1px 0 rgba(0,0,0,0.45)",
                  }}
                >
                  It&rsquo;s Your
                  <br />
                  Sphere
                </h2>

                <div className="space-y-4 text-sm leading-relaxed" style={{ color: TEXT }}>
                  <p>
                    A place to remember anyone — child, teacher, staff,
                    parent — killed by a gun inside a school in this country.
                    Not a casualty count. A face, a name, a story their
                    family wants the rest of us to know.
                  </p>
                  <p>
                    Any family who lost someone this way can request a spot
                    here. We post the picture, the dates, and anything you
                    want said. Every grade. Every state. Every year. Until
                    the year there is nothing new to add.
                  </p>
                  <p
                    className="font-semibold tracking-[0.08em] uppercase text-center pt-2"
                    style={{
                      color: "rgba(245,210,140,0.95)",
                      textShadow:
                        "0 1px 0 rgba(0,0,0,0.45), 0 0 14px rgba(225,180,90,0.25)",
                    }}
                  >
                    no charge · no receipt needed
                  </p>
                  <p className="text-center text-sm italic" style={{ color: SUB }}>
                    The promise is in the name. This is their sphere now.
                  </p>
                </div>

                {/* personal note from the maker */}
                <div
                  className="mt-6 rounded-sm px-4 py-4"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(225,180,90,0.10) 0%, rgba(180,140,55,0.06) 100%)",
                    border: "1px solid rgba(225,180,90,0.45)",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.08), 0 0 18px rgba(225,180,90,0.12)",
                  }}
                >
                  <p
                    className="font-mono uppercase tracking-[0.30em] text-[8px] mb-2"
                    style={{
                      color: "rgba(245,210,140,0.95)",
                      textShadow: "0 0 10px rgba(225,180,90,0.40)",
                    }}
                  >
                    · a note from the maker ·
                  </p>
                  <p
                    className="text-sm italic leading-relaxed"
                    style={{ color: "rgba(245,235,215,0.92)" }}
                  >
                    this was made by someone never impacted by guns in a
                    school, but has 2 teenage boys — and is aware of the fact
                    that every name on this list once had a parent who said
                    the exact same thing... until they didn&rsquo;t.
                  </p>
                  <p
                    className="mt-3 text-sm italic leading-relaxed"
                    style={{ color: "rgba(245,235,215,0.92)" }}
                  >
                    this is my receipt for not doing more to stop it sooner.
                  </p>
                </div>

                <div
                  className="mt-6 pt-5 border-t text-center space-y-1"
                  style={{ borderColor: "rgba(245,235,215,0.12)" }}
                >
                  <p
                    className="font-mono text-[11px] italic leading-relaxed lowercase"
                    style={{ color: SUB }}
                  >
                    this page is my timestamp.
                    <br />
                    my receipt of all of this.
                    <br />
                    from here, it&rsquo;s up to them.
                  </p>
                </div>

                <div className="mt-6">
                  <a
                    href="mailto:iys@characterzer0.com?subject=Request%20a%20spot%20-%20IYS"
                    className="block w-full text-center font-mono uppercase tracking-[0.3em] text-xs font-bold px-4 py-3 rounded-sm transition-transform hover:-translate-y-0.5"
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
                    Request a spot →
                  </a>
                  <p
                    className="mt-3 font-mono text-[9px] uppercase tracking-[0.25em] text-center"
                    style={{ color: SUB }}
                  >
                    write to IYS — we answer.
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
