import type { Metadata, Viewport } from "next";
import { NeilGate } from "./gate";

export const metadata: Metadata = {
  title: "for neil — Chracterzer零号",
  description: "a page, not a letter.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function NeilPage() {
  return (
    <NeilGate>
    <main className="min-h-screen bg-black text-blue-100 font-mono">
      <div className="max-w-3xl mx-auto px-6 sm:px-10 py-12 sm:py-20 space-y-12">
        <section className="space-y-5">
          <p
            className="text-blue-200/65 text-[10px] sm:text-xs tracking-[0.4em] uppercase"
            style={{ textShadow: "0 0 8px rgba(96,165,250,0.45)" }}
          >
            // for neil — from his kid&rsquo;s friend&rsquo;s dad
          </p>
          <p
            className="text-blue-100 text-2xl sm:text-3xl tracking-[0.04em] leading-tight"
            style={{
              textShadow:
                "0 0 12px rgba(147,197,253,0.7), 0 0 28px rgba(59,130,246,0.4)",
            }}
          >
            our kids run our houses anyway.
            <br />
            this is what mine has been building when they&rsquo;re not looking.
          </p>
          <p className="text-blue-100/85 leading-relaxed text-sm sm:text-base">
            not a pitch. not a favor ask. not a free-advice fishing trip.
            <br />
            i&rsquo;m asking you to look. if any of it pulls, we&rsquo;ll talk.
          </p>
        </section>

        <section className="border-t border-blue-400/20 pt-10 space-y-6">
          <p className="text-blue-200/65 text-[10px] sm:text-xs tracking-[0.4em] uppercase">
            // the architect
          </p>

          <div className="flex items-stretch gap-5 sm:gap-6">
            <div
              className="relative shrink-0 w-32 sm:w-40 rounded-lg overflow-hidden border border-blue-400/40 bg-blue-950/40"
              style={{
                boxShadow:
                  "0 0 22px rgba(59,130,246,0.35), inset 0 1px 0 rgba(147,197,253,0.25)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/characterzer0-figure.png"
                alt="零号"
                className="block w-full h-auto"
                style={{
                  filter:
                    "drop-shadow(0 0 10px rgba(96,165,250,0.6)) drop-shadow(0 0 22px rgba(59,130,246,0.4))",
                }}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 110%, rgba(59,130,246,0.25) 0%, rgba(0,0,0,0) 60%)",
                }}
              />
            </div>
            <div className="flex-1 min-w-0 space-y-2">
              <p
                className="text-blue-100 text-3xl sm:text-4xl tracking-[0.12em]"
                style={{
                  textShadow:
                    "0 0 16px rgba(147,197,253,0.85), 0 0 36px rgba(59,130,246,0.5)",
                }}
              >
                零号
              </p>
              <p className="text-blue-200/70 text-[10px] sm:text-xs tracking-[0.35em] uppercase">
                architect of nine
              </p>
              <p className="text-blue-100/90 leading-relaxed text-sm sm:text-base">
                one person. no team. no funding. no permission asked.
                <br />
                a sci-fi cosmology with a real-world spine.
              </p>
            </div>
          </div>

          <p className="text-blue-100/85 leading-relaxed text-sm sm:text-base">
            the conceit: <span className="text-blue-100">零号</span> is the
            architect. nine worlds are expanding under him. four are live, the
            rest are written and waiting. when all nine are full, the tunnel
            opens. nine becomes one. one is here.
          </p>
          <p className="text-blue-100/85 leading-relaxed text-sm sm:text-base">
            the trail is told through a fiction series called{" "}
            <span className="text-blue-100">Tethered</span>. every chapter is a
            clue. nobody walks the audience through it. they find it or they
            don&rsquo;t.
          </p>
        </section>

        <section className="border-t border-blue-400/20 pt-10 space-y-4">
          <p className="text-blue-200/65 text-[10px] sm:text-xs tracking-[0.4em] uppercase">
            // the properties — owned, live, mine
          </p>
          <ul className="space-y-3.5 text-sm sm:text-base">
            <li>
              <span className="text-blue-100">characterzer0.com</span>
              <span className="text-blue-300/55"> — </span>
              <span className="text-blue-100/85">
                the hub. the architect&rsquo;s seat. not one of the nine; the
                seat above them.
              </span>
            </li>
            <li>
              <span className="text-blue-100">spotlightdispatch.com</span>
              <span className="text-blue-300/55"> — </span>
              <span className="text-blue-100/85">
                news arm. stated goal: kill cnn and fox news.
              </span>
            </li>
            <li>
              <span className="text-blue-100">sharethebyline.com</span>
              <span className="text-blue-300/55"> — </span>
              <span className="text-blue-100/85">
                a submission-based newsroom. anyone drops a moment; an AI named
                Ella drafts the article; nothing gets edited by a human before
                it runs. the transparency is the whole bit, not a footnote.
                firewalled outbound from the rest of the cosmology on purpose.
              </span>
            </li>
            <li>
              <span className="text-blue-100">thedelos.com</span>
              <span className="text-blue-300/55"> — </span>
              <span className="text-blue-100/85">
                podcasts + the sealed worlds. the rest of the nine wait there,
                written and unbuilt, until someone earns one.
              </span>
            </li>
            <li>
              <span className="text-blue-100">fullsendbash.com</span>
              <span className="text-blue-300/55"> — </span>
              <span className="text-blue-100/85">
                video arm. short-form pipeline feeds it.
              </span>
            </li>
            <li>
              <span className="text-blue-100">itsyoursphere.com</span>
              <span className="text-blue-300/55"> — </span>
              <span className="text-blue-100/85">
                owned, build pending. another sphere in the universe, slot
                still open.
              </span>
            </li>
            <li>
              <span className="text-blue-100">yiswmt.com</span>
              <span className="text-blue-300/55"> — </span>
              <span className="text-blue-100/85">
                giving back. the sphere. own section below.
              </span>
            </li>
          </ul>
        </section>

        <section className="border-t border-blue-400/20 pt-10 space-y-4">
          <p className="text-blue-200/65 text-[10px] sm:text-xs tracking-[0.4em] uppercase">
            // the channel
          </p>
          <p className="text-blue-100/85 leading-relaxed text-sm sm:text-base">
            <span className="text-blue-100">Chracterzer零号</span> on youtube.
            Tethered shorts and season runs publish there. on the live page a
            slideshow of original drop-artwork crossfades while audio and video
            episodes drop in.
          </p>
          <p className="text-blue-100/85 leading-relaxed text-sm sm:text-base">
            the production pipeline is real: capture device →&nbsp;mkv
            →&nbsp;mp4 →&nbsp;published. one operator. no studio.
          </p>
        </section>

        <section className="border-t border-blue-400/20 pt-10 space-y-4">
          <p className="text-blue-200/65 text-[10px] sm:text-xs tracking-[0.4em] uppercase">
            // the sphere — yiswmt
          </p>
          <p
            className="text-blue-100 text-xl sm:text-2xl tracking-[0.06em]"
            style={{
              textShadow:
                "0 0 12px rgba(147,197,253,0.65), 0 0 26px rgba(59,130,246,0.35)",
            }}
          >
            Your Image Stays With Me Tonight
          </p>
          <p className="text-blue-100/85 leading-relaxed text-sm sm:text-base">
            a family-facing free home for memorializing fallen soldiers. built
            solo. caring, not militant. the ultimate tether — the dead, named
            and visible, alongside everyone still naming them.
          </p>
          <ul className="space-y-2 text-sm sm:text-base text-blue-100/85">
            <li>
              <span className="text-blue-300/55">—&nbsp;</span> families
              memorialize. no charge. ever.
            </li>
            <li>
              <span className="text-blue-300/55">—&nbsp;</span> the paywall is a{" "}
              <span className="text-blue-100">1¢ receipt</span> of a good deed
              (e.g. Wounded Warrior). proof, not toll.
            </li>
            <li>
              <span className="text-blue-300/55">—&nbsp;</span> a separate merch
              line funds a <span className="text-blue-100">$1M pot</span> routed
              back to the families.
            </li>
            <li>
              <span className="text-blue-300/55">—&nbsp;</span> it&rsquo;s the
              philanthropic arm of the universe, not a side project.
            </li>
          </ul>
        </section>

        <section className="border-t border-blue-400/20 pt-10 space-y-4">
          <p className="text-blue-200/65 text-[10px] sm:text-xs tracking-[0.4em] uppercase">
            // where your clients fit
          </p>
          <p className="text-blue-100/85 leading-relaxed text-sm sm:text-base">
            your roster reads like the seating chart of this universe. i mean
            that literally.
          </p>
          <ul className="space-y-2.5 text-sm sm:text-base text-blue-100/85">
            <li>
              <span className="text-blue-300/55">—&nbsp;</span>
              <span className="text-blue-100">
                recording artists, songwriters, producers, DJs
              </span>{" "}
              → score Tethered chapters. soundtrack a yiswmt memorial. featured
              spots on the channel.
            </li>
            <li>
              <span className="text-blue-300/55">—&nbsp;</span>
              <span className="text-blue-100">
                filmmakers, directors, production companies
              </span>{" "}
              → fullsendbash. Tethered video episodes. cross-promo on the
              channel.
            </li>
            <li>
              <span className="text-blue-300/55">—&nbsp;</span>
              <span className="text-blue-100">
                photographers, illustrators, visual artists
              </span>{" "}
              → the drop-artwork rotation. cover art for the sealed worlds at
              thedelos.
            </li>
            <li>
              <span className="text-blue-300/55">—&nbsp;</span>
              <span className="text-blue-100">authors</span> → some of the
              sealed worlds are written. some need co-authors. some need
              translators.
            </li>
            <li>
              <span className="text-blue-300/55">—&nbsp;</span>
              <span className="text-blue-100">
                comedians, actors, influencers
              </span>{" "}
              → fullsendbash, Tethered cameos, the channel.
            </li>
            <li>
              <span className="text-blue-300/55">—&nbsp;</span>
              <span className="text-blue-100">
                any of them needing coverage
              </span>{" "}
              → sharethebyline. submit a moment, Ella drafts it, it runs. no
              editor decides their story isn&rsquo;t worth a desk&rsquo;s
              time.
            </li>
            <li>
              <span className="text-blue-300/55">—&nbsp;</span>
              <span className="text-blue-100">
                labels, publishers, agents, managers
              </span>{" "}
              → counterparties when any of the above scales.
            </li>
          </ul>
        </section>

        <section className="border-t border-blue-400/20 pt-10 space-y-4">
          <p className="text-blue-200/65 text-[10px] sm:text-xs tracking-[0.4em] uppercase">
            // why i need you specifically
          </p>
          <ol className="space-y-3 text-sm sm:text-base text-blue-100/85 list-none">
            <li>
              <span className="text-blue-300/60">1.</span>{" "}
              <span className="text-blue-100">ip architecture.</span> nine
              worlds. original characters. original music. an ongoing fiction
              series. one owner. no counsel. that ends now or it ends badly
              later.
            </li>
            <li>
              <span className="text-blue-300/60">2.</span>{" "}
              <span className="text-blue-100">music + sync.</span> Tethered uses
              music. yiswmt will. the channel will. i want it clean before it
              scales. your NY / TN / NC bar footprint is exactly the right
              triangle for this.
            </li>
            <li>
              <span className="text-blue-300/60">3.</span>{" "}
              <span className="text-blue-100">yiswmt structure.</span> the
              1¢-to-Wounded-Warrior flow and the tee-funded family pot are real
              money paths. they need real legal scaffolding before anyone
              clicks &ldquo;donate.&rdquo;
            </li>
            <li>
              <span className="text-blue-300/60">4.</span>{" "}
              <span className="text-blue-100">
                brand, sponsorship, endorsements
              </span>{" "}
              as the channel grows.
            </li>
            <li>
              <span className="text-blue-300/60">5.</span>{" "}
              <span className="text-blue-100">connections.</span> you are who
              you are. you already know who fits where.
            </li>
            <li>
              <span className="text-blue-300/60">6.</span>{" "}
              <span className="text-blue-100">long-term.</span> when nine
              becomes one, the tunnel opens. that&rsquo;s a moment, not a
              metaphor. i want you in it.
            </li>
          </ol>
        </section>

        <section className="border-t border-blue-400/20 pt-10 space-y-4">
          <p className="text-blue-200/65 text-[10px] sm:text-xs tracking-[0.4em] uppercase">
            // why you, not someone else
          </p>
          <p className="text-blue-100/85 leading-relaxed text-sm sm:text-base">
            your firm&rsquo;s own line:{" "}
            <span className="text-blue-100">
              &ldquo;adding value not only to the careers of clients but to
              their lives.&rdquo;
            </span>{" "}
            that is yiswmt, word for word.
          </p>
          <p className="text-blue-100/85 leading-relaxed text-sm sm:text-base">
            your bio: think outside the box. grassroots. entrepreneurial. keep
            them sane. i need every one of those things, in that order.
          </p>
          <p className="text-blue-100/85 leading-relaxed text-sm sm:text-base">
            also: Wu-Tang and Joe Strummer is the right music to build this to.
            PMA.
          </p>
        </section>

        <section className="border-t border-blue-400/20 pt-10 space-y-4">
          <p className="text-blue-100/85 leading-relaxed text-sm sm:text-base">
            you don&rsquo;t have to decide anything today. read it. sit with it.
            if any part of it pulls, tell me which part and we&rsquo;ll go from
            there.
          </p>
          <p className="text-blue-100/85 leading-relaxed text-sm sm:text-base">
            our kids already think this is normal.
          </p>
          <p
            className="text-blue-100 text-lg sm:text-xl tracking-[0.18em] pt-4"
            style={{
              textShadow:
                "0 0 14px rgba(147,197,253,0.75), 0 0 32px rgba(59,130,246,0.45)",
            }}
          >
            — 零号
          </p>
        </section>
      </div>
    </main>
    </NeilGate>
  );
}
