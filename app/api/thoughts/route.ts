import { head, put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

const KEY = "thoughts/zero.txt";
const MAX_LEN = 10_000;

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

const READ_HEADERS = {
  ...CORS,
  "Cache-Control": "public, max-age=5, s-maxage=5, stale-while-revalidate=30",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

export async function GET() {
  try {
    const meta = await head(KEY).catch(() => null);
    if (!meta) {
      return NextResponse.json({ text: "", updatedAt: 0 }, { headers: READ_HEADERS });
    }
    const res = await fetch(meta.url, { cache: "no-store" });
    const text = res.ok ? await res.text() : "";
    const updatedAt = meta.uploadedAt
      ? new Date(meta.uploadedAt).getTime()
      : 0;
    return NextResponse.json({ text, updatedAt }, { headers: READ_HEADERS });
  } catch (err) {
    console.error("thoughts-get-error", err);
    return NextResponse.json({ text: "", updatedAt: 0 }, { headers: CORS });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.text !== "string") {
    return NextResponse.json({ error: "bad body" }, { status: 400, headers: CORS });
  }
  const text = body.text.slice(0, MAX_LEN);
  try {
    const result = await put(KEY, text, {
      access: "public",
      contentType: "text/plain; charset=utf-8",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return NextResponse.json(
      { ok: true, updatedAt: Date.now(), url: result.url },
      { headers: CORS },
    );
  } catch (err) {
    console.error("thoughts-put-error", err);
    return NextResponse.json({ error: "save failed" }, { status: 500, headers: CORS });
  }
}
