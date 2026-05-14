"use client";

import { useEffect, useMemo, useState } from "react";

// Flags currently empty for /itsyoursphere — this isn't a service-branch
// memorial. Add flag/symbol art here when the user picks the right imagery.
const ORB_FLAGS: string[] = [];

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

const HOLD_MS = 4500;
const FADE_MS = 1500;

const OVERLAY_HOLD_MS = 4500;
const OVERLAY_FADE_MS = 1800;
const FACE_PEAK_OPACITY = 0.7;
const WORD_PEAK_OPACITY = 0.85;

export function FlagOrb() {
  const [idx, setIdx] = useState(0);
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
    if (ORB_FLAGS.length === 0) return;
    const id = window.setInterval(() => {
      setIdx((i) => (i + 1) % ORB_FLAGS.length);
    }, HOLD_MS);
    return () => window.clearInterval(id);
  }, []);

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
        {/* flag fader — empty for /itsyoursphere; renders nothing while ORB_FLAGS is [] */}
        {ORB_FLAGS.length > 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="relative"
              style={{ width: "72%", aspectRatio: "3 / 2" }}
            >
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
        )}

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
