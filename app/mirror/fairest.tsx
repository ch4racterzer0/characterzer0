"use client";

import { useEffect, useState } from "react";

const UNLOCK_KEY = "cz0-fairest";
const UNLOCK_EVENT = "character-zero:fairest-unlock";
const ANSWER = "mckinley";

export function Fairest() {
  const [value, setValue] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [wrong, setWrong] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(UNLOCK_KEY) === "1") setUnlocked(true);
    } catch {}
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (value.trim().toLowerCase() === ANSWER) {
      try {
        sessionStorage.setItem(UNLOCK_KEY, "1");
      } catch {}
      window.dispatchEvent(new CustomEvent(UNLOCK_EVENT));
      setUnlocked(true);
      setWrong(false);
    } else {
      setWrong(true);
      setValue("");
    }
  }

  if (unlocked) {
    return (
      <section className="space-y-2 border border-blue-100/15 rounded-lg px-5 py-4">
        <p className="text-blue-100/55 text-[10px] tracking-[0.4em] uppercase italic">
          the mirror answered
        </p>
        <p className="text-blue-100/85 text-sm tracking-wide">
          go look on the wall. something new is there for you.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-3 border border-blue-100/15 rounded-lg px-5 py-4">
      <p className="text-blue-100/55 text-[10px] tracking-[0.4em] uppercase italic">
        ask the mirror
      </p>
      <p className="text-blue-100/80 text-sm sm:text-base tracking-wide italic">
        who is the fairest of them all?
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-row items-center gap-3"
      >
        <input
          type="text"
          autoComplete="off"
          spellCheck={false}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (wrong) setWrong(false);
          }}
          placeholder="…"
          aria-label="answer the mirror"
          className="flex-1 bg-blue-950/40 border border-blue-400/30 text-blue-100 text-sm tracking-[0.25em] lowercase rounded-md px-3 py-2 outline-none focus:border-blue-300/60 focus:bg-blue-950/60 transition-colors placeholder:text-blue-100/30"
        />
        <button
          type="submit"
          className="text-blue-100/80 hover:text-blue-100 text-[10px] tracking-[0.4em] uppercase border border-blue-400/40 rounded-md px-4 py-2 hover:bg-blue-900/40 transition-colors"
        >
          answer
        </button>
      </form>
      {wrong && (
        <p className="text-blue-200/55 text-[10px] tracking-[0.3em] uppercase italic">
          the mirror is quiet
        </p>
      )}
    </section>
  );
}
