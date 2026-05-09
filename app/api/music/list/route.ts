import { readdir } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";

export const dynamic = "force-dynamic";

const AUDIO_EXT = /\.(mp3|m4a|flac|ogg|aac|opus|wav)$/i;

function musicDir() {
  return process.env.MUSIC_DIR || join(homedir(), ".stream", "music", "edm");
}

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export async function GET() {
  const dir = musicDir();
  let entries: string[] = [];
  try {
    const all = await readdir(dir, { recursive: true, withFileTypes: true });
    entries = all
      .filter((e) => e.isFile() && AUDIO_EXT.test(e.name))
      .map((e) => {
        const rel = e.parentPath ? e.parentPath.slice(dir.length).replace(/^[\\/]+/, "") : "";
        return rel ? `${rel.replace(/\\/g, "/")}/${e.name}` : e.name;
      });
  } catch {
    entries = [];
  }
  return Response.json({ tracks: shuffle(entries) }, { headers: { "Cache-Control": "no-store" } });
}
