"use client";

import { useEffect, useState, type ReactNode } from "react";

const PASS = "jedi";
const KEY = "hungersite-easy-pass";

export function EasyPass({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [error, setError] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    if (sessionStorage.getItem(KEY) === "1") setUnlocked(true);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pwInput.trim().toLowerCase() === PASS) {
      sessionStorage.setItem(KEY, "1");
      setUnlocked(true);
      setError(false);
      setPwInput("");
    } else {
      setError(true);
      setPwInput("");
    }
  }

  if (!hydrated) {
    return <div className="min-h-screen bg-black" />;
  }

  if (unlocked) return <>{children}</>;

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4 font-mono">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border border-blue-400/40 bg-blue-950/30 backdrop-blur-sm rounded-xl px-7 py-8 flex flex-col items-center gap-5"
        style={{
          boxShadow:
            "0 0 50px rgba(59, 130, 246, 0.35), 0 0 110px rgba(59, 130, 246, 0.18), inset 0 1px 0 rgba(147, 197, 253, 0.30)",
        }}
      >
        <label
          htmlFor="hungersite-pass"
          className="text-blue-100/60 italic text-[11px] tracking-[0.3em] uppercase"
        >
          enter passphrase
        </label>
        <input
          id="hungersite-pass"
          type="password"
          autoFocus
          value={pwInput}
          onChange={(e) => {
            setPwInput(e.target.value);
            if (error) setError(false);
          }}
          className="bg-blue-950/40 border border-blue-400/40 text-blue-100 text-center text-base tracking-[0.3em] uppercase rounded-lg px-5 py-3 w-full outline-none focus:border-blue-300/70 focus:bg-blue-950/60 transition-colors placeholder:text-blue-100/30"
          placeholder="········"
        />
        <button
          type="submit"
          className="text-blue-100/80 hover:text-blue-100 text-[11px] tracking-[0.4em] uppercase border border-blue-400/40 rounded-lg px-6 py-2 hover:bg-blue-900/40 transition-colors"
        >
          enter
        </button>
        {error && (
          <p className="text-red-300/80 text-[10px] tracking-[0.2em] uppercase italic">
            denied
          </p>
        )}
      </form>
    </main>
  );
}
