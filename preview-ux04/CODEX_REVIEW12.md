# Codex review #12 — Wage candidate, cross-links, and PROD-002 trial

Reviewed `master` at `5000ae1` and `candidate/regional-wages` at `4c82bed`. All five items pass.

## Part A — Wage comparison candidate

1. **PASS — Prefecture and national values.** Parsed the `DATA` array at `tools/regional-wages/index.html:62` from the candidate branch and matched it by prefecture name against `wage_reconciled.json`. All 47 unique prefectures and their wage values matched. `NATIONAL` on line 63 and the reference national value both equal ¥340,600. The supplied `wage_reconciliation.json` records zero mismatches with the pack transcription.
2. **PASS — Metric, scope, and bar baseline.** Lines 31 and 55–57 define the measure as 2025年6月分の所定内給与額 for 一般労働者・男女計 at private establishments with at least 10 regular workers. The page excludes bonuses and overtime pay, expressly distinguishes the gross figure from take-home pay and household income, and states that the site does not subtract household spending from wages. Lines 73–75 use the maximum of the two selected wages and the national figure as the common denominator. Width is `Math.round(v / max * 62)` percent, so the scale starts at zero and uses the value-to-maximum ratio, rounded to a whole percentage point of container width.
3. **PASS — Candidate wiring.** The candidate route `/tools/regional-wages/` is absent from the tools hub (`tools/index.html`), home page (`index.html`), `sitemap.xml`, and `content-index.json` in both committed `master` and the checkout.

## Part B — Cross-links on master

4. **PASS — Navigation-only page diffs.** In `5000ae1`, removing the single `<nav class="related-nav">` block after the final script in each of `tools/pension`, `tools/kodomo-nisa`, `tools/furusato`, and `tools/securities` restored the parent version byte for byte, confirming no changes to calculations, input defaults, or premise text. In `d25fb0d`, removing the single related-links section and its trailing newline immediately before `</main>` in each of `tools/income`, `tools/household`, `tools/regional`, `tools/investment`, and `stories` likewise restored the parent version byte for byte. The investment page’s closing tag moved to a new line as part of that insertion. The same commit also archived `CODEX_REVIEW11.md` as a separate file.

## Part C — PROD-002 trial record

5. **PASS — Latest-month figures and anomaly.** The SHA-256 hashes for both CSVs match `trial_record.json`. The September and October rows in `sample24.csv` and the independently calculated October-minus-September deltas match all nine figures in `trial24_response.md`.

   | Amount (JPY) | September 2026 | October 2026 | Change |
   | --- | ---: | ---: | ---: |
   | Total assets | 11,747,669 | 11,965,613 | +217,944 |
   | Liabilities | 28,000 | 12,000 | −16,000 |
   | Net assets | 11,719,669 | 11,953,613 | +233,944 |

   Net assets equal assets minus liabilities in both months, and the change reconciles as 217,944 − (−16,000) = 233,944. In `sample_bad.csv`, the 2024-12 row reports net assets of ¥7,905,820 against ¥7,895,820 calculated from ¥8,259,820 in assets minus ¥364,000 in liabilities. `trial_bad_response.md` identifies 2024-12 and the ¥10,000 overstatement, then stops before calculating month-over-month changes.
