export function LandingOrb() {
  return (
    <div
      aria-hidden
      className="relative pointer-events-none"
      style={{ width: "min(60vw, 18rem)", aspectRatio: "1 / 1" }}
    >
      {/* soft contact-shadow underneath */}
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 bottom-[-6%] w-[78%] h-[12%] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.10) 55%, transparent 80%)",
          filter: "blur(6px)",
        }}
      />
      {/* outer rim glow — very subtle on white */}
      <div
        aria-hidden
        className="absolute inset-0 -m-[4%] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(30,55,120,0.18) 0%, rgba(30,55,120,0.08) 40%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />
      {/* orb body */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, rgba(40,55,90,0.95) 0%, rgba(10,14,28,0.98) 45%, rgba(0,0,0,1) 100%)",
          border: "1px solid rgba(60,80,120,0.55)",
          boxShadow:
            "inset 0 0 60px rgba(0,0,0,0.85), inset 0 4px 18px rgba(120,150,210,0.18), 0 0 30px rgba(40,70,140,0.22)",
        }}
      >
        {/* faint inner ring */}
        <div
          aria-hidden
          className="absolute inset-[6%] rounded-full"
          style={{
            border: "1px solid rgba(120,150,210,0.10)",
            boxShadow: "inset 0 0 30px rgba(0,0,0,0.6)",
          }}
        />
        {/* upper highlight — gives the sphere dimension */}
        <div
          aria-hidden
          className="absolute left-[18%] top-[12%] w-[36%] h-[24%] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(200,220,255,0.22) 0%, rgba(200,220,255,0.06) 60%, transparent 100%)",
            filter: "blur(4px)",
          }}
        />
      </div>
    </div>
  );
}
