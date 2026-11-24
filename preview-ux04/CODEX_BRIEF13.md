# Codex review #13 — price index 2025 update and household-survey page

Repo: ~/workspace/okane-website. Read-only review; write your report to CODEX_REVIEW13.md. Do not edit other files. Inspect the two most recent commits (git log / git show).

Reference data:
- Prices 2025: ~/workspace/okane-sprint-pack/runtime/price2025/regional_index_2025.csv (47 prefectures × total/total_ex_rent/food/housing, extracted from the official e-Stat Excel, MIC Retail Price Survey structural ed. 2025, table b001).
- Household: ~/workspace/okane-sprint-pack/runtime/household2025/household_capitals_2025.csv (52 cities; households, adj_households, persons, income, disposable, consumption, housing; from MIC Family Income and Expenditure Survey 2025, table 1-1, worker households).

Checks:
1. Price page: the embedded DATA in tools/regional/index.html matches regional_index_2025.csv for all 47×4 values; no lingering "2024" claims anywhere in the page, the hub card, or content-index; defaults (Tokyo vs Gunma, 200,000 / 75,000) yield 208,400 / 192,400 and rent 97,350 / 67,125.
2. Household page: the embedded DATA in tools/household-survey/index.html matches household_capitals_2025.csv for all 52 cities and all fields; the page states it covers prefectural-capital and designated cities (Tokyo = 東京都区部）, worker households of two-or-more-person households, that 住居 is an all-household average (not rent-payers only), and that these household figures are never subtracted from individual wages; the summary percentages are computed from the same row values.
3. Wiring: hub card, sitemap (17 unique URLs), content-index regional theme includes TOOL-HOUSEHOLD-SURVEY; no other simulator file changed in these commits.

Report PASS/FAIL per check with evidence.
