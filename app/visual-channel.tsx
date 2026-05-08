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

export function CenterFigure() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[1] flex items-start justify-center pt-[23vh] pointer-events-none"
    >
      <div className="relative h-[32vh] aspect-[3/2]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/figures/front.png"
          alt=""
          aria-hidden
          draggable={false}
          className="absolute inset-0 w-full h-full object-contain select-none"
          style={{
            mixBlendMode: "screen",
            transformOrigin: "50% 70%",
            animation:
              "figure-mask-breath 24s ease-in-out infinite, figure-hue-cycle 90s linear infinite, figure-turn-toward 9s ease-in-out 2s forwards",
          }}
        />
        <p
          className="absolute left-1/2 top-[24%] -translate-x-1/2 -translate-y-1/2 font-mono text-base sm:text-lg tracking-[0.15em] whitespace-nowrap"
          style={{
            animation:
              "mark-flicker 30s ease-in-out infinite, face-mark-zero-vis 60s ease-in-out infinite",
          }}
        >
          零号
        </p>
        <p
          className="absolute left-1/2 top-[14%] -translate-x-1/2 -translate-y-1/2 font-mono text-base sm:text-lg tracking-[0.3em] whitespace-nowrap"
          style={{
            animation: "face-mark-storm 60s ease-in-out infinite",
          }}
        >
          风暴
        </p>
        <p
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-xs sm:text-sm tracking-[0.4em] whitespace-nowrap"
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
