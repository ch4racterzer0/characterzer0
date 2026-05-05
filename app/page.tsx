import { LinkTile } from "./link-tile";
import { LyricRotator } from "./lyric-rotator";
import {
  FigureWithTilesDesktop,
  RadioProvider,
  RadioTilesMobileTop,
} from "./radio-tiles";

export default function Home() {
  return (
    <RadioProvider>
      <main
        className="relative min-h-screen bg-black flex flex-col items-center justify-between gap-4 sm:gap-0 py-4 sm:py-10 px-4 overflow-hidden"
        style={{
          perspective: "1400px",
          perspectiveOrigin: "50% 92%",
        }}
      >
        <RadioTilesMobileTop />

        <div
          className="flex flex-col items-center gap-4 sm:gap-10"
          style={{
            transform: "rotateX(14deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <LyricRotator />
          <div className="flex flex-row items-center gap-3 sm:gap-6">
            <div style={{ transform: "rotateY(10deg)" }}>
              <LinkTile label="Creators" href="/creator" large />
            </div>
            <div style={{ transform: "rotateY(-10deg)" }}>
              <LinkTile label="Mission" href="/mission" large />
            </div>
          </div>
          <LinkTile label="TBD" href="/" large />
        </div>

        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-10 w-full max-w-md sm:w-auto sm:max-w-none"
          style={{
            transform: "rotateX(8deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <div style={{ transform: "rotateY(18deg)" }}>
            <LinkTile label="Current Targets" href="/currenttarget" />
          </div>
          <div style={{ transform: "rotateY(6deg)" }}>
            <LinkTile label="Current Assets" href="/currentassets" />
          </div>
          <div style={{ transform: "rotateY(-6deg)" }}>
            <LinkTile label="WIP" href="/wip" />
          </div>
          <div style={{ transform: "rotateY(-18deg)" }}>
            <LinkTile label="Your Own Anspach" href="/yoursphere" />
          </div>
        </div>

        <FigureWithTilesDesktop />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 75% 65% at 50% 92%, transparent 0%, transparent 40%, rgba(0,0,0,0.55) 78%, rgba(0,0,0,0.9) 100%)",
          }}
        />
      </main>
    </RadioProvider>
  );
}
