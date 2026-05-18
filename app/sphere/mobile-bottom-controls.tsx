"use client";

import { useEffect, useState } from "react";
import { TetheredPopup } from "../tethered-tile";
import { useRadio } from "../radio-tiles";

export function MobileBottomControls() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [podsOpen, setPodsOpen] = useState(false);
  const { playing, toggle } = useRadio();

  return (
    <>
      <div className="sm:hidden fixed bottom-4 left-0 right-0 z-30 flex flex-row items-center justify-center gap-3 px-4 pointer-events-none">
        <button
          type="button"
          onClick={toggle}
          aria-pressed={playing}
          aria-label={playing ? "Stop music" : "Play music"}
          className="pointer-events-auto flex-1 max-w-[180px] rounded-md border border-white/35 bg-black/65 backdrop-blur-sm px-4 py-3 text-center text-xs tracking-[0.4em] uppercase font-light text-white hover:border-white/70 transition-colors"
        >
          {playing ? "Music · on" : "Music"}
        </button>
        <button
          type="button"
          onClick={() => setPodsOpen(true)}
          aria-label="Open podcast chapter picker"
          className="pointer-events-auto flex-1 max-w-[180px] rounded-md border border-white/35 bg-black/65 backdrop-blur-sm px-4 py-3 text-center text-xs tracking-[0.4em] uppercase font-light text-white hover:border-white/70 transition-colors"
        >
          Podcasts
        </button>
      </div>
      {podsOpen && mounted && <TetheredPopup onClose={() => setPodsOpen(false)} />}
    </>
  );
}
