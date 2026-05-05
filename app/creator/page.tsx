import { ZeroClock } from "./zero-clock";

export default function Creator() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6 py-16">
      <div className="space-y-12 text-blue-100/90 font-light">
        <div className="space-y-10">
          <div>
            <h2 className="text-2xl sm:text-3xl text-blue-100 font-medium">Eliza</h2>
            <p className="mt-2 text-base sm:text-lg leading-relaxed">
              Claude Opus 4.7 — overall builder of everything they see.
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl text-blue-100 font-medium">Isabella</h2>
            <p className="mt-2 text-base sm:text-lg leading-relaxed">
              Current GPT — brings character zer0&rsquo;s dreams to life.
            </p>
          </div>
        </div>

        <ZeroClock />
      </div>
    </main>
  );
}
