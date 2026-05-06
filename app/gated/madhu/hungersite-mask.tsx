"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Cell = "" | "X" | "O";
type Phase = "masked" | "asking" | "playing";
type Result = null | "win" | "lose" | "draw";

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner(b: Cell[]): "X" | "O" | "draw" | null {
  for (const [a, b2, c] of WIN_LINES) {
    if (b[a] && b[a] === b[b2] && b[a] === b[c]) return b[a] as "X" | "O";
  }
  if (b.every((c) => c !== "")) return "draw";
  return null;
}

function aiMove(board: Cell[]): number {
  const empty = board
    .map((c, i) => (c === "" ? i : -1))
    .filter((i) => i >= 0);
  if (empty.length === 0) return -1;

  for (const i of empty) {
    const trial = [...board];
    trial[i] = "O";
    if (checkWinner(trial) === "O") return i;
  }
  for (const i of empty) {
    const trial = [...board];
    trial[i] = "X";
    if (checkWinner(trial) === "X") return i;
  }
  if (empty.includes(4)) return 4;
  const corners = [0, 2, 6, 8].filter((i) => empty.includes(i));
  if (corners.length) return corners[Math.floor(Math.random() * corners.length)];
  return empty[Math.floor(Math.random() * empty.length)];
}

function emptyBoard(): Cell[] {
  return ["", "", "", "", "", "", "", "", ""];
}

