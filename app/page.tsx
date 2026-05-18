import { DestinationTile } from "./destination-tile";
import { MusicPodcastPair } from "./music-podcast-pair";
import { RadioProvider } from "./radio-tiles";

export default function Home() {
  return (
    <main className="flex-1 bg-white text-black flex flex-col items-center justify-center gap-10 px-6 py-16">
      <h1 className="whitespace-nowrap text-[clamp(0.95rem,4.5vw,1.5rem)] tracking-[0.35em] uppercase font-light text-black/80">
        Chracterzer零号
      </h1>
      <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
        <DestinationTile
          label="Sphere"
          tagline="podcast and music video viewer"
          modalTitle="Sphere"
          description="The Sphere is the podcast and music video viewer — chapters of Tethered, the music orb, and the home of the figure himself. Step inside."
          url="/sphere"
        />
        <RadioProvider>
          <div className="flex flex-row items-center justify-center gap-3 w-full">
            <MusicPodcastPair showPodcasts={false} wide />
          </div>
        </RadioProvider>
        <DestinationTile
          label="News"
          tagline="go to spotlightdispatch for the latest news"
          modalTitle="Spotlight Dispatch"
          description="Spotlight Dispatch is our independent newsroom — original reporting and real bylines, written by people, not algorithms. Built and run alongside Chracterzer零号."
          url="https://www.spotlightdispatch.com"
        />
        <DestinationTile
          label="Social"
          tagline="go to sharethebyline to create your own original bylines you can share"
          modalTitle="Share the Byline"
          description="Share the Byline is the social hub for original bylines — write your own, share them, and put your name on what you say. The opposite of an algorithm-fed feed."
          url="https://www.sharethebyline.com"
        />
        <DestinationTile
          label="UAPTASK"
          tagline="real time · live · sci-fi cosgame"
          modalTitle="UAPTASK"
          description="UAPTASK is real-time, live, and active sci-fi cosgame play. Step into a world that's running whether you're watching or not."
          url="https://www.uaptask.com"
        />
        <DestinationTile
          label="BLIYF"
          tagline="breathing life into your fantasies"
          modalTitle="BLIYF"
          description="BLIYF — Breathing Life Into Your Fantasies. The space where the things you imagine become the things you can step inside."
          url="https://bliyf.com"
        />
        <DestinationTile
          label="Merch"
          tagline="the only way we can make any money here"
          modalTitle="The Drop"
          description="The Drop is our first run of branded gear — tees, hoodies, mugs, the works. It's also the only way we make any money here, so it keeps the lights on."
          url="/drop"
        />
        <DestinationTile
          label="IBYDO"
          tagline="if you have a dream, I can make it"
          modalTitle="IBYDO"
          description="IBYDO designed and built this entire site. If you have a dream — for a site, a brand, a moving piece — they can make it."
          url="https://www.ibydo.com"
        />
      </div>
      <p className="text-[10px] tracking-[0.3em] uppercase text-black/50">
        Site by IBYDO
      </p>
    </main>
  );
}
