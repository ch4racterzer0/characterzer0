import { existsSync, readFileSync } from "node:fs";
import { readdir, readFile, stat } from "node:fs/promises";
import { homedir } from "node:os";
import { join, relative, sep } from "node:path";
import { list, put } from "@vercel/blob";

// --- auto-load .env.local so the script runs with a bare `node ...` ---
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

const IMAGE_EXT = /\.(jpg|jpeg|png|webp|avif|gif)$/i;
const SOURCE_DIR =
  process.env.WWNFY_FACES_SOURCE ||
  join(homedir(), "OneDrive", "Desktop", "Chracterzer零号", "wwnfy-faces");
const PREFIX = "wwnfy-faces/";

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
    else if (e.isFile() && IMAGE_EXT.test(e.name)) out.push(full);
  }
  return out;
}

function contentTypeFor(name) {
  const lower = name.toLowerCase();
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".avif")) return "image/avif";
  if (lower.endsWith(".gif")) return "image/gif";
  return "application/octet-stream";
}

const files = await walk(SOURCE_DIR);
console.log(`local: ${files.length} image files under ${SOURCE_DIR}`);

const { blobs: existing } = await list({ prefix: PREFIX });
const existingMap = new Map(existing.map((b) => [b.pathname, b.size]));
console.log(`blob:  ${existing.length} already uploaded under ${PREFIX}`);

let uploaded = 0;
let skipped = 0;
for (const file of files) {
  const rel = relative(SOURCE_DIR, file).split(sep).join("/");
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
  console.log(
    `  + ${rel}  (${(localSize / 1024 / 1024).toFixed(2)} MB) -> ${r.url}`,
  );
}
console.log(
  `\ndone — uploaded ${uploaded}, skipped ${skipped} (already matching size)`,
);
