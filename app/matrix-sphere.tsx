"use client";

import { useEffect, useRef, useState } from "react";
import {
  TETHERED_EPISODES,
  dispatchTetheredEpisode,
} from "./tethered-episodes";
import { createPortal } from "react-dom";
import { useZeroThoughtsBroadcast } from "./zero-thoughts";
import { useOrbHidden } from "./use-orb-hidden";

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
          title="Chracterzer零号 — sphere ghost video"
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
  { label: "Chracterzer零号", angle: 315, radius: 7 },
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
  const hidden = useOrbHidden();
  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[0] pointer-events-none flex items-start justify-center pt-[0vh]"
      style={{
        opacity: 0,
        animation: "orb-rear-light-rise 50s ease-out 6s forwards",
        visibility: hidden ? "hidden" : undefined,
      }}
    >
      <div
        className="relative w-[82vh] h-[82vh] max-w-[960px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(191,219,254,0.42) 0%, rgba(147,197,253,0.30) 18%, rgba(96,165,250,0.22) 32%, rgba(59,130,246,0.14) 48%, rgba(30,64,175,0.07) 62%, transparent 78%)",
          filter: "blur(34px)",
        }}
      />
    </div>
  );
}

const DEFAULT_ORB_PODCAST = {
  src: "https://rrri5gycujcgopya.public.blob.vercel-storage.com/ep011-hy0rf1c2Ld1BgpPxbwrV9EPZ4DR63J.mp3",
  title: "ep011 — the summons",
};

const MCK_HOLD_MS = 7000;
const MCK_FADE_MS = 2600;

const TETHERED_PICS: string[] = [
  "/tethered/character-zer0-abstract.png",
  "/tethered/secret-weapon.png",
  "/tethered/arya-profile.png",
  "/tethered/olivia-bio-1.png",
  "/tethered/Screenshot%202026-05-12%20203247.png",
  "/tethered/flicker.png",
  "/tethered/tethered-cover.png",
];

export function OrbEpisodeNav() {
  const [source, setSource] = useState<string>("default");
  const [title, setTitle] = useState<string>("");
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const onSet = (e: Event) => {
      const detail = (
        e as CustomEvent<{ source?: string; title?: string }>
      ).detail;
      setSource(detail?.source ?? "default");
      setTitle(detail?.title ?? "");
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => setPlaying(false);
    window.addEventListener("character-zero:set-podcast", onSet);
    window.addEventListener("character-zero:orb-play", onPlay);
    window.addEventListener("character-zero:orb-pause", onPause);
    window.addEventListener("character-zero:orb-ended", onEnded);
    return () => {
      window.removeEventListener("character-zero:set-podcast", onSet);
      window.removeEventListener("character-zero:orb-play", onPlay);
      window.removeEventListener("character-zero:orb-pause", onPause);
      window.removeEventListener("character-zero:orb-ended", onEnded);
    };
  }, []);

  if (source !== "tethered") return null;
  // Keep the prev/next tiles visible after pause/end so users don't lose
  // their place in the run — only hide them when no Tethered episode has
  // been picked at all.

  const chMatch = title.match(/ch(\d{2})/);
  if (!chMatch) return null;
  const idx = TETHERED_EPISODES.findIndex((e) => e.chapter === chMatch[1]);
  if (idx < 0) return null;
  const prev = idx > 0 ? TETHERED_EPISODES[idx - 1] : null;
  const next =
    idx < TETHERED_EPISODES.length - 1 ? TETHERED_EPISODES[idx + 1] : null;

  return (
    <div
      aria-hidden={false}
      className="fixed top-[32vh] left-4 right-4 sm:left-8 sm:right-8 z-[27] flex items-center justify-between pointer-events-none"
    >
      <div className="pointer-events-auto">
        {prev ? <NavTile ep={prev} side="prev" /> : <div className="w-[18vh]" />}
      </div>
      <div className="pointer-events-auto">
        {next ? <NavTile ep={next} side="next" /> : <div className="w-[18vh]" />}
      </div>
    </div>
  );
}

