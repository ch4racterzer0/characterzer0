import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const res = NextResponse.redirect(new URL("/madhu/login", req.url), {
    status: 303,
  });
  res.headers.append(
    "Set-Cookie",
    "madhu_auth=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0",
  );
  return res;
}
