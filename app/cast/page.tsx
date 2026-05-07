import { CastCycle } from "./cast-cycle";

export const dynamic = "force-dynamic";

const FRAMES = [
  "/sphere/rick-mitarotonda.jpg",
  "/sphere/trevor-weekz.webp",
  "/sphere/ghost.png",
];

export default function CastPage() {
  return <CastCycle frames={FRAMES} />;
}
