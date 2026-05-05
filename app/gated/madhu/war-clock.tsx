"use client";

import { useEffect, useState } from "react";

const pad = (n: number) => n.toString().padStart(2, "0");

export function WarClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    return (
      <span className="font-mono tabular-nums text-blue-300/60 text-xs sm:text-sm">
        ----/--/-- ::--::
      </span>
    );
  }

  const yr = now.getUTCFullYear();
  const mo = pad(now.getUTCMonth() + 1);
  const dd = pad(now.getUTCDate());
  const hh = pad(now.getUTCHours());
  const mm = pad(now.getUTCMinutes());
  const ss = pad(now.getUTCSeconds());

  return (
    <span className="font-mono tabular-nums text-blue-200 text-xs sm:text-sm tracking-wider">
      {yr}-{mo}-{dd} {hh}:{mm}:{ss}Z
    </span>
  );
}
