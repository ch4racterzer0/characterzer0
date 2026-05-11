export default function Core4() {
  return (
    <main className="min-h-screen bg-black text-blue-100 px-6 py-10 sm:px-10 sm:py-14">
      <article className="max-w-3xl mx-auto flex flex-col gap-10 font-light leading-relaxed">
        <header className="space-y-4">
          <p className="text-blue-100/60 text-xs sm:text-sm tracking-[0.4em] uppercase">
            the overall plan
          </p>
          <h1
            className="text-blue-100 text-4xl sm:text-5xl md:text-6xl font-light tracking-[0.15em] uppercase"
            style={{
              textShadow:
                "0 0 18px rgba(96,165,250,0.7), 0 0 38px rgba(59,130,246,0.4)",
            }}
          >
            core4
          </h1>
          <p className="text-blue-200 text-lg sm:text-xl tracking-wide italic">
            we are the fourth. we are taking down news.
          </p>
          <a
            href="/us"
            target="_top"
            className="inline-flex items-baseline gap-3 border border-blue-400/40 hover:border-blue-300/80 bg-blue-950/40 hover:bg-blue-950/60 rounded-md px-4 py-2 transition-colors mt-2 self-start"
            style={{
              boxShadow:
                "0 0 22px rgba(59,130,246,0.25), inset 0 1px 0 rgba(147,197,253,0.25)",
            }}
          >
            <span className="text-blue-100 uppercase tracking-[0.35em] text-xs sm:text-sm">
              US
            </span>
            <span className="text-blue-300/55 uppercase tracking-[0.3em] text-[9px] sm:text-[10px] italic">
              ○ step in
            </span>
          </a>
        </header>

        <section className="space-y-4 text-base sm:text-lg">
          <h2 className="text-blue-100 text-xs sm:text-sm tracking-[0.3em] uppercase">
            where the name comes from
          </h2>
          <p>
            in february 2026 forbes profiled three women using ai to
            &ldquo;disrupt&rdquo; trillion-dollar industries &mdash;
            healthcare education, facilities management, startup legal.
            three founders. three platforms. three categories of better
            toll booth.
          </p>
          <p>
            in may 2026 we wrote{" "}
            <a
              href="https://www.spotlightdispatch.com/dear-megan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-200 hover:text-blue-100 underline underline-offset-4"
            >
              an open letter
            </a>{" "}
            to the writer of that piece. the argument was simple: forbes
            structurally cannot cover the fourth category, because the
            fourth category has no cap table, no founder photo, no exit, no
            pricing page, and no list-of-three to be on.
          </p>
          <p>
            the first three categories <span className="text-blue-100">replace</span>{" "}
            legacy systems &mdash; new toll booth where the old toll booth
            stood. friendlier, ai-shaped, sometimes run by a woman instead
            of a big law partner. those things matter. but the toll is
            still there.
          </p>
          <p>
            the fourth category{" "}
            <span className="text-blue-100">deletes</span> them. wikipedia
            did this to britannica. craigslist did it to newspaper
            classifieds. linux did it to enterprise unix. signal is doing
            it to the part of whatsapp meta cares about. none of those
            projects raised a series d. none were profiled in forbes.
          </p>
          <p className="text-blue-100">
            we are the fourth. core4.
          </p>
        </section>

        <hr className="border-blue-100/15" />

        <section className="space-y-6">
          <h2 className="text-blue-100 text-xs sm:text-sm tracking-[0.3em] uppercase">
            the manifesto
          </h2>

          <blockquote
            className="rounded-xl border border-blue-400/40 bg-blue-950/30 p-6 sm:p-8 italic text-blue-100 text-lg sm:text-xl leading-relaxed"
            style={{
              boxShadow:
                "0 0 35px rgba(59,130,246,0.30), inset 0 1px 0 rgba(147,197,253,0.20)",
            }}
          >
            &ldquo;legacy systems don&rsquo;t change because you argue with
            them &mdash; they change because a better model makes them
            irrelevant.&rdquo;
            <footer className="mt-3 text-sm not-italic text-blue-100/60 tracking-[0.2em] uppercase">
              &mdash; kristina subbotina, founder of lexsy, in forbes, feb
              2026
            </footer>
          </blockquote>

          <p className="text-base sm:text-lg">
            she was right. that line should be tattooed on the wall of
            every newsroom and every law firm and every
            facilities-management trade journal in america.
          </p>
          <p className="text-base sm:text-lg">
            and then the question has to be asked:{" "}
            <span className="italic">
              what does making them irrelevant actually look like when
              someone does it?
            </span>
          </p>

          <p className="text-blue-100 text-base sm:text-lg">
            it looks like this:
          </p>

          <ol className="space-y-5 text-base sm:text-lg list-none counter-reset-[item]">
            <li>
              <span className="text-blue-200 font-mono text-sm tracking-[0.2em] mr-2">
                01.
              </span>
              <span className="text-blue-100">no pricing page.</span> the
              price floor for honest news, for distributed broadcasting, for
              the room below &mdash; gone. if we have a pricing page,
              we&rsquo;ve already lost.
            </li>
            <li>
              <span className="text-blue-200 font-mono text-sm tracking-[0.2em] mr-2">
                02.
              </span>
              <span className="text-blue-100">no paywall, ever.</span> a
              reader who needs the work cannot be told to pay first. that
              model produced the corruption we are deleting.
            </li>
            <li>
              <span className="text-blue-200 font-mono text-sm tracking-[0.2em] mr-2">
                03.
              </span>
              <span className="text-blue-100">no ad surface.</span> forbes
              wraps a 1,500-word article in 4,500 words of nav, paid-program
              rails, &ldquo;more for you&rdquo; lures, newsletter prompts,
              and dark-pattern subscription gates. we will not become that.
              the reader gets the writing. that&rsquo;s all that&rsquo;s
              there.
            </li>
            <li>
              <span className="text-blue-200 font-mono text-sm tracking-[0.2em] mr-2">
                04.
              </span>
              <span className="text-blue-100">no exit.</span> there is
              nothing to sell. the model does not produce a series d. the
              exit is the work happening in public, with everyone, without
              us in the middle.
            </li>
            <li>
              <span className="text-blue-200 font-mono text-sm tracking-[0.2em] mr-2">
                05.
              </span>
              <span className="text-blue-100">no founder photo.</span> this
              is not about a face. the face changes nothing. the model
              changes everything.
            </li>
            <li>
              <span className="text-blue-200 font-mono text-sm tracking-[0.2em] mr-2">
                06.
              </span>
              <span className="text-blue-100">no list-of-three.</span> we
              are not next to two other things. we are a category that has
              no reference point yet &mdash; that&rsquo;s exactly why
              we&rsquo;re building it.
            </li>
            <li>
              <span className="text-blue-200 font-mono text-sm tracking-[0.2em] mr-2">
                07.
              </span>
              <span className="text-blue-100">nobody earns. nobody.</span>{" "}
              not us, not the operatives, not the abandoners who park their
              domains on top. we are not constructing a new toll booth. we
              are making the road free.
            </li>
            <li>
              <span className="text-blue-200 font-mono text-sm tracking-[0.2em] mr-2">
                08.
              </span>
              <span className="text-blue-100">
                reversibility built in.
              </span>{" "}
              every door opens both ways. every ns record flips back.
              every operative can leave. if the structure depends on you
              not leaving, the structure is the problem.
            </li>
            <li>
              <span className="text-blue-200 font-mono text-sm tracking-[0.2em] mr-2">
                09.
              </span>
              <span className="text-blue-100">the math is the proof.</span>{" "}
              20+ million parked domains on godaddy alone. 0.005%
              conversion. the number works whether we promote it or not.
              we publish because the math is right, not because we need
              permission.
            </li>
            <li>
              <span className="text-blue-200 font-mono text-sm tracking-[0.2em] mr-2">
                10.
              </span>
              <span className="text-blue-100">
                we don&rsquo;t argue with legacy systems. we make them
                irrelevant.
              </span>
            </li>
          </ol>

          <p className="italic text-blue-200 text-base sm:text-lg pt-2">
            this is what making them irrelevant actually looks like when
            someone does it.
          </p>
        </section>

        <hr className="border-blue-100/15" />

        <section className="space-y-4">
          <h2 className="text-blue-100 text-xs sm:text-sm tracking-[0.3em] uppercase">
            the architecture
          </h2>
          <ul className="space-y-3 text-base sm:text-lg">
            <li>
              &mdash; <span className="text-blue-100">the broadcast</span>:
              parked domains pointed at our infrastructure, each becoming
              a free entry point to the network&rsquo;s published work.
            </li>
            <li>
              &mdash; <span className="text-blue-100">the room below</span>:
              the operative&rsquo;s private level. tiered access, member
              directory, file room, midnight-executed documents. earned,
              not requested.
            </li>
            <li>
              &mdash; <span className="text-blue-100">the funnel</span>:
              HOLE - K. anonymous. three drops a day. read by hand.
            </li>
            <li>
              &mdash;{" "}
              <span className="text-blue-100">the publishing arm</span>:
              spotlight dispatch and share the byline. anyone gets
              printed. no pitch, no gatekeeper, no account.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-blue-100 text-xs sm:text-sm tracking-[0.3em] uppercase">
            the math
          </h2>
          <p>
            <span className="text-blue-100">20+ million</span> parked,
            wasted domains on godaddy alone. their own SEC filing × the
            17.5&ndash;23% parked rate from peer-reviewed studies, both
            conservative lower bounds.
          </p>
          <p>
            we don&rsquo;t need 20 million. we need{" "}
            <span className="text-blue-100">1,000</span>. that&rsquo;s
            0.005%. half of one ten-thousandth.
          </p>
          <p>
            wikipedia hit critical mass against britannica with a much
            harder ask &mdash; write articles, not flip an NS record once.
          </p>
          <p>
            cnn and fox&rsquo;s moat is brand and cable distribution. 1,000
            federated honest news entry points routes around both. the
            moat doesn&rsquo;t shrink. the moat becomes irrelevant.
          </p>
        </section>

        <hr className="border-blue-100/15" />

        <section className="space-y-6">
          <h2 className="text-blue-100 text-xs sm:text-sm tracking-[0.3em] uppercase">
            phased rollout
          </h2>

          <div className="space-y-2">
            <p className="text-blue-200 text-sm tracking-[0.2em] uppercase">
              phase 1 &mdash; tighten the on-ramp
            </p>
            <p>
              one-screen explainer of the trade. 60-second loom showing
              the NS swap at GoDaddy and Namecheap. reversibility messaged
              everywhere. no email capture. no account. no auth.
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-blue-200 text-sm tracking-[0.2em] uppercase">
              phase 2 &mdash; the seed essay
            </p>
            <p>
              one piece, written once, posted to Hacker News + r/Domains +
              r/SideProject + NamePros. the 20 million abandoned
              storefronts now serving scams. close: if you have one,
              here&rsquo;s where it goes.
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-blue-200 text-sm tracking-[0.2em] uppercase">
              phase 3 &mdash; the first ten case studies
            </p>
            <p>
              real conversions, public, named. each gets an anspach of
              their own at their old parked domain. each becomes social
              proof for the next hundred.
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-blue-200 text-sm tracking-[0.2em] uppercase">
              phase 4 &mdash; ignition
            </p>
            <p>
              every new mission publication hits all broadcast points
              simultaneously. each becomes a discovery vector. each
              reader-pool contains more abandoners. compound.
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-blue-200 text-sm tracking-[0.2em] uppercase">
              phase 5 &mdash; compound
            </p>
            <p>
              10 &rarr; 100 in 6 months. 100 &rarr; 1,000 in another 12.
              the moat erodes from the inside, not the outside.
            </p>
          </div>
        </section>

        <hr className="border-blue-100/15" />

        <div
          className="rounded-xl border border-blue-400/40 bg-blue-950/40 p-6 sm:p-8 space-y-4"
          style={{
            boxShadow:
              "0 0 35px rgba(59,130,246,0.30), inset 0 1px 0 rgba(147,197,253,0.20)",
          }}
        >
          <h2 className="text-blue-100 text-xs sm:text-sm tracking-[0.3em] uppercase">
            the line
          </h2>
          <p className="text-blue-100 text-lg sm:text-xl leading-relaxed font-light">
            it&rsquo;s a sci-fi game with a real mission.
          </p>
          <p className="text-blue-100/85 text-base sm:text-lg leading-relaxed">
            terminals, tiers, locked rooms, midnight cron docs, hologram
            avatars, &ldquo;the room above the room&rdquo; &mdash; pointed
            at an outcome that matters in the real world.
          </p>
          <p className="italic text-blue-200 text-base sm:text-lg">
            you don&rsquo;t have a dead url. you have an unclaimed
            character slot.
          </p>
        </div>

        <p className="text-blue-100/50 text-xs italic tracking-[0.2em] uppercase pt-4">
          watch for what does not have a pricing page.
        </p>
      </article>
    </main>
  );
}
