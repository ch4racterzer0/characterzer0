export default function YtPreview() {
  return (
    <main className="min-h-screen bg-neutral-900 text-neutral-100 p-8 sm:p-12 space-y-12">
      <header className="space-y-2 max-w-4xl">
        <h1 className="text-2xl sm:text-3xl font-light tracking-wider uppercase">
          ItsYourSphere &middot; YT preview
        </h1>
        <p className="text-neutral-400 text-sm sm:text-base">
          banner is rendered at 2560&times;1440 — scale browser zoom to fit.
          screenshot the framed area and you have your asset. avatar is
          800&times;800 below it.
        </p>
        <p className="text-neutral-500 text-xs italic">
          tip: open browser dev tools, toggle device emulation to a custom
          viewport (2560&times;1440 / 800&times;800), capture full-element
          screenshot.
        </p>
      </header>

      <section className="space-y-3">
        <p className="text-neutral-400 text-xs tracking-[0.3em] uppercase">
          banner &middot; 2560&times;1440 (safe zone 1546&times;423)
        </p>
        <div
          id="yt-banner"
          className="relative bg-black overflow-hidden"
          style={{
            width: "2560px",
            height: "1440px",
            maxWidth: "100%",
            aspectRatio: "2560 / 1440",
          }}
        >
          <div
            className="absolute inset-0 flex flex-col items-center justify-center text-center"
            style={{ padding: "0 507px" }}
          >
            <p
              style={{
                color: "#93c5fd",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize: "44px",
                letterSpacing: "0.5em",
                textTransform: "uppercase",
                opacity: 0.55,
                marginBottom: "48px",
                textShadow:
                  "0 0 14px rgba(96,165,250,0.55), 0 0 28px rgba(59,130,246,0.35)",
              }}
            >
              arm 03
            </p>
            <h2
              style={{
                color: "#cbd5ff",
                fontFamily: "ui-sans-serif, system-ui, sans-serif",
                fontSize: "240px",
                fontWeight: 200,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                lineHeight: 1,
                textShadow:
                  "0 0 32px rgba(147,197,253,0.85), 0 0 72px rgba(96,165,250,0.55), 0 0 140px rgba(59,130,246,0.35)",
              }}
            >
              it&rsquo;s your sphere
            </h2>
            <p
              style={{
                color: "#93c5fd",
                fontFamily: "ui-sans-serif, system-ui, sans-serif",
                fontSize: "56px",
                fontStyle: "italic",
                letterSpacing: "0.05em",
                opacity: 0.65,
                marginTop: "56px",
                textShadow:
                  "0 0 20px rgba(96,165,250,0.55), 0 0 40px rgba(59,130,246,0.30)",
              }}
            >
              the video arm of core4
            </p>
          </div>
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              left: "507px",
              right: "507px",
              top: "509px",
              bottom: "509px",
              border: "1px dashed rgba(255,255,255,0.05)",
            }}
          />
        </div>
      </section>

      <section className="space-y-3">
        <p className="text-neutral-400 text-xs tracking-[0.3em] uppercase">
          avatar &middot; 800&times;800
        </p>
        <div
          id="yt-avatar"
          className="relative bg-black"
          style={{ width: "800px", height: "800px", maxWidth: "100%" }}
        >
          <svg
            viewBox="0 0 800 800"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", height: "100%" }}
          >
            <defs>
              <radialGradient id="halo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.0" />
                <stop offset="40%" stopColor="#3b82f6" stopOpacity="0.0" />
                <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.18" />
                <stop offset="80%" stopColor="#60a5fa" stopOpacity="0.0" />
              </radialGradient>
              <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="14" result="b1" />
                <feGaussianBlur stdDeviation="32" in="SourceGraphic" result="b2" />
                <feMerge>
                  <feMergeNode in="b2" />
                  <feMergeNode in="b1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <rect width="800" height="800" fill="#000000" />
            <circle cx="400" cy="400" r="400" fill="url(#halo)" />
            <g filter="url(#glow)">
              <circle
                cx="400"
                cy="400"
                r="220"
                fill="none"
                stroke="#93c5fd"
                strokeWidth="6"
              />
              <line
                x1="180"
                y1="400"
                x2="620"
                y2="400"
                stroke="#bfdbfe"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </g>
          </svg>
        </div>
      </section>

      <section className="space-y-3 max-w-4xl">
        <p className="text-neutral-400 text-xs tracking-[0.3em] uppercase">
          how to capture
        </p>
        <ol className="list-decimal pl-6 text-sm sm:text-base text-neutral-300 space-y-1">
          <li>
            open this page on a screen wide enough to fit the banner full-size
            (or scroll horizontally), or use chrome devtools device emulator
            with custom viewport.
          </li>
          <li>
            right-click the framed banner / avatar element &rarr; inspect &rarr;
            in the elements panel, right-click the node &rarr;{" "}
            <span className="font-mono text-neutral-100">
              capture node screenshot
            </span>
            .
          </li>
          <li>
            chrome will save a PNG at exact element dimensions (2560&times;1440
            for the banner, 800&times;800 for the avatar).
          </li>
          <li>upload to YouTube Studio &rarr; Customize channel.</li>
        </ol>
      </section>
    </main>
  );
}
