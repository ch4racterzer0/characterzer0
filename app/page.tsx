import Image from "next/image";
import { CreatorTile } from "./creator-tile";

function Tile({ label }: { label: string }) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-6 rounded-full blur-3xl bg-blue-500/15"
      />
      <div
        className="relative rounded-xl border border-blue-400/40 bg-blue-950/40 backdrop-blur-sm px-5 sm:px-7 py-3 sm:py-4"
        style={{
          transform: "perspective(1200px) rotateX(-8deg)",
          boxShadow:
            "0 0 30px rgba(59, 130, 246, 0.40), 0 0 60px rgba(59, 130, 246, 0.18), 0 12px 28px -10px rgba(59, 130, 246, 0.40), inset 0 1px 0 rgba(147, 197, 253, 0.35)",
        }}
      >
        <span className="block text-blue-100 font-light uppercase whitespace-nowrap text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em]">
          {label}
        </span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-between py-6 sm:py-10 px-4">
      <p className="text-white/45 italic text-xs sm:text-sm tracking-wide text-center whitespace-nowrap">
        &ldquo;But then I learned just yesterday — To rush and never waste the day&rdquo;
      </p>

      <div className="flex flex-col items-center gap-12 sm:gap-16">
        <CreatorTile />
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
