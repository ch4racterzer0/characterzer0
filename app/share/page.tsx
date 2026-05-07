export default function Share() {
  return (
    <main className="min-h-screen bg-black text-blue-100 px-6 py-16 sm:px-10 sm:py-24 flex items-center justify-center">
      <div className="max-w-xl text-center">
        <p
          className="text-blue-100 text-[10px] sm:text-xs tracking-[0.4em] uppercase"
          style={{
            textShadow:
              "0 0 14px rgba(96,165,250,0.7), 0 0 30px rgba(59,130,246,0.4)",
          }}
        >
          share — placeholder
        </p>
        <h1 className="mt-3 text-3xl sm:text-4xl font-light tracking-tight">
          this room is being built
        </h1>
        <p className="mt-6 text-blue-100/70 italic text-sm sm:text-base leading-relaxed">
          a different agent has the keys to this one. the share flow needs
          access to the brand and persona names that stay off the live chat.
          the agent picking this up should treat that as a feature, not a
          gap.
        </p>
      </div>
    </main>
  );
}
