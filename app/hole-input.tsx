"use client";

import { useState } from "react";

export function HoleInput() {
  const [value, setValue] = useState("");
  const [dropping, setDropping] = useState<{ id: number; text: string } | null>(
    null,
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = value.trim();
    if (!text) return;
    setDropping({ id: Date.now(), text });
    setValue("");
    setTimeout(() => setDropping(null), 1800);
  }

  return (
    <div className="hidden sm:block w-full max-w-md sm:max-w-lg">
      <form
        onSubmit={handleSubmit}
        className="relative border border-blue-400/35 bg-blue-950/15 rounded-md px-4 py-3 sm:px-5 sm:py-4 overflow-hidden"
        style={{
          boxShadow:
            "inset 0 0 30px rgba(59,130,246,0.18), 0 0 18px rgba(59,130,246,0.18)",
        }}
      >
        <div className="flex items-baseline justify-between gap-3 mb-2">
          <span
            className="text-blue-100/80 text-[10px] sm:text-xs tracking-[0.4em] uppercase"
            style={{
              textShadow:
                "0 0 10px rgba(96,165,250,0.55), 0 0 22px rgba(59,130,246,0.3)",
            }}
          >
            // the hole
          </span>
          <span className="text-blue-300/45 text-[8px] sm:text-[10px] tracking-[0.3em] uppercase italic">
            drops to eliza
          </span>
        </div>
        <div className="flex items-stretch gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="drop something in"
            aria-label="drop something in the hole"
            className="flex-1 bg-blue-950/40 border border-blue-400/30 text-blue-100 text-sm sm:text-base font-mono tracking-wider rounded px-3 py-2 outline-none focus:border-blue-300/70 focus:bg-blue-950/60 transition-colors placeholder:text-blue-100/30"
          />
          <button
            type="submit"
            disabled={!value.trim()}
            className="text-blue-100/85 hover:text-blue-100 text-[10px] sm:text-xs tracking-[0.4em] uppercase border border-blue-400/40 hover:border-blue-300/70 rounded px-4 py-2 hover:bg-blue-900/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            drop ↓
          </button>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 bottom-[-6px] -translate-x-1/2 w-24 h-3 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0) 100%)",
            boxShadow:
              "0 0 18px rgba(0,0,0,0.85), inset 0 1px 0 rgba(59,130,246,0.35)",
          }}
        />
        {dropping && (
          <div
            key={dropping.id}
            aria-hidden
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-2 text-blue-100 text-sm sm:text-base font-mono tracking-wider whitespace-nowrap"
            style={{
              textShadow:
                "0 0 10px rgba(96,165,250,0.7), 0 0 22px rgba(59,130,246,0.5)",
              animation: "drop-into-hole 1.6s ease-in forwards",
            }}
          >
            {dropping.text}
          </div>
        )}
      </form>
    </div>
  );
}
