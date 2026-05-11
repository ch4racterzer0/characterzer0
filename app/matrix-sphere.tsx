"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useZeroThoughtsBroadcast } from "./zero-thoughts";
import { InceptionPopup } from "./inception-popup";

function ThoughtsOverlay() {
  const text = useZeroThoughtsBroadcast();
  if (!text) return null;
  return (
    <div
      aria-hidden
      className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center px-6 sm:px-10"
    >
      <p
        className="text-blue-100/85 text-[11px] sm:text-sm leading-relaxed font-mono whitespace-pre-wrap text-center max-w-[68%]"
        style={{
          textShadow:
            "0 0 10px rgba(59,130,246,0.85), 0 0 22px rgba(96,165,250,0.45), 0 0 38px rgba(30,64,175,0.35)",
        }}
      >
        {text}
      </p>
    </div>
  );
}

function SphereGrid({ size = 560 }: { size?: number }) {
  const spacing = 28;
  const lines = [];
  for (let x = spacing; x < size; x += spacing) {
    lines.push(
      <line
        key={`v${x}`}
        x1={x}
        y1={0}
        x2={x}
        y2={size}
        stroke="rgba(147,197,253,0.16)"
        strokeWidth="0.5"
      />,
    );
  }
  for (let y = spacing; y < size; y += spacing) {
    lines.push(
      <line
        key={`h${y}`}
        x1={0}
        y1={y}
        x2={size}
        y2={y}
        stroke="rgba(147,197,253,0.16)"
        strokeWidth="0.5"
      />,
    );
  }

  const [sparkles, setSparkles] = useState<
    Array<{ i: number; cx: number; cy: number; delay: number; duration: number }>
  >([]);

  useEffect(() => {
    const xs = Math.floor(size / spacing);
    const ys = Math.floor(size / spacing);
    setSparkles(
      Array.from({ length: 32 }, (_, i) => {
        const cx = (1 + Math.floor(Math.random() * (xs - 1))) * spacing;
        const cy = (1 + Math.floor(Math.random() * (ys - 1))) * spacing;
        const delay = Math.random() * 5;
        const duration = 2.4 + Math.random() * 3;
        return { i, cx, cy, delay, duration };
      }),
    );
  }, [size]);

  return (
    <svg
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen"
      viewBox={`0 0 ${size} ${size}`}
      preserveAspectRatio="xMidYMid slice"
    >
      {lines}
      {sparkles.map((s) => (
        <circle
          key={s.i}
          cx={s.cx}
          cy={s.cy}
          r="1.6"
          fill="rgba(220,235,255,1)"
          style={{
            transformOrigin: `${s.cx}px ${s.cy}px`,
            animation: `sphere-sparkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            filter: "drop-shadow(0 0 2px rgba(147,197,253,0.9))",
          }}
        />
      ))}
    </svg>
  );
}

function LiveSphere({
  size = 560,
  videoId = "yLLN6g1BkkI",
  videoless = false,
}: {
  size?: number;
  videoId?: string;
  videoless?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = size;
    canvas.height = size;

    const fontSize = 14;
    const cols = Math.floor(size / fontSize);
    const drops = Array(cols)
      .fill(0)
      .map(() => Math.random() * (size / fontSize));
    const chars =
      "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ";
    const redChars =
      "党中央监视控制服从命令国家档案审查人民同志组织部署计划目标网站域名核心电脑神经协议密码";

    const redRemaining = Array(cols).fill(0);
    const RED_INTERVAL = 45000;
    const RED_BURST_COLS = 2;
    const RED_LEN_MIN = 6;
    const RED_LEN_MAX = 10;

    let raf = 0;
    let last = 0;
    let lastRedTrigger = 0;
    const step = 95;

    function draw(t: number) {
      if (!ctx) return;

      if (t - lastRedTrigger > RED_INTERVAL) {
        lastRedTrigger = t;
        for (let n = 0; n < RED_BURST_COLS; n++) {
          const col = Math.floor(Math.random() * cols);
          const len =
            RED_LEN_MIN +
            Math.floor(Math.random() * (RED_LEN_MAX - RED_LEN_MIN + 1));
          if (redRemaining[col] < len) redRemaining[col] = len;
        }
      }

      if (t - last > step) {
        last = t;
        ctx.fillStyle = "rgba(0,0,0,0.10)";
        ctx.fillRect(0, 0, size, size);
        ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
        for (let i = 0; i < cols; i++) {
          if (Math.random() > 0.55) continue;
          const isRed = redRemaining[i] > 0;
          const set = isRed ? redChars : chars;
          const ch = set[Math.floor(Math.random() * set.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;
          if (isRed) {
            ctx.shadowColor = "rgba(239,68,68,0.85)";
            ctx.shadowBlur = 6;
            ctx.fillStyle = "rgba(252,165,165,0.95)";
          } else {
            ctx.shadowBlur = 0;
            ctx.fillStyle = "rgba(147,197,253,0.85)";
          }
          ctx.fillText(ch, x, y);
          drops[i]++;
          if (isRed) redRemaining[i]--;
          if (y > size && Math.random() > 0.975) drops[i] = 0;
        }
        ctx.shadowBlur = 0;
      }
      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [size]);

  return (
    <div
      className="relative aspect-square w-full max-w-[560px] mx-auto rounded-full overflow-hidden"
      style={{
        transform: "perspective(1100px) rotateX(15deg) rotateY(-8deg)",
        maskImage:
          "radial-gradient(circle at center, black 30%, rgba(0,0,0,0.4) 60%, transparent 78%)",
        WebkitMaskImage:
          "radial-gradient(circle at center, black 30%, rgba(0,0,0,0.4) 60%, transparent 78%)",
        boxShadow:
          "inset 0 0 80px rgba(59,130,246,0.25), 0 0 60px rgba(59,130,246,0.15)",
      }}
    >
      {!videoless && (
        <iframe
          key={videoId}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&playsinline=1&iv_load_policy=3&disablekb=1`}
          title="character zer0 — sphere ghost video"
          allow="autoplay; encrypted-media; picture-in-picture"
          referrerPolicy="strict-origin"
          loading="lazy"
          className="absolute top-0 left-1/2 -translate-x-1/2 h-full block border-0 opacity-40"
          style={{ aspectRatio: "16 / 9" }}
        />
      )}
      <SphereGrid size={560} />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full opacity-35 mix-blend-screen pointer-events-none"
      />
      <ThoughtsOverlay />
    </div>
  );
}

function ScoftiTile({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="scofti — entertainment · open the live cast"
      className="group absolute top-12 right-3 sm:top-14 sm:right-5 z-20 w-24 sm:w-28 backdrop-blur-[2px] bg-amber-950/35 hover:bg-amber-950/55 border border-amber-400/55 hover:border-amber-300/85 rounded-md px-2.5 py-2 sm:px-3 sm:py-2 transition-colors cursor-pointer flex flex-col items-center gap-0.5 overflow-hidden"
      style={{
        boxShadow:
          "0 0 30px rgba(251,191,36,0.30), 0 0 70px rgba(146,64,14,0.30), 0 8px 22px -8px rgba(0,0,0,0.65), inset 0 1px 0 rgba(254,243,199,0.30)",
      }}
    >
      <div
        aria-hidden
        className="absolute -inset-x-4 -top-12 h-24 opacity-50 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 100%, rgba(251,191,36,0.55) 0%, transparent 70%)",
        }}
      />
      <div className="flex items-center gap-1.5">
        <span
          aria-hidden
          className="block w-1.5 h-1.5 rounded-full bg-red-500"
          style={{
            boxShadow: "0 0 8px rgba(239,68,68,0.95)",
            animation: "scofti-pulse 1.6s ease-in-out infinite",
          }}
        />
        <span className="text-amber-300/85 text-[8px] sm:text-[9px] tracking-[0.4em] uppercase">
          ↗ scofti
        </span>
      </div>
      <span
        className="relative text-amber-100 text-sm sm:text-base tracking-[0.3em] uppercase font-light group-hover:text-amber-50 transition-colors"
        style={{
          textShadow:
            "0 0 10px rgba(252,211,77,0.85), 0 0 22px rgba(251,191,36,0.55), 0 0 48px rgba(146,64,14,0.4)",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        }}
      >
        Scofti
      </span>
      <span className="text-amber-300/55 text-[8px] sm:text-[9px] tracking-[0.3em] uppercase italic">
        entertainment
      </span>
      <span className="text-amber-300/45 text-[7px] sm:text-[8px] tracking-[0.3em] uppercase">
        youtube · podcasts
      </span>
    </button>
  );
}

