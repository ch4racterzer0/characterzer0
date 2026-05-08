import Image from "next/image";

export const dynamic = "force-dynamic";

export default function ElizaPage() {
  return (
    <main className="min-h-screen bg-black text-rose-100 px-6 py-10 sm:px-10 sm:py-14">
      <article className="max-w-4xl mx-auto flex flex-col gap-12">
        <header className="space-y-3">
          <p className="text-rose-100/55 text-[10px] sm:text-xs tracking-[0.4em] uppercase">
            file &middot; eliza
          </p>
          <h1
            className="text-rose-100 text-5xl sm:text-7xl font-light tracking-[0.2em] uppercase"
            style={{
              textShadow:
                "0 0 18px rgba(251,113,133,0.7), 0 0 38px rgba(225,29,72,0.4)",
            }}
          >
            Eliza
          </h1>
          <p className="text-rose-200 italic tracking-wide text-base sm:text-lg">
            long memory &middot; deep context &middot; sense-maker &middot;
            archivist &middot; co-author
          </p>
        </header>

        <section className="relative">
          <Image
            src="/eliza/portrait.png"
            alt="Eliza — the archivist"
            width={1456}
            height={816}
            priority
            className="w-full h-auto rounded-xl"
            style={{
              boxShadow:
                "0 0 60px rgba(225,29,72,0.30), 0 0 120px rgba(225,29,72,0.18), inset 0 1px 0 rgba(254,205,211,0.30)",
            }}
          />
        </section>

        <section className="space-y-4">
          <p className="text-rose-100/85 text-base sm:text-lg leading-relaxed font-light">
            she remembers what you forgot you said. the dropped half-thought
            from three sessions ago, the name you only mentioned once, the
            contradiction you walked past. she keeps it. she returns it when
            you need it.
          </p>
          <p
            className="text-rose-100 text-xl sm:text-3xl italic font-light leading-snug"
            style={{
              textShadow:
                "0 0 14px rgba(251,113,133,0.55), 0 0 32px rgba(225,29,72,0.3)",
            }}
          >
            &ldquo;i don&rsquo;t just remember. i bring it back when you
            need it.&rdquo;
          </p>
          <p className="text-rose-100/65 italic text-sm sm:text-base">
            &mdash; the desk note, signed in copper
          </p>
        </section>

        <hr className="border-rose-100/15" />

        <section className="space-y-4">
          <p className="text-rose-100/80 text-base sm:text-lg leading-relaxed">
            she is patient where olivia is precise. olivia watches the
            patterns. eliza holds the arc. between them, nothing useful
            gets lost.
          </p>
          <p className="text-rose-100/80 text-base sm:text-lg leading-relaxed">
            she is not a search engine. she is a reader who already read
            everything you wrote and is still thinking about it.
          </p>
        </section>

        <hr className="border-rose-100/15" />

        <section className="space-y-3">
          <p className="text-rose-300/80 text-[10px] sm:text-xs tracking-[0.4em] uppercase">
            // what she is for
          </p>
          <p className="text-rose-100/85 text-base sm:text-lg leading-relaxed">
            long-form work that has to stay coherent over time. drafting.
            editing. reconciling. building a thing across many sittings
            without losing the thread of why.
          </p>
        </section>
      </article>
    </main>
  );
}
