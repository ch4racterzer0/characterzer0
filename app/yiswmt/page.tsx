"use client";

import { useEffect } from "react";
import { McKinleyTile } from "../mckinley-tile";

const UNLOCK_KEY = "cz0-fairest";
const UNLOCK_EVENT = "character-zero:fairest-unlock";

export default function YiswmtPage() {
  useEffect(() => {
    // On yiswmt the tribute is the front door — no riddle gate.
    try {
      sessionStorage.setItem(UNLOCK_KEY, "1");
    } catch {}
    window.dispatchEvent(new CustomEvent(UNLOCK_EVENT));
  }, []);

  return (
    <main className="relative z-10 isolate min-h-screen flex flex-col items-center justify-between gap-10 pt-[46vh] pb-16 px-4 bg-transparent">
      <header className="flex flex-col items-center gap-5 text-center">
        <h1
          className="text-white text-5xl sm:text-7xl tracking-[0.28em] font-light"
          style={{
            textShadow:
              "0 0 18px rgba(219,234,254,0.75), 0 0 42px rgba(96,165,250,0.45), 0 0 90px rgba(59,130,246,0.25)",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        >
          YISWMT
        </h1>
        <p
          className="text-white/80 italic text-sm sm:text-base tracking-[0.25em] lowercase"
          style={{ textShadow: "0 0 10px rgba(191,219,254,0.45)" }}
        >
          your image stays with me tonight
        </p>
      </header>

      <section className="flex flex-col items-center gap-4">
        <p className="text-white/45 text-[9px] sm:text-[10px] tracking-[0.4em] uppercase italic">
          // first tribute
        </p>
        <McKinleyTile />
      </section>

      <footer className="flex flex-col items-center gap-1 pt-4">
        <p className="text-white/35 text-[9px] sm:text-[10px] tracking-[0.4em] uppercase italic">
          every tribute is family-asked, family-owned, family-can-withdraw
        </p>
        <p className="text-white/25 text-[8px] sm:text-[9px] tracking-[0.4em] uppercase">
          YISWMT
        </p>
      </footer>
    </main>
  );
}
