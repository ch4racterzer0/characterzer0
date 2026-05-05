"use client";

import { useState } from "react";

type Station = { name: string; src: string; nowPlaying: string };

const STATIONS: Station[] = [
  {
    name: "Phish",
    src: "https://www.youtube-nocookie.com/embed/y7CPVb_I5uY?rel=0",
    nowPlaying: "12/29/24 — Madison Square Garden (full show, 4K)",
  },
  {
    name: "Grateful Dead",
    src: "https://www.youtube-nocookie.com/embed/videoseries?list=PLUKl8anVi_HJj0riRpcXwZGKHaMfvZidH&rel=0",
    nowPlaying: "Shows playlist (full concerts)",
  },
  {
    name: "Goose",
    src: "https://www.youtube-nocookie.com/embed/SDuDWNAT9TY?rel=0",
    nowPlaying: "Birmingham 2026 — Set Two",
  },
  {
    name: "Widespread Panic",
    src: "https://www.youtube-nocookie.com/embed/vAd3aogR-3o?rel=0",
    nowPlaying: "6/29/25 — Red Rocks Amphitheatre",
  },
];

export function RadioBar() {
  const [station, setStation] = useState<Station>(STATIONS[0]);

  return (
    <div className="w-full max-w-2xl flex flex-col items-center gap-3">
      <div className="w-full aspect-video">
        <iframe
          key={station.src}
          title={`${station.name} — ${station.nowPlaying}`}
          src={station.src}
          allow="accelerometer; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          className="w-full h-full rounded-xl border border-blue-400/20"
        />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs">
        <span className="text-white/40 italic">station:</span>
        {STATIONS.map((s) => {
          const active = s.name === station.name;
          return (
            <button
              key={s.name}
              type="button"
              onClick={() => setStation(s)}
              className={
                active
                  ? "text-blue-200 underline underline-offset-4"
                  : "text-white/55 hover:text-white/85"
              }
            >
              {s.name}
            </button>
          );
        })}
      </div>
      <p className="text-[11px] italic text-white/35 text-center">
        now playing: {station.nowPlaying}
      </p>
    </div>
  );
}
