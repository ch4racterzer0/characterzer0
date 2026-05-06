export async function GET() {
  return new Response(
    "cookie-test set. now visit /api/madhu/whoami to see if it came back.\n",
    {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        "Set-Cookie":
          "madhu_test=hello123; Path=/; Max-Age=300; SameSite=Lax; Secure",
      },
    },
  );
}
