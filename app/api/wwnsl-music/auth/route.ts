import { cookies } from "next/headers";
import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const COOKIE_NAME = "wwnsl-upload-auth";

function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return timingSafeEqual(aBuf, bBuf);
}

export async function POST(req: NextRequest) {
  const expected = process.env.WWNSL_UPLOAD_TOKEN;
  if (!expected) {
    return NextResponse.json(
      { ok: false, reason: "not-configured" },
      { status: 500 },
    );
  }

  let provided: unknown;
  try {
    const body = await req.json();
    provided = body?.password;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (typeof provided !== "string" || provided.length === 0) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!safeEqual(provided, expected)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, expected, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  return NextResponse.json({ ok: true });
}
