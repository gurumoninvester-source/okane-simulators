# Codex review #8 — income (take-home) simulator, DEV-011 (latest commit)

Repo: ~/workspace/okane-website. Read-only review; write your report to CODEX_REVIEW8.md. Do not edit other files. Inspect the latest commit (git show HEAD).

Ground truth: ~/workspace/okane-sprint-pack/runtime/income_rules.csv (36 rules, primary-source verified) and the standalone engine+tests at ~/workspace/okane-sprint-pack/runtime/dev011/ (income_model.mjs, income_model.test.mjs — run the tests).

Checks:
1. Run the dev011 tests: all 11 must pass. Then confirm the computeTakeHome inlined in tools/income/index.html is identical in logic to dev011/income_model.mjs (same constants, same rounding, same adjustment-deduction formula including the ¥2,500 floor for taxable income over ¥2,000,000).
2. Rule fidelity against income_rules.csv: salary deduction bands (2025), basic deduction bands (95/88/68/63/58万円), income tax quick table + ×1.021, resident tax (43万円 basic, 10%, ¥5,000 flat incl. forest tax), insurance rates (health 9.91% Tokyo, care 1.59% ages 40-64, pension 18.3%, employment 0.55%, all halved except employment which is employee-only), caps (health ¥1,390,000 / pension ¥650,000 monthly). Flag any mismatch.
3. Page honesty: the page must disclose — single/no dependents, Tokyo Kyokai Kenpo, bonus spread over 12 months, standard-remuneration grade simplification, salary-deduction quick formula, resident tax computed as if the previous year's income were the same WITH the timing explanation (first year no resident tax), and that 2026 rules come later. Flag anything missing or overstated.
4. Wiring: hub card, sitemap (13 URLs), content-index income theme consistent; the other simulator files untouched in HEAD.
5. Evaluate the page engine at (5,000,000, age 45) and (3,600,000, age 45) and compare with the standalone engine — must match exactly.

Report PASS/FAIL per check with evidence.
