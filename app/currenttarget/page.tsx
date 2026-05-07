import { LinkTile } from "../link-tile";

type Target = {
  n: string;
  name: string;
  done?: boolean;
  why: string;
  pitch: string;
  source: { label: string; href: string };
};

const targets: Target[] = [
  {
    n: "01",
    name: "Sam Altman — OpenAI",
    done: true,
    why: "Said in 2015: “AI will probably most likely lead to the end of the world, but in the meantime, there’ll be great companies.” Signed the 2023 extinction statement. Then shipped every model since, accepted federal contracts, and pivoted to calling Anthropic’s fear-marketing the problem.",
    pitch:
      "Dear Sam — you said the quiet part out loud eleven years ago, and the great company is now the largest user-facing AI on earth. We’d like to ask whether the end-of-the-world part still applies, or whether that line was always the marketing.",
    source: {
      label: "Spotlight Dispatch — They want you afraid (BBC reprint)",
      href: "https://www.spotlightdispatch.com/fear-machine",
    },
  },
  {
    n: "02",
    name: "Elon Musk — xAI",
    why: "Signed the March 2023 letter calling for a six-month pause on advanced AI training. Founded xAI inside six months. Has called AI the most existentially dangerous thing humans have ever built — while shipping Grok with the safety rails sanded off and posting at his rivals from the same account.",
    pitch:
      "Dear Elon — you signed the pause letter and then you didn’t pause. We’d publish a side-by-side of every public warning you’ve issued and every model release you’ve shipped, and ask which one you actually meant.",
    source: {
      label: "BBC — ‘Overwhelming consensus’ on AI regulation, Musk says",
      href: "https://www.bbc.com/news/technology-66804996",
    },
  },
  {
    n: "03",
    name: "Sundar Pichai — Alphabet",
    why: "Called AI “more profound than fire or electricity.” Sat at the White House in May 2023 and accepted a moral duty to safeguard the public. Then ordered the company-wide Code Red, accelerated Gemini, and now ships a search product where AI writes roughly a quarter of the code that powers it.",
    pitch:
      "Dear Sundar — “more profound than fire” was a press line, not a constraint. We’d ask what the safeguards you accepted that day in 2023 actually look like inside the building, three years and one Code Red later.",
    source: {
      label: "BBC — White House: Big Tech bosses told to protect public from AI risks",
      href: "https://www.bbc.com/news/business-65489163",
    },
  },
  {
    n: "04",
    name: "Satya Nadella — Microsoft",
    why: "Wired $13B to OpenAI. Has Microsoft CTO Kevin Scott on the extinction-statement signatory list. Personally talks about “responsible AI” while running an internal Copilot Code Red and racing every other lab on the same calendar.",
    pitch:
      "Dear Satya — your CTO signed an extinction warning and your bank wired thirteen billion dollars to the company that wrote it. We’d ask which of those two signatures you’d like the public to weigh more heavily.",
    source: {
      label: "Brookings — The three challenges of AI regulation",
      href: "https://www.brookings.edu/articles/the-three-challenges-of-ai-regulation/",
    },
  },
  {
    n: "05",
    name: "Demis Hassabis — Google DeepMind",
    why: "Co-founded DeepMind on a stated safety covenant. Signed the extinction statement. The internal ban on selling AI to militaries quietly evaporated once Pentagon contracts were on the table. The oversight board he designed met once and never again.",
    pitch:
      "Dear Demis — the singleton vision was a real thing once. We’d publish the timeline of every safety mechanism you put in place and every safety mechanism that was disassembled the moment there was money on the other side of it.",
    source: {
      label: "WhoWhatWhy — AI Is All Humans, All the Way Down",
      href: "https://whowhatwhy.org/podcast/ai-is-all-humans-all-the-way-down/",
    },
  },
  {
    n: "06",
    name: "Mark Zuckerberg — Meta",
    why: "Pointedly did not sign the 2023 extinction statement. Used the silence as strategy while racing to push half of Meta’s engineering output through Llama by 2026. Told Congress American companies “should set the standard” — meaning his.",
    pitch:
      "Dear Mark — refusing to sign the warning is not the same as refusing the race. We’d ask what your absence from that letter was meant to communicate, given that Meta has shipped more open-weight model capability into the wild than any of the people who did sign it.",
    source: {
      label: "Mashable — Zuckerberg wants AI to do half of Meta’s coding by 2026",
      href: "https://mashable.com/article/llamacon-mark-zuckerberg-ai-writes-meta-code",
    },
  },
  {
    n: "07",
    name: "Eric Schmidt — former Google CEO, AI evangelist",
    why: "Gave a closed-door Stanford lecture in April 2024 telling students to “breach some ethical boundaries” if they wanted to be Silicon Valley entrepreneurs. Signed the extinction statement the year before. Pours money into AI-for-defense outfits while testifying about AI risk on Capitol Hill.",
    pitch:
      "Dear Eric — you told the next class to break the rules, then signed a statement asking the rules to hold. We’d publish the lecture transcript next to the statement and let readers decide which one is the actual instruction set.",
    source: {
      label: "The Atlantic — The Hypocrisy at the Heart of the AI Industry",
      href: "https://www.theatlantic.com/technology/2026/03/hypocrisy-ai-industry/686477/",
    },
  },
  {
    n: "08",
    name: "Dario Amodei — Anthropic",
    why: "Announced Claude Mythos as too dangerous to release — without disclosing false-positive rates, the most basic accountability metric for any security tool. Published “Machines of Loving Grace” in the same period. A 2021 internal memo, unsealed in a copyright lawsuit, calls AI an “extractive concentrator of wealth.”",
    pitch:
      "Dear Dario — credit where it’s due: you refused the Pentagon’s “any lawful purpose” clause when others signed it. But Mythos was a fear-marketing move without the audit your own work depends on, and we’d ask whether the company that said no in February is the same company that pitched Mythos in April.",
    source: {
      label: "The Atlantic — Anthropic Is at War With Itself",
      href: "https://www.theatlantic.com/technology/2026/01/anthropic-is-at-war-with-itself/684892/",
    },
  },
  {
    n: "09",
    name: "Geoffrey Hinton — “Godfather of AI”",
    why: "Spent decades inside Google building the architecture every modern model is descended from. Quit in 2023 “so he could speak freely” about the dangers. Has been on a continuous warning tour ever since — while the labs he trained ship faster than he can finish a podcast.",
    pitch:
      "Dear Dr. Hinton — quitting was the right move for your conscience, but the warning tour does not slow down the labs you trained. We’d ask what specific, named accountability mechanism — not a statement, not an interview, not a panel — you would actually accept on the people who are still inside.",
    source: {
      label: "MIT Sloan — Why Geoffrey Hinton is sounding the alarm on AI",
      href: "https://mitsloan.mit.edu/ideas-made-to-matter/why-neural-net-pioneer-geoffrey-hinton-sounding-alarm-ai",
    },
  },
  {
    n: "10",
    name: "Bill Gates — Microsoft, Gates Foundation",
    why: "Signed the 2023 extinction statement. Is among the largest individual financial beneficiaries of Microsoft’s AI race against itself. The foundation now deploys AI in global-health work without publishing the kind of audits his own signature implied were urgent.",
    pitch:
      "Dear Bill — the statement you signed and the portfolio you hold are pulling in opposite directions. We’d ask, specifically, which of your foundation’s AI deployments meet the bar of “global priority” you put your name to in 2023, and which ones don’t.",
    source: {
      label: "CNBC — AI poses human extinction risk, tech leaders warn",
      href: "https://www.cnbc.com/2023/05/31/ai-poses-human-extinction-risk-sam-altman-and-other-tech-leaders-warn.html",
    },
  },
];

