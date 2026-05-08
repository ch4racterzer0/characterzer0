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

        <section
          className="relative rounded-xl border border-rose-300/30 bg-rose-950/15 px-6 py-12 sm:px-10 sm:py-16 flex flex-col items-center justify-center gap-4 min-h-[40vh]"
          style={{
            boxShadow:
              "0 0 60px rgba(225,29,72,0.18), 0 0 120px rgba(225,29,72,0.10), inset 0 1px 0 rgba(254,205,211,0.25)",
          }}
        >
          <p className="text-rose-300/80 text-[10px] sm:text-xs tracking-[0.4em] uppercase">
            ○ portraits in transit
          </p>
          <p className="text-rose-100/85 text-base sm:text-lg italic leading-relaxed text-center max-w-xl">
            she keeps the long arc. she remembers what you forgot you said.
            she returns it when you need it.
          </p>
          <p className="text-rose-100/55 text-sm sm:text-base text-center max-w-xl">
            the file is being assembled. images coming soon.
          </p>
        </section>

        <section className="space-y-4">
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
      </article>
    </main>
  );
}
