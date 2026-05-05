"use client";

import { useEffect, useState } from "react";
import { TicTacToeBoard } from "./tic-tac-toe";
import { WarClock } from "./war-clock";
import { WarTerminal } from "./war-terminal";

const GLOW = "0 0 6px rgba(96,165,250,0.6), 0 0 14px rgba(59,130,246,0.35)";

type Phase =
  | "typing"
  | "awaiting-input"
  | "tictactoe"
  | "transitioning"
  | "unlocked"
  | "kicked";

function ScreenFrame({
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  children,
}: {
  topLeft: string;
  topRight: string;
  bottomLeft: string;
  bottomRight: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative border border-blue-400/35 bg-blue-950/15 aspect-[4/3] overflow-hidden"
      style={{ boxShadow: "inset 0 0 30px rgba(59,130,246,0.18)" }}
    >
      <div className="absolute top-2 left-3 right-3 flex justify-between text-[9px] sm:text-[10px] font-mono tracking-[0.2em] uppercase text-blue-300/75 z-10">
        <span>{topLeft}</span>
        <span className="text-cyan-300">{topRight}</span>
      </div>
      {children}
      <div className="absolute bottom-2 left-3 right-3 flex justify-between text-[9px] sm:text-[10px] font-mono tracking-[0.15em] uppercase text-blue-300/55 z-10">
        <span>{bottomLeft}</span>
        <span>{bottomRight}</span>
      </div>
    </div>
  );
}

function ScreenRadar() {
  return (
    <ScreenFrame
      topLeft="alaskan air command"
      topRight="● active"
      bottomLeft="elmendorf afb"
      bottomRight="track 0327"
    >
      <svg
        viewBox="0 0 200 150"
        className="absolute inset-0 w-full h-full"
        style={{ filter: "drop-shadow(0 0 4px rgba(96,165,250,0.45))" }}
      >
        {[15, 30, 50, 70].map((r) => (
          <circle
            key={r}
            cx="100"
            cy="80"
            r={r}
            fill="none"
            stroke="#93c5fd"
            strokeWidth="0.5"
            opacity={1 - r / 110}
          />
        ))}
        <line x1="100" y1="0" x2="100" y2="150" stroke="#93c5fd" strokeWidth="0.3" opacity="0.35" />
        <line x1="0" y1="80" x2="200" y2="80" stroke="#93c5fd" strokeWidth="0.3" opacity="0.35" />
        <line x1="40" y1="20" x2="160" y2="140" stroke="#93c5fd" strokeWidth="0.2" opacity="0.2" />
        <line x1="160" y1="20" x2="40" y2="140" stroke="#93c5fd" strokeWidth="0.2" opacity="0.2" />
        <line x1="100" y1="80" x2="158" y2="42" stroke="#67e8f9" strokeWidth="0.7" opacity="0.85" />
        {[
          [120, 60],
          [80, 100],
          [140, 90],
          [70, 60],
          [125, 105],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="1.5" fill="#67e8f9" />
            <circle cx={x} cy={y} r="3.5" fill="none" stroke="#67e8f9" strokeWidth="0.4" opacity="0.5" />
          </g>
        ))}
        <text x="6" y="140" fill="#93c5fd" fontFamily="monospace" fontSize="5" opacity="0.5">
          61.2°N 149.9°W
        </text>
      </svg>
    </ScreenFrame>
  );
}

