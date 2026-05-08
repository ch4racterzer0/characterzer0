"use client";

import Image from "next/image";
import {
  ReactNode,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import { TetherClock } from "./tether-clock";

const JEMP_STREAM = "https://streaming.radio.co/sd71de59b3/listen";

type RadioCtx = {
  playing: boolean;
  toggle: () => void;
};

const RadioContext = createContext<RadioCtx | null>(null);

function useRadio(): RadioCtx {
  const ctx = useContext(RadioContext);
  if (!ctx) throw new Error("useRadio must be used inside RadioProvider");
  return ctx;
}

export function RadioProvider({ children }: { children: ReactNode }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  };

  return (
    <RadioContext.Provider value={{ playing, toggle }}>
      {children}
      <audio ref={audioRef} src={JEMP_STREAM} preload="none" />
    </RadioContext.Provider>
  );
}

export function RadioTile({ label }: { label: string }) {
  const { playing, toggle } = useRadio();
  const halo = playing ? "-inset-6 bg-blue-400/35" : "-inset-6 bg-blue-500/15";
  const shadow = playing
    ? "0 0 45px rgba(96, 165, 250, 0.65), 0 0 90px rgba(96, 165, 250, 0.30), 0 12px 28px -10px rgba(96, 165, 250, 0.55), inset 0 1px 0 rgba(191, 219, 254, 0.50)"
    : "0 0 30px rgba(59, 130, 246, 0.40), 0 0 60px rgba(59, 130, 246, 0.18), 0 12px 28px -10px rgba(59, 130, 246, 0.40), inset 0 1px 0 rgba(147, 197, 253, 0.35)";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? `Stop ${label} radio` : `Play ${label} radio`}
      className="relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 rounded-xl"
    >
      <span aria-hidden className={`absolute rounded-full blur-3xl ${halo}`} />
      <span
        className="relative block rounded-xl border border-blue-400/40 bg-blue-950/40 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5 px-5 sm:px-7 py-3 sm:py-4"
        style={{
          transform: "perspective(1200px) rotateX(-8deg)",
          boxShadow: shadow,
        }}
      >
        <span className="block text-blue-100 font-light uppercase whitespace-nowrap text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em]">
          {label}
        </span>
        <span
          className={`mt-1 block text-[8px] sm:text-[9px] tracking-[0.3em] uppercase ${
            playing ? "text-blue-200" : "text-blue-300/40"
          }`}
        >
          {playing ? "● on air" : "○ tap to play"}
        </span>
      </span>
    </button>
  );
}

export function TurntableTile() {
  const { playing, toggle } = useRadio();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? "Stop the audio stream" : "Play the audio stream"}
      className="relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 rounded-full inline-flex flex-col items-center gap-2 group"
    >
      <span
        aria-hidden
        className={`absolute left-1/2 -translate-x-1/2 top-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full blur-3xl transition-colors ${
          playing ? "bg-blue-400/55" : "bg-blue-500/20"
        }`}
      />
      <span
        aria-hidden
        className="relative block w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-blue-400/45 transition-shadow duration-500"
        style={{
          background:
            "radial-gradient(circle at center, rgba(15,23,42,0.95) 0%, rgba(0,0,0,1) 55%, rgba(30,58,138,0.45) 100%), repeating-radial-gradient(circle at center, rgba(96,165,250,0.12) 0px, rgba(96,165,250,0.12) 1px, transparent 1px, transparent 4px)",
          backgroundBlendMode: "screen",
          boxShadow: playing
            ? "0 0 40px rgba(96,165,250,0.65), 0 0 90px rgba(96,165,250,0.30), inset 0 0 22px rgba(59,130,246,0.40)"
            : "0 0 22px rgba(59,130,246,0.35), 0 0 50px rgba(59,130,246,0.16), inset 0 0 18px rgba(59,130,246,0.18)",
          animation: playing ? "turntable-spin 4s linear infinite" : "none",
        }}
      >
        <span
          aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-blue-300/55 bg-blue-950/85 flex items-center justify-center"
          style={{
            boxShadow: "inset 0 0 12px rgba(59,130,246,0.35)",
          }}
        >
          <span
            className="text-blue-100 text-[8px] sm:text-[9px] tracking-[0.35em] uppercase font-light"
            style={{ textShadow: "0 0 8px rgba(96,165,250,0.55)" }}
          >
            audio
          </span>
        </span>
        <span
          aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-200"
          style={{ boxShadow: "0 0 8px rgba(191,219,254,0.95)" }}
        />
      </span>
      <span
        className={`text-[8px] sm:text-[9px] tracking-[0.35em] uppercase whitespace-nowrap transition-colors ${
          playing ? "text-blue-200" : "text-blue-300/55"
        }`}
      >
        {playing ? "● on air" : "○ tap to play"}
      </span>
    </button>
  );
}

