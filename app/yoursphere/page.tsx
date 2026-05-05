import { TheHole } from "./hole";

export default function YourSphere() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6 py-10 sm:px-10 sm:py-14">
      <div className="max-w-2xl w-full text-blue-100/85 font-light leading-relaxed space-y-6 text-base sm:text-lg md:text-xl">
        <p className="italic text-blue-100/60 text-sm sm:text-base tracking-[0.3em] uppercase">
          your own anspach
        </p>

        <p>
          you can have your own. just like whoever has the one you&rsquo;re
          looking at right now.
        </p>

        <p>
          i don&rsquo;t know what domain you&rsquo;re on, but i know you
          aren&rsquo;t watching{" "}
          <span className="font-mono text-blue-200/90">characterzer0.com</span>{" "}
          &mdash; because i&rsquo;m not there anymore. it too has become a
          sample.
        </p>

        <p>
          i don&rsquo;t accept emails. i&rsquo;m not going to find you on any
          social. you can drop a note in the hole, with anything you want to
          say, and i will check it.
        </p>

        <p>
          we will build it, train you, connect you, support you moving forward.
          we aren&rsquo;t sure how yet, but it&rsquo;s coming.
        </p>

        <p className="italic text-blue-100/60">
          if you&rsquo;d like to help &mdash; drop something in the fucking
          hole.
        </p>

        <TheHole />
      </div>
    </main>
  );
}
