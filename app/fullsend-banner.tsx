"use client";

import { useEffect, useState } from "react";

const TARGET_ISO = "2026-05-05T23:00:00-04:00";
const TARGET_MS = new Date(TARGET_ISO).getTime();

const pad = (n: number) => n.toString().padStart(2, "0");

export function FullsendBanner() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  let countdown: string;
  let live = false;
  if (now === null) {
    countdown = "--:--:--";
  } else {
    const diff = TARGET_MS - now;
    if (diff <= 0) {
      live = true;
      countdown = "LIVE";
    } else {
      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      countdown =
        days > 0
          ? `${days}d ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
          : `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }
  }

  return (
    <div
      className="relative font-mono text-blue-100 text-sm sm:text-base md:text-lg tracking-wide rounded-xl border border-blue-300/60 bg-blue-950/40 backdrop-blur-sm px-5 py-3 sm:px-8 sm:py-5 max-w-[90vw] sm:max-w-2xl text-center"
      style={{
        transform: "perspective(1200px) rotateX(-5deg) translateZ(20px)",
        boxShadow:
          "0 0 40px rgba(96,165,250,0.5), 0 0 80px rgba(59,130,246,0.3), 0 22px 55px -12px rgba(59,130,246,0.5), inset 0 1px 0 rgba(147,197,253,0.4)",
        textShadow:
          "0 0 12px rgba(96,165,250,0.7), 0 0 25px rgba(59,130,246,0.4)",
      }}
    >
      <span className="block">
        <span className="text-blue-50">FULLSENDBASH</span>
        ....&nbsp;connecting the tether to this parked GoDaddy domain.
      </span>

      <div className="mt-3 flex items-center justify-center gap-3 flex-wrap">
        {live ? (
          <span
            className="inline-flex items-center gap-2 text-blue-50 font-bold uppercase tracking-[0.3em]"
            style={{
              textShadow:
                "0 0 22px rgba(255,80,80,1), 0 0 45px rgba(255,80,80,0.7), 0 0 90px rgba(255,80,80,0.5)",
            }}
          >
            <span
              className="block w-2.5 h-2.5 rounded-full bg-red-400"
              style={{ boxShadow: "0 0 14px rgba(255,80,80,0.95)" }}
            />
            live now
          </span>
        ) : (
          <>
            <span
              className="text-blue-50 font-bold uppercase tracking-[0.3em]"
              style={{
                textShadow:
                  "0 0 22px rgba(180,210,255,1), 0 0 45px rgba(96,165,250,0.85), 0 0 90px rgba(59,130,246,0.6)",
              }}
            >
              tonight 10pm et
            </span>
            <span
              className="font-mono tabular-nums text-blue-100 text-base sm:text-lg md:text-xl tracking-widest"
              style={{
                textShadow:
                  "0 0 14px rgba(96,165,250,0.85), 0 0 30px rgba(59,130,246,0.5)",
              }}
            >
              {countdown}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
