export function WizardSphere() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden"
    >
      <div
        className="relative w-[460px] h-[460px] sm:w-[640px] sm:h-[640px] md:w-[760px] md:h-[760px] rounded-full overflow-hidden"
        style={{
          transform:
            "perspective(1100px) rotateX(8deg) rotateY(-4deg)",
          maskImage:
            "radial-gradient(circle at 50% 45%, black 50%, rgba(0,0,0,0.55) 72%, transparent 88%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 45%, black 50%, rgba(0,0,0,0.55) 72%, transparent 88%)",
          boxShadow:
            "inset 0 0 120px rgba(0,0,0,0.85), 0 0 80px rgba(59,130,246,0.18)",
          animation: "wizard-arrive 2600ms cubic-bezier(0.22, 1, 0.36, 1) both",
        }}
      >
        <img
          src="/wizard.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter:
              "saturate(0.85) contrast(1.05) brightness(0.78)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, transparent 30%, rgba(0,0,0,0.55) 78%, rgba(0,0,0,0.9) 100%)",
            mixBlendMode: "multiply",
          }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow:
              "inset 0 0 90px rgba(96,165,250,0.18), inset 0 -40px 80px rgba(0,0,0,0.6), inset 0 40px 80px rgba(96,165,250,0.10)",
          }}
        />
      </div>

      <style>{`
        @keyframes wizard-arrive {
          0% {
            transform: perspective(1100px) rotateX(8deg) rotateY(-4deg) scale(0.35);
            opacity: 0;
          }
          70% {
            opacity: 0.9;
          }
          100% {
            transform: perspective(1100px) rotateX(8deg) rotateY(-4deg) scale(1);
            opacity: 0.85;
          }
        }
      `}</style>
    </div>
  );
}
