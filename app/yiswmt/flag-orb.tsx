"use client";

import { useEffect, useState } from "react";

const ORB_FLAGS = [
  "/flags/flag-marines.png",
  "/flags/flag-army.png",
  "/flags/flag-navy.png",
  "/flags/flag-airforce.png",
  "/flags/flag-spaceforce.png",
  "/flags/flag-coastguard.png",
];

const HOLD_MS = 4500;
const FADE_MS = 1500;

export function FlagOrb() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIdx((i) => (i + 1) % ORB_FLAGS.length);
    }, HOLD_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      aria-hidden
      className="relative pointer-events-none"
      style={{ width: "min(38vw, 42vh)", aspectRatio: "1 / 1" }}
    >
      {/* outer breathing halo */}
      <div
        aria-hidden
        className="absolute inset-0 -m-[8%] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.30) 0%, rgba(96,165,250,0.16) 30%, rgba(30,64,175,0.08) 55%, transparent 75%)",
          filter: "blur(14px)",
        }}
      />
      {/* orb body — dark interior with thin rim */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(10,14,28,0.96) 0%, rgba(4,6,14,0.98) 50%, rgba(0,0,0,1) 100%)",
          border: "1px solid rgba(120,150,210,0.30)",
          boxShadow:
            "inset 0 0 60px rgba(0,0,0,0.85), inset 0 0 0 1px rgba(0,0,0,0.5), 0 0 40px rgba(40,70,140,0.35), 0 0 90px rgba(30,55,120,0.18)",
        }}
      >
        {/* faint inner ring */}
        <div
          aria-hidden
          className="absolute inset-[6%] rounded-full"
          style={{
            border: "1px solid rgba(120,150,210,0.10)",
            boxShadow: "inset 0 0 30px rgba(0,0,0,0.6)",
          }}
        />
        {/* flag fader — centered inside the orb */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative" style={{ width: "72%", aspectRatio: "3 / 2" }}>
            {ORB_FLAGS.map((src, i) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={src}
                src={src}
                alt=""
                aria-hidden
                draggable={false}
                className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                style={{
                  opacity: idx === i ? 1 : 0,
                  transition: `opacity ${FADE_MS}ms ease-in-out`,
                  mixBlendMode: "screen",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
