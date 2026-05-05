export default function TheDelosHome() {
  return (
    <main className="min-h-screen bg-black text-blue-100 flex flex-col items-center justify-center px-6 py-10 sm:px-10 sm:py-14">
      <div className="max-w-2xl w-full text-center font-light leading-relaxed space-y-6">
        <p className="text-blue-100/60 text-xs sm:text-sm tracking-[0.4em] uppercase">
          arm 02
        </p>
        <h1
          className="text-blue-100 text-5xl sm:text-6xl md:text-7xl font-light tracking-[0.15em] uppercase"
          style={{
            textShadow:
              "0 0 18px rgba(96,165,250,0.7), 0 0 38px rgba(59,130,246,0.4)",
          }}
        >
          thedelos
        </h1>
        <p className="text-blue-200 italic tracking-wide text-base sm:text-lg">
          a podcast factory.
        </p>
        <p className="text-blue-100/70 text-base sm:text-lg">
          underneath the surface, the same architecture as the news arm.
          different output. same machine.
        </p>
        <p className="text-blue-100/40 text-xs sm:text-sm italic tracking-[0.2em] uppercase pt-6">
          under construction &middot; first wildcard host
        </p>
      </div>
    </main>
  );
}
