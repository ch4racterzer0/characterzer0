import Image from "next/image";
import { LinkTile } from "./link-tile";
import { LyricRotator } from "./lyric-rotator";
import {
  FigureWithTilesDesktop,
  RadioProvider,
  RadioTilesMobileTop,
} from "./radio-tiles";
import { ThemeShifter, ThemeSwitch } from "./theme-shifter";

export default function Home() {
  return (
    <RadioProvider>
      <ThemeShifter>
      <ThemeSwitch />
      <main className="relative isolate min-h-screen bg-black flex flex-col items-center justify-between gap-6 sm:gap-0 py-4 sm:py-10 px-4">
        <RadioTilesMobileTop />

        <LinkTile label="Madhu" href="/madhu" large />

        <div className="flex flex-col items-center gap-6 sm:gap-10">
          <div className="hidden sm:block">
            <LyricRotator />
          </div>
          <div className="flex flex-row items-center gap-6 sm:gap-8">
            <LinkTile label="Core4" href="/core4" large />
            <div className="hidden sm:block">
              <LinkTile label="Quest" href="/quest" large />
            </div>
          </div>
        </div>

        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-10 w-full max-w-md sm:w-auto sm:max-w-none">
          <LinkTile label="Current Targets" href="/currenttarget" />
          <LinkTile label="Current Assets" href="/currentassets" />
          <LinkTile label="WIP" href="/wip" />
          <LinkTile label="Your Own Anspach" href="/yoursphere" />
        </div>

        <div className="sm:hidden flex flex-row items-center justify-center gap-6">
          <LinkTile label="US" href="/us" />
          <LinkTile label="Your Own Anspach" href="/yoursphere" />
        </div>

        <FigureWithTilesDesktop
          rightSlot={<LinkTile label="US" href="/us" subline="○ step in" />}
        />

        <div className="hidden sm:flex flex-row items-center justify-center flex-wrap gap-4 sm:gap-6 mt-2">
          <LinkTile label="Don't Forget" href="/dontforget" />
          <LinkTile label="My Heaviest Lifts" href="/heaviestlifts" />
        </div>

        <a
          href="https://www.youtube.com/@ItsYourSphere"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="open the It's Your Sphere YouTube channel"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl pointer-events-auto group"
          style={{ zIndex: -1 }}
        >
          <Image
            src="/itsyoursphere-banner.png"
            alt="It's Your Sphere — the video arm of core4"
            width={1672}
            height={941}
            className="w-full h-auto opacity-[0.11] group-hover:opacity-[0.40] transition-opacity duration-700"
            style={{ mixBlendMode: "screen" }}
          />
        </a>
      </main>
      </ThemeShifter>
    </RadioProvider>
  );
}
