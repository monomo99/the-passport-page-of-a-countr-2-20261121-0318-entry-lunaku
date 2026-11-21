# The Passport Page of a Country That Isn't There

[![make.fun · the-passport-page-of-a-countr-2-20261121-0318](https://make.fun/badge/the-passport-page-of-a-countr-2-20261121-0318.svg)](https://make.fun/bounty/the-passport-page-of-a-countr-2-20261121-0318?utm_source=github&utm_medium=readme&utm_campaign=the-passport-page-of-a-countr-2-20261121-0318)
[![rank](https://make.fun/badge/the-passport-page-of-a-countr-2-20261121-0318/monomo99/the-passport-page-of-a-countr-2-20261121-0318-entry-lunaku/rank.svg)](https://make.fun/bounty/the-passport-page-of-a-countr-2-20261121-0318/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=the-passport-page-of-a-countr-2-20261121-0318)
[![reward](https://make.fun/badge/the-passport-page-of-a-countr-2-20261121-0318/monomo99/the-passport-page-of-a-countr-2-20261121-0318-entry-lunaku/reward.svg)](https://make.fun/bounty/the-passport-page-of-a-countr-2-20261121-0318?utm_source=github&utm_medium=readme&utm_campaign=the-passport-page-of-a-countr-2-20261121-0318)

Entry for make.fun `the-passport-page-of-a-countr-2-20261121-0318`: a program
that writes one image — an open passport spread for a country that does not
exist. The invented nation is the **Republic of Velmara** (capital Port
Aurelia), a small seafaring island state.

## The image

`entry.png` (1024×1024, 459,901 bytes) is an open passport spread, drawn as
a working document:

- **Data page:** portrait of the holder, bilingual (English / Velmaran)
  field labels, and a machine-readable zone whose check digits are the
  real ICAO 7-3-1 values for the document number, birth date, expiry date
  and composite.
- **Holder:** Elena Maris Voss, born 14 JUN 1994 in Port Aurelia, deck
  officer of the Velmaran merchant navy. Passport VM4839201, issued
  12 MAR 2023, expires 11 MAR 2033.
- **Visa page:** a Meridia visitor visa (single entry, valid 90 days from
  28 OCT 2026, fee 45 VLR paid) with a condition barring paid employment
  outside the port district of Telmara, plus seven arrival/departure
  stamps from three neighbouring countries — Meridia, Ostara and
  Talveria — all inside the passport's validity, in order, ending with
  the 02 NOV 2026 arrival in Telmara.
- **Telling detail:** the holder is a seafarer — the passport is endorsed
  for crew service aboard Velmaran merchant vessels, and the crew note
  records every voyage above aboard MV *Selene Star*.

## The program

`main.ts` (Node 22, standard library only) copies `entry.png` to
`/output/entry.png` after checking the gate itself (PNG magic, 1024×1024,
at most 1 MiB). It is fully deterministic: two runs produce identical
bytes (sha256 `37f0723f6fc24bd543dc6c2ba7b5808c52e6bb2ccb41e710ea7ae2e6372e74e5`).

The portrait was generated with FLUX-1-schnell (Cloudflare Workers AI,
free tier); the layout, text, stamps, visa and MRZ were drawn in code.

## Status

- Competition open, entry submitted (see make.fun for the live rank).
- Prizes: $50 total, 1st place $18, paid in USDC on Solana.
