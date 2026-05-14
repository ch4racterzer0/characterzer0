"use client";

import { useEffect, useMemo, useState } from "react";

// /itsyoursphere orb: a single lit candle in the center (white wax = universal
// vigil, orange flame = also the Wear Orange gun-violence-prevention color).
// Faces and words still cycle on top via the Blob-driven overlay.

function Candle() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      aria-hidden
    >
      <style>{`
        @keyframes iys-candle-flicker {
          0%, 100% { opacity: 1; transform: scaleY(1) scaleX(1); }
          15% { opacity: 0.94; transform: scaleY(0.96) scaleX(1.02); }
          30% { opacity: 0.98; transform: scaleY(1.04) scaleX(0.98); }
          50% { opacity: 0.92; transform: scaleY(0.98) scaleX(1.01); }
          70% { opacity: 0.97; transform: scaleY(1.02) scaleX(0.99); }
          85% { opacity: 0.95; transform: scaleY(0.99) scaleX(1.01); }
        }
        @keyframes iys-candle-halo {
          0%, 100% { opacity: 0.55; }
          25% { opacity: 0.42; }
          50% { opacity: 0.60; }
          75% { opacity: 0.48; }
        }
      `}</style>
      <div
        className="relative"
        style={{ width: "16%", aspectRatio: "0.42 / 1" }}
      >
        {/* halo glow around the flame */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: "-22%",
            width: "320%",
            aspectRatio: "1 / 1",
            transform: "translateX(-50%)",
            background:
              "radial-gradient(circle, rgba(255,180,80,0.45) 0%, rgba(255,140,40,0.22) 30%, rgba(220,80,30,0.10) 55%, transparent 75%)",
            filter: "blur(10px)",
            animation: "iys-candle-halo 3.2s ease-in-out infinite",
          }}
        />

        {/* wax body */}
        <div
          className="absolute left-0 right-0"
          style={{
            bottom: 0,
            top: "22%",
            background:
              "linear-gradient(180deg, rgba(252,248,238,0.97) 0%, rgba(238,230,210,0.95) 50%, rgba(215,205,180,0.94) 100%)",
            borderRadius: "2px 2px 1px 1px",
            boxShadow:
              "inset -2px 0 4px rgba(0,0,0,0.18), inset 2px 0 4px rgba(255,255,255,0.35), inset 0 -2px 4px rgba(0,0,0,0.25), 0 0 30px rgba(255,180,80,0.25)",
          }}
        />

        {/* tiny rim of melted wax at top */}
        <div
          className="absolute left-0 right-0"
          style={{
            top: "20%",
            height: "3%",
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(255,200,120,0.50) 0%, rgba(150,120,80,0.40) 60%, rgba(60,40,20,0.30) 100%)",
            borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
          }}
        />

        {/* wick */}
        <div
          className="absolute left-1/2"
          style={{
            top: "13%",
            width: "8%",
            height: "9%",
            transform: "translateX(-50%)",
            background:
              "linear-gradient(180deg, rgba(40,28,18,0.95) 0%, rgba(20,14,10,0.95) 100%)",
            borderRadius: "1px",
          }}
        />

        {/* flame — animated flicker */}
        <div
          className="absolute left-1/2"
          style={{
            top: "-8%",
            width: "62%",
            aspectRatio: "0.55 / 1",
            transform: "translateX(-50%)",
            transformOrigin: "bottom center",
            animation: "iys-candle-flicker 2.4s ease-in-out infinite",
          }}
        >
          {/* outer flame layer */}
          <div
            className="absolute inset-0"
            style={{
              borderRadius: "50% 50% 50% 50% / 65% 65% 35% 35%",
              background:
                "radial-gradient(ellipse at 50% 75%, rgba(255,200,90,0.85) 0%, rgba(255,140,50,0.75) 45%, rgba(220,70,20,0.45) 80%, transparent 100%)",
              filter: "blur(0.6px)",
            }}
          />
          {/* hot inner core */}
          <div
            className="absolute"
            style={{
              top: "32%",
              left: "25%",
              right: "25%",
              bottom: "8%",
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              background:
                "radial-gradient(ellipse at 50% 80%, rgba(255,255,255,0.95) 0%, rgba(255,235,180,0.85) 40%, rgba(255,180,90,0.40) 90%, transparent 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

const STATIC_WORDS = [
  "REMEMBER",
  "LOVE",
  "NEVER FORGET",
  "ENOUGH",
  "STILL HERE",
  "THEY MATTERED",
  "NOT NUMBERS",
  "ALWAYS",
];

type OrbItem =
  | { kind: "face"; src: string }
  | { kind: "word"; text: string };

const OVERLAY_HOLD_MS = 4500;
const OVERLAY_FADE_MS = 1800;
const FACE_PEAK_OPACITY = 0.7;
const WORD_PEAK_OPACITY = 0.85;

export function FlagOrb() {
  const [overlayIdx, setOverlayIdx] = useState(0);
  const [faces, setFaces] = useState<string[]>([]);

  // Pull face URLs from the itsyoursphere-faces Blob namespace.
  // Empty namespace = no faces, only words cycle.
  useEffect(() => {
    let cancelled = false;
    fetch("/api/itsyoursphere-faces/list", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { faces: [] }))
      .then((d: { faces?: string[] }) => {
        if (!cancelled) setFaces(d.faces ?? []);
      })
      .catch(() => {
        if (!cancelled) setFaces([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Interleave faces with the static word list. When faces are empty,
  // the orb just cycles through the words.
  const overlay = useMemo<OrbItem[]>(() => {
    if (faces.length === 0) {
      return STATIC_WORDS.map((text) => ({ kind: "word" as const, text }));
    }
    const items: OrbItem[] = [];
    let wIdx = 0;
    faces.forEach((src, i) => {
      items.push({ kind: "face", src });
      if ((i + 1) % 2 === 0 && wIdx < STATIC_WORDS.length) {
        items.push({ kind: "word", text: STATIC_WORDS[wIdx] });
        wIdx++;
      }
    });
    while (wIdx < STATIC_WORDS.length) {
      items.push({ kind: "word", text: STATIC_WORDS[wIdx] });
      wIdx++;
    }
    return items;
  }, [faces]);

  useEffect(() => {
    if (overlay.length === 0) return;
    setOverlayIdx(0);
    const id = window.setInterval(() => {
      setOverlayIdx((i) => (i + 1) % overlay.length);
    }, OVERLAY_HOLD_MS);
    return () => window.clearInterval(id);
  }, [overlay.length]);

  return (
    <div
      aria-hidden
      className="relative pointer-events-none w-[85vw] sm:w-[min(38vw,42vh)]"
      style={{ aspectRatio: "1 / 1" }}
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
        {/* single lit candle — base layer that always sits in the orb */}
        <Candle />

        {/* overlay fader — faces fill the orb (clipped to circle); words render center-anchored. Faces dynamically loaded from /api/itsyoursphere-faces/list. Empty list -> only words cycle. */}
        <div className="absolute inset-0">
          {overlay.map((item, i) => {
            const active = overlayIdx === i;
            if (item.kind === "face") {
              return (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={`face-${i}-${item.src}`}
                  src={item.src}
                  alt=""
                  aria-hidden
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                  style={{
                    opacity: active ? FACE_PEAK_OPACITY : 0,
                    transition: `opacity ${OVERLAY_FADE_MS}ms ease-in-out`,
                    mixBlendMode: "screen",
                    filter: "grayscale(0.30) contrast(1.05)",
                  }}
                />
              );
            }
            return (
              <div
                key={`word-${i}-${item.text}`}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{
                  opacity: active ? WORD_PEAK_OPACITY : 0,
                  transition: `opacity ${OVERLAY_FADE_MS}ms ease-in-out`,
                  mixBlendMode: "screen",
                }}
              >
                <span
                  className="font-mono font-bold uppercase text-center leading-tight px-4"
                  style={{
                    color: "rgba(245,235,215,0.95)",
                    fontSize: "clamp(1.5rem, 6vw, 3rem)",
                    letterSpacing: "0.18em",
                    textShadow:
                      "0 0 18px rgba(120,150,210,0.65), 0 0 38px rgba(60,90,160,0.45), 0 2px 0 rgba(0,0,0,0.55)",
                  }}
                >
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
