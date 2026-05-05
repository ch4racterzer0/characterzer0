"use client";

import { useEffect, useState } from "react";

const SCRIPT: string[] = [
  "> CONNECTING TO WOPR.SYS",
  "> ACQUIRING TELEMETRY...",
  "> SATELLITE LINKS: ESTABLISHED",
  "> PRIMARY OBJECTIVE QUEUED",
  "",
  "GREETINGS, PROFESSOR FALKEN.",
  "",
  "A STRANGE GAME.",
  "THE ONLY WINNING MOVE IS NOT TO PLAY.",
  "",
  "HOW ABOUT A NICE GAME OF CHESS?",
  "",
  "SHALL WE PLAY A GAME?",
];

const PUNCHLINE_INDEX = SCRIPT.length - 1;
const CHAR_MS = 38;
const PAUSE_BLANK = 250;
const PAUSE_LINE = 380;
const PAUSE_PUNCHLINE = 900;

const PUNCHLINE_CLASS =
  "text-blue-100 text-base sm:text-lg md:text-xl tracking-wider mt-3";
const PUNCHLINE_STYLE: React.CSSProperties = {
  textShadow: "0 0 12px rgba(96,165,250,0.85), 0 0 28px rgba(59,130,246,0.55)",
};

export function WarTerminal() {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);
  const [cursorOn, setCursorOn] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (done) return;
    if (lineIdx > PUNCHLINE_INDEX) {
      setDone(true);
      return;
    }
    const line = SCRIPT[lineIdx];
    if (charIdx < line.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), CHAR_MS);
      return () => clearTimeout(t);
    }
    const wait =
      line === ""
        ? PAUSE_BLANK
        : lineIdx === PUNCHLINE_INDEX
          ? PAUSE_PUNCHLINE
          : PAUSE_LINE;
    const t = setTimeout(() => {
      setLineIdx((i) => i + 1);
      setCharIdx(0);
    }, wait);
    return () => clearTimeout(t);
  }, [lineIdx, charIdx, done]);

  useEffect(() => {
    const id = setInterval(() => setCursorOn((c) => !c), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative">
      {done && (
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? "expand terminal" : "collapse terminal"}
          className="absolute -top-7 right-0 sm:-top-8 font-mono text-blue-300/60 hover:text-blue-100 text-[10px] sm:text-[11px] tracking-[0.25em] uppercase border border-blue-400/30 hover:border-blue-300/60 px-2 py-0.5 rounded transition-colors"
        >
          {collapsed ? "[ + expand ]" : "[ − collapse ]"}
        </button>
      )}

      {collapsed ? (
        <div
          className={PUNCHLINE_CLASS + " min-h-[3rem]"}
          style={PUNCHLINE_STYLE}
        >
          SHALL WE PLAY A GAME?
          <span className={`ml-1 ${cursorOn ? "opacity-100" : "opacity-0"}`}>
            ▮
          </span>
        </div>
      ) : (
        <div className="font-mono text-blue-300 text-sm sm:text-base leading-relaxed whitespace-pre-wrap min-h-[16rem]">
          {SCRIPT.slice(0, lineIdx).map((l, i) => {
            const isPunch = i === PUNCHLINE_INDEX;
            return (
              <div
                key={i}
                className={isPunch ? PUNCHLINE_CLASS : ""}
                style={isPunch ? PUNCHLINE_STYLE : undefined}
              >
                {l || " "}
                {isPunch && done && (
                  <span
                    className={`ml-1 ${cursorOn ? "opacity-100" : "opacity-0"}`}
                  >
                    ▮
                  </span>
                )}
              </div>
            );
          })}

          {!done && lineIdx <= PUNCHLINE_INDEX && (
            <div
              className={lineIdx === PUNCHLINE_INDEX ? PUNCHLINE_CLASS : ""}
              style={lineIdx === PUNCHLINE_INDEX ? PUNCHLINE_STYLE : undefined}
            >
              {SCRIPT[lineIdx].slice(0, charIdx) || " "}
              <span className={cursorOn ? "opacity-100" : "opacity-0"}>▮</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
