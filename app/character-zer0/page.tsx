export const metadata = {
  title: "character zer0 — for hire",
  description:
    "this site is the resume. character zer0 is the resume. available for contract work.",
};

const STACK: { label: string; line: string }[] = [
  {
    label: "framework",
    line: "next.js 16 — app router, server components, server actions, routing middleware",
  },
  { label: "runtime", line: "react 19 on node.js, typescript end-to-end" },
  { label: "styling", line: "tailwind css 4, hand-tuned css keyframes, postcss" },
  {
    label: "hosting",
    line: "vercel — edge, blob storage, instant rollback, preview-per-commit",
  },
  {
    label: "broadcast",
    line: "ffmpeg + ddagrab + libx264 → rtmp → youtube live, 9 mbps cbr, 30 fps, h264 high@4.2",
  },
  {
    label: "audio",
    line: "custom playlist api over node fs, html5 audio with byte-range streaming, edm bed served from disk",
  },
  {
    label: "tooling",
    line: "powershell pipelines (scripts/yt-dell.ps1), git, gh cli, vercel cli, claude code as the room partner",
  },
  {
    label: "hardware",
    line: "windows 11, dell se2425hm broadcast monitor, nvidia gtx 1660 super, ffmpeg software encode for now (nvenc when the driver clears 570)",
  },
];

const BRINGS: string[] = [
  "visual direction, character work, world-building from cold start to brand",
  "copy and brand voice that lands the way the open letters do",
  "full-stack product built on the human-and-ai partnership below",
  "the ability to want the system before the system exists, and to keep wanting it through ship",
];

const DOES_NOT: string[] = [
  "read your existing codebase by myself",
  "debug your stack without the model in the room",
  "pretend either of us is not here",
];

