export const dynamic = "force-dynamic";

export default function Dripfield() {
  return (
    <main className="min-h-screen bg-black text-blue-100 flex flex-col items-center justify-center px-6 py-10 font-light">
      <div className="flex flex-col items-center gap-6">
        <p className="text-blue-100/50 italic text-[10px] sm:text-xs tracking-[0.4em] uppercase">
          level 2
        </p>
        <h1
          className="text-blue-100 text-4xl sm:text-5xl md:text-6xl font-light tracking-[0.15em] uppercase"
          style={{
            textShadow:
              "0 0 18px rgba(96,165,250,0.7), 0 0 38px rgba(59,130,246,0.4)",
          }}
        >
          dripfield
        </h1>
        <p className="text-blue-200/70 italic tracking-[0.3em] uppercase text-xs sm:text-sm">
          coming soon
        </p>
      </div>
    </main>
  );
}