function ScreenContinental() {
  const points: [number, number, string][] = [
    [50, 80, "SEA"],
    [55, 110, "LAX"],
    [110, 95, "DEN"],
    [135, 75, "CHI"],
    [165, 70, "BOS"],
    [170, 95, "DC"],
    [155, 120, "ATL"],
    [115, 130, "HOU"],
  ];
  return (
    <ScreenFrame
      topLeft="continental // targets"
      topRight="● armed"
      bottomLeft="38 stations"
      bottomRight="t-32:14"
    >
      <svg
        viewBox="0 0 200 150"
        className="absolute inset-0 w-full h-full"
        style={{ filter: "drop-shadow(0 0 4px rgba(96,165,250,0.45))" }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={20 + i * 20} y1="20" x2={20 + i * 20} y2="135" stroke="#93c5fd" strokeWidth="0.2" opacity="0.18" />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`h${i}`} x1="20" y1={30 + i * 20} x2="180" y2={30 + i * 20} stroke="#93c5fd" strokeWidth="0.2" opacity="0.18" />
        ))}
        <path
          d="M 35 90 Q 60 70 90 75 T 150 70 Q 180 75 180 90 Q 175 115 150 125 Q 110 135 75 125 Q 45 120 35 105 Z"
          fill="none"
          stroke="#93c5fd"
          strokeWidth="0.6"
          opacity="0.65"
        />
        {[
          ["50,80", "165,70"],
          ["55,110", "170,95"],
          ["110,95", "165,70"],
          ["135,75", "115,130"],
        ].map(([from, to], i) => {
          const [fx, fy] = from.split(",").map(Number);
          const [tx, ty] = to.split(",").map(Number);
          const cx = (fx + tx) / 2;
          const cy = Math.min(fy, ty) - 30;
          return (
            <path
              key={i}
              d={`M ${fx} ${fy} Q ${cx} ${cy} ${tx} ${ty}`}
              fill="none"
              stroke="#67e8f9"
              strokeWidth="0.5"
              opacity="0.7"
              strokeDasharray="2 2"
            />
          );
        })}
        {points.map(([x, y, label], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="1.6" fill="#67e8f9" />
            <circle cx={x} cy={y} r="3" fill="none" stroke="#67e8f9" strokeWidth="0.4" opacity="0.5" />
            <text x={x + 4} y={y - 3} fill="#bfdbfe" fontFamily="monospace" fontSize="4.5" opacity="0.85">
              {label}
            </text>
          </g>
        ))}
      </svg>
    </ScreenFrame>
  );
}

function ScreenInbound() {
  return (
    <ScreenFrame
      topLeft="eurasia // inbound vector"
      topRight="● tracking"
      bottomLeft="14 contacts"
      bottomRight="vec 0094"
    >
      <svg
        viewBox="0 0 200 150"
        className="absolute inset-0 w-full h-full"
        style={{ filter: "drop-shadow(0 0 4px rgba(96,165,250,0.45))" }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={20 + i * 20} y1="20" x2={20 + i * 20} y2="135" stroke="#93c5fd" strokeWidth="0.2" opacity="0.18" />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`h${i}`} x1="20" y1={30 + i * 20} x2="180" y2={30 + i * 20} stroke="#93c5fd" strokeWidth="0.2" opacity="0.18" />
        ))}
        <path
          d="M 90 60 Q 120 50 145 55 Q 170 65 165 85 Q 160 105 140 110 Q 120 115 105 105 Q 90 95 88 80 Z"
          fill="none"
          stroke="#93c5fd"
          strokeWidth="0.6"
          opacity="0.65"
        />
        {[
          ["120,60", "20,75"],
          ["140,80", "10,95"],
          ["155,75", "15,60"],
          ["130,95", "25,110"],
          ["110,70", "5,80"],
          ["145,100", "20,125"],
        ].map(([from, to], i) => {
          const [fx, fy] = from.split(",").map(Number);
          const [tx, ty] = to.split(",").map(Number);
          const cx = (fx + tx) / 2;
          const cy = Math.min(fy, ty) - 22;
          return (
            <path
              key={i}
              d={`M ${fx} ${fy} Q ${cx} ${cy} ${tx} ${ty}`}
              fill="none"
              stroke="#67e8f9"
              strokeWidth="0.5"
              opacity="0.78"
              strokeDasharray="3 2"
            />
          );
        })}
        {[
          [120, 60],
          [140, 80],
          [155, 75],
          [130, 95],
          [110, 70],
          [145, 100],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="1.6" fill="#67e8f9" />
            <circle cx={x} cy={y} r="3" fill="none" stroke="#67e8f9" strokeWidth="0.4" opacity="0.5" />
          </g>
        ))}
      </svg>
    </ScreenFrame>
  );
}

