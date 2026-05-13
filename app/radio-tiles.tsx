"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { TetherClock } from "./tether-clock";
import { useVisualChannel } from "./visual-channel";

type Track = { name: string; url: string };

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
  const playlistRef = useRef<Track[]>([]);
  const indexRef = useRef(0);

  const loadPlaylist = useCallback(async (): Promise<Track[]> => {
    try {
      const res = await fetch("/api/music/list", { cache: "no-store" });
      if (!res.ok) return [];
      const data = (await res.json()) as { tracks?: Track[] };
      return data.tracks ?? [];
    } catch {
      return [];
    }
  }, []);

  const playIndex = useCallback(async (i: number) => {
    const audio = audioRef.current;
    const list = playlistRef.current;
    if (!audio || list.length === 0) return false;
    indexRef.current = ((i % list.length) + list.length) % list.length;
    audio.src = list[indexRef.current].url;
    try {
      await audio.play();
      return true;
    } catch {
      return false;
    }
  }, []);

  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      window.dispatchEvent(new Event("character-zero:radio-stop"));
      return;
    }
    if (playlistRef.current.length === 0) {
      playlistRef.current = await loadPlaylist();
    }
    if (playlistRef.current.length === 0) {
      setPlaying(false);
      return;
    }
    const ok = await playIndex(indexRef.current);
    setPlaying(ok);
    if (ok) window.dispatchEvent(new Event("character-zero:radio-play"));
  }, [playing, loadPlaylist, playIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnded = () => {
      void playIndex(indexRef.current + 1);
    };
    const onError = () => {
      void playIndex(indexRef.current + 1);
    };
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);
    return () => {
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, [playIndex]);

  useEffect(() => {
    const onStopRadio = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (audio.paused) return;
      const startVol = audio.volume;
      const durationMs = 900;
      const steps = 18;
      let i = 0;
      const id = window.setInterval(() => {
        i++;
        const next = startVol * (1 - i / steps);
        audio.volume = next < 0 ? 0 : next;
        if (i >= steps) {
          window.clearInterval(id);
          audio.pause();
          audio.volume = startVol;
          setPlaying(false);
          window.dispatchEvent(new Event("character-zero:radio-stop"));
        }
      }, durationMs / steps);
    };
    window.addEventListener("character-zero:stop-radio", onStopRadio);
    return () =>
      window.removeEventListener("character-zero:stop-radio", onStopRadio);
  }, []);

  return (
    <RadioContext.Provider value={{ playing, toggle }}>
      {children}
      <audio ref={audioRef} preload="none" />
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
  const [orbPlaying, setOrbPlaying] = useState(false);

  useEffect(() => {
    const onPlay = () => setOrbPlaying(true);
    const onStop = () => setOrbPlaying(false);
    window.addEventListener("character-zero:orb-play", onPlay);
    window.addEventListener("character-zero:orb-pause", onStop);
    window.addEventListener("character-zero:orb-ended", onStop);
    return () => {
      window.removeEventListener("character-zero:orb-play", onPlay);
      window.removeEventListener("character-zero:orb-pause", onStop);
      window.removeEventListener("character-zero:orb-ended", onStop);
    };
  }, []);

  const dead = orbPlaying && !playing;

  return (
    <button
      type="button"
      onClick={dead ? undefined : toggle}
      disabled={dead}
      aria-pressed={playing}
      aria-disabled={dead || undefined}
      aria-label={
        dead ? "Audio unavailable while a podcast is playing" : playing ? "Stop audio" : "Play audio"
      }
      className={`relative inline-flex flex-col items-center gap-2 rounded-full transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 ${
        dead
          ? "opacity-30 cursor-not-allowed"
          : playing
            ? "opacity-100 cursor-pointer"
            : "opacity-80 hover:opacity-100 cursor-pointer"
      }`}
    >
      <span
        aria-hidden
        className={`absolute left-1/2 -translate-x-1/2 top-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full blur-3xl ${
          playing ? "bg-blue-400/35" : "bg-blue-500/10"
        }`}
      />
      <span
        aria-hidden
        className={`relative block w-20 h-20 sm:w-24 sm:h-24 rounded-full border ${
          playing ? "border-blue-300/70" : "border-blue-400/30"
        }`}
        style={{
          background:
            "radial-gradient(circle at center, rgba(15,23,42,0.95) 0%, rgba(0,0,0,1) 55%, rgba(30,58,138,0.30) 100%), repeating-radial-gradient(circle at center, rgba(96,165,250,0.08) 0px, rgba(96,165,250,0.08) 1px, transparent 1px, transparent 4px)",
          backgroundBlendMode: "screen",
          boxShadow: playing
            ? "0 0 28px rgba(96,165,250,0.55), inset 0 0 16px rgba(96,165,250,0.25)"
            : "0 0 14px rgba(59,130,246,0.20), inset 0 0 12px rgba(59,130,246,0.12)",
        }}
      >
        <span
          aria-hidden
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full border ${
            playing ? "border-blue-200/70" : "border-blue-300/35"
          } bg-blue-950/85 flex items-center justify-center`}
          style={{
            boxShadow: "inset 0 0 10px rgba(59,130,246,0.20)",
          }}
        >
          <span
            className={`text-[8px] sm:text-[9px] tracking-[0.35em] uppercase font-light ${
              playing ? "text-blue-100" : "text-blue-100/65"
            }`}
            style={{ textShadow: "0 0 6px rgba(96,165,250,0.35)" }}
          >
            audio
          </span>
        </span>
        <span
          aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-200/45"
        />
      </span>
      <span
        className={`text-[8px] sm:text-[9px] tracking-[0.35em] uppercase whitespace-nowrap ${
          playing ? "text-blue-200" : "text-blue-300/55"
        }`}
      >
        {playing ? "● on air" : "○ tap to play"}
      </span>
    </button>
  );
}

export function VisualTile({ children }: { children?: ReactNode }) {
  const [armed, setArmed] = useState(false);
  const { setChannel } = useVisualChannel();

  function handleToggle() {
    setArmed((v) => {
      const next = !v;
      if (!next) setChannel(null);
      return next;
    });
  }

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
    <div className="relative flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={handleToggle}
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
      {armed && children ? (
        <div className="absolute left-full top-0 ml-3 flex flex-col items-start gap-2 z-20">
          {children}
        </div>
      ) : null}
    </div>
  );
}

export function RadioTilesMobileTop() {
  return (
    <div className="sm:hidden flex items-center justify-center">
      <RadioTile label="SLOW READY" />
    </div>
  );
}

function LZTile() {
  return (
    <a
      href="/"
      aria-label="LZ — landing zone, back to main"
      className="group absolute right-[-3rem] sm:right-[-3.5rem] top-[calc(50%+1.75rem)] -translate-y-1/2 z-[19] rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400/60"
    >
      <span
        aria-hidden
        className="absolute -inset-3 rounded-full blur-2xl bg-lime-500/20"
      />
      <span
        className="relative flex flex-row items-center gap-1.5 rounded-lg border border-lime-400/55 bg-stone-900/85 backdrop-blur-sm px-2.5 py-1.5 group-hover:bg-stone-800/85 transition-colors"
        style={{
          boxShadow:
            "0 0 18px rgba(132,204,22,0.35), 0 0 40px rgba(101,163,13,0.20), inset 0 1px 0 rgba(217,249,157,0.35)",
        }}
      >
        <svg
          aria-hidden
          viewBox="0 0 24 16"
          width="18"
          height="12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          className="text-lime-200"
        >
          <line x1="1" y1="4" x2="17" y2="4" />
          <line x1="9" y1="4" x2="9" y2="7" />
          <ellipse cx="9" cy="9" rx="5" ry="2" fill="currentColor" stroke="none" />
          <rect x="13" y="8" width="7" height="1.4" fill="currentColor" stroke="none" />
          <line x1="20" y1="6.5" x2="20" y2="11" />
          <line x1="5" y1="13" x2="13" y2="13" />
        </svg>
        <span
          className="text-lime-100 text-xs sm:text-sm font-semibold tracking-[0.25em]"
          style={{
            textShadow:
              "0 0 6px rgba(217,249,157,0.75), 0 0 14px rgba(132,204,22,0.40)",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        >
          LZ
        </span>
      </span>
    </a>
  );
}

function FSTile() {
  return (
    <div
      aria-label="FS"
      className="absolute right-[-1.5rem] sm:right-[-2rem] top-1/2 -translate-y-1/2 z-20 rounded-lg"
    >
      <span
        aria-hidden
        className="absolute -inset-3 rounded-full blur-2xl bg-red-500/25"
      />
      <span
        className="relative flex flex-col items-center gap-1 rounded-lg border border-red-300/65 bg-blue-950/65 backdrop-blur-sm px-3 py-2"
        style={{
          boxShadow:
            "0 0 22px rgba(239,68,68,0.45), 0 0 50px rgba(37,99,235,0.30), inset 0 1px 0 rgba(255,255,255,0.45)",
          backgroundImage:
            "linear-gradient(to bottom, rgba(220,38,38,0.35) 0%, rgba(220,38,38,0.35) 33%, rgba(255,255,255,0.18) 33%, rgba(255,255,255,0.18) 66%, rgba(37,99,235,0.45) 66%, rgba(37,99,235,0.45) 100%)",
        }}
      >
        <span
          className="text-white text-sm sm:text-base font-semibold tracking-[0.25em]"
          style={{
            textShadow:
              "0 0 8px rgba(255,255,255,0.85), 0 0 18px rgba(255,255,255,0.45)",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        >
          FS
        </span>
      </span>
    </div>
  );
}

function RadioStopTile() {
  const { playing, toggle } = useRadio();
  if (!playing) return null;
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Stop radio"
      className="absolute left-[-3.5rem] sm:left-[-4rem] top-1/2 -translate-y-1/2 z-20 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 rounded-lg"
    >
      <span
        aria-hidden
        className="absolute -inset-3 rounded-full blur-2xl bg-blue-400/35"
      />
      <span
        className="relative flex flex-col items-center gap-1 rounded-lg border border-blue-300/55 hover:border-blue-200/85 bg-blue-950/55 hover:bg-blue-900/70 backdrop-blur-sm px-2.5 py-2 transition-colors"
        style={{
          boxShadow:
            "0 0 22px rgba(96,165,250,0.55), 0 0 50px rgba(59,130,246,0.25), inset 0 1px 0 rgba(191,219,254,0.40)",
        }}
      >
        <span
          aria-hidden
          className="block w-3 h-3 bg-blue-100 rounded-[1px]"
          style={{ boxShadow: "0 0 6px rgba(191,219,254,0.85)" }}
        />
        <span className="text-blue-100/85 text-[7px] tracking-[0.35em] uppercase font-light">
          stop
        </span>
      </span>
    </button>
  );
}

function useFigureTint() {
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

  if (!playing) return "default";
  if (source === "mckinley") return "mckinley";
  if (source === "tethered") return "tethered";
  return "default";
}

export function FigureWithTilesDesktop({
  rightSlot,
  leftSlot,
  leftTop,
  rightTop,
  centerTop,
}: {
  rightSlot?: ReactNode;
  leftSlot?: ReactNode;
  leftTop?: ReactNode;
  rightTop?: ReactNode;
  centerTop?: ReactNode;
} = {}) {
  const tint = useFigureTint();
  const filter =
    tint === "mckinley"
      ? "sepia(1) saturate(6) hue-rotate(55deg) brightness(1.05)"
      : tint === "tethered"
        ? "sepia(1) saturate(5) hue-rotate(245deg) brightness(1.05)"
        : "none";
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-end gap-2 sm:gap-3 w-full">
      <div className="hidden sm:flex flex-col items-end gap-3 justify-self-end">
        {leftTop}
        {leftSlot ?? <RadioTile label="SLOW" />}
      </div>
      <div className="flex flex-col items-center gap-4">
        {centerTop}
        <div className="relative h-[28vh] aspect-[3/2]">
          <TetherClock />
          <RadioStopTile />
          <LZTile />
          <FSTile />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/figures/back.png"
            alt=""
            aria-hidden
            draggable={false}
            className="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none select-none"
            style={{
              mixBlendMode: "screen",
              filter,
              transition: "filter 800ms ease-out",
            }}
          />
        </div>
      </div>
      <div className="hidden sm:flex flex-col items-start gap-3 justify-self-start">
        {rightTop}
        {rightSlot ?? <RadioTile label="READY" />}
      </div>
    </div>
  );
}
