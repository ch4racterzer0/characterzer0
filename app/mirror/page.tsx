import { Cam } from "./cam";

export default function Mirror() {
  return (
    <main className="min-h-screen bg-black text-blue-100 px-6 py-10 sm:px-10 sm:py-14">
      <article className="max-w-3xl mx-auto flex flex-col gap-8 font-light leading-relaxed">
        <header className="space-y-3">
          <p className="text-blue-100/60 text-xs sm:text-sm tracking-[0.4em] uppercase">
            the mirror
          </p>
          <h1
            className="text-blue-100 text-4xl sm:text-5xl md:text-6xl font-light tracking-[0.15em] uppercase"
            style={{
              textShadow:
                "0 0 18px rgba(96,165,250,0.7), 0 0 38px rgba(59,130,246,0.4)",
            }}
          >
            mirror
          </h1>
          <p className="text-blue-200 italic tracking-wide text-base sm:text-lg">
            connect your camera. step inside the frame.
          </p>
        </header>

        <Cam />

        <hr className="border-blue-100/15" />

        <section className="space-y-3 text-sm sm:text-base text-blue-100/75">
          <p>
            the feed runs in your browser only. nothing reaches our server,
            our blob, our logs, or anyone else&rsquo;s screen.
          </p>
          <p>
            this is the mirror. you walk into it, and you&rsquo;re what plays
            back. for now.
          </p>
        </section>

        <p className="text-blue-100/40 italic text-xs tracking-[0.2em] uppercase pt-2">
          phase 1 &middot; one-way mirror &middot; later: shared frames
        </p>
      </article>
    </main>
  );
}
