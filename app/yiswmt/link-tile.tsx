"use client";

import { useEffect, useState } from "react";

type Tint = "blue" | "red" | "purple" | "green";

const TINTS: Record<
  Tint,
  {
    halo: string;
    border: string;
    bg: string;
    text: string;
    subline: string;
    shadow: (large: boolean) => string;
  }
> = {
  blue: {
    halo: "bg-blue-500/15",
    border: "border-blue-400/40",
    bg: "bg-blue-950/40",
    text: "text-blue-100",
    subline: "text-blue-300/40",
    shadow: (large) =>
      large
        ? "0 0 45px rgba(59, 130, 246, 0.50), 0 0 90px rgba(59, 130, 246, 0.25), 0 18px 38px -10px rgba(59, 130, 246, 0.45), inset 0 1px 0 rgba(147, 197, 253, 0.40)"
        : "0 0 30px rgba(59, 130, 246, 0.40), 0 0 60px rgba(59, 130, 246, 0.18), 0 12px 28px -10px rgba(59, 130, 246, 0.40), inset 0 1px 0 rgba(147, 197, 253, 0.35)",
  },
  red: {
    halo: "bg-red-500/15",
    border: "border-red-400/40",
    bg: "bg-red-950/40",
    text: "text-red-100",
    subline: "text-red-300/40",
    shadow: (large) =>
      large
        ? "0 0 45px rgba(248, 113, 113, 0.50), 0 0 90px rgba(220, 38, 38, 0.25), 0 18px 38px -10px rgba(220, 38, 38, 0.45), inset 0 1px 0 rgba(254, 202, 202, 0.40)"
        : "0 0 30px rgba(248, 113, 113, 0.40), 0 0 60px rgba(220, 38, 38, 0.18), 0 12px 28px -10px rgba(220, 38, 38, 0.40), inset 0 1px 0 rgba(254, 202, 202, 0.35)",
  },
  purple: {
    halo: "bg-purple-500/15",
    border: "border-purple-400/40",
    bg: "bg-purple-950/40",
    text: "text-purple-100",
    subline: "text-purple-300/40",
    shadow: (large) =>
      large
        ? "0 0 45px rgba(192, 132, 252, 0.50), 0 0 90px rgba(147, 51, 234, 0.25), 0 18px 38px -10px rgba(147, 51, 234, 0.45), inset 0 1px 0 rgba(233, 213, 255, 0.40)"
        : "0 0 30px rgba(192, 132, 252, 0.40), 0 0 60px rgba(147, 51, 234, 0.18), 0 12px 28px -10px rgba(147, 51, 234, 0.40), inset 0 1px 0 rgba(233, 213, 255, 0.35)",
  },
  green: {
    halo: "bg-green-500/15",
    border: "border-green-400/40",
    bg: "bg-green-950/40",
    text: "text-green-100",
    subline: "text-green-300/40",
    shadow: (large) =>
      large
        ? "0 0 45px rgba(74, 222, 128, 0.50), 0 0 90px rgba(22, 163, 74, 0.25), 0 18px 38px -10px rgba(22, 163, 74, 0.45), inset 0 1px 0 rgba(187, 247, 208, 0.40)"
        : "0 0 30px rgba(74, 222, 128, 0.40), 0 0 60px rgba(22, 163, 74, 0.18), 0 12px 28px -10px rgba(22, 163, 74, 0.40), inset 0 1px 0 rgba(187, 247, 208, 0.35)",
  },
};

export function LinkTile({
  label,
  href,
  large = false,
  password,
  subline,
  tint = "blue",
}: {
  label: string;
  href: string;
  large?: boolean;
  password?: string;
  subline?: string;
  tint?: Tint;
}) {
  const [open, setOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const padding = large
    ? "px-6 sm:px-9 py-3 sm:py-4"
    : "px-5 sm:px-7 py-3 sm:py-4";
  const text = large
    ? "text-xs sm:text-sm md:text-base tracking-[0.3em] sm:tracking-[0.35em]"
    : "text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em]";
  const palette = TINTS[tint];
  const halo = `${large ? "-inset-10" : "-inset-6"} ${palette.halo}`;
  const shadow = palette.shadow(large);

  const locked = !!password && !unlocked;
  const external = /^https?:\/\//i.test(href);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pwInput === password) {
      setUnlocked(true);
      setError(false);
      setPwInput("");
    } else {
      setError(true);
      setPwInput("");
    }
  }

  const tileFace = (
    <>
      <span aria-hidden className={`absolute rounded-full blur-3xl ${halo}`} />
      <span
        className={`relative block rounded-xl border ${palette.border} ${palette.bg} backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5 ${padding}`}
        style={{
          transform: "perspective(1200px) rotateX(-8deg)",
          boxShadow: shadow,
        }}
      >
        <span
          className={`block ${palette.text} font-light uppercase whitespace-nowrap ${text}`}
        >
          {label}
        </span>
        {subline && (
          <span className={`mt-1 block text-[8px] sm:text-[9px] tracking-[0.3em] uppercase ${palette.subline}`}>
            {subline}
          </span>
        )}
      </span>
    </>
  );

  return (
    <>
      {external ? (
        <a
          href={href}
          target="_top"
          rel="noopener"
          aria-label={label}
          className="relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 rounded-xl inline-block"
        >
          {tileFace}
        </a>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 rounded-xl"
          aria-label={`Open ${label}`}
        >
          {tileFace}
        </button>
      )}

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={label}
        >
          <button
            type="button"
            aria-label="Close"
            tabIndex={-1}
            className="absolute inset-0 bg-black/85 backdrop-blur-sm cursor-default"
            onClick={() => setOpen(false)}
          />
          <div
            className="relative w-full max-w-6xl h-[88vh] rounded-2xl overflow-hidden border border-blue-400/40 bg-black"
            style={{
              boxShadow:
                "0 0 80px rgba(59, 130, 246, 0.50), 0 0 160px rgba(59, 130, 246, 0.25), inset 0 1px 0 rgba(147, 197, 253, 0.30)",
            }}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-blue-950/80 border border-blue-400/40 text-blue-100 text-lg leading-none flex items-center justify-center hover:bg-blue-900/80 transition-colors"
            >
              ×
            </button>

            {locked ? (
              <form
                onSubmit={handleSubmit}
                className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6"
              >
                <label
                  htmlFor={`pw-${label}`}
                  className="text-blue-100/60 italic text-xs tracking-[0.3em] uppercase"
                >
                  enter passphrase
                </label>
                <input
                  id={`pw-${label}`}
                  type="password"
                  autoFocus
                  value={pwInput}
                  onChange={(e) => {
                    setPwInput(e.target.value);
                    if (error) setError(false);
                  }}
                  className="bg-blue-950/40 border border-blue-400/40 text-blue-100 text-center text-base tracking-[0.3em] uppercase rounded-lg px-5 py-3 w-64 outline-none focus:border-blue-300/70 focus:bg-blue-950/60 transition-colors placeholder:text-blue-100/30"
                  placeholder="········"
                />
                <button
                  type="submit"
                  className="text-blue-100/80 hover:text-blue-100 text-xs tracking-[0.4em] uppercase border border-blue-400/40 rounded-lg px-6 py-2 hover:bg-blue-900/40 transition-colors"
                >
                  enter
                </button>
                {error && (
                  <p className="text-red-300/80 text-xs tracking-[0.2em] uppercase italic">
                    denied
                  </p>
                )}
              </form>
            ) : (
              <iframe
                src={href}
                title={label}
                className="w-full h-full border-0"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
