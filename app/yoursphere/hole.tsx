"use client";

import { useState } from "react";

export function TheHole() {
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "dropped" | "error">(
    "idle"
  );

  async function drop(e: React.FormEvent) {
    e.preventDefault();
    if (!note.trim() || status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/hole", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note }),
      });
      if (!res.ok) throw new Error("hole closed");
      setStatus("dropped");
      setNote("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "dropped") {
    return (
      <p className="italic text-blue-200/80 text-base border-l-2 border-blue-400/40 pl-4">
        dropped. we&rsquo;ll read it.
      </p>
    );
  }

  return (
    <form onSubmit={drop} className="flex flex-col gap-3">
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="anything you want to say"
        rows={5}
        className="w-full bg-blue-950/30 border border-blue-400/30 rounded-lg px-4 py-3 text-blue-100 placeholder:text-blue-100/30 text-base font-light leading-relaxed focus:outline-none focus:border-blue-300/60 focus:bg-blue-950/50 transition-colors resize-y"
      />
      <button
        type="submit"
        disabled={!note.trim() || status === "sending"}
        className="self-start text-blue-100 text-xs sm:text-sm tracking-[0.3em] uppercase border border-blue-400/40 rounded-lg px-6 py-2.5 hover:bg-blue-900/40 hover:border-blue-300/60 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "dropping..." : "drop in the hole"}
      </button>
      {status === "error" && (
        <p className="text-red-300/80 text-xs italic tracking-[0.2em] uppercase">
          hole jammed &mdash; try again
        </p>
      )}
    </form>
  );
}
