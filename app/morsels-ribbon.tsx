const PHRASE =
  "БЕГИ 像 ένα アンテロープ, 밖 ИЗ 控制... ευχαριστώ あなた 씨 ТРЕЙ, character zer0";

export function MorselsRibbon() {
  return (
    <div
      aria-hidden
      className="cz-chrome fixed top-0 inset-x-0 z-[40] pointer-events-none overflow-hidden bg-black/60 backdrop-blur-sm border-b border-blue-400/20"
      style={{
        boxShadow: "0 4px 20px -4px rgba(59,130,246,0.20)",
      }}
    >
      <div className="relative h-7 sm:h-8 flex items-center justify-center overflow-hidden px-4">
        <span
          className="font-mono text-blue-200/65 text-[10px] sm:text-xs tracking-[0.2em] truncate"
          style={{ textShadow: "0 0 8px rgba(96,165,250,0.4)" }}
        >
          {PHRASE}
        </span>
      </div>
    </div>
  );
}
