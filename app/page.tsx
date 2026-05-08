import { HoleInput } from "./hole-input";
import { LinkTile } from "./link-tile";
import { ZeroThoughts } from "./zero-thoughts";
import { LyricRotator } from "./lyric-rotator";
import { MatrixSphere } from "./matrix-sphere";
import { MobileLanding } from "./mobile-landing";
import {
  FigureWithTilesDesktop,
  RadioProvider,
  RadioTilesMobileTop,
  TurntableTile,
  VisualTile,
} from "./radio-tiles";
import { ThemeShifter, ThemeSwitch } from "./theme-shifter";

export default function Home() {
  return (
    <>
      <MobileLanding />
      <div className="hidden sm:block">
        <RadioProvider>
          <ThemeShifter>
          <ThemeSwitch />
          <main className="relative isolate min-h-screen bg-black flex flex-col items-center justify-between gap-6 sm:gap-0 py-4 sm:py-10 px-4">
        <MatrixSphere />
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

        <ZeroThoughts />

        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-10 w-full max-w-md sm:w-auto sm:max-w-none">
          <LinkTile
            label="Current Targets"
            href="/currenttarget"
            subline="○ 02 done · 03 next"
          />
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
          leftSlot={<HoleInput />}
          leftTop={<TurntableTile />}
          rightTop={<VisualTile />}
        />

          </main>
          </ThemeShifter>
        </RadioProvider>
      </div>
    </>
  );
}
