import Image from "next/image";
import Link from "next/link";
import { BlackHolePortal } from "./black-hole-portal";
import { Hourglass } from "./hourglass";

export default function Madhu() {
  return (
    <main className="min-h-screen bg-black text-blue-100 px-6 py-10 sm:px-10 sm:py-14">
      <article className="max-w-3xl mx-auto flex flex-col gap-10 font-light leading-relaxed">
        <header className="space-y-3">
          <p className="text-blue-100/60 text-xs sm:text-sm tracking-[0.4em] uppercase">
            the waiting room
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <h1
              className="text-blue-100 text-4xl sm:text-5xl md:text-6xl font-light tracking-[0.15em] uppercase"
              style={{
                textShadow:
                  "0 0 18px rgba(96,165,250,0.7), 0 0 38px rgba(59,130,246,0.4)",
              }}
            >
              madhu
            </h1>
            <Hourglass />
          </div>
          <p className="text-blue-200 italic tracking-wide text-base sm:text-lg">
            from <span className="font-mono">madhuvan</span> &mdash;
            krishna&rsquo;s forest. place of devotion. you are here because
            you wanted to be. that&rsquo;s the only ticket.
          </p>
        </header>

        <div
          className="rounded-xl border border-red-500/40 bg-red-950/20 p-6 sm:p-8 space-y-3"
          style={{
            boxShadow:
              "0 0 35px rgba(220,38,38,0.30), inset 0 1px 0 rgba(254,202,202,0.18)",
          }}
        >
          <p className="text-blue-100 text-lg sm:text-xl font-light leading-relaxed">
            this is the waiting room. you can see the architecture. you
            can&rsquo;t walk through it yet.
          </p>
          <p className="text-red-200/80 italic text-xs sm:text-sm tracking-[0.2em] uppercase pt-2 border-t border-red-500/20">
            when this button goes live, the podcast industry is put on
            notice.
          </p>

          <div className="pt-3 flex justify-center">
            <BlackHolePortal />
          </div>
        </div>

        <section className="space-y-4 text-base sm:text-lg">
          <p>
            below this room are three more &mdash; and one above. each one is
            earned. nothing is sold. the only key the door takes is a parked
            domain pointed at this hub.
          </p>
        </section>

        <hr className="border-blue-100/15" />

        <section className="space-y-5">
          <h2 className="text-blue-100 text-xs sm:text-sm tracking-[0.3em] uppercase">
            the layers
          </h2>

          <ol className="space-y-4">
            <li className="flex items-start gap-4">
              <span className="text-blue-200/60 font-mono text-xs tracking-[0.2em] mt-1 w-12">
                L0
              </span>
              <div>
                <p className="text-blue-100 font-medium">madhu</p>
                <p className="text-blue-100/60 text-sm sm:text-base italic">
                  the waiting room. where you are now. open to anyone.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <span className="text-blue-200/60 font-mono text-xs tracking-[0.2em] mt-1 w-12">
                L1
              </span>
              <div>
                <p className="text-blue-100 font-medium">
                  <Link
                    href="/hungersite"
                    className="hover:text-blue-50 underline underline-offset-4"
                  >
                    hungersite
                  </Link>
                </p>
                <p className="text-blue-100/60 text-sm sm:text-base italic">
                  the first hole. the easy one. one parked domain pointed at
                  us is the whole entry. where the real work starts.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <span className="text-blue-200/60 font-mono text-xs tracking-[0.2em] mt-1 w-12">
                L2
              </span>
              <div>
                <p className="text-blue-100/70 font-medium">
                  dripfield <span className="text-blue-100/40 text-xs">[locked]</span>
                </p>
                <p className="text-blue-100/50 text-sm sm:text-base italic">
                  the field. the room where the work happens. earned from
                  hungersite. not now.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <span className="text-blue-200/60 font-mono text-xs tracking-[0.2em] mt-1 w-12">
                L3
              </span>
              <div>
                <p className="text-blue-100/70 font-medium">
                  source <span className="text-blue-100/40 text-xs">[architect only]</span>
                </p>
                <p className="text-blue-100/50 text-sm sm:text-base italic">
                  the room above the room. controls what runs in the rooms
                  below. invisible to everyone except the architect.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <hr className="border-blue-100/15" />

        <section className="space-y-4">
          <h2 className="text-blue-100 text-xs sm:text-sm tracking-[0.3em] uppercase">
            the operatives
          </h2>
          <p className="text-base sm:text-lg">
            three names. three breeds of goose. it doesn&rsquo;t undo
            <span className="text-blue-100"> Toulouse</span> /{" "}
            <span className="text-blue-100">Nene</span> /{" "}
            <span className="text-blue-100">Brant</span> &mdash; it deepens
            them.
          </p>
          <p className="text-base sm:text-lg">
            in Krishna Consciousness the cowherd/vessel framing is everything.
            <span className="text-blue-100"> Toulouse</span>, the
            real-human-among-the-three, becomes the{" "}
            <em className="text-blue-200">gopi</em> &mdash; the devotee who
            recognizes the divine in the everyday.{" "}
            <span className="text-blue-100">Brant</span> becomes the{" "}
            <em className="text-blue-200">messenger.</em>{" "}
            <span className="text-blue-100">Nene</span> becomes the{" "}
            <em className="text-blue-200">isolated one who knew first.</em>
          </p>
          <p className="italic text-blue-100/70 text-base sm:text-lg">
            the koan and the species names live on different layers and
            reinforce each other.
          </p>
        </section>

        <hr className="border-blue-100/15" />

        <section className="space-y-4">
          <h2 className="text-blue-100 text-xs sm:text-sm tracking-[0.3em] uppercase">
            the channel
          </h2>

          <Link
            href="https://www.youtube.com/@ItsYourSphere"
            target="_blank"
            rel="noopener noreferrer"
            className="block -mx-6 sm:-mx-10 group"
          >
            <Image
              src="/itsyoursphere-banner.png"
              alt="itsyoursphere"
              width={1672}
              height={941}
              priority
              className="w-full h-auto block transition-opacity group-hover:opacity-90"
            />
          </Link>

          <p className="text-base sm:text-lg">
            we&rsquo;re posting videos on our youtube channel showing how easy
            it is to park on top of this and earn your key.
          </p>

          <p className="text-blue-100/70 italic text-base sm:text-lg pt-2">
            the goose was never in the bottle. core4 just opens its hand.
          </p>
        </section>

        <hr className="border-blue-100/15" />

        <div
          className="rounded-xl border border-blue-400/40 bg-blue-950/40 p-6 sm:p-8 space-y-3"
          style={{
            boxShadow:
              "0 0 35px rgba(59,130,246,0.30), inset 0 1px 0 rgba(147,197,253,0.20)",
          }}
        >
          <p className="text-blue-100 text-xs sm:text-sm tracking-[0.3em] uppercase">
            the koan
          </p>
          <p className="text-blue-100 text-lg sm:text-xl italic leading-relaxed">
            a man raises a goose in a bottle. as the goose grows, it
            can&rsquo;t fit. how do you free the goose without breaking the
            bottle or harming the bird?
          </p>
          <p
            className="text-blue-50 text-lg sm:text-xl font-medium"
            style={{
              textShadow:
                "0 0 16px rgba(180,210,255,0.9), 0 0 32px rgba(96,165,250,0.7)",
            }}
          >
            &ldquo;the goose is out.&rdquo;
          </p>
          <p className="text-blue-100/60 italic text-sm sm:text-base">
            the bottle was the construct.
          </p>
        </div>
      </article>
    </main>
  );
}
