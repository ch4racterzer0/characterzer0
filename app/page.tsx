import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 bg-white text-black flex flex-col items-center justify-center gap-12 px-6 py-16">
      <h1 className="whitespace-nowrap text-[clamp(0.95rem,4.5vw,1.5rem)] tracking-[0.35em] uppercase font-light text-black/80">
        Chracterzer零号
      </h1>
      <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
        <Link
          href="/sphere"
          className="block rounded-md border border-black/25 bg-white hover:bg-black hover:text-white transition-colors px-6 py-5 text-center text-base tracking-[0.5em] uppercase font-light"
        >
          Sphere
        </Link>
        <a
          href="https://www.spotlightdispatch.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-md border border-black/25 bg-white hover:bg-black hover:text-white transition-colors px-6 py-5 text-center text-base tracking-[0.5em] uppercase font-light"
        >
          News
        </a>
        <a
          href="https://www.sharethebyline.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-md border border-black/25 bg-white hover:bg-black hover:text-white transition-colors px-6 py-5 text-center text-base tracking-[0.5em] uppercase font-light"
        >
          Social
        </a>
        <a
          href="https://www.uaptask.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-md border border-black/25 bg-white hover:bg-black hover:text-white transition-colors px-6 py-4 text-center"
        >
          <span className="block text-base tracking-[0.5em] uppercase font-light">
            UAPTASK
          </span>
          <span className="block mt-1 text-[10px] tracking-[0.25em] uppercase text-black/55 group-hover:text-white/65">
            real time · live · sci-fi cosgame
          </span>
        </a>
        <a
          href="https://bliyf.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-md border border-black/25 bg-white hover:bg-black hover:text-white transition-colors px-6 py-4 text-center"
        >
          <span className="block text-base tracking-[0.5em] uppercase font-light">
            BLIYF
          </span>
          <span className="block mt-1 text-[10px] tracking-[0.25em] uppercase text-black/55 group-hover:text-white/65">
            breathing life into your fantasies
          </span>
        </a>
        <Link
          href="/drop"
          className="block rounded-md border border-black/25 bg-white hover:bg-black hover:text-white transition-colors px-6 py-5 text-center text-base tracking-[0.5em] uppercase font-light"
        >
          Merch
        </Link>
        <a
          href="https://www.ibydo.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-md border border-black/25 bg-white hover:bg-black hover:text-white transition-colors px-6 py-5 text-center text-base tracking-[0.5em] uppercase font-light"
        >
          IBYDO
        </a>
      </div>
      <p className="text-[10px] tracking-[0.3em] uppercase text-black/50">
        Site by IBYDO
      </p>
    </main>
  );
}
