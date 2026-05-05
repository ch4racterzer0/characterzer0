import { CreatorsFlash } from "./creators-flash";
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
      <main className="relative min-h-screen bg-black flex flex-col items-center justify-between gap-6 sm:gap-0 py-4 sm:py-10 px-4">
        <RadioTilesMobileTop />

        <div
          className="relative font-mono text-blue-100 text-sm sm:text-base md:text-lg tracking-wide rounded-xl border border-blue-300/60 bg-blue-950/40 backdrop-blur-sm px-5 py-3 sm:px-8 sm:py-5 max-w-[90vw] sm:max-w-2xl text-center"
          style={{
            transform: "perspective(1200px) rotateX(-5deg) translateZ(20px)",
            boxShadow:
              "0 0 40px rgba(96,165,250,0.5), 0 0 80px rgba(59,130,246,0.3), 0 22px 55px -12px rgba(59,130,246,0.5), inset 0 1px 0 rgba(147,197,253,0.4)",
            textShadow:
              "0 0 12px rgba(96,165,250,0.7), 0 0 25px rgba(59,130,246,0.4)",
          }}
        >
          <span className="block">
            <span className="text-blue-50">FULLSENDBASH</span>
            ....&nbsp;connecting the tether to this parked GoDaddy domain.
          </span>
          <span
            className="inline-block mt-2 px-3 py-0.5 rounded text-blue-50 font-bold uppercase tracking-[0.3em]"
            style={{
              textShadow:
                "0 0 22px rgba(180,210,255,1), 0 0 45px rgba(96,165,250,0.85), 0 0 90px rgba(59,130,246,0.6)",
            }}
          >
            tonight
          </span>
        </div>

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
          rightSlot={<LinkTile label="US" href="/us" />}
        />

        <div className="hidden sm:flex flex-row items-center justify-center flex-wrap gap-4 sm:gap-6 mt-2">
          <LinkTile label="Don't Forget" href="/dontforget" />
          <LinkTile label="Stream" href="/stream" />
        </div>
      </main>
      <CreatorsFlash />
      </ThemeShifter>
    </RadioProvider>
  );
}
