"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const PITCH_PARAGRAPHS = [
  "you have reached the end of the road.",
  "from this point forward we make no exceptions. the cost is one parked url. that's it.",
  "if you have an unused domain — anything — point it at us for a year. it's free to do. we don't take it. you continue to own it. you're just lending us the property.",
  "if you don't have a spare, the cheap places are below. less than ten dollars buys you in.",
  "what you get: access to see the plan. participation in the plan is optional. if you want to build, build with us. if not, we don't give a shit. we just want the url.",
  "every now and then come back and check that we aren't abusing your trust. if we are, you flip one switch and the contract ends. no more parking. you only ever had ten dollars on the table.",
  "what you've spent: less than the price of a beer. what we've borrowed: a sliver of internet real estate that wasn't doing anything for you anyway. what we do with it: aim it at the beasts that live up here. the kind of work that needs a thousand quiet doors, not one loud one.",
];

const CHINESE_CHARS =
  "网站域名链接终端边缘核心系统电脑神经协议密码服务器代码文件路径区块光速时间空间机器人智能党中央监视控制服从命令国家档案审查身份认证人民同志组织部署计划目标";

const REGISTRARS = [
  {
    name: "porkbun",
    href: "https://porkbun.com",
    price: "≈ $9.13 / yr",
    note: "recommended. flat pricing, free whois privacy, free email forwarding, fast api. we can wire one to us in two minutes.",
  },
  {
    name: "cloudflare registrar",
    href: "https://www.cloudflare.com/products/registrar/",
    price: "at cost · ≈ $9.15 / yr",
    note: "no markup. zero. cloudflare account required. only renews; can't always do new registrations.",
  },
  {
    name: "namesilo",
    href: "https://www.namesilo.com",
    price: "≈ $9.95 / yr",
    note: "no upsells in checkout. free whois privacy. been around forever.",
  },
  {
    name: "spaceship",
    href: "https://www.spaceship.com",
    price: "≈ $5.98 first yr · $9.48 renew",
    note: "newer, namecheap-owned, aggressive intro pricing. fine if you renew elsewhere.",
  },
];

type Glitch = {
  text: string;
  color: "green" | "red";
  growing: boolean;
  targetLen: number;
};

