import { CHARITIES } from "./charity-data";
import { CharityTile } from "./charity-tile";
import { FlagOrb } from "./flag-orb";
import { MissionTile } from "./mission-tile";
import { ArmyRadioTile, RadioProvider } from "./radio-tiles";
import { ShareTile } from "./share-tile";

export const dynamic = "force-dynamic";

const FIGURE_MASK = {
  WebkitMaskImage: "url(/figures/back.png)",
  maskImage: "url(/figures/back.png)",
  WebkitMaskSize: "contain",
  maskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "bottom center",
  maskPosition: "bottom center",
} as const;

export default function ItsYourSphere() {
  return (
    <>
      <style>{`.cz-chrome, .cz-orb-center { display: none !important; }`}</style>
      <RadioProvider>
        <main className="relative z-10 isolate min-h-screen bg-transparent flex flex-col items-center px-2 sm:px-4 pt-3 sm:pt-6 pb-20 sm:pb-10">
            {/* top tile row — wraps on mobile */}
            <div className="flex flex-row flex-wrap items-stretch justify-center gap-1 sm:gap-3 max-w-[95vw]">
              {CHARITIES.slice(0, 2).map((c) => (
                <CharityTile key={c.short} charity={c} />
              ))}
              <ShareTile />
              <MissionTile />
              {CHARITIES.slice(2).map((c) => (
                <CharityTile key={c.short} charity={c} />
              ))}
            </div>

            {/* flag orb — pushed down on mobile so it sits closer to the figure */}
            <div className="mt-auto sm:mt-8 flex items-center justify-center">
              <FlagOrb />
            </div>

            {/* figure with flag drape — pushed to bottom on desktop, follows orb on mobile */}
            <div className="mt-6 sm:mt-auto pt-0 sm:pt-0 flex flex-col items-center w-full">
              <div className="relative w-full max-w-md flex justify-center">
                {/* mobile-only radio, anchored to bottom-left of figure */}
                <div className="absolute bottom-0 left-0 z-20 origin-bottom-left scale-[0.7] sm:hidden">
                  <ArmyRadioTile />
                </div>
                <div
                  className="relative h-[22vh] sm:h-[28vh] aspect-[3/2]"
                  style={{
                    filter:
                      "blur(1.6px) drop-shadow(0 0 18px rgba(220,220,230,0.32)) drop-shadow(0 0 38px rgba(180,190,210,0.18))",
                  }}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      ...FIGURE_MASK,
                      backgroundImage:
                        "repeating-linear-gradient(to bottom, rgba(86,18,22,0.78) 0, rgba(86,18,22,0.78) calc(100%/13), rgba(150,138,122,0.55) calc(100%/13), rgba(150,138,122,0.55) calc(200%/13))",
                    }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      ...FIGURE_MASK,
                      backgroundImage:
                        "linear-gradient(rgba(10,16,40,0.96), rgba(10,16,40,0.96))",
                      backgroundSize: "40% 53.85%",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "left top",
                    }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      ...FIGURE_MASK,
                      backgroundImage:
                        "radial-gradient(circle, rgba(180,170,150,0.55) 0.5px, transparent 1.4px)",
                      backgroundSize: "4% 5%",
                      backgroundRepeat: "repeat",
                      backgroundPosition: "0 0",
                      clipPath: "polygon(0 0, 40% 0, 40% 53.85%, 0 53.85%)",
                    }}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/figures/back.png"
                    alt=""
                    aria-hidden
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none select-none"
                    style={{ mixBlendMode: "multiply", opacity: 0.85 }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      ...FIGURE_MASK,
                      background: "rgba(0,0,0,0.22)",
                    }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      ...FIGURE_MASK,
                      background:
                        "radial-gradient(ellipse at 50% 30%, transparent 18%, rgba(0,0,0,0.55) 80%, rgba(0,0,0,0.78) 100%)",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* army radio — desktop only (mobile copy is anchored to figure container) */}
            <div className="hidden sm:block sm:absolute sm:bottom-8 sm:left-[clamp(2rem,calc(50%-22rem),28rem)]">
              <ArmyRadioTile />
            </div>

            {/* credit footer */}
            <footer className="mt-4 sm:mt-0 sm:absolute sm:bottom-2 sm:left-1/2 sm:-translate-x-1/2 text-center px-3">
              <p
                className="font-mono text-[9px] sm:text-[9px] tracking-[0.25em] uppercase leading-relaxed"
                style={{ color: "rgba(180,175,155,0.45)" }}
              >
                music: tadashikeiji · sonican · icsilviu · kaazoom · surprising
                media · music for videos · gregor quendel — via pixabay
              </p>
            </footer>
          </main>
      </RadioProvider>
    </>
  );
}
