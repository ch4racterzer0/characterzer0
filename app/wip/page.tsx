import Image from "next/image";

export default function WIP() {
  return (
    <main className="min-h-screen bg-black text-blue-100 px-6 py-10 sm:px-10 sm:py-14">
      <article className="max-w-3xl mx-auto flex flex-col gap-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wide text-blue-100 text-center uppercase">
          next asshole getting an open letter
        </h1>

        <p className="italic text-blue-100/60 text-center tracking-[0.3em] uppercase text-sm">
          tbd
        </p>

        <hr className="border-blue-100/15" />

        <div className="flex flex-col gap-3">
          <p className="italic text-blue-100/60 text-sm tracking-[0.2em] uppercase">
            excerpt from latest mission
          </p>
          <a
            href="https://www.spotlightdispatch.com/dear-alex"
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <Image
              src="/wip/open-letter-excerpt.png"
              alt="excerpt: character zer0 could not read it"
              width={764}
              height={157}
              className="rounded-lg border border-blue-400/20 group-hover:border-blue-300/50 w-full h-auto transition-colors"
            />
            <p className="mt-3 text-blue-200 group-hover:text-blue-100 text-sm sm:text-base underline underline-offset-4 break-all transition-colors">
              read the full letter on spotlightdispatch.com/dear-alex &rarr;
            </p>
          </a>
        </div>
      </article>
    </main>
  );
}
