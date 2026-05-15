"use client";

import { useState } from "react";
import { PodcastCoversModal } from "./hungersite/podcast-covers";

export function PodsButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open podcast table of contents"
        className="relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 rounded-xl"
      >
        <span aria-hidden className="absolute rounded-full blur-3xl -inset-6 bg-blue-500/15" />
        <span
          className="relative block rounded-xl border border-blue-400/40 bg-blue-950/40 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5 px-5 sm:px-7 py-3 sm:py-4"
          style={{
            transform: "perspective(1200px) rotateX(-8deg)",
            boxShadow:
              "0 0 30px rgba(59, 130, 246, 0.40), 0 0 60px rgba(59, 130, 246, 0.18), 0 12px 28px -10px rgba(59, 130, 246, 0.40), inset 0 1px 0 rgba(147, 197, 253, 0.35)",
          }}
        >
          <span className="block text-blue-100 font-light uppercase whitespace-nowrap text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em]">
            Pods
          </span>
        </span>
      </button>
      {open && <PodcastCoversModal onClose={() => setOpen(false)} />}
    </>
  );
}
