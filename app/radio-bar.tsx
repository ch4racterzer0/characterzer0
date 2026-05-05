"use client";

import { useState } from "react";

type Station = { name: string; playlistId: string };

const STATIONS: Station[] = [
  { name: "Phish", playlistId: "37i9dQZF1DZ06evO3fq5Og" },
  { name: "Grateful Dead", playlistId: "37i9dQZF1DZ06evO2Sjr0c" },
  { name: "Goose", playlistId: "37i9dQZF1DZ06evO3dHFSM" },
  { name: "Widespread Panic", playlistId: "37i9dQZF1DZ06evO2YZzeU" },
];

export function RadioBar() {
  const [station, setStation] = useState<Station>(STATIONS[0]);

  return (
    <div className="w-full max-w-xl flex flex-col items-center gap-3">
      <iframe
        title={`${station.name} radio`}
        src={`https://open.spotify.com/embed/playlist/${station.playlistId}?utm_source=generator&theme=0`}
        width="100%"
        height={80}
        frameBorder={0}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="rounded-xl"
      />
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs">
        <span className="text-white/40 italic">station:</span>
        {STATIONS.map((s) => {
          const active = s.playlistId === station.playlistId;
          return (
            <button
              key={s.playlistId}
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
    </div>
  );
}
