"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { EndOfRoadModal } from "../../end-of-road-modal";
import { LayerNav } from "../../layer-nav";
import { LightSwitchMask } from "../../light-switch-mask";
import { BandPrompt } from "./band-prompt";
import { LiveCounter } from "./live-counter";
import { COVERS, PodcastCoversModal } from "../../hungersite/podcast-covers";
import { TicTacToeBoard } from "../../hungersite/tic-tac-toe";
import { WarClock } from "../../hungersite/war-clock";

const GLOW = "0 0 6px rgba(248,113,113,0.6), 0 0 14px rgba(239,68,68,0.35)";
const PUNCH_SHADOW =
  "0 0 12px rgba(248,113,113,0.85), 0 0 28px rgba(239,68,68,0.55), 0 0 60px rgba(239,68,68,0.3)";

const FIRSTPLACED_REGISTERED = "2026-05-07T06:35:15Z";

function NavButton({
  label,
  warn = false,
  onClick,
}: {
  label: string;
  warn?: boolean;
  onClick?: () => void;
}) {
  const tone = warn ? "text-red-300/80 hover:text-red-200" : "text-red-300/70 hover:text-red-100";
  const border = warn ? "border-red-400/30 hover:border-red-300/60" : "border-red-400/30 hover:border-red-300/60";
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

const FIRSTPLACED_INITIAL: { label: string; done: boolean }[] = [
  { label: "domain registered", done: true },
  { label: "nameservers pointed", done: false },
  { label: "host live", done: false },
  { label: "landing page", done: false },
  { label: "audio pipeline", done: false },
  { label: "episode 01 recorded", done: false },
  { label: "rss live", done: false },
  { label: "spotify ingest", done: false },
  { label: "apple ingest", done: false },
  { label: "announce", done: false },
];

const FIRSTPLACED_CHECKLIST_KEY = "firstplaced-checklist-v1";
const FIRSTPLACED_UNLOCK_KEY = "firstplaced-checklist-unlocked";
const FIRSTPLACED_PASS = "jedi";

function FirstplacedChecklist() {
  const [items, setItems] = useState(FIRSTPLACED_INITIAL);
  const [unlocked, setUnlocked] = useState(false);
  const [pwOpen, setPwOpen] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(FIRSTPLACED_CHECKLIST_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as { label: string; done: boolean }[];
        setItems((prev) =>
          prev.map((it) => {
            const match = saved.find((s) => s.label === it.label);
            return match ? { ...it, done: match.done } : it;
          }),
        );
      }
    } catch {}
    try {
      if (sessionStorage.getItem(FIRSTPLACED_UNLOCK_KEY) === "1") {
        setUnlocked(true);
      }
    } catch {}
  }, []);

  function tryToggle(label: string) {
    if (!unlocked) {
      setPwOpen(true);
      return;
    }
    setItems((prev) => {
      const next = prev.map((it) =>
        it.label === label ? { ...it, done: !it.done } : it,
      );
      try {
        localStorage.setItem(FIRSTPLACED_CHECKLIST_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }

  function handlePwSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pwInput.trim().toLowerCase() === FIRSTPLACED_PASS) {
      setUnlocked(true);
      setPwOpen(false);
      setPwError(false);
      setPwInput("");
      try {
        sessionStorage.setItem(FIRSTPLACED_UNLOCK_KEY, "1");
      } catch {}
    } else {
      setPwError(true);
      setPwInput("");
    }
  }

  function relock() {
    setUnlocked(false);
    try {
      sessionStorage.removeItem(FIRSTPLACED_UNLOCK_KEY);
    } catch {}
  }

  const doneCount = items.filter((it) => it.done).length;
  const pct = Math.round((doneCount / items.length) * 100);

  return (
    <div
      className="border border-red-400/30 bg-red-950/15 px-4 py-5 sm:px-6 sm:py-7"
      style={{ boxShadow: "inset 0 0 30px rgba(239,68,68,0.18)" }}
    >
      <div className="flex items-center justify-between mb-3 gap-3">
        <p className="text-red-300/55 text-[10px] sm:text-xs tracking-[0.3em] uppercase flex items-center gap-2">
          firstplaced — to first podcast
          <button
            type="button"
            onClick={() => (unlocked ? relock() : setPwOpen(true))}
            aria-label={unlocked ? "lock checklist" : "unlock checklist"}
            className={`text-[10px] tracking-[0.25em] uppercase border px-1.5 py-0.5 rounded-sm transition-colors cursor-pointer ${
              unlocked
                ? "text-emerald-300/80 border-emerald-400/40 hover:text-emerald-200 hover:border-emerald-300/70"
                : "text-red-300/60 border-red-400/30 hover:text-red-200 hover:border-red-300/60"
            }`}
          >
            {unlocked ? "unlocked" : "🔒 locked"}
          </button>
        </p>
        <p
          className="text-red-100 font-mono text-[11px] sm:text-sm tabular-nums tracking-wider"
          style={{
            textShadow:
              "0 0 10px rgba(248,113,113,0.7), 0 0 22px rgba(239,68,68,0.4)",
          }}
        >
          {doneCount}/{items.length} · {pct}%
        </p>
      </div>

      {pwOpen && !unlocked && (
        <form
          onSubmit={handlePwSubmit}
          className="mb-3 flex items-center gap-2 border border-red-400/40 bg-red-950/40 rounded-sm px-2 py-2"
        >
          <input
            type="password"
            autoFocus
            value={pwInput}
            onChange={(e) => {
              setPwInput(e.target.value);
              if (pwError) setPwError(false);
            }}
            placeholder="······"
            className="flex-1 bg-transparent border-b border-red-400/40 text-red-100 text-center text-sm font-mono tracking-[0.3em] uppercase outline-none focus:border-red-300/70 placeholder:text-red-100/30 px-1 py-1"
          />
          <button
            type="submit"
            className="text-red-100/80 hover:text-red-100 text-[10px] tracking-[0.3em] uppercase border border-red-400/40 rounded px-2 py-1 hover:bg-red-900/40"
          >
            enter
          </button>
          <button
            type="button"
            aria-label="cancel"
            onClick={() => {
              setPwOpen(false);
              setPwInput("");
              setPwError(false);
            }}
            className="text-red-300/60 hover:text-red-200 text-base leading-none px-1"
          >
            ×
          </button>
          {pwError && (
            <span className="text-red-300/80 text-[10px] tracking-[0.2em] uppercase italic">
              denied
            </span>
          )}
        </form>
      )}

      <ul className="space-y-1.5 font-mono">
        {items.map((it) => (
          <li key={it.label}>
            <button
              type="button"
              onClick={() => tryToggle(it.label)}
              aria-pressed={it.done}
              aria-disabled={!unlocked}
              title={unlocked ? undefined : "locked — enter passphrase to toggle"}
              className={`w-full flex items-center gap-3 text-left text-[11px] sm:text-sm py-0.5 px-1 -mx-1 rounded-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-red-300/60 transition-colors ${
                unlocked
                  ? "hover:bg-red-900/25 cursor-pointer"
                  : "cursor-not-allowed"
              }`}
            >
              <span
                aria-hidden
                className={`inline-block w-3 leading-none ${it.done ? "text-emerald-300" : "text-red-300/35"}`}
                style={
                  it.done
                    ? { textShadow: "0 0 8px rgba(52,211,153,0.7)" }
                    : undefined
                }
              >
                {it.done ? "▣" : "▢"}
              </span>
              <span
                className={
                  it.done
                    ? "text-red-100/55 line-through decoration-red-300/35"
                    : "text-red-100/85"
                }
              >
                {it.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

type PlanState = "done" | "next" | "future";

const SPHERE_PLAN: {
  n: string;
  name: string;
  items: { label: string; state: PlanState }[];
}[] = [
  {
    n: "01",
    name: "foundation",
    items: [
      { label: "domain registered — firstplaced", state: "done" },
      { label: "nameservers pointed → host", state: "next" },
      { label: "host live (vercel)", state: "next" },
      { label: "landing page — what this is", state: "next" },
    ],
  },
  {
    n: "02",
    name: "identity",
    items: [
      { label: "show name + tagline committed", state: "future" },
      { label: "cover art — 3000×3000 square", state: "future" },
      { label: "voice + tone written down", state: "future" },
    ],
  },
  {
    n: "03",
    name: "production",
    items: [
      { label: "audio pipeline — mic → master", state: "future" },
      { label: "episode 01 recorded", state: "future" },
      { label: "master pass — −16 lufs / −1.5 db peak", state: "future" },
      { label: "transcript searchable", state: "future" },
    ],
  },
  {
    n: "04",
    name: "distribution",
    items: [
      { label: "episode files hosted (blob / cdn)", state: "future" },
      { label: "rss feed live — apple/spotify spec", state: "future" },
      { label: "spotify ingest submitted", state: "future" },
      { label: "apple podcasts connect submitted", state: "future" },
    ],
  },
  {
    n: "05",
    name: "sphere integration",
    items: [
      {
        label: "podcast-factory tile repointed (thedelos → firstplaced)",
        state: "future",
      },
      { label: "madhu — planning + interest list", state: "future" },
      { label: "dripfield — ingest line wired", state: "future" },
      { label: "madhu — workshop / session control", state: "future" },
    ],
  },
  {
    n: "06",
    name: "launch",
    items: [
      { label: "announce — channels lit at once", state: "future" },
      { label: "first 100 listeners measured", state: "future" },
      { label: "episode 02 cadence locked", state: "future" },
    ],
  },
];

function PlanItem({
  label,
  state,
}: {
  label: string;
  state: PlanState;
}) {
  const dot =
    state === "done"
      ? { mark: "▣", text: "text-emerald-300", glow: "0 0 8px rgba(52,211,153,0.7)", row: "text-red-100/55 line-through decoration-red-300/35" }
      : state === "next"
        ? { mark: "▢", text: "text-amber-300", glow: "0 0 8px rgba(251,191,36,0.7)", row: "text-red-100/90" }
        : { mark: "▢", text: "text-red-300/35", glow: "", row: "text-red-100/60" };
  return (
    <li className="flex items-start gap-3 text-[11px] sm:text-sm font-mono">
      <span
        aria-hidden
        className={`inline-block w-3 leading-none mt-0.5 ${dot.text}`}
        style={dot.glow ? { textShadow: dot.glow } : undefined}
      >
        {dot.mark}
      </span>
      <span className={dot.row}>{label}</span>
    </li>
  );
}

function ToTheSpherePlan() {
  return (
    <div
      className="border border-red-400/35 bg-red-950/15 p-4 sm:p-6 space-y-5"
      style={{ boxShadow: "inset 0 0 30px rgba(239,68,68,0.15)" }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p
          className="text-red-100 text-[11px] sm:text-sm tracking-[0.3em] uppercase"
          style={{ textShadow: GLOW }}
        >
          // the plan — bring podcast to the sphere
        </p>
        <p className="text-red-300/45 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase">
          six phases · firstplaced is the spine
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
        {SPHERE_PLAN.map((phase) => (
          <div
            key={phase.n}
            className="border border-red-400/25 bg-black/40 p-3 sm:p-4 space-y-3"
          >
            <div className="flex items-baseline gap-3">
              <span
                className="text-red-100/40 font-mono text-2xl sm:text-3xl tabular-nums tracking-tight"
                style={{ textShadow: GLOW }}
              >
                {phase.n}
              </span>
              <span
                className="text-red-100 text-[11px] sm:text-sm tracking-[0.3em] uppercase"
                style={{ textShadow: GLOW }}
              >
                {phase.name}
              </span>
            </div>
            <ul className="space-y-1.5">
              {phase.items.map((it) => (
                <PlanItem key={it.label} label={it.label} state={it.state} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function statusToneClass(t: (typeof COVERS)[number]["statusTone"]) {
  if (t === "complete") return "text-emerald-300";
  if (t === "active") return "text-cyan-300";
  if (t === "head-start") return "text-amber-300";
  return "text-red-300/55";
}

function statusToneShadow(t: (typeof COVERS)[number]["statusTone"]) {
  if (t === "complete")
    return "0 0 10px rgba(52,211,153,0.7), 0 0 22px rgba(52,211,153,0.35)";
  if (t === "active")
    return "0 0 10px rgba(103,232,249,0.7), 0 0 22px rgba(103,232,249,0.35)";
  if (t === "head-start")
    return "0 0 10px rgba(251,191,36,0.7), 0 0 22px rgba(251,191,36,0.35)";
  return "none";
}

function TerrapinStationRow() {
  return (
    <div
      className="border border-red-400/30 bg-red-950/10 p-4 sm:p-5 space-y-4"
      style={{ boxShadow: "inset 0 0 30px rgba(239,68,68,0.12)" }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p
          className="text-red-100 text-[11px] sm:text-sm tracking-[0.3em] uppercase flex items-center gap-2"
          style={{ textShadow: GLOW }}
        >
          <span
            aria-hidden
            className="block w-2 h-2 rounded-full bg-cyan-300"
            style={{ boxShadow: "0 0 10px rgba(103,232,249,0.85)" }}
          />
          // terrapin station — four podcasts
        </p>
        <p className="text-red-300/45 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase">
          three must drop before the door opens
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {COVERS.map((c) => (
          <div
            key={c.title}
            className="border border-red-400/30 bg-black/50 flex flex-col"
            style={{ boxShadow: "inset 0 0 18px rgba(239,68,68,0.15)" }}
          >
            <div className="relative aspect-video overflow-hidden">
              {c.art}
              <div
                className="absolute inset-x-0 bottom-0 px-3 py-2 flex items-center justify-between gap-2"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.92), rgba(0,0,0,0.55) 70%, rgba(0,0,0,0))",
                }}
              >
                <p
                  className="text-red-100 text-xs sm:text-sm tracking-[0.2em] uppercase truncate"
                  style={{ textShadow: GLOW }}
                >
                  {c.title}
                </p>
                <span
                  className={`text-[9px] tracking-[0.25em] uppercase shrink-0 ${statusToneClass(c.statusTone)}`}
                  style={{ textShadow: statusToneShadow(c.statusTone) }}
                >
                  ● {c.status}
                </span>
              </div>
            </div>
            <p className="text-red-100/75 text-[11px] sm:text-xs leading-relaxed px-3 py-3 sm:px-4 sm:py-4 italic">
              {c.summary}
            </p>
          </div>
        ))}
      </div>
    </div>
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
          : "bg-red-400";
  return (
    <div
      className="relative border border-red-400/35 bg-red-950/15 px-4 py-5 sm:px-5 sm:py-6"
      style={{ boxShadow: "inset 0 0 25px rgba(239,68,68,0.15)" }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`block w-1.5 h-1.5 rounded-full ${dotClass}`}
          style={{ boxShadow: "0 0 8px currentColor" }}
        />
        <span className="text-red-300/55 font-mono text-[9px] sm:text-[10px] tracking-[0.3em] uppercase">
          {role}
        </span>
      </div>
      <p
        className="text-red-100 font-mono text-base sm:text-lg tracking-wider"
        style={{ textShadow: GLOW }}
      >
        {name}
      </p>
      <p className="text-red-300/55 font-mono text-[10px] sm:text-xs tracking-wider uppercase mt-1">
        {affiliation}
      </p>
    </div>
  );
}

type TttState = "idle" | "playing" | "won" | "lost";

export function MadhuRoomShell() {
  const [cursorOn, setCursorOn] = useState(true);
  const [podcastsOpen, setPodcastsOpen] = useState(false);
  const [defconOpen, setDefconOpen] = useState(false);
  const [endOfRoadOpen, setEndOfRoadOpen] = useState(false);
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
  }, [inputBuffer, podcastsOpen, defconOpen, tttState]);

  function handleTtt(idx: number) {
    if (idx === 4) {
      setTttState("won");
    } else {
      setTttState("lost");
    }
  }

  function topNavigate(url: string) {
    try {
      if (window.top && window.top !== window.self) {
        window.top.location.href = url;
        return;
      }
    } catch {}
    window.location.href = url;
  }

  function handleLogout() {
    try {
      sessionStorage.removeItem("core-easy-pass");
    } catch {}
    window.location.reload();
  }

  return (
    <main className="relative min-h-screen bg-black text-red-100 font-mono overflow-hidden">
      <div
        className="max-w-7xl mx-auto p-3 sm:p-5 space-y-3 sm:space-y-4 transition-[filter] duration-700"
        style={{ filter: lit ? "none" : "blur(5px)" }}
      >
        <LayerNav active="madhu" />

        <header className="border border-red-400/35 bg-red-950/20 px-3 py-2 sm:px-5 sm:py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className="block w-2 h-2 rounded-full bg-red-500"
              style={{ boxShadow: "0 0 10px rgba(239,68,68,0.85)" }}
              aria-hidden
            />
            <span
              className="text-red-100 text-xs sm:text-base tracking-[0.3em] uppercase"
              style={{ textShadow: GLOW }}
            >
              madhu
            </span>
            <span className="hidden sm:inline text-red-300/40 text-[10px] tracking-[0.25em] uppercase border-l border-red-400/25 pl-3">
              the podcast control room
            </span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-end">
            <NavButton label="logout" onClick={handleLogout} />
            <NavButton
              label="⚠ destruct"
              warn
              onClick={() => topNavigate("https://www.wafflehouse.com")}
            />
            <NavButton
              label="untether"
              warn
              onClick={() => topNavigate("https://itethered.com")}
            />
          </div>
        </header>

        <div className="flex flex-wrap items-center justify-between gap-3 px-1 text-[10px] sm:text-xs tracking-[0.25em] uppercase">
          <span className="text-red-300/55">
            architect &amp; his tether
          </span>
          <div className="flex items-center gap-3 sm:gap-5">
            <span className="text-red-300/55">
              uplink <span className="text-cyan-300">established</span>
            </span>
            <span className="text-red-300/55">
              status <span className="text-emerald-300">online</span>
            </span>
            <button
              type="button"
              onClick={() => setDefconOpen(true)}
              aria-label="defcon levels"
              className="text-red-300/55 hover:text-red-100 transition-colors cursor-pointer"
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
          <div className="flex items-center justify-between border border-red-400/30 bg-red-950/10 px-3 py-2 text-[10px] sm:text-xs">
            <span className="text-red-300/65 tracking-[0.2em] uppercase">
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
          <div className="flex items-center justify-between border border-red-400/20 bg-red-950/5 px-3 py-2 text-[10px] sm:text-xs">
            <span className="text-red-300/45 tracking-[0.2em] uppercase">
              // interest list — no pending nominations
            </span>
            <span className="text-red-300/40 tracking-[0.2em] uppercase">
              empty
            </span>
          </div>
          <BandPrompt />
        </div>

        <div
          className="relative border border-red-400/40 bg-black px-5 py-7 sm:px-8 sm:py-10 text-center overflow-hidden"
          style={{
            boxShadow:
              "inset 0 0 35px rgba(239,68,68,0.18), 0 0 30px rgba(239,68,68,0.18)",
          }}
        >
          <p
            className="text-red-100 text-xl sm:text-3xl md:text-4xl tracking-[0.18em] sm:tracking-[0.25em]"
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
          <p className="text-red-300/45 italic text-[10px] sm:text-xs tracking-[0.2em] uppercase mt-3">
            wopr.sys &middot; primary terminal
          </p>
        </div>

        <TerrapinStationRow />

        <div className="relative space-y-3 sm:space-y-4">
        <div className="grid md:grid-cols-2 gap-3 sm:gap-4 items-stretch">
          <LiveCounter
            since={FIRSTPLACED_REGISTERED}
            label="firstplaced — initial podcast factory · registered may 7, 2026"
          />
          <FirstplacedChecklist />
        </div>

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

        <ToTheSpherePlan />

        <div
          className="border border-red-400/35 bg-red-950/15 p-4 sm:p-6 space-y-3"
          style={{ boxShadow: "inset 0 0 30px rgba(239,68,68,0.15)" }}
        >
          <p className="text-red-300/55 text-[10px] sm:text-xs tracking-[0.3em] uppercase">
            // system boot — may 5, 2026
          </p>
          <p className="text-red-100/90 text-sm sm:text-base leading-relaxed">
            &gt; a man entered the room. heard the question. said yes. picked
            the only winning move that mattered &mdash; the one that left
            the bottle un-broken and the goose unharmed. this is where the
            work lives.
          </p>
          <p
            className="text-red-100 text-sm sm:text-base tracking-wider uppercase"
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
            <span className="text-red-300/65">active now</span>
            <span className="text-red-300/40">···</span>
          </div>
          <span className="text-red-300/40">// updates every 30s</span>
        </div>

        <footer className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] uppercase text-red-300/40 text-center pt-4">
          madhu &middot; podcast control &middot; the only winning move
        </footer>

          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 top-1/2 pointer-events-none flex items-end justify-center pb-4 sm:pb-10"
            style={{ perspective: "900px" }}
          >
            <div
              className="font-mono text-cyan-300 text-base sm:text-2xl md:text-3xl tracking-[0.4em] sm:tracking-[0.5em] uppercase text-center whitespace-nowrap leading-[1.6]"
              style={{
                transform: "rotateX(62deg) rotateZ(-1deg)",
                transformOrigin: "center bottom",
                textShadow:
                  "0 0 8px rgba(103,232,249,1), 0 0 22px rgba(103,232,249,0.85), 0 0 48px rgba(34,211,238,0.65), 0 0 110px rgba(6,182,212,0.35)",
                filter: "blur(0.4px)",
                opacity: 0.95,
              }}
            >
              <div style={{ opacity: 0.55 }}>people sometimes make mistakes.</div>
              <div style={{ opacity: 0.78 }}>yes they do.</div>
              <div style={{ opacity: 1 }}>shall we play a game?</div>
            </div>
          </div>

          <LightSwitchMask
            tone="red"
            contained
            onSwitch={() => setEndOfRoadOpen(true)}
          />
        </div>
      </div>

      {podcastsOpen && (
        <PodcastCoversModal onClose={() => setPodcastsOpen(false)} />
      )}

      {endOfRoadOpen && (
        <EndOfRoadModal onClose={() => setEndOfRoadOpen(false)} />
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
              className="relative w-full max-w-2xl border border-red-400/45 bg-black"
              style={{
                boxShadow:
                  "0 0 50px rgba(239,68,68,0.4), 0 0 110px rgba(239,68,68,0.22)",
              }}
            >
              <header className="flex items-center justify-between border-b border-red-400/30 px-4 py-3 sm:px-6">
                <span
                  className="text-red-100 text-[10px] sm:text-xs tracking-[0.3em] uppercase"
                  style={{ textShadow: GLOW }}
                >
                  // defense readiness condition
                </span>
                <button
                  type="button"
                  onClick={() => setDefconOpen(false)}
                  aria-label="close"
                  className="w-8 h-8 rounded-full border border-red-400/40 text-red-100 text-base leading-none flex items-center justify-center hover:bg-red-900/50"
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
                    className={`border ${d.n === 3 ? "border-amber-400/50 bg-amber-950/15" : "border-red-400/20 bg-red-950/10"} px-4 py-3 flex items-start gap-4`}
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
                      <p className="text-red-200/80 text-[11px] sm:text-sm leading-relaxed mt-1">
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
              className={`relative w-full max-w-lg border ${tttState === "lost" ? "border-red-500/50" : tttState === "won" ? "border-emerald-400/50" : "border-red-400/45"} bg-black px-5 py-6 sm:px-8 sm:py-8`}
              style={{
                boxShadow:
                  tttState === "lost"
                    ? "0 0 50px rgba(239,68,68,0.45), 0 0 110px rgba(127,29,29,0.4)"
                    : tttState === "won"
                      ? "0 0 50px rgba(52,211,153,0.45), 0 0 110px rgba(6,95,70,0.4)"
                      : "0 0 50px rgba(239,68,68,0.45), 0 0 110px rgba(239,68,68,0.25)",
              }}
            >
              <button
                type="button"
                onClick={() => setTttState("idle")}
                aria-label="close"
                className="absolute top-2 right-2 sm:top-3 sm:right-3 w-8 h-8 rounded-full border border-red-400/40 text-red-100 text-lg leading-none flex items-center justify-center hover:bg-red-900/50"
              >
                ×
              </button>

              {tttState === "playing" && (
                <div className="space-y-5">
                  <p
                    className="text-red-100 text-base sm:text-lg md:text-xl tracking-wider text-center"
                    style={{ textShadow: PUNCH_SHADOW }}
                  >
                    HOW ABOUT A GAME OF TIC TAC TOE?
                  </p>
                  <TicTacToeBoard onFirstClick={handleTtt} />
                  <p className="text-red-300/40 italic text-xs tracking-[0.2em] uppercase text-center">
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
                  <p className="text-red-200/85 text-sm sm:text-base italic">
                    the only winning move is not to play.
                  </p>
                  <p className="text-red-300/55 text-[10px] sm:text-xs tracking-[0.25em] uppercase pt-2">
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
