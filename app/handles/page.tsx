const groups = [
  {
    bucket: "editorial side",
    intro:
      "matches the publishing arm. handle = property. zero gap between username and the url the post points to.",
    items: [
      {
        name: "sharethebyline",
        note: "handle = property. cleanest tie-in.",
      },
      {
        name: "spotlightdispatch",
        note: "more newsroom-coded variant.",
      },
      {
        name: "dispatchdesk",
        note: "fallback if either above is taken.",
      },
    ],
  },
  {
    bucket: "domainer / parked-audience",
    intro:
      "for namepros, r/domains, godaddy community, dnw. names the action in their own language.",
    items: [
      {
        name: "unparked",
        note: "→ pick for the godaddy spread. one word, hacker-clean, names the literal action.",
        primary: true,
      },
      {
        name: "parkednomore",
        note: "variant.",
      },
      {
        name: "reclaimdns",
        note: "variant.",
      },
    ],
  },
  {
    bucket: "editorial-neutral / broad",
    intro: "for hn, indie hackers, lobsters.",
    items: [
      {
        name: "freebroadcast",
        note: "calm and descriptive.",
      },
      {
        name: "nopricepage",
        note: "manifesto-in-a-username.",
      },
      {
        name: "thefourth",
        note: "core4 echo without saying core4.",
      },
    ],
  },
];

const recommendation = [
  {
    handle: "unparked",
    where:
      "namepros, r/domains, godaddy community, dnw — the parked-domain crowd.",
  },
  {
    handle: "sharethebyline",
    where: "hn, indie hackers, lobsters, r/sideproject — broader editorial.",
  },
];

export default function Handles() {
  return (
    <main className="min-h-screen bg-black text-blue-100/90 px-6 py-10 sm:px-10 sm:py-14">
      <article className="max-w-3xl mx-auto flex flex-col gap-10 font-light leading-relaxed">
        <header className="space-y-4">
          <p className="text-blue-100/60 text-xs sm:text-sm tracking-[0.4em] uppercase">
            distribution handles
          </p>
          <h1
            className="text-blue-100 text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.15em] uppercase"
            style={{
              textShadow:
                "0 0 18px rgba(96,165,250,0.7), 0 0 38px rgba(59,130,246,0.4)",
            }}
          >
            handles
          </h1>
          <p className="text-blue-200 text-base sm:text-lg italic">
            the byline can&rsquo;t carry the sci-fi. clean handles only on
            the share side of the firewall.
          </p>
        </header>

        <section
          className="rounded-xl border border-blue-400/40 bg-blue-950/30 p-5 sm:p-7 space-y-4"
          style={{
            boxShadow:
              "0 0 35px rgba(59,130,246,0.30), inset 0 1px 0 rgba(147,197,253,0.20)",
          }}
        >
          <h2 className="text-blue-100 text-xs sm:text-sm tracking-[0.3em] uppercase">
            recommendation
          </h2>
          <p className="text-base sm:text-lg">
            two handles, not one. same article, two voices, two doors.
            both stay on the public side of the firewall.
          </p>
          <ul className="space-y-3 pt-1">
            {recommendation.map((r) => (
              <li
                key={r.handle}
                className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4"
              >
                <span
                  className="text-blue-100 font-mono text-base sm:text-lg tracking-wider"
                  style={{
                    textShadow:
                      "0 0 8px rgba(96,165,250,0.6), 0 0 18px rgba(59,130,246,0.35)",
                  }}
                >
                  @{r.handle}
                </span>
                <span className="text-blue-200/80 text-sm sm:text-base italic">
                  {r.where}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {groups.map((g) => (
          <section key={g.bucket} className="space-y-4">
            <h2 className="text-blue-100 text-xs sm:text-sm tracking-[0.3em] uppercase">
              {g.bucket}
            </h2>
            <p className="text-blue-200/80 text-sm sm:text-base italic">
              {g.intro}
            </p>
            <ul className="space-y-3 pt-1">
              {g.items.map((it) => (
                <li
                  key={it.name}
                  className={`border border-blue-400/25 bg-blue-950/15 px-4 py-3 sm:px-5 sm:py-4 flex flex-col sm:flex-row sm:items-baseline sm:gap-4 ${
                    "primary" in it && it.primary
                      ? "border-blue-300/60 bg-blue-950/35"
                      : ""
                  }`}
                  style={
                    "primary" in it && it.primary
                      ? {
                          boxShadow:
                            "0 0 25px rgba(59,130,246,0.30), inset 0 1px 0 rgba(147,197,253,0.18)",
                        }
                      : undefined
                  }
                >
                  <span
                    className="text-blue-100 font-mono text-base sm:text-lg tracking-wider"
                    style={{
                      textShadow:
                        "0 0 8px rgba(96,165,250,0.55), 0 0 16px rgba(59,130,246,0.3)",
                    }}
                  >
                    @{it.name}
                  </span>
                  <span className="text-blue-200/80 text-sm sm:text-base">
                    {it.note}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <p className="text-blue-100/50 text-xs italic tracking-[0.2em] uppercase pt-2">
          check availability before committing — hn, namepros, reddit,
          indie hackers.
        </p>
      </article>
    </main>
  );
}
