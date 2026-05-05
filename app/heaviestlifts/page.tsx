export default function HeaviestLifts() {
  return (
    <main className="min-h-screen bg-black text-blue-100 px-6 py-10 sm:px-10 sm:py-14">
      <article className="max-w-2xl mx-auto flex flex-col gap-10 font-light leading-relaxed">
        <header className="space-y-3">
          <p className="text-blue-100/60 text-xs sm:text-sm tracking-[0.4em] uppercase">
            on the bar right now
          </p>
          <h1
            className="text-blue-100 text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.15em] uppercase"
            style={{
              textShadow:
                "0 0 18px rgba(96,165,250,0.7), 0 0 38px rgba(59,130,246,0.4)",
            }}
          >
            my heaviest lifts
          </h1>
        </header>

        <ol className="space-y-7 font-mono text-blue-100/85 text-[12px] sm:text-[13px] leading-relaxed">
          <li>
            <p className="text-blue-100 uppercase tracking-[0.2em] text-xs">
              &gt; 01 &middot; learning how to podcast while still digging
            </p>
            <p className="mt-2 text-blue-100/75">
              &gt; two skills at once. neither one optional. the rooms below
              don&rsquo;t pause while i pick up new gear above.
            </p>
          </li>

          <li>
            <p className="text-blue-100 uppercase tracking-[0.2em] text-xs">
              &gt; 02 &middot; more thoughts than time
            </p>
            <p className="mt-2 text-blue-100/75">
              &gt; throughput problem. ten ideas land in a day, one ships.
              the rest pile up at the door and start to mold.
            </p>
          </li>

          <li>
            <p className="text-blue-100 uppercase tracking-[0.2em] text-xs">
              &gt; 03 &middot; not enough domains
            </p>
            <p className="mt-2 text-blue-100/75">
              &gt; every arm scales by parked-domain count. the pile is
              shorter than the runway. need more carriers.
            </p>
          </li>

          <li>
            <p
              className="text-blue-100 uppercase tracking-[0.2em] text-xs"
              style={{
                textShadow:
                  "0 0 14px rgba(96,165,250,0.8), 0 0 28px rgba(59,130,246,0.5)",
              }}
            >
              &gt; 04 &middot; no clear vision &mdash; until now
            </p>
            <p className="mt-2 text-blue-100">
              &gt; this one&rsquo;s off the bar.{" "}
              <span
                className="font-bold tracking-[0.15em]"
                style={{
                  textShadow:
                    "0 0 16px rgba(180,210,255,0.95), 0 0 32px rgba(96,165,250,0.7)",
                }}
              >
                CORE4
              </span>
              . the vision named itself. the architecture followed.
            </p>
          </li>
        </ol>

        <hr className="border-blue-100/15" />

        <p className="text-blue-100/50 italic text-xs sm:text-sm tracking-[0.2em] uppercase pt-2">
          three left on the bar. one already racked.
        </p>
      </article>
    </main>
  );
}
