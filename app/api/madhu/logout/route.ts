import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const res = NextResponse.redirect(new URL("/madhu/login", req.url), {
    status: 303,
  });
  res.cookies.set("madhu_auth", "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
