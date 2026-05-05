import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let note = "";
  try {
    const body = await req.json();
    note = typeof body?.note === "string" ? body.note.trim() : "";
  } catch {
    return NextResponse.json({ error: "bad payload" }, { status: 400 });
  }

  if (!note) {
    return NextResponse.json({ error: "empty" }, { status: 400 });
  }

  if (note.length > 5000) {
    return NextResponse.json({ error: "too long" }, { status: 400 });
  }

  console.log(
    JSON.stringify({
      kind: "hole-drop",
      at: new Date().toISOString(),
      ip: req.headers.get("x-forwarded-for") ?? "",
      ua: req.headers.get("user-agent") ?? "",
      note,
    })
  );

  return NextResponse.json({ ok: true });
}
