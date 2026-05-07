const MORSELS_LINES = [
  "I feed from the bottom, you feed from the top",
  "I live upon morsels you happen to drop",
  "And coffee that somehow leaks out of your cup",
  "If nothing comes down then I'm forced to swim up",
];

const SEPARATOR = "  ◆  ";

export function MorselsRibbon() {
  const stream = MORSELS_LINES.join(SEPARATOR);

  return (
    <div
      aria-hidden
      className="fixed top-0 inset-x-0 z-[40] pointer-events-none overflow-hidden bg-black/60 backdrop-blur-sm border-b border-blue-400/20"
      style={{
        boxShadow: "0 4px 20px -4px rgba(59,130,246,0.20)",
      }}
    >
      <div className="relative h-7 sm:h-8 flex items-center overflow-hidden">
        <div
          className="flex whitespace-nowrap will-change-transform"
          style={{
            animation: "morsels-scroll 180s linear infinite",
          }}
        >
          <span
            className="font-mono text-blue-200/65 text-[10px] sm:text-xs tracking-[0.2em] pr-12"
            style={{ textShadow: "0 0 8px rgba(96,165,250,0.4)" }}
          >
            {stream}
            {SEPARATOR}
            {stream}
            {SEPARATOR}
          </span>
        </div>
      </div>
    </div>
  );
}