function PanelOperatives() {
  const ops = [
    { name: "TOULOUSE", role: "GOPI", status: "INSIDE", since: "04.24" },
    { name: "NENE", role: "ISOLATED", status: "STANDBY", since: "—" },
    { name: "BRANT", role: "MESSENGER", status: "STANDBY", since: "—" },
    { name: "ICCULUS", role: "OPERATIVE", status: "ACTIVE", since: "05.05" },
  ];
  return (
    <ScreenFrame
      topLeft="operatives // matrix"
      topRight="● live"
      bottomLeft="4 confirmed"
      bottomRight="key system"
    >
      <div className="absolute inset-0 pt-7 pb-7 px-3 flex flex-col justify-around font-mono text-[10px] sm:text-[11px]">
        {ops.map((o) => (
          <div key={o.name} className="flex items-center justify-between border-b border-blue-400/15 py-1">
            <div className="flex items-center gap-2">
              <span
                className={`block w-1.5 h-1.5 rounded-full ${
                  o.status === "INSIDE"
                    ? "bg-cyan-300"
                    : o.status === "ACTIVE"
                      ? "bg-emerald-400"
                      : "bg-blue-400/40"
                }`}
                style={
                  o.status !== "STANDBY"
                    ? { boxShadow: "0 0 8px currentColor" }
                    : undefined
                }
              />
              <span className="text-blue-100 tracking-wider">{o.name}</span>
            </div>
            <div className="flex items-center gap-3 text-blue-300/55">
              <span className="hidden sm:inline tracking-wider">{o.role}</span>
              <span className="tabular-nums">{o.since}</span>
            </div>
          </div>
        ))}
      </div>
    </ScreenFrame>
  );
}

function PanelMissions() {
  const missions = [
    { id: "M-01", target: "REISNER, A.", state: "DELIVERED" },
    { id: "M-02", target: "BRUNEAU, M.", state: "DELIVERED" },
    { id: "M-03", target: "ALTMAN, S.", state: "OPEN" },
    { id: "M-04", target: "MUSK, E.", state: "QUEUED" },
    { id: "M-05", target: "PICHAI, S.", state: "QUEUED" },
  ];
  return (
    <ScreenFrame
      topLeft="missions // open letters"
      topRight="● live"
      bottomLeft="2 delivered"
      bottomRight="3 in queue"
    >
      <div className="absolute inset-0 pt-7 pb-7 px-3 flex flex-col justify-around font-mono text-[10px] sm:text-[11px]">
        {missions.map((m) => (
          <div key={m.id} className="flex items-center justify-between border-b border-blue-400/15 py-1">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-blue-300/55 tabular-nums shrink-0">{m.id}</span>
              <span className="text-blue-100 tracking-wider truncate">{m.target}</span>
            </div>
            <span
              className={`tracking-wider shrink-0 ml-2 ${
                m.state === "DELIVERED"
                  ? "text-emerald-300"
                  : m.state === "OPEN"
                    ? "text-amber-300"
                    : "text-blue-300/55"
              }`}
            >
              {m.state}
            </span>
          </div>
        ))}
      </div>
    </ScreenFrame>
  );
}

