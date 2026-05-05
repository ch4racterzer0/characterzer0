const CHANNEL_ID = "UCYmL7UZfguRrtqjlZUoScCQ";
const CHANNEL_HANDLE = "ItsYourSphere";
const CHANNEL_URL = `https://www.youtube.com/@${CHANNEL_HANDLE}`;
const LIVE_URL = `${CHANNEL_URL}/live`;

export default function Stream() {
  return (
    <main className="min-h-screen bg-black text-blue-100 flex flex-col">
      <header className="px-4 sm:px-6 pt-4 pb-3 flex items-center justify-between gap-3 border-b border-blue-100/10">
        <div className="flex items-center gap-3 min-w-0">
          <span
            className="block w-2.5 h-2.5 rounded-full bg-red-500 shrink-0"
            style={{ boxShadow: "0 0 12px rgba(239,68,68,0.85)" }}
            aria-hidden
          />
          <div className="min-w-0">
            <p className="text-blue-100 font-light tracking-[0.2em] uppercase text-sm sm:text-base truncate">
              itsyoursphere
            </p>
            <p className="text-blue-100/50 text-[10px] tracking-[0.25em] uppercase truncate">
              the video arm
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href={LIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-100/80 hover:text-blue-100 text-[10px] sm:text-xs tracking-[0.25em] uppercase border border-blue-400/40 rounded-md px-3 py-1.5 hover:bg-blue-900/30 hover:border-blue-300/60 transition-colors"
          >
            watch live &rarr;
          </a>
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-block text-blue-100/60 hover:text-blue-100 text-[10px] tracking-[0.25em] uppercase underline underline-offset-4"
          >
            channel
          </a>
        </div>
      </header>

      <div className="flex-1 relative bg-black">
        <iframe
          src={`https://www.youtube.com/embed/live_stream?channel=${CHANNEL_ID}&autoplay=0&rel=0&modestbranding=1`}
          title="FullSendBash live stream"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>

      <footer className="px-4 sm:px-6 py-3 border-t border-blue-100/10 flex items-center justify-between gap-4 text-[10px] sm:text-xs">
        <p className="text-blue-100/50 tracking-[0.25em] uppercase">
          tonight 11pm et &middot; the demo airs from this channel
        </p>
        <p className="text-blue-100/40 italic tracking-wide hidden sm:block">
          if the player won&rsquo;t start, the channel is between streams &mdash; tap watch live.
        </p>
      </footer>
    </main>
  );
}
