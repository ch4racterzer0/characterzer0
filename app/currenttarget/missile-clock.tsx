"use client";

import { useEffect, useState } from "react";

const pad = (n: number) => n.toString().padStart(2, "0");

export function MissileClock({ since }: { since: string }) {
  const startMs = new Date(since).getTime();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const fired = (() => {
    const d = new Date(since);
    return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}Z`;
  })();

  if (now === null) {
    return (
      <span className="text-red-300/55 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase font-mono tabular-nums">
        fired {fired} · elapsed --:--:--
      </span>
    );
  }

  const elapsed = Math.max(0, now - startMs);
  const total = Math.floor(elapsed / 1000);
  const days = Math.floor(total / 86400);
  const hh = pad(Math.floor((total % 86400) / 3600));
  const mm = pad(Math.floor((total % 3600) / 60));
  const ss = pad(total % 60);

  return (
    <span
      className="text-red-300/70 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase font-mono tabular-nums"
      style={{ textShadow: "0 0 8px rgba(239,68,68,0.45)" }}
    >
      fired {fired} · elapsed {days > 0 ? `${days}d ` : ""}
      {hh}:{mm}:{ss}
    </span>
  );
}
