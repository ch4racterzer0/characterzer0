import Image from "next/image";

const teasers = [
  { src: "/wip/teasers/teaser-1.png", w: 1066, h: 423, caption: "the room you're not in yet" },
  { src: "/wip/teasers/teaser-2.png", w: 584, h: 462, caption: "tier 1 / tier 2 / tier 3" },
  { src: "/wip/teasers/teaser-4.png", w: 944, h: 550, caption: "the four documents" },
  { src: "/wip/teasers/teaser-5.png", w: 856, h: 520, caption: "live, since when" },
  { src: "/wip/teasers/teaser-3.webp", w: 1920, h: 1080, caption: "the world they don't show forbes" },
];

export default function WIP() {
  return (
    <main className="min-h-screen bg-black text-blue-100 px-6 py-10 sm:px-10 sm:py-14">
      <article className="max-w-3xl mx-auto flex flex-col gap-10 font-light leading-relaxed">
        <header className="space-y-2">
          <p className="text-blue-100/60 text-xs sm:text-sm tracking-[0.4em] uppercase">
            work in progress
          </p>
          <h1
            className="text-blue-100 text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.15em] uppercase"
            style={{
              textShadow:
                "0 0 18px rgba(96,165,250,0.7), 0 0 38px rgba(59,130,246,0.4)",
            }}
          >
            phase 1 &mdash; on-ramp
          </h1>
          <p className="text-blue-200 text-base sm:text-lg italic tracking-wide">
            tighten the trade. show, don&rsquo;t pitch.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-blue-100 text-xs sm:text-sm tracking-[0.3em] uppercase">
            the brief
          </h2>
          <p className="text-base sm:text-lg">
            phase 1 of core4. one screen explains the trade. a 60-second
            video shows the NS swap end-to-end. a full demo of one of the
            lower levels exists and is shareable. reversibility is messaged
            on every page in the funnel.
          </p>
          <p className="text-base sm:text-lg">
            no email capture. no account. no auth. those aren&rsquo;t
            features. those are the proof that we&rsquo;re what we say we
            are.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-blue-100 text-xs sm:text-sm tracking-[0.3em] uppercase">
            checklist
          </h2>
          <ul className="space-y-2 font-mono text-blue-100/90 text-[12px] sm:text-[13px] leading-relaxed">
            <li>[x] no email capture</li>
            <li>[x] no account</li>
            <li>[x] no auth</li>
            <li>[x] HOLE - K live, durable, anonymous, 3/day per ip</li>
            <li>[x] /sample (peter) prototype of a lower level</li>
            <li>[ ] one-screen explainer of the trade</li>
            <li>[ ] 60-second loom: NS swap at GoDaddy &mdash; numbered steps</li>
            <li>[ ] 60-second loom: NS swap at Namecheap &mdash; numbered steps</li>
            <li>[ ] 60-second loom: NS swap at Porkbun &mdash; numbered steps</li>
            <li>[ ] count the exact clicks &mdash; publish the number on the explainer</li>
            <li>[ ] full walkthrough video of one operative&rsquo;s lower level</li>
            <li>[ ] reversibility messaging audit on every funnel page</li>
            <li>[ ] before/after demo: <span className="text-blue-100">fullsendbash.com</span> &mdash; godaddy parking page vs characterzer0 hub, same domain</li>
          </ul>
        </section>

        <div
          className="rounded-xl border border-blue-400/40 bg-blue-950/30 p-6 sm:p-8 space-y-3"
          style={{
            boxShadow:
              "0 0 35px rgba(59,130,246,0.30), inset 0 1px 0 rgba(147,197,253,0.20)",
          }}
        >
          <p className="text-blue-100 text-xs sm:text-sm tracking-[0.3em] uppercase">
            the canonical demo
          </p>
          <p className="text-blue-100/90 text-base sm:text-lg leading-relaxed font-light">
            <span className="font-mono text-blue-200">fullsendbash.com</span>{" "}
            was reverted to godaddy parking on may 5, 2026. once dns
            propagates we record the page in its parked state &mdash; ad
            rails, &ldquo;buy this domain,&rdquo; the slow scam-shaped
            churn &mdash; and place it next to the same domain pointed at
            this hub.
          </p>
          <p className="text-blue-100/85 text-base sm:text-lg leading-relaxed font-light">
            same url. two worlds. one frame split-screen. the demo writes
            itself.
          </p>
          <p className="text-blue-100/60 italic text-sm sm:text-base">
            this is what every parked-domain owner needs to see in 30
            seconds.
          </p>
        </div>

        <hr className="border-blue-100/15" />

        <section className="space-y-4">
          <h2 className="text-blue-100 text-xs sm:text-sm tracking-[0.3em] uppercase">
            what we&rsquo;re going to do about it
          </h2>
          <p>
            <span className="text-blue-100">screen-capture videos.</span> not
            tutorials. not narration. just the screen, the cursor, the steps.
            silent, captioned, under 60 seconds. one per registrar. a viewer
            should count the clicks themselves.
          </p>
          <p>
            <span className="text-blue-100">a published step count.</span>{" "}
            on the explainer page: &ldquo;3 clicks at godaddy. 4 at
            namecheap. 2 at porkbun. that&rsquo;s the entry.&rdquo; the
            number on the page is the trust signal.
          </p>
          <p>
            <span className="text-blue-100">a full demo of a lower level.</span>{" "}
            walkthrough of the matrix &mdash; tier system, member directory,
            file room, the four midnight documents, the chat layer. the
            architect narrates. nothing shown that compromises a live
            operative. the demo room is its own room.
          </p>
        </section>

        <hr className="border-blue-100/15" />

        <section className="space-y-5">
          <h2 className="text-blue-100 text-xs sm:text-sm tracking-[0.3em] uppercase">
            the underground &middot; preview
          </h2>
          <p className="text-blue-100/70 italic text-sm sm:text-base">
            captures from a level that already ran. screenshots, not
            illustrations. this is what the trade gets you a key into.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {teasers.map((t, i) => (
              <figure
                key={t.src}
                className="space-y-2"
              >
                <div
                  className="relative overflow-hidden rounded-lg border border-blue-400/30 bg-blue-950/20"
                  style={{
                    boxShadow:
                      "0 0 25px rgba(59,130,246,0.20), inset 0 1px 0 rgba(147,197,253,0.15)",
                  }}
                >
                  <Image
                    src={t.src}
                    alt={t.caption}
                    width={t.w}
                    height={t.h}
                    className="w-full h-auto opacity-75 hover:opacity-100 transition-opacity"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-blue-100/80 text-[9px] font-mono tracking-[0.25em] uppercase">
                    teaser {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <figcaption className="text-blue-100/60 italic text-xs sm:text-sm tracking-wide">
                  &gt; {t.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <hr className="border-blue-100/15" />

        <p className="text-blue-100/50 text-xs italic tracking-[0.2em] uppercase pt-2">
          phase 1 ships before phase 2.
        </p>
      </article>
    </main>
  );
}
