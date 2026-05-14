"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Charity, LunchboxTone } from "./charity-data";

type Palette = {
  body: string;
  lid: string;
  text: string;
  sub: string;
  border: string;
  badge: string;
  badgeText: string;
};

const TONES: Record<LunchboxTone, Palette> = {
  red: {
    body: "linear-gradient(180deg, rgba(195,80,62,0.97) 0%, rgba(160,58,46,0.97) 55%, rgba(125,42,35,0.98) 100%)",
    lid: "linear-gradient(180deg, rgba(170,62,48,0.98) 0%, rgba(140,48,38,0.98) 100%)",
    text: "rgba(248,238,218,0.95)",
    sub: "rgba(248,238,218,0.62)",
    border: "rgba(60,20,15,0.9)",
    badge: "linear-gradient(180deg, rgba(225,180,90,0.97) 0%, rgba(180,140,55,0.97) 100%)",
    badgeText: "rgba(40,25,8,0.92)",
  },
  yellow: {
    body: "linear-gradient(180deg, rgba(225,190,95,0.97) 0%, rgba(195,160,70,0.97) 55%, rgba(160,128,52,0.98) 100%)",
    lid: "linear-gradient(180deg, rgba(205,170,80,0.98) 0%, rgba(170,138,58,0.98) 100%)",
    text: "rgba(58,38,12,0.94)",
    sub: "rgba(58,38,12,0.58)",
    border: "rgba(80,52,16,0.9)",
    badge: "linear-gradient(180deg, rgba(170,60,55,0.97) 0%, rgba(135,42,40,0.97) 100%)",
    badgeText: "rgba(248,238,218,0.95)",
  },
  teal: {
    body: "linear-gradient(180deg, rgba(120,178,168,0.97) 0%, rgba(95,150,140,0.97) 55%, rgba(70,118,108,0.98) 100%)",
    lid: "linear-gradient(180deg, rgba(105,158,148,0.98) 0%, rgba(82,130,120,0.98) 100%)",
    text: "rgba(248,238,218,0.95)",
    sub: "rgba(248,238,218,0.62)",
    border: "rgba(20,50,45,0.9)",
    badge: "linear-gradient(180deg, rgba(225,180,90,0.97) 0%, rgba(180,140,55,0.97) 100%)",
    badgeText: "rgba(40,25,8,0.92)",
  },
  cream: {
    body: "linear-gradient(180deg, rgba(235,220,185,0.97) 0%, rgba(205,185,145,0.97) 55%, rgba(170,150,108,0.98) 100%)",
    lid: "linear-gradient(180deg, rgba(218,200,160,0.98) 0%, rgba(185,165,128,0.98) 100%)",
    text: "rgba(72,46,22,0.93)",
    sub: "rgba(72,46,22,0.55)",
    border: "rgba(85,55,28,0.9)",
    badge: "linear-gradient(180deg, rgba(170,60,55,0.97) 0%, rgba(135,42,40,0.97) 100%)",
    badgeText: "rgba(248,238,218,0.95)",
  },
};

// Subtle aged-paint scuff overlay used on every lunchbox surface.
const SCUFF_OVERLAY =
  "radial-gradient(circle at 18% 22%, rgba(255,255,255,0.06) 0%, transparent 30%), radial-gradient(circle at 78% 75%, rgba(0,0,0,0.10) 0%, transparent 35%), radial-gradient(circle at 60% 30%, rgba(0,0,0,0.06) 0%, transparent 25%)";

