import { LinkTile } from "./link-tile";
import {
  FigureWithTilesDesktop,
  RadioProvider,
  RadioTilesMobileTop,
} from "./radio-tiles";

export default function Home() {
  return (
    <RadioProvider>
      <main className="min-h-screen bg-black flex flex-col items-center justify-between gap-4 sm:gap-0 py-4 sm:py-10 px-4">
        <RadioTilesMobileTop />

        <div className="flex flex-col items-center gap-4 sm:gap-10">
          <p className="text-white/45 italic text-[11px] sm:text-sm tracking-wide text-center leading-snug sm:leading-normal sm:whitespace-nowrap">
            <span className="block sm:inline">
              &ldquo;But then I learned just yesterday —
            </span>
            <span className="block sm:inline">
              {" "}
              To rush and never waste the day&rdquo;
            </span>
          </p>
          <LinkTile label="The Creator" href="/creator" large />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-10 w-full max-w-md sm:max-w-none">
          <LinkTile label="Current Targets" href="/currenttarget" />
          <LinkTile label="Current Assets" href="/currentassets" />
          <LinkTile label="WIP" href="/wip" />
          <LinkTile label="It's Your Sphere" href="/yoursphere" />
        </div>

        <FigureWithTilesDesktop />
      </main>
    </RadioProvider>
  );
}
