import { ArtworkGalleryButton } from "./artwork-gallery";
import { ContactDrop } from "./contact-drop";

export const dynamic = "force-dynamic";

type Tone = "blue" | "green" | "purple" | "red";

const TONES: Record<
  Tone,
  {
    hueRotate: number;
    face: string;
    faceShadow: string;
    accentDot: string;
    accentDotShadow: string;
    hexShadow: string;
  }
> = {
  blue: {
    hueRotate: 0,
    face: "rgba(103,232,249,0.32)",
    faceShadow:
      "0 0 6px rgba(103,232,249,0.25), 0 0 14px rgba(59,130,246,0.15)",
    accentDot: "rgb(103,232,249)",
    accentDotShadow: "0 0 6px rgba(103,232,249,0.85)",
    hexShadow:
      "0 0 14px rgba(255,255,255,0.85), 0 0 32px rgba(103,232,249,0.55), 0 0 60px rgba(59,130,246,0.35)",
  },
  green: {
    hueRotate: 80,
    face: "rgba(134,239,172,0.32)",
    faceShadow:
      "0 0 6px rgba(134,239,172,0.25), 0 0 14px rgba(34,197,94,0.15)",
    accentDot: "rgb(134,239,172)",
    accentDotShadow: "0 0 6px rgba(134,239,172,0.85)",
    hexShadow:
      "0 0 14px rgba(255,255,255,0.85), 0 0 32px rgba(134,239,172,0.55), 0 0 60px rgba(34,197,94,0.35)",
  },
  purple: {
    hueRotate: 220,
    face: "rgba(216,180,254,0.32)",
    faceShadow:
      "0 0 6px rgba(216,180,254,0.25), 0 0 14px rgba(168,85,247,0.15)",
    accentDot: "rgb(216,180,254)",
    accentDotShadow: "0 0 6px rgba(216,180,254,0.85)",
    hexShadow:
      "0 0 14px rgba(255,255,255,0.85), 0 0 32px rgba(216,180,254,0.55), 0 0 60px rgba(168,85,247,0.35)",
  },
  red: {
    hueRotate: 180,
    face: "rgba(248,113,113,0.32)",
    faceShadow:
      "0 0 6px rgba(248,113,113,0.25), 0 0 14px rgba(220,38,38,0.15)",
    accentDot: "rgb(248,113,113)",
    accentDotShadow: "0 0 6px rgba(248,113,113,0.85)",
    hexShadow:
      "0 0 14px rgba(255,255,255,0.85), 0 0 32px rgba(248,113,113,0.55), 0 0 60px rgba(220,38,38,0.35)",
  },
};

const ROTATION_IMAGES = [
  "/drop-rotation/itethered.png",
  "/drop-rotation/sharethebyline.png",
  "/drop-rotation/spotlight.png",
  "/drop-rotation/terrapin-station.png",
  "/drop-rotation/tethered.png",
  "/drop-rotation/thedelos.png",
  "/drop-rotation/warning.png",
];

function BoxRotator() {
  return (
    <>
      {ROTATION_IMAGES.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover select-none"
          style={{
            mixBlendMode: "screen",
            animation: `box-image-fade ${ROTATION_IMAGES.length * 12}s ease-in-out infinite`,
            animationDelay: `${i * 12}s`,
            opacity: 0,
          }}
        />
      ))}
    </>
  );
}

