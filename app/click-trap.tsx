"use client";

import { useState } from "react";
import { TicTacToe } from "./tic-tac-toe";

export function ClickTrap() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {!open && (
        <button
          type="button"
          aria-label="character zer0 is away"
          onClick={() => setOpen(true)}
          className="fixed inset-0 z-[60] bg-transparent cursor-default"
          style={{ border: "0" }}
        />
      )}

      {open && (
        <div
          aria-modal="true"
          role="dialog"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 px-4"
        >
          <div
            className="relative max-w-md w-full rounded-xl border border-blue-400/40 bg-blue-950/60 p-6 sm:p-8 flex flex-col gap-5"
            style={{
              boxShadow:
                "0 0 35px rgba(59,130,246,0.30), inset 0 1px 0 rgba(147,197,253,0.20)",
            }}
          >
            <p
              className="text-blue-50 text-lg sm:text-xl font-light text-center leading-relaxed tracking-wide"
              style={{
                textShadow:
                  "0 0 14px rgba(180,210,255,0.8), 0 0 28px rgba(96,165,250,0.5)",
              }}
            >
              will be back later
              <br />
              <span className="text-blue-200/80 italic">— character zer0</span>
            </p>

            <TicTacToe />
          </div>
        </div>
      )}
    </>
  );
}
