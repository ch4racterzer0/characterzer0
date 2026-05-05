import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const isCharacterzer0 = host === "characterzer0.com" || host === "www.characterzer0.com";

  if (!isCharacterzer0) {
    return NextResponse.next();
  }

  if (
    request.nextUrl.pathname === "/frame" ||
    request.nextUrl.pathname.startsWith("/api/")
  ) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/frame";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\.(?:png|jpg|jpeg|gif|svg|webp)$).*)"],
};
