import { LinkTile } from "./link-tile";
import { LyricRotator } from "./lyric-rotator";
import { MatrixSphere } from "./matrix-sphere";
import { MobileLanding } from "./mobile-landing";
import {
  FigureWithTilesDesktop,
  RadioProvider,
  RadioTilesMobileTop,
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

        <a
          href="https://www.spotlightdispatch.com/dear-nra"
          target="_top"
          rel="noopener"
          aria-label="shot in the dark — dear nra on spotlight dispatch"
          className="group hidden sm:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-72 sm:w-80 backdrop-blur-[2px] bg-white/8 hover:bg-white/15 border border-white/55 hover:border-white/85 px-5 py-4 sm:px-6 sm:py-5 rounded-sm transition-colors flex-col items-center gap-1.5"
          style={{
            boxShadow:
              "0 0 35px rgba(255,255,255,0.30), 0 0 80px rgba(255,255,255,0.18), 0 14px 32px -10px rgba(0,0,0,0.70), inset 0 1px 0 rgba(255,255,255,0.30)",
          }}
        >
          <span className="text-white/70 text-[9px] sm:text-[10px] tracking-[0.4em] uppercase">
            ↗ flash
          </span>
          <span
            className="text-white text-xl sm:text-2xl tracking-[0.25em] uppercase font-light group-hover:text-white transition-colors"
            style={{
              textShadow:
                "0 0 14px rgba(255,255,255,0.85), 0 0 28px rgba(255,255,255,0.55), 0 0 60px rgba(255,255,255,0.28)",
            }}
          >
            shot in the dark
          </span>
          <span className="text-white/55 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase italic">
            dear nra · spotlight dispatch
          </span>
        </a>

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

          </main>
          </ThemeShifter>
        </RadioProvider>
      </div>
    </>
  );
}
