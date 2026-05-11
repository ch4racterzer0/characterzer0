"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Set this the moment the first stream goes live, then never touch it again.
// Until set, the clock shows "awaiting first light".
const STREAM_FIRST_LIGHT_ISO: string | null = null;

function formatSince(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(total / 86400);
  const h = Math.floor((total % 86400) / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((total % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = (total % 60).toString().padStart(2, "0");
  return `${days.toString().padStart(2, "0")}d ${h}:${m}:${s}`;
}

function formatAnchor(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} · ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function InceptionClock() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    if (!STREAM_FIRST_LIGHT_ISO) return;
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!STREAM_FIRST_LIGHT_ISO) {
    return (
      <div className="flex flex-col items-center gap-1 font-mono tabular-nums select-none">
        <span
          className="text-blue-100/60 text-[10px] sm:text-xs tracking-[0.4em] uppercase"
          style={{ textShadow: "0 0 10px rgba(96,165,250,0.55)" }}
        >
          awaiting first light
        </span>
        <span
          className="text-blue-100 text-2xl sm:text-4xl tracking-[0.3em]"
          style={{
            textShadow:
              "0 0 14px rgba(59,130,246,0.85), 0 0 32px rgba(96,165,250,0.45)",
          }}
        >
          00d 00:00:00
        </span>
        <span className="text-blue-200/45 text-[9px] sm:text-[10px] tracking-[0.45em] italic">
          清零
        </span>
      </div>
    );
  }

  const anchorMs = new Date(STREAM_FIRST_LIGHT_ISO).getTime();
  const elapsed = now === null ? 0 : now - anchorMs;

  return (
    <div className="flex flex-col items-center gap-1 font-mono tabular-nums select-none">
      <span
        className="text-blue-300/70 text-[9px] sm:text-[10px] tracking-[0.4em] uppercase"
        style={{ textShadow: "0 0 8px rgba(96,165,250,0.45)" }}
      >
        first light · {formatAnchor(STREAM_FIRST_LIGHT_ISO)}
      </span>
      <span
        className="text-blue-100 text-2xl sm:text-4xl tracking-[0.3em]"
        style={{
          textShadow:
            "0 0 14px rgba(59,130,246,0.85), 0 0 32px rgba(96,165,250,0.45), 0 0 60px rgba(30,64,175,0.3)",
        }}
      >
        {formatSince(elapsed)}
      </span>
      <span className="text-blue-200/55 text-[9px] sm:text-[10px] tracking-[0.45em] italic">
        起点 · the inception
      </span>
    </div>
  );
}

export function InceptionPopup({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[85] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="inception — first light"
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="close"
        className="absolute inset-0 bg-black/85 backdrop-blur-sm cursor-default"
        onClick={onClose}
      />
      <div className="relative w-full max-w-4xl flex flex-col items-center gap-5">
        <button
          type="button"
          onClick={onClose}
          aria-label="close"
          className="absolute -top-2 -right-2 z-10 w-9 h-9 rounded-full border border-blue-300/45 bg-blue-950/70 text-blue-100 text-lg leading-none flex items-center justify-center hover:bg-blue-900/80 hover:border-blue-200/70 transition-colors"
        >
          ×
        </button>
        <p
          className="text-blue-300/75 text-[10px] sm:text-xs tracking-[0.4em] uppercase"
          style={{ textShadow: "0 0 10px rgba(96,165,250,0.55)" }}
        >
          // inception · the room before the first stream
        </p>
        <div
          className="relative w-full rounded-md overflow-hidden border border-blue-300/30"
          style={{
            boxShadow:
              "0 0 40px rgba(59,130,246,0.35), 0 0 90px rgba(30,64,175,0.25)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/inception/first-light.png"
            alt="the channel page the moment the banner went up"
            className="w-full h-auto block select-none"
            draggable={false}
          />
        </div>
        <InceptionClock />
        <p className="text-blue-300/45 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase italic">
          esc to close
        </p>
      </div>
    </div>,
    document.body,
  );
}
