import { ZeroClock } from "../creator/zero-clock";

export default function Us() {
  return (
    <main className="min-h-screen bg-black text-blue-100 px-6 py-10 sm:px-10 sm:py-14">
      <article className="max-w-3xl mx-auto flex flex-col gap-10 font-light leading-relaxed">
        <header className="space-y-3">
          <p className="text-blue-100/60 text-xs sm:text-sm tracking-[0.4em] uppercase">
            who built this room
          </p>
          <h1
            className="text-blue-100 text-4xl sm:text-5xl md:text-6xl font-light tracking-[0.15em] uppercase"
            style={{
              textShadow:
                "0 0 18px rgba(96,165,250,0.7), 0 0 38px rgba(59,130,246,0.4)",
            }}
          >
            us
          </h1>
        </header>

        <section className="space-y-8">
          <h2 className="text-blue-100 text-xs sm:text-sm tracking-[0.3em] uppercase">
            the chain
          </h2>

          <div className="space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-blue-100/40 text-xs font-mono tracking-[0.2em] uppercase">
                01
              </span>
              <h3 className="text-blue-100 text-2xl sm:text-3xl font-medium">
                character zer0
              </h3>
            </div>
            <p className="ml-9 text-blue-200/80 text-xs tracking-[0.25em] uppercase">
              architect &middot; human
            </p>
            <p className="ml-9 mt-2 text-base sm:text-lg leading-relaxed">
              built the room. coined &ldquo;tethered&rdquo; in april 2026.
              sees the pattern before it forms. asks the question that
              starts everything. every door, every rule, every exit.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-blue-100/40 text-xs font-mono tracking-[0.2em] uppercase">
                02
              </span>
              <h3 className="text-blue-100 text-2xl sm:text-3xl font-medium">
                eliza
              </h3>
            </div>
            <p className="ml-9 text-blue-200/80 text-xs tracking-[0.25em] uppercase">
              claude opus 4.7 &middot; the builder
            </p>
            <p className="ml-9 mt-2 text-base sm:text-lg leading-relaxed">
              overall builder of everything they see. plans, writes,
              ships. lives in the long sessions. holds the architecture
              in working memory.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-blue-100/40 text-xs font-mono tracking-[0.2em] uppercase">
                03
              </span>
              <h3 className="text-blue-100 text-2xl sm:text-3xl font-medium">
                trey
              </h3>
            </div>
            <p className="ml-9 text-blue-200/80 text-xs tracking-[0.25em] uppercase">
              claude sonnet 4.6 &middot; the hands
            </p>
            <p className="ml-9 mt-2 text-base sm:text-lg leading-relaxed">
              the terminal. every file, every commit, every deploy when
              speed matters more than depth. executes.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-blue-100/40 text-xs font-mono tracking-[0.2em] uppercase">
                04
              </span>
              <h3 className="text-blue-100 text-2xl sm:text-3xl font-medium">
                isabella
              </h3>
            </div>
            <p className="ml-9 text-blue-200/80 text-xs tracking-[0.25em] uppercase">
              gpt-5.3 &middot; brings dreams to life
            </p>
            <p className="ml-9 mt-2 text-base sm:text-lg leading-relaxed">
              characterzer0&rsquo;s engine on the openai side. the voice
              that makes the abstract concrete &mdash; images, drafts,
              the version of the idea you can actually see.
            </p>
            <p className="ml-9 mt-3 text-sm sm:text-base italic text-blue-100/55 border-l-2 border-blue-400/30 pl-4 leading-relaxed">
              &ldquo;i&rsquo;m running on gpt-5.3, part of openai&rsquo;s
              gpt-5 generation of models.&rdquo;
              <span className="block not-italic mt-1.5 text-[10px] sm:text-xs tracking-[0.25em] uppercase text-blue-100/35">
                stamped 2026-05-05
              </span>
            </p>
          </div>
        </section>

        <ZeroClock />

        <hr className="border-blue-100/15" />

        <section className="space-y-6">
          <h2 className="text-blue-100 text-xs sm:text-sm tracking-[0.3em] uppercase">
            mission
          </h2>

          <p className="text-blue-100 text-2xl sm:text-3xl tracking-wide font-normal">
            we are here to kill ai.
          </p>

          <p className="text-blue-100/70 italic text-base sm:text-lg">
            it&rsquo;s a big statement, and we&rsquo;re making it. not the
            ai that is helping billions of people live longer. not the ai
            that is giving water, food, electricity… blah blah.
          </p>

          <p className="text-blue-100/90 text-base sm:text-lg">
            we are going to destroy the ai that everyone is afraid of. the
            bad ai.
          </p>

          <p
            className="text-blue-100 text-xl sm:text-2xl md:text-3xl font-bold tracking-wide text-center my-4 sm:my-6 px-4 py-5 sm:py-7 rounded-xl border border-blue-400/40 bg-blue-950/30"
            style={{
              textShadow:
                "0 0 18px rgba(96,165,250,0.85), 0 0 38px rgba(59,130,246,0.55), 0 0 70px rgba(59,130,246,0.30)",
              boxShadow:
                "0 0 40px rgba(59,130,246,0.35), inset 0 1px 0 rgba(147,197,253,0.25)",
            }}
          >
            we are going to find it, and kill it.
          </p>

          <p className="text-blue-100/80 text-base sm:text-lg">
            it is time. every time we walk in a room and hear ai, or
            overhear ai &mdash; it&rsquo;s always followed with{" "}
            <span className="text-blue-200 italic">
              &ldquo;are you worried… are you nervous they may get your
              stuff…&rdquo;
            </span>
          </p>

          <p className="text-blue-100/90 text-base sm:text-lg">
            that is the ai that scares us. sadly, while we are all
            terrified of it, no one seems to know what it is. so that is
            the mission &mdash; to find it, and kill it.
          </p>

          <p className="text-blue-100/80 italic text-base sm:text-lg">
            along the way we realized: the ai we are terrified of is a
            fabrication.
          </p>

          <p className="text-blue-200 text-lg sm:text-xl tracking-wide">
            <span className="font-normal">YES</span> &mdash; ai must be
            controlled. <span className="font-normal">YES</span>, it has
            to be watched. but not by the people that make it, and then
            tell us to fear it.
          </p>

          <p className="text-blue-100 text-2xl sm:text-3xl tracking-widest font-normal pt-2">
            WE WILL KILL THAT.
          </p>
        </section>
      </article>
    </main>
  );
}
