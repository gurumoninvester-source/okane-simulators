# Codex review #12 — wage comparison candidate, cross-links, AI review trial record

Repo: ~/workspace/okane-website. Read-only review; write your report to CODEX_REVIEW12.md on the master branch checkout. Do not edit other files.

Part A — wage candidate (branch candidate/regional-wages, inspect with git show candidate/regional-wages:tools/regional-wages/index.html):
Reference: ~/workspace/okane-sprint-pack/runtime/wage_verify/wage_reconciled.json (47 prefectures + national, extracted by Muse from the official e-Stat Excel of MHLW Basic Survey on Wage Structure 2025, reference table 1, sheet 男女計; reconciliation record wage_reconciliation.json shows 0 mismatches vs the pack transcription).
1. The DATA array in the candidate page must match wage_reconciled.json for all 47 prefectures and the NATIONAL constant must be 340600.
2. The page must define the metric exactly: 所定内給与額， 2025年6月分， 一般労働者・男女計， 常用労働者10人以上の民営事業所， excluding bonuses and overtime; must state it is not take-home pay and not household income; must state that wages are never subtracted from household spending on this site; bars must start at 0 (width proportional to value/max).
3. The candidate must NOT be wired into master's hub/sitemap/content-index (it is a pre-approval candidate).

Part B — cross-link commits on master (the two most recent commits before this brief):
4. For the four ported simulators (tools/pension, tools/kodomo-nisa, tools/furusato, tools/securities), confirm the diffs add only a navigation block and change no calculation code, no input defaults, and no premise text. For tools/income, tools/household, tools/regional, tools/investment and stories, confirm only a related-links section was added before </main>.

Part C — PROD-002 trial record (~/workspace/okane-sprint-pack/runtime/prod002_trial/trial_record.json):
5. Spot-check trial24_response.md's latest-month figures against sample24.csv (Sep and Oct 2026 rows): assets, liabilities, net and the three deltas. Confirm the anomaly response names 2024-12 and a 10,000 discrepancy.

Report PASS/FAIL per item with evidence.
