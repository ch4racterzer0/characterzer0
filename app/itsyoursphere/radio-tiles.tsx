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
import { createPortal } from "react-dom";
import { TetherClock } from "./tether-clock";
import { useVisualChannel } from "./visual-channel";

type Track = { name: string; url: string };

type RadioCtx = {
  playing: boolean;
  category: string | null;
  playCategory: (cat: string, prefetched?: Track[]) => Promise<void>;
  toggle: () => Promise<void>;
};

const RadioContext = createContext<RadioCtx | null>(null);

function useRadio(): RadioCtx {
  const ctx = useContext(RadioContext);
  if (!ctx) throw new Error("useRadio must be used inside RadioProvider");
  return ctx;
}

export function RadioProvider({ children }: { children: ReactNode }) {
  const [playing, setPlaying] = useState(false);
  const [category, setCategory] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const playlistRef = useRef<Track[]>([]);
  const indexRef = useRef(0);

  const loadPlaylist = useCallback(async (cat: string): Promise<Track[]> => {
    try {
      const res = await fetch(
        `/api/itsyoursphere-music/list?cat=${encodeURIComponent(cat)}`,
        { cache: "no-store" },
      );
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

  const playCategory = useCallback(
    async (cat: string, prefetched?: Track[]) => {
      const audio = audioRef.current;
      if (!audio) return;
      // If picker pre-fetched the playlist, use it -- keeps the user-gesture
      // chain tight on mobile (no await between tap and audio.play()).
      const tracks = prefetched ?? (await loadPlaylist(cat));
      if (tracks.length === 0) return;
      playlistRef.current = tracks;
      indexRef.current = 0;
      setCategory(cat);
      const ok = await playIndex(0);
      setPlaying(ok);
      if (ok) window.dispatchEvent(new Event("character-zero:radio-play"));
    },
    [loadPlaylist, playIndex],
  );

  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      window.dispatchEvent(new Event("character-zero:radio-stop"));
      return;
    }
    if (playlistRef.current.length === 0) return;
    const ok = await playIndex(indexRef.current);
    setPlaying(ok);
    if (ok) window.dispatchEvent(new Event("character-zero:radio-play"));
  }, [playing, playIndex]);

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
    <RadioContext.Provider value={{ playing, category, playCategory, toggle }}>
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

// Kid's record player body — warm cream plastic, vintage Fisher-Price vibe
const RADIO_BODY_STYLE = {
  background:
    "linear-gradient(180deg, rgba(248,235,200,0.97) 0%, rgba(232,212,170,0.97) 45%, rgba(208,184,140,0.98) 100%)",
  border: "1px solid rgba(140,98,52,0.65)",
  boxShadow:
    "inset 0 1.5px 0 rgba(255,250,230,0.65), inset 0 -1.5px 0 rgba(120,80,40,0.40), 0 6px 14px -6px rgba(0,0,0,0.55), 0 0 0 1px rgba(80,55,25,0.35)",
} as const;

// Small colored "screws" on the toy body
const RIVET_STYLE = {
  background:
    "radial-gradient(circle, rgba(195,55,40,0.95) 0%, rgba(120,30,20,0.95) 80%)",
} as const;

function RadioRivets() {
  return (
    <>
      <span aria-hidden className="absolute top-1 left-1 w-1 h-1 rounded-full" style={RIVET_STYLE} />
      <span aria-hidden className="absolute top-1 right-1 w-1 h-1 rounded-full" style={RIVET_STYLE} />
      <span aria-hidden className="absolute bottom-1 left-1 w-1 h-1 rounded-full" style={RIVET_STYLE} />
      <span aria-hidden className="absolute bottom-1 right-1 w-1 h-1 rounded-full" style={RIVET_STYLE} />
    </>
  );
}

function ChannelTile({
  label,
  sub,
  count,
  onClick,
}: {
  label: string;
  sub: string;
  count?: number;
  onClick: () => void;
}) {
  const empty = count === 0;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={empty}
      aria-disabled={empty || undefined}
      className={`relative inline-flex flex-col items-stretch w-full rounded-md transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/40 ${
        empty
          ? "opacity-50 cursor-not-allowed"
          : "hover:-translate-y-0.5 cursor-pointer"
      }`}
      style={RADIO_BODY_STYLE}
    >
      <RadioRivets />
      <span
        className="block px-2.5 pt-2 pb-0.5 font-mono uppercase text-[10px] tracking-[0.25em] font-semibold text-center"
        style={{
          color: "rgba(80,48,18,0.92)",
          textShadow: "0 1px 0 rgba(255,250,230,0.55)",
        }}
      >
        {label}
      </span>
      <span
        className="block px-2 pb-0.5 font-mono uppercase text-[7px] tracking-[0.2em] text-center"
        style={{
          color: "rgba(120,80,40,0.78)",
          textShadow: "0 1px 0 rgba(255,250,230,0.45)",
        }}
      >
        {sub}
      </span>
      <span
        className="block px-2 pb-2 pt-0.5 font-mono uppercase text-[7px] tracking-[0.25em] text-center"
        style={{
          color: empty
            ? "rgba(140,100,55,0.55)"
            : "rgba(180,55,40,0.95)",
          textShadow: "0 1px 0 rgba(255,250,230,0.40)",
        }}
      >
        {count === undefined
          ? "· · ·"
          : empty
            ? "no tracks yet"
            : `${count} track${count === 1 ? "" : "s"}`}
      </span>
    </button>
  );
}

