"use client";

import { useEffect, useRef, useState } from "react";

type Status = "idle" | "requesting" | "live" | "denied" | "error" | "ended";

export function Cam() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function stop() {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setStatus("ended");
  }

  async function start() {
    setStatus("requesting");
    setErrorMsg("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }
      setStatus("live");
    } catch (err) {
      const name = err instanceof Error ? err.name : "";
      if (name === "NotAllowedError" || name === "PermissionDeniedError") {
        setStatus("denied");
      } else {
        setStatus("error");
        setErrorMsg(err instanceof Error ? err.message : "camera failed");
      }
    }
  }

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  return (
    <div className="space-y-4">
      <div
        className="relative aspect-video rounded-xl overflow-hidden border border-blue-400/40 bg-blue-950/30"
        style={{
          boxShadow:
            "0 0 35px rgba(59,130,246,0.30), inset 0 1px 0 rgba(147,197,253,0.20)",
        }}
      >
        <video
          ref={videoRef}
          playsInline
          autoPlay
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />

        {status !== "live" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/85">
            {status === "idle" && (
              <button
                type="button"
                onClick={start}
                className="text-blue-100 text-xs sm:text-sm tracking-[0.3em] uppercase border border-blue-400/40 rounded-lg px-6 py-3 hover:bg-blue-900/40 hover:border-blue-300/60 transition-colors"
              >
                step into frame
              </button>
            )}
            {status === "requesting" && (
              <p className="text-blue-100/70 italic text-xs tracking-[0.3em] uppercase">
                allow access in your browser&hellip;
              </p>
            )}
            {status === "denied" && (
              <div className="text-center space-y-3 px-6">
                <p className="text-red-300/80 text-xs tracking-[0.2em] uppercase italic">
                  access denied
                </p>
                <p className="text-blue-100/60 text-xs italic">
                  allow camera in your browser&rsquo;s site settings, then
                  reload.
                </p>
              </div>
            )}
            {status === "error" && (
              <p className="text-red-300/80 text-xs tracking-[0.2em] uppercase italic px-4 text-center">
                {errorMsg || "something jammed"}
              </p>
            )}
            {status === "ended" && (
              <button
                type="button"
                onClick={start}
                className="text-blue-100 text-xs sm:text-sm tracking-[0.3em] uppercase border border-blue-400/40 rounded-lg px-6 py-3 hover:bg-blue-900/40 hover:border-blue-300/60 transition-colors"
              >
                step back in
              </button>
            )}
          </div>
        )}

        {status === "live" && (
          <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-sm">
            <span
              className="block w-2 h-2 rounded-full bg-red-500"
              style={{ boxShadow: "0 0 10px rgba(239,68,68,0.85)" }}
              aria-hidden
            />
            <span className="text-red-300 text-[10px] tracking-[0.3em] uppercase font-medium">
              you&rsquo;re on
            </span>
          </div>
        )}
      </div>

      {status === "live" && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={stop}
            className="text-blue-100/70 hover:text-blue-100 text-xs tracking-[0.3em] uppercase border border-blue-400/30 rounded-lg px-5 py-2 hover:bg-blue-900/30 transition-colors"
          >
            step out
          </button>
        </div>
      )}

      <p className="text-blue-100/40 italic text-xs sm:text-sm tracking-wide text-center">
        nothing leaves your machine. we don&rsquo;t record. we don&rsquo;t
        upload. the feed lives in your browser only.
      </p>
    </div>
  );
}
