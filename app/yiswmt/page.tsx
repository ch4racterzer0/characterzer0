import { MobileLanding } from "./mobile-landing";
import { ThemeShifter, ThemeSwitch } from "./theme-shifter";

export const dynamic = "force-dynamic";

export default function Yiswmt() {
  return (
    <>
      <MobileLanding />
      <div className="hidden sm:block">
        <ThemeShifter>
          <ThemeSwitch />
          <main className="relative z-10 isolate min-h-screen bg-transparent flex flex-col items-center justify-end py-10 px-4">
            <div className="relative h-[28vh] aspect-[3/2]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/figures/back.png"
                alt=""
                aria-hidden
                draggable={false}
                className="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none select-none"
                style={{ mixBlendMode: "screen" }}
              />
            </div>
          </main>
        </ThemeShifter>
      </div>
    </>
  );
}
