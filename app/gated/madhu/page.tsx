import { Gate } from "../../madhu/gate";

export default function GatedMadhu() {
  return (
    <Gate>
      <main className="min-h-screen bg-black text-blue-100 px-6 py-10 sm:px-10 sm:py-14">
        <article className="max-w-3xl mx-auto flex flex-col gap-10 font-light leading-relaxed">
          <header className="space-y-3">
            <p className="text-blue-100/60 text-xs sm:text-sm tracking-[0.4em] uppercase">
              past the gate
            </p>
            <h1
              className="text-blue-100 text-4xl sm:text-5xl md:text-6xl font-light tracking-[0.15em] uppercase"
              style={{
                textShadow:
                  "0 0 18px rgba(96,165,250,0.7), 0 0 38px rgba(59,130,246,0.4)",
              }}
            >
              madhu
            </h1>
            <p className="text-blue-200 italic tracking-wide text-base sm:text-lg">
              you said the phrase. you&rsquo;re inside the room now.
            </p>
          </header>

          <section className="space-y-4 text-base sm:text-lg">
            <p>
              this surface is its own page. it lives at{" "}
              <span className="font-mono text-blue-200/90">
                madhu.characterzer0.com
              </span>{" "}
              and answers only to that address. nothing here mirrors the
              public waiting room one click in from the hub.
            </p>
            <p className="text-blue-100/70">
              the architecture is being poured below. when the hourglass
              upstairs runs out, this room is what people who said the
              phrase walk into.
            </p>
          </section>

          <hr className="border-blue-100/15" />

          <p className="text-blue-100/50 italic text-xs sm:text-sm tracking-[0.2em] uppercase pt-2">
            under construction &middot; the architect is digging here
          </p>
        </article>
      </main>
    </Gate>
  );
}