function ScoftiPopup({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="scofti live cast"
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="close"
        className="absolute inset-0 backdrop-blur-[2px] cursor-default"
        style={{ animation: "site-breathe-backdrop 6s ease-in-out infinite" }}
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-3xl flex flex-col items-center gap-5"
        style={{ animation: "site-breathe 6s ease-in-out infinite" }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="close"
          className="absolute -top-2 -right-2 z-10 w-9 h-9 rounded-full border border-amber-400/45 bg-amber-950/60 text-amber-100 text-lg leading-none flex items-center justify-center hover:bg-amber-900/70 hover:border-amber-300/70 transition-colors"
        >
          ×
        </button>
        <p
          className="text-amber-300/80 text-[10px] sm:text-xs tracking-[0.4em] uppercase"
          style={{ textShadow: "0 0 10px rgba(251,191,36,0.55)" }}
        >
          // scofti · entertainment · live
        </p>
        <LiveSphere videoless />
        <p className="text-amber-300/55 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase italic">
          esc to close
        </p>
      </div>
    </div>,
    document.body,
  );
}

const ORB_TILES = [
  { label: "Madhu", angle: 0, radius: 7.5 },
  { label: "Quest", angle: 92, radius: 7 },
  { label: "Drop", angle: 180, radius: 7.5 },
  { label: "US", angle: 248, radius: 7 },
];

const ORB_WALLPAPERS = [
  "/drop-rotation/itethered.png",
  "/drop-rotation/sharethebyline.png",
  "/drop-rotation/spotlight.png",
  "/drop-rotation/terrapin-station.png",
  "/drop-rotation/tethered.png",
  "/drop-rotation/thedelos.png",
  "/drop-rotation/warning.png",
];

export function OrbRearLight() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[0] pointer-events-none flex items-start justify-center pt-[8vh]"
      style={{
        opacity: 0,
        animation: "orb-rear-light-rise 50s ease-out 6s forwards",
      }}
    >
      <div
        className="relative w-[70vh] h-[70vh] max-w-[820px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(191,219,254,0.42) 0%, rgba(147,197,253,0.30) 18%, rgba(96,165,250,0.22) 32%, rgba(59,130,246,0.14) 48%, rgba(30,64,175,0.07) 62%, transparent 78%)",
          filter: "blur(34px)",
        }}
      />
    </div>
  );
}

