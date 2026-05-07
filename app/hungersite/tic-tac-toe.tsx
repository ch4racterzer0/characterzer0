"use client";

import { useState } from "react";

type CellState = " " | "X" | "O";

export function TicTacToeBoard({
  onFirstClick,
  disabled = false,
}: {
  onFirstClick: (idx: number) => void;
  disabled?: boolean;
}) {
  const [cells, setCells] = useState<CellState[]>(Array(9).fill(" "));

  function handleClick(idx: number) {
    if (disabled || cells[idx] !== " ") return;
    const next = [...cells];
    next[idx] = "X";
    setCells(next);
    onFirstClick(idx);
  }

  return (
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
        {cells.map((c, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleClick(i)}
            disabled={disabled}
            aria-label={`cell ${i + 1}`}
            className="border border-blue-300/60 bg-blue-950/15 hover:bg-blue-900/30 transition-colors flex items-center justify-center font-mono text-blue-100 disabled:cursor-default"
            style={{
              fontSize: "min(14vw, 64px)",
              textShadow:
                "0 0 14px rgba(96,165,250,0.85), 0 0 28px rgba(59,130,246,0.5)",
            }}
          >
            {c !== " " ? c : ""}
          </button>
        ))}
      </div>
    </div>
  );
}