export function VisualTile() {
  const [armed, setArmed] = useState(false);

  const pads = [
    { col: 0, row: 0, lit: armed },
    { col: 1, row: 0, lit: false },
    { col: 2, row: 0, lit: armed },
    { col: 3, row: 0, lit: false },
    { col: 0, row: 1, lit: false },
    { col: 1, row: 1, lit: armed },
    { col: 2, row: 1, lit: false },
    { col: 3, row: 1, lit: false },
    { col: 0, row: 2, lit: armed },
    { col: 1, row: 2, lit: false },
    { col: 2, row: 2, lit: false },
    { col: 3, row: 2, lit: armed },
  ];

  return (
    <button
      type="button"
      onClick={() => setArmed((v) => !v)}
      aria-pressed={armed}
      aria-label={armed ? "Disarm the visual controller" : "Arm the visual controller"}
      className="relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 rounded-md inline-flex flex-col items-center gap-2 group"
    >
      <span
        aria-hidden
        className={`absolute left-1/2 -translate-x-1/2 top-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl blur-3xl transition-colors ${
          armed ? "bg-violet-400/40" : "bg-violet-500/15"
        }`}
      />
      <span
        aria-hidden
        className="relative block w-20 h-20 sm:w-24 sm:h-24 rounded-md border border-violet-400/45 transition-shadow duration-500 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,10,30,0.95) 0%, rgba(0,0,0,1) 55%, rgba(46,16,101,0.45) 100%)",
          boxShadow: armed
            ? "0 0 32px rgba(167,139,250,0.55), 0 0 70px rgba(139,92,246,0.25), inset 0 0 18px rgba(124,58,237,0.40)"
            : "0 0 18px rgba(139,92,246,0.30), 0 0 42px rgba(139,92,246,0.14), inset 0 0 14px rgba(139,92,246,0.18)",
        }}
      >
        <span
          aria-hidden
          className="absolute top-1.5 left-1.5 right-1.5 h-3 sm:h-3.5 rounded-sm bg-black/70 border border-violet-400/35 flex items-center px-1.5 gap-1"
          style={{ boxShadow: "inset 0 0 6px rgba(124,58,237,0.45)" }}
        >
          <span
            aria-hidden
            className={`block w-1 h-1 rounded-full ${armed ? "bg-emerald-300" : "bg-emerald-500/40"}`}
            style={{
              boxShadow: armed ? "0 0 5px rgba(110,231,183,0.95)" : "none",
            }}
          />
          <span
            className="text-violet-200/70 text-[6px] sm:text-[7px] tracking-[0.35em] uppercase font-mono"
            style={{ textShadow: "0 0 5px rgba(167,139,250,0.55)" }}
          >
            {armed ? "live" : "idle"}
          </span>
        </span>
        <span
          aria-hidden
          className="absolute top-6 sm:top-7 left-1.5 right-1.5 grid grid-cols-4 gap-1"
        >
          {pads.map((p, i) => (
            <span
              key={i}
              className={`block aspect-square rounded-[2px] border transition-colors ${
                p.lit
                  ? "bg-violet-400/80 border-violet-200/80"
                  : "bg-violet-950/60 border-violet-400/30"
              }`}
              style={{
                boxShadow: p.lit
                  ? "0 0 6px rgba(167,139,250,0.85), inset 0 0 4px rgba(221,214,254,0.55)"
                  : "inset 0 0 3px rgba(124,58,237,0.25)",
              }}
            />
          ))}
        </span>
        <span
          aria-hidden
          className="absolute bottom-1.5 left-1.5 right-1.5 flex flex-col gap-1"
        >
          <span className="block h-0.5 rounded-full bg-violet-950/70 relative">
            <span
              className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-violet-200"
              style={{
                left: armed ? "70%" : "30%",
                boxShadow: "0 0 5px rgba(221,214,254,0.85)",
                transition: "left 0.4s ease-out",
              }}
            />
          </span>
          <span className="block h-0.5 rounded-full bg-violet-950/70 relative">
            <span
              className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-violet-200"
              style={{
                left: armed ? "55%" : "20%",
                boxShadow: "0 0 5px rgba(221,214,254,0.85)",
                transition: "left 0.4s ease-out",
              }}
            />
          </span>
        </span>
      </span>
      <span
        className={`text-[8px] sm:text-[9px] tracking-[0.35em] uppercase whitespace-nowrap transition-colors ${
          armed ? "text-violet-200" : "text-violet-300/55"
        }`}
      >
        {armed ? "● armed" : "○ visual"}
      </span>
    </button>
  );
}

export function RadioTilesMobileTop() {
  return (
    <div className="sm:hidden flex items-center justify-center">
      <RadioTile label="SLOW READY" />
    </div>
  );
}

export function FigureWithTilesDesktop({
  rightSlot,
  leftSlot,
  leftTop,
  rightTop,
}: {
  rightSlot?: ReactNode;
  leftSlot?: ReactNode;
  leftTop?: ReactNode;
  rightTop?: ReactNode;
} = {}) {
  return (
    <div className="flex items-end justify-center gap-4 sm:gap-8">
      <div className="hidden sm:flex flex-col items-center gap-4">
        {leftTop}
        {leftSlot ?? <RadioTile label="SLOW" />}
      </div>
      <div className="relative h-[28vh]">
        <TetherClock />
        <Image
          src="/characterzer0-figure.png"
          alt="character zer0"
          width={1536}
          height={1024}
          priority
          sizes="(max-width: 640px) 50vw, 30vw"
          className="h-full w-auto"
        />
      </div>
      <div className="hidden sm:flex flex-col items-center gap-4">
        {rightTop}
        {rightSlot ?? <RadioTile label="READY" />}
      </div>
    </div>
  );
}
