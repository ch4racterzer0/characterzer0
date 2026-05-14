"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
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

const ORB_FLAGS = [
  "/flags/flag-marines.png",
  "/flags/flag-army.png",
  "/flags/flag-navy.png",
  "/flags/flag-airforce.png",
  "/flags/flag-spaceforce.png",
  "/flags/flag-coastguard.png",
];

const FLAG_HOLD_MS = 4500;
const FLAG_FADE_MS = 1500;

export function CenterFigure() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIdx((i) => (i + 1) % ORB_FLAGS.length);
    }, FLAG_HOLD_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      aria-hidden
      className="cz-orb-center fixed inset-0 z-[1] flex items-start justify-center pt-[26vh] pointer-events-none"
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
        {ORB_FLAGS.map((src, i) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden
            draggable={false}
            className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
            style={{
              opacity: idx === i ? 1 : 0,
              transition: `opacity ${FLAG_FADE_MS}ms ease-in-out`,
              mixBlendMode: "screen",
            }}
          />
        ))}
      </div>
    </div>
  );
}
