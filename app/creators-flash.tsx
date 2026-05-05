"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { LinkTile } from "./link-tile";

const CYCLE_MS = 213_000;
const SHOW_MS = 3_000;

function randomPosition() {
  const left = 6 + Math.random() * 70;
  const top = 14 + Math.random() * 70;
  return { left: `${left}vw`, top: `${top}vh` };
}

export function CreatorsFlash() {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ left: "50vw", top: "50vh" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    let showTimer: ReturnType<typeof setTimeout> | undefined;
    let hideTimer: ReturnType<typeof setTimeout> | undefined;

    const scheduleNext = () => {
      const offset = Math.random() * (CYCLE_MS - SHOW_MS);
      showTimer = setTimeout(() => {
        setPos(randomPosition());
        setVisible(true);
        hideTimer = setTimeout(() => {
          setVisible(false);
          scheduleNext();
        }, SHOW_MS);
      }, offset);
    };

    scheduleNext();

    return () => {
      if (showTimer) clearTimeout(showTimer);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, []);

  if (!mounted || !visible) return null;

  return createPortal(
    <div
      className="fixed z-40 transition-opacity duration-700"
      style={{ ...pos, opacity: visible ? 1 : 0 }}
    >
      <LinkTile label="Creators" href="/creator" />
    </div>,
    document.body
  );
}
