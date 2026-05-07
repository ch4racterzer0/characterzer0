"use client";

import { useEffect, useState } from "react";

export function TokenGateTile({
  label,
  large = false,
  subline,
}: {
  label: string;
  large?: boolean;
  subline?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const padding = large
    ? "px-6 sm:px-9 py-3 sm:py-4"
    : "px-5 sm:px-7 py-3 sm:py-4";
  const text = large
    ? "text-xs sm:text-sm md:text-base tracking-[0.3em] sm:tracking-[0.35em]"
    : "text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em]";
  const halo = large ? "-inset-10 bg-blue-500/18" : "-inset-6 bg-blue-500/15";
  const shadow = large
    ? "0 0 45px rgba(59, 130, 246, 0.50), 0 0 90px rgba(59, 130, 246, 0.25), 0 18px 38px -10px rgba(59, 130, 246, 0.45), inset 0 1px 0 rgba(147, 197, 253, 0.40)"
    : "0 0 30px rgba(59, 130, 246, 0.40), 0 0 60px rgba(59, 130, 246, 0.18), 0 12px 28px -10px rgba(59, 130, 246, 0.40), inset 0 1px 0 rgba(147, 197, 253, 0.35)";

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
          {subline && (
            <span className="mt-1 block text-[8px] sm:text-[9px] tracking-[0.3em] uppercase text-blue-300/40">
              {subline}
            </span>
          )}
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${label} — token required`}
        >
          <button
            type="button"
            aria-label="Close"
            tabIndex={-1}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm cursor-default"
            onClick={() => setOpen(false)}
          />
          <div
            className="relative w-full max-w-xs rounded-xl overflow-hidden border border-blue-400/40 bg-blue-950/70 backdrop-blur-md px-7 py-7"
            style={{
              boxShadow:
                "0 0 50px rgba(59, 130, 246, 0.40), 0 0 110px rgba(59, 130, 246, 0.18), inset 0 1px 0 rgba(147, 197, 253, 0.30)",
            }}
          >
            <p className="text-blue-100/85 italic text-[13px] leading-relaxed text-center">
              you can&rsquo;t see until you pay the token
            </p>
            <div className="mt-6 flex justify-end items-center gap-2">
              <span
                className="text-red-400/90 text-2xl tracking-[0.15em]"
                style={{
                  fontFamily:
                    '"Noto Serif SC", "Songti SC", "STSong", "SimSun", serif',
                  textShadow: "0 0 6px rgba(248, 113, 113, 0.35)",
                }}
                lang="zh"
              >
                角色零
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
