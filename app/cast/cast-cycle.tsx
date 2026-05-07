"use client";

import { useEffect, useState } from "react";

const FRAME_HOLD_MS = 11000;
const CROSSFADE_MS = 3500;

export function CastCycle({ frames }: { frames: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (frames.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % frames.length);
    }, FRAME_HOLD_MS);
    return () => clearInterval(id);
  }, [frames.length]);

  return (
    <main
      className="fixed inset-0 bg-black text-white overflow-hidden font-mono"
      style={{ animation: "cast-flicker 7.3s steps(60, end) infinite" }}
    >
      {frames.map((src, i) => {
        const drift = i % 2 === 0 ? "cast-drift" : "cast-drift-alt";
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            style={{
              opacity: i === index ? 1 : 0,
              transition: `opacity ${CROSSFADE_MS}ms ease-in-out`,
              animation: `${drift} 9s ease-in-out infinite alternate`,
            }}
          />
        );
      })}

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 55%, transparent 50%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 text-[10px] sm:text-xs tracking-[0.4em] uppercase text-white/65">
        <span
          aria-hidden
          className="block w-1.5 h-1.5 rounded-full bg-red-500"
          style={{
            boxShadow: "0 0 10px rgba(239,68,68,0.85)",
          }}
        />
        <span style={{ textShadow: "0 0 10px rgba(255,255,255,0.45)" }}>
          // cast
        </span>
      </div>

      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-white/45 italic">
        f11 for fullscreen
      </div>
    </main>
  );
}
