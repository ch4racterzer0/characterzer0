import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "contact — Chracterzer零号",
  description:
    "the masthead. one chair. one door. office of the architect.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-blue-100 font-mono flex flex-col items-center px-6 py-16 sm:py-24">
      <div className="w-full max-w-2xl flex flex-col items-center gap-10">
        <header className="flex flex-col items-center gap-3">
          <p
            className="text-blue-200/65 text-[10px] sm:text-xs tracking-[0.5em] uppercase"
            style={{ textShadow: "0 0 8px rgba(96,165,250,0.45)" }}
          >
            // masthead
          </p>
          <p
            className="text-blue-100 text-5xl sm:text-6xl tracking-[0.18em] font-light"
            style={{
              textShadow:
                "0 0 16px rgba(147,197,253,0.85), 0 0 36px rgba(59,130,246,0.5)",
            }}
          >
            零号
          </p>
          <p
            className="text-blue-100 text-base sm:text-lg tracking-[0.45em] uppercase"
            style={{
              textShadow: "0 0 10px rgba(147,197,253,0.55)",
            }}
          >
            office of the architect
          </p>
          <p className="text-blue-200/60 text-[10px] sm:text-xs tracking-[0.4em] uppercase italic">
            Chracterzer零号
          </p>
          <span
            aria-hidden
            className="block w-24 h-px bg-blue-400/40 mt-1"
            style={{ boxShadow: "0 0 10px rgba(96,165,250,0.55)" }}
          />
        </header>

        <section
          className="w-full border border-blue-400/25 rounded-md bg-blue-950/15 p-6 sm:p-9"
          style={{
            boxShadow:
              "0 0 28px rgba(59,130,246,0.18), inset 0 1px 0 rgba(147,197,253,0.18)",
          }}
        >
          <dl className="grid grid-cols-[8rem_1fr] sm:grid-cols-[9rem_1fr] gap-y-5 gap-x-4 text-sm sm:text-base">
            <dt className="text-blue-200/65 text-[10px] sm:text-xs tracking-[0.35em] uppercase pt-1">
              publisher
            </dt>
            <dd className="text-blue-100">
              character zer0
              <br />
              <span className="text-blue-200/55 text-[10px] sm:text-xs tracking-[0.25em] uppercase italic">
                architect of nine
              </span>
            </dd>

            <dt className="text-blue-200/65 text-[10px] sm:text-xs tracking-[0.35em] uppercase pt-1">
              telephone
            </dt>
            <dd className="text-blue-100 tracking-[0.15em] tabular-nums">
              (XXX) XXX-XXXX
            </dd>

            <dt className="text-blue-200/65 text-[10px] sm:text-xs tracking-[0.35em] uppercase pt-1">
              electronic
            </dt>
            <dd className="text-blue-100 break-all">
              characterzer0@characterzer0.com
              <br />
              <span className="text-blue-200/55 text-[10px] sm:text-xs tracking-[0.25em] uppercase italic">
                programmed to only accept its own tld
              </span>
            </dd>

            <dt className="text-blue-200/65 text-[10px] sm:text-xs tracking-[0.35em] uppercase pt-1">
              press
            </dt>
            <dd className="text-blue-100 break-all">
              press@characterzer0.com
            </dd>

            <dt className="text-blue-200/65 text-[10px] sm:text-xs tracking-[0.35em] uppercase pt-1">
              legal
            </dt>
            <dd className="text-blue-100 break-all">
              counsel@characterzer0.com
            </dd>

            <dt className="text-blue-200/65 text-[10px] sm:text-xs tracking-[0.35em] uppercase pt-1">
              post
            </dt>
            <dd className="text-blue-200/55 italic text-xs sm:text-sm">
              address pending
            </dd>

            <dt className="text-blue-200/65 text-[10px] sm:text-xs tracking-[0.35em] uppercase pt-1">
              hours
            </dt>
            <dd className="text-blue-100">
              when the work is being done
              <br />
              <span className="text-blue-200/55 text-[10px] sm:text-xs tracking-[0.25em] uppercase italic">
                which is most hours
              </span>
            </dd>
          </dl>
        </section>

        <section className="w-full flex flex-col items-center gap-3 pt-2">
          <p className="text-blue-200/65 text-[10px] sm:text-xs tracking-[0.4em] uppercase">
            // editorial
          </p>
          <p className="text-blue-100/80 text-sm sm:text-base leading-relaxed text-center max-w-prose">
            every letter, every tile, every chapter on this network is written
            by one person and the AI the work is done in front of. nothing is
            ghostwritten by a desk and nothing is filed on someone else&rsquo;s
            authority. the byline is the masthead. the masthead is this page.
          </p>
        </section>

        <footer className="flex flex-col items-center gap-2 pt-6">
          <span
            aria-hidden
            className="block w-16 h-px bg-blue-400/35"
            style={{ boxShadow: "0 0 8px rgba(96,165,250,0.4)" }}
          />
          <p
            className="text-blue-100 text-base tracking-[0.35em] uppercase"
            style={{ textShadow: "0 0 10px rgba(147,197,253,0.55)" }}
          >
            零号
          </p>
          <p className="text-blue-200/55 text-[10px] tracking-[0.4em] uppercase italic">
            one chair · one door
          </p>
        </footer>
      </div>
    </main>
  );
}
