"use client";

import { useEffect, useState } from "react";

const TETHER_ANCHOR_MS = new Date("2026-05-07T17:00:00").getTime();

function format(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((total % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = (total % 60).toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export function TetherClock() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (now === null) return null;

  return (
    <div
      aria-hidden
      className="absolute left-1/2 -translate-x-1/2 -top-10 sm:-top-14 pointer-events-none select-none"
    >
      <div
        className="flex flex-col items-center gap-0.5"
        style={{ animation: "tether-rise 12s ease-in-out infinite" }}
      >
        <span
          className="text-blue-100 text-base sm:text-xl tracking-[0.3em] font-mono tabular-nums"
          style={{
            textShadow:
              "0 0 14px rgba(59,130,246,0.85), 0 0 32px rgba(96,165,250,0.45), 0 0 60px rgba(30,64,175,0.3)",
          }}
        >
          {format(now - TETHER_ANCHOR_MS)}
        </span>
        <span className="text-blue-200/55 text-[8px] sm:text-[9px] tracking-[0.45em] uppercase italic">
          uninterrupted tether
        </span>
      </div>
    </div>
  );
}