function HexBox({
  label,
  view,
  aspect = "aspect-[4/5]",
  tone = "blue",
}: {
  label: string;
  view: string;
  aspect?: string;
  tone?: Tone;
}) {
  const t = TONES[tone];
  return (
    <div
      className={`relative rounded-md border border-white/25 bg-black flex items-center justify-center overflow-hidden ${aspect}`}
      style={{
        boxShadow:
          "0 0 30px rgba(255,255,255,0.10), 0 0 60px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.18)",
        perspective: "1400px",
      }}
    >
      <BoxRotator />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/figures/back.png"
        alt=""
        aria-hidden
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover select-none"
        style={{
          mixBlendMode: "screen",
          transformOrigin: "50% 50%",
          animation:
            "figure-hue-cycle 90s linear infinite, drop-figure-turn-inward 9s ease-in-out 2s infinite alternate",
        }}
      />
      <p
        className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 z-10 font-mono text-sm sm:text-base tracking-[0.4em] whitespace-nowrap text-white"
        style={{
          textShadow:
            "0 0 8px rgba(255,255,255,0.5), 0 0 18px rgba(255,255,255,0.25)",
        }}
      >
        YISWMT
      </p>
      <div className="absolute top-3 left-3 flex items-center gap-2 text-[8px] sm:text-[10px] tracking-[0.4em] uppercase text-white/45 z-10">
        <span
          aria-hidden
          className="block w-1 h-1 rounded-full"
          style={{
            backgroundColor: t.accentDot,
            boxShadow: t.accentDotShadow,
          }}
        />
        <span>{label}</span>
      </div>
      <div className="absolute top-3 right-3 text-[8px] sm:text-[10px] tracking-[0.3em] uppercase italic text-white/35 z-10">
        {view}
      </div>
    </div>
  );
}

