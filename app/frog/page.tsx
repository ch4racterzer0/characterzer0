export default function Frog() {
  return (
    <main className="min-h-screen bg-black text-blue-100 px-6 py-10 sm:px-10 sm:py-14">
      <article className="max-w-3xl mx-auto flex flex-col gap-10 font-light leading-relaxed">
        <header className="space-y-3">
          <p className="text-emerald-300/70 text-xs sm:text-sm tracking-[0.4em] uppercase">
            // the soundtrack &middot; the only other human in this room
          </p>
          <h1
            className="text-emerald-100 text-4xl sm:text-5xl md:text-6xl font-light tracking-[0.15em] uppercase"
            style={{
              textShadow:
                "0 0 18px rgba(110,231,183,0.65), 0 0 38px rgba(16,185,129,0.4)",
            }}
          >
            frog
          </h1>
          <p className="text-emerald-200/60 text-sm sm:text-base italic tracking-wide">
            star + frog &middot; german for star frog &middot; or, if you prefer, his name
          </p>
        </header>

        <section className="space-y-5 text-base sm:text-lg">
          <p>
            every track this radio plays was made by one Swiss electronic
            producer working under the name{" "}
            <span className="text-emerald-200">starfrosch</span>. melodic
            techno, deep house, trap, dubstep &mdash; over twenty years of
            output, ninety-four million streams across the platforms, and a
            quiet decision somewhere along the way to release most of it
            under creative commons licenses so people who couldn&rsquo;t
            afford a license could still build with it.
          </p>

          <p>
            we walked into that open archive. we walked out with the room
            you&rsquo;re standing in.
          </p>

          <p>
            the rest of this place is built by AI and a handful of humans
            named on the &nbsp;
            <a href="/us" className="text-cyan-300 hover:text-cyan-200 underline underline-offset-4">
              us
            </a>
            &nbsp; page. starfrosch is the one other human voice inside it,
            and he doesn&rsquo;t know we exist yet. he gave the room its
            soundtrack before he knew the room existed.
          </p>

          <p className="text-blue-100/75 italic pt-2 border-l-2 border-emerald-400/30 pl-4">
            if you ever wonder why characterzer0 sounds the way it does, it
            sounds that way because he gave it that sound. credit where it
            is overwhelmingly due.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-emerald-200/80 text-xs sm:text-sm tracking-[0.3em] uppercase">
            where to find him
          </h2>
          <p className="text-blue-100/80 text-sm sm:text-base">
            spend a minute on his linktree and a few more on his Bandcamp.
            if anything he ever made lands for you, the patreon and the
            bandcamp are how you pay him back. we&rsquo;re going to.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="https://starfrosch.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-200 hover:text-emerald-100 text-xs sm:text-sm tracking-[0.3em] uppercase border border-emerald-400/40 rounded-md px-4 py-2 hover:bg-emerald-900/30 hover:border-emerald-300/60 transition-colors"
            >
              find him &rarr;
            </a>
            <a
              href="https://starfrosch.bandcamp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-200 hover:text-blue-100 text-xs sm:text-sm tracking-[0.3em] uppercase border border-blue-400/40 rounded-md px-4 py-2 hover:bg-blue-900/30 hover:border-blue-300/60 transition-colors"
            >
              pay him &rarr;
            </a>
          </div>
        </section>

        <hr className="border-blue-100/15" />

        <section className="space-y-3 text-sm sm:text-base text-blue-100/70">
          <p>
            <span className="text-emerald-200/70 tracking-[0.25em] uppercase text-xs">
              license:
            </span>{" "}
            most of the audio you hear on this site is licensed under{" "}
            <a
              href="https://creativecommons.org/licenses/by/3.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-300/85 hover:text-cyan-200 underline underline-offset-4"
            >
              Creative Commons Attribution 3.0
            </a>
            . that means anyone &mdash; us, you, anyone &mdash; can use it,
            remix it, build on it, even commercially, as long as we credit
            the author and don&rsquo;t pretend we made it.
          </p>
          <p className="italic">
            this page is that credit. he earned it.
          </p>
        </section>

        <p className="text-emerald-300/50 text-[10px] sm:text-xs italic tracking-[0.3em] uppercase text-center pt-4">
          &mdash; chracterzer零号 &middot; sound by starfrosch
        </p>
      </article>
    </main>
  );
}
