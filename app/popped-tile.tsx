export function PoppedTile({
  label,
  href,
  subline,
}: {
  label: string;
  href: string;
  subline?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/60 rounded-2xl inline-block"
    >
      <span
        aria-hidden
        className="absolute -inset-14 rounded-full bg-blue-500/30 blur-3xl pointer-events-none"
      />
      <span
        className="relative block rounded-2xl border border-blue-300/70 bg-blue-950/55 backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-1.5 px-7 sm:px-10 py-4 sm:py-5"
        style={{
          transform:
            "perspective(700px) rotateX(-14deg) translateZ(28px)",
          boxShadow:
            "0 0 70px rgba(59, 130, 246, 0.70), 0 0 140px rgba(59, 130, 246, 0.40), 0 36px 70px -10px rgba(30, 64, 175, 0.65), inset 0 1px 0 rgba(147, 197, 253, 0.55)",
        }}
      >
        <span className="block text-blue-100 font-light uppercase whitespace-nowrap text-sm sm:text-base md:text-lg tracking-[0.3em]">
          {label}
        </span>
        {subline && (
          <span className="mt-1.5 block text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-blue-200/65">
            {subline}
          </span>
        )}
      </span>
    </a>
  );
}
