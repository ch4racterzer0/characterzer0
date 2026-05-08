export const dynamic = "force-dynamic";

const HEX_LINE = "59 49 53 57 4D 54";

function HexBox({
  label,
  view,
  aspect = "aspect-[4/5]",
}: {
  label: string;
  view: string;
  aspect?: string;
}) {
  return (
    <div
      className={`relative rounded-md border border-white/25 bg-black flex items-center justify-center overflow-hidden ${aspect}`}
      style={{
        boxShadow:
          "0 0 30px rgba(255,255,255,0.10), 0 0 60px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.18)",
      }}
    >
      <div className="absolute top-3 left-3 flex items-center gap-2 text-[8px] sm:text-[10px] tracking-[0.4em] uppercase text-white/45">
        <span
          aria-hidden
          className="block w-1 h-1 rounded-full bg-cyan-300"
          style={{ boxShadow: "0 0 6px rgba(103,232,249,0.85)" }}
        />
        <span>{label}</span>
      </div>
      <div className="absolute top-3 right-3 text-[8px] sm:text-[10px] tracking-[0.3em] uppercase italic text-white/35">
        {view}
      </div>
      <p
        className="relative text-white font-mono tracking-[0.3em] sm:tracking-[0.4em] text-center px-4 text-[10px] sm:text-xs"
        style={{
          textShadow:
            "0 0 14px rgba(255,255,255,0.85), 0 0 32px rgba(103,232,249,0.55), 0 0 60px rgba(59,130,246,0.35)",
        }}
      >
        {HEX_LINE}
      </p>
    </div>
  );
}

function FigureBox({
  label,
  view,
  aspect = "aspect-[4/5]",
}: {
  label: string;
  view: string;
  aspect?: string;
}) {
  return (
    <div
      className={`relative rounded-md border border-white/25 bg-black overflow-hidden ${aspect}`}
      style={{
        boxShadow:
          "0 0 30px rgba(255,255,255,0.10), 0 0 60px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.18)",
      }}
    >
      <div className="absolute top-3 left-3 flex items-center gap-2 text-[8px] sm:text-[10px] tracking-[0.4em] uppercase text-white/45 z-10">
        <span
          aria-hidden
          className="block w-1 h-1 rounded-full bg-cyan-300"
          style={{ boxShadow: "0 0 6px rgba(103,232,249,0.85)" }}
        />
        <span>{label}</span>
      </div>
      <div className="absolute top-3 right-3 text-[8px] sm:text-[10px] tracking-[0.3em] uppercase italic text-white/35 z-10">
        {view}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/itsyoursphere-cover.png"
        alt=""
        aria-hidden
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover select-none"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/figures/front.png"
        alt=""
        aria-hidden
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover select-none"
        style={{ mixBlendMode: "screen" }}
      />
      <p
        className="absolute left-1/2 top-[24%] -translate-x-1/2 -translate-y-1/2 z-10 font-mono text-2xl sm:text-3xl tracking-[0.2em]"
        style={{
          color: "rgba(103,232,249,0.55)",
          textShadow:
            "0 0 8px rgba(103,232,249,0.45), 0 0 18px rgba(59,130,246,0.25)",
        }}
      >
        零
      </p>
    </div>
  );
}

export default function DropPage() {
  return (
    <main className="min-h-screen bg-black text-white px-4 py-8 sm:px-8 sm:py-12">
      <article className="max-w-5xl mx-auto flex flex-col gap-10">
        <header className="space-y-2">
          <p className="text-white/55 text-[10px] sm:text-xs tracking-[0.4em] uppercase">
            // first drop
          </p>
          <h1
            className="text-white text-5xl sm:text-7xl font-light tracking-[0.2em] uppercase"
            style={{
              textShadow:
                "0 0 18px rgba(255,255,255,0.7), 0 0 38px rgba(103,232,249,0.4)",
            }}
          >
            Drop
          </h1>
          <p className="text-white/65 italic tracking-wide text-sm sm:text-base">
            a hacker keeps his stash in plain sight.
          </p>
        </header>

        <section className="space-y-4">
          <p className="text-cyan-300/80 text-[10px] sm:text-xs tracking-[0.4em] uppercase">
            // tee · black · 100% cotton
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <HexBox label="t-shirt" view="front" />
            <FigureBox label="t-shirt" view="back" />
          </div>
        </section>

        <section className="space-y-4">
          <p className="text-cyan-300/80 text-[10px] sm:text-xs tracking-[0.4em] uppercase">
            // hoodie · black · heavyweight cotton fleece
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <HexBox label="hoodie" view="front" />
            <FigureBox label="hoodie" view="back" />
          </div>
        </section>

        <section className="space-y-4">
          <p className="text-cyan-300/80 text-[10px] sm:text-xs tracking-[0.4em] uppercase">
            // mug · black ceramic · 11oz
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <HexBox label="mug" view="hex side" aspect="aspect-square" />
            <FigureBox label="mug" view="figure side" aspect="aspect-square" />
          </div>
        </section>

        <section className="space-y-4">
          <p className="text-cyan-300/80 text-[10px] sm:text-xs tracking-[0.4em] uppercase">
            // mouse pad · black · stitched edge
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <HexBox label="mouse pad" view="hex" aspect="aspect-[3/2]" />
            <FigureBox label="mouse pad" view="figure" aspect="aspect-[3/2]" />
          </div>
        </section>

        <section className="space-y-3 pb-8">
          <p className="text-white/45 text-[10px] sm:text-xs tracking-[0.4em] uppercase">
            // notes
          </p>
          <p className="text-white/75 text-sm sm:text-base leading-relaxed italic">
            celebrating our first branded outpost.
          </p>
        </section>
      </article>
    </main>
  );
}
