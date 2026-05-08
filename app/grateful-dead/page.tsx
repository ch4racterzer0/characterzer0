import Image from "next/image";

export const dynamic = "force-dynamic";

export default function GratefulDeadPage() {
  return (
    <main className="min-h-screen bg-black px-4 py-8 sm:px-8 sm:py-12">
      <article className="max-w-6xl mx-auto flex flex-col gap-8 sm:gap-12">
        <header className="space-y-3">
          <p className="text-red-100/55 text-[10px] sm:text-xs tracking-[0.4em] uppercase">
            file &middot; channel
          </p>
          <h1
            className="text-red-100 text-5xl sm:text-7xl font-light tracking-[0.2em] uppercase"
            style={{
              textShadow:
                "0 0 18px rgba(248,113,113,0.7), 0 0 38px rgba(220,38,38,0.4), 0 0 60px rgba(245,158,11,0.25)",
            }}
          >
            Grateful Dead
          </h1>
          <p className="text-red-200 italic tracking-wide text-base sm:text-lg">
            the long jam &middot; the bus &middot; the deadheads &middot;
            the broadcast that never ends
          </p>
        </header>

        <section className="relative">
          <Image
            src="/cast/dancing-skeletons.webp"
            alt="grateful dead — dancing skeletons"
            width={1456}
            height={816}
            priority
            className="w-full h-auto rounded-xl"
            style={{
              boxShadow:
                "0 0 60px rgba(220,38,38,0.30), 0 0 120px rgba(245,158,11,0.18), inset 0 1px 0 rgba(254,202,202,0.25)",
            }}
          />
        </section>

        <section className="space-y-5 max-w-3xl mx-auto px-2 pb-8">
          <p className="text-red-300/80 text-[10px] sm:text-xs tracking-[0.4em] uppercase">
            // who we are
          </p>
          <p className="text-red-100/90 text-base sm:text-lg leading-relaxed font-light">
            we are the grateful dead. we played our first show in palo
            alto in december 1965. we played our last with jerry on july
            9, 1995. somewhere between those two dates: roughly 2,300
            shows, none of them the same.
          </p>
          <p className="text-red-100/90 text-base sm:text-lg leading-relaxed font-light">
            we never played the same set twice on purpose. we let the
            music decide where the night went. we let the deadheads roll
            tape on every show, because the song belongs to them too.
            that&rsquo;s why you can find any night, any year, any
            version &mdash; somebody was rolling.
          </p>
          <p className="text-red-100/90 text-base sm:text-lg leading-relaxed font-light">
            jerry is gone. that doesn&rsquo;t mean the song is over. dead
            &amp; company toured for ten years. furthur played for years.
            somebody is always going to play china cat into i know you
            rider. somebody is always going to play scarlet into fire.
            the song doesn&rsquo;t end &mdash; somebody just has to keep
            playing it.
          </p>
          <p className="text-red-100/90 text-base sm:text-lg leading-relaxed font-light">
            if you&rsquo;re hearing us through this sphere right now,
            that&rsquo;s the broadcast. the dancing skeletons mean what
            you think they mean. the bears are here. the music never
            stopped.
          </p>
          <p
            className="text-red-100 text-xl sm:text-2xl italic font-light leading-snug"
            style={{
              textShadow:
                "0 0 14px rgba(248,113,113,0.55), 0 0 32px rgba(220,38,38,0.3)",
            }}
          >
            &ldquo;we will get by. we will survive.&rdquo;
          </p>
          <p className="text-red-100/65 italic text-sm sm:text-base">
            &mdash; signed in technicolor
          </p>
        </section>
      </article>
    </main>
  );
}
