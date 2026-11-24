# Codex review #11 — DEV-013 regional comparison simulator (latest commit)

Repo: ~/workspace/okane-website. Read-only review; write your report to CODEX_REVIEW11.md. Do not edit other files. Inspect the latest commit (git show HEAD).

Reference data (primary source extract): ~/workspace/okane-sprint-pack/runtime/dev013/regional_index_2024.csv — 47 prefectures extracted from the official e-Stat Excel of 総務省統計局 小売物価統計調査（構造編）2024年, table a0010. Standalone engine: ~/workspace/okane-sprint-pack/runtime/dev013/regional_model.mjs with tests (4/4 passed when run by Muse).

Checks:
1. Data fidelity: the DATA array embedded in tools/regional/index.html must match regional_index_2024.csv for all 47 prefectures and all four indices (total, total_ex_rent, food, housing). Compare programmatically and report any mismatch.
2. Engine parity: the inline equivalent() and ratio() must match regional_model.mjs semantics; default view (Tokyo vs Gunma, expense 200,000, rent 75,000) must yield 208,000 / 192,400 / rent 95,400 and 67,350.
3. Fairness rules: the page must state that indices are same-year relative values (national=100), that 総合 excludes imputed rent, that housing is converted separately, and that income must be paired with the same region (no cross-region subtraction of income and prices). Confirm no minimum-wage or other non-index data is mixed in.
4. Wiring and scope: hub card, sitemap (15 unique URLs), content-index regional theme; the commit changes no other simulator file.

Report PASS/FAIL per check with evidence.
