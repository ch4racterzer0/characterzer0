export default function TheDelosMadhu() {
  return (
    <main className="min-h-screen bg-black text-blue-100 px-6 py-10 sm:px-10 sm:py-14">
      <article className="max-w-3xl mx-auto flex flex-col gap-8 font-light leading-relaxed">
        <header className="space-y-3">
          <p className="text-blue-100/60 text-xs sm:text-sm tracking-[0.4em] uppercase">
            thedelos &middot; the waiting room
          </p>
          <h1
            className="text-blue-100 text-4xl sm:text-5xl md:text-6xl font-light tracking-[0.15em] uppercase"
            style={{
              textShadow:
                "0 0 18px rgba(96,165,250,0.7), 0 0 38px rgba(59,130,246,0.4)",
            }}
          >
            madhu
          </h1>
          <p className="text-blue-200 italic tracking-wide text-base sm:text-lg">
            arm 02. podcasts. same architecture, different output.
          </p>
        </header>

        <section className="space-y-4 text-base sm:text-lg">
          <p>
            you found the first subdomain. that&rsquo;s not nothing &mdash;
            the wildcard had to resolve, the cert had to issue, the proxy
            had to route you here without a single redeploy of the news
            arm. it did. you&rsquo;re standing on the proof.
          </p>
          <p>
            the layers below this room are the same shape as the news arm.
            the <span className="text-blue-100">first hole</span> is still a
            parked domain. the <span className="text-blue-100">field</span>{" "}
            is earned. <span className="text-blue-100">source</span> belongs
            to the architect.
          </p>
          <p>
            what changes here is the output: not open letters, not
            byline-free reporting &mdash; <span className="text-blue-100">podcasts</span>.
            written-with, voiced-with, distributed without ads, paywall, or
            host network rent.
          </p>
        </section>

        <hr className="border-blue-100/15" />

        <p className="text-blue-100/60 italic text-base sm:text-lg">
          the goose was never in the bottle. core4 just opens its hand.
        </p>

        <p className="text-blue-100/40 text-xs italic tracking-[0.2em] uppercase pt-2">
          first wildcard host &middot; built before the rooms below
        </p>
      </article>
    </main>
  );
}
