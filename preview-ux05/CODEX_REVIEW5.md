# Codex review #5 — FY2026 pension and Kodomo NISA status text

## 1. Pension diff scope — PASS

`git diff -- tools/pension/index.html` contains exactly six line replacements. Both sides of the diff use the same line numbers.

| Line | Change |
| ---: | --- |
| 130 | Model A button `data-v` and label amount changed from ¥1,961,712 to ¥2,000,052. |
| 131 | Model B button `data-v` and label amount changed from ¥831,696 to ¥847,296. |
| 163 | Pension amount premise updated from FY2025 to FY2026, with both model derivations, the ¥70,408 older-cohort amount and birth-date cutoff, and Japan Pension Service attribution. |
| 165 | Take-home pay premise expanded to describe all deduction bands and the excluded other-income adjustment. |
| 169 | Deduction source note now cites confirmation against FY2026 National Tax Agency materials. The note that FY2026 onward income-tax basic deduction increases are excluded was retained. |
| 181 | `BASE_A` changed from `1961712` to `2000052` and `BASE_B` from `831696` to `847296`. |

**Default-value inconsistency.** Line 134 still sets `#base` to `196.1712` in units of ¥10,000. The startup `render()` call at line 533 invokes `readInputs()`, which overwrites the initial `st.base = C.BASE_A` with ¥1,961,712. The first calculation therefore uses the FY2025 base, ¥38,340 below the displayed, selected FY2026 Model A preset. Clicking Model A loads ¥2,000,052.

## 2. FY2026 arithmetic — PASS

- ¥237,279 − ¥70,608 = ¥166,671 per month.
- Model A: ¥166,671 × 12 = ¥2,000,052 per year.
- Model B: ¥70,608 × 12 = ¥847,296 per year.

Both annual results match the constants, button values and labels, and premise text.

## 3. Gross lifetime totals — PASS

Extracted `PensionCore` between the core markers from the working file and from `git show HEAD:tools/pension/index.html`. Evaluated both in Node.js and called `total(base, start, death, false, 0)` using each version’s own base. All **12/12** results were within ¥1 of the old gross total multiplied by the new-to-old base ratio. The largest absolute difference was approximately ¥0.00000000745.

| Model | Start age | Death age | HEAD gross (¥) | Current gross (¥) | HEAD gross × base ratio (¥) |
| --- | ---: | ---: | ---: | ---: | ---: |
| A | 60 | 85 | 37,272,528.00 | 38,000,988.00 | 38,000,988.00 |
| A | 60 | 90 | 44,727,033.60 | 45,601,185.60 | 45,601,185.60 |
| A | 65 | 85 | 39,234,240.00 | 40,001,040.00 | 40,001,040.00 |
| A | 65 | 90 | 49,042,800.00 | 50,001,300.00 | 50,001,300.00 |
| A | 70 | 85 | 41,784,465.60 | 42,601,107.60 | 42,601,107.60 |
| A | 70 | 90 | 55,712,620.80 | 56,801,476.80 | 56,801,476.80 |
| B | 60 | 85 | 15,802,224.00 | 16,098,624.00 | 16,098,624.00 |
| B | 60 | 90 | 18,962,668.80 | 19,318,348.80 | 19,318,348.80 |
| B | 65 | 85 | 16,633,920.00 | 16,945,920.00 | 16,945,920.00 |
| B | 65 | 90 | 20,792,400.00 | 21,182,400.00 | 21,182,400.00 |
| B | 70 | 85 | 17,715,124.80 | 18,047,404.80 | 18,047,404.80 |
| B | 70 | 90 | 23,620,166.40 | 24,063,206.40 | 24,063,206.40 |

## 4. Pension deduction fixtures — PASS

Read all 22 rows of `pension_tax_fixtures.csv` and evaluated `Math.max(0, rev - pensionDed(rev, age >= 65))` in Node.js using age at December 31. All **18/18** cases with other total income of ¥10,000,000 or less matched exactly. Each amount below is both the computed and expected miscellaneous income in yen.

| Fixture | Matched amount (¥) | Fixture | Matched amount (¥) |
| --- | ---: | --- | ---: |
| PT01 | 0 | PT10 | 2,200,075 |
| PT02 | 0 | PT11 | 2,350,000 |
| PT03 | 0 | PT12 | 2,800,000 |
| PT04 | 100 | PT13 | 2,800,085 |
| PT05 | 700,000 | PT14 | 5,860,000 |
| PT06 | 700,075 | PT15 | 5,860,095 |
| PT07 | 0 | PT16 | 8,045,000 |
| PT08 | 100 | PT17 | 8,045,100 |
| PT09 | 2,200,000 | PT18 | 900,000 |

PT19–PT22 exceed the other-income threshold and are out of scope. Line 165 discloses that the deduction decreases by ¥100,000 when other total income exceeds ¥10 million and by ¥200,000 when it exceeds ¥20 million. It explicitly says the calculator omits this adjustment under its pension-income-only premise.

## 5. Kodomo NISA diff scope — PASS

`git diff -- tools/kodomo-nisa/index.html` shows one text replacement inside the premise notes’ `<li>` at line 373. Node.js confirmed that the script blocks match HEAD byte for byte. The diff contains zero calculation changes.

**Deposit premise inconsistency.** The new text says the tool only deposits child allowance and therefore stays below ¥600,000 annually. The ¥360,000 annual maximum applies to child allowance alone. The schedule also adds optional Tokyo 018 support of ¥5,000 per month and user-entered deposits of up to ¥30,000 per month (lines 275–276 and 459–462). With both options and the ¥30,000 monthly third-child allowance, the scheduled inflow can reach ¥780,000 over 12 months before the cumulative cap is applied.

## 6. Unchanged-file MD5 checks — PASS

Both `md5sum` results match the expected originals.

| File | Expected and observed MD5 |
| --- | --- |
| `tools/furusato/index.html` | `2d1c79dfe1aabd26f1526f32ea895362` |
| `tools/securities/index.html` | `570214c9512ce1b66635ee52e683cbd5` |
