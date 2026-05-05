"use client";

import { useEffect, useState } from "react";

const LYRICS = [
  "Surrender to the flow",
  "But then I learned just yesterday — to rush and never waste the day",
  "Set the gearshift for the high gear of your soul",
  "Happy happy oh my friend",
  "Eyes wide open, somewhere in between the past and future",
  "She thinks I'm crazy but I'm just growing old",
  "Maybe so, maybe not",
  "Whatever you do, take care of your shoes",
  "Tear out my eyes and search the world for you",
  "It is night, the cape is mine",
  "Toss away stuff you don't need in the end",
  "Everything's right, hold tight",
  "Tonight I climb the silver ladder",
  "Welcome, this is a farmhouse",
  "Time turns elastic",
  "Wading in the velvet sea",
  "Roll over and rest a while, let me make you smile",
  "Cats stalk the corridors of these halls",
  "Birds of a feather are flocking outside",
  "Run like an antelope, out of control",
  "You could feel good about Hood",
  "Light is the way",
  "The trick was to surrender to the flow",
  "Our memories will linger on long, even after our footprints are gone",
  "We must keep on",
];

const INTERVAL_MS = 10_000;
const FADE_MS = 800;

export function LyricRotator() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setIdx(Math.floor(Math.random() * LYRICS.length));

    const id = setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setIdx((curr) => {
          if (LYRICS.length <= 1) return curr;
          let next = curr;
          while (next === curr) {
            next = Math.floor(Math.random() * LYRICS.length);
          }
          return next;
        });
        setVisible(true);
      }, FADE_MS);
    }, INTERVAL_MS);

    return () => clearInterval(id);
  }, []);

  return (
    <p
      className={`max-w-md sm:max-w-3xl min-h-[2.5rem] sm:min-h-[1.5rem] flex items-center justify-center text-white/45 italic text-[11px] sm:text-sm tracking-wide text-center leading-snug transition-opacity duration-700 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {LYRICS[idx]}
    </p>
  );
}
