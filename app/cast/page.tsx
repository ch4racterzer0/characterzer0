import { CastCycle } from "./cast-cycle";

export const dynamic = "force-dynamic";

const FRAMES = [
  "/cast/phish-sphere-cars.jpg",
  "/cast/dancing-skeletons.webp",
  "/cast/jerry-smiling.jpg",
  "/cast/phish-sphere-2024.jpg",
  "/sphere/trey-wrigley.webp",
  "/cast/jerry-althea-1980.jpg",
  "/cast/trey-lightsaber.jpg",
  "/sphere/phish-band-portrait.jpg",
  "/cast/jerry-portrait.jpg",
  "/cast/trey-shoreline-1998.webp",
  "/cast/phish-04.webp",
  "/cast/phish-05.jpg",
  "/cast/phish-06.jpg",
];

export default function CastPage() {
  return <CastCycle frames={FRAMES} />;
}
