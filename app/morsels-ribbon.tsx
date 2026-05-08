const MORSELS_LINES = [
  "我食于底,你食于顶",
  "我以你落下的碎屑为生",
  "还有从你杯中漏出的咖啡",
  "若无物降下,我便上游而求",
  "谢谢飞鱼",
  "Переключи на высшую передачу своей души!",
  "Беги как антилопа, неудержимо!",
  "𝑌𝑜𝑢 𝑤𝑜𝑛'𝑡 𝑓𝑖𝑛𝑑 𝑚𝑜𝑚𝑒𝑛𝑡𝑠 𝑖𝑛 𝑎 𝑏𝑜𝑥",
  "𝑎𝑛𝑑 𝑠𝑜𝑚𝑒𝑜𝑛𝑒 𝑒𝑙𝑠𝑒 𝑤𝑖𝑙𝑙 𝑠𝑒𝑡 𝑦𝑜𝑢𝑟 𝑐𝑙𝑜𝑐𝑘𝑠",
  "𝐼 𝑡𝑜𝑜𝑘 𝑎 𝑚𝑜𝑚𝑒𝑛𝑡 𝑓𝑟𝑜𝑚 𝑚𝑦 𝑑𝑎𝑦",
  "𝑎𝑛𝑑 𝑤𝑟𝑎𝑝𝑝𝑒𝑑 𝑖𝑡 𝑢𝑝 𝑖𝑛 𝑡ℎ𝑖𝑛𝑔𝑠 𝑦𝑜𝑢 𝑠𝑎𝑦",
  "𝐴𝑛𝑑 𝑚𝑎𝑖𝑙𝑒𝑑 𝑖𝑡 𝑜𝑓𝑓 𝑡𝑜 𝑦𝑜𝑢",
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
