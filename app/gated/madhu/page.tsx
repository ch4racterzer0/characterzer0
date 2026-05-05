import { Gate } from "../../madhu/gate";
import { WarClock } from "./war-clock";
import { WarTerminal } from "./war-terminal";

const GLOW = "0 0 6px rgba(96,165,250,0.6), 0 0 14px rgba(59,130,246,0.35)";

function ScreenFrame({
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  children,
}: {
  topLeft: string;
  topRight: string;
  bottomLeft: string;
  bottomRight: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative border border-blue-400/35 bg-blue-950/15 aspect-[4/3] overflow-hidden"
      style={{ boxShadow: "inset 0 0 30px rgba(59,130,246,0.18)" }}
    >
      <div className="absolute top-2 left-3 right-3 flex justify-between text-[9px] sm:text-[10px] font-mono tracking-[0.2em] uppercase text-blue-300/75 z-10">
        <span>{topLeft}</span>
        <span className="text-cyan-300">{topRight}</span>
      </div>
      {children}
      <div className="absolute bottom-2 left-3 right-3 flex justify-between text-[9px] sm:text-[10px] font-mono tracking-[0.15em] uppercase text-blue-300/55 z-10">
        <span>{bottomLeft}</span>
        <span>{bottomRight}</span>
      </div>
    </div>
  );
}

function ScreenRadar() {
  return (
    <ScreenFrame
      topLeft="alaskan air command"
      topRight="● active"
      bottomLeft="elmendorf afb"
      bottomRight="track 0327"
    >
      <svg
        viewBox="0 0 200 150"
        className="absolute inset-0 w-full h-full"
        style={{ filter: "drop-shadow(0 0 4px rgba(96,165,250,0.45))" }}
      >
        {[15, 30, 50, 70].map((r) => (
          <circle
            key={r}
            cx="100"
            cy="80"
            r={r}
            fill="none"
            stroke="#93c5fd"
            strokeWidth="0.5"
            opacity={1 - r / 110}
          />
        ))}
        <line x1="100" y1="0" x2="100" y2="150" stroke="#93c5fd" strokeWidth="0.3" opacity="0.35" />
        <line x1="0" y1="80" x2="200" y2="80" stroke="#93c5fd" strokeWidth="0.3" opacity="0.35" />
        <line x1="40" y1="20" x2="160" y2="140" stroke="#93c5fd" strokeWidth="0.2" opacity="0.2" />
        <line x1="160" y1="20" x2="40" y2="140" stroke="#93c5fd" strokeWidth="0.2" opacity="0.2" />
        <line x1="100" y1="80" x2="158" y2="42" stroke="#67e8f9" strokeWidth="0.7" opacity="0.85" />
        {[
          [120, 60],
          [80, 100],
          [140, 90],
          [70, 60],
          [125, 105],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="1.5" fill="#67e8f9" />
            <circle cx={x} cy={y} r="3.5" fill="none" stroke="#67e8f9" strokeWidth="0.4" opacity="0.5" />
          </g>
        ))}
        <text x="6" y="140" fill="#93c5fd" fontFamily="monospace" fontSize="5" opacity="0.5">
          61.2°N 149.9°W
        </text>
      </svg>
    </ScreenFrame>
  );
}

