type LayerName = "surface" | "madhu" | "hungersite" | "dripfield";

type LayerEntry = {
  label: LayerName;
  href: string;
  text: string;
  border: string;
  hover: string;
  glow: string;
  activeBg: string;
  activeShadow: string;
};

const LAYERS: LayerEntry[] = [
  {
    label: "surface",
    href: "https://characterzer0.com/",
    text: "text-emerald-300",
    border: "border-emerald-400/40",
    hover:
      "hover:text-emerald-200 hover:border-emerald-300/70 hover:bg-emerald-950/30",
    glow: "0 0 10px rgba(110,231,183,0.7), 0 0 22px rgba(52,211,153,0.4)",
    activeBg: "bg-emerald-950/25",
    activeShadow:
      "inset 0 0 18px rgba(16,185,129,0.20), 0 0 14px rgba(16,185,129,0.18)",
  },
  {
    label: "madhu",
    href: "https://madhu.characterzer0.com/",
    text: "text-red-300",
    border: "border-red-400/40",
    hover: "hover:text-red-200 hover:border-red-300/70 hover:bg-red-950/30",
    glow: "0 0 10px rgba(252,165,165,0.7), 0 0 22px rgba(239,68,68,0.4)",
    activeBg: "bg-red-950/25",
    activeShadow:
      "inset 0 0 18px rgba(239,68,68,0.20), 0 0 14px rgba(239,68,68,0.18)",
  },
  {
    label: "hungersite",
    href: "https://hungersite.characterzer0.com/",
    text: "text-blue-300",
    border: "border-blue-400/45",
    hover: "hover:text-blue-200 hover:border-blue-300/70 hover:bg-blue-950/30",
    glow: "0 0 12px rgba(147,197,253,0.7), 0 0 28px rgba(59,130,246,0.4)",
    activeBg: "bg-blue-950/25",
    activeShadow:
      "inset 0 0 18px rgba(59,130,246,0.20), 0 0 14px rgba(59,130,246,0.18)",
  },
  {
    label: "dripfield",
    href: "https://dripfield.characterzer0.com/",
    text: "text-yellow-300",
    border: "border-yellow-400/40",
    hover:
      "hover:text-yellow-200 hover:border-yellow-300/70 hover:bg-yellow-950/30",
    glow: "0 0 10px rgba(253,224,71,0.7), 0 0 22px rgba(250,204,21,0.4)",
    activeBg: "bg-yellow-950/25",
    activeShadow:
      "inset 0 0 18px rgba(250,204,21,0.20), 0 0 14px rgba(250,204,21,0.18)",
  },
];

export function LayerNav({ active }: { active?: LayerName }) {
  return (
    <nav className="border border-blue-400/30 bg-black/40 px-3 py-2 sm:px-5 sm:py-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {LAYERS.map((item) => {
        const isActive = item.label === active;
        return (
          <a
            key={item.label}
            href={item.href}
            target="_top"
            aria-current={isActive ? "page" : undefined}
            className={`font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase border ${item.border} ${item.text} ${item.hover} px-3 py-1.5 sm:px-4 rounded-sm transition-colors ${
              isActive ? item.activeBg : ""
            }`}
            style={{
              textShadow: item.glow,
              boxShadow: isActive ? item.activeShadow : undefined,
            }}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
