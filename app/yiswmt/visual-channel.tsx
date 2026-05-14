"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

export type Channel = "grateful-dead" | null;

type Ctx = {
  channel: Channel;
  setChannel: (c: Channel) => void;
};

const VisualChannelContext = createContext<Ctx | null>(null);

export function VisualChannelProvider({ children }: { children: ReactNode }) {
  const [channel, setChannel] = useState<Channel>(null);
  return (
    <VisualChannelContext.Provider value={{ channel, setChannel }}>
      {children}
    </VisualChannelContext.Provider>
  );
}

export function useVisualChannel(): Ctx {
  const ctx = useContext(VisualChannelContext);
  if (!ctx) throw new Error("useVisualChannel must be inside VisualChannelProvider");
  return ctx;
}

const BACKGROUNDS: Record<Exclude<Channel, null>, string> = {
  "grateful-dead": "/grateful-dead/syf-bg.png",
};

export function ChannelBackground() {
  const { channel } = useVisualChannel();
  const url = channel ? BACKGROUNDS[channel] : null;
  return (
    <div
      aria-hidden
      className="fixed inset-0 z-0 bg-black pointer-events-none"
    >
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-in-out"
        style={{
          backgroundImage: url ? `url('${url}')` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: channel ? 0.10 : 0,
        }}
      />
    </div>
  );
}

const RAIN_CHARS = ["党", "档", "案", "监", "视", "中", "央"];

export function CenterFigure() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[1] flex items-start justify-center pt-[26vh] pointer-events-none"
    >
      <div className="relative h-[26vh] aspect-[3/2] pointer-events-none">
        <div
          aria-hidden
          className="absolute inset-0 -m-[6vh] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 45%, rgba(59,130,246,0.32) 0%, rgba(96,165,250,0.18) 30%, rgba(30,64,175,0.10) 55%, transparent 75%)",
            filter: "blur(14px)",
            animation: "storm-glow-breath 24s ease-in-out infinite",
          }}
        />
        {RAIN_CHARS.map((ch, i) => (
          <span
            key={i}
            aria-hidden
            className="absolute font-mono text-[10px] sm:text-xs whitespace-nowrap pointer-events-none"
            style={{
              top: 0,
              left: `${18 + i * 9.5}%`,
              color: "rgba(248,113,113,0.55)",
              textShadow:
                "0 0 6px rgba(248,113,113,0.55), 0 0 14px rgba(220,38,38,0.35)",
              opacity: 0,
              animation: `storm-rain ${52 + i * 3}s linear ${i * 0.8}s infinite`,
            }}
          >
            {ch}
          </span>
        ))}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/figures/front.png"
          alt=""
          aria-hidden
          draggable={false}
          className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
          style={{
            mixBlendMode: "screen",
            animation:
              "figure-mask-breath 24s ease-in-out infinite, figure-hue-cycle 90s linear infinite",
          }}
        />
        <p
          className="absolute left-1/2 top-[24%] -translate-x-1/2 -translate-y-1/2 font-mono text-base sm:text-lg tracking-[0.15em] whitespace-nowrap pointer-events-none"
          style={{
            animation:
              "mark-flicker 30s ease-in-out infinite, face-mark-zero-vis 60s ease-in-out infinite",
          }}
        >
          零号
        </p>
        <p
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-xs sm:text-sm tracking-[0.4em] whitespace-nowrap pointer-events-none"
          style={{
            animation: "chest-flicker 45s ease-in-out infinite",
          }}
        >
          丫工5山Μ丁
        </p>
      </div>
    </div>
  );
}
