"use client";

function CloseButton() {
  return (
    <button
      type="button"
      onClick={() => {
        window.open("", "_self");
        window.close();
        setTimeout(() => {
          window.location.replace("about:blank");
        }, 150);
      }}
      className="block w-full text-center text-blue-100/70 hover:text-blue-100 text-sm tracking-[0.3em] uppercase border border-blue-100/20 hover:border-blue-100/40 rounded-md px-5 py-3 transition-colors"
    >
      dead end
    </button>
  );
}

export function MobileLanding() {
  return (
    <main className="sm:hidden min-h-screen bg-black text-blue-100 flex flex-col items-center justify-center px-6 py-10 gap-10 font-light">
      <p className="text-base leading-relaxed max-w-sm">
        we don&rsquo;t value mobile traffic. instead of redirecting you the
        way every other company would &mdash; cashing in on your{" "}
        <b className="text-blue-50 font-bold tracking-wider">
          PRECIOUS MOBILE
        </b>{" "}
        clicks &mdash; we give you three choices, because there&rsquo;s
        nowhere else we can trust to send them.
      </p>

      <nav className="flex flex-col gap-4 w-full max-w-xs">
        <a
          href="https://sharethebyline.com"
          className="block text-center text-blue-100 hover:text-blue-50 text-sm tracking-[0.3em] uppercase border border-blue-300/40 hover:border-blue-300/70 rounded-md px-5 py-3 transition-colors"
        >
          sharethebyline
        </a>
        <a
          href="https://spotlightdispatch.com"
          className="block text-center text-blue-100 hover:text-blue-50 text-sm tracking-[0.3em] uppercase border border-blue-300/40 hover:border-blue-300/70 rounded-md px-5 py-3 transition-colors"
        >
          spotlightdispatch
        </a>
        <CloseButton />
      </nav>
    </main>
  );
}
