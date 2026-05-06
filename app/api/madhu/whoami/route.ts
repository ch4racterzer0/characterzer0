import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookieHeader = req.headers.get("cookie") ?? "";
  const madhu = req.cookies.get("madhu_auth")?.value ?? null;
  const test = req.cookies.get("madhu_test")?.value ?? null;
  const allNames = cookieHeader
    .split(";")
    .map((p) => p.trim().split("=")[0])
    .filter(Boolean);
  console.log(
    `madhu_whoami host=${req.headers.get("host") ?? ""} has_cookie_header=${cookieHeader.length > 0} cookie_header_len=${cookieHeader.length} madhu_token_len=${madhu?.length ?? 0} test_cookie=${test ?? "absent"} all_cookie_names=${JSON.stringify(allNames)}`,
  );
  return NextResponse.json({
    has_cookie_header: cookieHeader.length > 0,
    cookie_header_len: cookieHeader.length,
    madhu_token_present: !!madhu,
    madhu_token_len: madhu?.length ?? 0,
    test_cookie_present: !!test,
    all_cookie_names: allNames,
  });
}