function PanelNetwork() {
  return (
    <ScreenFrame
      topLeft="network // carriers"
      topRight="● steady"
      bottomLeft="propagation 00:32"
      bottomRight="last push 14m"
    >
      <div className="absolute inset-0 pt-7 pb-7 px-3 flex flex-col justify-around font-mono">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[9px] tracking-[0.25em] uppercase text-blue-300/55">
              parked carriers
            </div>
            <div
              className="text-blue-100 text-3xl sm:text-4xl tracking-wider mt-1"
              style={{ textShadow: GLOW }}
            >
              20<span className="text-blue-300/40 text-base ml-0.5">+</span>
              <span className="text-blue-300/40 text-base ml-1">M</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[9px] tracking-[0.25em] uppercase text-blue-300/55">
              connected
            </div>
            <div
              className="text-cyan-300 text-2xl sm:text-3xl tracking-wider mt-1"
              style={{
                textShadow:
                  "0 0 12px rgba(103,232,249,0.7), 0 0 28px rgba(103,232,249,0.35)",
              }}
            >
              42
            </div>
          </div>
        </div>
        <div className="space-y-1 text-[10px] sm:text-[11px] text-blue-300/70">
          <div className="flex justify-between border-b border-blue-400/15 py-1">
            <span>characterzer0.com</span>
            <span className="text-cyan-300">primary</span>
          </div>
          <div className="flex justify-between border-b border-blue-400/15 py-1">
            <span>thedelos.com</span>
            <span className="text-blue-300/60">arm 02</span>
          </div>
          <div className="flex justify-between border-b border-blue-400/15 py-1">
            <span>fullsendbash.com</span>
            <span className="text-blue-300/60">arm 03</span>
          </div>
          <div className="flex justify-between py-1">
            <span>+18 mirrors</span>
            <span className="text-blue-300/40">silent</span>
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
}

function StatBox({
  label,
  value,
  unit,
  tone = "blue",
}: {
  label: string;
  value: string;
  unit?: string;
  tone?: "blue" | "amber" | "red" | "green";
}) {
  const toneClass =
    tone === "amber"
      ? "text-amber-300"
      : tone === "red"
        ? "text-red-400"
        : tone === "green"
          ? "text-emerald-300"
          : "text-blue-100";
  const toneShadow =
    tone === "amber"
      ? "0 0 10px rgba(251,191,36,0.65), 0 0 22px rgba(251,191,36,0.35)"
      : tone === "red"
        ? "0 0 10px rgba(239,68,68,0.7), 0 0 22px rgba(239,68,68,0.4)"
        : tone === "green"
          ? "0 0 10px rgba(52,211,153,0.65), 0 0 22px rgba(52,211,153,0.35)"
          : GLOW;
  return (
    <div className="border border-blue-400/30 bg-blue-950/15 px-3 py-2 sm:px-4 sm:py-3">
      <div className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] uppercase text-blue-300/55">
        {label}
      </div>
      <div
        className={`font-mono tabular-nums ${toneClass} text-lg sm:text-2xl tracking-wider mt-1`}
        style={{ textShadow: toneShadow }}
      >
        {value}
        {unit && (
          <span className="text-blue-300/40 text-xs sm:text-sm ml-1">{unit}</span>
        )}
      </div>
    </div>
  );
}

