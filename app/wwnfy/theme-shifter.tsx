"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";

type Theme = "blue" | "green" | "purple";
const ROTATION: Record<Theme, number> = {
  blue: 0,
  green: -90,
  purple: 60,
};
const NEXT: Record<Theme, Theme> = {
  blue: "green",
  green: "purple",
  purple: "blue",
};

const ThemeContext = createContext<{
  theme: Theme;
  cycle: () => void;
} | null>(null);

export function ThemeShifter({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("blue");
  const cycle = () => setTheme((t) => NEXT[t]);
  return (
    <ThemeContext.Provider value={{ theme, cycle }}>
      <div
        style={{
          filter: `hue-rotate(${ROTATION[theme]}deg)`,
          transition: "filter 600ms ease",
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function ThemeSwitch() {
  const ctx = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!ctx || !mounted) return null;

  const dot =
    ctx.theme === "blue"
      ? "bg-blue-400"
      : ctx.theme === "green"
        ? "bg-emerald-400"
        : "bg-purple-400";

  return createPortal(
    <button
      type="button"
      onClick={ctx.cycle}
      aria-label={`Color theme: ${ctx.theme}. Click to cycle.`}
      className="fixed top-4 right-4 z-[60] flex items-center gap-2 rounded-full border border-white/20 bg-black/60 backdrop-blur-sm px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-white/70 hover:text-white hover:border-white/40 transition-colors"
    >
      <span className={`block w-2.5 h-2.5 rounded-full ${dot}`} />
      <span>{ctx.theme}</span>
    </button>,
    document.body
  );
}
