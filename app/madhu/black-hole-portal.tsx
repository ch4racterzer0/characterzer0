"use client";

import { useEffect, useState } from "react";

const DESTINATION = "https://madhu.characterzer0.com/";

export function BlackHolePortal() {
  const [warping, setWarping] = useState(false);

  useEffect(() => {
    if (!warping) return;
    document.body.classList.add("warping-out");
    const t = setTimeout(() => {
      try {
        if (window.top) {
          window.top.location.href = DESTINATION;
          return;
        }
      } catch {}
      window.location.href = DESTINATION;
    }, 1000);
    return () => {
      clearTimeout(t);
    };
  }, [warping]);

  return (
    <button
      type="button"
      onClick={() => setWarping(true)}
      disabled={warping}
      aria-label="enter the hole"
      className="relative block mx-auto rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/60 cursor-pointer transition-transform duration-300 hover:scale-105 disabled:cursor-default"
      style={{
        width: "92px",
        height: "92px",
        filter:
          "drop-shadow(0 0 14px rgba(239,68,68,0.5)) drop-shadow(0 0 30px rgba(127,29,29,0.4))",
      }}
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full overflow-hidden"
      >
        <span
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, #000 0deg, #1e3a8a 60deg, #000 120deg, #1e40af 180deg, #000 240deg, #1e3a8a 300deg, #000 360deg)",
            animation: "blackhole-spin 7s linear infinite",
          }}
        />
        <span
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.4) 78%, rgba(0,0,0,0) 100%)",
          }}
        />
        <span
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow:
              "inset 0 0 20px rgba(0,0,0,1), inset 0 0 6px rgba(0,0,0,1)",
          }}
        />
      </span>
    </button>
  );
}
