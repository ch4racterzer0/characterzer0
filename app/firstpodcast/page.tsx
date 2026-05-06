const steps = [
  {
    n: "01",
    title: "name the show",
    body:
      "one sentence promise. who it&rsquo;s for, what they get, why now. write it before you record anything. the name lives under the thedelos roof — sub-brand, not standalone.",
    do: [
      "draft 3 candidate names",
      "write the 1-paragraph promise",
      "pick host(s) — solo, duo, or rotating",
    ],
  },
  {
    n: "02",
    title: "outline 5 episodes",
    body:
      "podcasts die at episode 2 because no one planned episode 3. block out the first five before you turn on a mic. it makes ep 1 better — you stop trying to say everything at once.",
    do: [
      "5 episode titles",
      "one bullet per episode = the promise",
      "pick which one is ep 1 (the strongest, not the chronological first)",
    ],
  },
  {
    n: "03",
    title: "record ep 1",
    body:
      "don&rsquo;t buy gear. use what you have. a phone in a quiet room beats a $400 mic in a kitchen. record in riverside.fm or descript — both auto-transcribe.",
    do: [
      "record in a soft room (closet, car, blanket fort)",
      "30–45 min target, edit down to 25–35",
      "save the raw file — never overwrite",
    ],
  },
  {
    n: "04",
    title: "edit in descript",
    body:
      "descript edits audio by editing the transcript. delete a sentence in the doc, the audio cuts. studio sound + remove filler words = one click each. this is the unfair-advantage step.",
    do: [
      "studio sound on",
      "remove filler words",
      "trim the first 30 seconds (always weak)",
      "export wav, 44.1khz",
    ],
  },
  {
    n: "05",
    title: "cover art",
    body:
      "1400×1400 png. high contrast. readable as a thumbnail. no thin fonts, no clutter. the show name has to survive being 60 pixels tall in a podcast app.",
    do: [
      "1400×1400, rgb, under 500kb",
      "test it at 60×60 — if you can&rsquo;t read it, redo it",
      "match the thedelos visual language (blue glow, dark field)",
    ],
  },
  {
    n: "06",
    title: "pick a host",
    body:
      "the host owns your rss feed — that&rsquo;s the actual product. transistor, buzzsprout, captivate are the serious ones. avoid spotify-only hosts (anchor lock-in). $20/mo is normal.",
    do: [
      "transistor.fm — clean, founder-friendly, $19/mo",
      "buzzsprout — the most-used, free tier limited",
      "captivate.fm — best analytics, $19/mo",
    ],
  },
  {
    n: "07",
    title: "submit to apple + spotify",
    body:
      "apple podcasts connect and spotify for podcasters take the rss url. apple takes 24–72hrs to approve. spotify is near-instant. submit both the day you upload ep 1.",
    do: [
      "podcastsconnect.apple.com — paste rss",
      "podcasters.spotify.com — paste rss",
      "amazon music + youtube music — same rss, do it later same week",
    ],
  },
  {
    n: "08",
    title: "ship ep 2 inside a week",
    body:
      "the algorithm rewards alive shows. one episode = a podcast that exists. two episodes inside seven days = a podcast that&rsquo;s shipping. that&rsquo;s the signal.",
    do: [
      "record ep 2 BEFORE ep 1 goes live",
      "schedule ep 2 for day 5–7",
      "you now have a gap to record ep 3",
    ],
  },
  {
    n: "09",
    title: "share-side push",
    body:
      "the share-side firewall handles distribution. clean handles, no sci-fi. don&rsquo;t cross the streams. the byline can&rsquo;t carry the lore.",
    do: [
      "@sharethebyline — broader editorial",
      "@unparked — namepros, r/domains, godaddy crowd",
      "see /handles for full plan",
    ],
  },
  {
    n: "10",
    title: "cut a clip for the other arms",
    body:
      "one 30–60 second vertical clip from ep 1. characterzer0 gets a written wrap with embed. fullsendbash gets the video. the podcast itself stays on thedelos. one shot, three doors.",
    do: [
      "30–60s vertical clip (descript exports vertical)",
      "characterzer0 — write a 200-word wrap with the audio embedded",
      "fullsendbash — drop the clip (when the video arm goes live)",
    ],
  },
];

export default function FirstPodcast() {
  return (
    <main className="min-h-screen bg-black text-blue-100/90 px-6 py-10 sm:px-10 sm:py-14">
      <article className="max-w-3xl mx-auto flex flex-col gap-10 font-light leading-relaxed">
        <header className="space-y-4">
          <p className="text-blue-100/60 text-xs sm:text-sm tracking-[0.4em] uppercase">
            thedelos · launch playbook
          </p>
          <h1
            className="text-blue-100 text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.15em] uppercase"
            style={{
              textShadow:
                "0 0 18px rgba(96,165,250,0.7), 0 0 38px rgba(59,130,246,0.4)",
            }}
          >
            first podcast
          </h1>
          <p className="text-blue-200 text-base sm:text-lg italic">
            ten steps from cold start to apple + spotify. nothing fancy.
            do them in order.
          </p>
        </header>

        <ol className="space-y-8">
          {steps.map((s) => (
            <li
              key={s.n}
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
                  {s.n}
                </span>
                <h2 className="text-blue-100 text-base sm:text-lg tracking-[0.25em] uppercase">
                  {s.title}
                </h2>
              </div>
              <p
                className="text-blue-100/85 text-sm sm:text-base"
                dangerouslySetInnerHTML={{ __html: s.body }}
              />
              <ul className="pt-1 space-y-1.5">
                {s.do.map((d, i) => (
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
          one show. five episodes outlined. ship ep 1 + ep 2 in seven days.
        </p>
      </article>
    </main>
  );
}
