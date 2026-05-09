import { stat, open } from "node:fs/promises";
import { homedir } from "node:os";
import { join, normalize, resolve, relative, isAbsolute, extname } from "node:path";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const TYPES: Record<string, string> = {
  ".mp3": "audio/mpeg",
  ".m4a": "audio/mp4",
  ".aac": "audio/aac",
  ".flac": "audio/flac",
  ".ogg": "audio/ogg",
  ".opus": "audio/ogg",
  ".wav": "audio/wav",
};

function musicDir() {
  return resolve(process.env.MUSIC_DIR || join(homedir(), ".stream", "music", "edm"));
}

function safeJoin(root: string, parts: string[]): string | null {
  const decoded = parts.map((p) => decodeURIComponent(p)).join("/");
  if (isAbsolute(decoded)) return null;
  const full = resolve(root, normalize(decoded));
  const rel = relative(root, full);
  if (rel.startsWith("..") || isAbsolute(rel)) return null;
  return full;
}

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ name: string[] }> }
) {
  const { name } = await ctx.params;
  const root = musicDir();
  const full = safeJoin(root, name);
  if (!full) return new Response("bad path", { status: 400 });

  let info;
  try {
    info = await stat(full);
  } catch {
    return new Response("not found", { status: 404 });
  }
  if (!info.isFile()) return new Response("not found", { status: 404 });

  const type = TYPES[extname(full).toLowerCase()] ?? "application/octet-stream";
  const total = info.size;
  const range = req.headers.get("range");

  const fh = await open(full, "r");

  if (range) {
    const m = /^bytes=(\d*)-(\d*)$/.exec(range);
    if (!m) {
      await fh.close();
      return new Response("bad range", { status: 416, headers: { "Content-Range": `bytes */${total}` } });
    }
    const start = m[1] === "" ? Math.max(0, total - parseInt(m[2], 10)) : parseInt(m[1], 10);
    const end = m[2] === "" ? total - 1 : Math.min(total - 1, parseInt(m[2], 10));
    if (Number.isNaN(start) || Number.isNaN(end) || start > end || start >= total) {
      await fh.close();
      return new Response("bad range", { status: 416, headers: { "Content-Range": `bytes */${total}` } });
    }
    const length = end - start + 1;
    const stream = fh.createReadStream({ start, end, autoClose: true });
    return new Response(stream as unknown as ReadableStream, {
      status: 206,
      headers: {
        "Content-Type": type,
        "Content-Length": String(length),
        "Content-Range": `bytes ${start}-${end}/${total}`,
        "Accept-Ranges": "bytes",
        "Cache-Control": "no-store",
      },
    });
  }

  const stream = fh.createReadStream({ autoClose: true });
  return new Response(stream as unknown as ReadableStream, {
    headers: {
      "Content-Type": type,
      "Content-Length": String(total),
      "Accept-Ranges": "bytes",
      "Cache-Control": "no-store",
    },
  });
}
