"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Cell = " " | "X" | "O";
type Result = "X" | "O" | "draw" | null;

const LINES: ReadonlyArray<readonly [number, number, number]> = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function winner(b: Cell[]): "X" | "O" | null {
  for (const [a, c, d] of LINES) {
    if (b[a] !== " " && b[a] === b[c] && b[a] === b[d]) return b[a] as "X" | "O";
  }
  return null;
}

function evaluate(b: Cell[]): Result {
  const w = winner(b);
  if (w) return w;
  if (b.every((c) => c !== " ")) return "draw";
  return null;
}

function minimax(
  b: Cell[],
  turn: "O" | "X",
): { score: number; idx: number } {
  const w = winner(b);
  if (w === "O") return { score: 1, idx: -1 };
  if (w === "X") return { score: -1, idx: -1 };
  if (b.every((c) => c !== " ")) return { score: 0, idx: -1 };

  let best = {
    score: turn === "O" ? -Infinity : Infinity,
    idx: -1,
  };
  for (let i = 0; i < 9; i++) {
    if (b[i] !== " ") continue;
    const next = [...b];
    next[i] = turn;
    const { score } = minimax(next, turn === "O" ? "X" : "O");
    if (
      (turn === "O" && score > best.score) ||
      (turn === "X" && score < best.score)
    ) {
      best = { score, idx: i };
    }
  }
  return best;
}

type ToneKey = "blue" | "yellow";

const TONES: Record<
  ToneKey,
  {
    border: string;
    text: string;
    text40: string;
    text55: string;
    text80: string;
    cellBorder: string;
    cellBg: string;
    cellHover: string;
    boardBorder: string;
    boardShadow: string;
    glowText: string;
    btnBorder: string;
    btnHover: string;
    panelShadow: string;
    punchShadow: string;
    accent: string;
  }
> = {
  blue: {
    border: "border-blue-400/45",
    text: "text-blue-100",
    text40: "text-blue-300/40",
    text55: "text-blue-300/55",
    text80: "text-blue-100/80",
    cellBorder: "border-blue-300/60",
    cellBg: "bg-blue-950/15",
    cellHover: "hover:bg-blue-900/30",
    boardBorder: "border-blue-300/70",
    boardShadow:
      "0 0 30px rgba(96,165,250,0.45), inset 0 0 30px rgba(59,130,246,0.18)",
    glowText:
      "0 0 14px rgba(96,165,250,0.85), 0 0 28px rgba(59,130,246,0.5)",
    btnBorder: "border-blue-400/40",
    btnHover: "hover:bg-blue-900/50 hover:text-blue-100",
    panelShadow:
      "0 0 50px rgba(59,130,246,0.45), 0 0 110px rgba(59,130,246,0.25)",
    punchShadow:
      "0 0 12px rgba(96,165,250,0.85), 0 0 28px rgba(59,130,246,0.55), 0 0 60px rgba(59,130,246,0.3)",
    accent: "text-cyan-300",
  },
  yellow: {
    border: "border-yellow-400/45",
    text: "text-yellow-100",
    text40: "text-yellow-300/40",
    text55: "text-yellow-300/55",
    text80: "text-yellow-100/80",
    cellBorder: "border-yellow-300/60",
    cellBg: "bg-yellow-950/15",
    cellHover: "hover:bg-yellow-900/30",
    boardBorder: "border-yellow-300/70",
    boardShadow:
      "0 0 30px rgba(250,204,21,0.45), inset 0 0 30px rgba(234,179,8,0.18)",
    glowText:
      "0 0 14px rgba(250,204,21,0.85), 0 0 28px rgba(234,179,8,0.5)",
    btnBorder: "border-yellow-400/40",
    btnHover: "hover:bg-yellow-900/50 hover:text-yellow-100",
    panelShadow:
      "0 0 50px rgba(234,179,8,0.45), 0 0 110px rgba(234,179,8,0.25)",
    punchShadow:
      "0 0 12px rgba(250,204,21,0.85), 0 0 28px rgba(234,179,8,0.55), 0 0 60px rgba(234,179,8,0.3)",
    accent: "text-yellow-300",
  },
};

