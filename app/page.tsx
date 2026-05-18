import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 bg-white text-black flex flex-col items-center justify-center gap-12 px-6 py-16">
      <h1 className="text-2xl tracking-[0.45em] uppercase font-light text-black/80">
        Chracterzer零号
      </h1>
      <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
        <Link
          href="/sphere"
          className="block rounded-md border border-black/25 bg-white hover:bg-black hover:text-white transition-colors px-6 py-5 text-center text-base tracking-[0.5em] uppercase font-light"
        >
          Sphere
        </Link>
      </div>
    </main>
  );
}
