const phases = [
  {
    n: "01",
    title: "the bait",
    body:
      "domainers hate godaddy&rsquo;s cut. they hate that their portfolio looks like spam. nobody respects a guy with 4,000 parked pages. the wedge is shame, not money — give them a parked page that doesn&rsquo;t embarrass them.",
    do: [
      "free drop-in html file — no js, no tracker, no godaddy ad",
      "looks like a real magazine cover, not a for-sale lot",
      "their domain stays for sale (banner up top), but the page reads like a publication",
    ],
  },
  {
    n: "02",
    title: "the trade",
    body:
      "they get a parked page that doesn&rsquo;t look like a parked page. we get one editorial link rendered prominently on every domain that adopts it. zero dollars change hands. zero accounts. zero login.",
    do: [
      "one curated link per page — rotates from a public json feed",
      "feed lives at /api/unparked-feed (json)",
      "we control the feed, they control nothing — but they can fork the html",
    ],
  },
  {
    n: "03",
    title: "the targets",
    body:
      "garbage portfolios. the guy with 12,000 random keyword smashes. the kid who bought 800 cheap names in 2021 and still pays renewal. they have inventory and zero traffic — they have nothing to lose by trying.",
    do: [
      "namepros — &lsquo;portfolio review&rsquo; + &lsquo;parked-page&rsquo; subforums",
      "r/domains — link the github gist of the html",
      "godaddy community — soft post, no overt anti-godaddy",
      "dnw + the domain investing forum",
    ],
  },
  {
    n: "04",
    title: "the post (namepros draft)",
    body:
      "&ldquo;built a free html parked page replacement. one file. no js. no tracking. looks like a magazine, keeps your for-sale banner. drop it on your portfolio if you&rsquo;re tired of godaddy lander aesthetics. github link below. fork it, change the editorial link to your own site if you want, idc.&rdquo;",
    do: [
      "no anthem, no manifesto — just the file + the github",
      "answer questions. don&rsquo;t pitch.",
      "post one variant on three forums max — over-posting kills it",
    ],
  },
  {
    n: "05",
    title: "the post (r/domains draft)",
    body:
      "&ldquo;made a parked-page template that doesn&rsquo;t look like a parked page. screenshot below. github gist. zero affiliation, zero monetization on my end &mdash; if you fork it and swap my link out, the page still works.&rdquo;",
    do: [
      "lead with the screenshot",
      "github gist (not a repo) — feels less like a product",
      "stay in comments, answer everything",
    ],
  },
  {
    n: "06",
    title: "the post (godaddy community)",
    body:
      "softer tone. don&rsquo;t name godaddy as the enemy on godaddy&rsquo;s own forum. lead with &lsquo;here&rsquo;s a custom lander template i built&rsquo; — same file, same offer, no shade.",
    do: [
      "title: &lsquo;custom html lander &mdash; free, share if useful&rsquo;",
      "no &lsquo;better than godaddy&rsquo; language",
      "expect mod scrutiny, expect a delete on first post — try a second account if so",
    ],
  },
  {
    n: "07",
    title: "the deliverable",
    body:
      "single self-contained html file. inline css. no fonts. no scripts. the for-sale banner is editable in plain html (one comment block). the editorial link is hardcoded to a public json endpoint we control.",
    do: [
      "<a href='/unparked-template.html'>/unparked-template.html</a> — the file",
      "the json feed lives at /api/unparked-feed (returns one editorial url + headline)",
      "a domainer who edits the html can swap the feed url — that&rsquo;s fine, the goodwill stays",
    ],
  },
  {
    n: "08",
    title: "the slow play",
    body:
      "this isn&rsquo;t a launch, it&rsquo;s a leak. trickle the file out over weeks. don&rsquo;t announce it on characterzer0. don&rsquo;t mention thedelos on the forums. the parked-domain crowd will find it on their own — and they&rsquo;ll respect that you didn&rsquo;t evangelize.",
    do: [
      "no email list, no &lsquo;newsletter signup&rsquo;",
      "no analytics on the html — let them inspect-source and feel safe",
      "if asked &lsquo;why did you build this&rsquo;, answer: &lsquo;godaddy landers are ugly&rsquo;. nothing else.",
    ],
  },
];

export default function Unparked() {
  return (
    <main className="min-h-screen bg-black text-blue-100/90 px-6 py-10 sm:px-10 sm:py-14">
      <article className="max-w-3xl mx-auto flex flex-col gap-10 font-light leading-relaxed">
        <header className="space-y-4">
          <p className="text-blue-100/60 text-xs sm:text-sm tracking-[0.4em] uppercase">
            distribution · raid plan
          </p>
          <h1
            className="text-blue-100 text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.15em] uppercase"
            style={{
              textShadow:
                "0 0 18px rgba(96,165,250,0.7), 0 0 38px rgba(59,130,246,0.4)",
            }}
          >
            unparked
          </h1>
          <p className="text-blue-200 text-base sm:text-lg italic">
            domainers with 4,000 parked junk names. give them a page
            that doesn&rsquo;t embarrass them. take editorial slots in trade.
            zero dollars. zero accounts.
          </p>
        </header>

        <section
          className="rounded-xl border border-blue-400/40 bg-blue-950/30 p-5 sm:p-7 space-y-3"
          style={{
            boxShadow:
              "0 0 35px rgba(59,130,246,0.30), inset 0 1px 0 rgba(147,197,253,0.20)",
          }}
        >
          <h2 className="text-blue-100 text-xs sm:text-sm tracking-[0.3em] uppercase">
            the deliverable
          </h2>
          <p className="text-base sm:text-lg">
            one html file. self-contained. no js. drop it on any parked
            domain — it loads instantly and reads like a real publication
            with the for-sale banner up top.
          </p>
          <p className="text-blue-200/90 font-mono text-sm pt-2">
            <a
              href="/unparked-template.html"
              target="_blank"
              rel="noopener"
              className="underline decoration-blue-400/40 hover:decoration-blue-300"
            >
              /unparked-template.html
            </a>{" "}
            — open it, view-source, copy.
          </p>
        </section>

        <ol className="space-y-8">
          {phases.map((p) => (
            <li
              key={p.n}
              className="rounded-xl border border-blue-400/30 bg-blue-950/20 p-5 sm:p-7 space-y-3"
              style={{
                boxShadow:
                  "0 0 25px rgba(59,130,246,0.18), inset 0 1px 0 rgba(147,197,253,0.15)",
              }}
            >
              <div className="flex items-baseline gap-4">
                <span
                  className="text-blue-100 font-mono text-xs sm:text-sm tracking-[0.3em]"
                  style={{
                    textShadow:
                      "0 0 8px rgba(96,165,250,0.6), 0 0 18px rgba(59,130,246,0.35)",
                  }}
                >
                  {p.n}
                </span>
                <h2 className="text-blue-100 text-base sm:text-lg tracking-[0.25em] uppercase">
                  {p.title}
                </h2>
              </div>
              <p
                className="text-blue-100/85 text-sm sm:text-base"
                dangerouslySetInnerHTML={{ __html: p.body }}
              />
              <ul className="pt-1 space-y-1.5">
                {p.do.map((d, i) => (
                  <li
                    key={i}
                    className="text-blue-200/80 text-sm sm:text-base flex gap-3"
                  >
                    <span className="text-blue-300/60 font-mono">›</span>
                    <span dangerouslySetInnerHTML={{ __html: d }} />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <p className="text-blue-100/50 text-xs italic tracking-[0.2em] uppercase pt-2">
          the file is the campaign. don&rsquo;t evangelize. let it leak.
        </p>
      </article>
    </main>
  );
}
