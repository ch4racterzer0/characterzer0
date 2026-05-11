import { list } from "@vercel/blob";

export const dynamic = "force-dynamic";

const AUDIO_EXT = /\.(mp3|m4a|flac|ogg|aac|opus|wav)$/i;

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export async function GET() {
  let tracks: { name: string; url: string }[] = [];
  try {
    const { blobs } = await list({ prefix: "music/edm/" });
    tracks = blobs
      .filter((b) => AUDIO_EXT.test(b.pathname))
      .map((b) => ({
        name: b.pathname.replace(/^music\/edm\//, ""),
        url: b.url,
      }));
  } catch (err) {
    console.error("music-list-error", err);
  }
  return Response.json(
    { tracks: shuffle(tracks) },
    { headers: { "Cache-Control": "no-store" } },
  );
}
