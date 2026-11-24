# Codex review #15 — delta review: spreadsheet helper column + SEO commit scope

Read-only review; write your report to CODEX_REVIEW15.md in ~/workspace/okane-website. Do not edit other files.

Part A — spreadsheet delta (packages in ~/workspace/okane-sprint-pack/runtime/products/):
After review #14 was launched, a helper column J "総資産（CSV用）" (formula =SUM(B:E)) was added to the 月次記録 sheet of all four workbooks (lite template/example, pro template/example), and the guides were updated to reference it. Verify:
1. Column J header and formulas exist in all four files for rows 2..37.
2. Recalculate lite example with LibreOffice headless: last data row must show 純資産 11,953,613 and J = 11,965,613; the G/H formulas must be unchanged from review #14's expectations.

Part B — SEO commit scope (the two most recent commits in this repo):
1. The meta/JSON-LD commit must have changed only <head> content of the touched pages: confirm via git show that no <script> calculator logic, default input values, or premise text in the four ported simulators (pension, kodomo-nisa, furusato, securities) changed.
2. The funnel commit must have added only the products link inside related sections.
3. All JSON-LD blocks parse as valid JSON and their claims match the pages (free WebApplication, correct URLs).

Report PASS/FAIL per item with evidence.