function NavTile({
  ep,
  side,
}: {
  ep: { chapter: string; title: string; image: string };
  side: "prev" | "next";
}) {
  return (
    <button
      type="button"
      onClick={() => {
        const full = TETHERED_EPISODES.find((x) => x.chapter === ep.chapter);
        if (full) dispatchTetheredEpisode(full);
      }}
      aria-label={`${side === "prev" ? "previous" : "next"} — ch${ep.chapter} ${ep.title}`}
      className="group relative w-[18vh] max-w-[200px] aspect-[3/4] rounded-md overflow-hidden border border-indigo-400/55 hover:border-indigo-200/85 bg-indigo-950/55 backdrop-blur-[2px] cursor-pointer transition-colors"
      style={{
        boxShadow:
          "0 0 22px rgba(129,140,248,0.35), 0 0 50px rgba(99,102,241,0.18), inset 0 1px 0 rgba(199,210,254,0.30)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ep.image}
        alt=""
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-95 transition-opacity select-none"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(15,12,46,0.05) 0%, rgba(15,12,46,0.75) 75%, rgba(15,12,46,0.92) 100%)",
        }}
      />
      <div
        className={`absolute top-2 ${side === "prev" ? "left-2" : "right-2"} text-indigo-200/85 text-[9px] tracking-[0.4em] uppercase`}
        style={{ textShadow: "0 0 8px rgba(165,180,252,0.6)" }}
      >
        {side === "prev" ? "← prev" : "next →"}
      </div>
      <div className="absolute bottom-2 left-2 right-2 flex flex-col gap-0.5">
        <span className="text-indigo-300/70 text-[8px] tracking-[0.35em] uppercase">
          ch {ep.chapter}
        </span>
        <span
          className="text-indigo-100 text-[11px] sm:text-xs tracking-[0.2em] uppercase italic leading-tight"
          style={{ textShadow: "0 0 8px rgba(199,210,254,0.7)" }}
        >
          {ep.title}
        </span>
      </div>
    </button>
  );
}

function FlagSVG() {
  const stripeH = 100 / 13;
  const stripes = Array.from({ length: 13 }, (_, i) => (
    <rect
      key={i}
      x={0}
      y={i * stripeH}
      width={190}
      height={stripeH}
      fill={i % 2 === 0 ? "#B22234" : "#FFFFFF"}
    />
  ));
  const cantonW = 76;
  const cantonH = stripeH * 7;
  const starRows = 9;
  const starCols = 11;
  const stars: React.ReactElement[] = [];
  for (let r = 0; r < starRows; r++) {
    const rowOffset = r % 2 === 0 ? 0 : (cantonW / starCols) / 2;
    const cols = r % 2 === 0 ? 6 : 5;
    for (let c = 0; c < cols; c++) {
      const cx = (c * 2 + 1) * (cantonW / (starCols + 1)) + rowOffset;
      const cy = (r + 0.7) * (cantonH / (starRows + 0.4));
      stars.push(
        <circle
          key={`s-${r}-${c}`}
          cx={cx}
          cy={cy}
          r={0.9}
          fill="#FFFFFF"
        />,
      );
    }
  }
  return (
    <svg
      viewBox="0 0 190 100"
      preserveAspectRatio="none"
      width="100%"
      height="100%"
      style={{ display: "block" }}
    >
      <defs>
        <filter id="cz0-flag-cloth" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.013 0.022"
            numOctaves="2"
            seed="3"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="14s"
              values="0.013 0.022;0.010 0.018;0.015 0.026;0.011 0.020;0.013 0.022"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="9"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
      <g filter="url(#cz0-flag-cloth)">
        {stripes}
        <rect x={0} y={0} width={cantonW} height={cantonH} fill="#3C3B6E" />
        {stars}
      </g>
    </svg>
  );
}

export function McKinleyFlagBackdrop() {
  const [source, setSource] = useState<string>("default");
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const onSet = (e: Event) => {
      const detail = (e as CustomEvent<{ source?: string }>).detail;
      setSource(detail?.source ?? "default");
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => setPlaying(false);
    window.addEventListener("character-zero:set-podcast", onSet);
    window.addEventListener("character-zero:orb-play", onPlay);
    window.addEventListener("character-zero:orb-pause", onPause);
    window.addEventListener("character-zero:orb-ended", onEnded);
    return () => {
      window.removeEventListener("character-zero:set-podcast", onSet);
      window.removeEventListener("character-zero:orb-play", onPlay);
      window.removeEventListener("character-zero:orb-pause", onPause);
      window.removeEventListener("character-zero:orb-ended", onEnded);
    };
  }, []);

  const active = source === "mckinley" && playing;

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none z-[2] flex items-center justify-center overflow-hidden"
      style={{
        opacity: active ? 0.16 : 0,
        transition: "opacity 2200ms ease-out",
      }}
    >
      <div
        className="relative"
        style={{
          width: "150vh",
          maxWidth: "92vw",
          aspectRatio: "19 / 10",
          animation: active
            ? "mck-flag-wave 18s ease-in-out infinite alternate"
            : undefined,
          transformOrigin: "50% 50%",
          filter: "blur(0.8px) saturate(0.6) brightness(0.85)",
          mixBlendMode: "screen",
        }}
      >
        <FlagSVG />
      </div>
    </div>
  );
}

