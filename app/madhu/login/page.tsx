type Search = { error?: string; next?: string };

function safeNext(raw: string | undefined): string {
  if (!raw) return "/madhu";
  if (!raw.startsWith("/") || raw.startsWith("//")) return "/madhu";
  if (raw === "/madhu/login") return "/madhu";
  return raw;
}

export default async function MadhuLogin({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const sp = await searchParams;
  const error = sp.error;
  const next = safeNext(sp.next);

  const message =
    error === "config"
      ? "lock not configured"
      : error === "denied"
        ? "denied"
        : null;

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6 py-10">
      <form
        method="POST"
        action="/api/madhu/login"
        className="flex flex-col items-center gap-5"
        autoComplete="off"
      >
        <input type="hidden" name="next" value={next} />
        <p className="text-blue-100/50 italic text-[10px] tracking-[0.4em] uppercase">
          passphrase
        </p>
        <input
          type="password"
          name="password"
          autoFocus
          required
          className="bg-blue-950/40 border border-blue-400/40 text-blue-100 text-center text-base tracking-[0.3em] uppercase rounded-lg px-5 py-3 w-72 outline-none focus:border-blue-300/70 focus:bg-blue-950/60 transition-colors placeholder:text-blue-100/25"
          placeholder="········"
          autoComplete="off"
          spellCheck={false}
        />
        <button
          type="submit"
          className="text-blue-100/80 hover:text-blue-100 text-xs tracking-[0.4em] uppercase border border-blue-400/40 rounded-lg px-6 py-2 hover:bg-blue-900/40 transition-colors"
        >
          enter
        </button>
        {message && (
          <p className="text-red-300/80 text-[10px] tracking-[0.3em] uppercase italic">
            {message}
          </p>
        )}
      </form>
    </main>
  );
}
