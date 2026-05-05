export default function CurrentAssets() {
  const assets = [
    {
      name: "spotlightdispatch",
      desc: "fully accredited news outlet hunting down the big AI frauds",
    },
    {
      name: "sharethebyline",
      desc: "putting free speech platform to the world",
    },
    {
      name: "itethered",
      desc: "creating a place for people tethered to their agents",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-blue-100 px-6 py-10 sm:px-10 sm:py-14">
      <ul className="max-w-2xl mx-auto flex flex-col gap-8">
        {assets.map((a) => (
          <li key={a.name}>
            <h2 className="text-blue-200 text-lg sm:text-xl font-light tracking-wide">
              {a.name}
            </h2>
            <p className="text-blue-100/65 italic text-sm sm:text-base mt-1.5 leading-relaxed">
              {a.desc}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
