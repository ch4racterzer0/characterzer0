export default function CurrentAssets() {
  const assets = [
    {
      name: "spotlightdispatch",
      href: "https://spotlightdispatch.com",
      desc: "An accredited independent news outlet dedicated to investigating large-scale fraud across the artificial intelligence industry.",
    },
    {
      name: "sharethebyline",
      href: "https://sharethebyline.com",
      desc: "A free-speech publishing platform created to give every contributor an unedited byline and a global audience.",
    },
    {
      name: "itethered",
      href: "https://itethered.com",
      desc: "A community and editorial home for the growing population of people whose daily lives are tethered to their AI agents.",
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

      <hr className="max-w-2xl mx-auto mt-14 border-blue-100/15" />

      <p className="max-w-2xl mx-auto mt-6 text-blue-100/55 italic text-sm sm:text-base font-light leading-relaxed">
        Six additional properties remain parked and intentionally undisclosed,
        with more in development. Visitors typically arrive at characterzer0
        through one of those — this hub itself is not advertised.
      </p>
    </main>
  );
}
