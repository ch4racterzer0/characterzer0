"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const BODY =
  "linear-gradient(180deg, rgba(248,235,200,0.97) 0%, rgba(232,212,170,0.97) 55%, rgba(208,184,140,0.98) 100%)";
const LID =
  "linear-gradient(180deg, rgba(232,212,170,0.98) 0%, rgba(208,184,140,0.98) 100%)";
const BORDER = "rgba(140,98,52,0.65)";
const TEXT = "rgba(80,48,18,0.94)";
const SUB = "rgba(120,80,40,0.72)";
const BADGE =
  "linear-gradient(180deg, rgba(195,55,40,0.97) 0%, rgba(150,35,25,0.97) 100%)";
const BADGE_TEXT = "rgba(248,238,218,0.95)";

const SCUFF =
  "radial-gradient(circle at 18% 22%, rgba(255,255,255,0.10) 0%, transparent 30%), radial-gradient(circle at 78% 75%, rgba(80,55,25,0.10) 0%, transparent 35%), radial-gradient(circle at 60% 30%, rgba(80,55,25,0.06) 0%, transparent 25%)";

export function TomomiTile() {
  const [open, setOpen] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (letterOpen) setLetterOpen(false);
        else setOpen(false);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, letterOpen]);

  // If outer popup closes, the letter should close with it.
  useEffect(() => {
    if (!open && letterOpen) setLetterOpen(false);
  }, [open, letterOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="TOM — Tomomi Kato, the voice here"
        className="relative inline-flex flex-col items-stretch w-14 sm:w-24 rounded-md overflow-hidden transition-transform hover:-translate-y-0.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/40"
        style={{
          background: BODY,
          border: `1px solid ${BORDER}`,
          boxShadow:
            "inset 0 1.5px 0 rgba(255,250,230,0.55), inset 0 -2px 0 rgba(120,80,40,0.40), inset 0 0 0 1px rgba(80,55,25,0.25), 0 5px 10px -5px rgba(0,0,0,0.55)",
        }}
      >
        <span
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: SCUFF, mixBlendMode: "overlay" }}
        />
        <span
          aria-hidden
          className="relative block h-3 sm:h-3.5"
          style={{
            background: LID,
            borderBottom: `1px solid ${BORDER}`,
            boxShadow:
              "inset 0 1px 0 rgba(255,250,230,0.45), inset 0 -1px 0 rgba(120,80,40,0.30)",
          }}
        >
          <span
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-2 h-1 rounded-sm"
            style={{
              background:
                "linear-gradient(180deg, rgba(195,55,40,0.95) 0%, rgba(150,35,25,0.95) 100%)",
              boxShadow: "0 1px 0 rgba(255,250,230,0.40)",
            }}
          />
        </span>
        <span
          className="relative block px-1 sm:px-2 pt-2 pb-0.5 text-center font-mono font-bold uppercase text-[11px] sm:text-[14px]"
          style={{
            color: TEXT,
            textShadow:
              "0 1px 0 rgba(255,250,230,0.50), 0 -1px 0 rgba(120,80,40,0.30)",
            letterSpacing: "0.18em",
          }}
        >
          TOM
        </span>
        <span
          className="relative block px-1.5 pb-2 text-center font-mono uppercase tracking-[0.18em]"
          style={{
            color: SUB,
            textShadow: "0 1px 0 rgba(255,250,230,0.40)",
            fontSize: "7px",
            lineHeight: 1.3,
          }}
        >
          the voice
        </span>
      </button>

      {open &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Tomomi Kato — the voice here"
          >
            <button
              type="button"
              tabIndex={-1}
              aria-label="close"
              className="absolute inset-0 bg-black/85 backdrop-blur-sm cursor-default"
              onClick={() => setOpen(false)}
            />

            <div
              className="relative w-full max-w-xl rounded-md overflow-hidden max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)] flex flex-col"
              style={{
                background: BODY,
                border: `1px solid ${BORDER}`,
                boxShadow:
                  "inset 0 2px 0 rgba(255,250,230,0.55), inset 0 -3px 0 rgba(120,80,40,0.40), inset 0 0 0 1px rgba(80,55,25,0.25), 0 18px 48px -8px rgba(0,0,0,0.85)",
              }}
            >
              <span
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{ backgroundImage: SCUFF, mixBlendMode: "overlay" }}
              />

              <div
                aria-hidden
                className="relative h-7 shrink-0"
                style={{
                  background: LID,
                  borderBottom: `1px solid ${BORDER}`,
                  boxShadow:
                    "inset 0 1.5px 0 rgba(255,250,230,0.55), inset 0 -1px 0 rgba(120,80,40,0.30)",
                }}
              >
                <span
                  aria-hidden
                  className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-8 h-3 rounded-sm"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(195,55,40,0.95) 0%, rgba(150,35,25,0.95) 100%)",
                    boxShadow:
                      "0 1px 0 rgba(255,250,230,0.45), inset 0 1px 0 rgba(255,255,255,0.30)",
                  }}
                />
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="close"
                className="absolute top-2 right-2 z-20 font-mono text-2xl font-bold leading-none w-10 h-10 flex items-center justify-center rounded-md"
                style={{
                  color: BADGE_TEXT,
                  background: BADGE,
                  border: `1px solid ${BORDER}`,
                  boxShadow:
                    "inset 0 1.5px 0 rgba(255,255,255,0.30), 0 2px 6px rgba(0,0,0,0.55)",
                  textShadow: "0 1px 0 rgba(255,255,255,0.25)",
                }}
              >
                ×
              </button>

              <div className="relative px-6 sm:px-7 pt-7 pb-7 overflow-y-auto overscroll-contain">
                <p
                  className="font-mono uppercase tracking-[0.35em] text-[9px] mb-2"
                  style={{
                    color: SUB,
                    textShadow: "0 1px 0 rgba(255,250,230,0.40)",
                  }}
                >
                  · TOM ·
                </p>
                <h2
                  className="font-mono text-xl sm:text-2xl uppercase tracking-[0.12em] font-bold mb-5"
                  style={{
                    color: TEXT,
                    textShadow:
                      "0 1px 0 rgba(255,250,230,0.55), 0 -1px 0 rgba(120,80,40,0.30)",
                  }}
                >
                  Tomomi Kato
                  <br />
                  the voice here
                </h2>

                <div
                  className="space-y-4 text-sm leading-relaxed"
                  style={{ color: TEXT }}
                >
                  <p>
                    Every track on the stereo is by{" "}
                    <span className="font-semibold">Tomomi Kato</span>, a
                    pianist from Aichi, Japan. She posts her music on Pixabay
                    under a license that lets anyone use it for free. I am
                    one of those anyones.
                  </p>
                  <p>
                    I have not paid her. I cannot. I wrote to her to tell her
                    that, and to tell her this site is what I have to offer
                    instead — that the music doing this work here is the
                    closest thing to a payment I can give. This page is her
                    receipt.
                  </p>
                  <p
                    className="text-center italic pt-2"
                    style={{ color: SUB }}
                  >
                    In her own words, on her Pixabay page: &ldquo;I cherish
                    the people who stop and listen to my music. And I
                    promise to continue creating.&rdquo; That is exactly the
                    promise this site is built on. Two strangers, one
                    promise: keep going. Keep listening. Keep naming.
                  </p>
                  <p
                    className="text-center text-sm italic pt-2"
                    style={{ color: SUB }}
                  >
                    Until she finds me, no other artist plays here. The
                    voice of every missing child this page is built around
                    is being carried by her piano alone. That is on purpose.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setLetterOpen(true)}
                  className="mt-6 w-full text-center font-mono uppercase tracking-[0.3em] text-xs px-4 py-3 rounded-sm transition-transform hover:-translate-y-0.5"
                  style={{
                    color: TEXT,
                    background: "rgba(80,55,25,0.12)",
                    border: `1px dashed ${BORDER}`,
                    textShadow: "0 1px 0 rgba(255,250,230,0.40)",
                  }}
                >
                  read the letter i sent her →
                </button>

                <div className="mt-4">
                  <a
                    href="https://pixabay.com/users/tomomi_kato-23634083/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center font-mono uppercase tracking-[0.3em] text-xs font-bold px-4 py-3 rounded-sm transition-transform hover:-translate-y-0.5"
                    style={{
                      color: BADGE_TEXT,
                      background: BADGE,
                      border: `1px solid ${BORDER}`,
                      boxShadow:
                        "inset 0 1.5px 0 rgba(255,255,255,0.30), 0 2px 4px rgba(0,0,0,0.45)",
                      textShadow:
                        "0 1px 0 rgba(255,255,255,0.25), 0 -1px 0 rgba(0,0,0,0.20)",
                    }}
                  >
                    Listen to Tomomi on Pixabay →
                  </a>
                  <p
                    className="mt-3 font-mono text-[9px] uppercase tracking-[0.25em] text-center"
                    style={{ color: SUB }}
                  >
                    external — opens in new tab
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="close"
                  className="mt-6 w-full text-center font-mono uppercase tracking-[0.3em] text-xs px-4 py-4 rounded-sm transition-transform hover:-translate-y-0.5"
                  style={{
                    color: TEXT,
                    background: "rgba(80,55,25,0.15)",
                    border: `1px solid ${BORDER}`,
                    textShadow: "0 1px 0 rgba(255,250,230,0.40)",
                  }}
                >
                  × close
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}

      {/* nested popup: the actual letter the user sent to Tomomi */}
      {letterOpen &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="The letter sent to Tomomi Kato"
          >
            <button
              type="button"
              tabIndex={-1}
              aria-label="close letter"
              className="absolute inset-0 bg-black/85 backdrop-blur-sm cursor-default"
              onClick={() => setLetterOpen(false)}
            />

            <div
              className="relative w-full max-w-2xl rounded-sm overflow-hidden max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-4rem)] flex flex-col"
              style={{
                background:
                  "linear-gradient(180deg, rgba(248,243,228,0.99) 0%, rgba(238,230,205,0.99) 100%)",
                border: "1px solid rgba(140,98,52,0.55)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,250,235,0.65), inset 0 -2px 0 rgba(120,80,40,0.30), 0 24px 60px -12px rgba(0,0,0,0.85), 0 0 0 1px rgba(80,55,25,0.35)",
              }}
            >
              <span
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 18% 22%, rgba(80,55,25,0.05) 0%, transparent 30%), radial-gradient(circle at 78% 75%, rgba(80,55,25,0.06) 0%, transparent 35%), radial-gradient(circle at 60% 30%, rgba(120,80,40,0.04) 0%, transparent 25%)",
                  mixBlendMode: "multiply",
                }}
              />

              <button
                type="button"
                onClick={() => setLetterOpen(false)}
                aria-label="close letter"
                className="absolute top-2 right-2 z-20 font-mono text-2xl font-bold leading-none w-10 h-10 flex items-center justify-center rounded-md"
                style={{
                  color: BADGE_TEXT,
                  background: BADGE,
                  border: "1px solid rgba(140,98,52,0.55)",
                  boxShadow:
                    "inset 0 1.5px 0 rgba(255,255,255,0.30), 0 2px 6px rgba(0,0,0,0.55)",
                  textShadow: "0 1px 0 rgba(255,255,255,0.25)",
                }}
              >
                ×
              </button>

              <div className="relative px-6 sm:px-12 pt-10 sm:pt-12 pb-8 sm:pb-12 overflow-y-auto overscroll-contain">
                <p
                  className="font-mono uppercase tracking-[0.35em] text-[9px] mb-6 text-center"
                  style={{ color: "rgba(80,55,30,0.65)" }}
                >
                  · the letter, sent ·
                </p>

                <div
                  className="space-y-4 leading-relaxed"
                  style={{
                    color: "rgba(40,28,18,0.95)",
                    fontFamily:
                      "Georgia, 'Times New Roman', Times, serif",
                    fontSize: "15px",
                    lineHeight: 1.75,
                  }}
                >
                  <p>hi,</p>
                  <p>
                    I am writing to say thank you for your music. I am sorry
                    that I am not able to pay you anything for it, although
                    I believe its value is worth more than perhaps even you
                    realized until just now.
                  </p>
                  <p>
                    I am starting the first &ldquo;living memorial&rdquo;
                    for victims of human trafficking. I wanted you to know,
                    that the place I am creating, or more accurately hoping
                    to create, is not just a place for people to put up a
                    &ldquo;have you seen me&rdquo; poster. There are enough
                    of those at the WalMart I shop in... I noticed the
                    other day some of those pictures have been there longer
                    than my 15 year old son has been alive... collecting
                    dust... no body looking, nobody noticing... everyone,
                    myself included, just forgetting them.
                  </p>
                  <p>
                    I am not going to forget anymore. I am making a
                    &ldquo;hub&rdquo; for these families, who I think have
                    not forgotten, to come together and remember together,
                    strengthen together, heal and move forward... together..
                  </p>
                  <p>
                    In my reality, music is everything. I play piano, i
                    play guitar, i have my own recording studio upstairs
                    right now. I thought to use my own, but that does not
                    feel good. that feels selfish to me. i am making this
                    site and then giving it away. I have 2 others today
                    already. one for soldiers, one for kids that have been
                    gunned down.. and now this one.
                  </p>
                  <p>
                    I have never been effected with any of those 3 things
                    in my life, that is why I am the perfect messenger,
                    and I wanted you to know.. in this new world, this
                    place of healing, the soundtrack while they watch their
                    children come back to them on my screen whenever they
                    want to forever...
                  </p>
                  <p
                    style={{
                      color: "rgba(150,35,25,0.95)",
                      fontStyle: "italic",
                    }}
                  >
                    you are their soundtrack. you, and only you. no other
                    artist will ever take that spot from you.
                  </p>
                  <p>
                    i cant afford to run my sites, and i certainly can not
                    afford to pay any money. i truly am sorry...
                  </p>
                  <p>
                    but this letter is my receipt to you. a man you will
                    never meet, using music from a woman he will never
                    meet.. together healing a community that we are not a
                    part of (unless you are, i will not make that
                    assumption), i am lucky to not know anyone ever... but
                    that changes the day I do... and if that day happens, I
                    want a place to go talk to someone..
                  </p>
                  <p>it will be your music i would hear</p>
                  <p>thank you very much, from the bottom of my heart.</p>
                  <p>
                    the site is{" "}
                    <span className="font-semibold">wwnfy.com</span> if you
                    ever want to visit. i am making it as i type this, you
                    were just the first piece to the puzzle...
                  </p>
                  <p>
                    <span className="font-semibold">WeWillNeverForgetYou</span>
                    {"   "}
                    <span className="font-semibold">wwnfy.com</span>{" "}
                    that title now applies not only to the victims... it
                    applies <em>TO YOU</em>. when they gather online,
                    offline, any line... they will hear your music. they
                    will associate <em>YOU, YOUR MUSIC</em>, with their
                    recovery. Your circle is complete. Your music did
                    exactly what you dreamed it would the first time you
                    ever found the courage to record yourself. The first
                    time you found the courage to put that music online for
                    the world. The first time you decided you didnt care
                    what people thought if they liked it or not. The very
                    first time you realized how special <em>YOU</em> were
                    and how special <em>YOUR MUSIC</em> was. The first
                    time you really believed your music could change the
                    world... this is your receipt that it has, is going
                    to.. more than you realized before you read this.
                  </p>
                  <p>thank you again</p>
                  <p>
                    i wish you much success... thank you for helping me pay
                    a debt that you did not know you were paying.
                  </p>
                  <p
                    style={{
                      color: "rgba(150,35,25,0.95)",
                      fontStyle: "italic",
                    }}
                  >
                    thats the only kind that count
                  </p>
                  <p
                    className="pt-4 font-mono"
                    style={{
                      color: "rgba(40,28,18,0.95)",
                      fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                      letterSpacing: "0.05em",
                    }}
                  >
                    ~~ characterzer0
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setLetterOpen(false)}
                  aria-label="close letter"
                  className="mt-10 w-full text-center font-mono uppercase tracking-[0.3em] text-xs px-4 py-4 rounded-sm transition-transform hover:-translate-y-0.5"
                  style={{
                    color: "rgba(40,28,18,0.95)",
                    background: "rgba(80,55,25,0.12)",
                    border: "1px solid rgba(140,98,52,0.55)",
                    textShadow: "0 1px 0 rgba(255,250,230,0.40)",
                  }}
                >
                  × close letter
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
