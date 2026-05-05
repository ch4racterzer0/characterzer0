"use client";

import { useEffect, useState } from "react";

export function Cuckoo() {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const elapsedSec = (Date.now() - start) / 1000;
      setAngle(-(elapsedSec / 600) * 360);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="relative inline-block shrink-0"
      style={{ width: "72px", height: "78px" }}
      aria-hidden
    >
      <span
        className="absolute"
        style={{
          top: "0px",
          left: "10px",
          width: "14px",
          height: "14px",
          borderRadius: "50%",
          background: "#7f1d1d",
          border: "1px solid #450a0a",
          boxShadow: "inset 0 1px 1px rgba(255,255,255,0.18)",
        }}
      />
      <span
        className="absolute"
        style={{
          top: "0px",
          right: "10px",
          width: "14px",
          height: "14px",
          borderRadius: "50%",
          background: "#7f1d1d",
          border: "1px solid #450a0a",
          boxShadow: "inset 0 1px 1px rgba(255,255,255,0.18)",
        }}
      />

      <svg
        viewBox="0 0 72 72"
        className="absolute"
        style={{
          top: "8px",
          left: "0px",
          width: "72px",
          height: "72px",
          filter:
            "drop-shadow(0 0 10px rgba(220,38,38,0.55)) drop-shadow(0 0 20px rgba(127,29,29,0.35))",
        }}
      >
        <defs>
          <radialGradient id="cuckoo-face" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="60%" stopColor="#991b1b" />
            <stop offset="100%" stopColor="#7f1d1d" />
          </radialGradient>
          <radialGradient id="cuckoo-bezel" cx="50%" cy="50%" r="50%">
            <stop offset="80%" stopColor="#450a0a" />
            <stop offset="100%" stopColor="#1c0606" />
          </radialGradient>
        </defs>

        <circle cx="36" cy="36" r="32" fill="url(#cuckoo-bezel)" />
        <circle cx="36" cy="36" r="28" fill="url(#cuckoo-face)" />
        <circle
          cx="36"
          cy="36"
          r="26"
          fill="none"
          stroke="#450a0a"
          strokeWidth="0.5"
          opacity="0.7"
        />

        {[0, 90, 180, 270].map((deg) => (
          <line
            key={`major-${deg}`}
            x1="36"
            y1="14"
            x2="36"
            y2="18"
            stroke="#fee2e2"
            strokeWidth="1.4"
            strokeLinecap="round"
            transform={`rotate(${deg} 36 36)`}
          />
        ))}
        {[30, 60, 120, 150, 210, 240, 300, 330].map((deg) => (
          <line
            key={`minor-${deg}`}
            x1="36"
            y1="14"
            x2="36"
            y2="16"
            stroke="#fca5a5"
            strokeWidth="0.8"
            strokeLinecap="round"
            transform={`rotate(${deg} 36 36)`}
            opacity="0.65"
          />
        ))}

        <line
          x1="36"
          y1="36"
          x2="36"
          y2="18"
          stroke="#0a0a0a"
          strokeWidth="2.2"
          strokeLinecap="round"
          transform={`rotate(${angle} 36 36)`}
          style={{ transition: "transform 1s linear" }}
        />

        <circle cx="36" cy="36" r="2.2" fill="#0a0a0a" />
        <circle cx="36" cy="36" r="0.8" fill="#fee2e2" opacity="0.8" />
      </svg>
    </div>
  );
}