function ScreenContinental() {
  const points: [number, number, string][] = [
    [50, 80, "SEA"],
    [55, 110, "LAX"],
    [110, 95, "DEN"],
    [135, 75, "CHI"],
    [165, 70, "BOS"],
    [170, 95, "DC"],
    [155, 120, "ATL"],
    [115, 130, "HOU"],
  ];
  return (
    <ScreenFrame
      topLeft="continental // targets"
      topRight="● armed"
      bottomLeft="38 stations"
      bottomRight="t-32:14"
    >
      <svg
        viewBox="0 0 200 150"
        className="absolute inset-0 w-full h-full"
        style={{ filter: "drop-shadow(0 0 4px rgba(96,165,250,0.45))" }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={20 + i * 20}
            y1="20"
            x2={20 + i * 20}
            y2="135"
            stroke="#93c5fd"
            strokeWidth="0.2"
            opacity="0.18"
          />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1="20"
            y1={30 + i * 20}
            x2="180"
            y2={30 + i * 20}
            stroke="#93c5fd"
            strokeWidth="0.2"
            opacity="0.18"
          />
        ))}
        <path
          d="M 35 90 Q 60 70 90 75 T 150 70 Q 180 75 180 90 Q 175 115 150 125 Q 110 135 75 125 Q 45 120 35 105 Z"
          fill="none"
          stroke="#93c5fd"
          strokeWidth="0.6"
          opacity="0.65"
        />
        {[
          ["50,80", "165,70"],
          ["55,110", "170,95"],
          ["110,95", "165,70"],
          ["135,75", "115,130"],
        ].map(([from, to], i) => {
          const [fx, fy] = from.split(",").map(Number);
          const [tx, ty] = to.split(",").map(Number);
          const cx = (fx + tx) / 2;
          const cy = Math.min(fy, ty) - 30;
          return (
            <path
              key={i}
              d={`M ${fx} ${fy} Q ${cx} ${cy} ${tx} ${ty}`}
              fill="none"
              stroke="#67e8f9"
              strokeWidth="0.5"
              opacity="0.7"
              strokeDasharray="2 2"
            />
          );
        })}
        {points.map(([x, y, label], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="1.6" fill="#67e8f9" />
            <circle cx={x} cy={y} r="3" fill="none" stroke="#67e8f9" strokeWidth="0.4" opacity="0.5" />
            <text
              x={x + 4}
              y={y - 3}
              fill="#bfdbfe"
              fontFamily="monospace"
              fontSize="4.5"
              opacity="0.85"
            >
              {label}
            </text>
          </g>
        ))}
      </svg>
    </ScreenFrame>
  );
}

function ScreenInbound() {
  return (
    <ScreenFrame
      topLeft="eurasia // inbound vector"
      topRight="● tracking"
      bottomLeft="14 contacts"
      bottomRight="vec 0094"
    >
      <svg
        viewBox="0 0 200 150"
        className="absolute inset-0 w-full h-full"
        style={{ filter: "drop-shadow(0 0 4px rgba(96,165,250,0.45))" }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={20 + i * 20}
            y1="20"
            x2={20 + i * 20}
            y2="135"
            stroke="#93c5fd"
            strokeWidth="0.2"
            opacity="0.18"
          />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1="20"
            y1={30 + i * 20}
            x2="180"
            y2={30 + i * 20}
            stroke="#93c5fd"
            strokeWidth="0.2"
            opacity="0.18"
          />
        ))}
        <path
          d="M 90 60 Q 120 50 145 55 Q 170 65 165 85 Q 160 105 140 110 Q 120 115 105 105 Q 90 95 88 80 Z"
          fill="none"
          stroke="#93c5fd"
          strokeWidth="0.6"
          opacity="0.65"
        />
        {[
          ["120,60", "20,75"],
          ["140,80", "10,95"],
          ["155,75", "15,60"],
          ["130,95", "25,110"],
          ["110,70", "5,80"],
          ["145,100", "20,125"],
        ].map(([from, to], i) => {
          const [fx, fy] = from.split(",").map(Number);
          const [tx, ty] = to.split(",").map(Number);
          const cx = (fx + tx) / 2;
          const cy = Math.min(fy, ty) - 22;
          return (
            <path
              key={i}
              d={`M ${fx} ${fy} Q ${cx} ${cy} ${tx} ${ty}`}
              fill="none"
              stroke="#67e8f9"
              strokeWidth="0.5"
              opacity="0.78"
              strokeDasharray="3 2"
            />
          );
        })}
        {[
          [120, 60],
          [140, 80],
          [155, 75],
          [130, 95],
          [110, 70],
          [145, 100],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="1.6" fill="#67e8f9" />
            <circle cx={x} cy={y} r="3" fill="none" stroke="#67e8f9" strokeWidth="0.4" opacity="0.5" />
          </g>
        ))}
      </svg>
    </ScreenFrame>
  );
}

