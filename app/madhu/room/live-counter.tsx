"use client";

import { useEffect, useState } from "react";

const pad = (n: number) => n.toString().padStart(2, "0");

export function LiveCounter({
  since,
  label,
}: {
  since: string;
  label: string;
}) {
  const startMs = new Date(since).getTime();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  let days = 0;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  if (now !== null) {
    const elapsed = Math.max(0, now - startMs);
    const total = Math.floor(elapsed / 1000);
    days = Math.floor(total / 86400);
    hours = Math.floor((total % 86400) / 3600);
    minutes = Math.floor((total % 3600) / 60);
    seconds = total % 60;
  }

  return (
    <div
      className="border border-red-400/30 bg-red-950/15 px-4 py-5 sm:px-6 sm:py-7"
      style={{ boxShadow: "inset 0 0 30px rgba(239,68,68,0.18)" }}
    >
      <p className="text-red-300/55 text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-3">
        {label}
      </p>
      <div className="flex flex-wrap items-end gap-3 sm:gap-6 font-mono tabular-nums">
        {[
          [days, "days"],
          [hours, "hrs"],
          [minutes, "min"],
          [seconds, "sec"],
        ].map(([v, u]) => (
          <div key={u as string} className="flex flex-col items-center">
            <span
              className="text-red-100 text-3xl sm:text-5xl tracking-wider"
              style={{
                textShadow:
                  "0 0 12px rgba(248,113,113,0.7), 0 0 28px rgba(239,68,68,0.4)",
              }}
            >
              {pad(v as number)}
            </span>
            <span className="text-red-300/50 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase mt-1">
              {u as string}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
