import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex items-end justify-center overflow-hidden">
      <Image
        src="/characterzer0-figure.png"
        alt="character zer0"
        width={1536}
        height={1024}
        priority
        sizes="(max-width: 1536px) 100vw, 1536px"
        className="w-full max-w-[1536px] h-auto"
      />
    </main>
  );
}
