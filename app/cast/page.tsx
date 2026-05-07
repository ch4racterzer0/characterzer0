import { CastCycle } from "./cast-cycle";

export const dynamic = "force-dynamic";

const FRAMES = [
  "/sphere/rick-mitarotonda.jpg",
  "/sphere/goose-band.jpg",
  "/sphere/trevor-weekz.webp",
  "/sphere/rick-420fest.jpg",
  "/sphere/goose-msg.jpg",
];

export default function CastPage() {
  return <CastCycle frames={FRAMES} />;
}
