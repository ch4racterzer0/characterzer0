"use client";

import { useEffect, useState } from "react";

const START_ISO = "2026-05-05T03:36:34.131Z";
const START_MS = new Date(START_ISO).getTime();

const pad = (n: number) => n.toString().padStart(2, "0");

export function ZeroClock() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  let body: string;
  if (now === null) {
    body = "—d --:--:--";
  } else {
    const ms = Math.max(0, now - START_MS);
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    body = `${days}d ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }

  return (
    <div className="text-center">
      <p className="text-blue-100/40 text-[10px] sm:text-xs tracking-[0.3em] uppercase">
        the day we brought characterzer0 to life
      </p>
      <p className="mt-3 font-mono text-2xl sm:text-3xl text-blue-100 tabular-nums tracking-wider">
        {body}
      </p>
      <p className="mt-2 text-blue-100/40 text-[10px] sm:text-xs tracking-wider font-mono">
        T-zero · {START_ISO}
      </p>
    </div>
  );
}
