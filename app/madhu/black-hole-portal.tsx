"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const DESTINATION = "https://hungersite.characterzer0.com/";
const WARP_MS = 1500;
const STREAK_COUNT = 48;

export function BlackHolePortal() {
  const [warping, setWarping] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!warping) return;
    document.body.classList.add("warping-out");
    const t = setTimeout(() => {
      try {
        if (window.top) {
          window.top.location.href = DESTINATION;
          return;
        }
      } catch {}
      window.location.href = DESTINATION;
    }, WARP_MS);
    return () => {
      clearTimeout(t);
    };
  }, [warping]);

  return (
    <>
      <button
        type="button"
        onClick={() => setWarping(true)}
        disabled={warping}
        aria-label="enter the hole"
        className="relative block mx-auto rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/60 cursor-pointer transition-transform duration-300 hover:scale-105 disabled:cursor-default"
        style={{
          width: "92px",
          height: "92px",
          filter:
            "drop-shadow(0 0 14px rgba(239,68,68,0.5)) drop-shadow(0 0 30px rgba(127,29,29,0.4))",
        }}
      >
        <span
          aria-hidden
          className="absolute inset-0 rounded-full overflow-hidden"
        >
          <span
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, #000 0deg, #1e3a8a 60deg, #000 120deg, #1e40af 180deg, #000 240deg, #1e3a8a 300deg, #000 360deg)",
              animation: "blackhole-spin 7s linear infinite",
            }}
          />
          <span
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.4) 78%, rgba(0,0,0,0) 100%)",
            }}
          />
          <span
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow:
                "inset 0 0 20px rgba(0,0,0,1), inset 0 0 6px rgba(0,0,0,1)",
            }}
          />
        </span>
      </button>

      {warping &&
        mounted &&
        createPortal(
          <div
            aria-hidden
            className="fixed inset-0 z-[80] pointer-events-none overflow-hidden bg-black"
          >
            {Array.from({ length: STREAK_COUNT }).map((_, i) => {
              const angle = (i * 360) / STREAK_COUNT;
              const delay = (i % 12) * 18;
              return (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${angle}deg)`,
                  }}
                >
                  <span
                    className="block origin-left"
                    style={{
                      width: "120vmax",
                      height: "2px",
                      background:
                        "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.0) 25%, rgba(255,255,255,0.5) 55%, rgba(180,210,255,1) 80%, rgba(255,255,255,0) 100%)",
                      animation: `streak ${WARP_MS}ms cubic-bezier(0.4, 0, 1, 1) ${delay}ms forwards`,
                    }}
                  />
                </div>
              );
            })}

            <span
              aria-hidden
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#ffffff",
                boxShadow:
                  "0 0 24px 8px rgba(255,255,255,0.85), 0 0 60px 24px rgba(180,210,255,0.6), 0 0 120px 60px rgba(96,165,250,0.4)",
              }}
            />
          </div>,
          document.body
        )}
    </>
  );
}
