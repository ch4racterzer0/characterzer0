import Link from "next/link";
import { MusicPodcastPair } from "./music-podcast-pair";
import { RadioProvider } from "./radio-tiles";

export default function Home() {
  return (
    <main className="flex-1 bg-white text-black flex flex-col items-center justify-center gap-10 px-6 py-16">
      <h1 className="whitespace-nowrap text-[clamp(0.95rem,4.5vw,1.5rem)] tracking-[0.35em] uppercase font-light text-black/80">
        Chracterzer零号
      </h1>
      <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
        <Link
          href="/sphere"
          className="group block rounded-md border border-black/25 bg-white hover:bg-black hover:text-white transition-colors px-6 py-4 text-center"
        >
          <span className="block text-base tracking-[0.5em] uppercase font-light">
            Sphere
          </span>
          <span className="block mt-1 text-[10px] tracking-[0.25em] uppercase text-black/55 group-hover:text-white/65">
            podcast and music video viewer
          </span>
        </Link>
        <RadioProvider>
          <div className="flex flex-row items-center justify-center gap-3 w-full">
            <MusicPodcastPair showPodcasts={false} wide />
          </div>
        </RadioProvider>
        <a
          href="https://www.spotlightdispatch.com"
          className="group block rounded-md border border-black/25 bg-white hover:bg-black hover:text-white transition-colors px-6 py-4 text-center"
        >
          <span className="block text-base tracking-[0.5em] uppercase font-light">
            News
          </span>
          <span className="block mt-1 text-[10px] tracking-[0.25em] uppercase text-black/55 group-hover:text-white/65">
            go to spotlightdispatch for the latest news
          </span>
        </a>
        <a
          href="https://www.sharethebyline.com"
          className="group block rounded-md border border-black/25 bg-white hover:bg-black hover:text-white transition-colors px-6 py-4 text-center"
        >
          <span className="block text-base tracking-[0.5em] uppercase font-light">
            Social
          </span>
          <span className="block mt-1 text-[10px] tracking-[0.25em] uppercase text-black/55 group-hover:text-white/65">
            go to sharethebyline to create your own original bylines you can share
          </span>
        </a>
        <a
          href="https://www.uaptask.com"
          className="group block rounded-md border border-black/25 bg-white hover:bg-black hover:text-white transition-colors px-6 py-4 text-center"
        >
          <span className="block text-base tracking-[0.5em] uppercase font-light">
            UAPTASK
          </span>
          <span className="block mt-1 text-[10px] tracking-[0.25em] uppercase text-black/55 group-hover:text-white/65">
            real time · live · sci-fi cosgame
          </span>
        </a>
        <a
          href="https://bliyf.com"
          className="group block rounded-md border border-black/25 bg-white hover:bg-black hover:text-white transition-colors px-6 py-4 text-center"
        >
          <span className="block text-base tracking-[0.5em] uppercase font-light">
            BLIYF
          </span>
          <span className="block mt-1 text-[10px] tracking-[0.25em] uppercase text-black/55 group-hover:text-white/65">
            breathing life into your fantasies
          </span>
        </a>
        <Link
          href="/drop"
          className="group block rounded-md border border-black/25 bg-white hover:bg-black hover:text-white transition-colors px-6 py-4 text-center"
        >
          <span className="block text-base tracking-[0.5em] uppercase font-light">
            Merch
          </span>
          <span className="block mt-1 text-[10px] tracking-[0.25em] uppercase text-black/55 group-hover:text-white/65">
            the only way we can make any money here
          </span>
        </Link>
        <a
          href="https://www.ibydo.com"
          className="group block rounded-md border border-black/25 bg-white hover:bg-black hover:text-white transition-colors px-6 py-4 text-center"
        >
          <span className="block text-base tracking-[0.5em] uppercase font-light">
            IBYDO
          </span>
          <span className="block mt-1 text-[10px] tracking-[0.25em] uppercase text-black/55 group-hover:text-white/65">
            if you have a dream, I can make it
          </span>
        </a>
      </div>
      <p className="text-[10px] tracking-[0.3em] uppercase text-black/50">
        Site by IBYDO
      </p>
    </main>
  );
}