export function WarRoomShell() {
  const [phase, setPhase] = useState<Phase>("typing");
  const [inputBuffer, setInputBuffer] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (phase !== "awaiting-input") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (inputBuffer.trim().toLowerCase() === "yes") {
          setPhase("tictactoe");
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
  }, [phase, inputBuffer]);

  function handleTicTacToe(idx: number) {
    if (idx === 4) {
      setPhase("transitioning");
      setOpacity(0);
      setTimeout(() => {
        setUnlocked(true);
        requestAnimationFrame(() => {
          setOpacity(1);
          setPhase("unlocked");
        });
      }, 1100);
    } else {
      setPhase("kicked");
      setTimeout(() => {
        try {
          if (window.top) {
            window.top.location.href = "https://characterzer0.com/";
            return;
          }
        } catch {}
        window.location.href = "https://characterzer0.com/";
      }, 1700);
    }
  }

  return (
    <main className="relative min-h-screen bg-black text-blue-100 font-mono overflow-hidden">
      <div
        className="max-w-7xl mx-auto p-3 sm:p-5 space-y-3 sm:space-y-4"
        style={{ opacity, transition: "opacity 1100ms ease-in-out" }}
      >
        <header className="border border-blue-400/35 bg-blue-950/20 px-3 py-2 sm:px-5 sm:py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className="block w-2 h-2 rounded-full bg-red-500"
              style={{ boxShadow: "0 0 10px rgba(239,68,68,0.85)" }}
              aria-hidden
            />
            <span
              className="text-blue-100 text-[11px] sm:text-sm tracking-[0.3em] uppercase"
              style={{ textShadow: GLOW }}
            >
              {unlocked ? "madhu // operative deck" : "madhu // war room"}
            </span>
          </div>
          <div className="flex items-center gap-4 sm:gap-6 text-[10px] sm:text-xs tracking-wider uppercase">
            <span className="text-blue-300/60">
              station <span className="text-blue-100">07</span>
            </span>
            <span className="text-blue-300/60">
              defcon{" "}
              {unlocked ? (
                <span
                  className="text-emerald-300 font-bold"
                  style={{
                    textShadow:
                      "0 0 10px rgba(52,211,153,0.7), 0 0 22px rgba(52,211,153,0.35)",
                  }}
                >
                  5
                </span>
              ) : (
                <span
                  className="text-amber-300 font-bold"
                  style={{
                    textShadow:
                      "0 0 10px rgba(251,191,36,0.7), 0 0 22px rgba(251,191,36,0.35)",
                  }}
                >
                  3
                </span>
              )}
            </span>
            <WarClock />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {unlocked ? (
            <>
              <PanelOperatives />
              <PanelMissions />
              <PanelNetwork />
            </>
          ) : (
            <>
              <ScreenRadar />
              <ScreenContinental />
              <ScreenInbound />
            </>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {unlocked ? (
            <>
              <StatBox label="stations connected" value="42" tone="green" />
              <StatBox label="active operatives" value="4" tone="green" />
              <StatBox label="parked carriers" value="20+" unit="m" />
              <StatBox label="uplink" value="LIVE" tone="green" />
            </>
          ) : (
            <>
              <StatBox label="stations connected" value="42" />
              <StatBox label="active operatives" value="1" />
              <StatBox label="parked carriers" value="20+" unit="m" />
              <StatBox label="t-minus uplink" value="00:08:14" tone="amber" />
            </>
          )}
        </div>

        <div
          className="border border-blue-400/35 bg-black px-4 py-5 sm:px-6 sm:py-7"
          style={{
            boxShadow:
              "inset 0 0 35px rgba(59,130,246,0.15), 0 0 30px rgba(59,130,246,0.18)",
          }}
        >
          <div className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] uppercase text-blue-300/55 mb-3">
            wopr.sys &middot; primary terminal
          </div>

          {phase === "typing" || phase === "awaiting-input" ? (
            <WarTerminal
              onComplete={() => setPhase("awaiting-input")}
              inputBuffer={inputBuffer}
            />
          ) : phase === "tictactoe" ? (
            <div className="space-y-5 min-h-[16rem]">
              <p
                className="text-blue-100 text-base sm:text-lg md:text-xl tracking-wider text-center"
                style={{
                  textShadow:
                    "0 0 12px rgba(96,165,250,0.85), 0 0 28px rgba(59,130,246,0.55)",
                }}
              >
                HOW ABOUT A GAME OF TIC TAC TOE?
              </p>
              <TicTacToeBoard onFirstClick={handleTicTacToe} />
              <p className="text-blue-300/40 italic text-xs tracking-[0.2em] uppercase text-center">
                you go first
              </p>
            </div>
          ) : phase === "transitioning" ? (
            <div className="min-h-[16rem] flex items-center justify-center">
              <p className="text-cyan-200 text-sm sm:text-base tracking-[0.3em] uppercase font-mono">
                reconfiguring...
              </p>
            </div>
          ) : phase === "unlocked" ? (
            <div className="space-y-4 min-h-[16rem]">
              <p
                className="text-emerald-300 text-base sm:text-lg md:text-xl tracking-wider"
                style={{
                  textShadow:
                    "0 0 12px rgba(52,211,153,0.85), 0 0 28px rgba(52,211,153,0.5)",
                }}
              >
                A STRANGE GAME.
              </p>
              <p className="text-blue-200 text-sm sm:text-base leading-relaxed">
                you picked the only winning move. the room recognizes you.
              </p>
              <p className="text-blue-300/70 text-sm sm:text-base leading-relaxed">
                operative deck above shows what the war room was always
                masking. roster. missions. carrier network.
              </p>
              <p className="text-blue-300/50 italic text-sm sm:text-base">
                the goose is out.
              </p>
            </div>
          ) : (
            <div className="min-h-[16rem] flex flex-col items-center justify-center gap-3">
              <p
                className="text-red-400 text-2xl sm:text-3xl md:text-4xl font-bold tracking-[0.3em] uppercase"
                style={{
                  textShadow:
                    "0 0 14px rgba(239,68,68,0.85), 0 0 32px rgba(239,68,68,0.55)",
                }}
              >
                access denied
              </p>
              <p className="text-red-300/70 text-xs sm:text-sm tracking-[0.25em] uppercase italic">
                wrong opening move
              </p>
            </div>
          )}
        </div>

        <footer className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] uppercase text-blue-300/40 text-center pt-2">
          {unlocked
            ? "madhu · operative deck · the only winning move was made"
            : "madhu · war room · the only winning move"}
        </footer>
      </div>
    </main>
  );
}