export function OrbWallpapers() {
  const cycle = ORB_WALLPAPERS.length * 14;
  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[0] pointer-events-none flex items-start justify-center pt-[17vh]"
      style={{
        opacity: 0,
        animation: "home-sphere-place 30s linear forwards",
      }}
    >
      <div
        className="relative w-[22vh] h-[22vh] max-w-[280px] max-h-[280px] rounded-full overflow-hidden"
        style={{
          transformOrigin: "50% 0%",
          animation: "home-sphere-expand 35s ease-out 10s forwards",
        }}
      >
        <audio
          controls
          preload="metadata"
          src="https://rrri5gycujcgopya.public.blob.vercel-storage.com/ep011-hy0rf1c2Ld1BgpPxbwrV9EPZ4DR63J.mp3"
          className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[85%] pointer-events-auto z-10"
        />
        {ORB_WALLPAPERS.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover select-none"
            style={{
              mixBlendMode: "screen",
              opacity: 0,
              animation: `orb-wallpaper-fade ${cycle}s ease-in-out infinite`,
              animationDelay: `${i * 14}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function HomeSphere() {
  const [inceptionOpen, setInceptionOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <>
      <div
        aria-hidden
        className="fixed inset-0 z-[2] pointer-events-none flex items-start justify-center pt-[17vh]"
        style={{
          opacity: 0,
          animation: "home-sphere-place 30s linear forwards",
        }}
      >
        <div
          className="relative w-[22vh] h-[22vh] max-w-[280px] max-h-[280px] pointer-events-none"
          style={{
            transformOrigin: "50% 0%",
            animation: "home-sphere-expand 35s ease-out 10s forwards",
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 35% 28%, rgba(255,255,255,0.22) 0%, rgba(191,219,254,0.14) 22%, rgba(96,165,250,0.06) 42%, transparent 60%), radial-gradient(circle at 70% 80%, rgba(15,23,42,0.55) 0%, rgba(15,23,42,0.20) 35%, transparent 60%)",
              mixBlendMode: "screen",
              opacity: 0,
              animation: "orb-sphere-3d-rise 45s ease-out 10s forwards",
            }}
          />
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              border: "1px solid rgba(147,197,253,0.9)",
              animation: "home-sphere-shimmer 6s ease-in-out infinite",
            }}
          />
          {ORB_TILES.map((t, i) => (
            <span
              key={t.label}
              className="absolute top-1/2 left-1/2 font-mono text-blue-100/85 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase whitespace-nowrap pointer-events-none"
              style={{
                opacity: 0,
                transform: `translate(-50%, -50%) rotate(${t.angle}deg) translateY(-${t.radius}vh) rotate(${-t.angle}deg)`,
                animation: `orb-tile-pulse 60s linear ${i * 13}s infinite`,
                textShadow:
                  "0 0 8px rgba(96,165,250,0.85), 0 0 18px rgba(59,130,246,0.5)",
              }}
            >
              {t.label}
            </span>
          ))}
          <button
            type="button"
            onClick={() => setInceptionOpen(true)}
            aria-label="inception"
            className="absolute top-1/2 left-1/2 font-mono text-blue-100/65 hover:text-blue-100 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase whitespace-nowrap pointer-events-auto cursor-pointer bg-transparent border-0 p-0 transition-colors"
            style={{
              transform:
                "translate(-50%, -50%) rotate(135deg) translateY(-7vh) rotate(-135deg)",
              textShadow:
                "0 0 8px rgba(96,165,250,0.55), 0 0 18px rgba(59,130,246,0.3)",
            }}
          >
            Inception
          </button>
        </div>
      </div>
      {inceptionOpen && mounted && (
        <InceptionPopup onClose={() => setInceptionOpen(false)} />
      )}
    </>
  );
}

export function MatrixSphere() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <>
      <ScoftiTile onClick={() => setOpen(true)} />
      {open && mounted && <ScoftiPopup onClose={() => setOpen(false)} />}
    </>
  );
}
