"use client";

import { useEffect, useState } from "react";
import { TetheredPopup } from "../tethered-tile";
import { useRadio } from "../radio-tiles";

export function MobileBottomControls() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [podsOpen, setPodsOpen] = useState(false);
  const [podPlaying, setPodPlaying] = useState(false);
  const { playing, toggle } = useRadio();

  useEffect(() => {
    const onPlay = () => setPodPlaying(true);
    const onPause = () => setPodPlaying(false);
    const onEnded = () => setPodPlaying(false);
    window.addEventListener("character-zero:orb-play", onPlay);
    window.addEventListener("character-zero:orb-pause", onPause);
    window.addEventListener("character-zero:orb-ended", onEnded);
    return () => {
      window.removeEventListener("character-zero:orb-play", onPlay);
      window.removeEventListener("character-zero:orb-pause", onPause);
      window.removeEventListener("character-zero:orb-ended", onEnded);
    };
  }, []);

  const onPodcasts = () => {
    if (podPlaying) {
      window.dispatchEvent(new Event("character-zero:close-show"));
    } else {
      setPodsOpen(true);
    }
  };

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
          {playing ? "Music · stop" : "Music"}
        </button>
        <button
          type="button"
          onClick={onPodcasts}
          aria-pressed={podPlaying}
          aria-label={podPlaying ? "Stop podcast" : "Open podcast chapter picker"}
          className="pointer-events-auto flex-1 max-w-[180px] rounded-md border border-white/35 bg-black/65 backdrop-blur-sm px-4 py-3 text-center text-xs tracking-[0.4em] uppercase font-light text-white hover:border-white/70 transition-colors"
        >
          {podPlaying ? "Podcasts · stop" : "Podcasts"}
        </button>
      </div>
      {podsOpen && mounted && <TetheredPopup onClose={() => setPodsOpen(false)} />}
    </>
  );
}
