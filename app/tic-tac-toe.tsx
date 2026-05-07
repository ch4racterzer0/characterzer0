"use client";

import { useEffect, useState } from "react";

type Cell = "" | "X" | "O";
const LINES: [number, number, number][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function winner(b: Cell[]): Cell | "draw" | null {
  for (const [a, c, d] of LINES) {
    if (b[a] && b[a] === b[c] && b[c] === b[d]) return b[a];
  }
  if (b.every((x) => x !== "")) return "draw";
  return null;
}

function findWinningMove(b: Cell[], who: "X" | "O"): number | null {
  for (let i = 0; i < 9; i++) {
    if (b[i] !== "") continue;
    const next = [...b];
    next[i] = who;
    if (winner(next) === who) return i;
  }
  return null;
}

function aiMove(b: Cell[]): number {
  const win = findWinningMove(b, "O");
  if (win !== null) return win;
  const block = findWinningMove(b, "X");
  if (block !== null) return block;
  if (b[4] === "") return 4;
  for (const c of [0, 2, 6, 8]) if (b[c] === "") return c;
  for (const e of [1, 3, 5, 7]) if (b[e] === "") return e;
  return -1;
}

export function TicTacToe() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(""));
  const [turn, setTurn] = useState<"X" | "O">("X");

  const result = winner(board);
  const locked = result !== null;

  useEffect(() => {
    if (turn !== "O" || locked) return;
    const t = setTimeout(() => {
      const idx = aiMove(board);
      if (idx < 0) return;
      const next = [...board];
      next[idx] = "O";
      setBoard(next);
      setTurn("X");
    }, 380);
    return () => clearTimeout(t);
  }, [turn, board, locked]);

  function play(i: number) {
    if (locked || turn !== "X" || board[i] !== "") return;
    const next = [...board];
    next[i] = "X";
    setBoard(next);
    setTurn("O");
  }

  function reset() {
    setBoard(Array(9).fill(""));
    setTurn("X");
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="grid grid-cols-3 border-2 border-blue-300/70"
        style={{
          width: "min(70vw, 300px)",
          height: "min(70vw, 300px)",
          boxShadow:
            "0 0 30px rgba(96,165,250,0.45), inset 0 0 30px rgba(59,130,246,0.18)",
        }}
      >
        {board.map((c, i) => (
          <button
            key={i}
            type="button"
            onClick={() => play(i)}
            aria-label={`cell ${i + 1}`}
            className="border border-blue-300/60 bg-blue-950/15 hover:bg-blue-900/30 transition-colors flex items-center justify-center font-mono text-blue-100 disabled:cursor-default cursor-pointer"
            style={{
              fontSize: "min(14vw, 60px)",
              textShadow:
                "0 0 14px rgba(96,165,250,0.85), 0 0 28px rgba(59,130,246,0.5)",
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="h-6 text-center text-blue-200/80 text-sm tracking-wide font-mono">
        {result === "X" && "you win."}
        {result === "O" && "you lose."}
        {result === "draw" && "draw."}
        {!result && (turn === "X" ? "your move." : "thinking…")}
      </div>

      <button
        type="button"
        onClick={reset}
        className="text-blue-100/80 hover:text-blue-50 underline underline-offset-4 text-sm tracking-wide cursor-pointer"
      >
        play again
      </button>
    </div>
  );
}
