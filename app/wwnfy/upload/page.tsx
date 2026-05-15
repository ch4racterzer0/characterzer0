import { cookies } from "next/headers";
import { timingSafeEqual } from "node:crypto";
import { AuthForm } from "./auth-form";
import { Uploader } from "./uploader";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "wwnfy — upload",
  robots: { index: false, follow: false },
};

function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return timingSafeEqual(aBuf, bBuf);
}

async function isAuthed(): Promise<boolean> {
  const expected = process.env.WWNFY_UPLOAD_TOKEN;
  if (!expected) return false;
  const cookieStore = await cookies();
  const provided = cookieStore.get("wwnfy-upload-auth")?.value;
  if (!provided) return false;
  return safeEqual(provided, expected);
}

export default async function UploadPage() {
  const authed = await isAuthed();
  const configured = Boolean(process.env.WWNFY_UPLOAD_TOKEN);

  return (
    <>
      <style>{`.cz-chrome, .cz-orb-center { display: none !important; }`}</style>
      <main className="min-h-screen bg-black text-stone-100 flex flex-col items-center px-4 py-10 font-mono">
        <header className="w-full max-w-2xl mb-8">
          <p className="text-[10px] tracking-[0.35em] uppercase text-stone-500 mb-1">
            · wwnfy · admin ·
          </p>
          <h1 className="text-2xl tracking-[0.18em] uppercase font-bold text-stone-200">
            soundtrack upload
          </h1>
          <p className="text-xs text-stone-500 mt-2 leading-relaxed">
            files land in blob prefix <span className="text-stone-300">wwnfy-music/</span>{" "}
            and stream through the radio on /wwnfy automatically. accepted:
            mp3, m4a, flac, ogg, aac, opus, wav.
          </p>
        </header>

        {!configured ? (
          <div className="w-full max-w-2xl border border-red-900/60 bg-red-950/30 rounded-md px-5 py-4 text-sm text-red-200">
            <p className="font-bold uppercase tracking-[0.2em] text-xs mb-2">
              not configured
            </p>
            <p className="text-red-300/85 leading-relaxed">
              Set <code className="text-stone-200">WWNFY_UPLOAD_TOKEN</code> in
              <code className="text-stone-200"> .env.local</code> (local) and in
              the Vercel project's Environment Variables (preview + production).
              Then redeploy and reload this page.
            </p>
          </div>
        ) : authed ? (
          <Uploader />
        ) : (
          <AuthForm />
        )}
      </main>
    </>
  );
}
