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
      className="fixed inset-0 z-[1] flex items-center justify-center pointer-events-none"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/itsyoursphere-cover.png"
        alt=""
        aria-hidden
        draggable={false}
        className="absolute h-[85vh] w-[85vh] max-w-[85vw] max-h-[85vw] object-contain select-none"
        style={{
          mixBlendMode: "screen",
          opacity: 0.85,
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/figures/front.png"
        alt=""
        aria-hidden
        draggable={false}
        className="relative h-[32vh] w-auto select-none"
        style={{
          mixBlendMode: "screen",
          animation: "figure-mask-breath 24s ease-in-out infinite",
        }}
      />
    </div>
  );
}
