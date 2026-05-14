export const dynamic = "force-static";

export const metadata = {
  title: "It's Your Sphere — a letter to the First Lady",
  description:
    "An open letter offering /itsyoursphere to Melania Trump as her legacy work for the children of America.",
};

const PAPER =
  "linear-gradient(180deg, rgba(248,243,228,0.99) 0%, rgba(238,230,205,0.99) 100%)";
const PAPER_BORDER = "rgba(140,98,52,0.55)";
const INK = "rgba(40,28,18,0.95)";
const INK_SOFT = "rgba(80,55,30,0.85)";
const ACCENT = "rgba(150,35,25,0.95)";

export default function DearMelania() {
  return (
    <>
      <style>{`.cz-chrome, .cz-orb-center { display: none !important; }`}</style>
      <main className="relative z-10 isolate min-h-screen bg-transparent flex flex-col items-center px-3 sm:px-6 py-10 sm:py-16">
        <div className="w-full max-w-3xl flex flex-col items-stretch gap-3">
          {/* tiny eyebrow above the letter */}
          <p
            className="font-mono text-[10px] tracking-[0.4em] uppercase text-center"
            style={{ color: "rgba(245,235,215,0.65)" }}
          >
            · a letter, hand-delivered ·
          </p>

          {/* the letter — laid out as a sheet of cream stationery on dark */}
          <article
            className="relative w-full rounded-sm overflow-hidden"
            style={{
              background: PAPER,
              border: `1px solid ${PAPER_BORDER}`,
              boxShadow:
                "inset 0 1px 0 rgba(255,250,235,0.65), inset 0 -2px 0 rgba(120,80,40,0.30), 0 24px 60px -12px rgba(0,0,0,0.85), 0 0 0 1px rgba(80,55,25,0.35)",
            }}
          >
            {/* subtle paper grain via radial scuffs */}
            <span
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 18% 22%, rgba(80,55,25,0.05) 0%, transparent 30%), radial-gradient(circle at 78% 75%, rgba(80,55,25,0.06) 0%, transparent 35%), radial-gradient(circle at 60% 30%, rgba(120,80,40,0.04) 0%, transparent 25%)",
                mixBlendMode: "multiply",
              }}
            />

            <div className="relative px-7 sm:px-14 py-10 sm:py-14">
              {/* header row: addressee + date */}
              <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-10 pb-6 border-b" style={{ borderColor: "rgba(120,80,40,0.30)" }}>
                <div
                  className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase leading-relaxed"
                  style={{ color: INK_SOFT }}
                >
                  to
                  <br />
                  <span style={{ color: INK, fontWeight: 600 }}>
                    Melania Trump
                  </span>
                  <br />
                  First Lady of the United States
                  <br />
                  The White House
                  <br />
                  Washington, D.C.
                </div>
                <div
                  className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-left sm:text-right"
                  style={{ color: INK_SOFT }}
                >
                  May 14, 2026
                  <br />
                  <span style={{ color: INK }}>by hand</span>
                </div>
              </header>

              {/* salutation */}
              <p
                className="text-xl sm:text-2xl mb-8"
                style={{
                  color: INK,
                  fontFamily:
                    "Georgia, 'Times New Roman', Times, serif",
                  fontStyle: "italic",
                }}
              >
                Dear Madam First Lady,
              </p>

              {/* body — DRAFT in user's voice. Replace with the final words. */}
              <div
                className="space-y-5 leading-relaxed"
                style={{
                  color: INK,
                  fontFamily:
                    "Georgia, 'Times New Roman', Times, serif",
                  fontSize: "16px",
                  lineHeight: 1.75,
                }}
              >
                <p>
                  I built this site this week. It is called{" "}
                  <em>It&rsquo;s Your Sphere</em>. It is a memorial for any
                  child, teacher, or staff member killed by a gun inside an
                  American school. It is free. It will always be free.
                </p>

                <p>
                  I am no one you have heard of. I have two teenage boys. I
                  have not been impacted by what this site is for. I built it
                  anyway, because every name on this list once had a parent
                  who said the exact same thing &mdash; until they
                  didn&rsquo;t. This is my receipt for not having done more
                  to stop it sooner.
                </p>

                <p>
                  I am writing to give it to you.
                </p>

                <p>
                  Not lend. Not co-brand. <em>Give</em>. The whole thing. The
                  site, the framing, the stewardship, the next words spoken
                  on it. I am the wrong person to carry this. You are the
                  right one. You have the platform. You have the standing.
                  You have spent your time as First Lady on the wellbeing of
                  children, and this is exactly that &mdash; the wellbeing of
                  the ones we keep failing.
                </p>

                <p>
                  No one will misread this if it is yours. The mothers will
                  not have to wonder which side of an argument they are
                  joining when they submit their child&rsquo;s picture. They
                  will be submitting it to the First Lady of the United
                  States. That is the only sentence I want them to have to
                  think.
                </p>

                <p>
                  If you accept it, the keys are yours. The repo is yours.
                  The decisions about who is added, what is said, when it is
                  taken down, all of it. I will hand it over and step out of
                  the picture. If you would like me to keep building it on
                  your behalf, I will do that too, in your voice, not mine.
                </p>

                <p>
                  If you do not accept it, the site stays where it is. The
                  offer was the point.
                </p>

                <p
                  className="pt-2"
                  style={{
                    color: ACCENT,
                    fontStyle: "italic",
                  }}
                >
                  This is your legacy, ma&rsquo;am. Not mine. I just held it
                  for you until you could see it.
                </p>
              </div>

              {/* sign-off */}
              <div className="mt-12 flex flex-col gap-2">
                <p
                  className="text-base"
                  style={{
                    color: INK,
                    fontFamily:
                      "Georgia, 'Times New Roman', Times, serif",
                    fontStyle: "italic",
                  }}
                >
                  With every respect I have to give,
                </p>
                <p
                  className="font-mono text-base sm:text-lg tracking-[0.08em] mt-2"
                  style={{ color: INK, fontWeight: 600 }}
                >
                  Chracterzer零号
                </p>
                <p
                  className="font-mono text-[10px] tracking-[0.25em] uppercase mt-1"
                  style={{ color: INK_SOFT }}
                >
                  the maker of itsyoursphere.com
                </p>
              </div>

              {/* postscript */}
              <div
                className="mt-10 pt-6 border-t"
                style={{ borderColor: "rgba(120,80,40,0.30)" }}
              >
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    color: INK_SOFT,
                    fontFamily:
                      "Georgia, 'Times New Roman', Times, serif",
                    fontStyle: "italic",
                  }}
                >
                  P.S. The orb is dark right now because no family has sent
                  a picture yet. The first one to land will be the
                  beginning. I would be honored if it came in your name.
                </p>
              </div>
            </div>
          </article>

          {/* small footer note under the letter, off the paper */}
          <p
            className="mt-2 font-mono text-[9px] tracking-[0.3em] uppercase text-center"
            style={{ color: "rgba(245,235,215,0.45)" }}
          >
            it&rsquo;s your sphere · a gift, not a campaign
          </p>
        </div>
      </main>
    </>
  );
}
