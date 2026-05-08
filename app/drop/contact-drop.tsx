"use client";

import { useState } from "react";

export function ContactDrop() {
  const [value, setValue] = useState("");
  const [dropped, setDropped] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = value.trim();
    if (!text) return;
    setDropped(true);
    setValue("");
    setTimeout(() => setDropped(false), 4000);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-md border border-white/30 bg-black/60 px-5 py-5 sm:px-6 sm:py-6 flex flex-col gap-3"
      style={{
        boxShadow:
          "0 0 30px rgba(255,255,255,0.10), 0 0 60px rgba(103,232,249,0.10), inset 0 1px 0 rgba(255,255,255,0.18)",
      }}
    >
      <p className="text-white/80 text-sm sm:text-base italic">
        contact us for more information &mdash; merch dropping any day
        now.
      </p>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="drop your name + email"
          spellCheck={false}
          className="flex-1 bg-black/70 border border-white/25 hover:border-white/45 focus:border-cyan-300/70 rounded-md px-4 py-3 text-white text-sm sm:text-base font-mono tracking-[0.05em] outline-none placeholder:text-white/30 transition-colors"
        />
        <button
          type="submit"
          disabled={!value.trim() || dropped}
          className="text-white text-[10px] sm:text-xs tracking-[0.4em] uppercase border border-white/40 hover:border-white/80 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed rounded-md px-5 py-3 transition-colors"
          style={{
            textShadow: "0 0 8px rgba(255,255,255,0.45)",
          }}
        >
          {dropped ? "● dropped" : "drop ↓"}
        </button>
      </div>
      {dropped ? (
        <p className="text-cyan-300/80 text-[10px] sm:text-xs tracking-[0.3em] uppercase italic">
          ● in the hole. we&rsquo;ll be in touch.
        </p>
      ) : null}
    </form>
  );
}
