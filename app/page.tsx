import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-between py-12 sm:py-16 px-4">
      <div className="relative mt-4">
        <div
          aria-hidden
          className="absolute -inset-12 rounded-full bg-blue-500/20 blur-3xl"
        />
        <div
          className="relative rounded-xl border border-blue-400/40 bg-blue-950/40 backdrop-blur-sm px-8 sm:px-12 py-4 sm:py-6"
          style={{
            transform: "perspective(1200px) rotateX(-8deg)",
            boxShadow:
              "0 0 60px rgba(59, 130, 246, 0.55), " +
              "0 0 120px rgba(59, 130, 246, 0.30), " +
              "0 25px 50px -10px rgba(59, 130, 246, 0.50), " +
              "inset 0 1px 0 rgba(147, 197, 253, 0.45)",
          }}
        >
          <h2 className="text-blue-100 text-base sm:text-xl md:text-2xl font-light tracking-[0.3em] sm:tracking-[0.4em] uppercase whitespace-nowrap">
            The Creator
          </h2>
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
