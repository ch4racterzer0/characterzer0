import Link from "next/link";

export default function Hungersite() {
  return (
    <main className="min-h-screen bg-black text-blue-100 px-6 py-10 sm:px-10 sm:py-14">
      <article className="max-w-3xl mx-auto flex flex-col gap-10 font-light leading-relaxed">
        <header className="space-y-3">
          <p className="text-blue-100/60 text-xs sm:text-sm tracking-[0.4em] uppercase">
            level 1 &middot; the first hole
          </p>
          <h1
            className="text-blue-100 text-4xl sm:text-5xl md:text-6xl font-light tracking-[0.15em] uppercase"
            style={{
              textShadow:
                "0 0 18px rgba(96,165,250,0.7), 0 0 38px rgba(59,130,246,0.4)",
            }}
          >
            hungersite
          </h1>
          <p className="text-blue-200 italic tracking-wide text-base sm:text-lg">
            track 2 on dripfield. the place you go before you act.
          </p>
        </header>

        <section className="space-y-4 text-base sm:text-lg">
          <p>
            you&rsquo;re here because you pointed a parked domain at us. that
            was the entry. one record on one side. that&rsquo;s the gate.
          </p>
          <p>
            <span className="text-blue-100">where the real work starts.</span>{" "}
            this is the first room you can walk through. the first place your
            domain holds a tile. the first time the asset you&rsquo;d
            forgotten about becomes useful.
          </p>
        </section>

        <hr className="border-blue-100/15" />

        <section className="space-y-4">
          <h2 className="text-blue-100 text-xs sm:text-sm tracking-[0.3em] uppercase">
            the line that holds it
          </h2>
          <blockquote
            className="rounded-xl border border-blue-400/40 bg-blue-950/30 p-6 sm:p-8 italic text-blue-100 text-base sm:text-lg leading-relaxed"
            style={{
              boxShadow:
                "0 0 35px rgba(59,130,246,0.30), inset 0 1px 0 rgba(147,197,253,0.20)",
            }}
          >
            &ldquo;that which pervades the entire body, know it to be
            indestructible. nothing can destroy the imperishable soul.&rdquo;
            <footer className="mt-3 text-sm not-italic text-blue-100/60 tracking-[0.2em] uppercase">
              &mdash; bhagavad gita, on indian river
            </footer>
          </blockquote>
          <p>
            the registrar can be lost. the project can be moved. the model is
            the soul. nothing here can be killed by taking one piece of it.
          </p>
        </section>

        <hr className="border-blue-100/15" />

        <section className="space-y-4">
          <h2 className="text-blue-100 text-xs sm:text-sm tracking-[0.3em] uppercase">
            what you can do here, today
          </h2>
          <ul className="space-y-2 text-base sm:text-lg">
            <li>
              &mdash; your domain shows the network&rsquo;s top-level
              broadcast. one push deploys to all of you at once.
            </li>
            <li>
              &mdash; you have a private level under your domain that nobody
              outside this room sees.
            </li>
            <li>
              &mdash; you&rsquo;re named in the operative directory. you can
              see who else is in the room.
            </li>
            <li>
              &mdash; you can drop into the matrix files. notes, links,
              uploads &mdash; the four documents read every midnight.
            </li>
            <li>
              &mdash; you can earn the next door. dripfield is one room
              deeper. the path is work, not money.
            </li>
          </ul>
        </section>

        <hr className="border-blue-100/15" />

        <section className="space-y-4">
          <h2 className="text-blue-100 text-xs sm:text-sm tracking-[0.3em] uppercase">
            what you don&rsquo;t do
          </h2>
          <ul className="space-y-2 text-base sm:text-lg">
            <li>&mdash; you don&rsquo;t pay.</li>
            <li>&mdash; you don&rsquo;t earn money.</li>
            <li>
              &mdash; you don&rsquo;t lose control of your domain &mdash; one
              record flips back, you&rsquo;re out, no questions asked.
            </li>
            <li>&mdash; you don&rsquo;t need permission to leave.</li>
          </ul>
        </section>

        <hr className="border-blue-100/15" />

        <p className="text-blue-100/60 italic text-base sm:text-lg">
          the yearning got you in. the work keeps you.
        </p>

        <p className="text-blue-100/40 text-xs italic tracking-[0.2em] uppercase pt-2">
          back to{" "}
          <Link href="/madhu" className="hover:text-blue-200 underline underline-offset-4">
            madhu
          </Link>
        </p>
      </article>
    </main>
  );
}
