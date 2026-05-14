import { existsSync, readFileSync } from "node:fs";
import { readdir, readFile, stat } from "node:fs/promises";
import { homedir } from "node:os";
import { join, relative, sep } from "node:path";
import { list, put } from "@vercel/blob";

// --- auto-load .env.local so the script can be run with a bare `node ...` ---
if (!process.env.BLOB_READ_WRITE_TOKEN && existsSync(".env.local")) {
  for (const line of readFileSync(".env.local", "utf8").split("\n")) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error(
    "BLOB_READ_WRITE_TOKEN missing — add it to .env.local (Vercel project → Storage → your Blob store → .env.local tab).",
  );
  process.exit(1);
}

const AUDIO_EXT = /\.(mp3|m4a|flac|ogg|aac|opus|wav)$/i;
const SOURCE_BASE = process.env.IYS_SOURCE_BASE || join(homedir(), "Downloads");
const CHANNELS = ["sad", "hope"];
const PREFIX_BASE = "itsyoursphere-music/";

async function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else if (e.isFile() && AUDIO_EXT.test(e.name)) out.push(full);
  }
  return out;
}

function contentTypeFor(name) {
  const lower = name.toLowerCase();
  if (lower.endsWith(".mp3")) return "audio/mpeg";
  if (lower.endsWith(".m4a") || lower.endsWith(".aac")) return "audio/mp4";
  if (lower.endsWith(".flac")) return "audio/flac";
  if (lower.endsWith(".ogg") || lower.endsWith(".opus")) return "audio/ogg";
  if (lower.endsWith(".wav")) return "audio/wav";
  return "application/octet-stream";
}

let totalUploaded = 0;
let totalSkipped = 0;

for (const channel of CHANNELS) {
  const localDir = join(SOURCE_BASE, channel);
  const prefix = `${PREFIX_BASE}${channel}/`;

  const files = await walk(localDir);
  console.log(`\n[${channel}] local: ${files.length} audio files under ${localDir}`);

  const { blobs: existing } = await list({ prefix });
  const existingMap = new Map(existing.map((b) => [b.pathname, b.size]));
  console.log(`[${channel}] blob:  ${existing.length} already uploaded under ${prefix}`);

  for (const file of files) {
    const rel = relative(localDir, file).split(sep).join("/");
    const key = prefix + rel;
    const localSize = (await stat(file)).size;
    if (existingMap.get(key) === localSize) {
      totalSkipped++;
      continue;
    }
    const body = await readFile(file);
    const r = await put(key, body, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: contentTypeFor(rel),
    });
    totalUploaded++;
    console.log(
      `[${channel}]   + ${rel}  (${(localSize / 1024 / 1024).toFixed(2)} MB) -> ${r.url}`,
    );
  }
}

console.log(
  `\ndone — uploaded ${totalUploaded}, skipped ${totalSkipped} (already matching size)`,
);
