"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const BODY =
  "linear-gradient(180deg, rgba(58,42,68,0.97) 0%, rgba(42,28,52,0.97) 55%, rgba(32,20,42,0.98) 100%)";
const LID =
  "linear-gradient(180deg, rgba(50,34,60,0.98) 0%, rgba(36,22,46,0.98) 100%)";
const BORDER = "rgba(20,12,28,0.92)";
const TEXT = "rgba(245,235,225,0.95)";
const SUB = "rgba(245,235,225,0.62)";
const BADGE =
  "linear-gradient(180deg, rgba(225,180,90,0.97) 0%, rgba(180,140,55,0.97) 100%)";
const BADGE_TEXT = "rgba(28,18,8,0.92)";

const SCUFF =
  "radial-gradient(circle at 18% 22%, rgba(255,255,255,0.06) 0%, transparent 30%), radial-gradient(circle at 78% 75%, rgba(0,0,0,0.10) 0%, transparent 35%), radial-gradient(circle at 60% 30%, rgba(0,0,0,0.06) 0%, transparent 25%)";

export function ShareTile() {
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
        aria-label="SHARE — share your loved one's story"
        className="relative inline-flex flex-col items-stretch w-[5.5rem] sm:w-24 rounded-md overflow-hidden transition-transform hover:-translate-y-0.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/40"
        style={{
          background: BODY,
          border: `1px solid ${BORDER}`,
          boxShadow:
            "inset 0 1.5px 0 rgba(255,255,255,0.16), inset 0 -2px 0 rgba(0,0,0,0.40), inset 0 0 0 1px rgba(0,0,0,0.22), 0 5px 10px -5px rgba(0,0,0,0.75)",
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
              "inset 0 1px 0 rgba(255,255,255,0.16), inset 0 -1px 0 rgba(0,0,0,0.30)",
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
          className="relative block px-2 pt-2 pb-0.5 text-center font-mono font-bold uppercase"
          style={{
            color: TEXT,
            textShadow:
              "0 1px 0 rgba(255,255,255,0.12), 0 -1px 0 rgba(0,0,0,0.45)",
            fontSize: "13px",
            letterSpacing: "0.18em",
          }}
        >
          SHARE
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
          their story
        </span>
      </button>

      {open &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Share the byline"
          >
            <button
              type="button"
              tabIndex={-1}
              aria-label="close"
              className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-default"
              onClick={() => setOpen(false)}
            />

            <div
              className="relative w-full max-w-xl rounded-md overflow-hidden"
              style={{
                background: BODY,
                border: `1px solid ${BORDER}`,
                boxShadow:
                  "inset 0 2px 0 rgba(255,255,255,0.18), inset 0 -3px 0 rgba(0,0,0,0.35), inset 0 0 0 1px rgba(0,0,0,0.22), 0 18px 48px -8px rgba(0,0,0,0.95)",
              }}
            >
              <span
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{ backgroundImage: SCUFF, mixBlendMode: "overlay" }}
              />

              <div
                aria-hidden
                className="relative h-7"
                style={{
                  background: LID,
                  borderBottom: `1px solid ${BORDER}`,
                  boxShadow:
                    "inset 0 1.5px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.30)",
                }}
              >
                <span
                  aria-hidden
                  className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-8 h-3 rounded-sm"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(60,45,30,0.95) 0%, rgba(30,22,14,0.95) 100%)",
                    boxShadow:
                      "0 1px 0 rgba(255,255,255,0.16), inset 0 1px 0 rgba(255,255,255,0.10)",
                  }}
                />
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="close"
                className="absolute top-1.5 right-2 z-10 font-mono text-base leading-none w-6 h-6 flex items-center justify-center rounded-sm"
                style={{
                  color: TEXT,
                  textShadow:
                    "0 1px 0 rgba(255,255,255,0.14), 0 -1px 0 rgba(0,0,0,0.30)",
                  background: "rgba(0,0,0,0.30)",
                  border: `1px solid ${BORDER}`,
                }}
              >
                ×
              </button>

              <div className="relative px-6 sm:px-7 pt-7 pb-7">
                <p
                  className="font-mono uppercase tracking-[0.35em] text-[9px] mb-2"
                  style={{ color: SUB, textShadow: "0 1px 0 rgba(0,0,0,0.45)" }}
                >
                  · share the byline ·
                </p>
                <h2
                  className="font-mono text-xl sm:text-2xl uppercase tracking-[0.12em] font-bold mb-5"
                  style={{
                    color: TEXT,
                    textShadow:
                      "0 1px 0 rgba(255,255,255,0.14), 0 -1px 0 rgba(0,0,0,0.45)",
                  }}
                >
                  Tell their story.
                </h2>

                <div className="space-y-4 text-sm leading-relaxed" style={{ color: TEXT }}>
                  <p>
                    This page was built by someone with no military family of
                    their own — only the shared loneliness, and the need to do
                    something with it.
                  </p>
                  <p>
                    Take what you have of the one you&rsquo;ve lost. Words,
                    images, what was said at the table on the bad nights. Put
                    it where someone you have not met yet can find it.
                  </p>
                  <p>
                    <span className="font-semibold">sharethebyline.com</span> is
                    the place. You write what you want said. An AI helps shape
                    it if you want help. The byline stays yours.
                  </p>
                  <p
                    className="text-center italic pt-2"
                    style={{ color: SUB }}
                  >
                    The ask is small. Leave a trace. Prove from the dark,
                    from the anonymous, from the deep that bringing your
                    worlds together makes a difference.
                  </p>
                </div>

                {/* Live article preview clipped from sharethebyline */}
                <a
                  href="https://sharethebyline.com/honoring-fallen-soldiers-a-new-initiative-celebrates-their-s-mp5gk03i"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-6 rounded-sm px-5 py-5 transition-transform hover:-translate-y-0.5"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(248,243,232,0.98) 0%, rgba(238,230,210,0.98) 100%)",
                    border: "1px solid rgba(80,60,40,0.35)",
                    boxShadow:
                      "0 4px 12px -2px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.6)",
                  }}
                >
                  <p
                    className="font-mono text-[9px] tracking-[0.35em] uppercase mb-2"
                    style={{ color: "rgba(80,60,40,0.65)" }}
                  >
                    the world
                  </p>
                  <h3
                    className="text-base sm:text-lg leading-snug mb-2"
                    style={{
                      color: "rgba(28,22,16,0.92)",
                      fontFamily:
                        "Georgia, 'Times New Roman', Times, serif",
                      fontWeight: 600,
                    }}
                  >
                    Honoring Fallen Soldiers: A New Initiative Celebrates
                    Their Stories
                  </h3>
                  <p
                    className="text-xs sm:text-sm italic leading-snug mb-3"
                    style={{
                      color: "rgba(60,46,32,0.82)",
                      fontFamily:
                        "Georgia, 'Times New Roman', Times, serif",
                    }}
                  >
                    A new platform, www.yiswmt.com, has been launched to honor
                    the stories and sacrifices of U.S. soldiers who gave their
                    lives in service.
                  </p>
                  <p
                    className="font-mono text-[9px] tracking-[0.25em] uppercase"
                    style={{ color: "rgba(80,60,40,0.55)" }}
                  >
                    by YISWMT &amp; ELLA · May 14, 2026
                  </p>
                  <p
                    className="mt-3 font-mono text-[8px] tracking-[0.3em] uppercase"
                    style={{ color: "rgba(80,60,40,0.45)" }}
                  >
                    read on sharethebyline →
                  </p>
                </a>

                <div className="mt-5">
                  <a
                    href="https://sharethebyline.com"
                    target="_blank"
                    rel="noopener noreferrer"
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
                    Share the byline →
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
