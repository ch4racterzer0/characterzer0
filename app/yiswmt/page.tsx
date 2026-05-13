import { HoleInput } from "../hole-input";
import { IframeTilePopup } from "../iframe-tile-popup";
import { LinkTile } from "../link-tile";
import { MobileLanding } from "../mobile-landing";
import {
  FigureWithTilesDesktop,
  RadioProvider,
  RadioTilesMobileTop,
  TurntableTile,
  VisualTile,
} from "../radio-tiles";
import { ChracterzerTile } from "../chracterzer-tile";
import { McKinleyTile } from "../mckinley-tile";
import { TetheredTile } from "../tethered-tile";
import { YiswmtTile } from "../yiswmt-tile";
import { ThemeShifter, ThemeSwitch } from "../theme-shifter";

export const dynamic = "force-dynamic";

export default function Yiswmt() {
  return (
    <>
      <MobileLanding />
      <div className="hidden sm:block">
        <RadioProvider>
          <ThemeShifter>
          <ThemeSwitch />
          <main className="relative z-10 isolate min-h-screen bg-transparent flex flex-col items-center justify-end gap-6 sm:gap-0 py-4 sm:py-10 px-4">
        <RadioTilesMobileTop />

        <div className="sm:hidden flex flex-row items-center justify-center gap-4 flex-wrap">
          <LinkTile label="Core4" href="/core4" />
          <LinkTile label="Madhu" href="/madhu" />
          <LinkTile label="US" href="/us" />
          <LinkTile label="Your Own Anspach" href="/yoursphere" />
        </div>

        <FigureWithTilesDesktop
          leftTop={
            <div key="left-top-row" className="flex flex-row items-center gap-3">
              <TurntableTile key="turntable" />
              <VisualTile key="visual">
                <TetheredTile />
                <McKinleyTile />
              </VisualTile>
            </div>
          }
          rightTop={
            <div className="flex flex-row items-center gap-3">
              <ChracterzerTile />
              <YiswmtTile />
            </div>
          }
          leftSlot={
            <IframeTilePopup
              ariaLabel="drop — first drop, tees and caps"
              src="/drop"
              triggerClassName="group w-56 sm:w-64 backdrop-blur-[2px] bg-white/5 hover:bg-white/15 border border-white/45 hover:border-white/85 rounded-xl flex flex-row items-center justify-between gap-3 px-4 py-3 cursor-pointer transition-colors"
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
                    className="text-white text-lg sm:text-xl tracking-[0.35em] uppercase font-light"
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
          }
          rightSlot={
            <div className="grid grid-cols-2 gap-3 items-stretch w-[22rem] sm:w-[24rem]">
              <HoleInput />
              <IframeTilePopup
                key="eliza"
                ariaLabel="eliza — file"
                src="/eliza"
                triggerClassName="group w-full backdrop-blur-[2px] bg-red-950/40 hover:bg-red-950/60 border border-red-300/55 hover:border-red-200/85 px-3 py-2 rounded-xl transition-colors flex flex-col items-center gap-0.5 cursor-pointer"
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
                      className="text-red-100 text-base sm:text-lg tracking-[0.25em] uppercase font-light"
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
              <IframeTilePopup
                key="joshua"
                ariaLabel="joshua"
                triggerClassName="col-span-2 relative rounded-md border border-amber-300/40 hover:border-amber-200/70 bg-amber-950/30 hover:bg-amber-900/45 backdrop-blur-[2px] flex items-center justify-center px-3 py-1.5 transition-colors cursor-pointer"
                triggerStyle={{
                  boxShadow:
                    "0 0 14px rgba(251,191,36,0.20), 0 0 32px rgba(217,119,6,0.12), inset 0 1px 0 rgba(253,230,138,0.20)",
                }}
                trigger={
                  <span
                    className="text-amber-100 text-xs sm:text-sm tracking-[0.45em] uppercase font-mono"
                    style={{
                      textShadow:
                        "0 0 8px rgba(253,230,138,0.75), 0 0 18px rgba(251,191,36,0.45)",
                    }}
                  >
                    JOSHUA
                  </span>
                }
                content={
                  <div className="min-h-full w-full flex flex-row items-center justify-center gap-6 sm:gap-10 flex-wrap p-6">
                    <LinkTile label="Core4" href="/core4" large />
                    <LinkTile label="Madhu" href="/madhu" large />
                    <LinkTile label="Quest" href="/quest" large />
                  </div>
                }
              />
              <IframeTilePopup
                key="olivia"
                ariaLabel="olivia — file"
                src="/olivia"
                triggerClassName="group w-full backdrop-blur-[2px] bg-purple-950/40 hover:bg-purple-950/60 border border-purple-300/55 hover:border-purple-200/85 px-3 py-2 rounded-xl transition-colors flex flex-col items-center gap-0.5 cursor-pointer"
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
                      className="text-purple-100 text-base sm:text-lg tracking-[0.25em] uppercase font-light"
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
              <IframeTilePopup
                key="frog"
                ariaLabel="frog"
                src="/frog"
                triggerClassName="group relative overflow-hidden w-full backdrop-blur-[2px] bg-green-950/40 hover:bg-green-950/60 border border-green-300/55 hover:border-green-200/85 px-3 py-2 rounded-xl transition-colors flex flex-col items-center gap-0.5 cursor-pointer"
                triggerStyle={{
                  boxShadow:
                    "0 0 22px rgba(74,222,128,0.45), 0 0 50px rgba(22,163,74,0.22), 0 8px 22px -8px rgba(0,0,0,0.65), inset 0 1px 0 rgba(187,247,208,0.30)",
                }}
                trigger={
                  <>
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        backgroundImage:
                          "url(/Chracterzer%E9%9B%B6%E5%8F%B7/2f92d962-e445-4d9d-bd6f-9cc4046a6976.png)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        mixBlendMode: "screen",
                        animation: "frog-fade-a 11s ease-in-out infinite",
                      }}
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        backgroundImage:
                          "url(/Chracterzer%E9%9B%B6%E5%8F%B7/f6ff8419-db92-4337-94ba-01bdb28bd2f5.png)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        mixBlendMode: "screen",
                        animation: "frog-fade-b 11s ease-in-out infinite",
                      }}
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-green-950/35"
                    />
                    <span className="relative text-green-200/80 text-[8px] tracking-[0.4em] uppercase">
                      ↗ skip
                    </span>
                    <span
                      className="relative text-green-100 text-base sm:text-lg tracking-[0.25em] uppercase font-light"
                      style={{
                        textShadow:
                          "0 0 10px rgba(187,247,208,0.85), 0 0 22px rgba(74,222,128,0.55)",
                      }}
                    >
                      frog
                    </span>
                    <span className="relative text-green-300/65 text-[8px] tracking-[0.3em] uppercase italic">
                      ribbit
                    </span>
                  </>
                }
              />
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
