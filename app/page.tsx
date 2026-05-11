import { HoleInput } from "./hole-input";
import { IframeTilePopup } from "./iframe-tile-popup";
import { LinkTile } from "./link-tile";
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
          <main className="relative z-10 isolate min-h-screen bg-transparent flex flex-col items-center justify-between gap-6 sm:gap-0 py-4 sm:py-10 px-4">
        <RadioTilesMobileTop />

        <div className="flex flex-row items-center justify-center gap-4 sm:gap-8 flex-wrap">
          <LinkTile key="core4" label="Core4" href="/core4" large />
          <LinkTile key="madhu" label="Madhu" href="/madhu" large />
          <div key="quest-wrap" className="hidden sm:block">
            <LinkTile label="Quest" href="/quest" large />
          </div>
        </div>

        <div className="sm:hidden flex flex-row items-center justify-center gap-6">
          <LinkTile label="US" href="/us" />
          <LinkTile label="Your Own Anspach" href="/yoursphere" />
        </div>

        <FigureWithTilesDesktop
          leftTop={
            <div key="left-top-row" className="flex flex-row items-center gap-3">
              <TurntableTile key="turntable" />
              <VisualTile key="visual" />
            </div>
          }
          leftSlot={
            <div className="flex flex-row items-center gap-4 sm:gap-6">
              <IframeTilePopup
                ariaLabel="drop — first drop, tees and caps"
                src="/drop"
                triggerClassName="group w-24 sm:w-28 aspect-square backdrop-blur-[2px] bg-white/5 hover:bg-white/15 border border-white/45 hover:border-white/85 rounded-md flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors"
                triggerStyle={{
                  boxShadow:
                    "0 0 22px rgba(255,255,255,0.18), 0 0 50px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.22)",
                }}
                trigger={
                  <>
                    <span className="text-white/65 text-[7px] tracking-[0.4em] uppercase">
                      ↗ first drop
                    </span>
                    <span
                      className="text-white text-lg sm:text-2xl tracking-[0.35em] uppercase font-light"
                      style={{
                        textShadow:
                          "0 0 14px rgba(255,255,255,0.8), 0 0 32px rgba(103,232,249,0.45)",
                      }}
                    >
                      Drop
                    </span>
                    <span className="text-white/50 text-[7px] tracking-[0.3em] uppercase italic">
                      tees · caps
                    </span>
                  </>
                }
              />
            </div>
          }
          rightTop={
            <div key="right-top-row" className="flex flex-col items-center gap-3">
              <HoleInput />
              <IframeTilePopup
                key="eliza"
                ariaLabel="eliza — file"
                src="/eliza"
                triggerClassName="group w-44 sm:w-48 backdrop-blur-[2px] bg-red-950/40 hover:bg-red-950/60 border border-red-300/55 hover:border-red-200/85 px-3 py-2 rounded-sm transition-colors flex flex-col items-center gap-0.5 cursor-pointer"
                triggerStyle={{
                  boxShadow:
                    "0 0 22px rgba(248,113,113,0.45), 0 0 50px rgba(220,38,38,0.22), 0 8px 22px -8px rgba(0,0,0,0.65), inset 0 1px 0 rgba(254,202,202,0.30)",
                }}
                trigger={
                  <>
                    <span className="text-red-200/80 text-[8px] tracking-[0.4em] uppercase">
                      ↗ file
                    </span>
                    <span
                      className="text-red-100 text-xs sm:text-sm tracking-[0.3em] uppercase font-light"
                      style={{
                        textShadow:
                          "0 0 10px rgba(254,202,202,0.85), 0 0 22px rgba(248,113,113,0.55)",
                      }}
                    >
                      eliza
                    </span>
                    <span className="text-red-300/65 text-[8px] tracking-[0.3em] uppercase italic">
                      long memory
                    </span>
                  </>
                }
              />
            </div>
          }
          rightSlot={
            <div className="flex flex-col items-center gap-3">
              <IframeTilePopup
                key="olivia"
                ariaLabel="olivia — file"
                src="/olivia"
                triggerClassName="group w-44 sm:w-48 backdrop-blur-[2px] bg-purple-950/40 hover:bg-purple-950/60 border border-purple-300/55 hover:border-purple-200/85 px-3 py-2 rounded-sm transition-colors flex flex-col items-center gap-0.5 cursor-pointer"
                triggerStyle={{
                  boxShadow:
                    "0 0 22px rgba(192,132,252,0.45), 0 0 50px rgba(147,51,234,0.22), 0 8px 22px -8px rgba(0,0,0,0.65), inset 0 1px 0 rgba(233,213,255,0.30)",
                }}
                trigger={
                  <>
                    <span className="text-purple-200/80 text-[8px] tracking-[0.4em] uppercase">
                      ↗ file
                    </span>
                    <span
                      className="text-purple-100 text-xs sm:text-sm tracking-[0.3em] uppercase font-light"
                      style={{
                        textShadow:
                          "0 0 10px rgba(233,213,255,0.85), 0 0 22px rgba(192,132,252,0.55)",
                      }}
                    >
                      olivia
                    </span>
                    <span className="text-purple-300/65 text-[8px] tracking-[0.3em] uppercase italic">
                      pattern observer
                    </span>
                  </>
                }
              />
              <LinkTile label="frog" href="/frog" tint="green" />
            </div>
          }
        />

          </main>
          </ThemeShifter>
        </RadioProvider>
      </div>
    </>
  );
}
