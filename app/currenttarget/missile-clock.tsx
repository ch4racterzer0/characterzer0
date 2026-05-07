"use client";

import { useEffect, useState } from "react";

const pad = (n: number) => n.toString().padStart(2, "0");

type Tone = "red" | "amber";

const TONE_STYLES: Record<
  Tone,
  { dim: string; live: string; glow: string }
> = {
  red: {
    dim: "text-red-300/55",
    live: "text-red-300/70",
    glow: "0 0 8px rgba(239,68,68,0.45)",
  },
  amber: {
    dim: "text-amber-300/55",
    live: "text-amber-300/75",
    glow: "0 0 8px rgba(251,191,36,0.5)",
  },
};

export function MissileClock({
  since,
  tone = "red",
  label = "fired",
}: {
  since: string;
  tone?: Tone;
  label?: string;
}) {
  const startMs = new Date(since).getTime();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const styles = TONE_STYLES[tone];

  const stamp = (() => {
    const d = new Date(since);
    return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}Z`;
  })();

  if (now === null) {
    return (
      <span
        className={`${styles.dim} text-[9px] sm:text-[10px] tracking-[0.3em] uppercase font-mono tabular-nums`}
      >
        {label} {stamp} · elapsed --:--:--
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
      className={`${styles.live} text-[9px] sm:text-[10px] tracking-[0.3em] uppercase font-mono tabular-nums`}
      style={{ textShadow: styles.glow }}
    >
      {label} {stamp} · elapsed {days > 0 ? `${days}d ` : ""}
      {hh}:{mm}:{ss}
    </span>
  );
}
