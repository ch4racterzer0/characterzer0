import { list } from "@vercel/blob";

export const dynamic = "force-dynamic";

const IMAGE_EXT = /\.(jpg|jpeg|png|webp|avif|gif)$/i;
const PREFIX = "wwnfy-faces/";

export async function GET() {
  let faces: string[] = [];
  try {
    const { blobs } = await list({ prefix: PREFIX });
    faces = blobs
      .filter((b) => IMAGE_EXT.test(b.pathname))
      .map((b) => b.url);
  } catch (err) {
    console.error("wwnfy-faces-list-error", err);
  }
  return Response.json(
    { faces },
    { headers: { "Cache-Control": "no-store" } },
  );
}
