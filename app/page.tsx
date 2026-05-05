import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-end">
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
