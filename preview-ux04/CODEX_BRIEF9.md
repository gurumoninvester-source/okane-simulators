# Codex review #9 — income honesty fix + household simulator (latest two commits)

Repo: ~/workspace/okane-website. Read-only review; write your report to CODEX_REVIEW9.md. Do not edit other files.

Part A — income fix (HEAD~1..HEAD includes the household commit; find the income wording commit just before it): verify the income page no longer claims all rules are primary-source verified; the claim now distinguishes primary-verified core rules from secondary-verified items (resident-tax basic deduction/adjustment, insurance caps); the first-year resident-tax sentence is conditioned on having no taxable income in the previous year; the June–May collection cycle is stated. Also verify the hub card label was softened consistently.

Part B — household simulator (tools/household/index.html), ground truth ~/workspace/okane-sprint-pack/runtime/household_rules.csv and engine/tests at ~/workspace/okane-sprint-pack/runtime/dev012/ (run the tests, 7 must pass):
1. The inlined engine matches dev012/household_model.mjs logic.
2. Method fidelity: the page explains all three Cabinet Office methods （機会費用法/代替費用法スペシャリスト/同ジェネラリスト), restricts scope to third-party-substitutable tasks, does NOT assert a single value as "the value of housework", and the only hard-coded market anchor is Tokyo minimum wage ¥1,226 (Reiwa 7) in the sensitivity table, labeled as such. Flag any invented price presented as fact.
3. Defaults: tasks 1.5/1/3/0/0.5 h, wage ¥1,500, daily pattern — the page must label the initial time values as examples （例示）.
4. Wiring: hub card, sitemap (14 URLs), content-index household theme consistent; no other simulator file changed in the household commit.

Report PASS/FAIL per item with evidence.
