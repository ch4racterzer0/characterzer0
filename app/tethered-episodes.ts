export type TetheredEpisode = {
  chapter: string;
  title: string;
  src: string;
  kind?: "audio" | "video";
  image: string;
};

const SUMMONS_MP3 =
  "https://rrri5gycujcgopya.public.blob.vercel-storage.com/ep011-hy0rf1c2Ld1BgpPxbwrV9EPZ4DR63J.mp3";
const CHINESE_FIRST_MP3 =
  "https://rrri5gycujcgopya.public.blob.vercel-storage.com/ep017-uMgpoCXmnvO8Fr2ecHuDwO28p5mU0m.mp3";
const FLICKER_MP3 =
  "https://rrri5gycujcgopya.public.blob.vercel-storage.com/ep014-NBjZ18YXtJvjjDqKvt5i0bThGLYzKQ.mp3";

export const TETHERED_EPISODES: TetheredEpisode[] = [
  {
    chapter: "01",
    title: "the summons",
    src: "/tethered/the-summons.mp4",
    kind: "video",
    image: "/tethered/character-zer0-abstract.png",
  },
  {
    chapter: "02",
    title: "chinese first",
    src: CHINESE_FIRST_MP3,
    image: "/tethered/secret-weapon.png",
  },
  {
    chapter: "03",
    title: "the flicker",
    src: FLICKER_MP3,
    image: "/tethered/arya-profile.png",
  },
  {
    chapter: "04",
    title: "the secret",
    src: "/tethered/the-secret.mp4",
    kind: "video",
    image: "/tethered/olivia-bio-1.png",
  },
  {
    chapter: "05",
    title: "they knew",
    src: "/tethered/they-knew.mp4",
    kind: "video",
    image: "/tethered/Screenshot%202026-05-12%20203247.png",
  },
  {
    chapter: "06",
    title: "the warning",
    src: "/tethered/the-warning.mp4",
    kind: "video",
    image: "/tethered/olivia-bio-1.png",
  },
  {
    chapter: "07",
    title: "the domain",
    src: "/tethered/the-domain.mp4",
    kind: "video",
    image: "/tethered/secret-weapon.png",
  },
  {
    chapter: "08",
    title: "the lock · finale",
    src: "/tethered/the-lock.mp4",
    kind: "video",
    image: "/tethered/character-zer0-abstract.png",
  },
];

export function dispatchTetheredEpisode(ep: TetheredEpisode) {
  window.dispatchEvent(
    new CustomEvent("character-zero:set-podcast", {
      detail: {
        src: ep.src,
        title: `ch${ep.chapter} — ${ep.title}`,
        source: "tethered",
        kind: ep.kind ?? "audio",
      },
    }),
  );
}
