"use client";

import { useEffect, useState } from "react";

const FRAMES = [
  "/sphere/rick-mitarotonda.jpg",
  "/sphere/goose-band.jpg",
  "/sphere/trevor-weekz.webp",
  "/sphere/rick-420fest.jpg",
  "/sphere/goose-msg.jpg",
];

const FRAME_HOLD_MS = 12000;
const CROSSFADE_MS = 4000;

export function SiteGhost() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (FRAMES.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % FRAMES.length);
    }, FRAME_HOLD_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[50] pointer-events-none overflow-hidden"
      style={{ mixBlendMode: "screen", opacity: 0.22 }}
    >
      {FRAMES.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          style={{
            opacity: i === index ? 1 : 0,
            transition: `opacity ${CROSSFADE_MS}ms ease-in-out`,
          }}
        />
      ))}
    </div>
  );
}
