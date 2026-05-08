export function FacebookTile() {
  return (
    <div
      aria-hidden
      className="fixed z-[3] pointer-events-none w-[6vh] h-[6vh] rounded-xl overflow-hidden"
      style={{
        top: "25vh",
        left: "calc(50% - 13vh)",
        background:
          "linear-gradient(135deg, #1877F2 0%, #4dabf7 30%, #1877F2 65%, #0d4cb0 100%)",
        boxShadow:
          "0 0 28px rgba(24,119,242,0.95), 0 0 64px rgba(96,165,250,0.7), 0 0 110px rgba(24,119,242,0.45), inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -3px 10px rgba(13,76,176,0.5)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.18) 28%, transparent 52%, transparent 100%)",
        }}
      />
      <svg
        viewBox="0 0 24 24"
        fill="white"
        aria-hidden
        className="absolute inset-0 m-auto w-[60%] h-[60%]"
        style={{
          filter:
            "drop-shadow(0 0 6px rgba(255,255,255,0.95)) drop-shadow(0 0 14px rgba(147,197,253,0.75))",
        }}
      >
        <path d="M14 7h2.5V4.05a36.36 36.36 0 00-3.23-.18c-3.2 0-5.39 1.95-5.39 5.55V12.5H5v3.4h2.88V24h3.61v-8.1h2.85l.43-3.4h-3.28V9.84c0-.99.27-1.66 1.7-1.66H14V7z" />
      </svg>
    </div>
  );
}
