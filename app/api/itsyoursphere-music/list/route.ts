import { list } from "@vercel/blob";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const AUDIO_EXT = /\.(mp3|m4a|flac|ogg|aac|opus|wav)$/i;

const CATEGORIES: Record<string, string> = {
  tadashikeiji: "itsyoursphere-music/tadashikeiji/",
  instrumental: "itsyoursphere-music/instrumental/",
};

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cat = searchParams.get("cat");
  const prefix = cat && CATEGORIES[cat] ? CATEGORIES[cat] : "itsyoursphere-music/";

  let tracks: { name: string; url: string }[] = [];
  try {
    const { blobs } = await list({ prefix });
    tracks = blobs
      .filter((b) => AUDIO_EXT.test(b.pathname))
      .map((b) => ({
        name: b.pathname.replace(/^itsyoursphere-music\/(?:[^/]+\/)?/, ""),
        url: b.url,
      }));
  } catch (err) {
    console.error("itsyoursphere-music-list-error", err);
  }
  return Response.json(
    { tracks: shuffle(tracks), category: cat ?? null },
    { headers: { "Cache-Control": "no-store" } },
  );
}
