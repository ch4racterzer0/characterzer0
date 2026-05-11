"use client";

import { useEffect, useRef, useState } from "react";
import { useOrbHidden } from "./use-orb-hidden";

const HOLD_MS = 5500;
const FADE_MS = 1100;

export function McKinleyVisuals() {
  const [pics, setPics] = useState<string[]>([]);
  const [active, setActive] = useState(false);
  const [index, setIndex] = useState(0);
  const tickRef = useRef<number | null>(null);
  const playingRef = useRef(false);

  useEffect(() => {
    const onSet = (e: Event) => {
      const detail = (
        e as CustomEvent<{ src: string; title?: string; source?: string }>
      ).detail;
      if (!detail) return;
      const isMcKinley = detail.source === "mckinley";
      if (isMcKinley) {
        if (pics.length === 0) {
          fetch("/api/mckinley/pics", { cache: "no-store" })
            .then((r) => r.json())
            .then((d: { pics?: string[] }) => {
              if (Array.isArray(d.pics) && d.pics.length > 0) {
                setPics(d.pics);
                setIndex(0);
                setActive(true);
              }
            })
            .catch(() => {});
        } else {
          setIndex(0);
          setActive(true);
        }
      } else {
        setActive(false);
      }
    };
    window.addEventListener("character-zero:set-podcast", onSet);
    return () =>
      window.removeEventListener("character-zero:set-podcast", onSet);
  }, [pics.length]);

  useEffect(() => {
    const onPlay = () => {
      playingRef.current = true;
    };
    const onStop = () => {
      playingRef.current = false;
      setActive(false);
    };
    window.addEventListener("character-zero:orb-play", onPlay);
    window.addEventListener("character-zero:orb-pause", onStop);
    window.addEventListener("character-zero:orb-ended", onStop);
    return () => {
      window.removeEventListener("character-zero:orb-play", onPlay);
      window.removeEventListener("character-zero:orb-pause", onStop);
      window.removeEventListener("character-zero:orb-ended", onStop);
    };
  }, []);

  useEffect(() => {
    if (!active || pics.length < 2) return;
    if (tickRef.current !== null) {
      window.clearInterval(tickRef.current);
    }
    tickRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % pics.length);
    }, HOLD_MS);
    return () => {
      if (tickRef.current !== null) {
        window.clearInterval(tickRef.current);
        tickRef.current = null;
      }
    };
  }, [active, pics.length]);

  const hidden = useOrbHidden();
  if (!active || pics.length === 0) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[5] pointer-events-none overflow-hidden bg-black"
      style={{ visibility: hidden ? "hidden" : undefined }}
    >
      {pics.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover select-none"
          style={{
            opacity: i === index ? 0.9 : 0,
            transition: `opacity ${FADE_MS}ms ease-in-out`,
          }}
        />
      ))}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 78%, rgba(0,0,0,0.85) 100%)",
        }}
      />
    </div>
  );
}
