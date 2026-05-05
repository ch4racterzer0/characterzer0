"use client";

import Image from "next/image";
import {
  ReactNode,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";

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

export function RadioTilesMobileTop() {
  return (
    <div className="sm:hidden flex items-center justify-center">
      <RadioTile label="SLOW READY" />
    </div>
  );
}

export function FigureWithTilesDesktop({
  rightSlot,
}: {
  rightSlot?: ReactNode;
} = {}) {
  return (
    <div className="flex items-end justify-center gap-4 sm:gap-8">
      <div className="hidden sm:block">
        <RadioTile label="SLOW" />
      </div>
      <Image
        src="/characterzer0-figure.png"
        alt="character zer0"
        width={1536}
        height={1024}
        priority
        sizes="(max-width: 640px) 50vw, 30vw"
        className="h-[28vh] w-auto"
      />
      <div className="hidden sm:block">
        {rightSlot ?? <RadioTile label="READY" />}
      </div>
    </div>
  );
}
