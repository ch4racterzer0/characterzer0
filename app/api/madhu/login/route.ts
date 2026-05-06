import { NextResponse, type NextRequest } from "next/server";

const COOKIE = "madhu_auth";
const MAX_AGE_S = 7 * 24 * 60 * 60;

function b64UrlEncode(bytes: Uint8Array): string {
  let s = "";
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sign(payload: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  return b64UrlEncode(new Uint8Array(sig));
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

function safeNext(raw: string): string {
  if (typeof raw !== "string") return "/madhu";
  if (!raw.startsWith("/") || raw.startsWith("//")) return "/madhu";
  if (raw === "/madhu/login") return "/madhu";
  return raw;
}

export async function POST(req: NextRequest) {
  const password = process.env.MADHU_PASSWORD;
  const secret = process.env.MADHU_SECRET;

  const form = await req.formData().catch(() => null);
  const submitted = String(form?.get("password") ?? "");
  const next = safeNext(String(form?.get("next") ?? "/madhu"));

  const fail = (code: string) => {
    const url = new URL("/madhu/login", req.url);
    url.searchParams.set("error", code);
    if (next !== "/madhu") url.searchParams.set("next", next);
    return NextResponse.redirect(url, { status: 303 });
  };

  if (!password || !secret) return fail("config");

  await new Promise((r) => setTimeout(r, 400));

  if (!submitted || !timingSafeEqual(submitted, password)) {
    return fail("denied");
  }

  const issued = String(Date.now());
  const sig = await sign(issued, secret);
  const token = `${issued}.${sig}`;

  const res = NextResponse.redirect(new URL(next, req.url), { status: 303 });
  res.cookies.set(COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_S,
  });
  return res;
}