export function SchoolStereoTile() {
  const { playing, category, playCategory, toggle } = useRadio();
  const [orbPlaying, setOrbPlaying] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [playlist, setPlaylist] = useState<Track[] | undefined>(undefined);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setMounted(true), []);

  // Track whether we're rendering on a small viewport so we can portal the
  // picker outside the figure container's scale-0.7 wrapper on mobile.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // When the picker opens, fetch the still-with-us playlist so (1) the tile
  // can show "N tracks" / "no tracks yet" and (2) tap-to-play hands the
  // cached list straight to playCategory -- audio.play() fires in the same
  // tick as the tap, so mobile browsers don't reject it as non-gesture.
  useEffect(() => {
    if (!pickerOpen) return;
    let cancelled = false;
    fetch("/api/itsyoursphere-music/list?cat=still", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { tracks: [] }))
      .then((d: { tracks?: Track[] }) => {
        if (!cancelled) setPlaylist(d.tracks ?? []);
      })
      .catch(() => {
        if (!cancelled) setPlaylist([]);
      });
    return () => {
      cancelled = true;
    };
  }, [pickerOpen]);

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

  useEffect(() => {
    if (!pickerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPickerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    // The window mousedown click-away listener only applies on desktop, where
    // the picker is rendered inline inside the stereo wrapper. On mobile the
    // picker is portal'd outside wrapperRef, so a click-away listener would
    // close it on every channel tap (button is outside the ref). The mobile
    // bottom-sheet has its own backdrop button to close.
    if (!isMobile) {
      const onClickAway = (e: MouseEvent) => {
        if (
          wrapperRef.current &&
          e.target instanceof Node &&
          !wrapperRef.current.contains(e.target)
        ) {
          setPickerOpen(false);
        }
      };
      window.addEventListener("mousedown", onClickAway);
      return () => {
        window.removeEventListener("keydown", onKey);
        window.removeEventListener("mousedown", onClickAway);
      };
    }
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [pickerOpen, isMobile]);

  const dead = orbPlaying && !playing;

  function onRadioClick() {
    if (dead) return;
    setPickerOpen((p) => !p);
  }

  function stop() {
    setPickerOpen(false);
    void toggle();
  }

  function play() {
    setPickerOpen(false);
    void playCategory("still", playlist);
  }

  const statusLabel = playing
    ? category
      ? `on · ${category.slice(0, 5)}`
      : "on net"
    : "stby";

  const trackCount = playlist?.length;

  const pickerContent = (
    <>
      <ChannelTile
        label="still with us"
        sub="the soundtrack"
        count={trackCount}
        onClick={play}
      />
      {playing && (
        <ChannelTile label="stop" sub="off the air" onClick={stop} />
      )}
    </>
  );

  return (
    <div ref={wrapperRef} className="relative inline-flex flex-col items-stretch w-[6.5rem] sm:w-28">
      {/* desktop picker — inline, anchored above the stereo at the stereo's own width */}
      {pickerOpen && !isMobile && (
        <div className="absolute bottom-full left-0 right-0 mb-2 flex flex-col gap-1.5 z-30 max-h-[80vh] overflow-y-auto">
          {pickerContent}
        </div>
      )}

      {/* mobile picker — portal'd to body so it escapes the figure container's
          scale-0.7 wrapper, centered on the viewport (NOT bottom-anchored;
          iOS Safari's vh + chrome would otherwise clip the bottom edge and
          hide the close button). dvh-based max-height adjusts to chrome state. */}
      {pickerOpen &&
        isMobile &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              tabIndex={-1}
              aria-label="close channel selector"
              className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-default"
              onClick={() => setPickerOpen(false)}
            />
            <div
              className="relative w-full max-w-xs flex flex-col gap-2 overflow-y-auto"
              style={{ maxHeight: "min(85dvh, 32rem)" }}
            >
              {pickerContent}
              <button
                type="button"
                onClick={() => setPickerOpen(false)}
                className="font-mono text-[12px] tracking-[0.3em] uppercase py-4 rounded-md"
                style={{
                  color: "rgba(220,220,225,0.85)",
                  background: "rgba(28,26,24,0.92)",
                  border: "1px solid rgba(180,180,185,0.20)",
                  textShadow: "0 1px 0 rgba(0,0,0,0.85)",
                }}
              >
                close
              </button>
            </div>
          </div>,
          document.body,
        )}

      <button
        type="button"
        onClick={onRadioClick}
        disabled={dead}
        aria-pressed={playing}
        aria-expanded={pickerOpen}
        aria-disabled={dead || undefined}
        aria-label={
          dead
            ? "Radio unavailable while a podcast is playing"
            : "Open channel selector"
        }
        className={`relative inline-flex flex-col items-stretch select-none rounded-md transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/40 ${
          dead
            ? "opacity-25 cursor-not-allowed"
            : playing
              ? "opacity-100 cursor-pointer"
              : "opacity-85 hover:opacity-100 cursor-pointer"
        }`}
        style={RADIO_BODY_STYLE}
      >
        <RadioRivets />

        {/* top status row: power lamp + label */}
        <div className="relative flex items-center justify-between px-2.5 pt-2">
          <span
            aria-hidden
            className="relative w-2 h-2 rounded-full"
            style={{
              background: dead
                ? "rgba(120,90,55,0.6)"
                : playing
                  ? "radial-gradient(circle, rgba(255,210,120,1) 0%, rgba(220,80,40,0.95) 60%, rgba(140,40,20,0.95) 100%)"
                  : "radial-gradient(circle, rgba(180,140,80,0.85) 0%, rgba(120,80,40,0.9) 70%, rgba(80,55,25,0.95) 100%)",
              boxShadow: playing
                ? "0 0 6px rgba(255,140,40,0.85), 0 0 14px rgba(220,80,30,0.55)"
                : "inset 0 1px 1px rgba(0,0,0,0.35)",
            }}
          />
          <span
            className="font-mono text-[8px] tracking-[0.3em] uppercase font-semibold"
            style={{
              color: "rgba(95,55,18,0.85)",
              textShadow: "0 1px 0 rgba(255,250,230,0.50)",
            }}
          >
            {statusLabel}
          </span>
        </div>

        {/* turntable — vinyl + tone arm + spindle (the kid's-record-player centerpiece) */}
        <div className="relative mx-3 mt-1.5 mb-1">
          <div
            aria-hidden
            className="relative aspect-square rounded-full overflow-hidden"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(35,25,18,0.98) 0%, rgba(18,12,8,0.98) 70%, rgba(8,6,4,0.98) 100%)",
              boxShadow:
                "inset 0 1px 3px rgba(0,0,0,0.65), inset 0 0 0 1px rgba(120,80,40,0.45), 0 1px 2px rgba(0,0,0,0.45)",
            }}
          >
            {/* concentric grooves on the vinyl */}
            <span
              aria-hidden
              className="absolute inset-[6%] rounded-full"
              style={{
                background:
                  "repeating-radial-gradient(circle at 50% 50%, rgba(0,0,0,0.8) 0px, rgba(0,0,0,0.8) 1px, rgba(60,42,28,0.55) 2px, rgba(60,42,28,0.55) 3px)",
                opacity: 0.55,
              }}
            />
            {/* red center label */}
            <span
              aria-hidden
              className="absolute inset-[35%] rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 50% 35%, rgba(220,75,55,0.98) 0%, rgba(170,40,28,0.98) 70%, rgba(120,25,18,0.98) 100%)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,180,150,0.45), 0 0 0 0.5px rgba(0,0,0,0.5)",
              }}
            />
            {/* gold spindle in the center */}
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: "8%",
                height: "8%",
                background:
                  "radial-gradient(circle, rgba(255,225,150,1) 0%, rgba(200,160,90,1) 60%, rgba(140,100,50,1) 100%)",
                boxShadow: "0 0 1px rgba(0,0,0,0.55)",
              }}
            />
          </div>
          {/* chrome tone arm — pivot from upper-right corner, angled across the vinyl */}
          <span
            aria-hidden
            className="absolute"
            style={{
              top: "-8%",
              right: "-6%",
              width: "62%",
              height: "12%",
              background:
                "linear-gradient(180deg, rgba(235,235,240,0.95) 0%, rgba(190,190,200,0.95) 50%, rgba(140,140,150,0.95) 100%)",
              transformOrigin: "100% 50%",
              transform: "rotate(38deg)",
              borderRadius: "2px 1px 1px 2px",
              boxShadow:
                "0 1px 2px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.50)",
            }}
          />
          {/* tone arm pivot dot at the top-right corner */}
          <span
            aria-hidden
            className="absolute rounded-full"
            style={{
              top: "-12%",
              right: "-10%",
              width: "14%",
              height: "14%",
              background:
                "radial-gradient(circle, rgba(220,220,225,1) 0%, rgba(120,120,130,1) 80%)",
              boxShadow:
                "0 1px 2px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.55)",
            }}
          />
        </div>

        {/* PLAY label + small "stereo" mark */}
        <div className="relative flex items-end justify-between px-2.5 pb-2 pt-1">
          <span
            className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold"
            style={{
              color: "rgba(180,55,40,0.95)",
              textShadow: "0 1px 0 rgba(255,250,230,0.55)",
            }}
          >
            play
          </span>
          <span
            className="font-mono text-[7px] tracking-[0.25em] uppercase"
            style={{
              color: "rgba(120,80,40,0.65)",
              textShadow: "0 1px 0 rgba(255,250,230,0.45)",
            }}
          >
            stereo
          </span>
        </div>
      </button>
    </div>
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
      className="group rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400/60 relative"
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
      className="rounded-lg relative"
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
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto_1fr] items-end gap-2 sm:gap-3 w-full">
      <div className="hidden sm:flex flex-col items-end gap-3 justify-self-end">
        {leftTop}
        {leftSlot ?? <RadioTile label="SLOW" />}
      </div>
      <div className="flex flex-col items-center gap-4">
        {centerTop}
        <div className="relative h-[28vh] aspect-[3/2]">
          <TetherClock />
          <RadioStopTile />
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
      <div className="hidden sm:flex flex-col items-center justify-end gap-2 pb-2">
        <FSTile />
        <LZTile />
      </div>
      <div className="hidden sm:flex flex-col items-start gap-3 justify-self-start">
        {rightTop}
        {rightSlot ?? <RadioTile label="READY" />}
      </div>
    </div>
  );
}
