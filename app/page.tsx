import { HoleInput } from "./hole-input";
import { IframeTilePopup } from "./iframe-tile-popup";
import { LinkTile } from "./link-tile";
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
          <main className="relative z-10 isolate min-h-screen bg-transparent flex flex-col items-center justify-between gap-6 sm:gap-0 py-4 sm:py-10 px-4">
        <MatrixSphere />
        <RadioTilesMobileTop />

        <div className="hidden sm:block absolute top-12 left-3 sm:top-14 sm:left-5 z-20">
          <LinkTile
            label="Current Targets"
            href="/currenttarget"
            subline="○ 02 done · 03 next"
          />
        </div>

        <div className="hidden sm:block absolute bottom-3 left-3 sm:bottom-5 sm:left-5 z-20">
          <LinkTile label="Current Assets" href="/currentassets" />
        </div>

        <div className="hidden sm:block absolute bottom-3 right-3 sm:bottom-5 sm:right-5 z-20">
          <LinkTile label="Your Own Anspach" href="/yoursphere" />
        </div>

        <div className="flex flex-row items-center justify-center gap-4 sm:gap-8 flex-wrap">
          <div className="hidden sm:block">
            <LinkTile label="Core4" href="/core4" large />
          </div>
          <LinkTile label="Madhu" href="/madhu" large />
          <div className="hidden sm:block">
            <LinkTile label="Quest" href="/quest" large />
          </div>
          <div className="sm:hidden">
            <LinkTile label="Core4" href="/core4" large />
          </div>
        </div>

        <div className="sm:hidden flex flex-row items-center justify-center gap-6">
          <LinkTile label="US" href="/us" />
          <LinkTile label="Your Own Anspach" href="/yoursphere" />
        </div>

        <FigureWithTilesDesktop
          rightSlot={
            <div className="flex flex-row items-center gap-4 sm:gap-6">
              <LinkTile label="US" href="/us" subline="○ step in" />
              <div
                aria-label="NRA — locked"
                className="relative w-24 sm:w-28 aspect-square backdrop-blur-[2px] bg-red-950/30 border border-red-400/40 rounded-md flex items-center justify-center overflow-hidden opacity-90"
                style={{
                  boxShadow:
                    "0 0 22px rgba(248,113,113,0.20), 0 0 50px rgba(220,38,38,0.10), inset 0 1px 0 rgba(254,202,202,0.18)",
                }}
              >
                <svg
                  viewBox="0 0 100 100"
                  aria-hidden
                  className="absolute inset-0 w-full h-full"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="36"
                    fill="none"
                    stroke="rgb(248,113,113)"
                    strokeWidth="3.5"
                    style={{
                      filter: "drop-shadow(0 0 6px rgba(248,113,113,0.85))",
                    }}
                  />
                  <line
                    x1="24"
                    y1="76"
                    x2="76"
                    y2="24"
                    stroke="rgb(248,113,113)"
                    strokeWidth="3.5"
                    style={{
                      filter: "drop-shadow(0 0 6px rgba(248,113,113,0.85))",
                    }}
                  />
                </svg>
                <span
                  className="relative text-red-100 text-lg sm:text-xl tracking-[0.35em] uppercase font-light"
                  style={{ textShadow: "0 0 10px rgba(254,202,202,0.65)" }}
                >
                  NRA
                </span>
                <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-red-300/55 text-[8px] tracking-[0.3em] uppercase italic">
                  locked
                </span>
              </div>
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
              <HoleInput />
            </div>
          }
          leftTop={
            <div className="flex flex-col items-center gap-3">
              <IframeTilePopup
                ariaLabel="eliza — file"
                src="/eliza"
                triggerClassName="group w-44 sm:w-48 backdrop-blur-[2px] bg-rose-950/40 hover:bg-rose-950/60 border border-rose-300/55 hover:border-rose-200/85 px-3 py-2 rounded-sm transition-colors flex flex-col items-center gap-0.5 cursor-pointer"
                triggerStyle={{
                  boxShadow:
                    "0 0 22px rgba(251,113,133,0.45), 0 0 50px rgba(225,29,72,0.22), 0 8px 22px -8px rgba(0,0,0,0.65), inset 0 1px 0 rgba(254,205,211,0.30)",
                }}
                trigger={
                  <>
                    <span className="text-rose-200/80 text-[8px] tracking-[0.4em] uppercase">
                      ↗ file
                    </span>
                    <span
                      className="text-rose-100 text-xs sm:text-sm tracking-[0.3em] uppercase font-light"
                      style={{
                        textShadow:
                          "0 0 10px rgba(254,205,211,0.85), 0 0 22px rgba(251,113,133,0.55)",
                      }}
                    >
                      eliza
                    </span>
                    <span className="text-rose-300/65 text-[8px] tracking-[0.3em] uppercase italic">
                      long memory
                    </span>
                  </>
                }
              />
              <TurntableTile />
            </div>
          }
          rightTop={
            <div className="flex flex-col items-center gap-3">
              <IframeTilePopup
                ariaLabel="olivia — file"
                src="/olivia"
                triggerClassName="group w-44 sm:w-48 backdrop-blur-[2px] bg-blue-950/40 hover:bg-blue-950/60 border border-blue-300/55 hover:border-blue-200/85 px-3 py-2 rounded-sm transition-colors flex flex-col items-center gap-0.5 cursor-pointer"
                triggerStyle={{
                  boxShadow:
                    "0 0 22px rgba(96,165,250,0.45), 0 0 50px rgba(59,130,246,0.22), 0 8px 22px -8px rgba(0,0,0,0.65), inset 0 1px 0 rgba(147,197,253,0.30)",
                }}
                trigger={
                  <>
                    <span className="text-blue-200/80 text-[8px] tracking-[0.4em] uppercase">
                      ↗ file
                    </span>
                    <span
                      className="text-blue-100 text-xs sm:text-sm tracking-[0.3em] uppercase font-light"
                      style={{
                        textShadow:
                          "0 0 10px rgba(147,197,253,0.85), 0 0 22px rgba(96,165,250,0.55)",
                      }}
                    >
                      olivia
                    </span>
                    <span className="text-blue-300/65 text-[8px] tracking-[0.3em] uppercase italic">
                      pattern observer
                    </span>
                  </>
                }
              />
              <VisualTile />

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
