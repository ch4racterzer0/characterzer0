"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

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
    <main className="relative min-h-screen bg-black flex flex-col items-center justify-between gap-4 sm:gap-0 py-4 sm:py-10 px-4">
      <div className="flex flex-col items-center gap-4 sm:gap-10">
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

      <div className="flex items-end justify-center gap-4 sm:gap-8">
        <Image
          src="/characterzer0-figure.png"
          alt="sample figure"
          width={1536}
          height={1024}
          priority
          sizes="(max-width: 640px) 50vw, 30vw"
          className="h-[24vh] w-auto opacity-70"
        />
      </div>

      <a
        href="/yoursphere"
        className="fixed bottom-4 left-4 text-blue-200/70 hover:text-blue-100 text-[10px] tracking-[0.3em] uppercase underline underline-offset-4"
      >
        &larr; back
      </a>
    </main>
  );
}
