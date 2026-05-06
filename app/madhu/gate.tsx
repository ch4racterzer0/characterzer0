"use client";

import { ReactNode, useEffect, useState } from "react";

const KEY = "madhu_unlocked";
const PHRASE = "slow";

export function Gate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      if (sessionStorage.getItem(KEY) === "1") setUnlocked(true);
    } catch {}
  }, []);

  if (!mounted) {
    return (
      <main className="min-h-screen bg-black" />
    );
  }

  if (!unlocked) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center px-6 py-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim().toLowerCase() === PHRASE) {
              try {
                sessionStorage.setItem(KEY, "1");
              } catch {}
              setUnlocked(true);
              setInput("");
              setError(false);
            } else {
              setError(true);
              setInput("");
            }
          }}
          className="flex flex-col items-center gap-5"
        >
          <p className="text-blue-100/50 italic text-[10px] tracking-[0.4em] uppercase">
            phrase
          </p>
          <input
            type="password"
            autoFocus
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (error) setError(false);
            }}
            className="bg-blue-950/40 border border-blue-400/40 text-blue-100 text-center text-base tracking-[0.3em] uppercase rounded-lg px-5 py-3 w-64 outline-none focus:border-blue-300/70 focus:bg-blue-950/60 transition-colors placeholder:text-blue-100/25"
            placeholder="········"
            autoComplete="off"
            spellCheck={false}
          />
          <button
            type="submit"
            className="text-blue-100/80 hover:text-blue-100 text-xs tracking-[0.4em] uppercase border border-blue-400/40 rounded-lg px-6 py-2 hover:bg-blue-900/40 transition-colors"
          >
            enter
          </button>
          {error && (
            <p className="text-red-300/80 text-[10px] tracking-[0.3em] uppercase italic">
              denied
            </p>
          )}
        </form>
      </main>
    );
  }

  return <>{children}</>;
}
