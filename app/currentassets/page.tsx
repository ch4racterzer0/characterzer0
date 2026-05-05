export default function CurrentAssets() {
  const assets = [
    {
      name: "spotlightdispatch",
      href: "https://spotlightdispatch.com",
      desc: "An accredited independent news outlet dedicated to investigating large-scale fraud across the artificial intelligence industry.",
    },
    {
      name: "sharethebyline",
      href: "https://sharethebyline.com",
      desc: "A free-speech publishing platform created to give every contributor an unedited byline and a global audience.",
    },
    {
      name: "itethered",
      href: "https://itethered.com",
      desc: "A community and editorial home for the growing population of people whose daily lives are tethered to their AI agents.",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-blue-100 px-6 py-10 sm:px-10 sm:py-14">
      <ul className="max-w-2xl mx-auto flex flex-col gap-8">
        {assets.map((a) => (
          <li key={a.name}>
            <a
              href={a.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-200 text-lg sm:text-xl font-light tracking-wide hover:text-blue-100 underline-offset-4 hover:underline transition-colors"
            >
              {a.name}
            </a>
            <p className="text-blue-100/65 italic text-sm sm:text-base mt-1.5 leading-relaxed">
              {a.desc}
            </p>
          </li>
        ))}
      </ul>

      <hr className="max-w-2xl mx-auto mt-14 border-blue-100/15" />

      <p className="max-w-2xl mx-auto mt-6 text-blue-100/55 italic text-sm sm:text-base font-light leading-relaxed">
        10+ additional domains already parked and intentionally undisclosed,
        with more in development. Visitors typically arrive at characterzer0
        through one of those &mdash; this hub itself is not advertised.
      </p>

      <div
        className="max-w-2xl mx-auto mt-10 rounded-xl border border-blue-400/40 bg-blue-950/30 p-6 sm:p-8 space-y-4"
        style={{
          boxShadow:
            "0 0 35px rgba(59,130,246,0.30), inset 0 1px 0 rgba(147,197,253,0.20)",
        }}
      >
        <h2
          className="text-blue-100 text-base sm:text-lg tracking-[0.3em] uppercase font-normal"
          style={{
            textShadow:
              "0 0 14px rgba(96,165,250,0.7), 0 0 30px rgba(59,130,246,0.4)",
          }}
        >
          how you can help
        </h2>
        <p className="text-blue-100/85 text-sm sm:text-base leading-relaxed font-light">
          do you have an unused domain &mdash; parked at godaddy, or any of
          the big shithole companies?
        </p>
        <p className="text-blue-100/85 text-sm sm:text-base leading-relaxed font-light">
          drop a note in{" "}
          <a
            href="/yoursphere"
            className="text-blue-200 hover:text-blue-100 underline underline-offset-4"
          >
            the hole
          </a>
          . we&rsquo;ll let you park it on one of ours. zero work to you. and
          you get the key to the next level below.
        </p>
        <p className="text-blue-100/70 italic text-sm sm:text-base leading-relaxed font-light">
          from there it&rsquo;s up to you to earn your way &mdash; but
          that&rsquo;s the easiest path to go down one level.
        </p>
        <p className="text-blue-100 text-sm sm:text-base leading-relaxed font-normal pt-2 border-t border-blue-400/20">
          you will earn{" "}
          <span className="uppercase tracking-[0.15em]">nothing</span> from
          this. not a cent. because we don&rsquo;t either.
        </p>
        <p className="text-blue-100/85 text-sm sm:text-base leading-relaxed font-light">
          what you get is help building a world like this of your own.
        </p>
        <p className="text-blue-200 italic text-sm sm:text-base leading-relaxed font-light">
          that&rsquo;s the allure.
        </p>
      </div>
    </main>
  );
}