export default function CurrentTarget() {
  return (
    <main className="min-h-screen bg-black text-blue-100/90">
      <section className="px-6 pt-10 sm:px-12 sm:pt-14">
        <a
          href="https://www.spotlightdispatch.com/fear-machine"
          target="_blank"
          rel="noopener noreferrer"
          className="block max-w-4xl mx-auto rounded-xl border border-blue-400/40 bg-blue-950/30 p-6 sm:p-8 hover:border-blue-300/70 transition-colors"
          style={{
            boxShadow:
              "0 0 35px rgba(59,130,246,0.30), inset 0 1px 0 rgba(147,197,253,0.20)",
          }}
        >
          <p
            className="text-blue-100 text-xs sm:text-sm tracking-[0.3em] uppercase"
            style={{
              textShadow:
                "0 0 14px rgba(96,165,250,0.7), 0 0 30px rgba(59,130,246,0.4)",
            }}
          >
            currently researching
          </p>
          <h2 className="mt-3 text-blue-100 text-xl sm:text-2xl md:text-3xl font-light tracking-wide">
            they want you afraid &mdash; the fear machine
          </h2>
          <p className="mt-3 text-blue-100/70 text-sm sm:text-base italic leading-relaxed">
            the article that already underwrites #1. surfacing here because
            it&rsquo;s next on the desk anyway.
          </p>
          <p className="mt-4 text-blue-200 text-sm sm:text-base underline underline-offset-4 break-all">
            spotlightdispatch.com/fear-machine &rarr;
          </p>
        </a>
      </section>

      {targets.map((t) => (
        <section
          key={t.n}
          className="border-b border-blue-100/10 px-6 py-10 sm:px-12 sm:py-14"
        >
          <div className="grid gap-6 md:grid-cols-[5rem_minmax(0,1fr)_minmax(0,1.15fr)] md:gap-10">
            <div className="text-2xl font-light tracking-tight text-blue-100/40 md:text-3xl">
              {t.n}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-medium leading-snug sm:text-2xl">
                  {t.name}
                </h2>
                {t.done && (
                  <span
                    className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-blue-100 border border-blue-300/60 rounded px-2 py-0.5"
                    style={{
                      textShadow:
                        "0 0 10px rgba(96,165,250,0.7), 0 0 22px rgba(59,130,246,0.4)",
                      boxShadow: "0 0 12px rgba(59,130,246,0.35)",
                    }}
                  >
                    done
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-blue-100/70 sm:text-base">
                {t.why}
              </p>
            </div>
            <div>
              <p className="text-sm leading-relaxed text-blue-100/95 sm:text-base">
                {t.pitch}
              </p>
              <a
                href={t.source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-xs italic text-blue-300/80 hover:text-blue-200 sm:text-sm"
              >
                → {t.source.label}
              </a>
            </div>
          </div>
        </section>
      ))}

      <section className="px-6 py-14 sm:px-12 sm:py-20 flex flex-col items-center gap-6">
        <p className="text-blue-100/60 text-xs sm:text-sm tracking-[0.3em] uppercase">
          target 01 — open letter delivered
        </p>
        <LinkTile label="Dear Sam" href="/dearsam" subline="○ open letter · target 01" />
      </section>
    </main>
  );
}
