"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Track = { name: string; url: string };
type UploadStatus = "queued" | "uploading" | "done" | "error";
type UploadItem = {
  id: string;
  file: File;
  status: UploadStatus;
  reason?: string;
};

const AUDIO_EXT = /\.(mp3|m4a|flac|ogg|aac|opus|wav)$/i;

function formatBytes(b: number): string {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / (1024 * 1024)).toFixed(1)} MB`;
}

export function Uploader() {
  const [tracks, setTracks] = useState<Track[] | null>(null);
  const [items, setItems] = useState<UploadItem[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const loadTracks = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await fetch("/api/wwnsl-music/list", { cache: "no-store" });
      if (!res.ok) {
        setTracks([]);
        return;
      }
      const data = (await res.json()) as { tracks?: Track[] };
      setTracks(data.tracks ?? []);
    } catch {
      setTracks([]);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadTracks();
  }, [loadTracks]);

  const uploadOne = useCallback(
    async (item: UploadItem) => {
      setItems((prev) =>
        prev.map((p) => (p.id === item.id ? { ...p, status: "uploading" } : p)),
      );

      const form = new FormData();
      form.append("file", item.file);

      try {
        const res = await fetch("/api/wwnsl-music/upload", {
          method: "POST",
          body: form,
        });
        if (res.ok) {
          setItems((prev) =>
            prev.map((p) =>
              p.id === item.id ? { ...p, status: "done" } : p,
            ),
          );
          void loadTracks();
        } else {
          const data = await res.json().catch(() => ({}));
          setItems((prev) =>
            prev.map((p) =>
              p.id === item.id
                ? {
                    ...p,
                    status: "error",
                    reason: data.reason ?? `http ${res.status}`,
                  }
                : p,
            ),
          );
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "network";
        setItems((prev) =>
          prev.map((p) =>
            p.id === item.id ? { ...p, status: "error", reason: msg } : p,
          ),
        );
      }
    },
    [loadTracks],
  );

  const enqueue = useCallback(
    (files: FileList | File[]) => {
      const accepted: UploadItem[] = [];
      const rejected: UploadItem[] = [];
      for (const file of Array.from(files)) {
        const id = `${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`;
        if (!AUDIO_EXT.test(file.name)) {
          rejected.push({
            id,
            file,
            status: "error",
            reason: "not audio",
          });
        } else {
          accepted.push({ id, file, status: "queued" });
        }
      }
      const next = [...accepted, ...rejected];
      if (next.length === 0) return;
      setItems((prev) => [...next, ...prev]);
      for (const item of accepted) {
        void uploadOne(item);
      }
    },
    [uploadOne],
  );

  async function deleteTrack(url: string) {
    const u = new URL("/api/wwnsl-music/upload", window.location.origin);
    u.searchParams.set("url", url);
    const res = await fetch(u.toString(), { method: "DELETE" });
    if (res.ok) void loadTracks();
  }

  async function signOut() {
    await fetch("/api/wwnsl-music/auth", { method: "DELETE" });
    window.location.reload();
  }

  return (
    <div className="w-full max-w-2xl flex flex-col gap-6">
      <p className="text-[10px] tracking-[0.25em] uppercase text-stone-500">
        all uploads land in{" "}
        <span className="text-stone-300">wwnsl-music/still-with-us/</span>{" "}
        — single channel, single soundtrack.
      </p>

      {/* drag-drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files.length > 0) {
            enqueue(e.dataTransfer.files);
          }
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`relative rounded-md px-6 py-12 text-center cursor-pointer transition-colors ${
          dragOver
            ? "border-2 border-stone-400 bg-stone-900/60"
            : "border-2 border-dashed border-stone-700 bg-stone-950/40 hover:border-stone-600 hover:bg-stone-900/40"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".mp3,.m4a,.flac,.ogg,.aac,.opus,.wav,audio/*"
          multiple
          className="sr-only"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              enqueue(e.target.files);
              e.target.value = "";
            }
          }}
        />
        <p className="text-stone-200 text-base tracking-[0.3em] uppercase font-bold">
          drop audio files here
        </p>
        <p className="text-stone-500 text-xs tracking-[0.25em] uppercase mt-2">
          or click to choose
        </p>
      </div>

      {/* upload queue */}
      {items.length > 0 && (
        <section>
          <h2 className="text-[10px] tracking-[0.35em] uppercase text-stone-500 mb-2">
            queue
          </h2>
          <ul className="flex flex-col gap-1.5">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3 border border-stone-800 bg-stone-950/40 rounded-sm px-3 py-2 text-xs"
              >
                <span className="truncate text-stone-300">{item.file.name}</span>
                <span className="text-stone-500 text-[10px] uppercase tracking-[0.2em] whitespace-nowrap">
                  {formatBytes(item.file.size)}
                </span>
                <span
                  className={`text-[10px] uppercase tracking-[0.25em] whitespace-nowrap ${
                    item.status === "done"
                      ? "text-emerald-400"
                      : item.status === "error"
                        ? "text-red-400"
                        : item.status === "uploading"
                          ? "text-amber-300"
                          : "text-stone-400"
                  }`}
                >
                  {item.status === "error"
                    ? `error · ${item.reason ?? ""}`
                    : item.status}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* current track list */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[10px] tracking-[0.35em] uppercase text-stone-500">
            current playlist ({tracks?.length ?? "…"})
          </h2>
          <button
            type="button"
            onClick={() => void loadTracks()}
            disabled={refreshing}
            className="text-[10px] tracking-[0.3em] uppercase text-stone-500 hover:text-stone-300 disabled:opacity-50"
          >
            {refreshing ? "refreshing…" : "refresh"}
          </button>
        </div>
        {tracks === null ? (
          <p className="text-stone-500 text-xs italic">loading…</p>
        ) : tracks.length === 0 ? (
          <p className="text-stone-500 text-xs italic">
            empty — drop a file above to start the soundtrack.
          </p>
        ) : (
          <ul className="flex flex-col gap-1">
            {tracks.map((t) => (
              <li
                key={t.url}
                className="flex items-center justify-between gap-3 border border-stone-800 bg-stone-950/40 rounded-sm px-3 py-2 text-xs"
              >
                <span className="truncate text-stone-300">{t.name}</span>
                <button
                  type="button"
                  onClick={() => void deleteTrack(t.url)}
                  className="text-[10px] tracking-[0.25em] uppercase text-stone-500 hover:text-red-300 transition-colors whitespace-nowrap"
                >
                  delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={() => void signOut()}
          className="text-[10px] tracking-[0.35em] uppercase text-stone-600 hover:text-stone-400"
        >
          sign out
        </button>
      </footer>
    </div>
  );
}