export function EndOfRoadModal({ onClose }: { onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState(0);
  const [typed, setTyped] = useState("");
  const [glitch, setGlitch] = useState<Glitch | null>(null);
  const tickRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  useEffect(() => {
    if (phase >= PITCH_PARAGRAPHS.length) return;
    const target = PITCH_PARAGRAPHS[phase];

    if (glitch) {
      if (glitch.growing) {
        if (glitch.text.length < glitch.targetLen) {
          tickRef.current = setTimeout(() => {
            const ch =
              CHINESE_CHARS[Math.floor(Math.random() * CHINESE_CHARS.length)];
            setGlitch({ ...glitch, text: glitch.text + ch });
          }, 35 + Math.random() * 25);
        } else {
          tickRef.current = setTimeout(() => {
            setGlitch({ ...glitch, growing: false });
          }, 120 + Math.random() * 90);
        }
      } else {
        if (glitch.text.length > 0) {
          tickRef.current = setTimeout(() => {
            setGlitch({ ...glitch, text: glitch.text.slice(0, -1) });
          }, 22 + Math.random() * 18);
        } else {
          tickRef.current = setTimeout(() => setGlitch(null), 60);
        }
      }
      return () => {
        if (tickRef.current) clearTimeout(tickRef.current);
      };
    }

    if (typed.length >= target.length) {
      tickRef.current = setTimeout(() => {
        setTyped("");
        setPhase((p) => p + 1);
      }, 700);
      return () => {
        if (tickRef.current) clearTimeout(tickRef.current);
      };
    }

    const i = typed.length;
    const shouldGlitch =
      i > 4 && i < target.length - 1 && Math.random() < 0.045;
    if (shouldGlitch) {
      const targetLen = 6 + Math.floor(Math.random() * 2);
      const color: "green" | "red" = Math.random() < 0.45 ? "green" : "red";
      tickRef.current = setTimeout(() => {
        setGlitch({ text: "", color, growing: true, targetLen });
      }, 30);
    } else {
      tickRef.current = setTimeout(() => {
        setTyped(target.slice(0, i + 1));
      }, 18 + Math.random() * 22);
    }

    return () => {
      if (tickRef.current) clearTimeout(tickRef.current);
    };
  }, [typed, phase, glitch]);

  if (!mounted) return null;

  const settled = PITCH_PARAGRAPHS.slice(0, phase);
  const current = phase < PITCH_PARAGRAPHS.length ? typed : "";
  const finished = phase >= PITCH_PARAGRAPHS.length;

  return createPortal(
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6 font-mono"
      role="dialog"
      aria-modal="true"
      aria-label="end of the road"
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="close"
        className="absolute inset-0 bg-black/95 backdrop-blur-sm cursor-default"
        onClick={onClose}
      />

      <div
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto border border-white/40 bg-black"
        style={{
          boxShadow:
            "0 0 60px rgba(255,255,255,0.18), 0 0 140px rgba(255,255,255,0.10), inset 0 1px 0 rgba(255,255,255,0.20)",
        }}
      >
        <header className="sticky top-0 z-10 bg-black/95 border-b border-white/30 px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span
              aria-hidden
              className="block w-2 h-2 rounded-full bg-red-500 animate-pulse"
              style={{ boxShadow: "0 0 10px rgba(239,68,68,0.85)" }}
            />
            <span
              className="text-white text-[10px] sm:text-xs tracking-[0.4em] uppercase truncate"
              style={{ textShadow: "0 0 12px rgba(255,255,255,0.55)" }}
            >
              // end of the road · transmission inbound
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="close"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/40 text-white text-lg leading-none flex items-center justify-center hover:bg-white/10 hover:border-white/60 transition-colors shrink-0"
          >
            ×
          </button>
        </header>

        <div className="relative z-10 px-5 py-6 sm:px-8 sm:py-8 space-y-7">
          <div className="-mx-5 sm:-mx-8 -mt-6 sm:-mt-8 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/end-of-road/hero-doorway.png"
              alt=""
              className="w-full h-40 sm:h-56 object-cover object-center select-none pointer-events-none"
              draggable={false}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0) 30%, rgba(0,0,0,0.95) 100%)",
              }}
            />
          </div>

          <h2
            className="text-white text-xl sm:text-3xl tracking-[0.25em] uppercase"
            style={{
              textShadow:
                "0 0 14px rgba(255,255,255,0.6), 0 0 32px rgba(255,255,255,0.3)",
            }}
          >
            you have reached the end of the road
          </h2>

          <div className="space-y-4 text-white/85 text-sm sm:text-base leading-relaxed">
            {settled.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
            {!finished && (
              <p>
                {current}
                {glitch && glitch.text.length > 0 && (
                  <span
                    className={
                      glitch.color === "green"
                        ? "text-emerald-400"
                        : "text-red-400"
                    }
                    style={{
                      textShadow:
                        glitch.color === "green"
                          ? "0 0 8px rgba(52,211,153,0.8), 0 0 18px rgba(52,211,153,0.4)"
                          : "0 0 8px rgba(248,113,113,0.85), 0 0 18px rgba(239,68,68,0.45)",
                    }}
                  >
                    {glitch.text}
                  </span>
                )}
                <span className="inline-block ml-0.5 animate-pulse">▮</span>
              </p>
            )}
          </div>

          <div
            className="border border-white/30 bg-white/5 grid grid-cols-1 sm:grid-cols-[1fr_minmax(0,140px)] items-stretch gap-0"
            style={{ boxShadow: "inset 0 0 25px rgba(255,255,255,0.08)" }}
          >
            <div className="p-4 sm:p-5 space-y-2">
              <p className="text-white/55 text-[10px] sm:text-xs tracking-[0.3em] uppercase">
                // the cost
              </p>
              <p
                className="text-white text-base sm:text-lg tracking-wider"
                style={{ textShadow: "0 0 10px rgba(255,255,255,0.45)" }}
              >
                one parked domain · less than $10 / yr · you keep ownership
              </p>
              <p className="text-white/65 text-[11px] sm:text-sm italic flex items-start gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/end-of-road/kill-switch.png"
                  alt=""
                  className="w-8 h-8 object-contain shrink-0 select-none pointer-events-none mt-0.5"
                  draggable={false}
                />
                <span>
                  one switch on your end ends the contract. you walk with the
                  domain. we walk with nothing.
                </span>
              </p>
            </div>
            <div className="hidden sm:block relative bg-black/60 border-l border-white/15">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/end-of-road/domain-house.png"
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-90 select-none pointer-events-none"
                draggable={false}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-white/55 text-[10px] sm:text-xs tracking-[0.3em] uppercase">
                // cheapest registrars on file
              </p>
              <p className="text-white/40 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase italic">
                pricing as of 2026-05
              </p>
            </div>
            <ul className="space-y-3">
              {REGISTRARS.map((r) => (
                <li
                  key={r.name}
                  className="border border-white/20 bg-black/60 px-3 py-3 sm:px-4 sm:py-3 hover:bg-white/5 hover:border-white/40 transition-colors"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <a
                      href={r.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-sm sm:text-base tracking-[0.2em] uppercase hover:underline underline-offset-4"
                      style={{ textShadow: "0 0 10px rgba(255,255,255,0.45)" }}
                    >
                      {r.name} ↗
                    </a>
                    <span className="text-emerald-300 text-[11px] sm:text-sm tabular-nums tracking-wider">
                      {r.price}
                    </span>
                  </div>
                  <p className="mt-1.5 text-white/65 text-[11px] sm:text-sm italic leading-relaxed">
                    {r.note}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="border-l-2 border-emerald-400/60 pl-4 py-1 space-y-1"
            style={{ textShadow: "0 0 8px rgba(52,211,153,0.35)" }}
          >
            <p className="text-emerald-300/85 text-[10px] sm:text-xs tracking-[0.3em] uppercase">
              // suggestion
            </p>
            <p className="text-white/85 text-sm sm:text-base leading-relaxed">
              porkbun. flat pricing, no upsell games, fast api. we can have your
              domain pointed at us inside two minutes once the registration clears.
            </p>
          </div>

          <p className="text-white/45 italic text-[10px] sm:text-xs tracking-[0.2em] uppercase pt-2 text-center">
            press esc to walk back into the dark
          </p>
        </div>
      </div>

    </div>,
    document.body,
  );
}
