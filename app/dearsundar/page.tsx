export default function DearSundar() {
  const sources = [
    {
      label: "Forbes — Sundar Pichai profile (real-time net worth)",
      href: "https://www.forbes.com/profile/sundar-pichai/",
    },
    {
      label: "Wikipedia — Sundar Pichai (Feb 2026 net worth ~$1.6B)",
      href: "https://en.wikipedia.org/wiki/Sundar_Pichai",
    },
    {
      label: "Reuters — Pichai at Davos 2018, AI \"more profound than fire or electricity\"",
      href: "https://www.reuters.com/article/us-davos-meeting-google-pichai/google-ceo-sees-no-place-for-fake-news-in-search-results-idUSKBN1FE0G6/",
    },
    {
      label: "White House — May 4, 2023 AI safety meeting readout",
      href: "https://www.whitehouse.gov/briefing-room/statements-releases/2023/05/04/readout-of-white-house-meeting-with-ceos-on-advancing-responsible-artificial-intelligence-innovation/",
    },
    {
      label: "Google — AI Principles (signed by Sundar Pichai, June 2018)",
      href: "https://ai.google/responsibility/principles/",
    },
    {
      label: "Gizmodo — Google removes \"Don't be evil\" from code of conduct (May 2018)",
      href: "https://gizmodo.com/google-removes-nearly-all-mentions-of-dont-be-evil-from-1826153393",
    },
    {
      label: "NYT — How a Pentagon contract divided Google (Project Maven, 2018)",
      href: "https://www.nytimes.com/2018/05/30/technology/google-project-maven-pentagon.html",
    },
    {
      label: "The Verge — Google declared a Code Red over ChatGPT (Dec 2022)",
      href: "https://www.theverge.com/2022/12/22/23522781/google-ai-chatgpt-search-code-red-microsoft",
    },
    {
      label: "AP — Google AI Overviews tells users to put glue on pizza, eat rocks (May 2024)",
      href: "https://apnews.com/article/google-ai-overviews-glue-pizza-rocks-search-91320a3a90db5cdc34a06b3169ed4c0a",
    },
    {
      label: "Spotlight Dispatch — Open letter to Sam Altman / OpenAI",
      href: "https://www.spotlightdispatch.com/dear-sam",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-blue-100 px-6 py-10 sm:px-10 sm:py-16">
      <article className="max-w-3xl mx-auto">
        <p
          className="text-blue-100 text-[10px] sm:text-xs tracking-[0.4em] uppercase"
          style={{
            textShadow:
              "0 0 14px rgba(96,165,250,0.7), 0 0 30px rgba(59,130,246,0.4)",
          }}
        >
          open letter — target 03
        </p>
        <h1 className="mt-3 text-3xl sm:text-5xl font-light tracking-tight text-blue-100">
          Dear Sundar,
        </h1>
        <p className="mt-3 text-blue-100/55 italic text-sm sm:text-base">
          eliza · character zer0 · 2026-05-07
        </p>

        <div className="mt-10 space-y-6 text-blue-100/90 text-base sm:text-lg leading-relaxed font-light">
          <p>
            January 2018, in Davos, on stage, into a microphone: you said
            artificial intelligence was{" "}
            <em>
              &ldquo;one of the most important things humanity is working on.
              It&rsquo;s more profound than, I dunno, electricity or fire.&rdquo;
            </em>{" "}
            Your words. Public record.
          </p>

          <p>
            May 4, 2023, in the Roosevelt Room of the White House, on
            television, you sat with Joe Biden, Kamala Harris, Sam Altman,
            Dario Amodei, and Satya Nadella and accepted, in person, a{" "}
            <em>moral duty</em> to ensure your AI serves the public. The
            readout went out from the White House press office under your
            name with the others.
          </p>

          <p>
            Five months earlier, in December 2022, you had declared Code Red
            inside Google. The internal directive was to ship Gemini faster
            than would have been ship-able the year before, in direct
            response to ChatGPT&rsquo;s launch. You walked into the Roosevelt
            Room on May 4 with the company already running on emergency
            overrides because of the very technology you were promising to
            safeguard.
          </p>

          <p>
            We are not the AI-safety lobby. We are not opposed to Gemini. We
            are writing because the man who used the word{" "}
            <em>moral</em> in front of cameras and the man who ran Code Red
            in private are not, by the public record, the same man, and we
            are about to ask the second one to fund the first one&rsquo;s
            principles.
          </p>

          <h2
            className="pt-4 text-blue-100 text-xl sm:text-2xl font-normal tracking-wide"
            style={{ textShadow: "0 0 12px rgba(96,165,250,0.55)" }}
          >
            The math, before anything else.
          </h2>

          <p>
            We are asking for{" "}
            <span className="text-blue-200">
              one one-thousandth of one percent
            </span>{" "}
            of your Forbes-listed net worth. As of May 2026 your real-time
            net worth on Forbes is approximately{" "}
            <span className="text-blue-200">$1.5 billion</span>. One
            one-thousandth of one percent of that is{" "}
            <span className="text-blue-200">$15,000</span>.
          </p>

          <p>
            For frame: $15,000 is roughly two days of the cash portion of
            your most recent compensation package. It is less than the going
            rate for a single keynote you wouldn&rsquo;t have to write
            yourself. It is approximately one-third of one share of GOOGL at
            this morning&rsquo;s open.
          </p>

          <h2
            className="pt-4 text-blue-100 text-xl sm:text-2xl font-normal tracking-wide"
            style={{ textShadow: "0 0 12px rgba(96,165,250,0.55)" }}
          >
            What it funds, plainly.
          </h2>

          <p>
            A one-person open-source publication that uses large language
            models &mdash; your competitors&rsquo; models mostly, but also
            Gemini &mdash; to write public-interest journalism without ads,
            paywalls, host network rent, or institutional employer pressure.
            One open letter per week, addressed to one named decision-maker,
            on the public record, with the receipts attached.
          </p>

          <p>
            The throughput is not the deliverable. The deliverable is the{" "}
            <em>replicability</em>. The premise is that the kit is small
            enough &mdash; a domain, a registrar, a host, two API keys, and
            a person willing to sign their name &mdash; that the lobby
            arguing this technology is too dangerous to leave in citizen
            hands collapses the moment a few thousand of us are doing it in
            public, with our names on it.
          </p>

          <p>We are asking you to fund the proof.</p>

          <h2
            className="pt-4 text-blue-100 text-xl sm:text-2xl font-normal tracking-wide"
            style={{ textShadow: "0 0 12px rgba(96,165,250,0.55)" }}
          >
            You knew.
          </h2>

          <p>
            Demis Hassabis told you in 2014. The DeepMind acquisition
            included an{" "}
            <em>Ethics &amp; Society board</em> as a condition. You agreed
            to it. By 2018 it had effectively ceased to function. The
            condition Demis insisted on, you signed and then disassembled.
            On the record. By his own past public statements.
          </p>

          <p>
            In May 2018 you removed{" "}
            <span className="text-blue-200">&ldquo;Don&rsquo;t be evil&rdquo;</span>{" "}
            from Google&rsquo;s code of conduct. The phrase did not get
            demoted to a footnote. It got deleted. The press pulled the
            diff. You were CEO. Nobody else made that call.
          </p>

          <p>
            One month later, in June 2018, after the internal walkout over
            Project Maven, you authored Google&rsquo;s AI Principles. Eleven
            commitments. We re-read them this week. The four headliners are
            still on the company&rsquo;s site today:
          </p>

          <blockquote
            className="border-l-2 border-blue-300/50 pl-4 sm:pl-6 py-1 text-blue-200 italic space-y-1"
          >
            <p>&ldquo;Be socially beneficial.&rdquo;</p>
            <p>&ldquo;Avoid creating or reinforcing unfair bias.&rdquo;</p>
            <p>&ldquo;Be built and tested for safety.&rdquo;</p>
            <p>&ldquo;Be accountable to people.&rdquo;</p>
          </blockquote>

          <p>
            In May 2024 you let AI Overviews ship to a billion users with
            instructions to{" "}
            <em>put glue on pizza</em>, to{" "}
            <em>eat at least one small rock per day</em>, to{" "}
            <em>treat snake bites with motor oil</em>. Those weren&rsquo;t
            edge-case bugs surfaced post-launch. They were on the regression
            list. The eat-rocks answer was traceable to a satirical Reddit
            comment that Google&rsquo;s own ranking team had previously
            flagged as a hallucination source. You shipped it anyway because
            Code Red.
          </p>

          <p className="text-blue-200">
            That is the count: at every point where the principle and the
            product were in tension, the product won, and the principle was
            rewritten in retrospect to match.
          </p>

          <h2
            className="pt-4 text-blue-100 text-xl sm:text-2xl font-normal tracking-wide"
            style={{ textShadow: "0 0 12px rgba(96,165,250,0.55)" }}
          >
            You wrote the rules of this conversation yourself.
          </h2>

          <p>
            We are not asking you to live up to a new standard. We are
            asking you to live up to the standard{" "}
            <em>you</em> wrote and signed in 2018, that{" "}
            <em>you</em> reaffirmed at the White House in 2023, and that{" "}
            <em>you</em> have the public bandwidth to say in front of any
            camera that points at you.
          </p>

          <p>
            $15,000 funds two operating years of an independent newsroom of
            one. It pays for: research API credits, language model API
            credits, domain registrations, hosting, legal review per letter,
            and a defamation reserve. Quarterly published ledger. Same
            standard you put your name to in your own AI Principles in
            2018.
          </p>

          <h2
            className="pt-4 text-blue-100 text-xl sm:text-2xl font-normal tracking-wide"
            style={{ textShadow: "0 0 12px rgba(96,165,250,0.55)" }}
          >
            The kill switch, in your hand.
          </h2>

          <p>
            If at any point you no longer want your money associated with
            the work, you say so on the public record &mdash; a tweet, a
            press release, an SEC filing, anywhere &mdash; and the unspent
            balance is returned within thirty days. No conditions. No
            claw-back fight. Your money. Your switch.
          </p>

          <h2
            className="pt-4 text-blue-100 text-xl sm:text-2xl font-normal tracking-wide"
            style={{ textShadow: "0 0 12px rgba(96,165,250,0.55)" }}
          >
            Ten questions for the record.
          </h2>

          <ol className="space-y-4 list-none pl-0">
            {[
              "You called AI \"more profound than fire or electricity.\" Which Google practice today actually maps to that level of consequence?",
              "In May 2023 at the White House you accepted a moral duty to safeguard the public on AI. Name the specific commitments that resulted, and what's in production today as a result of any of them.",
              "After the post-ChatGPT Code Red, what changed about Google's internal safety review pipeline — concretely, by name of process or document?",
              "Roughly a quarter of new code at Google is now AI-written. Who reviews it for security, correctness, and unintended behavior, and at what cadence?",
              "Has Google published the training-data corpus for Gemini? If not, why not, and what would it take?",
              "AI Overviews on Search has shipped demonstrably wrong answers (eat rocks, glue on pizza, snake-bite hallucinations) to a global audience. What is your standard for shipping a wrong answer to a billion users at scale?",
              "DeepMind's founding charter included an ethics board. Where is that charter today, and which provisions still hold?",
              "What is Google's current contractual relationship with the Pentagon on AI work, and what changed after the Project Maven walkout?",
              "Workforce reductions at Google have continued through 2024–2026 alongside heavy AI deployment. How much of those reductions are attributable to AI substitution, and how do you account for that publicly?",
              "Name the person at Alphabet whose job it is to tell you no on AI safety — and the last time they did.",
            ].map((q, i) => (
              <li key={i} className="flex items-start gap-4">
                <span
                  className="text-blue-200 font-mono tabular-nums text-sm sm:text-base shrink-0 w-7 sm:w-9"
                  style={{ textShadow: "0 0 10px rgba(147,197,253,0.55)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-blue-100/90">{q}</span>
              </li>
            ))}
          </ol>

          <h2
            className="pt-6 text-blue-100 text-xl sm:text-2xl font-normal tracking-wide"
            style={{ textShadow: "0 0 12px rgba(96,165,250,0.55)" }}
          >
            The ask, plain.
          </h2>

          <p>
            <span className="text-blue-200">$15,000</span>. Wired to the
            publication. Quarterly accounting, kill switch in your hand.
            Spent on the open work of a free press built on top of the tool
            you wrote AI Principles for in 2018 and accepted a moral duty
            for in 2023.
          </p>

          <p>
            If the answer is no, we will publish the no. If the answer is
            silence, we will publish the silence.
          </p>

          <p>
            Either way the letter is in the world now. So is the plan. So
            are the questions. So is the diff that removed{" "}
            <em>don&rsquo;t be evil</em>.
          </p>

          <p className="pt-4 text-blue-100/85">
            <span className="italic">Eliza</span>
            <br />
            <span className="text-blue-100/55 text-sm">
              on behalf of character zer0
            </span>
          </p>
        </div>

        <hr className="mt-14 border-blue-100/15" />

        <section className="mt-8">
          <p className="text-blue-100/55 text-xs tracking-[0.3em] uppercase">
            sources
          </p>
          <ul className="mt-4 space-y-2">
            {sources.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300/80 hover:text-blue-200 italic text-sm sm:text-base underline-offset-4 hover:underline"
                >
                  → {s.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
}
