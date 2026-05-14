import { CHARITIES, CharityTile } from "./charity-tile";
import { MobileLanding } from "./mobile-landing";
import { ArmyRadioTile, RadioProvider } from "./radio-tiles";
import { ThemeShifter, ThemeSwitch } from "./theme-shifter";

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

export default function Yiswmt() {
  return (
    <>
      <MobileLanding />
      <div className="hidden sm:block">
        <RadioProvider>
        <ThemeShifter>
          <ThemeSwitch />
          <main className="relative z-10 isolate min-h-screen bg-transparent flex flex-col items-center justify-end py-10 px-4">
            <div className="absolute bottom-8 left-8 sm:left-12">
              <ArmyRadioTile />
            </div>
            <div className="absolute bottom-8 right-8 sm:right-12 flex flex-row gap-2 sm:gap-3">
              {CHARITIES.map((c) => (
                <CharityTile key={c.short} charity={c} />
              ))}
            </div>
            <div
              className="relative h-[28vh] aspect-[3/2]"
              style={{
                filter:
                  "blur(1.6px) drop-shadow(0 0 18px rgba(220,220,230,0.32)) drop-shadow(0 0 38px rgba(180,190,210,0.18))",
              }}
            >
              {/* stripes — 13 alternating deep oxblood / aged bone, masked to figure */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  ...FIGURE_MASK,
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, rgba(86,18,22,0.78) 0, rgba(86,18,22,0.78) calc(100%/13), rgba(150,138,122,0.55) calc(100%/13), rgba(150,138,122,0.55) calc(200%/13))",
                }}
              />
              {/* canton — deep midnight navy rectangle in upper-left, masked to figure */}
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
              {/* subtle star field on the canton — small sparse dots, masked to figure */}
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
              {/* original figure on top — multiply for deeper shading and edge bleed */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/figures/back.png"
                alt=""
                aria-hidden
                draggable={false}
                className="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none select-none"
                style={{ mixBlendMode: "multiply", opacity: 0.85 }}
              />
              {/* dark bleed wash — uniform low-opacity black inside the mask, mutes the whole flag */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  ...FIGURE_MASK,
                  background: "rgba(0,0,0,0.22)",
                }}
              />
              {/* heavy vignette — pulls shadow into edges and bottom for reverent weight */}
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
          </main>
        </ThemeShifter>
        </RadioProvider>
      </div>
    </>
  );
}