function ArtworkRow() {
  return (
    <div
      className="relative rounded-md border border-white/25 bg-black overflow-hidden aspect-[16/7] flex items-center justify-center"
      style={{
        boxShadow:
          "0 0 30px rgba(255,255,255,0.10), 0 0 60px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.18)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-center bg-cover opacity-70"
        style={{ backgroundImage: "url(/drop-artwork/hero.png)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.85) 70%, rgba(0,0,0,0.95) 100%)",
        }}
      />

      <div className="absolute top-3 left-3 flex items-center gap-2 text-[8px] sm:text-[10px] tracking-[0.4em] uppercase text-white/45 z-10">
        <span
          aria-hidden
          className="block w-1 h-1 rounded-full bg-cyan-300"
          style={{ boxShadow: "0 0 6px rgba(103,232,249,0.85)" }}
        />
        <span>artwork</span>
      </div>
      <div className="absolute top-3 right-3 text-[8px] sm:text-[10px] tracking-[0.3em] uppercase italic text-white/35 z-10">
        original &middot; in-house
      </div>

      <div className="relative z-10 text-center px-6 sm:px-12 max-w-3xl space-y-4">
        <p
          className="text-white text-base sm:text-lg leading-relaxed"
          style={{
            textShadow:
              "0 0 10px rgba(255,255,255,0.45), 0 0 22px rgba(103,232,249,0.25)",
          }}
        >
          Chracterzer零号 made every single graphic on this entire site.
        </p>
        <p className="text-white/75 text-sm sm:text-base italic leading-relaxed">
          if you see anything you like, he would be more than happy to help.
        </p>
        <p
          className="text-cyan-300 text-sm sm:text-base font-mono tracking-[0.2em] pt-1 select-all"
          style={{
            textShadow:
              "0 0 12px rgba(103,232,249,0.55), 0 0 28px rgba(59,130,246,0.3)",
          }}
        >
          ch4racterzer0@gmail
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <ArtworkGalleryButton />
          <a
            href="/character-zer0"
            className="inline-block text-white/70 hover:text-white text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase border-b border-white/30 hover:border-white/70 transition-colors"
          >
            for hire ↗
          </a>
        </div>
      </div>
    </div>
  );
}

function PlainBox({
  label,
  view,
  aspect = "aspect-[4/5]",
}: {
  label: string;
  view: string;
  aspect?: string;
}) {
  return (
    <div
      className={`relative rounded-md border border-white/25 bg-black flex items-center justify-center overflow-hidden ${aspect}`}
      style={{
        boxShadow:
          "0 0 30px rgba(255,255,255,0.10), 0 0 60px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.18)",
      }}
    >
      <div className="absolute top-3 left-3 flex items-center gap-2 text-[8px] sm:text-[10px] tracking-[0.4em] uppercase text-white/45">
        <span
          aria-hidden
          className="block w-1 h-1 rounded-full bg-cyan-300"
          style={{ boxShadow: "0 0 6px rgba(103,232,249,0.85)" }}
        />
        <span>{label}</span>
      </div>
      <div className="absolute top-3 right-3 text-[8px] sm:text-[10px] tracking-[0.3em] uppercase italic text-white/35">
        {view}
      </div>
      <p
        className="relative text-white font-mono tracking-[0.4em] text-center px-4 text-2xl sm:text-3xl"
        style={{
          textShadow:
            "0 0 14px rgba(255,255,255,0.9), 0 0 32px rgba(255,255,255,0.45)",
        }}
      >
        YISWMT
      </p>
    </div>
  );
}

function FigureBox({
  label,
  view,
  aspect = "aspect-[4/5]",
  tone = "blue",
}: {
  label: string;
  view: string;
  aspect?: string;
  tone?: Tone;
}) {
  const t = TONES[tone];
  return (
    <div
      className={`relative rounded-md border border-white/25 bg-black overflow-hidden ${aspect}`}
      style={{
        boxShadow:
          "0 0 30px rgba(255,255,255,0.10), 0 0 60px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.18)",
        perspective: "1400px",
      }}
    >
      <div className="absolute top-3 left-3 flex items-center gap-2 text-[8px] sm:text-[10px] tracking-[0.4em] uppercase text-white/45 z-10">
        <span
          aria-hidden
          className="block w-1 h-1 rounded-full"
          style={{
            backgroundColor: t.accentDot,
            boxShadow: t.accentDotShadow,
          }}
        />
        <span>{label}</span>
      </div>
      <div className="absolute top-3 right-3 text-[8px] sm:text-[10px] tracking-[0.3em] uppercase italic text-white/35 z-10">
        {view}
      </div>
      <BoxRotator />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/figures/front.png"
        alt=""
        aria-hidden
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover select-none"
        style={{
          mixBlendMode: "screen",
          transformOrigin: "50% 50%",
          animation:
            "figure-hue-cycle 90s linear infinite, drop-figure-turn-inward 9s ease-in-out 2s infinite alternate",
        }}
      />
      <p
        className="absolute left-1/2 top-[24%] -translate-x-1/2 -translate-y-1/2 z-10 font-mono text-lg sm:text-xl tracking-[0.15em] whitespace-nowrap"
        style={{
          animation:
            "mark-flicker 30s ease-in-out infinite, face-mark-zero-vis 60s ease-in-out infinite",
        }}
      >
        零号
      </p>
      <p
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 font-mono text-sm sm:text-base tracking-[0.4em] whitespace-nowrap"
        style={{
          animation: "chest-flicker 45s ease-in-out infinite",
        }}
      >
        丫工5山Μ丁
      </p>
    </div>
  );
}

export default function DropPage() {
  return (
    <main className="min-h-screen bg-black text-white px-4 py-8 sm:px-8 sm:py-12">
      <article className="max-w-5xl mx-auto flex flex-col gap-10">
        <header className="space-y-2">
          <p className="text-white/55 text-[10px] sm:text-xs tracking-[0.4em] uppercase">
            // first drop
          </p>
          <h1
            className="text-white text-5xl sm:text-7xl font-light tracking-[0.2em] uppercase"
            style={{
              textShadow:
                "0 0 18px rgba(255,255,255,0.7), 0 0 38px rgba(103,232,249,0.4)",
            }}
          >
            Drop
          </h1>
          <p
            className="text-white italic tracking-wide text-base sm:text-lg leading-snug pt-1"
            style={{
              textShadow:
                "0 0 12px rgba(103,232,249,0.45), 0 0 28px rgba(59,130,246,0.25)",
            }}
          >
            one looking out, one looking in, and i&rsquo;m the tether.
          </p>
          <p className="text-white/55 italic tracking-wide text-sm sm:text-base">
            a hacker keeps his stash in plain sight.
          </p>
          <p className="text-white/45 text-[10px] sm:text-xs tracking-[0.3em] uppercase pt-2 flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span
                aria-hidden
                className="block w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: "rgb(103,232,249)",
                  boxShadow: "0 0 6px rgba(103,232,249,0.85)",
                }}
              />
              blue
            </span>
            <span className="flex items-center gap-1.5">
              <span
                aria-hidden
                className="block w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: "rgb(134,239,172)",
                  boxShadow: "0 0 6px rgba(134,239,172,0.85)",
                }}
              />
              green
            </span>
            <span className="flex items-center gap-1.5">
              <span
                aria-hidden
                className="block w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: "rgb(216,180,254)",
                  boxShadow: "0 0 6px rgba(216,180,254,0.85)",
                }}
              />
              purple
            </span>
            <span className="flex items-center gap-1.5">
              <span
                aria-hidden
                className="block w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: "rgb(248,113,113)",
                  boxShadow: "0 0 6px rgba(248,113,113,0.85)",
                }}
              />
              red
            </span>
            <span className="text-white/35 italic normal-case tracking-normal">
              pick your color variation — every print is Chracterzer零号, just a different shade of him.
            </span>
          </p>
        </header>

        <section className="space-y-4">
          <p className="text-cyan-300/80 text-[10px] sm:text-xs tracking-[0.4em] uppercase">
            // tee · black · 100% cotton
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <HexBox label="t-shirt" view="back" tone="blue" />
            <FigureBox label="t-shirt" view="front" tone="blue" />
          </div>
        </section>

        <section className="space-y-4">
          <p className="text-cyan-300/80 text-[10px] sm:text-xs tracking-[0.4em] uppercase">
            // artwork · made in-house · all by Chracterzer零号
          </p>
          <ArtworkRow />
        </section>

        <section className="space-y-4">
          <p className="text-cyan-300/80 text-[10px] sm:text-xs tracking-[0.4em] uppercase">
            // hoodie · black · heavyweight cotton fleece
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <HexBox label="hoodie" view="back" tone="green" />
            <FigureBox label="hoodie" view="front" tone="green" />
          </div>
        </section>

        <section className="space-y-4">
          <p className="text-cyan-300/80 text-[10px] sm:text-xs tracking-[0.4em] uppercase">
            // mug · black ceramic · 11oz
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <HexBox label="mug" view="hex side" aspect="aspect-square" tone="purple" />
            <FigureBox label="mug" view="figure side" aspect="aspect-square" tone="purple" />
          </div>
        </section>

        <section className="space-y-4">
          <p className="text-cyan-300/80 text-[10px] sm:text-xs tracking-[0.4em] uppercase">
            // yeti tumbler · black stainless · 20oz
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <HexBox label="yeti" view="hex side" aspect="aspect-[3/4]" tone="blue" />
            <FigureBox label="yeti" view="figure side" aspect="aspect-[3/4]" tone="blue" />
          </div>
        </section>

        <section className="space-y-4">
          <p className="text-cyan-300/80 text-[10px] sm:text-xs tracking-[0.4em] uppercase">
            // mouse pad · black · stitched edge
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FigureBox label="mouse pad" view="figure" aspect="aspect-[3/2]" tone="green" />
            <HexBox label="mouse pad" view="hex" aspect="aspect-[3/2]" tone="green" />
          </div>
        </section>

        <section className="space-y-4">
          <p className="text-cyan-300/80 text-[10px] sm:text-xs tracking-[0.4em] uppercase">
            // also available · plain · for the white hats
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <PlainBox label="t-shirt" view="front · plain" />
            <PlainBox label="hoodie" view="front · plain" />
          </div>
          <p className="text-white/50 text-xs sm:text-sm italic">
            every piece in the drop is also offered in a plain version with
            YISWMT printed in the open. for the people who want to be read.
          </p>
        </section>

        <section className="space-y-3">
          <p className="text-cyan-300/80 text-[10px] sm:text-xs tracking-[0.4em] uppercase">
            // contact
          </p>
          <ContactDrop />
        </section>

        <section className="space-y-3 pb-8">
          <p className="text-white/45 text-[10px] sm:text-xs tracking-[0.4em] uppercase">
            // notes
          </p>
          <p className="text-white/75 text-sm sm:text-base leading-relaxed italic">
            celebrating our first branded outpost.
          </p>
        </section>
      </article>
    </main>
  );
}
