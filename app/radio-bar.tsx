"use client";

import { useState } from "react";

type Station = { name: string; src: string; tagline: string };

const STATIONS: Station[] = [
  {
    name: "Phish",
    src: "https://tunein.com/embed/player/s173729/",
    tagline: "JEMP Radio — Phish & jam, 24/7, fan-run",
  },
  {
    name: "Grateful Dead",
    src: "https://tunein.com/embed/player/s54607/",
    tagline: "GDRADIO — Grateful Dead & more, 24/7/365",
  },
];

export function RadioBar() {
  const [station, setStation] = useState<Station>(STATIONS[0]);

  return (
    <div className="w-full max-w-md flex flex-col items-center gap-3">
      <iframe
        key={station.src}
        title={`${station.name} radio`}
        src={station.src}
        width="100%"
        height={100}
        frameBorder={0}
        allow="autoplay"
        loading="lazy"
        className="rounded-xl border border-blue-400/20"
      />
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
        {station.tagline}
      </p>
    </div>
  );
}