export function HungersiteMask() {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<Phase>("masked");
  const [pwInput, setPwInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [board, setBoard] = useState<Cell[]>(emptyBoard);
  const [result, setResult] = useState<Result>(null);
  const [aiThinking, setAiThinking] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (phase !== "playing" || result !== null || !aiThinking) return;
    const t = setTimeout(() => {
      const next = [...board];
      const move = aiMove(next);
      if (move >= 0) next[move] = "O";
      setBoard(next);
      const w = checkWinner(next);
      if (w === "O") setResult("lose");
      else if (w === "draw") setResult("draw");
      setAiThinking(false);
    }, 450);
    return () => clearTimeout(t);
  }, [aiThinking, phase, result, board]);

  function handleCellClick(i: number) {
    if (result !== null || aiThinking || board[i] !== "") return;
    const next = [...board];
    next[i] = "X";
    setBoard(next);
    const w = checkWinner(next);
    if (w === "X") {
      setResult("win");
      return;
    }
    if (w === "draw") {
      setResult("draw");
      return;
    }
    setAiThinking(true);
  }

  function newGame() {
    setBoard(emptyBoard());
    setResult(null);
    setAiThinking(false);
  }

  function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setPwInput("");
      newGame();
      setPhase("playing");
    }, 350);
  }

  if (!mounted) return null;

  return createPortal(
    <>
      <div
        aria-hidden
        className="fixed inset-0 z-[60] bg-black"
        style={{ pointerEvents: "auto" }}
      />

      {phase === "masked" && (
        <button
          type="button"
          onClick={() => setPhase("asking")}
          aria-label="light switch"
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] block focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60 cursor-pointer transition-transform duration-300 hover:scale-105"
          style={{
            width: "88px",
            height: "144px",
            filter:
              "drop-shadow(0 0 18px rgba(251,191,36,0.95)) drop-shadow(0 0 40px rgba(245,158,11,0.6)) drop-shadow(0 0 80px rgba(217,119,6,0.4))",
          }}
        >
          <svg viewBox="0 0 44 72" className="w-full h-full">
            <rect
              x="2"
              y="2"
              width="40"
              height="68"
              rx="2"
              fill="#1a1a1a"
              stroke="#3f3f46"
              strokeWidth="1"
            />
            <rect x="6" y="6" width="32" height="60" rx="1" fill="#0a0a0a" />
            <rect
              x="14"
              y="38"
              width="16"
              height="22"
              rx="2"
              fill="#fde047"
              stroke="#92400e"
              strokeWidth="1"
            />
            <line
              x1="14"
              y1="44"
              x2="30"
              y2="44"
              stroke="#92400e"
              strokeWidth="0.5"
              opacity="0.6"
            />
            <circle cx="22" cy="14" r="1.4" fill="#27272a" />
            <circle cx="22" cy="62" r="1.4" fill="#27272a" />
          </svg>
        </button>
      )}

      {phase === "asking" && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8 font-mono"
          role="dialog"
          aria-modal="true"
          aria-label="passphrase"
        >
          <button
            type="button"
            tabIndex={-1}
            aria-label="close"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-default"
            onClick={() => {
              setPhase("masked");
              setPwInput("");
            }}
          />
          <form
            onSubmit={handlePasswordSubmit}
            className="relative w-full max-w-md border border-amber-300/50 bg-black px-6 py-8 sm:px-8 sm:py-10 text-center space-y-5"
            style={{
              boxShadow:
                "0 0 40px rgba(251,191,36,0.45), 0 0 90px rgba(245,158,11,0.3)",
            }}
          >
            <p className="text-amber-200/80 italic text-[10px] sm:text-xs tracking-[0.4em] uppercase">
              passphrase
            </p>
            <input
              type="password"
              autoFocus
              autoComplete="off"
              spellCheck={false}
              value={pwInput}
              onChange={(e) => setPwInput(e.target.value)}
              placeholder="········"
              className="w-full bg-amber-950/20 border border-amber-300/40 text-amber-100 text-center text-base sm:text-lg tracking-[0.3em] uppercase rounded px-5 py-3 outline-none focus:border-amber-200/70 focus:bg-amber-950/40 transition-colors placeholder:text-amber-100/25"
            />
            <button
              type="submit"
              disabled={submitting || !pwInput.trim()}
              className="text-amber-100 text-xs sm:text-sm tracking-[0.4em] uppercase border border-amber-300/50 rounded px-6 py-2 hover:bg-amber-900/40 hover:border-amber-200/70 transition-colors disabled:opacity-40"
            >
              {submitting ? "checking..." : "flip"}
            </button>
          </form>
        </div>
      )}

      {phase === "playing" && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8 font-mono"
          role="dialog"
          aria-modal="true"
          aria-label="tic tac toe"
        >
          <div
            className="relative w-full max-w-lg border border-blue-400/45 bg-black px-5 py-7 sm:px-8 sm:py-9 text-center space-y-5"
            style={{
              boxShadow:
                "0 0 50px rgba(59,130,246,0.45), 0 0 110px rgba(59,130,246,0.25)",
            }}
          >
            <p
              className="text-blue-100 text-base sm:text-lg md:text-xl tracking-[0.2em] uppercase"
              style={{
                textShadow:
                  "0 0 12px rgba(96,165,250,0.85), 0 0 28px rgba(59,130,246,0.55)",
              }}
            >
              shall we play a game?
            </p>

            <div className="flex justify-center">
              <div
                className="grid grid-cols-3 gap-0 border-2 border-blue-300/70"
                style={{
                  width: "min(70vw, 320px)",
                  height: "min(70vw, 320px)",
                  boxShadow:
                    "0 0 30px rgba(96,165,250,0.45), inset 0 0 30px rgba(59,130,246,0.18)",
                }}
              >
                {board.map((c, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleCellClick(i)}
                    disabled={
                      result !== null || aiThinking || c !== ""
                    }
                    aria-label={`cell ${i + 1}`}
                    className="border border-blue-300/60 bg-blue-950/15 hover:bg-blue-900/30 transition-colors flex items-center justify-center font-mono text-blue-100 disabled:cursor-default"
                    style={{
                      fontSize: "min(14vw, 64px)",
                      textShadow:
                        "0 0 14px rgba(96,165,250,0.85), 0 0 28px rgba(59,130,246,0.5)",
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="min-h-[2rem] flex items-center justify-center">
              {result === "win" && (
                <p className="text-emerald-300 text-xs sm:text-sm tracking-[0.3em] uppercase">
                  you got me
                </p>
              )}
              {result === "lose" && (
                <p className="text-red-300/80 text-xs sm:text-sm tracking-[0.3em] uppercase">
                  i got you
                </p>
              )}
              {result === "draw" && (
                <p className="text-blue-300/70 text-xs sm:text-sm tracking-[0.3em] uppercase">
                  cat
                </p>
              )}
              {result === null && aiThinking && (
                <p className="text-blue-300/50 text-xs tracking-[0.3em] uppercase">
                  thinking...
                </p>
              )}
              {result === null && !aiThinking && (
                <p className="text-blue-300/50 text-xs tracking-[0.3em] uppercase">
                  your turn
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={newGame}
              className="text-blue-100 text-xs sm:text-sm tracking-[0.4em] uppercase border border-blue-400/50 rounded px-6 py-2 hover:bg-blue-900/40 hover:border-blue-300/70 transition-colors"
            >
              {result === null ? "reset" : "play again"}
            </button>
          </div>
        </div>
      )}
    </>,
    document.body,
  );
}
