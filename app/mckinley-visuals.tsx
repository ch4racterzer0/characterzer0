"use client";

import { useEffect, useRef, useState } from "react";

const HOLD_MS = 5500;
const FADE_MS = 1100;

type ShowState = {
  src: string;
  title: string;
  pics: string[];
};

export function McKinleyVisuals() {
  const [show, setShow] = useState<ShowState | null>(null);
  const [index, setIndex] = useState(0);
  const tickRef = useRef<number | null>(null);
  const cachedPicsRef = useRef<string[] | null>(null);

  useEffect(() => {
    const onSet = async (e: Event) => {
      const detail = (
        e as CustomEvent<{ src: string; title?: string; source?: string }>
      ).detail;
      if (!detail) return;
      if (detail.source !== "mckinley") {
        setShow(null);
        return;
      }
      let pics = cachedPicsRef.current;
      if (!pics) {
        try {
          const res = await fetch("/api/mckinley/pics", { cache: "no-store" });
          const data = (await res.json()) as { pics?: string[] };
          pics = Array.isArray(data.pics) ? data.pics : [];
          cachedPicsRef.current = pics;
        } catch {
          pics = [];
        }
      }
      setIndex(0);
      setShow({
        src: detail.src,
        title: detail.title ?? "",
        pics,
      });
    };
    window.addEventListener("character-zero:set-podcast", onSet);
    return () =>
      window.removeEventListener("character-zero:set-podcast", onSet);
  }, []);

  useEffect(() => {
    const onStop = () => setShow(null);
    window.addEventListener("character-zero:close-show", onStop);
    window.addEventListener("character-zero:orb-ended", onStop);
    return () => {
      window.removeEventListener("character-zero:close-show", onStop);
      window.removeEventListener("character-zero:orb-ended", onStop);
    };
  }, []);

  useEffect(() => {
    if (!show || show.pics.length < 2) return;
    if (tickRef.current !== null) window.clearInterval(tickRef.current);
    tickRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % show.pics.length);
    }, HOLD_MS);
    return () => {
      if (tickRef.current !== null) {
        window.clearInterval(tickRef.current);
        tickRef.current = null;
      }
    };
  }, [show]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (show) document.body.dataset.showMode = "on";
    else delete document.body.dataset.showMode;
    return () => {
      if (typeof document !== "undefined") delete document.body.dataset.showMode;
    };
  }, [show]);

  if (!show) return null;

  const closeShow = () => {
    window.dispatchEvent(new Event("character-zero:close-show"));
  };

  return (
    <>
      <div
        aria-hidden
        className="fixed inset-0 z-[60] pointer-events-none overflow-hidden bg-black"
      >
        {show.pics.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-white/40 text-xs tracking-[0.3em] uppercase">
            no pics in mckinley/
          </div>
        ) : (
          show.pics.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt=""
              aria-hidden
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover select-none"
              style={{
                opacity: i === index ? 1 : 0,
                transition: `opacity ${FADE_MS}ms ease-in-out`,
              }}
            />
          ))
        )}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.40) 78%, rgba(0,0,0,0.85) 100%)",
          }}
        />
      </div>

      <button
        type="button"
        onClick={closeShow}
        aria-label="Close show — back to sphere"
        className="fixed top-3 right-3 z-[70] w-14 h-14 rounded-full pointer-events-auto cursor-pointer bg-blue-950/80 hover:bg-blue-900/90 border border-blue-300/65 hover:border-blue-200/85 backdrop-blur-sm flex items-center justify-center transition-colors"
        style={{
          boxShadow:
            "0 0 22px rgba(96,165,250,0.55), 0 0 50px rgba(59,130,246,0.30), inset 0 1px 0 rgba(191,219,254,0.40)",
        }}
      >
        <span
          aria-hidden
          className="block text-blue-100 text-xl leading-none"
          style={{
            textShadow: "0 0 8px rgba(191,219,254,0.85)",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        >
          ×
        </span>
      </button>
    </>
  );
}
