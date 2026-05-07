"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const GLOW = "0 0 6px rgba(96,165,250,0.6), 0 0 14px rgba(59,130,246,0.35)";

type Cover = {
  title: string;
  status: string;
  statusTone: "complete" | "active" | "queued" | "head-start";
  art: React.ReactNode;
};

function TetheredArt() {
  return (
    <svg
      viewBox="0 0 400 225"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="teth-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#000000" />
          <stop offset="100%" stopColor="#0c1838" />
        </linearGradient>
      </defs>
      <rect width="400" height="225" fill="url(#teth-bg)" />
      {/* left figure (silhouette) */}
      <ellipse cx="120" cy="115" rx="22" ry="32" fill="#000" />
      <rect x="100" y="140" width="40" height="70" fill="#000" />
      {/* right figure (glowing) */}
      <ellipse
        cx="280"
        cy="115"
        rx="22"
        ry="32"
        fill="none"
        stroke="#67e8f9"
        strokeWidth="1.2"
        opacity="0.85"
      />
      <rect
        x="260"
        y="140"
        width="40"
        height="70"
        fill="none"
        stroke="#67e8f9"
        strokeWidth="1.2"
        opacity="0.85"
      />
      {/* tether line */}
      <line
        x1="148"
        y1="125"
        x2="252"
        y2="125"
        stroke="#67e8f9"
        strokeWidth="1.5"
        strokeDasharray="3 3"
        opacity="0.9"
      />
    </svg>
  );
}

function OtherSideArt() {
  return (
    <svg
      viewBox="0 0 400 225"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="400" height="225" fill="#020a06" />
      {Array.from({ length: 24 }).map((_, i) => (
        <line
          key={i}
          x1={20 + i * 16}
          y1="0"
          x2={20 + i * 16}
          y2="225"
          stroke="#22c55e"
          strokeWidth="0.5"
          opacity={0.15 + (i % 5) * 0.08}
        />
      ))}
      {/* shatter lines from a center point */}
      {[20, 50, 95, 140, 200, 240, 290, 320].map((deg, i) => (
        <line
          key={i}
          x1="200"
          y1="115"
          x2={200 + 220 * Math.cos((deg * Math.PI) / 180)}
          y2={115 + 220 * Math.sin((deg * Math.PI) / 180)}
          stroke="#86efac"
          strokeWidth="0.8"
          opacity="0.55"
        />
      ))}
      <circle cx="200" cy="115" r="3" fill="#86efac" opacity="0.95" />
      <circle
        cx="200"
        cy="115"
        r="14"
        fill="none"
        stroke="#86efac"
        strokeWidth="0.6"
        opacity="0.5"
      />
    </svg>
  );
}

function HoleArt() {
  return (
    <svg
      viewBox="0 0 400 225"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="hole-bg" cx="50%" cy="55%" r="55%">
          <stop offset="0%" stopColor="#1a0033" />
          <stop offset="100%" stopColor="#000000" />
        </radialGradient>
        <radialGradient id="hole-rim" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="#000000" />
          <stop offset="80%" stopColor="#a855f7" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="225" fill="url(#hole-bg)" />
      {/* concentric purple rings (the swirl grid) */}
      {[40, 60, 80, 100, 130].map((r) => (
        <ellipse
          key={r}
          cx="200"
          cy="125"
          rx={r * 1.8}
          ry={r * 0.5}
          fill="none"
          stroke="#a855f7"
          strokeWidth="0.5"
          opacity={0.18 + (130 - r) / 200}
        />
      ))}
      <circle cx="200" cy="125" r="60" fill="url(#hole-rim)" />
      <circle cx="200" cy="125" r="36" fill="#000000" />
    </svg>
  );
}

function TunnelArt() {
  return (
    <svg
      viewBox="0 0 400 225"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="tun-bg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#1e1b4b" />
          <stop offset="60%" stopColor="#0f0d2e" />
          <stop offset="100%" stopColor="#000000" />
        </radialGradient>
      </defs>
      <rect width="400" height="225" fill="url(#tun-bg)" />
      {[110, 90, 72, 56, 42, 30, 20, 12].map((r) => (
        <circle
          key={r}
          cx="200"
          cy="115"
          r={r}
          fill="none"
          stroke="#6366f1"
          strokeWidth="0.6"
          opacity={0.15 + (12 / r) * 0.4}
        />
      ))}
      <circle cx="200" cy="115" r="6" fill="#000000" />
    </svg>
  );
}

