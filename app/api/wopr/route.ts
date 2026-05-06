import { head, list, put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

const PASSWORD = "ready";
const MAX_ATTEMPTS = 2;
const BAN_MS = 24 * 60 * 60 * 1000;
const ATTEMPT_WINDOW_MS = 60 * 60 * 1000;

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
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

async function fetchJson(pathname: string): Promise<any | null> {
  try {
    const meta = await head(pathname);
    const res = await fetch(meta.url, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function clearMatching(prefix: string) {
  try {
    const { blobs } = await list({ prefix });
    if (blobs.length === 0) return;
    await Promise.all(
      blobs.map(async (b) => {
        try {
          await fetch(b.url, { method: "DELETE" });
        } catch {}
      })
    );
  } catch {}
}

export async function POST(req: NextRequest) {
  let body: { password?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "bad payload" },
      { status: 400, headers: CORS }
    );
  }

  const password = typeof body.password === "string" ? body.password : "";
  const ip = clientIp(req);
  const ipHash = (await sha256Hex(ip)).slice(0, 16);
  const banKey = `wopr/bans/${ipHash}.json`;
  const attemptsKey = `wopr/attempts/${ipHash}.json`;

  if (password.trim().toLowerCase() === PASSWORD) {
    await clearMatching(attemptsKey);
    await clearMatching(banKey);
    return NextResponse.json({ ok: true }, { headers: CORS });
  }

  const banRecord = await fetchJson(banKey);
  if (
    banRecord &&
    typeof banRecord.until === "number" &&
    banRecord.until > Date.now()
  ) {
    return NextResponse.json(
      {
        ok: false,
        banned: true,
        retryAfterMs: banRecord.until - Date.now(),
      },
      { status: 403, headers: CORS }
    );
  }

  const now = Date.now();
  const existing = await fetchJson(attemptsKey);
  const recent =
    existing && typeof existing.firstAt === "number"
      ? now - existing.firstAt < ATTEMPT_WINDOW_MS
      : false;
  const count = recent ? (existing?.count ?? 0) + 1 : 1;
  const firstAt = recent ? existing.firstAt : now;

  await put(
    attemptsKey,
    JSON.stringify({ count, firstAt }, null, 2),
    {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    }
  );

  if (count >= MAX_ATTEMPTS) {
    const until = now + BAN_MS;
    await put(banKey, JSON.stringify({ until }, null, 2), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return NextResponse.json(
      {
        ok: false,
        banned: true,
        retryAfterMs: BAN_MS,
      },
      { status: 403, headers: CORS }
    );
  }

  return NextResponse.json(
    {
      ok: false,
      banned: false,
      remaining: MAX_ATTEMPTS - count,
    },
    { status: 401, headers: CORS }
  );
}
