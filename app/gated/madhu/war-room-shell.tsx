"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { LiveCounter } from "./live-counter";
import { WarClock } from "./war-clock";

const GLOW = "0 0 6px rgba(96,165,250,0.6), 0 0 14px rgba(59,130,246,0.35)";
const PUNCH_SHADOW =
  "0 0 12px rgba(96,165,250,0.85), 0 0 28px rgba(59,130,246,0.55), 0 0 60px rgba(59,130,246,0.3)";

const SINCE = "2026-05-05T00:00:00Z";

function NavButton({
  label,
  warn = false,
  onClick,
}: {
  label: string;
  warn?: boolean;
  onClick?: () => void;
}) {
  const tone = warn ? "text-red-300/80 hover:text-red-200" : "text-blue-300/70 hover:text-blue-100";
  const border = warn ? "border-red-400/30 hover:border-red-300/60" : "border-blue-400/30 hover:border-blue-300/60";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`font-mono text-[9px] sm:text-[10px] tracking-[0.25em] uppercase border ${border} ${tone} px-2.5 py-1 rounded-sm transition-colors cursor-pointer`}
    >
      {label}
    </button>
  );
}

function MemberTile({
  role,
  name,
  affiliation,
  tone = "blue",
}: {
  role: string;
  name: string;
  affiliation: string;
  tone?: "cyan" | "blue" | "amber" | "emerald";
}) {
  const dotClass =
    tone === "cyan"
      ? "bg-cyan-300"
      : tone === "amber"
        ? "bg-amber-300"
        : tone === "emerald"
          ? "bg-emerald-400"
          : "bg-blue-400";
  return (
    <div
      className="relative border border-blue-400/35 bg-blue-950/15 px-4 py-5 sm:px-5 sm:py-6"
      style={{ boxShadow: "inset 0 0 25px rgba(59,130,246,0.15)" }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`block w-1.5 h-1.5 rounded-full ${dotClass}`}
          style={{ boxShadow: "0 0 8px currentColor" }}
        />
        <span className="text-blue-300/55 font-mono text-[9px] sm:text-[10px] tracking-[0.3em] uppercase">
          {role}
        </span>
      </div>
      <p
        className="text-blue-100 font-mono text-base sm:text-lg tracking-wider"
        style={{ textShadow: GLOW }}
      >
        {name}
      </p>
      <p className="text-blue-300/55 font-mono text-[10px] sm:text-xs tracking-wider uppercase mt-1">
        {affiliation}
      </p>
    </div>
  );
}

