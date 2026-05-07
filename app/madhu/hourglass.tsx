"use client";

import { useEffect, useState } from "react";

const TARGET_ISO = "2026-05-05T23:00:00-04:00";
const TARGET_MS = new Date(TARGET_ISO).getTime();
const DRAIN_WINDOW_MS = 12 * 3600 * 1000;

export function Hourglass() {
  const [fraction, setFraction] = useState(1);

  useEffect(() => {
    const compute = () => {
      const remaining = TARGET_MS - Date.now();
      const f = Math.max(0, Math.min(1, remaining / DRAIN_WINDOW_MS));
      setFraction(f);
    };
    compute();
    const id = setInterval(compute, 5000);
    return () => clearInterval(id);
  }, []);

  const topSandY = 8 + 30 * (1 - fraction);
  const topSandHeight = 30 * fraction;

  const bottomSandY = 40 + 30 * fraction;
  const bottomSandHeight = 30 * (1 - fraction);

  return (
    <span
      aria-hidden
      className="relative inline-block shrink-0"
      style={{ width: "62px", height: "84px" }}
    >
      <svg
        viewBox="0 0 62 84"
        className="w-full h-full"
        style={{
          filter:
            "drop-shadow(0 0 10px rgba(34,197,94,0.55)) drop-shadow(0 0 20px rgba(21,128,61,0.35))",
        }}
      >
        <defs>
          <clipPath id="hg-top-clip">
            <path d="M10 8 L52 8 L31 38 Z" />
          </clipPath>
          <clipPath id="hg-bottom-clip">
            <path d="M31 40 L52 70 L10 70 Z" />
          </clipPath>
          <linearGradient id="hg-sand" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#bbf7d0" />
            <stop offset="60%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#14532d" />
          </linearGradient>
        </defs>

        <rect
          x="6"
          y="2"
          width="50"
          height="4"
          fill="#14532d"
          stroke="#052e16"
          strokeWidth="0.5"
        />
        <rect
          x="6"
          y="72"
          width="50"
          height="4"
          fill="#14532d"
          stroke="#052e16"
          strokeWidth="0.5"
        />
        <rect x="4" y="2" width="2" height="74" fill="#052e16" />
        <rect x="56" y="2" width="2" height="74" fill="#052e16" />

        <path
          d="M10 8 L52 8 L31 38 Z"
          fill="rgba(240,253,244,0.04)"
          stroke="#14532d"
          strokeWidth="0.8"
        />
        <path
          d="M31 40 L52 70 L10 70 Z"
          fill="rgba(240,253,244,0.04)"
          stroke="#14532d"
          strokeWidth="0.8"
        />

        <rect
          x="0"
          y={topSandY}
          width="62"
          height={topSandHeight}
          fill="url(#hg-sand)"
          clipPath="url(#hg-top-clip)"
        />
        <rect
          x="0"
          y={bottomSandY}
          width="62"
          height={bottomSandHeight}
          fill="url(#hg-sand)"
          clipPath="url(#hg-bottom-clip)"
        />

        {fraction > 0 && fraction < 1 && (
          <>
            <line
              x1="31"
              y1="38"
              x2="31"
              y2="42"
              stroke="#fbbf24"
              strokeWidth="0.8"
              opacity="0.85"
            />
            <circle
              cx="31"
              cy="40"
              r="0.6"
              fill="#fde68a"
              opacity="0.9"
            />
          </>
        )}
      </svg>
    </span>
  );
}
