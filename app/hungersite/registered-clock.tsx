"use client";

import { useEffect, useState } from "react";

const pad = (n: number) => n.toString().padStart(2, "0");

export function RegisteredClock({ since }: { since: string }) {
  const startMs = new Date(since).getTime();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (now === null) {
    return (
      <span className="font-mono tabular-nums text-blue-300/60 text-xs sm:text-sm">
        --:--:--
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
    <span className="font-mono tabular-nums text-blue-200 text-xs sm:text-sm tracking-wider">
      {days > 0 ? `${days}d ` : ""}
      {hh}:{mm}:{ss}
    </span>
  );
}
