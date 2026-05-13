"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "neil-gate-unlocked";
const ANSWER = "rowan";

export function NeilGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [value, setValue] = useState("");
  const [wrong, setWrong] = useState(false);

  useEffect(() => {
    setHydrated(true);
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") setUnlocked(true);
    } catch {}
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (value.trim().toLowerCase() === ANSWER) {
      setUnlocked(true);
      try {
        localStorage.setItem(STORAGE_KEY, "1");
      } catch {}
    } else {
      setWrong(true);
      setTimeout(() => setWrong(false), 600);
    }
  }

  if (unlocked) return <>{children}</>;

  if (!hydrated) {
    return (
      <main className="min-h-screen bg-black" aria-hidden />
    );
  }

  return (
    <main className="min-h-screen bg-black text-blue-100 font-mono flex items-center justify-center px-6 py-12">
      <form
        onSubmit={submit}
        className="w-full max-w-sm space-y-6 rounded-2xl border border-blue-400/35 bg-black/80 p-6 sm:p-8"
        style={{
          boxShadow:
            "0 0 60px rgba(59,130,246,0.35), inset 0 1px 0 rgba(147,197,253,0.25)",
        }}
      >
        <div className="space-y-2 text-center">
          <p
            className="text-blue-100 text-3xl sm:text-4xl tracking-[0.18em]"
            style={{
              textShadow:
                "0 0 16px rgba(147,197,253,0.85), 0 0 36px rgba(59,130,246,0.5)",
            }}
          >
            零号
          </p>
          <p className="text-blue-200/65 text-[10px] sm:text-xs tracking-[0.4em] uppercase">
            for neil only
          </p>
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          aria-label="passphrase"
          placeholder="passphrase"
          className={`w-full bg-blue-950/40 border text-blue-100 text-base tracking-wider rounded px-3 py-2.5 outline-none transition-colors placeholder:text-blue-100/30 ${
            wrong
              ? "border-red-400/60 focus:border-red-300/70"
              : "border-blue-400/30 focus:border-blue-300/70"
          }`}
          style={
            wrong
              ? { animation: "neil-gate-shake 0.4s ease-in-out" }
              : undefined
          }
        />

        <button
          type="submit"
          disabled={!value.trim()}
          className="w-full text-blue-100/85 hover:text-blue-100 text-xs sm:text-sm tracking-[0.4em] uppercase border border-blue-400/40 hover:border-blue-300/70 rounded px-4 py-2.5 hover:bg-blue-900/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          enter
        </button>

        <p className="text-blue-300/45 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-center">
          your kid knows the answer
        </p>
      </form>

      <style>{`
        @keyframes neil-gate-shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </main>
  );
}
