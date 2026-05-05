import Image from "next/image";

function Tile({ label, large = false }: { label: string; large?: boolean }) {
  const padding = large
    ? "px-8 sm:px-12 py-4 sm:py-6"
    : "px-5 sm:px-7 py-3 sm:py-4";
  const text = large
    ? "text-base sm:text-xl md:text-2xl tracking-[0.3em] sm:tracking-[0.4em]"
    : "text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em]";
  const halo = large ? "-inset-12 bg-blue-500/20" : "-inset-6 bg-blue-500/15";
  const shadow = large
    ? "0 0 60px rgba(59, 130, 246, 0.55), 0 0 120px rgba(59, 130, 246, 0.30), 0 25px 50px -10px rgba(59, 130, 246, 0.50), inset 0 1px 0 rgba(147, 197, 253, 0.45)"
    : "0 0 30px rgba(59, 130, 246, 0.40), 0 0 60px rgba(59, 130, 246, 0.18), 0 12px 28px -10px rgba(59, 130, 246, 0.40), inset 0 1px 0 rgba(147, 197, 253, 0.35)";

  return (
    <div className="relative">
      <div aria-hidden className={`absolute rounded-full blur-3xl ${halo}`} />
      <div
        className={`relative rounded-xl border border-blue-400/40 bg-blue-950/40 backdrop-blur-sm ${padding}`}
        style={{
          transform: "perspective(1200px) rotateX(-8deg)",
          boxShadow: shadow,
        }}
      >
        <span
          className={`block text-blue-100 font-light uppercase whitespace-nowrap ${text}`}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-between py-6 sm:py-10 px-4">
      <p className="text-white/45 italic text-xs sm:text-sm tracking-wide text-center max-w-md leading-relaxed">
        &ldquo;But then I learned just yesterday
        <br />
        To rush and never waste the day&rdquo;
      </p>

      <div className="flex flex-col items-center gap-12 sm:gap-16">
        <Tile label="The Creator" large />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10">
          <Tile label="Current Target" />
          <Tile label="Current Assets" />
          <Tile label="WIP" />
        </div>
      </div>

      <Image
        src="/characterzer0-figure.png"
        alt="character zer0"
        width={1536}
        height={1024}
        priority
        sizes="(max-width: 640px) 80vw, 30vw"
        className="h-[28vh] w-auto"
      />
    </main>
  );
}