export function EndlessTicTacToe({
  tone,
  onClose,
}: {
  tone: ToneKey;
  onClose: () => void;
}) {
  const t = TONES[tone];
  const [mounted, setMounted] = useState(false);
  const [board, setBoard] = useState<Cell[]>(() => Array(9).fill(" "));
  const [score, setScore] = useState({ wins: 0, losses: 0, draws: 0 });
  const [thinking, setThinking] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const result = evaluate(board);

  useEffect(() => {
    if (result) return;
    const xCount = board.filter((c) => c === "X").length;
    const oCount = board.filter((c) => c === "O").length;
    if (xCount <= oCount) return;
    setThinking(true);
    const id = setTimeout(
      () => {
        const { idx } = minimax(board, "O");
        if (idx >= 0) {
          setBoard((prev) => {
            if (prev[idx] !== " ") return prev;
            const next = [...prev];
            next[idx] = "O";
            return next;
          });
        }
        setThinking(false);
      },
      350 + Math.random() * 300,
    );
    return () => {
      clearTimeout(id);
      setThinking(false);
    };
  }, [board, result]);

  useEffect(() => {
    if (!result) return;
    setScore((s) => {
      if (result === "X") return { ...s, wins: s.wins + 1 };
      if (result === "O") return { ...s, losses: s.losses + 1 };
      return { ...s, draws: s.draws + 1 };
    });
  }, [result]);

  function handleClick(i: number) {
    if (result || thinking || board[i] !== " ") return;
    const next = [...board];
    next[i] = "X";
    setBoard(next);
  }

  function newGame() {
    setBoard(Array(9).fill(" "));
  }

  if (!mounted) return null;

  const headline =
    result === "X"
      ? "you got me."
      : result === "O"
        ? "i win this round."
        : result === "draw"
          ? "a strange game."
          : thinking
            ? "thinking…"
            : "your move.";

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8 font-mono"
      role="dialog"
      aria-modal="true"
      aria-label="endless tic tac toe"
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="close"
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-default"
      />
      <div
        className={`relative w-full max-w-lg border ${t.border} bg-black px-5 py-6 sm:px-8 sm:py-8`}
        style={{ boxShadow: t.panelShadow }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="close"
          className={`absolute top-2 right-2 sm:top-3 sm:right-3 w-8 h-8 rounded-full border ${t.btnBorder} ${t.text} text-lg leading-none flex items-center justify-center ${t.btnHover}`}
        >
          ×
        </button>

        <div className="space-y-5">
          <p
            className={`${t.text} text-base sm:text-lg md:text-xl tracking-wider text-center`}
            style={{ textShadow: t.punchShadow }}
          >
            {headline}
          </p>

          <div className="flex justify-center">
            <div
              className={`grid grid-cols-3 gap-0 border-2 ${t.boardBorder}`}
              style={{
                width: "min(70vw, 320px)",
                height: "min(70vw, 320px)",
                boxShadow: t.boardShadow,
              }}
            >
              {board.map((c, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleClick(i)}
                  disabled={!!result || thinking || c !== " "}
                  aria-label={`cell ${i + 1}`}
                  className={`border ${t.cellBorder} ${t.cellBg} ${t.cellHover} transition-colors flex items-center justify-center font-mono ${t.text} disabled:cursor-default`}
                  style={{
                    fontSize: "min(14vw, 64px)",
                    textShadow: t.glowText,
                  }}
                >
                  {c !== " " ? c : ""}
                </button>
              ))}
            </div>
          </div>

          <div
            className={`flex items-center justify-center gap-3 sm:gap-4 ${t.text55} text-[10px] sm:text-xs tracking-[0.3em] uppercase tabular-nums`}
          >
            <span>w {score.wins}</span>
            <span className={t.text40}>·</span>
            <span>l {score.losses}</span>
            <span className={t.text40}>·</span>
            <span>d {score.draws}</span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={newGame}
              disabled={!result && board.every((c) => c === " ")}
              className={`${t.text80} text-[10px] sm:text-xs tracking-[0.3em] uppercase border ${t.btnBorder} ${t.btnHover} disabled:opacity-40 disabled:cursor-not-allowed px-4 py-2 rounded-sm transition-colors`}
            >
              {result ? "play again" : "reset"}
            </button>
          </div>

          <p
            className={`${t.text40} italic text-[10px] sm:text-xs tracking-[0.2em] uppercase text-center`}
          >
            esc to close · play as long as you want
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