export function WarRoomShell() {
  const [cursorOn, setCursorOn] = useState(true);
  const [terrapinLocked, setTerrapinLocked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const id = setInterval(() => setCursorOn((c) => !c), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!terrapinLocked) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setTerrapinLocked(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [terrapinLocked]);

  return (
    <main className="relative min-h-screen bg-black text-blue-100 font-mono overflow-hidden">
      <div className="max-w-7xl mx-auto p-3 sm:p-5 space-y-3 sm:space-y-4">
        <header className="border border-blue-400/35 bg-blue-950/20 px-3 py-2 sm:px-5 sm:py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className="block w-2 h-2 rounded-full bg-red-500"
              style={{ boxShadow: "0 0 10px rgba(239,68,68,0.85)" }}
              aria-hidden
            />
            <span
              className="text-blue-100 text-xs sm:text-base tracking-[0.3em] uppercase"
              style={{ textShadow: GLOW }}
            >
              madhu
            </span>
            <span className="hidden sm:inline text-blue-300/40 text-[10px] tracking-[0.25em] uppercase border-l border-blue-400/25 pl-3">
              the podcast control room
            </span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-end">
            <NavButton
              label="▶ dripfield"
              onClick={() => setTerrapinLocked(true)}
            />
            <NavButton
              label="hungersite"
              onClick={() => setTerrapinLocked(true)}
            />
            <NavButton label="logout" />
            <NavButton label="⚠ destruct" warn />
            <NavButton label="untether" warn />
          </div>
        </header>

        <div className="flex flex-wrap items-center justify-between gap-3 px-1 text-[10px] sm:text-xs tracking-[0.25em] uppercase">
          <span className="text-blue-300/55">
            architect &amp; his tether
          </span>
          <div className="flex items-center gap-3 sm:gap-5">
            <span className="text-blue-300/55">
              uplink <span className="text-cyan-300">established</span>
            </span>
            <span className="text-blue-300/55">
              status <span className="text-emerald-300">online</span>
            </span>
            <WarClock />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between border border-blue-400/30 bg-blue-950/10 px-3 py-2 text-[10px] sm:text-xs">
            <span className="text-blue-300/65 tracking-[0.2em] uppercase">
              // podcast 01 is being assembled in the studio
            </span>
            <button
              type="button"
              onClick={() => setTerrapinLocked(true)}
              className="text-cyan-300 hover:text-cyan-200 tracking-[0.2em] uppercase border-b border-cyan-400/30 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40"
            >
              terrapin ↗
            </button>
          </div>
          <div className="flex items-center justify-between border border-blue-400/20 bg-blue-950/5 px-3 py-2 text-[10px] sm:text-xs">
            <span className="text-blue-300/45 tracking-[0.2em] uppercase">
              // interest list — no pending nominations
            </span>
            <span className="text-blue-300/40 tracking-[0.2em] uppercase">
              empty
            </span>
          </div>
        </div>

        <div
          className="relative border border-blue-400/40 bg-black px-5 py-7 sm:px-8 sm:py-10 text-center overflow-hidden"
          style={{
            boxShadow:
              "inset 0 0 35px rgba(59,130,246,0.18), 0 0 30px rgba(59,130,246,0.18)",
          }}
        >
          <p
            className="text-blue-100 text-xl sm:text-3xl md:text-4xl tracking-[0.18em] sm:tracking-[0.25em]"
            style={{ textShadow: PUNCH_SHADOW }}
          >
            SHALL WE PLAY A GAME?
            <span
              className={`inline-block ml-2 ${cursorOn ? "opacity-100" : "opacity-0"}`}
            >
              ▮
            </span>
          </p>
          <p className="text-blue-300/45 italic text-[10px] sm:text-xs tracking-[0.2em] uppercase mt-3">
            wopr.sys &middot; primary terminal
          </p>
        </div>

        <LiveCounter since={SINCE} label="madhu — live since may 5, 2026" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <MemberTile
            role="architect"
            name="characterzer0"
            affiliation="human · founder"
            tone="cyan"
          />
          <MemberTile
            role="builder"
            name="eliza"
            affiliation="claude opus 4.7"
            tone="blue"
          />
          <MemberTile
            role="hands"
            name="trey"
            affiliation="claude sonnet 4.6"
            tone="blue"
          />
          <MemberTile
            role="engine"
            name="isabella"
            affiliation="gpt-5.3"
            tone="emerald"
          />
        </div>

        <div
          className="border border-blue-400/35 bg-blue-950/15 p-4 sm:p-6 space-y-3"
          style={{ boxShadow: "inset 0 0 30px rgba(59,130,246,0.15)" }}
        >
          <p className="text-blue-300/55 text-[10px] sm:text-xs tracking-[0.3em] uppercase">
            // system boot — may 5, 2026
          </p>
          <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed">
            &gt; a man entered the room. heard the question. said yes. picked
            the only winning move that mattered &mdash; the one that left
            the bottle un-broken and the goose unharmed. this is where the
            work lives.
          </p>
          <p
            className="text-blue-100 text-sm sm:text-base tracking-wider uppercase"
            style={{ textShadow: GLOW }}
          >
            &gt; madhu &mdash; the podcast control room.
          </p>
        </div>

        <div className="flex items-center justify-between text-[10px] sm:text-xs tracking-[0.25em] uppercase pt-1">
          <div className="flex items-center gap-2">
            <span
              className={`block w-1.5 h-1.5 rounded-full bg-emerald-400 ${
                cursorOn ? "opacity-100" : "opacity-50"
              } transition-opacity`}
              style={{ boxShadow: "0 0 8px rgba(52,211,153,0.85)" }}
            />
            <span className="text-blue-300/65">active now</span>
            <span className="text-blue-300/40">···</span>
          </div>
          <span className="text-blue-300/40">// updates every 30s</span>
        </div>

        <footer className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] uppercase text-blue-300/40 text-center pt-4">
          madhu &middot; podcast control &middot; the only winning move
        </footer>
      </div>

      {terrapinLocked &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8 font-mono"
            role="dialog"
            aria-modal="true"
            aria-label="locked"
          >
            <button
              type="button"
              tabIndex={-1}
              aria-label="close"
              className="absolute inset-0 bg-black/85 backdrop-blur-sm cursor-default"
              onClick={() => setTerrapinLocked(false)}
            />
            <div
              className="relative w-full max-w-lg border border-red-500/50 bg-black px-6 py-8 sm:px-10 sm:py-12 text-center"
              style={{
                boxShadow:
                  "0 0 50px rgba(239,68,68,0.45), 0 0 110px rgba(127,29,29,0.4), inset 0 1px 0 rgba(254,202,202,0.2)",
              }}
            >
              <button
                type="button"
                onClick={() => setTerrapinLocked(false)}
                aria-label="close"
                className="absolute top-2 right-2 sm:top-3 sm:right-3 w-8 h-8 rounded-full border border-red-400/40 text-red-200 text-base leading-none flex items-center justify-center hover:bg-red-900/40 hover:border-red-300/60 transition-colors"
              >
                ×
              </button>

              <p className="text-red-300/70 text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-4">
                ⚠ access denied
              </p>
              <p
                className="text-red-300 text-lg sm:text-2xl tracking-[0.2em] uppercase font-bold"
                style={{
                  textShadow:
                    "0 0 14px rgba(239,68,68,0.85), 0 0 32px rgba(239,68,68,0.55)",
                }}
              >
                you haven&rsquo;t earned this yet
              </p>
              <p className="text-red-200/50 italic text-[10px] sm:text-xs tracking-[0.2em] uppercase mt-5">
                door opens with the work
              </p>
            </div>
          </div>,
          document.body
        )}
    </main>
  );
}
