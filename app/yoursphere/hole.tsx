"use client";

import { useRef, useState } from "react";

const HOLE_URL =
  process.env.NEXT_PUBLIC_HOLE_URL ?? "https://characterzer0.com/api/hole";

export function TheHole() {
  const [note, setNote] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "sending" | "dropped" | "limit" | "error"
  >("idle");
  const [remaining, setRemaining] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function drop(e?: React.FormEvent) {
    e?.preventDefault();
    if (status === "sending") return;
    if (!note.trim() && !file) return;
    setStatus("sending");
    setErrorMsg("");
    try {
      const fd = new FormData();
      fd.set("note", note);
      if (file) fd.set("file", file);
      const res = await fetch(HOLE_URL, { method: "POST", body: fd });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 429) {
          setStatus("limit");
          setRemaining(0);
          return;
        }
        throw new Error(body?.error ?? "hole closed");
      }
      setRemaining(typeof body?.remaining === "number" ? body.remaining : null);
      setStatus("dropped");
      setNote("");
      setFile(null);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "hole jammed");
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      drop();
    }
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) setFile(dropped);
  }

  if (status === "limit") {
    return (
      <p className="italic text-blue-200/80 text-base border-l-2 border-blue-400/40 pl-4">
        come back tomorrow.
      </p>
    );
  }

  if (status === "dropped") {
    let msg = "dropped. i’ll check it.";
    if (remaining === 2) msg = "dropped. two more today.";
    else if (remaining === 1) msg = "dropped. one more today.";
    else if (remaining === 0) msg = "dropped. come back tomorrow.";
    return (
      <div className="space-y-3">
        <p className="italic text-blue-200/80 text-base border-l-2 border-blue-400/40 pl-4">
          {msg}
        </p>
        {remaining !== 0 && (
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="text-blue-100/60 hover:text-blue-100 text-xs tracking-[0.3em] uppercase underline underline-offset-4"
          >
            drop another
          </button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={drop} className="flex flex-col gap-3">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`relative rounded-lg border transition-colors ${
          dragging
            ? "border-blue-300/80 bg-blue-900/30"
            : "border-blue-400/30 bg-blue-950/30"
        }`}
      >
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="say it. paste a link. drag a file. enter to drop."
          rows={5}
          className="w-full bg-transparent rounded-lg px-4 py-3 text-blue-100 placeholder:text-blue-100/30 text-base font-light leading-relaxed focus:outline-none resize-y"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <input
          ref={fileRef}
          type="file"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="text-blue-100/70 hover:text-blue-100 text-xs tracking-[0.3em] uppercase border border-blue-400/30 rounded-lg px-4 py-2 hover:bg-blue-900/30 hover:border-blue-300/50 transition-colors"
        >
          attach file
        </button>

        {file && (
          <span className="flex items-center gap-2 text-blue-100/70 text-xs">
            <span className="font-mono truncate max-w-[16rem]">
              {file.name}
            </span>
            <button
              type="button"
              onClick={() => setFile(null)}
              aria-label="remove file"
              className="text-blue-100/50 hover:text-blue-100"
            >
              ×
            </button>
          </span>
        )}

        <button
          type="submit"
          disabled={
            (!note.trim() && !file) || status === "sending"
          }
          className="ml-auto text-blue-100 text-xs sm:text-sm tracking-[0.3em] uppercase border border-blue-400/40 rounded-lg px-6 py-2.5 hover:bg-blue-900/40 hover:border-blue-300/60 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {status === "sending" ? "dropping..." : "drop in the hole"}
        </button>
      </div>

      {status === "error" && (
        <p className="text-red-300/80 text-xs italic tracking-[0.2em] uppercase">
          {errorMsg}
        </p>
      )}
    </form>
  );
}
