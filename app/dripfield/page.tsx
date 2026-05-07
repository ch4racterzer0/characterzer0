import { EasyPass } from "../easy-pass";
import { LayerNav } from "../layer-nav";

export const dynamic = "force-dynamic";

const GLOW = "0 0 8px rgba(110,231,183,0.7), 0 0 18px rgba(52,211,153,0.4)";

export default function DripfieldPage() {
  return (
    <EasyPass>
      <DripfieldShell />
    </EasyPass>
  );
}

function DripfieldShell() {
  return (
    <main className="relative min-h-screen bg-black text-emerald-100 font-mono overflow-hidden">
      <div className="max-w-7xl mx-auto p-3 sm:p-5 space-y-3 sm:space-y-4">
        <LayerNav active="dripfield" />

        <header className="border border-emerald-400/35 bg-emerald-950/15 px-3 py-2 sm:px-5 sm:py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="block w-2 h-2 rounded-full bg-emerald-400"
              style={{ boxShadow: "0 0 10px rgba(52,211,153,0.85)" }}
            />
            <span
              className="text-emerald-100 text-xs sm:text-base tracking-[0.3em] uppercase"
              style={{ textShadow: GLOW }}
            >
              dripfield
            </span>
            <span className="hidden sm:inline text-emerald-300/40 text-[10px] tracking-[0.25em] uppercase border-l border-emerald-400/25 pl-3">
              the slow-leak intake layer
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] sm:text-xs tracking-[0.25em] uppercase">
            <span className="text-emerald-300/55">flow</span>
            <span
              className="text-emerald-300"
              style={{ textShadow: GLOW }}
            >
              steady
            </span>
          </div>
        </header>

        <section
          className="border border-emerald-400/30 bg-emerald-950/10 px-5 py-12 sm:px-10 sm:py-20 text-center"
          style={{ boxShadow: "inset 0 0 35px rgba(52,211,153,0.18)" }}
        >
          <p
            className="text-emerald-100 text-2xl sm:text-4xl tracking-[0.18em] sm:tracking-[0.25em]"
            style={{
              textShadow:
                "0 0 12px rgba(110,231,183,0.85), 0 0 28px rgba(52,211,153,0.55), 0 0 60px rgba(16,185,129,0.3)",
            }}
          >
            DRIP. DRIP. DRIP.
          </p>
          <p className="mt-4 text-emerald-300/55 text-[10px] sm:text-xs tracking-[0.3em] uppercase">
            // intake.layer
          </p>
        </section>

        <section
          className="border border-emerald-400/25 bg-emerald-950/10 p-4 sm:p-6 space-y-3"
          style={{ boxShadow: "inset 0 0 30px rgba(52,211,153,0.15)" }}
        >
          <p className="text-emerald-300/55 text-[10px] sm:text-xs tracking-[0.3em] uppercase">
            // status
          </p>
          <p className="text-emerald-100/85 text-sm sm:text-base leading-relaxed">
            &gt; this layer exists. nothing routes through it yet. the field is
            green and the soil is wet — the rest is up to whoever digs first.
          </p>
        </section>

        <footer className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] uppercase text-emerald-300/40 text-center pt-4">
          dripfield &middot; intake &middot; steady drip
        </footer>
      </div>
    </main>
  );
}
