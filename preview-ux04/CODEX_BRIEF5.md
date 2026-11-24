# Codex review brief #5 — pension FY2026 update + kodomo-NISA status text (2026-11-24)

Repo: ~/workspace/okane-website. No network. The working tree has UNCOMMITTED changes to tools/pension/index.html and tools/kodomo-nisa/index.html. Review them; do not modify any file except writing CODEX_REVIEW5.md.

## Primary facts (already fetched from official pages by Muse; verify the arithmetic and consistency, not the web)
- Japan Pension Service, FY2026 (令和8年度): full basic pension 70,608 JPY/month (FY2025: 69,308); for those born on/before 1956-04-01: 70,408. Standard couple amount (夫婦2人分) FY2026: 237,279 JPY/month (FY2025: 232,784).
- Model A annual base should be (237,279 − 70,608) × 12 = 2,000,052. Model B annual base = 70,608 × 12 = 847,296.

## Checks
1. `git diff tools/pension/index.html`: confirm the ONLY changes are (a) BASE_A/BASE_B constants, (b) the two model button data-v values and labels, (c) premise/note text. List every changed line and flag anything else.
2. Arithmetic: 237,279−70,608=166,671; ×12=2,000,052; 70,608×12=847,296. PASS/FAIL.
3. Extract the PensionCore from the CURRENT file and from `git show HEAD:tools/pension/index.html`. Using node, run total() for bases A and B, start ages 60/65/70, death ages 85/90, net=false, r=0. Confirm new gross totals = old gross totals × (new base / old base) exactly (within 1 yen). Report the table.
4. Pension deduction fixtures: file ~/workspace/okane-sprint-pack/pack2/extracted/pension_tax_fixtures.csv has 22 cases (age_at_dec31, annual pension, other income, expected misc income). The sim's pensionDed(rev, age65) implements the statutory bands WITHOUT the other-income adjustment (sim premise is pension income only). For cases with other income ≤ 10,000,000, expected misc income must equal max(0, rev − pensionDed(rev, age≥65)). Verify all such cases; report pass count. The 4 cases with other income above that are out of scope — confirm the premise text in the page now discloses this.
5. `git diff tools/kodomo-nisa/index.html`: confirm the change is text-only (one <li> in the premise notes) and no script/calculation code changed.
6. md5 of tools/furusato/index.html must be 2d1c79dfe1aabd26f1526f32ea895362 and tools/securities/index.html 570214c9512ce1b66635ee52e683cbd5 (unchanged originals). PASS/FAIL.

## Output
Write CODEX_REVIEW5.md in the repo root: one section per check, PASS/FAIL, evidence. Do not modify any other file.