export function OrbWallpapers() {
  const cycle = ORB_WALLPAPERS.length * 14;
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioGainRef = useRef<GainNode | null>(null);
  const videoGainRef = useRef<GainNode | null>(null);
  const audioWiredRef = useRef(false);
  const videoWiredRef = useRef(false);
  const switchingRef = useRef(false);
  const mckPicsCacheRef = useRef<string[] | null>(null);
  const mckTickRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [episode, setEpisode] = useState(DEFAULT_ORB_PODCAST);
  const [currentSource, setCurrentSource] = useState<string>("default");
  const [currentKind, setCurrentKind] = useState<"audio" | "video">("audio");
  const [mckPics, setMckPics] = useState<string[]>([]);
  const [mckIndex, setMckIndex] = useState(0);
  const [tetheredIndex, setTetheredIndex] = useState(0);
  const tetheredTickRef = useRef<number | null>(null);
  const [radioOn, setRadioOn] = useState(false);
  const hidden = useOrbHidden();

  const mckMode = currentSource === "mckinley" && playing && mckPics.length > 0;
  const tetheredMode =
    currentSource === "tethered" && playing && TETHERED_PICS.length > 0;
  const videoMode = currentSource === "tethered" && currentKind === "video";
  const picMode = mckMode || tetheredMode || videoMode;

  useEffect(() => {
    const on = () => setRadioOn(true);
    const off = () => setRadioOn(false);
    window.addEventListener("character-zero:radio-play", on);
    window.addEventListener("character-zero:radio-stop", off);
    return () => {
      window.removeEventListener("character-zero:radio-play", on);
      window.removeEventListener("character-zero:radio-stop", off);
    };
  }, []);

  useEffect(() => {
    const a = audioRef.current;
    if (a && !a.src) a.src = DEFAULT_ORB_PODCAST.src;
  }, []);

  useEffect(() => {
    const onCloseShow = () => {
      const a = audioRef.current;
      if (!a) return;
      try {
        a.pause();
      } catch {}
    };
    window.addEventListener("character-zero:close-show", onCloseShow);
    return () =>
      window.removeEventListener("character-zero:close-show", onCloseShow);
  }, []);

  const ensureGain = (target: "audio" | "video", value: number) => {
    const alreadyWired =
      target === "audio" ? audioWiredRef.current : videoWiredRef.current;
    // Skip Web Audio entirely when no boost is needed and we haven't wired
    // the element yet. Wiring an element through MediaElementAudioSourceNode
    // makes its output dependent on AudioContext state, which can mute the
    // element on autoplay-restricted page loads (this was breaking McKinley).
    if (value === 1 && !alreadyWired) return;
    const W = window as unknown as {
      AudioContext?: typeof AudioContext;
      webkitAudioContext?: typeof AudioContext;
    };
    const Ctx = W.AudioContext ?? W.webkitAudioContext;
    if (!Ctx) return;
    if (!audioCtxRef.current) audioCtxRef.current = new Ctx();
    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") ctx.resume().catch(() => {});
    if (target === "audio") {
      const a = audioRef.current;
      if (!a) return;
      if (!audioWiredRef.current) {
        try {
          const src = ctx.createMediaElementSource(a);
          const gain = ctx.createGain();
          src.connect(gain).connect(ctx.destination);
          audioGainRef.current = gain;
          audioWiredRef.current = true;
        } catch {}
      }
      if (audioGainRef.current) audioGainRef.current.gain.value = value;
    } else {
      const v = videoRef.current;
      if (!v) return;
      if (!videoWiredRef.current) {
        try {
          const src = ctx.createMediaElementSource(v);
          const gain = ctx.createGain();
          src.connect(gain).connect(ctx.destination);
          videoGainRef.current = gain;
          videoWiredRef.current = true;
        } catch {}
      }
      if (videoGainRef.current) videoGainRef.current.gain.value = value;
    }
  };

  useEffect(() => {
    const onSet = async (e: Event) => {
      const detail = (
        e as CustomEvent<{
          src: string;
          title?: string;
          source?: string;
          kind?: "audio" | "video";
          gain?: number;
        }>
      ).detail;
      if (!detail || !detail.src) return;
      const a = audioRef.current;
      const v = videoRef.current;
      if (!a) return;
      const src = detail.src;
      const source = detail.source ?? "default";
      const kind = detail.kind ?? "audio";
      const gain = typeof detail.gain === "number" ? detail.gain : 1;
      setCurrentSource(source);
      setCurrentKind(kind);
      ensureGain(kind, gain);
      if (source === "mckinley" && !mckPicsCacheRef.current) {
        try {
          const res = await fetch("/api/mckinley/pics", { cache: "no-store" });
          const data = (await res.json()) as { pics?: string[] };
          const pics = Array.isArray(data.pics) ? data.pics : [];
          mckPicsCacheRef.current = pics;
          setMckPics(pics);
          setMckIndex(0);
        } catch {
          mckPicsCacheRef.current = [];
        }
      } else if (source === "mckinley" && mckPicsCacheRef.current) {
        setMckPics(mckPicsCacheRef.current);
        setMckIndex(0);
      }
      switchingRef.current = true;
      if (kind === "video" && v) {
        try {
          a.pause();
        } catch {}
        v.src = src;
        v.load();
        const onCanPlay = () => {
          v.removeEventListener("canplay", onCanPlay);
          switchingRef.current = false;
          v.play().catch(() => {});
        };
        v.addEventListener("canplay", onCanPlay);
      } else {
        if (v) {
          try {
            v.pause();
            v.removeAttribute("src");
            v.load();
          } catch {}
        }
        try {
          a.pause();
        } catch {}
        a.src = src;
        a.load();
        const onCanPlay = () => {
          a.removeEventListener("canplay", onCanPlay);
          switchingRef.current = false;
          a.play().catch(() => {});
        };
        a.addEventListener("canplay", onCanPlay);
      }
      setEpisode({ src, title: detail.title ?? "" });
    };
    window.addEventListener("character-zero:set-podcast", onSet);
    return () =>
      window.removeEventListener("character-zero:set-podcast", onSet);
  }, []);

  useEffect(() => {
    if (!mckMode) return;
    if (mckTickRef.current !== null) window.clearInterval(mckTickRef.current);
    mckTickRef.current = window.setInterval(() => {
      setMckIndex((i) => (i + 1) % mckPics.length);
    }, MCK_HOLD_MS);
    return () => {
      if (mckTickRef.current !== null) {
        window.clearInterval(mckTickRef.current);
        mckTickRef.current = null;
      }
    };
  }, [mckMode, mckPics.length]);

  useEffect(() => {
    if (!tetheredMode) return;
    if (tetheredTickRef.current !== null)
      window.clearInterval(tetheredTickRef.current);
    tetheredTickRef.current = window.setInterval(() => {
      setTetheredIndex((i) => (i + 1) % TETHERED_PICS.length);
    }, MCK_HOLD_MS);
    return () => {
      if (tetheredTickRef.current !== null) {
        window.clearInterval(tetheredTickRef.current);
        tetheredTickRef.current = null;
      }
    };
  }, [tetheredMode]);

  const togglePlay = () => {
    if (currentKind === "video") {
      const v = videoRef.current;
      if (!v) return;
      if (v.paused) {
        void v.play();
      } else {
        v.pause();
      }
      return;
    }
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      void a.play();
    } else {
      a.pause();
    }
  };

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[25] pointer-events-none flex items-start justify-center pt-[3vh]"
      style={{
        opacity: 0,
        animation: "home-sphere-place 30s linear forwards",
        visibility: hidden ? "hidden" : undefined,
      }}
    >
      <div
        className="relative w-[28vh] h-[28vh] max-w-[360px] max-h-[360px] rounded-full overflow-hidden"
        style={{
          transformOrigin: "50% 0%",
          animation: "home-sphere-expand 35s ease-out 10s forwards",
        }}
      >
        <audio
          ref={audioRef}
          preload="metadata"
          onPlay={() => {
            setPlaying(true);
            window.dispatchEvent(new Event("character-zero:stop-radio"));
            window.dispatchEvent(new Event("character-zero:orb-play"));
          }}
          onPause={() => {
            setPlaying(false);
            if (!switchingRef.current) {
              window.dispatchEvent(new Event("character-zero:orb-pause"));
            }
          }}
          onEnded={() => {
            setPlaying(false);
            window.dispatchEvent(new Event("character-zero:orb-ended"));
          }}
        />
        <video
          ref={videoRef}
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          style={{
            opacity: videoMode ? 1 : 0,
            transition: "opacity 600ms ease-out",
            visibility: videoMode ? undefined : "hidden",
          }}
          onPlay={() => {
            setPlaying(true);
            window.dispatchEvent(new Event("character-zero:stop-radio"));
            window.dispatchEvent(new Event("character-zero:orb-play"));
          }}
          onPause={() => {
            setPlaying(false);
            if (!switchingRef.current) {
              window.dispatchEvent(new Event("character-zero:orb-pause"));
            }
          }}
          onEnded={() => {
            setPlaying(false);
            window.dispatchEvent(new Event("character-zero:orb-ended"));
          }}
        />
        {ORB_WALLPAPERS.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            style={{
              mixBlendMode: "screen",
              opacity: 0,
              animation: `orb-wallpaper-fade ${cycle}s ease-in-out infinite`,
              animationDelay: `${i * 14}s`,
              visibility: picMode ? "hidden" : undefined,
            }}
          />
        ))}
        {TETHERED_PICS.map((src, i) => {
          const active = tetheredMode && i === tetheredIndex;
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt=""
              aria-hidden
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
              style={{
                opacity: active ? 0.88 : 0,
                transform: active
                  ? "scale(1) rotate(0deg)"
                  : "scale(1.18) rotate(-2deg)",
                filter: active
                  ? "blur(0) hue-rotate(0deg) saturate(1) contrast(1.05)"
                  : "blur(14px) hue-rotate(-45deg) saturate(1.6) contrast(1.25)",
                mixBlendMode: "screen",
                transition: `opacity ${MCK_FADE_MS}ms ease-in-out, transform ${MCK_FADE_MS}ms ease-in-out, filter ${MCK_FADE_MS}ms ease-in-out`,
                animation: active
                  ? "mck-breath 5.5s ease-in-out infinite"
                  : undefined,
              }}
            />
          );
        })}
        {mckPics.map((src, i) => {
          const active = mckMode && i === mckIndex;
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt=""
              aria-hidden
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
              style={{
                opacity: active ? 0.88 : 0,
                transform: active
                  ? "scale(1) rotate(0deg)"
                  : "scale(1.18) rotate(-2deg)",
                filter: active
                  ? "blur(0) hue-rotate(0deg) saturate(1) contrast(1.05)"
                  : "blur(14px) hue-rotate(-45deg) saturate(1.6) contrast(1.25)",
                mixBlendMode: "screen",
                transition: `opacity ${MCK_FADE_MS}ms ease-in-out, transform ${MCK_FADE_MS}ms ease-in-out, filter ${MCK_FADE_MS}ms ease-in-out`,
                animation: active
                  ? "mck-breath 5.5s ease-in-out infinite"
                  : undefined,
              }}
            />
          );
        })}
        {radioOn ? null : (
          <button
            type="button"
            onClick={togglePlay}
            aria-label={
              picMode
                ? "Tap to pause"
                : playing
                  ? "Pause podcast"
                  : "Play podcast"
            }
            aria-pressed={playing}
            className={
              picMode
                ? "absolute inset-0 w-full h-full pointer-events-auto z-20 cursor-pointer bg-transparent border-0"
                : "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full pointer-events-auto z-20 flex items-center justify-center bg-blue-950/45 hover:bg-blue-900/70 border border-blue-300/65 hover:border-blue-200/85 backdrop-blur-sm transition-colors cursor-pointer"
            }
            style={
              picMode
                ? undefined
                : {
                    boxShadow:
                      "0 0 24px rgba(96,165,250,0.55), 0 0 60px rgba(59,130,246,0.30), inset 0 1px 0 rgba(191,219,254,0.40)",
                  }
            }
          >
            {picMode ? null : (
              <span
                aria-hidden
                className="block text-blue-100 text-lg sm:text-xl leading-none translate-x-[1px]"
                style={{
                  textShadow: "0 0 8px rgba(191,219,254,0.85)",
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                }}
              >
                {playing ? "❚❚" : "▶"}
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export function HomeSphere() {
  const hidden = useOrbHidden();

  return (
    <>
      <div
        aria-hidden
        className="fixed inset-0 z-[26] pointer-events-none flex items-start justify-center pt-[3vh]"
        style={{
          opacity: 0,
          animation: "home-sphere-place 30s linear forwards",
          visibility: hidden ? "hidden" : undefined,
        }}
      >
        <div
          className="relative w-[28vh] h-[28vh] max-w-[360px] max-h-[360px] pointer-events-none"
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
        </div>
      </div>
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
