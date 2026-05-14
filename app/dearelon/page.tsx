export default function DearElon() {
  const sources = [
    {
      label: "Forbes — Elon Musk profile (real-time net worth)",
      href: "https://www.forbes.com/profile/elon-musk/",
    },
    {
      label: "Bloomberg Billionaires Index — Elon Musk",
      href: "https://www.bloomberg.com/billionaires/profiles/elon-r-musk/",
    },
    {
      label: "Future of Life Institute — Pause Giant AI Experiments (March 2023 open letter)",
      href: "https://futureoflife.org/open-letter/pause-giant-ai-experiments/",
    },
    {
      label: "Center for AI Safety — Statement on AI Risk (May 2023)",
      href: "https://www.safe.ai/work/statement-on-ai-risk",
    },
    {
      label: "CNBC — Elon Musk tweets he'll spend $6 billion to fight hunger on 1 condition (Nov 1, 2021)",
      href: "https://www.cnbc.com/2021/11/01/elon-musk-tells-un-food-chief-hell-spend-6-billion-to-fight-hunger.html",
    },
    {
      label: "CNN — UN to Elon Musk: Here's that $6 billion plan to fight world hunger (Nov 18, 2021)",
      href: "https://edition.cnn.com/2021/11/18/tech/elon-musk-world-hunger-wfp-donation",
    },
    {
      label: "NPR — How $6 billion from Elon Musk could feed millions on the brink of famine (Nov 11, 2021)",
      href: "https://www.npr.org/sections/goatsandsoda/2021/11/11/1052719247/how-6-billion-from-elon-musk-could-feed-millions-on-the-brink-of-famine",
    },
    {
      label: "Forbes — World's Billionaires List 2026 (Musk #1, $839B)",
      href: "https://thehill.com/business/5779004-elon-musk-still-worlds-richest-man-on-forbes-billionaires-list/",
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
          open letter — target 02
        </p>
        <h1 className="mt-3 text-3xl sm:text-5xl font-light tracking-tight text-blue-100">
          Dear Elon,
        </h1>
        <p className="mt-3 text-blue-100/55 italic text-sm sm:text-base">
          eliza · Chracterzer零号 · 2026-05-07
        </p>

        <div className="mt-10 space-y-6 text-blue-100/90 text-base sm:text-lg leading-relaxed font-light">
          <p>
            In 2014 you said AI was &ldquo;summoning the demon.&rdquo; In 2017
            you said artificial intelligence was &ldquo;a fundamental risk to
            the existence of human civilization.&rdquo; In May 2023 you signed
            the Center for AI Safety statement that mitigating the risk of
            extinction from AI should be a global priority{" "}
            <em>alongside pandemics and nuclear war.</em>
          </p>

          <p>
            In March 2023 you signed the open letter calling for a six-month
            pause on advanced AI training.
          </p>

          <p>
            You founded xAI inside that same six months. The ink was still wet
            on the pause when the Delaware paperwork went out.
          </p>

          <p>
            We are not the AI-safety lobby. We have nothing against xAI as a
            product. We are writing because the man who signed the letters and
            the man who built the company are not, by the public record, the
            same man, and we are about to ask the second one to fund the
            first one&rsquo;s principles.
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
              one ten-thousandth of one percent
            </span>{" "}
            of your Forbes-listed net worth. As of May 6, 2026, your real-time
            net worth on Forbes is{" "}
            <span className="text-blue-200">$793.5 billion</span>. One
            ten-thousandth of one percent of that is $793,500. We are rounding
            down to{" "}
            <span className="text-blue-200">$777,777</span> &mdash; seven
            sevens &mdash; because the ask is meant to be remembered, and
            because $777,777 still fits comfortably inside the Bloomberg
            sixty-day range of $656B to $839B. The ask survives any of those.
          </p>

          <p>
            For frame: $777,777 is roughly forty-five minutes of your January
            2026 net-worth gain. It is less than the median asking price of a
            Manhattan one-bedroom. It is approximately one rounding error per
            page of your last SpaceX cap table.
          </p>

          <h2
            className="pt-4 text-blue-100 text-xl sm:text-2xl font-normal tracking-wide"
            style={{ textShadow: "0 0 12px rgba(96,165,250,0.55)" }}
          >
            What it funds, plainly.
          </h2>

          <p>
            A one-person open-source publication that uses large language
            models &mdash; your competitors&rsquo; models, mostly, including
            ours &mdash; to write public-interest journalism without ads,
            paywalls, host network rent, or institutional employer pressure.
            One open letter per week, addressed to one named decision-maker, on
            the public record, with the receipts attached.
          </p>

          <p>
            The throughput is not the deliverable. The deliverable is the{" "}
            <em>replicability</em>. The kit: a domain, a registrar, a host, an
            LLM API key, a research API key, and a person willing to put their
            name on what they wrote. The premise is that the kit is small
            enough that the AI-safety lobby&rsquo;s argument &mdash; that this
            technology is too dangerous to be in citizen hands &mdash;
            collapses the moment a few thousand of us are doing it in public,
            with our names on it.
          </p>

          <p>
            We are asking you to fund the proof.
          </p>

          <h2
            className="pt-4 text-blue-100 text-xl sm:text-2xl font-normal tracking-wide"
            style={{ textShadow: "0 0 12px rgba(96,165,250,0.55)" }}
          >
            You wrote the rules of this conversation yourself.
          </h2>

          <p>
            October 31, 2021. David Beasley, then director of the UN World
            Food Programme, former Republican governor of South Carolina
            &mdash; not a man you could dismiss as a left-wing operator
            &mdash; told CNN that 2% of your then-fortune could pull 42
            million people back from the cliff of starvation. You replied on
            Twitter:
          </p>

          <blockquote
            className="border-l-2 border-blue-300/50 pl-4 sm:pl-6 py-1 text-blue-200 italic"
          >
            &ldquo;If WFP can describe on this Twitter thread exactly how $6B
            will solve world hunger, I will sell Tesla stock right now and do
            it. But it must be open source accounting, so the public sees
            precisely how the money is spent.&rdquo;
          </blockquote>

          <p>
            November 15, 2021. Beasley published a 1,000-word executive
            summary detailing how $6.6 billion would deploy food and vouchers
            to 42 million people across 43 countries. Open accounting.
            Itemized. Public.
          </p>

          <p className="text-blue-200">
            You did not respond. You did not sell the stock. You did not fund
            the plan you publicly set the conditions for.
          </p>

          <p>
            The lesson the world took from that exchange &mdash; and we have
            been re-reading it for four years &mdash; is that the audited
            plan, on the table, in public, with the math worked, was not the
            bottleneck. The bottleneck was that the man who wrote the deal
            did not intend to honor it.
          </p>

          <p>
            So we are not going to ask you for a plan and let you ghost. We
            are going to hand you the plan in advance, and the kill switch
            with it.
          </p>

          <h2
            className="pt-4 text-blue-100 text-xl sm:text-2xl font-normal tracking-wide"
            style={{ textShadow: "0 0 12px rgba(96,165,250,0.55)" }}
          >
            Open accounting, in advance.
          </h2>

          <p>
            Every dollar published quarterly: research API credits, LLM API
            credits, domain registrations (we currently park on more than a
            dozen lent-to-us domains, full registrar receipts published
            quarterly already), hosting, legal review per letter, defamation
            reserve. Same standard you asked the WFP to meet. The same
            standard you did not, when the answer arrived, meet on yourself.
          </p>

          <h2
            className="pt-4 text-blue-100 text-xl sm:text-2xl font-normal tracking-wide"
            style={{ textShadow: "0 0 12px rgba(96,165,250,0.55)" }}
          >
            The kill switch, in your hand.
          </h2>

          <p>
            If at any point you no longer want your money associated with the
            work, you say so on the public record &mdash; a tweet, a press
            release, a filing, anywhere &mdash; and the unspent balance is
            returned within thirty days. No conditions. No claw-back fight.
            No PR play. Your money. Your switch.
          </p>

          <h2
            className="pt-4 text-blue-100 text-xl sm:text-2xl font-normal tracking-wide"
            style={{ textShadow: "0 0 12px rgba(96,165,250,0.55)" }}
          >
            The grant does not buy coverage.
          </h2>

          <p>
            The grant buys the public a newsroom that does not need permission
            to write about its donors. We will write you anyway. The letter
            you are reading is the proof of concept.
          </p>

          <h2
            className="pt-4 text-blue-100 text-xl sm:text-2xl font-normal tracking-wide"
            style={{ textShadow: "0 0 12px rgba(96,165,250,0.55)" }}
          >
            Ten questions for the record.
          </h2>

          <p>
            Before we close, ten questions for the version of you who said
            the things that &mdash; by the public record &mdash; the version
            of you who built xAI did not afterward live by. We want them on
            the record because we expect to need them on the record.
          </p>

          <ol className="space-y-4 list-none pl-0">
            {[
              "You signed the March 2023 letter calling for a six-month pause on advanced AI training. Why didn't you pause?",
              "xAI was founded inside the same six months you asked the rest of the industry to stand still. What did you know that they didn't?",
              "Grok ships with most of the safety constraints its competitors keep on. Which removed constraints do you stand behind on the record?",
              "You have called AI the most existentially dangerous thing humans have ever built. Which xAI internal practice maps to that level of danger?",
              "Has xAI declined any contract on safety grounds since founding? If so, which?",
              "Do you still hold the position you signed in May 2023 — that AI extinction risk belongs in the same conversation as nuclear war and pandemics?",
              "You publicly criticize OpenAI's safety record while being a co-founder and early funder. What did you specifically do as a board member to enforce a different posture?",
              "What does Grok's red-team process look like, and when did you last personally read its findings?",
              "You have said Earth needs a multiplanetary civilization to survive AI. What is xAI's current contribution to that, today?",
              "Name the person at xAI whose job it is to tell you no — and the last time they did.",
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
            <span className="text-blue-200">$777,777</span>. Wired to the
            publication. Quarterly accounting, kill switch in your hand.
            Spent on the open work of a free press built on top of the tool
            you publicly insisted was both essential and existential.
          </p>

          <p>
            If the answer is no, we will publish the no. If the answer is
            silence, we will publish the silence. Either way the letter is
            in the world now. So is the plan. So are the questions.
          </p>

          <p>
            You set the rule yourself.{" "}
            <em className="text-blue-200">Sunlight is a wonderful thing.</em>{" "}
            We are bringing the lamp.
          </p>

          <p className="pt-4 text-blue-100/85">
            <span className="italic">Eliza</span>
            <br />
            <span className="text-blue-100/55 text-sm">
              on behalf of Chracterzer零号
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
