"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

const PASS = "jedi";

export function IframeTilePopup({
  trigger,
  triggerClassName,
  triggerStyle,
  ariaLabel,
  src,
  gated = false,
  content,
}: {
  trigger: ReactNode;
  triggerClassName?: string;
  triggerStyle?: React.CSSProperties;
  ariaLabel: string;
  src?: string;
  gated?: boolean;
  content?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [denied, setDenied] = useState(false);
  const [flickerKey, setFlickerKey] = useState(0);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function close() {
    setOpen(false);
    setUnlocked(false);
    setDenied(false);
    setPwInput("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pwInput.trim().toLowerCase() === PASS) {
      setUnlocked(true);
      setDenied(false);
      setPwInput("");
    } else {
      setDenied(true);
      setPwInput("");
      setFlickerKey((k) => k + 1);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }

  const showGate = gated && !unlocked;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={ariaLabel}
        className={triggerClassName}
        style={triggerStyle}
      >
        {trigger}
      </button>

      {open &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
          >
            <button
              type="button"
              tabIndex={-1}
              aria-label="close"
              className="absolute inset-0 bg-black/85 backdrop-blur-sm cursor-default"
              onClick={close}
            />

            <div
              className="relative w-full max-w-6xl h-[88vh] rounded-2xl overflow-hidden border border-blue-400/40 bg-black"
              style={{
                boxShadow:
                  "0 0 80px rgba(59,130,246,0.50), 0 0 160px rgba(59,130,246,0.25), inset 0 1px 0 rgba(147,197,253,0.30)",
              }}
            >
              <button
                type="button"
                onClick={close}
                aria-label="close"
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-blue-950/80 border border-blue-400/40 text-blue-100 text-lg leading-none flex items-center justify-center hover:bg-blue-900/80 transition-colors"
              >
                ×
              </button>

              {showGate ? (
                <form
                  onSubmit={handleSubmit}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6"
                >
                  <label
                    htmlFor={`pw-${ariaLabel}`}
                    className="text-blue-100/60 italic text-xs tracking-[0.3em] uppercase"
                  >
                    enter passphrase
                  </label>
                  <input
                    id={`pw-${ariaLabel}`}
                    ref={inputRef}
                    type="password"
                    autoFocus
                    value={pwInput}
                    onChange={(e) => {
                      setPwInput(e.target.value);
                      if (denied) setDenied(false);
                    }}
                    className="bg-blue-950/40 border border-blue-400/40 text-blue-100 text-center text-base tracking-[0.3em] uppercase rounded-lg px-5 py-3 w-64 outline-none focus:border-blue-300/70 focus:bg-blue-950/60 transition-colors placeholder:text-blue-100/30"
                    placeholder="········"
                  />
                  <button
                    type="submit"
                    className="text-blue-100/80 hover:text-blue-100 text-xs tracking-[0.4em] uppercase border border-blue-400/40 rounded-lg px-6 py-2 hover:bg-blue-900/40 transition-colors"
                  >
                    enter
                  </button>
                  {denied && (
                    <p className="text-red-300/80 text-xs tracking-[0.2em] uppercase italic">
                      denied
                    </p>
                  )}
                </form>
              ) : content ? (
                <div className="absolute inset-0 overflow-y-auto">{content}</div>
              ) : src ? (
                <iframe
                  src={src}
                  title={ariaLabel}
                  className="w-full h-full border-0"
                />
              ) : null}
            </div>
          </div>,
          document.body,
        )}

      {flickerKey > 0 &&
        mounted &&
        createPortal(<SecretWeaponFlicker key={flickerKey} />, document.body)}
    </>
  );
}

function SecretWeaponFlicker() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[100] pointer-events-none"
      style={{
        animation: "secret-flicker 900ms steps(10, end) forwards",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(127,29,29,0.85) 0%, rgba(69,10,10,0.85) 45%, rgba(0,0,0,0.95) 90%)",
          boxShadow: "inset 0 0 200px rgba(239,68,68,0.7)",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 sm:gap-6 px-6 text-center font-mono">
        <div
          className="text-red-300 text-6xl sm:text-9xl"
          style={{
            filter:
              "drop-shadow(0 0 24px rgba(239,68,68,0.85)) drop-shadow(0 0 60px rgba(127,29,29,0.6))",
          }}
        >
          🦅
        </div>
        <div
          className="text-red-100 text-3xl sm:text-5xl tracking-[0.3em] uppercase font-bold"
          style={{
            textShadow:
              "0 0 16px rgba(239,68,68,0.95), 0 0 38px rgba(127,29,29,0.7)",
          }}
        >
          СЕКРЕТНОЕ ОРУЖИЕ
        </div>
        <div className="text-red-200/85 text-xs sm:text-base tracking-[0.4em] uppercase italic">
          oro en paz · fierro en guerra
        </div>
        <div className="text-red-300/65 text-[10px] sm:text-xs tracking-[0.3em] uppercase mt-2">
          // wrong word · she sees you
        </div>
      </div>
    </div>
  );
}
