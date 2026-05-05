import { list, put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

const MAX_NOTE = 10_000;
const MAX_FILE_BYTES = 4 * 1024 * 1024;
const DAILY_LIMIT = 3;

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

function reject(
  message: string,
  status = 400,
  extra: Record<string, unknown> = {}
) {
  return NextResponse.json(
    { error: message, ...extra },
    { status, headers: CORS }
  );
}

function safeName(name: string) {
  return (
    name
      .normalize("NFKD")
      .replace(/[^\w.\- ]+/g, "")
      .replace(/\s+/g, "_")
      .slice(0, 120) || "file"
  );
}

async function sha256Hex(s: string): Promise<string> {
  const data = new TextEncoder().encode(s);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function clientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for") ?? "";
  const first = xff.split(",")[0].trim();
  return first || req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: NextRequest) {
  const form = await req.formData().catch(() => null);
  if (!form) return reject("bad form");

  const note = String(form.get("note") ?? "").trim();
  const file = form.get("file");
  const origin = req.headers.get("origin") ?? req.headers.get("referer") ?? "";
  const ip = clientIp(req);
  const ua = req.headers.get("user-agent") ?? "";

  if (!note && !(file instanceof File && file.size > 0)) {
    return reject("empty");
  }
  if (note.length > MAX_NOTE) return reject("note too long");
  if (file instanceof File && file.size > MAX_FILE_BYTES) {
    return reject("file too big (4MB max)");
  }

  const date = new Date().toISOString().slice(0, 10);
  const ipHash = (await sha256Hex(ip)).slice(0, 16);
  const ipPrefix = `hole/${date}/${ipHash}/`;

  let used = 0;
  try {
    const { blobs } = await list({ prefix: ipPrefix });
    used = blobs.filter((b) => b.pathname.endsWith("/note.json")).length;
  } catch (err) {
    console.error("hole-list-error", err);
  }

  if (used >= DAILY_LIMIT) {
    return reject("come back tomorrow", 429, { remaining: 0 });
  }

  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const slug = `${stamp}_${Math.random().toString(36).slice(2, 8)}`;
  const folder = `${ipPrefix}${slug}`;

  const meta = {
    at: new Date().toISOString(),
    origin,
    ip,
    ua,
    note,
    file:
      file instanceof File && file.size > 0
        ? { name: file.name, size: file.size, type: file.type }
        : null,
  };

  try {
    await put(`${folder}/note.json`, JSON.stringify(meta, null, 2), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
    });

    if (file instanceof File && file.size > 0) {
      await put(`${folder}/${safeName(file.name)}`, file, {
        access: "public",
        contentType: file.type || "application/octet-stream",
        addRandomSuffix: false,
      });
    }
  } catch (err) {
    console.error("hole-blob-error", err);
    return reject("storage failed", 500);
  }

  const remaining = DAILY_LIMIT - (used + 1);
  return NextResponse.json(
    { ok: true, slug, remaining },
    { headers: CORS }
  );
}
