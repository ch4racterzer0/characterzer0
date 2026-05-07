const steps = [
  {
    n: "01",
    title: "pick the name",
    body:
      "you don&rsquo;t need a clever brand. you need a name you&rsquo;ll still type a year from now. your handle, your nickname, the thing your friends already call you. shorter is easier. plain is fine. don&rsquo;t overthink it — the name doesn&rsquo;t make the site, you do.",
    do: [
      "say it out loud — if you stumble, change it",
      "spell it for someone over the phone — if they ask twice, change it",
      "skip hyphens and numbers, they make it harder to share",
      ".com is easiest, but .net / .co / .org all work fine",
    ],
  },
  {
    n: "02",
    title: "check that it&rsquo;s free, then buy it",
    body:
      "go to a registrar — namecheap, porkbun, and cloudflare registrar are the calm ones. type the name into their search. if it&rsquo;s green, you can have it for around ten dollars a year. if it&rsquo;s red and listed at four figures, walk away — pick a different name. parked names with five-figure asks are not your fight.",
    do: [
      "namecheap or porkbun for the gentlest checkout",
      "cloudflare registrar if you already have a cloudflare account — sells at cost",
      "say no to every upsell on the way out (privacy is usually included free, ignore the rest)",
      "use a real email — you&rsquo;ll need it later",
    ],
  },
  {
    n: "03",
    title: "point it somewhere",
    body:
      "owning the name is half. the other half is telling the internet where to send people who type it. this is dns. it sounds technical, it isn&rsquo;t — you&rsquo;re filling in two fields. the host you publish on (next step) gives you the values, you paste them into your registrar.",
    do: [
      "log into the registrar, find the dns or nameservers panel",
      "two common shapes: paste the host&rsquo;s nameservers, or paste an A record + a CNAME",
      "save. close the tab. give it an hour to propagate.",
      "if it doesn&rsquo;t resolve after a day, you typed something wrong — re-check exactly what the host gave you",
    ],
  },
  {
    n: "04",
    title: "put a page on it",
    body:
      "you don&rsquo;t need a developer. you need one html file or one click. the easiest path right now: vercel. sign in with github (free github account, free vercel account), import any starter, hit deploy. attach your name in the project settings. done — your name now serves a real page.",
    do: [
      "github account, vercel account — both free",
      "import a starter, or fork the unparked template and edit one html file",
      "vercel project settings → domains → add your name → follow the instructions back to step 03",
      "no host loyalty — netlify, cloudflare pages, github pages all work the same way",
    ],
  },
  {
    n: "05",
    title: "now you&rsquo;re on the map",
    body:
      "that&rsquo;s the runway. one name, one page, one address you control. nothing about it is permanent — you can rewrite the page tonight, replace it tomorrow, point the name at a different host next month. the only thing that matters is that the name is yours and the page is yours.",
    do: [
      "write something on it — even one paragraph",
      "share the name, not a social link",
      "renew it every year (set a calendar reminder, registrars love a lapsed domain)",
      "when you&rsquo;re ready for more, the same four steps scale to ten names",
    ],
  },
];

export default function Runway() {
  return (
    <main className="min-h-screen bg-black text-blue-100/90 px-6 py-10 sm:px-10 sm:py-14">
      <article className="max-w-3xl mx-auto flex flex-col gap-10 font-light leading-relaxed">
        <header className="space-y-4">
          <p className="text-blue-100/60 text-xs sm:text-sm tracking-[0.4em] uppercase">
            on-ramp · for civilians
          </p>
          <h1
            className="text-blue-100 text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.15em] uppercase"
            style={{
              textShadow:
                "0 0 18px rgba(96,165,250,0.7), 0 0 38px rgba(59,130,246,0.4)",
            }}
          >
            runway
          </h1>
          <p className="text-blue-200 text-base sm:text-lg italic">
            you don&rsquo;t need permission, a developer, or a platform account.
            you need a name and a page. four steps. about an hour. about ten dollars.
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
            why bother
          </h2>
          <p className="text-base sm:text-lg">
            social handles get throttled, suspended, or quietly downranked.
            a name you own does not. a page you publish does not.
            the cheapest way to be unkillable on the internet is still
            owning your own name.
          </p>
        </section>

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
          the runway isn&rsquo;t a product. it&rsquo;s the doorway.
        </p>
      </article>
    </main>
  );
}