const COVERS: Cover[] = [
  {
    title: "TETHERED",
    status: "complete",
    statusTone: "complete",
    art: <TetheredArt />,
  },
  {
    title: "THE OTHER SIDE",
    status: "in production",
    statusTone: "active",
    art: <OtherSideArt />,
  },
  {
    title: "HOLE",
    status: "queued",
    statusTone: "queued",
    art: <HoleArt />,
  },
  {
    title: "TUNNEL",
    status: "head start",
    statusTone: "head-start",
    art: <TunnelArt />,
  },
];

function statusClass(t: Cover["statusTone"]) {
  if (t === "complete") return "text-emerald-300";
  if (t === "active") return "text-cyan-300";
  if (t === "head-start") return "text-amber-300";
  return "text-blue-300/55";
}

function statusShadow(t: Cover["statusTone"]) {
  if (t === "complete")
    return "0 0 10px rgba(52,211,153,0.7), 0 0 22px rgba(52,211,153,0.35)";
  if (t === "active")
    return "0 0 10px rgba(103,232,249,0.7), 0 0 22px rgba(103,232,249,0.35)";
  if (t === "head-start")
    return "0 0 10px rgba(251,191,36,0.7), 0 0 22px rgba(251,191,36,0.35)";
  return "none";
}

export function PodcastCoversModal({ onClose }: { onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8 font-mono"
      role="dialog"
      aria-modal="true"
      aria-label="terrapin station podcasts"
    >
      <button
        type="button"
        aria-label="close"
        tabIndex={-1}
        className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-default"
        onClick={onClose}
      />

      <div
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto border border-blue-400/45 bg-black"
        style={{
          boxShadow:
            "0 0 60px rgba(59,130,246,0.45), 0 0 120px rgba(59,130,246,0.25), inset 0 1px 0 rgba(147,197,253,0.25)",
        }}
      >
        <header className="sticky top-0 z-10 bg-black border-b border-blue-400/30 px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="block w-2 h-2 rounded-full bg-cyan-300 shrink-0"
              style={{ boxShadow: "0 0 10px rgba(103,232,249,0.85)" }}
              aria-hidden
            />
            <span
              className="text-blue-100 text-[10px] sm:text-xs tracking-[0.3em] uppercase truncate"
              style={{ textShadow: GLOW }}
            >
              // terrapin station
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="close"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-blue-400/40 text-blue-100 text-lg leading-none flex items-center justify-center hover:bg-blue-900/50 hover:border-blue-300/60 transition-colors shrink-0"
          >
            ×
          </button>
        </header>

        <div className="p-5 sm:p-7 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {COVERS.map((c) => (
              <div
                key={c.title}
                className="relative aspect-video border border-blue-400/30 overflow-hidden"
                style={{ boxShadow: "inset 0 0 25px rgba(59,130,246,0.18)" }}
              >
                {c.art}
                <div
                  className="absolute inset-x-0 bottom-0 px-3 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.92), rgba(0,0,0,0.55) 70%, rgba(0,0,0,0))",
                  }}
                >
                  <div>
                    <p
                      className="text-blue-100 text-sm sm:text-base tracking-[0.2em] uppercase"
                      style={{ textShadow: GLOW }}
                    >
                      {c.title}
                    </p>
                    <p className="text-blue-300/55 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase mt-0.5">
                      // a podcast
                    </p>
                  </div>
                  <span
                    className={`text-[9px] sm:text-[10px] tracking-[0.25em] uppercase ${statusClass(
                      c.statusTone
                    )}`}
                    style={{ textShadow: statusShadow(c.statusTone) }}
                  >
                    ● {c.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div
            className="border border-amber-400/40 bg-amber-950/15 p-4 sm:p-5 space-y-2"
            style={{
              boxShadow:
                "0 0 25px rgba(251,191,36,0.25), inset 0 0 18px rgba(251,191,36,0.1)",
            }}
          >
            <p className="text-amber-300/80 text-[10px] sm:text-xs tracking-[0.3em] uppercase">
              // unlock requirement
            </p>
            <p
              className="text-amber-100 text-sm sm:text-base leading-relaxed"
              style={{
                textShadow:
                  "0 0 8px rgba(251,191,36,0.5), 0 0 18px rgba(251,191,36,0.25)",
              }}
            >
              <span className="text-amber-300 font-bold">3 of these 4</span>{" "}
              seasons must drop before this door opens. tunnel has the head
              start. tethered is in the can. two more to go.
            </p>
          </div>

          <p className="text-blue-300/45 italic text-[10px] sm:text-xs tracking-[0.2em] uppercase text-center pt-1">
            return when three are live
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
