import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").toLowerCase();
  const path = request.nextUrl.pathname;

  if (path.startsWith("/api/")) {
    return NextResponse.next();
  }

  if (host === "thedelos.com" || host === "www.thedelos.com") {
    const url = request.nextUrl.clone();
    url.pathname = `/thedelos${path === "/" ? "" : path}`;
    return NextResponse.rewrite(url);
  }

  const thedelosSub = host.match(/^([a-z0-9-]+)\.thedelos\.com$/i);
  if (thedelosSub && thedelosSub[1] !== "www") {
    const sub = thedelosSub[1];
    const url = request.nextUrl.clone();
    url.pathname = `/thedelos/${sub}${path === "/" ? "" : path}`;
    return NextResponse.rewrite(url);
  }

  const isCharacterzer0 =
    host === "characterzer0.com" || host === "www.characterzer0.com";
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
