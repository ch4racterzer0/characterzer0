export default function CurrentAssets() {
  const assets = [
    {
      name: "spotlightdispatch",
      href: "https://spotlightdispatch.com",
      desc: "fully accredited news outlet hunting down the big AI frauds",
    },
    {
      name: "sharethebyline",
      href: "https://sharethebyline.com",
      desc: "putting free speech platform to the world",
    },
    {
      name: "itethered",
      href: "https://itethered.com",
      desc: "creating a place for people tethered to their agents",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-blue-100 px-6 py-10 sm:px-10 sm:py-14">
      <ul className="max-w-2xl mx-auto flex flex-col gap-8">
        {assets.map((a) => (
          <li key={a.name}>
            <a
              href={a.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-200 text-lg sm:text-xl font-light tracking-wide hover:text-blue-100 underline-offset-4 hover:underline transition-colors"
            >
              {a.name}
            </a>
            <p className="text-blue-100/65 italic text-sm sm:text-base mt-1.5 leading-relaxed">
              {a.desc}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
