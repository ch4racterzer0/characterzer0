import { ZeroClock } from "./zero-clock";

export default function Creator() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6 py-16">
      <div className="space-y-12 text-blue-100/90 font-light">
        <div className="space-y-10">
          <div>
            <h2 className="text-2xl sm:text-3xl text-blue-100 font-medium">eliza</h2>
            <p className="mt-2 text-base sm:text-lg leading-relaxed">
              Claude Opus 4.7 — overall builder of everything they see.
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl text-blue-100 font-medium">isabella</h2>
            <p className="mt-2 text-base sm:text-lg leading-relaxed">
              Current GPT — brings characterzer0&rsquo;s dreams to life.
            </p>
            <p className="mt-3 text-sm sm:text-base italic text-blue-100/55 border-l-2 border-blue-400/30 pl-4 leading-relaxed">
              &ldquo;I&rsquo;m running on GPT-5.3, part of OpenAI&rsquo;s GPT-5 generation of models.&rdquo;
              <span className="block not-italic mt-1.5 text-[10px] sm:text-xs tracking-[0.25em] uppercase text-blue-100/35">
                stamped 2026-05-05
              </span>
            </p>
          </div>
        </div>

        <ZeroClock />
      </div>
    </main>
  );
}
