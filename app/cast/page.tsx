import { CastCycle } from "./cast-cycle";

export const dynamic = "force-dynamic";

const FRAMES: string[] = [];

export default function CastPage() {
  return <CastCycle frames={FRAMES} />;
}
