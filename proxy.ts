import { NextResponse, type NextRequest } from "next/server";

const COOKIE = "madhu_auth";
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

function b64UrlDecode(s: string): Uint8Array {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  const std = (s + pad).replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(std);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function verifyToken(token: string, secret: string): Promise<boolean> {
  const dot = token.indexOf(".");
  if (dot <= 0) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  let sigBytes: Uint8Array;
  try {
    sigBytes = b64UrlDecode(sig);
  } catch {
    return false;
  }
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"],
  );
  const ok = await crypto.subtle.verify(
    "HMAC",
    key,
    sigBytes as BufferSource,
    enc.encode(payload),
  );
  if (!ok) return false;
  const issued = Number(payload);
  if (!Number.isFinite(issued)) return false;
  return Date.now() - issued < MAX_AGE_MS;
}

function pathIsGated(p: string): boolean {
  return (
    p === "/madhu" ||
    p.startsWith("/madhu/") ||
    p === "/gated/madhu" ||
    p.startsWith("/gated/madhu/")
  );
}

export async function proxy(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").toLowerCase();
  const path = request.nextUrl.pathname;

  if (path.startsWith("/api/")) {
    return NextResponse.next();
  }

  const cz0Sub = host.match(/^([a-z0-9-]+)\.characterzer0\.com$/i);
  const thedelosSub = host.match(/^([a-z0-9-]+)\.thedelos\.com$/i);
  const isCharacterzer0 =
    host === "characterzer0.com" || host === "www.characterzer0.com";

  let effectivePath = path;
  if (cz0Sub && cz0Sub[1] !== "www") {
    const sub = cz0Sub[1];
    effectivePath =
      sub === "madhu"
        ? `/gated/madhu${path === "/" ? "" : path}`
        : `/${sub}${path === "/" ? "" : path}`;
  } else if (thedelosSub && thedelosSub[1] !== "www") {
    effectivePath = `/thedelos/${thedelosSub[1]}${path === "/" ? "" : path}`;
  }

  const isLoginRoute = path === "/madhu/login";

  if (pathIsGated(effectivePath) && !isLoginRoute) {
    const password = process.env.MADHU_PASSWORD?.trim();
    const secret = process.env.MADHU_SECRET?.trim();
    const token = request.cookies.get(COOKIE)?.value;
    const verified =
      !!secret && !!token && (await verifyToken(token, secret));
    const authed = !!password && !!secret && !!token && verified;

    console.log(
      `madhu_proxy host=${host} path=${path} effective=${effectivePath} has_pw=${!!password} has_secret=${!!secret} has_token=${!!token} token_len=${token?.length ?? 0} verified=${verified} authed=${authed}`,
    );

    if (!authed) {
      const loginUrl = new URL("/madhu/login", request.url);
      const nextPath = path + (request.nextUrl.search || "");
      if (nextPath !== "/madhu/login") {
        loginUrl.searchParams.set("next", nextPath);
      }
      if (!password || !secret) {
        loginUrl.searchParams.set("error", "config");
      }
      return NextResponse.redirect(loginUrl);
    }
  }

  if (isLoginRoute) {
    return NextResponse.next();
  }

  if (cz0Sub && cz0Sub[1] !== "www") {
    const sub = cz0Sub[1];
    const url = request.nextUrl.clone();
    if (sub === "madhu") {
      url.pathname = `/gated/madhu${path === "/" ? "" : path}`;
    } else {
      url.pathname = `/${sub}${path === "/" ? "" : path}`;
    }
    return NextResponse.rewrite(url);
  }

  if (thedelosSub && thedelosSub[1] !== "www") {
    const sub = thedelosSub[1];
    const url = request.nextUrl.clone();
    url.pathname = `/thedelos/${sub}${path === "/" ? "" : path}`;
    return NextResponse.rewrite(url);
  }

  if (!isCharacterzer0) {
    return NextResponse.next();
  }

  if (path === "/frame") {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/frame";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\.(?:png|jpg|jpeg|gif|svg|webp)$).*)",
  ],
};
