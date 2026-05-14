"use client";

import { useState } from "react";

export function AuthForm() {
  const [pw, setPw] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);

    try {
      const res = await fetch("/api/yiswmt-music/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      if (res.ok) {
        window.location.reload();
        return;
      }
      if (res.status === 401) {
        setError("denied");
      } else {
        setError(`error ${res.status}`);
      }
    } catch {
      setError("network error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="w-full max-w-sm flex flex-col gap-4 border border-stone-700 bg-stone-950/40 rounded-md px-6 py-7"
    >
      <label
        htmlFor="pw"
        className="text-[10px] tracking-[0.35em] uppercase text-stone-500"
      >
        passphrase
      </label>
      <input
        id="pw"
        type="password"
        autoFocus
        value={pw}
        onChange={(e) => {
          setPw(e.target.value);
          if (error) setError(null);
        }}
        className="bg-black border border-stone-700 text-stone-100 text-center text-base tracking-[0.25em] uppercase rounded-sm px-4 py-3 outline-none focus:border-stone-500 transition-colors"
        placeholder="········"
      />
      <button
        type="submit"
        disabled={busy || pw.length === 0}
        className="text-stone-200 text-xs tracking-[0.4em] uppercase border border-stone-600 rounded-sm px-5 py-3 hover:bg-stone-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {busy ? "checking…" : "enter"}
      </button>
      {error && (
        <p className="text-red-300/85 text-xs tracking-[0.2em] uppercase italic text-center">
          {error}
        </p>
      )}
    </form>
  );
}
