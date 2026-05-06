import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookieHeader = req.headers.get("cookie") ?? "";
  const madhu = req.cookies.get("madhu_auth")?.value ?? null;
  console.log(
    `madhu_whoami host=${req.headers.get("host") ?? ""} has_cookie_header=${cookieHeader.length > 0} cookie_header_len=${cookieHeader.length} madhu_token_len=${madhu?.length ?? 0}`,
  );
  return NextResponse.json({
    has_cookie_header: cookieHeader.length > 0,
    cookie_header_len: cookieHeader.length,
    madhu_token_present: !!madhu,
    madhu_token_len: madhu?.length ?? 0,
  });
}
