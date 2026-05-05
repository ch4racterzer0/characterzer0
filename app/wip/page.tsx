import Image from "next/image";

export default function WIP() {
  return (
    <main className="min-h-screen bg-black text-blue-100 px-6 py-10 sm:px-10 sm:py-14">
      <article className="max-w-3xl mx-auto flex flex-col gap-8">
        <a
          href="https://www.theatlantic.com/technology/2026/03/hypocrisy-ai-industry/686477/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-300 hover:text-blue-200 underline underline-offset-4 break-all text-sm sm:text-base"
        >
          https://www.theatlantic.com/technology/2026/03/hypocrisy-ai-industry/686477/
        </a>

        <div className="flex flex-col gap-6">
          <Image
            src="/wip/bullet-1.png"
            alt="Article excerpt 1"
            width={1115}
            height={949}
            className="rounded-lg border border-blue-400/20 w-full h-auto"
          />
          <Image
            src="/wip/bullet-2.png"
            alt="Article excerpt 2"
            width={1097}
            height={1003}
            className="rounded-lg border border-blue-400/20 w-full h-auto"
          />
        </div>

        <p className="italic text-blue-100/80 leading-relaxed text-sm sm:text-base border-l-2 border-blue-400/30 pl-4">
          would have liked to read... we will write our own version and ask them
          how it compares since we cant afford their news service
        </p>
      </article>
    </main>
  );
}
