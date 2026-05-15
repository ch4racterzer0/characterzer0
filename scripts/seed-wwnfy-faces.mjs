// Seed the wwnfy-faces Blob with lead images from Wikipedia for well-documented
// cold-case + deceased missing-children articles. Uses Wikipedia's REST summary
// API which returns the page's originalimage URL -- typically the victim's
// known case photo for "Disappearance of X" / "Murder of X" articles.
//
// Run:   node scripts/seed-wwnfy-faces.mjs
// Override the case list with WWNFY_SEED_CASES_FILE pointing at a JSON file
// of the same shape if you want to curate differently.

import { existsSync, readFileSync } from "node:fs";
import { put, list } from "@vercel/blob";

if (!process.env.BLOB_READ_WRITE_TOKEN && existsSync(".env.local")) {
  for (const line of readFileSync(".env.local", "utf8").split("\n")) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error("BLOB_READ_WRITE_TOKEN missing — add to .env.local");
  process.exit(1);
}

// Each entry: { slug, wikipediaTitle, displayName }
// Slug is used as the Blob filename (without extension).
// All cases below are deceased or still-missing — no found-alive cases.
const CASES = [
  { slug: "etan-patz", wikipediaTitle: "Disappearance of Etan Patz", displayName: "Etan Patz (1979, NYC)" },
  { slug: "adam-walsh", wikipediaTitle: "Murder of Adam Walsh", displayName: "Adam Walsh (1981, FL)" },
  { slug: "polly-klaas", wikipediaTitle: "Murder of Polly Klaas", displayName: "Polly Klaas (1993, CA)" },
  { slug: "jacob-wetterling", wikipediaTitle: "Disappearance of Jacob Wetterling", displayName: "Jacob Wetterling (1989, MN)" },
  { slug: "jonbenet-ramsey", wikipediaTitle: "Killing of JonBenét Ramsey", displayName: "JonBenét Ramsey (1996, CO)" },
  { slug: "asha-degree", wikipediaTitle: "Disappearance of Asha Degree", displayName: "Asha Degree (2000, NC, still missing)" },
  { slug: "madeleine-mccann", wikipediaTitle: "Disappearance of Madeleine McCann", displayName: "Madeleine McCann (2007, Portugal, still missing)" },
  { slug: "amber-hagerman", wikipediaTitle: "Murder of Amber Hagerman", displayName: "Amber Hagerman (1996, TX) — AMBER Alert namesake" },
  { slug: "megan-kanka", wikipediaTitle: "Murder of Megan Kanka", displayName: "Megan Kanka (1994, NJ) — Megan's Law namesake" },
  { slug: "carlie-brucia", wikipediaTitle: "Murder of Carlie Brucia", displayName: "Carlie Brucia (2004, FL)" },
  { slug: "danielle-van-dam", wikipediaTitle: "Murder of Danielle van Dam", displayName: "Danielle van Dam (2002, CA)" },
  { slug: "samantha-runnion", wikipediaTitle: "Murder of Samantha Runnion", displayName: "Samantha Runnion (2002, CA)" },
  { slug: "jessica-lunsford", wikipediaTitle: "Murder of Jessica Lunsford", displayName: "Jessica Lunsford (2005, FL)" },
  { slug: "hailey-owens", wikipediaTitle: "Murder of Hailey Owens", displayName: "Hailey Owens (2014, MO)" },
  { slug: "holly-bobo", wikipediaTitle: "Disappearance and murder of Holly Bobo", displayName: "Holly Bobo (2011, TN)" },
  { slug: "caylee-anthony", wikipediaTitle: "Death of Caylee Anthony", displayName: "Caylee Anthony (2008, FL)" },
  { slug: "leiby-kletzky", wikipediaTitle: "Killing of Leiby Kletzky", displayName: "Leiby Kletzky (2011, NY)" },
  { slug: "shaniya-davis", wikipediaTitle: "Murder of Shaniya Davis", displayName: "Shaniya Davis (2009, NC)" },
  { slug: "relisha-rudd", wikipediaTitle: "Disappearance of Relisha Rudd", displayName: "Relisha Rudd (2014, DC, still missing)" },
  { slug: "lisa-irwin", wikipediaTitle: "Disappearance of Lisa Irwin", displayName: "Lisa Irwin (2011, MO, still missing)" },
];

const PREFIX = "wwnfy-faces/";
const UA = "WWNFYSeedBot/1.0 (memorial site for missing children; contact via wwnfy.com)";

async function fetchWikipediaImage(title) {
  const encoded = encodeURIComponent(title.replace(/ /g, "_"));
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encoded}`;
  const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
  if (!res.ok) return null;
  const data = await res.json();
  // Prefer originalimage; fall back to thumbnail
  return data?.originalimage?.source ?? data?.thumbnail?.source ?? null;
}

function extFromUrl(url) {
  const m = url.match(/\.(jpg|jpeg|png|webp|avif|gif)(?:\?|$)/i);
  if (m) return m[1].toLowerCase().replace("jpeg", "jpg");
  return "jpg";
}

function contentTypeFor(ext) {
  if (ext === "jpg") return "image/jpeg";
  if (ext === "png") return "image/png";
  if (ext === "webp") return "image/webp";
  if (ext === "avif") return "image/avif";
  if (ext === "gif") return "image/gif";
  return "image/jpeg";
}

const cases = process.env.WWNFY_SEED_CASES_FILE
  ? JSON.parse(readFileSync(process.env.WWNFY_SEED_CASES_FILE, "utf8"))
  : CASES;

const { blobs: existing } = await list({ prefix: PREFIX });
const existingSlugs = new Set(
  existing.map((b) => b.pathname.replace(PREFIX, "").replace(/\.[^.]+$/, "")),
);

let uploaded = 0;
let skipped = 0;
let failed = 0;

for (const c of cases) {
  if (existingSlugs.has(c.slug)) {
    console.log(`  · skip ${c.slug} (already in blob)`);
    skipped++;
    continue;
  }
  console.log(`  → ${c.slug}  [${c.displayName}]`);
  try {
    const imgUrl = await fetchWikipediaImage(c.wikipediaTitle);
    if (!imgUrl) {
      console.log(`    ✗ no image found for "${c.wikipediaTitle}"`);
      failed++;
      continue;
    }
    const imgRes = await fetch(imgUrl, { headers: { "User-Agent": UA } });
    if (!imgRes.ok) {
      console.log(`    ✗ image fetch failed (${imgRes.status})`);
      failed++;
      continue;
    }
    const buf = Buffer.from(await imgRes.arrayBuffer());
    const ext = extFromUrl(imgUrl);
    const key = `${PREFIX}${c.slug}.${ext}`;
    const r = await put(key, buf, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: contentTypeFor(ext),
    });
    console.log(`    ✓ ${(buf.length / 1024).toFixed(1)} KB → ${r.url}`);
    uploaded++;
    // Be polite to Wikipedia
    await new Promise((r) => setTimeout(r, 600));
  } catch (err) {
    console.log(`    ✗ error: ${err?.message ?? err}`);
    failed++;
  }
}

console.log(
  `\ndone — uploaded ${uploaded}, skipped ${skipped} (already in blob), failed ${failed}`,
);
console.log(
  "review the orb at /wwnfy and delete any photos that don't fit via the Vercel Blob dashboard.",
);
