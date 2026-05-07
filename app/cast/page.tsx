import { CastCycle } from "./cast-cycle";

export const dynamic = "force-dynamic";

const FRAMES = [
  "/cast/phish-sphere-cars.jpg",
  "/cast/phish-sphere-2024.jpg",
  "/cast/trey-lightsaber.jpg",
  "/cast/trey-shoreline-1998.webp",
  "/cast/phish-04.webp",
  "/cast/phish-05.jpg",
  "/cast/phish-06.jpg",
];

export default function CastPage() {
  return <CastCycle frames={FRAMES} />;
}
