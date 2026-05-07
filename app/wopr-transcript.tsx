type WoprTone = "blue" | "red" | "emerald";

type ToneSet = {
  text: string;
  textDim: string;
  border: string;
  bg: string;
  glow: string;
  innerShadow: string;
};

const TONES: Record<WoprTone, ToneSet> = {
  blue: {
    text: "text-blue-200",
    textDim: "text-blue-300/45",
    border: "border-blue-400/35",
    bg: "bg-blue-950/15",
    glow: "0 0 8px rgba(96,165,250,0.7), 0 0 20px rgba(59,130,246,0.4)",
    innerShadow: "inset 0 0 22px rgba(59,130,246,0.18)",
  },
  red: {
    text: "text-red-200",
    textDim: "text-red-300/45",
    border: "border-red-400/35",
    bg: "bg-red-950/15",
    glow: "0 0 8px rgba(248,113,113,0.7), 0 0 20px rgba(239,68,68,0.4)",
    innerShadow: "inset 0 0 22px rgba(239,68,68,0.18)",
  },
  emerald: {
    text: "text-emerald-200",
    textDim: "text-emerald-300/45",
    border: "border-emerald-400/35",
    bg: "bg-emerald-950/15",
    glow: "0 0 8px rgba(110,231,183,0.7), 0 0 20px rgba(52,211,153,0.4)",
    innerShadow: "inset 0 0 22px rgba(52,211,153,0.18)",
  },
};

export function WoprTranscript({ tone = "blue" }: { tone?: WoprTone }) {
  const c = TONES[tone];
  return (
    <div
      className={`border ${c.border} ${c.bg} px-3 py-3 sm:px-5 sm:py-4 font-mono text-[10px] sm:text-[11px] tracking-[0.18em]`}
      style={{ boxShadow: c.innerShadow }}
    >
      <p className={`${c.textDim} text-[8px] sm:text-[9px] tracking-[0.3em] uppercase mb-2`}>
        // wopr · transcript fragment
      </p>
      <p className={c.text} style={{ textShadow: c.glow }}>
        &gt;&nbsp;PEOPLE SOMETIMES MAKE MISTAKES.
      </p>
      <p className={`${c.text} mt-1.5`} style={{ textShadow: c.glow }}>
        &gt;&nbsp;YES THEY DO.
      </p>
    </div>
  );
}
