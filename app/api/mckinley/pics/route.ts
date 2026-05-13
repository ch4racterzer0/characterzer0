import { list } from "@vercel/blob";
import { readdir } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-dynamic";

const IMG_EXT = /\.(png|jpe?g|webp|gif|avif)$/i;

export async function GET() {
  const pics: string[] = [];
  try {
    const dir = path.join(process.cwd(), "public", "mckinley");
    const files = await readdir(dir);
    for (const f of files) {
      if (IMG_EXT.test(f)) pics.push(`/mckinley/${encodeURIComponent(f)}`);
    }
  } catch {}
  try {
    const { blobs } = await list({ prefix: "mckinley/" });
    for (const b of blobs) {
      if (IMG_EXT.test(b.pathname)) pics.push(b.url);
    }
  } catch (err) {
    console.error("mckinley-pics-error", err);
  }
  return Response.json(
    { pics },
    { headers: { "Cache-Control": "no-store" } },
  );
}
