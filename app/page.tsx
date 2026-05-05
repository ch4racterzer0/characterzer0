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
      <main className="min-h-screen bg-black flex flex-col items-center justify-between gap-6 sm:gap-0 py-4 sm:py-10 px-4">
        <RadioTilesMobileTop />

        <div className="flex flex-col items-center gap-6 sm:gap-10">
          <LyricRotator />
          <div className="flex flex-row items-center gap-6 sm:gap-6">
            <div className="hidden sm:block">
              <LinkTile label="Creators" href="/creator" large />
            </div>
            <LinkTile label="Mission" href="/mission" large />
          </div>
          <LinkTile label="Core4" href="/core4" large />
          <LinkTile label="Current Assignment" href="/currentassignment" large />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-10 w-full max-w-md sm:w-auto sm:max-w-none">
          <LinkTile label="Current Targets" href="/currenttarget" />
          <LinkTile label="Current Assets" href="/currentassets" />
          <LinkTile label="WIP" href="/wip" />
          <LinkTile label="Your Own Anspach" href="/yoursphere" />
        </div>

        <FigureWithTilesDesktop />
      </main>
      </ThemeShifter>
    </RadioProvider>
  );
}
