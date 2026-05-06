import { NextResponse } from "next/server";

// open tonight: no max-visit, no ban — always grant.
// previous gated implementation in git history; revert this file to restore.

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

export async function POST() {
  return NextResponse.json({ ok: true }, { headers: CORS });
}
