"use client";

import { useEffect, useState } from "react";

export function LinkTile({
  label,
  href,
  large = false,
  password,
}: {
  label: string;
  href: string;
  large?: boolean;
  password?: string;
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
    ? "px-8 sm:px-12 py-4 sm:py-6"
    : "px-5 sm:px-7 py-3 sm:py-4";
  const text = large
    ? "text-base sm:text-xl md:text-2xl tracking-[0.3em] sm:tracking-[0.4em]"
    : "text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em]";
  const halo = large ? "-inset-12 bg-blue-500/20" : "-inset-6 bg-blue-500/15";
  const shadow = large
    ? "0 0 60px rgba(59, 130, 246, 0.55), 0 0 120px rgba(59, 130, 246, 0.30), 0 25px 50px -10px rgba(59, 130, 246, 0.50), inset 0 1px 0 rgba(147, 197, 253, 0.45)"
    : "0 0 30px rgba(59, 130, 246, 0.40), 0 0 60px rgba(59, 130, 246, 0.18), 0 12px 28px -10px rgba(59, 130, 246, 0.40), inset 0 1px 0 rgba(147, 197, 253, 0.35)";

  const locked = !!password && !unlocked;

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

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 rounded-xl"
        aria-label={`Open ${label}`}
      >
        <span aria-hidden className={`absolute rounded-full blur-3xl ${halo}`} />
        <span
          className={`relative block rounded-xl border border-blue-400/40 bg-blue-950/40 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5 ${padding}`}
          style={{
            transform: "perspective(1200px) rotateX(-8deg)",
            boxShadow: shadow,
          }}
        >
          <span
            className={`block text-blue-100 font-light uppercase whitespace-nowrap ${text}`}
          >
            {label}
          </span>
        </span>
      </button>

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
