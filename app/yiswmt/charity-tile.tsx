"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Charity } from "./charity-data";

export function CharityTile({ charity }: { charity: Charity }) {
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
        aria-label={`${charity.name} — donation info`}
        className="relative inline-flex flex-col items-stretch w-[5.5rem] sm:w-24 rounded-md transition-opacity opacity-85 hover:opacity-100 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/40"
        style={{
          background:
            "linear-gradient(180deg, rgba(78,90,60,0.96) 0%, rgba(58,70,45,0.96) 45%, rgba(42,52,32,0.97) 100%)",
          border: "1px solid rgba(30,38,22,0.95)",
          boxShadow:
            "inset 0 1px 0 rgba(180,190,150,0.18), inset 0 -1px 0 rgba(0,0,0,0.55), 0 4px 10px -4px rgba(0,0,0,0.8)",
        }}
      >
        <Rivet pos="tl" />
        <Rivet pos="tr" />
        <Rivet pos="bl" />
        <Rivet pos="br" />
        <span
          className="block px-2 pt-3 pb-1 font-mono text-center font-semibold uppercase tracking-[0.18em]"
          style={{
            color: "rgba(230,225,205,0.92)",
            textShadow: "0 1px 0 rgba(0,0,0,0.75)",
            fontSize: charity.short.length > 3 ? "10px" : "13px",
            letterSpacing: charity.short.length > 3 ? "0.1em" : "0.18em",
          }}
        >
          {charity.short}
        </span>
        <span
          className="block px-1.5 pb-2 font-mono text-center uppercase tracking-[0.15em]"
          style={{
            color: "rgba(180,175,155,0.65)",
            textShadow: "0 1px 0 rgba(0,0,0,0.7)",
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
              className="relative w-full max-w-lg rounded-md overflow-hidden"
              style={{
                background:
                  "linear-gradient(180deg, rgba(78,90,60,0.98) 0%, rgba(58,70,45,0.98) 45%, rgba(42,52,32,0.99) 100%)",
                border: "1px solid rgba(30,38,22,0.95)",
                boxShadow:
                  "inset 0 1px 0 rgba(180,190,150,0.18), inset 0 -1px 0 rgba(0,0,0,0.55), 0 12px 40px -8px rgba(0,0,0,0.9), 0 0 60px rgba(0,0,0,0.6)",
              }}
            >
              <Rivet pos="tl" lg />
              <Rivet pos="tr" lg />
              <Rivet pos="bl" lg />
              <Rivet pos="br" lg />

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="close"
                className="absolute top-2 right-3 z-10 font-mono text-base leading-none w-7 h-7 flex items-center justify-center rounded-sm"
                style={{
                  color: "rgba(225,220,200,0.85)",
                  textShadow: "0 1px 0 rgba(0,0,0,0.75)",
                  background: "rgba(0,0,0,0.25)",
                  border: "1px solid rgba(30,38,22,0.95)",
                }}
              >
                ×
              </button>

              <div className="px-6 pt-7 pb-6">
                <p
                  className="font-mono uppercase tracking-[0.35em] text-[9px] mb-2"
                  style={{
                    color: "rgba(180,175,155,0.7)",
                    textShadow: "0 1px 0 rgba(0,0,0,0.7)",
                  }}
                >
                  · {charity.short} ·
                </p>
                <h2
                  className="font-mono text-lg sm:text-xl uppercase tracking-[0.15em] font-semibold mb-4"
                  style={{
                    color: "rgba(230,225,205,0.95)",
                    textShadow: "0 1px 0 rgba(0,0,0,0.75)",
                  }}
                >
                  {charity.name}
                </h2>
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{
                    color: "rgba(220,215,195,0.82)",
                  }}
                >
                  {charity.mission}
                </p>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <a
                    href={charity.donateUrl ?? charity.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center font-mono uppercase tracking-[0.3em] text-xs font-semibold px-4 py-3 rounded-sm transition-colors"
                    style={{
                      color: "rgba(20,16,8,0.9)",
                      background:
                        "linear-gradient(180deg, rgba(220,180,90,0.95) 0%, rgba(180,140,60,0.95) 100%)",
                      border: "1px solid rgba(120,90,30,0.9)",
                      boxShadow:
                        "inset 0 1px 0 rgba(255,230,150,0.5), 0 2px 4px rgba(0,0,0,0.5)",
                      textShadow: "0 1px 0 rgba(255,230,150,0.4)",
                    }}
                  >
                    Donate →
                  </a>
                  <a
                    href={charity.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center font-mono uppercase tracking-[0.3em] text-xs px-4 py-3 rounded-sm transition-colors"
                    style={{
                      color: "rgba(220,215,195,0.85)",
                      background: "rgba(0,0,0,0.3)",
                      border: "1px solid rgba(120,130,95,0.5)",
                      textShadow: "0 1px 0 rgba(0,0,0,0.7)",
                    }}
                  >
                    Visit site
                  </a>
                </div>

                <p
                  className="mt-4 font-mono text-[9px] uppercase tracking-[0.25em] text-center"
                  style={{
                    color: "rgba(160,155,135,0.55)",
                    textShadow: "0 1px 0 rgba(0,0,0,0.7)",
                  }}
                >
                  external — opens in new tab
                </p>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

function Rivet({
  pos,
  lg = false,
}: {
  pos: "tl" | "tr" | "bl" | "br";
  lg?: boolean;
}) {
  const size = lg ? "w-1.5 h-1.5" : "w-1 h-1";
  const place =
    pos === "tl"
      ? "top-1 left-1"
      : pos === "tr"
        ? "top-1 right-1"
        : pos === "bl"
          ? "bottom-1 left-1"
          : "bottom-1 right-1";
  return (
    <span
      aria-hidden
      className={`absolute ${place} ${size} rounded-full`}
      style={{
        background:
          "radial-gradient(circle, rgba(120,130,95,1) 0%, rgba(40,48,28,1) 80%)",
      }}
    />
  );
}
