export const dynamic = "force-dynamic";

const FRONT_LOGO = "丫工5山Μ丁";
const HEX_LINE = "59 49 53 57 4D 54";

function GarmentBox({
  label,
  view,
  text,
  small,
}: {
  label: string;
  view: string;
  text: string;
  small?: boolean;
}) {
  return (
    <div
      className="relative rounded-md border border-white/25 bg-black flex flex-col items-center justify-center gap-3 aspect-[4/5] overflow-hidden"
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
        className={`relative text-white font-mono tracking-[0.3em] sm:tracking-[0.4em] text-center px-4 ${
          small ? "text-[10px] sm:text-xs" : "text-2xl sm:text-4xl"
        }`}
        style={{
          textShadow:
            "0 0 14px rgba(255,255,255,0.85), 0 0 32px rgba(103,232,249,0.55), 0 0 60px rgba(59,130,246,0.35)",
        }}
      >
        {text}
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
            <GarmentBox label="t-shirt" view="front" text={FRONT_LOGO} />
            <GarmentBox
              label="t-shirt"
              view="inside collar"
              text={HEX_LINE}
              small
            />
          </div>
        </section>

        <section className="space-y-4">
          <p className="text-cyan-300/80 text-[10px] sm:text-xs tracking-[0.4em] uppercase">
            // fitted cap · flat brim · structured
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <GarmentBox label="cap" view="front panel" text={FRONT_LOGO} />
            <GarmentBox
              label="cap"
              view="back strap"
              text={HEX_LINE}
              small
            />
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