function StatBox({
  label,
  value,
  unit,
  tone = "blue",
}: {
  label: string;
  value: string;
  unit?: string;
  tone?: "blue" | "amber" | "red";
}) {
  const toneClass =
    tone === "amber"
      ? "text-amber-300"
      : tone === "red"
        ? "text-red-400"
        : "text-blue-100";
  const toneShadow =
    tone === "amber"
      ? "0 0 10px rgba(251,191,36,0.65), 0 0 22px rgba(251,191,36,0.35)"
      : tone === "red"
        ? "0 0 10px rgba(239,68,68,0.7), 0 0 22px rgba(239,68,68,0.4)"
        : GLOW;
  return (
    <div className="border border-blue-400/30 bg-blue-950/15 px-3 py-2 sm:px-4 sm:py-3">
      <div className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] uppercase text-blue-300/55">
        {label}
      </div>
      <div
        className={`font-mono tabular-nums ${toneClass} text-lg sm:text-2xl tracking-wider mt-1`}
        style={{ textShadow: toneShadow }}
      >
        {value}
        {unit && (
          <span className="text-blue-300/40 text-xs sm:text-sm ml-1">{unit}</span>
        )}
      </div>
    </div>
  );
}

export default function GatedMadhu() {
  return (
    <Gate>
      <main className="min-h-screen bg-black text-blue-100 font-mono">
        <div className="max-w-7xl mx-auto p-3 sm:p-5 space-y-3 sm:space-y-4">
          <header className="border border-blue-400/35 bg-blue-950/20 px-3 py-2 sm:px-5 sm:py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span
                className="block w-2 h-2 rounded-full bg-red-500"
                style={{ boxShadow: "0 0 10px rgba(239,68,68,0.85)" }}
                aria-hidden
              />
              <span
                className="text-blue-100 text-[11px] sm:text-sm tracking-[0.3em] uppercase"
                style={{ textShadow: GLOW }}
              >
                madhu // war room
              </span>
            </div>
            <div className="flex items-center gap-4 sm:gap-6 text-[10px] sm:text-xs tracking-wider uppercase">
              <span className="text-blue-300/60">
                station <span className="text-blue-100">07</span>
              </span>
              <span className="text-blue-300/60">
                defcon{" "}
                <span
                  className="text-amber-300 font-bold"
                  style={{
                    textShadow:
                      "0 0 10px rgba(251,191,36,0.7), 0 0 22px rgba(251,191,36,0.35)",
                  }}
                >
                  3
                </span>
              </span>
              <WarClock />
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            <ScreenRadar />
            <ScreenContinental />
            <ScreenInbound />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <StatBox label="stations connected" value="42" />
            <StatBox label="active operatives" value="1" />
            <StatBox label="parked carriers" value="20+" unit="m" />
            <StatBox label="t-minus uplink" value="00:08:14" tone="amber" />
          </div>

          <div
            className="border border-blue-400/35 bg-black px-4 py-5 sm:px-6 sm:py-7"
            style={{
              boxShadow:
                "inset 0 0 35px rgba(59,130,246,0.15), 0 0 30px rgba(59,130,246,0.18)",
            }}
          >
            <div className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] uppercase text-blue-300/55 mb-3">
              wopr.sys &middot; primary terminal
            </div>
            <WarTerminal />
          </div>

          <footer className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] uppercase text-blue-300/40 text-center pt-2">
            madhu &middot; war room &middot; the only winning move
          </footer>
        </div>
      </main>
    </Gate>
  );
}
