import { put } from "@vercel/blob";
import { cookies } from "next/headers";
import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const COOKIE_NAME = "wwnfy-upload-auth";
const IMAGE_EXT = /\.(jpg|jpeg|png|webp|avif|gif)$/i;

function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return timingSafeEqual(aBuf, bBuf);
}

async function isAuthed(): Promise<boolean> {
  const expected = process.env.WWNFY_UPLOAD_TOKEN;
  if (!expected) return false;
  const cookieStore = await cookies();
  const provided = cookieStore.get(COOKIE_NAME)?.value;
  if (!provided) return false;
  return safeEqual(provided, expected);
}

export async function POST(req: NextRequest) {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json(
      { ok: false, reason: "no-file" },
      { status: 400 },
    );
  }

  if (!IMAGE_EXT.test(file.name)) {
    return NextResponse.json(
      { ok: false, reason: "bad-extension" },
      { status: 400 },
    );
  }

  const safeName = file.name.replace(/[^\w.\- ]+/g, "_");
  const key = `wwnfy-faces/${safeName}`;

  try {
    const blob = await put(key, file, {
      access: "public",
      contentType: file.type || "image/jpeg",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return NextResponse.json({ ok: true, url: blob.url, key });
  } catch (err) {
    console.error("wwnfy-faces-upload-error", err);
    return NextResponse.json(
      { ok: false, reason: "blob-error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  if (!url) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    const { del } = await import("@vercel/blob");
    await del(url);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("wwnfy-faces-delete-error", err);
    return NextResponse.json(
      { ok: false, reason: "blob-error" },
      { status: 500 },
    );
  }
}
