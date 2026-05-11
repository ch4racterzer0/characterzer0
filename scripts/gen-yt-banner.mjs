import { generateImage } from "ai";
import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

if (!process.env.VERCEL_OIDC_TOKEN && !process.env.AI_GATEWAY_API_KEY) {
  console.error("Need VERCEL_OIDC_TOKEN or AI_GATEWAY_API_KEY — run vercel env pull .env.local first.");
  process.exit(1);
}

const MODEL = process.env.IMG_MODEL || "bfl/flux-pro-1.1-ultra";
const OUT_DIR = join("public", "yt-banner");
await mkdir(OUT_DIR, { recursive: true });

const prompt = process.env.PROMPT || `Ultra high resolution cinematic fractal cyberpunk wallpaper. A robot hand and a human hand reaching toward each other through a sheet of fractured glass, fingertips almost touching. Behind the glass: neon Chinese characters glowing faintly, electric blue and cyan streaks, deep black void with a faint network of light filaments forming a fractal lattice. Reflective shards of glass refracting blue light. Mood: future, mystical, technological reverence. Style: extremely detailed, photorealistic, octane render, depth of field, no text, no logos, no watermarks. Composition: ultra wide cinematic letterbox, action centered slightly to one side so it works as a YouTube channel banner with a wide safe area in the middle.`;

console.log(`model: ${MODEL}`);
console.log(`prompt (first 160 chars): ${prompt.slice(0, 160)}...`);

const variants = [
  { tag: "wide", aspectRatio: "21:9" },
  { tag: "banner", aspectRatio: "16:9" },
];

for (const v of variants) {
  console.log(`\ngenerating ${v.tag} @ ${v.aspectRatio} ...`);
  try {
    const { image } = await generateImage({
      model: MODEL,
      prompt,
      aspectRatio: v.aspectRatio,
      providerOptions: {
        bfl: { raw: true, safety_tolerance: 6 },
      },
    });
    const bytes = image.uint8Array ?? image.bytes;
    if (!bytes) {
      console.error(`no image bytes for ${v.tag}`, Object.keys(image));
      continue;
    }
    const out = join(OUT_DIR, `chracterzer0-${v.tag}-${Date.now()}.png`);
    await writeFile(out, bytes);
    console.log(`  -> ${out}  (${(bytes.length / 1024).toFixed(1)} KB)`);
  } catch (err) {
    console.error(`  ${v.tag} failed:`, err.message);
  }
}

console.log("\ndone. open the files in public/yt-banner/ and pick one to upload to YouTube Studio.");