export default function CharacterZer0() {
  return (
    <main className="min-h-screen bg-black text-blue-100 px-5 py-10 sm:px-10 sm:py-14 font-light">
      <article className="max-w-3xl mx-auto flex flex-col gap-10 leading-relaxed">
        <header className="space-y-3">
          <p className="text-blue-100/55 text-[10px] sm:text-xs tracking-[0.4em] uppercase">
            // for hire &middot; open letter
          </p>
          <h1
            className="text-blue-100 text-4xl sm:text-5xl md:text-6xl font-light tracking-[0.18em] uppercase"
            style={{
              textShadow:
                "0 0 18px rgba(96,165,250,0.7), 0 0 38px rgba(59,130,246,0.4)",
            }}
          >
            character zer0
          </h1>
          <p className="text-blue-100/55 text-[10px] sm:text-xs tracking-[0.3em] uppercase">
            architect &middot; human &middot; available for contract work
          </p>
        </header>

        <section className="space-y-5">
          <p
            className="text-blue-100 text-xl sm:text-2xl tracking-wide"
            style={{
              textShadow:
                "0 0 14px rgba(96,165,250,0.55), 0 0 32px rgba(59,130,246,0.3)",
            }}
          >
            this site is the resume.
          </p>
          <p className="text-blue-100/85 text-base sm:text-lg">
            the character is the resume. the universe is the resume. the
            newspaper at <span className="text-blue-100">spotlightdispatch.com</span>{" "}
            is the resume. every graphic, every page, every animation, every
            open letter to a senator or a ceo, every cursed flicker on every
            page &mdash; the resume.
          </p>
          <p className="text-blue-100/85 text-base sm:text-lg">
            i have not written a line of code in my life. i cannot read it. i
            cannot write it. i do not know what most of the words mean when an
            engineer says them out loud.
          </p>
          <p className="text-blue-100/85 text-base sm:text-lg">
            what you are looking at, then &mdash; the character, the universe,
            the newspaper, the open letters, every graphic on this site, every
            animation, every page, every api route, the live broadcast running
            tonight on youtube &mdash; was made by character zer0 and the
            language model in the room with him.{" "}
            <span className="italic text-blue-100/70">
              we do not hide either of us.
            </span>
          </p>
          <p className="text-blue-100/85 text-base sm:text-lg">
            the arrangement: i sketch. i direct. i push the work. the model
            writes the code. together we ship.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-blue-100 text-xs sm:text-sm tracking-[0.3em] uppercase">
            the stack
          </h2>
          <p className="text-blue-100/65 italic text-sm sm:text-base">
            what the artifact you are inside right now is built on. i did not
            write any of it. i directed every line of it. the model is in the
            room because we don&rsquo;t pretend it isn&rsquo;t.
          </p>
          <ul className="space-y-2 font-mono">
            {STACK.map((s) => (
              <li
                key={s.label}
                className="flex items-start gap-3 text-[12px] sm:text-sm border-l border-blue-400/25 pl-3"
              >
                <span
                  className="text-blue-300/65 tracking-[0.25em] uppercase shrink-0 w-24 sm:w-28 mt-0.5"
                  style={{ textShadow: "0 0 6px rgba(96,165,250,0.4)" }}
                >
                  {s.label}
                </span>
                <span className="text-blue-100/85">{s.line}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-blue-100 text-xs sm:text-sm tracking-[0.3em] uppercase">
            share the byline &mdash; the distribution side
          </h2>
          <p className="text-blue-100/85 text-base sm:text-lg">
            the same way this site is the resume for the build,{" "}
            <span className="text-blue-100">sharethebyline</span> is the resume
            for the social. spotlight dispatch handles the letters.
            sharethebyline handles the audience. the channels below are the
            receipts.
          </p>
          <div
            className="border border-blue-400/35 bg-blue-950/15 px-5 py-5 sm:px-6 sm:py-6 space-y-3 font-mono"
            style={{ boxShadow: "inset 0 0 30px rgba(59,130,246,0.15)" }}
          >
            <a
              href="https://www.facebook.com/profile.php?id=61589722431935"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-baseline justify-between gap-3 text-sm sm:text-base hover:bg-blue-900/20 -mx-1 px-1 py-1 rounded-sm transition-colors"
            >
              <span className="text-blue-300/65 tracking-[0.3em] uppercase shrink-0">
                facebook
              </span>
              <span
                className="text-cyan-300 tracking-wider truncate"
                style={{
                  textShadow:
                    "0 0 10px rgba(103,232,249,0.55), 0 0 22px rgba(59,130,246,0.25)",
                }}
              >
                character zer0 ↗
              </span>
            </a>
            <a
              href="https://www.youtube.com/@ItsYourSphere"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-baseline justify-between gap-3 text-sm sm:text-base hover:bg-blue-900/20 -mx-1 px-1 py-1 rounded-sm transition-colors"
            >
              <span className="text-blue-300/65 tracking-[0.3em] uppercase shrink-0">
                youtube
              </span>
              <span
                className="text-cyan-300 tracking-wider truncate"
                style={{
                  textShadow:
                    "0 0 10px rgba(103,232,249,0.55), 0 0 22px rgba(59,130,246,0.25)",
                }}
              >
                itsyoursphere &mdash; the video arm ↗
              </span>
            </a>
            <div className="flex items-baseline justify-between gap-3 text-sm sm:text-base -mx-1 px-1 py-1">
              <span className="text-blue-300/65 tracking-[0.3em] uppercase shrink-0">
                publication
              </span>
              <a
                href="https://www.spotlightdispatch.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 tracking-wider truncate hover:text-cyan-200"
                style={{
                  textShadow:
                    "0 0 10px rgba(103,232,249,0.55), 0 0 22px rgba(59,130,246,0.25)",
                }}
              >
                spotlightdispatch.com ↗
              </a>
            </div>
          </div>
          <p className="text-blue-100/80 text-base sm:text-lg italic">
            the build, the social, the publication, the character. one byline.
            the total package.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-blue-100 text-xs sm:text-sm tracking-[0.3em] uppercase">
            what i bring
          </h2>
          <ul className="space-y-2">
            {BRINGS.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 text-base sm:text-lg text-blue-100/90"
              >
                <span
                  aria-hidden
                  className="block w-1.5 h-1.5 rounded-full bg-cyan-300 mt-2.5 shrink-0"
                  style={{ boxShadow: "0 0 6px rgba(103,232,249,0.85)" }}
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-blue-100 text-xs sm:text-sm tracking-[0.3em] uppercase">
            what i do not bring
          </h2>
          <ul className="space-y-2">
            {DOES_NOT.map((d) => (
              <li
                key={d}
                className="flex items-start gap-3 text-base sm:text-lg text-blue-100/75"
              >
                <span
                  aria-hidden
                  className="block w-1.5 h-1.5 rounded-full bg-red-400/80 mt-2.5 shrink-0"
                  style={{ boxShadow: "0 0 6px rgba(248,113,113,0.7)" }}
                />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-blue-100 text-xs sm:text-sm tracking-[0.3em] uppercase">
            terms
          </h2>
          <p className="text-blue-100/85 text-base sm:text-lg">
            negotiable. project, retainer, or sprint &mdash; whichever shape
            the work wants. visual direction starts at the kickoff call. code
            ships through the partnership above.
          </p>
          <p className="text-blue-100/85 text-base sm:text-lg italic">
            if you need someone to want the system before the system exists,
            this is where you call.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-blue-100 text-xs sm:text-sm tracking-[0.3em] uppercase">
            contact
          </h2>
          <p className="text-blue-100/65 italic text-sm sm:text-base">
            the same contact bundle spotlight dispatch uses on every public
            letter. the phone is real. the phone rings. someone picks it up.
          </p>
          <div
            className="border border-blue-400/35 bg-blue-950/15 px-5 py-5 sm:px-6 sm:py-6 space-y-3 font-mono"
            style={{ boxShadow: "inset 0 0 30px rgba(59,130,246,0.15)" }}
          >
            <p className="text-blue-100 text-base sm:text-lg tracking-wider select-all">
              Roger Woolfe
            </p>
            <p className="text-blue-100/85 text-sm sm:text-base tracking-wider select-all">
              555 Stange Desine Way, Burlington, VT 45047
            </p>
            <p
              className="text-cyan-300 text-base sm:text-lg tracking-wider select-all"
              style={{
                textShadow:
                  "0 0 10px rgba(103,232,249,0.6), 0 0 24px rgba(59,130,246,0.3)",
              }}
            >
              (802) 734-4810
            </p>
            <p
              className="text-cyan-300 text-base sm:text-lg tracking-wider select-all"
              style={{
                textShadow:
                  "0 0 10px rgba(103,232,249,0.6), 0 0 24px rgba(59,130,246,0.3)",
              }}
            >
              ch4racterzer0@gmail
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-blue-100 text-xs sm:text-sm tracking-[0.3em] uppercase">
            for the longer story
          </h2>
          <p className="text-blue-100/85 text-base sm:text-lg">
            the publication that walked into a north carolina walmart on the
            night of saturday, may 9, 2026 with no body, and walked out with
            one &mdash;
          </p>
          <a
            href="https://www.spotlightdispatch.com/hey-walmart-samuel"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-cyan-300 hover:text-cyan-200 font-mono text-sm sm:text-base tracking-[0.15em] border-b border-cyan-400/40 hover:border-cyan-300/70 transition-colors"
            style={{
              textShadow:
                "0 0 10px rgba(103,232,249,0.55), 0 0 22px rgba(59,130,246,0.25)",
            }}
          >
            spotlightdispatch.com/hey-walmart-samuel ↗
          </a>
        </section>

        <p
          className="text-blue-100 text-3xl sm:text-4xl text-center pt-2 tracking-wider"
          style={{
            textShadow:
              "0 0 16px rgba(96,165,250,0.65), 0 0 36px rgba(59,130,246,0.35)",
          }}
        >
          零号
        </p>
      </article>
    </main>
  );
}
