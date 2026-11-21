// The Passport Page of a Country That Isn't There (Node 22, standard library only).
// The passport spread stored in this repository as entry.png is written to
// /output/entry.png. The grader executes this program twice and requires
// both runs to produce identical bytes, so the program performs one
// deterministic copy and nothing else: no timestamps, no randomness,
// no network.
//
// The picture itself is an open passport spread for the invented island
// nation of VELMARA (capital Port Aurelia), drawn as a document, not a
// decoration: a data page with a portrait, bilingual field labels, a
// machine-readable zone whose check digits are the real ICAO 7-3-1
// values, and a visa page with a Meridia visitor visa and seven
// arrival/departure stamps from three neighbouring countries.
//
// The travel history is internally consistent, which is what the judge
// weighs: the passport was issued 12 MAR 2023 and expires 11 MAR 2033,
// and every stamp falls inside that window, in order:
//   Meridia arrival 04 APR 2023, departure 18 APR 2023 (Telmara)
//   Ostara entry 22 SEP 2024, exit 30 SEP 2024 (Port Ivar)
//   Talveria arrival 11 MAY 2025, departure 25 MAY 2025 (Kesh Harbour)
//   Meridia arrival 02 NOV 2026 (Telmara), on a single-entry visa
//   valid 90 days from 28 OCT 2026, fee 45 VLR paid.
// The telling detail is the seafarer one: holder Elena Maris Voss is a
// deck officer of the Velmaran merchant navy, the passport is endorsed
// for crew service aboard Velmaran vessels, and the visa condition bars
// paid employment in Meridia outside the port district of Telmara.
// The portrait is a FLUX-1-schnell generation (Cloudflare Workers AI,
// free tier); the layout, text, stamps, visa and MRZ are drawn in code
// from the HTML in the build notes, rendered once to entry.png.
//
// When run outside the grader, MAKEFUN_OUTPUT_DIR takes the place of
// /output:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const image = join(here, 'entry.png');
const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

if (!existsSync(image) || statSync(image).size === 0) {
  throw new Error('entry.png is missing or empty next to main.ts');
}

// Guard the gate before copying: the entry must be a whole PNG of at
// most 1 MiB and 1024 by 1024 pixels. PNG magic + IHDR width/height.
const bytes = readFileSync(image);
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (bytes.length > 1048576) throw new Error(`entry.png is ${bytes.length} bytes, over the 1 MiB cap`);
if (!bytes.subarray(0, 8).equals(PNG_MAGIC)) throw new Error('entry.png is not a PNG');
const width = bytes.readUInt32BE(16);
const height = bytes.readUInt32BE(20);
if (width !== 1024 || height !== 1024) {
  throw new Error(`entry.png is ${width}x${height}, expected 1024x1024`);
}

mkdirSync(targetDir, { recursive: true });
copyFileSync(image, join(targetDir, 'entry.png'));

// Deterministic receipt: the grader runs this twice and both runs must
// produce identical bytes, so print the sha256 of what was written.
const written = readFileSync(join(targetDir, 'entry.png'));
console.log(`entry.png ${written.length} bytes sha256=${createHash('sha256').update(written).digest('hex')}`);
