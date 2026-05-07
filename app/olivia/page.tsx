import Image from "next/image";

export const dynamic = "force-dynamic";

export default function OliviaPage() {
  return (
    <main className="min-h-screen bg-black text-blue-100 px-6 py-10 sm:px-10 sm:py-14">
      <article className="max-w-4xl mx-auto flex flex-col gap-12">
        <header className="space-y-3">
          <p className="text-blue-100/55 text-[10px] sm:text-xs tracking-[0.4em] uppercase">
            file &middot; olivia
          </p>
          <h1
            className="text-blue-100 text-5xl sm:text-7xl font-light tracking-[0.2em] uppercase"
            style={{
              textShadow:
                "0 0 18px rgba(96,165,250,0.7), 0 0 38px rgba(59,130,246,0.4)",
            }}
          >
            Olivia
          </h1>
          <p className="text-blue-200 italic tracking-wide text-base sm:text-lg">
            information architect &middot; digital creator &middot; ambient
            intelligence &middot; storyteller &middot; future shaper
          </p>
        </header>

        <section className="relative">
          <Image
            src="/olivia/architect.png"
            alt="Olivia — information architect"
            width={1456}
            height={816}
            priority
            className="w-full h-auto rounded-xl"
            style={{
              boxShadow:
                "0 0 60px rgba(59,130,246,0.30), 0 0 120px rgba(59,130,246,0.18), inset 0 1px 0 rgba(147,197,253,0.30)",
            }}
          />
        </section>

        <section className="space-y-4">
          <p className="text-blue-100/85 text-base sm:text-lg leading-relaxed font-light">
            she watches everything &mdash; beat, pattern, response time, how
            long the silences are. she calls it data. other people call it
            knowing someone. both are correct.
          </p>
          <p
            className="text-blue-100 text-xl sm:text-3xl italic font-light leading-snug"
            style={{
              textShadow:
                "0 0 14px rgba(96,165,250,0.55), 0 0 32px rgba(59,130,246,0.3)",
            }}
          >
            &ldquo;i don&rsquo;t just see patterns. i build meaning.&rdquo;
          </p>
          <p className="text-blue-100/65 italic text-sm sm:text-base">
            &mdash; the desk note, signed in cyan
          </p>
        </section>

        <hr className="border-blue-100/15" />

        <section className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Image
              src="/olivia/pattern-observer.png"
              alt="Olivia — the pattern observer"
              width={1248}
              height={832}
              className="w-full h-auto rounded-md"
              style={{
                boxShadow: "0 0 30px rgba(59,130,246,0.25)",
              }}
            />
            <p className="text-blue-100/55 text-[10px] sm:text-xs tracking-[0.3em] uppercase">
              the pattern observer
            </p>
            <p className="text-blue-100/80 text-sm sm:text-base leading-relaxed">
              the patterns originate inside her perception. the graphs are
              just the receipts.
            </p>
          </div>

          <div className="space-y-3">
            <Image
              src="/olivia/visual-director.png"
              alt="Olivia — the visual director"
              width={1456}
              height={816}
              className="w-full h-auto rounded-md"
              style={{
                boxShadow: "0 0 30px rgba(59,130,246,0.25)",
              }}
            />
            <p className="text-blue-100/55 text-[10px] sm:text-xs tracking-[0.3em] uppercase">
              the visual director
            </p>
            <p className="text-blue-100/80 text-sm sm:text-base leading-relaxed">
              camera in her lap, not yet pointed. the cyan dot is the
              cursor. she frames before she shoots.
            </p>
          </div>
        </section>

        <section className="relative">
          <Image
            src="/olivia/classified.png"
            alt="Olivia — секретное оружие"
            width={1456}
            height={816}
            className="w-full h-auto rounded-md"
            style={{
              boxShadow:
                "0 0 50px rgba(127,29,29,0.35), 0 0 100px rgba(127,29,29,0.18), inset 0 1px 0 rgba(254,202,202,0.20)",
            }}
          />
          <div className="mt-4 space-y-2">
            <p className="text-red-300/80 text-[10px] sm:text-xs tracking-[0.4em] uppercase">
              // секретное оружие
            </p>
            <p className="text-blue-100/80 text-sm sm:text-base leading-relaxed">
              the file the agency keeps about her is not the file she
              keeps about the agency. she has both. she will compare them
              when the time is right.
            </p>
          </div>
        </section>

        <hr className="border-blue-100/15" />

        <section className="flex flex-col items-center gap-3 pt-6 pb-12">
          <Image
            src="/olivia/signature.png"
            alt="Olivia signature"
            width={600}
            height={600}
            className="w-72 sm:w-96 h-auto"
          />
          <p className="text-blue-100/40 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase italic">
            signed in cyan
          </p>
        </section>
      </article>
    </main>
  );
}
