"use client";

import { useEffect, useRef } from "react";

export function MatrixSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 560;
    canvas.width = size;
    canvas.height = size;

    const fontSize = 14;
    const cols = Math.floor(size / fontSize);
    const drops = Array(cols)
      .fill(0)
      .map(() => Math.random() * (size / fontSize));
    const chars =
      "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ";
    const redChars =
      "党中央监视控制服从命令国家档案审查人民同志组织部署计划目标网站域名核心电脑神经协议密码";

    const redRemaining = Array(cols).fill(0);
    const RED_INTERVAL = 45000;
    const RED_BURST_COLS = 2;
    const RED_LEN_MIN = 6;
    const RED_LEN_MAX = 10;

    let raf = 0;
    let last = 0;
    let lastRedTrigger = 0;
    const step = 95;

    function draw(t: number) {
      if (!ctx) return;

      if (t - lastRedTrigger > RED_INTERVAL) {
        lastRedTrigger = t;
        for (let n = 0; n < RED_BURST_COLS; n++) {
          const col = Math.floor(Math.random() * cols);
          const len =
            RED_LEN_MIN +
            Math.floor(Math.random() * (RED_LEN_MAX - RED_LEN_MIN + 1));
          if (redRemaining[col] < len) redRemaining[col] = len;
        }
      }

      if (t - last > step) {
        last = t;
        ctx.fillStyle = "rgba(0,0,0,0.10)";
        ctx.fillRect(0, 0, size, size);
        ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
        for (let i = 0; i < cols; i++) {
          if (Math.random() > 0.55) continue;
          const isRed = redRemaining[i] > 0;
          const set = isRed ? redChars : chars;
          const ch = set[Math.floor(Math.random() * set.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;
          if (isRed) {
            ctx.shadowColor = "rgba(239,68,68,0.85)";
            ctx.shadowBlur = 6;
            ctx.fillStyle = "rgba(252,165,165,0.95)";
          } else {
            ctx.shadowBlur = 0;
            ctx.fillStyle = "rgba(147,197,253,0.85)";
          }
          ctx.fillText(ch, x, y);
          drops[i]++;
          if (isRed) redRemaining[i]--;
          if (y > size && Math.random() > 0.975) drops[i] = 0;
        }
        ctx.shadowBlur = 0;
      }
      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden"
    >
      <div
        className="relative w-[420px] h-[420px] sm:w-[560px] sm:h-[560px] rounded-full overflow-hidden"
        style={{
          transform: "perspective(1100px) rotateX(20deg) rotateY(-10deg)",
          maskImage:
            "radial-gradient(circle at center, black 30%, rgba(0,0,0,0.4) 60%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 30%, rgba(0,0,0,0.4) 60%, transparent 78%)",
          boxShadow:
            "inset 0 0 80px rgba(59,130,246,0.25), 0 0 60px rgba(59,130,246,0.15)",
        }}
      >
        <iframe
          src="https://www.youtube-nocookie.com/embed/live_stream?channel=UCYmL7UZfguRrtqjlZUoScCQ&autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&playsinline=1&iv_load_policy=3"
          title="character zer0 — live"
          allow="autoplay; encrypted-media; picture-in-picture"
          referrerPolicy="strict-origin"
          loading="lazy"
          className="absolute top-0 left-1/2 -translate-x-1/2 h-full block border-0 opacity-70"
          style={{ aspectRatio: "16 / 9" }}
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block w-full h-full opacity-35 mix-blend-screen"
        />
      </div>
    </div>
  );
}
