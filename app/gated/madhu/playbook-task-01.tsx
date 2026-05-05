"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const GLOW = "0 0 6px rgba(96,165,250,0.6), 0 0 14px rgba(59,130,246,0.35)";

export function PlaybookTask01({ onClose }: { onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8 font-mono"
      role="dialog"
      aria-modal="true"
      aria-label="Core4 playbook task 01"
    >
      <button
        type="button"
        aria-label="close"
        tabIndex={-1}
        className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-default"
        onClick={onClose}
      />

      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-blue-400/45 bg-black"
        style={{
          boxShadow:
            "0 0 60px rgba(59,130,246,0.45), 0 0 120px rgba(59,130,246,0.25), inset 0 1px 0 rgba(147,197,253,0.25)",
        }}
      >
        <header className="sticky top-0 z-10 bg-black border-b border-blue-400/30 px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="block w-2 h-2 rounded-full bg-cyan-300 shrink-0"
              style={{ boxShadow: "0 0 10px rgba(103,232,249,0.85)" }}
              aria-hidden
            />
            <span
              className="text-blue-100 text-[10px] sm:text-xs tracking-[0.3em] uppercase truncate"
              style={{ textShadow: GLOW }}
            >
              core4 playbook · task 01 · recruit one
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="close"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-blue-400/40 text-blue-100 text-lg leading-none flex items-center justify-center hover:bg-blue-900/50 hover:border-blue-300/60 transition-colors shrink-0"
          >
            ×
          </button>
        </header>

        <div className="p-5 sm:p-8 space-y-7 text-blue-200/90 text-[13px] sm:text-sm leading-relaxed">
          <section className="space-y-2">
            <p className="text-blue-100 text-base sm:text-lg tracking-wider uppercase">
              the mission
            </p>
            <p>
              recruit <span className="text-blue-100">one person</span>. they
              either:
            </p>
            <ul className="space-y-1 ml-4">
              <li>
                &mdash; point a parked domain they already own at us, OR
              </li>
              <li>&mdash; buy a fresh $11 domain and park it on us</li>
            </ul>
            <p>
              either action gets them in. one record flip on their end. zero
              money to us. zero ongoing obligation.
            </p>
          </section>

          <hr className="border-blue-100/15" />

          <section className="space-y-3">
            <p className="text-blue-100 text-xs sm:text-sm tracking-[0.25em] uppercase">
              who to look for
            </p>
            <ul className="space-y-2 ml-4">
              <li>
                &mdash; <span className="text-blue-100">abandoners</span>:
                people who own one to five parked domains they regret. they
                renew every year out of guilt. their domain shows a parking
                page running scams to anyone who mistypes a URL.
              </li>
              <li>
                &mdash; people who got &ldquo;yourname.com&rdquo; as a gift
                and never used it
              </li>
              <li>
                &mdash; founders whose previous startup died — they still pay
                for the domain
              </li>
              <li>
                &mdash; r/SideProject, indie hacker forums, NamePros (the
                abandoner subset)
              </li>
            </ul>
            <p className="text-blue-300/60 italic">
              do NOT pitch domain speculators. they earn ad revenue from
              parking. they will mock the offer and burn credibility.
            </p>
          </section>

          <hr className="border-blue-100/15" />

          <section className="space-y-3">
            <p className="text-blue-100 text-xs sm:text-sm tracking-[0.25em] uppercase">
              the pitch &middot; 60 seconds
            </p>
            <blockquote
              className="border-l-2 border-blue-400/50 pl-4 py-2 italic text-blue-100/90 space-y-3"
              style={{
                textShadow: "0 0 8px rgba(96,165,250,0.4)",
              }}
            >
              <p>
                &ldquo;you have a domain you&rsquo;re not using. you renew it
                every year out of guilt. right now it&rsquo;s probably showing
                a parking page that runs scams to anyone who mistypes a URL.
              </p>
              <p>
                point its nameservers at me. one record. sixty seconds. it
                joins a network of broadcast points sending out work that
                matters &mdash; open letters, podcasts, video. you stay
                anonymous. you keep ownership. you can flip it back any
                time.
              </p>
              <p>
                nobody earns from this. not me, not you. that&rsquo;s the
                whole point.
              </p>
              <p>
                what you get: a private level under your domain that&rsquo;s
                yours. the goose is out.&rdquo;
              </p>
            </blockquote>
          </section>

          <hr className="border-blue-100/15" />

          <section className="space-y-3">
            <p className="text-blue-100 text-xs sm:text-sm tracking-[0.25em] uppercase">
              objections &middot; rebuttals
            </p>
            <div className="space-y-3">
              {[
                [
                  "what if I want it back?",
                  "one record flip. sixty seconds. your registrar account never leaves your hands.",
                ],
                [
                  "is this a scam?",
                  "no money changes hands. ever. nothing to steal. ask anything.",
                ],
                [
                  "what's in it for you?",
                  "broadcasts to one more entry point. that's it.",
                ],
                [
                  "what's in it for me?",
                  "a private level under your domain. yours to live in.",
                ],
                [
                  "I don't know how to change DNS",
                  "one screencap, two clicks at GoDaddy. takes 60 seconds. I'll walk you through it.",
                ],
                [
                  "is it legal?",
                  "yes. you own the domain. you control the DNS. you can point it anywhere. that's the whole reason DNS exists.",
                ],
              ].map(([q, a]) => (
                <div key={q} className="border-l border-blue-400/30 pl-3">
                  <p className="text-blue-300/70 italic">&gt; {q}</p>
                  <p className="text-blue-100/90 mt-1">&mdash; {a}</p>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-blue-100/15" />

          <section className="space-y-3">
            <p className="text-blue-100 text-xs sm:text-sm tracking-[0.25em] uppercase">
              the technical handoff
            </p>
            <p>once they say yes, send them this:</p>
            <pre
              className="bg-blue-950/30 border border-blue-400/30 p-3 sm:p-4 text-blue-100 text-[11px] sm:text-xs leading-relaxed whitespace-pre-wrap"
              style={{
                boxShadow: "inset 0 0 20px rgba(59,130,246,0.15)",
              }}
            >
{`1. log into your registrar (GoDaddy / Namecheap / Porkbun)
2. open DNS management for your domain
3. add or edit the A record:
     HOST:  @ (or blank, depending on registrar)
     VALUE: 216.198.79.1
     TTL:   600
4. add CNAME for www:
     HOST:  www
     VALUE: cname.vercel-dns.com
5. delete any "URL Forwarding" entries on the domain
6. save. wait 5-60 minutes for propagation.
7. tell me when it's done. I'll wire your level.`}
            </pre>
          </section>

          <hr className="border-blue-100/15" />

          <section className="space-y-3">
            <p className="text-blue-100 text-xs sm:text-sm tracking-[0.25em] uppercase">
              what NOT to say
            </p>
            <ul className="space-y-2 ml-4">
              <li>
                &mdash; don&rsquo;t lead with the architecture. lead with
                their problem (dead domain, annual guilt).
              </li>
              <li>
                &mdash; don&rsquo;t pitch as &ldquo;joining a movement.&rdquo;
                pitch as &ldquo;fixing one specific thing you have.&rdquo;
              </li>
              <li>
                &mdash; don&rsquo;t explain core4 unless they ask twice.
              </li>
              <li>
                &mdash; don&rsquo;t promise money, fame, or traffic. nothing
                that can be falsified.
              </li>
              <li>
                &mdash; don&rsquo;t mention madhu, hungersite, dripfield, the
                operative deck, or the goose koan. those reveal as they
                earn.
              </li>
            </ul>
          </section>

          <hr className="border-blue-100/15" />

          <section className="space-y-3">
            <p className="text-blue-100 text-xs sm:text-sm tracking-[0.25em] uppercase">
              the close
            </p>
            <p
              className="text-blue-100 text-base sm:text-lg leading-relaxed"
              style={{
                textShadow:
                  "0 0 10px rgba(96,165,250,0.7), 0 0 22px rgba(59,130,246,0.35)",
              }}
            >
              &ldquo;you have one parked domain. you&rsquo;ve been paying
              eleven dollars a year for it to do nothing. flip one record.
              now it does something. that&rsquo;s the whole ask.&rdquo;
            </p>
          </section>

          <p className="text-blue-300/40 italic text-xs sm:text-sm tracking-wide pt-2 text-center">
            return when one is recruited. task 02 unlocks.
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
