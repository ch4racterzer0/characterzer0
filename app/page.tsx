import { IframeTilePopup } from "./iframe-tile-popup";
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
          leftTop={
            <IframeTilePopup
              ariaLabel="shot in the dark — dear nra on spotlight dispatch"
              src="https://www.spotlightdispatch.com/dear-nra"
              triggerClassName="group w-44 sm:w-48 backdrop-blur-[2px] bg-white/8 hover:bg-white/15 border border-white/55 hover:border-white/85 px-3 py-2 rounded-sm transition-colors flex flex-col items-center gap-0.5 cursor-pointer"
              triggerStyle={{
                boxShadow:
                  "0 0 22px rgba(255,255,255,0.28), 0 0 50px rgba(255,255,255,0.14), 0 8px 22px -8px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.28)",
              }}
              trigger={
                <>
                  <span className="text-white/70 text-[8px] tracking-[0.4em] uppercase">
                    ↗ flash
                  </span>
                  <span
                    className="text-white text-xs sm:text-sm tracking-[0.22em] uppercase font-light"
                    style={{
                      textShadow:
                        "0 0 10px rgba(255,255,255,0.8), 0 0 22px rgba(255,255,255,0.45)",
                    }}
                  >
                    shot in the dark
                  </span>
                  <span className="text-white/55 text-[8px] tracking-[0.3em] uppercase italic">
                    dear nra
                  </span>
                </>
              }
            />
          }
          rightTop={
            <IframeTilePopup
              ariaLabel="dear elon — draft open letter, ten questions for elon musk"
              src="/dearelon"
              gated
              triggerClassName="group w-44 sm:w-48 backdrop-blur-[2px] bg-white/8 hover:bg-white/15 border border-white/55 hover:border-white/85 px-3 py-2 rounded-sm transition-colors flex flex-col items-center gap-0.5 cursor-pointer"
              triggerStyle={{
                boxShadow:
                  "0 0 22px rgba(255,255,255,0.28), 0 0 50px rgba(255,255,255,0.14), 0 8px 22px -8px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.28)",
              }}
              trigger={
                <>
                  <span className="text-white/70 text-[8px] tracking-[0.4em] uppercase">
                    ↗ draft
                  </span>
                  <span
                    className="text-white text-xs sm:text-sm tracking-[0.22em] uppercase font-light"
                    style={{
                      textShadow:
                        "0 0 10px rgba(255,255,255,0.8), 0 0 22px rgba(255,255,255,0.45)",
                    }}
                  >
                    dear elon
                  </span>
                  <span className="text-white/55 text-[8px] tracking-[0.3em] uppercase italic">
                    🔒 ten questions
                  </span>
                </>
              }
            />
          }
        />

          </main>
          </ThemeShifter>
        </RadioProvider>
      </div>
    </>
  );
}
