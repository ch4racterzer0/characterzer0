import { readdir } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-dynamic";

const IMG_EXT = /\.(png|jpe?g|webp|gif|avif)$/i;

export async function GET() {
  try {
    const dir = path.join(process.cwd(), "public", "drop-artwork");
    const files = await readdir(dir);
    const pics = files
      .filter((f) => IMG_EXT.test(f) && !f.toLowerCase().startsWith("hero."))
      .sort()
      .map((f) => `/drop-artwork/${encodeURIComponent(f)}`);
    return Response.json(
      { pics },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      { pics: [] },
      { headers: { "Cache-Control": "no-store" } },
    );
  }
}
