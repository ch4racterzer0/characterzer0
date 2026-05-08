const MORSELS_LINES = [
  "我食于底,你食于顶",
  "我以你落下的碎屑为生",
  "还有从你杯中漏出的咖啡",
  "若无物降下,我便上游而求",
  "谢谢飞鱼",
  "Ѕеt thе gеаrѕhіft fоr thе hіgh gеаr оf уоur ѕоul!",
  "Уоu'vе gоt tо run lіkе аn аntеlорe, оut оf соntrоl!",
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
