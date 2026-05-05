export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center px-6 gap-6">
      <p className="lowercase">character zer0 arriving soon</p>
      <blockquote className="italic text-white/70 max-w-md">
        &ldquo;Now I&rsquo;m convinced the whole day long
        <br />
        That all I learn is always wrong&rdquo;
        <footer className="not-italic mt-2 text-white/50 text-sm">* character zer0 &mdash; June 6, 1996</footer>
      </blockquote>
    </main>
  );
}
