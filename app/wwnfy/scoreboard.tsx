"use client";

const PANEL_STYLE = {
  background:
    "linear-gradient(180deg, rgba(18,18,20,0.97) 0%, rgba(8,8,10,0.97) 50%, rgba(4,4,6,0.98) 100%)",
  border: "1px solid rgba(180,180,185,0.30)",
  boxShadow:
    "inset 0 1px 0 rgba(220,220,225,0.18), inset 0 -1px 0 rgba(0,0,0,0.65), 0 6px 14px -6px rgba(0,0,0,0.85), 0 0 0 1px rgba(0,0,0,0.5)",
} as const;

const BOLT_STYLE = {
  background:
    "radial-gradient(circle, rgba(220,220,225,1) 0%, rgba(80,80,85,1) 80%)",
} as const;

function Bolts() {
  return (
    <>
      <span aria-hidden className="absolute top-1 left-1 w-1 h-1 rounded-full" style={BOLT_STYLE} />
      <span aria-hidden className="absolute top-1 right-1 w-1 h-1 rounded-full" style={BOLT_STYLE} />
      <span aria-hidden className="absolute bottom-1 left-1 w-1 h-1 rounded-full" style={BOLT_STYLE} />
      <span aria-hidden className="absolute bottom-1 right-1 w-1 h-1 rounded-full" style={BOLT_STYLE} />
    </>
  );
}

type Stat = { label: string; value: string };

const STATS: Stat[] = [
  { label: "LIVES", value: "0" },
  { label: "2026", value: "0" },
  { label: "DAYS SINCE", value: "0" },
];

function StatRow({ stat }: { stat: Stat }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span
        className="font-mono uppercase tracking-[0.25em] font-semibold"
        style={{
          color: "rgba(190,190,195,0.78)",
          textShadow: "0 1px 0 rgba(0,0,0,0.85)",
          fontSize: "7px",
        }}
      >
        {stat.label}
      </span>
      <span
        className="font-mono font-bold leading-none"
        style={{
          color: "rgba(255,180,80,0.95)",
          fontSize: "20px",
          letterSpacing: "0.08em",
          textShadow:
            "0 0 6px rgba(255,140,40,0.85), 0 0 14px rgba(220,80,30,0.55), 0 1px 0 rgba(0,0,0,0.85)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {stat.value}
      </span>
    </div>
  );
}

export function Scoreboard() {
  return (
    <div
      className="relative inline-flex flex-col items-stretch w-[6.5rem] sm:w-28 rounded-md py-3 px-2.5 gap-2"
      style={PANEL_STYLE}
      aria-label="Scoreboard — running totals"
    >
      <Bolts />
      <span
        className="font-mono uppercase tracking-[0.3em] font-semibold text-center"
        style={{
          color: "rgba(230,230,235,0.85)",
          textShadow: "0 1px 0 rgba(0,0,0,0.85)",
          fontSize: "8px",
        }}
      >
        scoreboard
      </span>
      <div
        aria-hidden
        className="h-px w-full"
        style={{ background: "rgba(220,220,225,0.15)" }}
      />
      {STATS.map((s) => (
        <StatRow key={s.label} stat={s} />
      ))}
    </div>
  );
}
