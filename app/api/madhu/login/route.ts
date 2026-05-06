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

async function shaPrefix(s: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  const arr = Array.from(new Uint8Array(buf));
  return arr.slice(0, 2).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function safeNext(raw: string): string {
  if (typeof raw !== "string") return "/madhu";
  if (!raw.startsWith("/") || raw.startsWith("//")) return "/madhu";
  if (raw === "/madhu/login") return "/madhu";
  return raw;
}

export async function POST(req: NextRequest) {
  const password = process.env.MADHU_PASSWORD?.trim();
  const secret = process.env.MADHU_SECRET?.trim();

  const form = await req.formData().catch(() => null);
  const submitted = String(form?.get("password") ?? "").trim();
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
    const [subPrefix, expPrefix] = await Promise.all([
      shaPrefix(submitted),
      shaPrefix(password),
    ]);
    console.log(
      `madhu_login_denied submitted_len=${submitted.length} expected_len=${password.length} submitted_sha=${subPrefix} expected_sha=${expPrefix} eq_lengths=${submitted.length === password.length}`,
    );
    return fail("denied");
  }

  const issued = String(Date.now());
  const sig = await sign(issued, secret);
  const token = `${issued}.${sig}`;

  const host = req.headers.get("host") ?? "";
  const redirectUrl = new URL(next, req.url);
  const cookieHeader = `${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${MAX_AGE_S}`;
  console.log(
    `madhu_login_ok host=${host} next=${next} redirect=${redirectUrl.toString()} token_len=${token.length} cookie_header_len=${cookieHeader.length}`,
  );

  const safeNextAttr = next.replace(/[<>"'&]/g, (c) =>
    c === "<"
      ? "&lt;"
      : c === ">"
        ? "&gt;"
        : c === '"'
          ? "&quot;"
          : c === "'"
            ? "&#39;"
            : "&amp;",
  );
  const html = `<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=${safeNextAttr}"><title>...</title></head><body style="background:#000;color:#cdd9ff;font-family:monospace;padding:2rem"><p>opening...</p><script>window.location.replace(${JSON.stringify(next)});</script></body></html>`;

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "Set-Cookie": cookieHeader,
    },
  });
}
