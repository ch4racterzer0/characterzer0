"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";

type Bg = "void" | "shire" | "mordor";
const NEXT: Record<Bg, Bg> = {
  void: "shire",
  shire: "mordor",
  mordor: "void",
};

const BgContext = createContext<{ bg: Bg; cycle: () => void } | null>(null);

export function BackgroundShifter({ children }: { children: ReactNode }) {
  const [bg, setBg] = useState<Bg>("void");
  const cycle = () => setBg((b) => NEXT[b]);

  return (
    <BgContext.Provider value={{ bg, cycle }}>
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none bg-black"
        style={{ zIndex: 0 }}
      />
      {bg === "shire" && (
        <div
          aria-hidden
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: 0,
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.45) 100%), url('/wallpapers/shire.webp') center/cover no-repeat",
          }}
        />
      )}
      {bg === "mordor" && (
        <div
          aria-hidden
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: 0,
            background:
              "radial-gradient(circle at center, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 28%, rgba(0,0,0,0.92) 50%, rgba(0,0,0,0.75) 78%, rgba(0,0,0,0.55) 100%), url('/wallpapers/mordor.webp') center/cover no-repeat",
          }}
        />
      )}
      <div className="relative" style={{ zIndex: 1 }}>
        {children}
      </div>
    </BgContext.Provider>
  );
}

export function BackgroundSwitch() {
  const ctx = useContext(BgContext);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!ctx || !mounted) return null;

  const dot =
    ctx.bg === "void"
      ? "bg-white/30"
      : ctx.bg === "shire"
        ? "bg-emerald-400"
        : "bg-orange-500";

  return createPortal(
    <button
      type="button"
      onClick={ctx.cycle}
      aria-label={`Background: ${ctx.bg}. Click to cycle.`}
      className="fixed top-14 right-4 z-[60] flex items-center gap-2 rounded-full border border-white/20 bg-black/60 backdrop-blur-sm px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-white/70 hover:text-white hover:border-white/40 transition-colors"
    >
      <span className={`block w-2.5 h-2.5 rounded-full ${dot}`} />
      <span>{ctx.bg}</span>
    </button>,
    document.body
  );
}
