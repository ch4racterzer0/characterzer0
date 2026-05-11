import { readdir, readFile, stat } from "node:fs/promises";
import { homedir } from "node:os";
import { join, relative, sep } from "node:path";
import { put, list } from "@vercel/blob";

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error("BLOB_READ_WRITE_TOKEN missing — run vercel env pull .env.local first.");
  process.exit(1);
}

const AUDIO_EXT = /\.(mp3|m4a|flac|ogg|aac|opus|wav)$/i;
const LOCAL_DIR = process.env.MUSIC_DIR || join(homedir(), ".stream", "music", "edm");
const PREFIX = "music/edm/";

async function walk(dir) {
  const out = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else if (e.isFile() && AUDIO_EXT.test(e.name)) out.push(full);
  }
  return out;
}

const files = await walk(LOCAL_DIR);
console.log(`local: ${files.length} audio files under ${LOCAL_DIR}`);

const { blobs: existing } = await list({ prefix: PREFIX });
const existingMap = new Map(existing.map((b) => [b.pathname, b.size]));
console.log(`blob:  ${existing.length} already uploaded under ${PREFIX}`);

let uploaded = 0;
let skipped = 0;
for (const file of files) {
  const rel = relative(LOCAL_DIR, file).split(sep).join("/");
  const key = PREFIX + rel;
  const localSize = (await stat(file)).size;
  if (existingMap.get(key) === localSize) {
    skipped++;
    continue;
  }
  const body = await readFile(file);
  const r = await put(key, body, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: contentTypeFor(rel),
  });
  uploaded++;
  console.log(`  + ${rel}  (${(localSize / 1024 / 1024).toFixed(2)} MB) -> ${r.url}`);
}
console.log(`done — uploaded ${uploaded}, skipped ${skipped} (already matching size)`);

function contentTypeFor(name) {
  const lower = name.toLowerCase();
  if (lower.endsWith(".mp3")) return "audio/mpeg";
  if (lower.endsWith(".m4a") || lower.endsWith(".aac")) return "audio/mp4";
  if (lower.endsWith(".flac")) return "audio/flac";
  if (lower.endsWith(".ogg") || lower.endsWith(".opus")) return "audio/ogg";
  if (lower.endsWith(".wav")) return "audio/wav";
  return "application/octet-stream";
}
