import { LinkTile } from "./link-tile";
import { LyricRotator } from "./lyric-rotator";
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
          <LyricRotator />
          <div className="flex flex-row items-center gap-3 sm:gap-6">
            <LinkTile label="Creators" href="/creator" large />
            <LinkTile label="Mission" href="/mission" large />
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-10 w-full max-w-md sm:w-auto sm:max-w-none">
          <LinkTile label="Current Targets" href="/currenttarget" />
          <LinkTile label="Current Assets" href="/currentassets" />
          <LinkTile label="WIP" href="/wip" />
          <LinkTile label="Your Own Anspach" href="/yoursphere" />
        </div>

        <FigureWithTilesDesktop />
      </main>
    </RadioProvider>
  );
}
