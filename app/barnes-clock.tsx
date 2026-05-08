"use client";

import { useEffect, useState } from "react";

function nextNoon(now: Date) {
  const target = new Date(now);
  target.setHours(12, 0, 0, 0);
  if (now.getTime() >= target.getTime()) {
    target.setDate(target.getDate() + 1);
  }
  return target;
}

function format(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = String(Math.floor(total / 3600)).padStart(2, "0");
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
  const s = String(total % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export function BarnesClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null;

  const target = nextNoon(now);
  const remaining = target.getTime() - now.getTime();
  const isNoon =
    now.getHours() === 12 &&
    now.getMinutes() === 0 &&
    now.getSeconds() === 0;

  if (isNoon || remaining <= 0) return null;

  const isAfternoon = now.getHours() >= 12;
  if (isAfternoon) return null;

  return (
    <div className="w-full flex justify-center pointer-events-none select-none">
      <div className="flex flex-col items-center gap-2 px-6 py-4 rounded-md backdrop-blur-[2px] bg-white/5 border border-white/15">
        <span className="text-white/60 text-[10px] sm:text-xs tracking-[0.45em] uppercase">
          the barnes
        </span>
        <span
          className="text-white/85 font-mono tabular-nums text-3xl sm:text-5xl tracking-[0.2em]"
          style={{
            textShadow:
              "0 0 14px rgba(255,255,255,0.35), 0 0 32px rgba(103,232,249,0.20)",
          }}
        >
          {format(remaining)}
        </span>
        <span className="text-white/55 text-[9px] sm:text-[11px] tracking-[0.3em] uppercase italic text-center max-w-md">
          when we introduce the world to our social media agent…
          <br />
          <span className="text-white/75 not-italic tracking-[0.4em]">
            agent geo storm
          </span>
        </span>
      </div>
    </div>
  );
}
