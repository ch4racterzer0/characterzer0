"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { LyricRotator } from "../lyric-rotator";
import {
  FigureWithTilesDesktop,
  RadioProvider,
  RadioTilesMobileTop,
} from "../radio-tiles";

const GOOSE_LYRICS = [
  "Hot tea in the kitchen, honey on your spoon",
  "Been chasing satellites since we landed on the moon",
  "Lay your weapons down and reach up to the skies",
  "It's a natural inquisition, we just wanna know",
  "Throw an old song on the fire, let it burn til the heavens sing",
  "About lighting bolts and waterfalls, where all the night walls go",
  "We paint the walls with warning signs, hope that all the world will see",
  "To the rhythm of life, I was walking on by",
  "Down on the ground you sometimes find what you wouldn't have found if you kept on walking by",
  "Maybe there's no bad luck — you gotta go down if you want to get up",
  "There is a lesson to learn, and a cup to refill",
  "If your balance you lose, a road lies ahead, so tie up your shoes",
  "Run straight to the sky",
  "It's the same dream of mine, to be there if we drive for a mile",
  "I'll be seeing you next time",
  "It's just a raindrop, falling, hauling love from above",
  "I'm not tired, I'm not worn at all — I've just started",
  "Now I'm shown around just what we were born to be",
  "Ironclad heart, someday I will lay my head down",
  "Sight stolen again, falling out, all I've been",
  "It's soaring now, sword in mouth — my arrow",
  "Slowing down over the air",
  "There's no shadow left to rest in",
  "Mist under my arrow",
];

function DemoTile({
  label,
  blurb,
  large = false,
}: {
  label: string;
  blurb: string;
  large?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

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
        </span>
      </button>

      {open && mounted &&
        createPortal(
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
              className="relative w-full max-w-2xl rounded-2xl border border-blue-400/40 bg-black p-8 sm:p-12"
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
              <p className="text-blue-100/60 text-xs tracking-[0.3em] uppercase mb-3">
                {label}
              </p>
              <p className="text-blue-100/85 text-base sm:text-lg leading-relaxed font-light">
                {blurb}
              </p>
              <p className="text-blue-100/40 italic text-xs mt-6">
                this is sample content. your anspach goes here.
              </p>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default function Sample() {
  return (
    <RadioProvider>
    <main
      className="relative min-h-screen bg-black bg-cover bg-center bg-no-repeat flex flex-col items-center justify-between gap-4 sm:gap-0 py-4 sm:py-10 px-4"
      style={{
        filter: "hue-rotate(75deg) brightness(0.75) saturate(1.15)",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.78)), url('/peter-stage.jpg')",
      }}
    >
      <RadioTilesMobileTop />

      <div className="flex flex-col items-center gap-4 sm:gap-10">
        <LyricRotator lyrics={GOOSE_LYRICS} />
        <div className="flex flex-row items-center gap-3 sm:gap-6">
          <DemoTile
            label="About"
            blurb="who peter is, in peter's own words. a paragraph or three. links to anywhere they want."
            large
          />
          <DemoTile
            label="Music"
            blurb="embedded player, latest release, archive of older work, links to streaming services."
            large
          />
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-10 w-full max-w-md sm:w-auto sm:max-w-none">
        <DemoTile
          label="Projects"
          blurb="a list of things peter is building, with screenshots and short notes on each."
        />
        <DemoTile
          label="Notes"
          blurb="long-form posts, journal entries, anything peter wants to say at length."
        />
        <DemoTile
          label="Stream"
          blurb="when peter is live, this turns on. otherwise, last few archives sit here."
        />
        <DemoTile
          label="Contact"
          blurb="email, signal, mailing list signup. nothing required, nothing tracked."
        />
      </div>

      <FigureWithTilesDesktop />

      <a
        href="/yoursphere"
        className="fixed bottom-4 left-4 text-blue-200/70 hover:text-blue-100 text-[10px] tracking-[0.3em] uppercase underline underline-offset-4"
      >
        &larr; back
      </a>
    </main>
    </RadioProvider>
  );
}
