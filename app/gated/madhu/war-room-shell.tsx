"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BandPrompt } from "./band-prompt";
import { LiveCounter } from "./live-counter";
import { PodcastCoversModal } from "./podcast-covers";
import { TicTacToeBoard } from "./tic-tac-toe";
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

type TttState = "idle" | "playing" | "won" | "lost";

export function WarRoomShell() {
  const [cursorOn, setCursorOn] = useState(true);
  const [locked, setLocked] = useState(false);
  const [podcastsOpen, setPodcastsOpen] = useState(false);
  const [defconOpen, setDefconOpen] = useState(false);
  const [tttState, setTttState] = useState<TttState>("idle");
  const [inputBuffer, setInputBuffer] = useState("");
  const [mounted, setMounted] = useState(false);
  const lit = true;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const id = setInterval(() => setCursorOn((c) => !c), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!locked) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLocked(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [locked]);

  useEffect(() => {
    if (!defconOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDefconOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [defconOpen]);

  useEffect(() => {
    if (
      podcastsOpen ||
      defconOpen ||
      locked ||
      tttState === "playing" ||
      tttState === "won" ||
      tttState === "lost"
    )
      return;
    const onKey = (e: KeyboardEvent) => {
      const isTextInput =
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement;
      if (isTextInput) return;
      if (e.key === "Enter") {
        if (inputBuffer.trim().toLowerCase() === "yes") {
          setTttState("playing");
        }
        setInputBuffer("");
      } else if (e.key === "Backspace") {
        setInputBuffer((b) => b.slice(0, -1));
      } else if (e.key.length === 1 && /[a-zA-Z0-9 ]/.test(e.key)) {
        setInputBuffer((b) => (b + e.key).slice(0, 24));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inputBuffer, podcastsOpen, defconOpen, locked, tttState]);

  function handleTtt(idx: number) {
    if (idx === 4) {
      setTttState("won");
    } else {
      setTttState("lost");
    }
  }

  function handleLogout() {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "/api/madhu/logout";
    document.body.appendChild(form);
    form.submit();
  }

  return (
    <main className="relative min-h-screen bg-black text-blue-100 font-mono overflow-hidden">
      <div
        className="max-w-7xl mx-auto p-3 sm:p-5 space-y-3 sm:space-y-4 transition-[filter] duration-700"
        style={{ filter: lit ? "none" : "blur(5px)" }}
      >
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
            <NavButton label="▶ dripfield" onClick={() => setLocked(true)} />
            <NavButton label="hungersite" onClick={() => setLocked(true)} />
            <NavButton label="logout" onClick={handleLogout} />
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
            <button
              type="button"
              onClick={() => setDefconOpen(true)}
              aria-label="defcon levels"
              className="text-blue-300/55 hover:text-blue-100 transition-colors cursor-pointer"
            >
              defcon{" "}
              <span
                className="text-amber-300 font-bold"
                style={{
                  textShadow:
                    "0 0 10px rgba(251,191,36,0.7), 0 0 22px rgba(251,191,36,0.35)",
                }}
              >
                3
              </span>
            </button>
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
              onClick={() => setPodcastsOpen(true)}
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
          <BandPrompt />
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
            {inputBuffer && (
              <span className="ml-3 text-cyan-200 text-base sm:text-2xl md:text-3xl">
                {inputBuffer}
              </span>
            )}
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

      {locked &&
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
              onClick={() => setLocked(false)}
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
                onClick={() => setLocked(false)}
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

      {podcastsOpen && (
        <PodcastCoversModal onClose={() => setPodcastsOpen(false)} />
      )}

      {defconOpen &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8 font-mono"
            role="dialog"
            aria-modal="true"
            aria-label="defcon levels"
          >
            <button
              type="button"
              tabIndex={-1}
              aria-label="close"
              className="absolute inset-0 bg-black/85 backdrop-blur-sm cursor-default"
              onClick={() => setDefconOpen(false)}
            />
            <div
              className="relative w-full max-w-2xl border border-blue-400/45 bg-black"
              style={{
                boxShadow:
                  "0 0 50px rgba(59,130,246,0.4), 0 0 110px rgba(59,130,246,0.22)",
              }}
            >
              <header className="flex items-center justify-between border-b border-blue-400/30 px-4 py-3 sm:px-6">
                <span
                  className="text-blue-100 text-[10px] sm:text-xs tracking-[0.3em] uppercase"
                  style={{ textShadow: GLOW }}
                >
                  // defense readiness condition
                </span>
                <button
                  type="button"
                  onClick={() => setDefconOpen(false)}
                  aria-label="close"
                  className="w-8 h-8 rounded-full border border-blue-400/40 text-blue-100 text-base leading-none flex items-center justify-center hover:bg-blue-900/50"
                >
                  ×
                </button>
              </header>
              <div className="p-5 sm:p-7 space-y-3">
                {[
                  {
                    n: 5,
                    name: "fade out",
                    desc: "peacetime. normal readiness.",
                    color: "text-emerald-300",
                    shadow:
                      "0 0 10px rgba(52,211,153,0.7), 0 0 22px rgba(52,211,153,0.35)",
                  },
                  {
                    n: 4,
                    name: "double take",
                    desc: "above normal readiness. intelligence watch increased.",
                    color: "text-cyan-300",
                    shadow:
                      "0 0 10px rgba(103,232,249,0.7), 0 0 22px rgba(103,232,249,0.35)",
                  },
                  {
                    n: 3,
                    name: "round house",
                    desc: "increased force readiness above normal. air force ready in 15 minutes. ← currently here.",
                    color: "text-amber-300",
                    shadow:
                      "0 0 10px rgba(251,191,36,0.7), 0 0 22px rgba(251,191,36,0.35)",
                  },
                  {
                    n: 2,
                    name: "fast pace",
                    desc: "next step to nuclear war. armed forces ready to deploy in 6 hours.",
                    color: "text-orange-400",
                    shadow:
                      "0 0 10px rgba(251,146,60,0.75), 0 0 22px rgba(251,146,60,0.4)",
                  },
                  {
                    n: 1,
                    name: "cocked pistol",
                    desc: "nuclear war is imminent or has begun.",
                    color: "text-red-400",
                    shadow:
                      "0 0 12px rgba(239,68,68,0.85), 0 0 28px rgba(239,68,68,0.5)",
                  },
                ].map((d) => (
                  <div
                    key={d.n}
                    className={`border ${d.n === 3 ? "border-amber-400/50 bg-amber-950/15" : "border-blue-400/20 bg-blue-950/10"} px-4 py-3 flex items-start gap-4`}
                  >
                    <span
                      className={`${d.color} font-bold text-2xl sm:text-3xl tabular-nums leading-none w-10 shrink-0`}
                      style={{ textShadow: d.shadow }}
                    >
                      {d.n}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`${d.color} text-xs sm:text-sm tracking-[0.25em] uppercase`}
                        style={{ textShadow: d.shadow }}
                      >
                        defcon {d.n} &middot; {d.name}
                      </p>
                      <p className="text-blue-200/80 text-[11px] sm:text-sm leading-relaxed mt-1">
                        {d.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>,
          document.body
        )}

      {(tttState === "playing" || tttState === "won" || tttState === "lost") &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8 font-mono"
            role="dialog"
            aria-modal="true"
            aria-label="tic tac toe"
          >
            <button
              type="button"
              tabIndex={-1}
              aria-label="close"
              className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-default"
              onClick={() => setTttState("idle")}
            />
            <div
              className={`relative w-full max-w-lg border ${tttState === "lost" ? "border-red-500/50" : tttState === "won" ? "border-emerald-400/50" : "border-blue-400/45"} bg-black px-5 py-6 sm:px-8 sm:py-8`}
              style={{
                boxShadow:
                  tttState === "lost"
                    ? "0 0 50px rgba(239,68,68,0.45), 0 0 110px rgba(127,29,29,0.4)"
                    : tttState === "won"
                      ? "0 0 50px rgba(52,211,153,0.45), 0 0 110px rgba(6,95,70,0.4)"
                      : "0 0 50px rgba(59,130,246,0.45), 0 0 110px rgba(59,130,246,0.25)",
              }}
            >
              <button
                type="button"
                onClick={() => setTttState("idle")}
                aria-label="close"
                className="absolute top-2 right-2 sm:top-3 sm:right-3 w-8 h-8 rounded-full border border-blue-400/40 text-blue-100 text-lg leading-none flex items-center justify-center hover:bg-blue-900/50"
              >
                ×
              </button>

              {tttState === "playing" && (
                <div className="space-y-5">
                  <p
                    className="text-blue-100 text-base sm:text-lg md:text-xl tracking-wider text-center"
                    style={{ textShadow: PUNCH_SHADOW }}
                  >
                    HOW ABOUT A GAME OF TIC TAC TOE?
                  </p>
                  <TicTacToeBoard onFirstClick={handleTtt} />
                  <p className="text-blue-300/40 italic text-xs tracking-[0.2em] uppercase text-center">
                    you go first
                  </p>
                </div>
              )}

              {tttState === "won" && (
                <div className="text-center space-y-4 py-3">
                  <p
                    className="text-emerald-300 text-xl sm:text-2xl tracking-[0.2em] uppercase font-bold"
                    style={{
                      textShadow:
                        "0 0 14px rgba(52,211,153,0.85), 0 0 32px rgba(52,211,153,0.55)",
                    }}
                  >
                    a strange game.
                  </p>
                  <p className="text-blue-200/85 text-sm sm:text-base italic">
                    the only winning move is not to play.
                  </p>
                  <p className="text-blue-300/55 text-[10px] sm:text-xs tracking-[0.25em] uppercase pt-2">
                    you found the move
                  </p>
                </div>
              )}

              {tttState === "lost" && (
                <div className="text-center space-y-3 py-3">
                  <p className="text-red-300/70 text-[10px] sm:text-xs tracking-[0.3em] uppercase">
                    ⚠ access denied
                  </p>
                  <p
                    className="text-red-300 text-lg sm:text-2xl tracking-[0.2em] uppercase font-bold"
                    style={{
                      textShadow:
                        "0 0 14px rgba(239,68,68,0.85), 0 0 32px rgba(239,68,68,0.55)",
                    }}
                  >
                    wrong opening move
                  </p>
                  <p className="text-red-200/50 italic text-[10px] sm:text-xs tracking-[0.2em] uppercase mt-3">
                    a strange game. learn its lesson.
                  </p>
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </main>
  );
}
