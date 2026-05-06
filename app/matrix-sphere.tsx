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

    let raf = 0;
    let last = 0;
    const step = 95;

    function draw(t: number) {
      if (!ctx) return;
      if (t - last > step) {
        last = t;
        ctx.fillStyle = "rgba(0,0,0,0.10)";
        ctx.fillRect(0, 0, size, size);
        ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
        for (let i = 0; i < cols; i++) {
          if (Math.random() > 0.55) continue;
          const ch = chars[Math.floor(Math.random() * chars.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;
          ctx.fillStyle = "rgba(147,197,253,0.85)";
          ctx.fillText(ch, x, y);
          drops[i]++;
          if (y > size && Math.random() > 0.975) drops[i] = 0;
        }
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
        className="relative w-[420px] h-[420px] sm:w-[560px] sm:h-[560px] rounded-full overflow-hidden opacity-35"
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
        <canvas ref={canvasRef} className="block w-full h-full" />
      </div>
    </div>
  );
}
