"use client";

type Tone = "blue" | "yellow" | "red" | "emerald";

const TONES: Record<
  Tone,
  {
    plate: string;
    plateInner: string;
    toggle: string;
    toggleHover: string;
    label: string;
    glow: string;
  }
> = {
  blue: {
    plate: "border-blue-300/45",
    plateInner: "bg-blue-950/70",
    toggle: "bg-blue-200",
    toggleHover: "group-hover:bg-blue-100",
    label: "text-blue-100/80 group-hover:text-blue-100",
    glow:
      "0 0 30px rgba(59,130,246,0.35), 0 0 80px rgba(59,130,246,0.18)",
  },
  yellow: {
    plate: "border-yellow-300/45",
    plateInner: "bg-yellow-950/70",
    toggle: "bg-yellow-200",
    toggleHover: "group-hover:bg-yellow-100",
    label: "text-yellow-100/80 group-hover:text-yellow-100",
    glow:
      "0 0 30px rgba(234,179,8,0.35), 0 0 80px rgba(234,179,8,0.18)",
  },
  red: {
    plate: "border-red-300/45",
    plateInner: "bg-red-950/70",
    toggle: "bg-red-200",
    toggleHover: "group-hover:bg-red-100",
    label: "text-red-100/80 group-hover:text-red-100",
    glow: "0 0 30px rgba(239,68,68,0.35), 0 0 80px rgba(239,68,68,0.18)",
  },
  emerald: {
    plate: "border-emerald-300/45",
    plateInner: "bg-emerald-950/70",
    toggle: "bg-emerald-200",
    toggleHover: "group-hover:bg-emerald-100",
    label: "text-emerald-100/80 group-hover:text-emerald-100",
    glow:
      "0 0 30px rgba(16,185,129,0.35), 0 0 80px rgba(16,185,129,0.18)",
  },
};

export function LightSwitchMask({
  tone = "blue",
  onSwitch,
}: {
  tone?: Tone;
  onSwitch: () => void;
}) {
  const c = TONES[tone];
  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-[1px] flex items-center justify-center font-mono pointer-events-none"
    >
      <button
        type="button"
        onClick={onSwitch}
        aria-label="flip the light switch"
        className="pointer-events-auto group flex flex-col items-center gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:ring-blue-300/60"
      >
        <div
          className={`relative w-20 h-32 sm:w-24 sm:h-40 border-2 ${c.plate} ${c.plateInner} rounded-md flex items-center justify-center`}
          style={{ boxShadow: c.glow }}
        >
          <div
            className={`absolute left-1/2 -translate-x-1/2 bottom-3 sm:bottom-4 w-12 h-12 sm:w-14 sm:h-14 ${c.toggle} ${c.toggleHover} rounded-sm transition-all duration-200 group-hover:bottom-[calc(50%-1.75rem)]`}
            style={{
              boxShadow:
                "inset 0 -4px 8px rgba(0,0,0,0.45), inset 0 2px 0 rgba(255,255,255,0.35)",
            }}
          />
          <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[8px] tracking-[0.4em] uppercase text-white/40">
            on
          </div>
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[8px] tracking-[0.4em] uppercase text-white/30">
            off
          </div>
        </div>
        <span
          className={`text-[10px] sm:text-xs tracking-[0.4em] uppercase ${c.label} transition-colors`}
        >
          turn on the lights
        </span>
      </button>
    </div>
  );
}