export function CharityTile({ charity }: { charity: Charity }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const tone = TONES[charity.tone];

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
        aria-label={`${charity.name} — donation info`}
        className="relative inline-flex flex-col items-stretch w-14 sm:w-24 rounded-md overflow-hidden transition-transform hover:-translate-y-0.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/40"
        style={{
          background: tone.body,
          border: `1px solid ${tone.border}`,
          boxShadow:
            "inset 0 1.5px 0 rgba(255,255,255,0.22), inset 0 -2px 0 rgba(0,0,0,0.30), inset 0 0 0 1px rgba(0,0,0,0.18), 0 5px 10px -5px rgba(0,0,0,0.7)",
        }}
      >
        {/* aged-paint scuff overlay */}
        <span
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: SCUFF_OVERLAY, mixBlendMode: "overlay" }}
        />
        {/* lid strip with clasp */}
        <span
          aria-hidden
          className="relative block h-3 sm:h-3.5"
          style={{
            background: tone.lid,
            borderBottom: `1px solid ${tone.border}`,
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.20), inset 0 -1px 0 rgba(0,0,0,0.30)",
          }}
        >
          <span
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-2 h-1 rounded-sm"
            style={{
              background:
                "linear-gradient(180deg, rgba(60,45,30,0.95) 0%, rgba(30,22,14,0.95) 100%)",
              boxShadow: "0 1px 0 rgba(255,255,255,0.15)",
            }}
          />
        </span>
        {/* stamped charity short */}
        <span
          className={`relative block px-1 sm:px-2 pt-2 pb-0.5 text-center font-mono font-bold uppercase ${
            charity.short.length > 3
              ? "text-[9px] sm:text-[11px]"
              : "text-[11px] sm:text-[14px]"
          }`}
          style={{
            color: tone.text,
            textShadow:
              "0 1px 0 rgba(255,255,255,0.18), 0 -1px 0 rgba(0,0,0,0.30)",
            letterSpacing: charity.short.length > 3 ? "0.08em" : "0.18em",
          }}
        >
          {charity.short}
        </span>
        <span
          className="relative block px-1.5 pb-2 text-center font-mono uppercase tracking-[0.18em]"
          style={{
            color: tone.sub,
            textShadow: "0 1px 0 rgba(255,255,255,0.12)",
            fontSize: "7px",
            lineHeight: 1.3,
          }}
        >
          donate
        </span>
      </button>

      {open &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`${charity.name} — donation info`}
          >
            <button
              type="button"
              tabIndex={-1}
              aria-label="close"
              className="absolute inset-0 bg-black/85 backdrop-blur-sm cursor-default"
              onClick={() => setOpen(false)}
            />

            <div
              className="relative w-full max-w-lg rounded-md overflow-hidden max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)] flex flex-col"
              style={{
                background: tone.body,
                border: `1px solid ${tone.border}`,
                boxShadow:
                  "inset 0 2px 0 rgba(255,255,255,0.22), inset 0 -3px 0 rgba(0,0,0,0.30), inset 0 0 0 1px rgba(0,0,0,0.20), 0 14px 40px -6px rgba(0,0,0,0.9)",
              }}
            >
              {/* aged-paint scuff overlay on the panel */}
              <span
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: SCUFF_OVERLAY,
                  mixBlendMode: "overlay",
                }}
              />

              {/* lid strip with clasp on the modal */}
              <div
                aria-hidden
                className="relative h-7 shrink-0"
                style={{
                  background: tone.lid,
                  borderBottom: `1px solid ${tone.border}`,
                  boxShadow:
                    "inset 0 1.5px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(0,0,0,0.30)",
                }}
              >
                <span
                  aria-hidden
                  className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-7 h-3 rounded-sm"
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
                  color: tone.badgeText,
                  background: tone.badge,
                  border: `1px solid ${tone.border}`,
                  boxShadow:
                    "inset 0 1.5px 0 rgba(255,255,255,0.30), 0 2px 6px rgba(0,0,0,0.55)",
                  textShadow: "0 1px 0 rgba(255,255,255,0.25)",
                }}
              >
                ×
              </button>

              <div className="relative px-6 pt-6 pb-6 overflow-y-auto overscroll-contain">
                <p
                  className="font-mono uppercase tracking-[0.35em] text-[9px] mb-2"
                  style={{
                    color: tone.sub,
                    textShadow: "0 1px 0 rgba(255,255,255,0.12)",
                  }}
                >
                  · {charity.short} ·
                </p>
                <h2
                  className="font-mono text-lg sm:text-xl uppercase tracking-[0.12em] font-bold mb-4"
                  style={{
                    color: tone.text,
                    textShadow:
                      "0 1px 0 rgba(255,255,255,0.18), 0 -1px 0 rgba(0,0,0,0.30)",
                  }}
                >
                  {charity.name}
                </h2>
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: tone.text, opacity: 0.88 }}
                >
                  {charity.mission}
                </p>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <a
                    href={charity.donateUrl ?? charity.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center font-mono uppercase tracking-[0.3em] text-xs font-bold px-4 py-3 rounded-sm transition-transform hover:-translate-y-0.5"
                    style={{
                      color: tone.badgeText,
                      background: tone.badge,
                      border: `1px solid ${tone.border}`,
                      boxShadow:
                        "inset 0 1.5px 0 rgba(255,255,255,0.30), 0 2px 4px rgba(0,0,0,0.45)",
                      textShadow:
                        "0 1px 0 rgba(255,255,255,0.25), 0 -1px 0 rgba(0,0,0,0.20)",
                    }}
                  >
                    Donate →
                  </a>
                  <a
                    href={charity.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center font-mono uppercase tracking-[0.3em] text-xs px-4 py-3 rounded-sm transition-transform hover:-translate-y-0.5"
                    style={{
                      color: tone.text,
                      background: "rgba(0,0,0,0.18)",
                      border: `1px solid ${tone.border}`,
                      textShadow: "0 1px 0 rgba(255,255,255,0.12)",
                    }}
                  >
                    Visit site
                  </a>
                </div>

                <p
                  className="mt-4 font-mono text-[9px] uppercase tracking-[0.25em] text-center"
                  style={{ color: tone.sub }}
                >
                  external — opens in new tab
                </p>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="close"
                  className="mt-6 w-full text-center font-mono uppercase tracking-[0.3em] text-xs px-4 py-4 rounded-sm transition-transform hover:-translate-y-0.5"
                  style={{
                    color: tone.text,
                    background: "rgba(0,0,0,0.18)",
                    border: `1px solid ${tone.border}`,
                    textShadow: "0 1px 0 rgba(255,255,255,0.12)",
                  }}
                >
                  × close
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
