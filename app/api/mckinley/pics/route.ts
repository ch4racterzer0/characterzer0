import { list } from "@vercel/blob";

export const dynamic = "force-dynamic";

const IMG_EXT = /\.(png|jpe?g|webp|gif|avif)$/i;

export async function GET() {
  let pics: string[] = [];
  try {
    const { blobs } = await list({ prefix: "mckinley/" });
    pics = blobs.filter((b) => IMG_EXT.test(b.pathname)).map((b) => b.url);
  } catch (err) {
    console.error("mckinley-pics-error", err);
  }
  return Response.json(
    { pics },
    { headers: { "Cache-Control": "no-store" } },
  );
}
