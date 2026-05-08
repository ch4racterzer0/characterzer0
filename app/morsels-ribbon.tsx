"use client";

import { useEffect, useState } from "react";

type WordSlot = {
  rotations: string[];
  periodMs: number;
  sep: string;
};

type FixedSlot = {
  fixed: string;
};

type Slot = WordSlot | FixedSlot;

const PHRASE: Slot[] = [
  { rotations: ["RUN", "БЕГИ", "跑", "走る", "달려", "τρέξε"], periodMs: 2100, sep: " " },
  { rotations: ["LIKE", "КАК", "像", "ように", "처럼", "σαν"], periodMs: 2350, sep: " " },
  { rotations: ["AN", "—", "一", "の", "한", "ένα"], periodMs: 1900, sep: " " },
  { rotations: ["ANTELOPE", "АНТИЛОПА", "羚羊", "アンテロープ", "영양", "αντιλόπη"], periodMs: 2700, sep: ", " },
  { rotations: ["OUT", "ВНЕ", "出", "アウト", "밖", "έξω"], periodMs: 2050, sep: " " },
  { rotations: ["OF", "ИЗ", "之", "の", "의", "από"], periodMs: 2450, sep: " " },
  { rotations: ["CONTROL", "КОНТРОЛЯ", "控制", "コントロール", "제어", "έλεγχος"], periodMs: 2600, sep: "... " },
  { rotations: ["THANK", "СПАСИБО", "谢谢", "ありがとう", "감사", "ευχαριστώ"], periodMs: 2200, sep: " " },
  { rotations: ["YOU", "ТЕБЕ", "你", "あなた", "너", "εσύ"], periodMs: 2500, sep: " " },
  { rotations: ["MR", "ГОСП", "先生", "ミスター", "씨", "κύριος"], periodMs: 1950, sep: " " },
  { rotations: ["TREY", "ТРЕЙ", "特雷", "トレイ", "트레이", "ΤΡΕΙ"], periodMs: 2750, sep: ", " },
  { fixed: "character zer0" },
];

function RotatingWord({
  rotations,
  periodMs,
  sep,
}: WordSlot) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setIdx((i) => (i + 1) % rotations.length),
      periodMs,
    );
    return () => clearInterval(id);
  }, [periodMs, rotations.length]);
  return (
    <span>
      {rotations[idx]}
      {sep}
    </span>
  );
}

export function MorselsRibbon() {
  return (
    <div
      aria-hidden
      className="fixed top-0 inset-x-0 z-[40] pointer-events-none overflow-hidden bg-black/60 backdrop-blur-sm border-b border-blue-400/20"
      style={{
        boxShadow: "0 4px 20px -4px rgba(59,130,246,0.20)",
      }}
    >
      <div className="relative h-7 sm:h-8 flex items-center justify-center overflow-hidden px-4">
        <span
          className="font-mono text-blue-200/65 text-[10px] sm:text-xs tracking-[0.2em] truncate"
          style={{ textShadow: "0 0 8px rgba(96,165,250,0.4)" }}
        >
          {PHRASE.map((slot, i) =>
            "fixed" in slot ? (
              <span key={i}>{slot.fixed}</span>
            ) : (
              <RotatingWord
                key={i}
                rotations={slot.rotations}
                periodMs={slot.periodMs}
                sep={slot.sep}
              />
            ),
          )}
        </span>
      </div>
    </div>
  );
}
