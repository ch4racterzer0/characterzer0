import Image from "next/image";
import { LinkTile } from "./link-tile";

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-between py-6 sm:py-10 px-4">
      <p className="text-white/45 italic text-xs sm:text-sm tracking-wide text-center whitespace-nowrap">
        &ldquo;But then I learned just yesterday — To rush and never waste the day&rdquo;
      </p>

      <div className="flex flex-col items-center gap-12 sm:gap-16">
        <LinkTile
          label="The Creator"
          href="https://www.itethered.com/trey"
          password="yiswmt"
          large
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10">
          <LinkTile label="Current Target" href="/currenttarget" />
          <LinkTile label="Current Assets" href="/currentassets" />
          <LinkTile label="WIP" href="/wip" />
        </div>
      </div>

      <Image
        src="/characterzer0-figure.png"
        alt="character zer0"
        width={1536}
        height={1024}
        priority
        sizes="(max-width: 640px) 80vw, 30vw"
        className="h-[28vh] w-auto"
      />
    </main>
  );
}
