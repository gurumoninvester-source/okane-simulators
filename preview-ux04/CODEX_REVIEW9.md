# Codex review #9 — income wording and household simulator

All requested checks passed. The income wording fix is `b713d1b`. The household change spans `703b6ea` (hub, sitemap, content index) and `932145b` (simulator page), so Part B covers both commits.

## Part A — income wording

| Check | Result | Evidence |
| --- | --- | --- |
| Verification claim | PASS | `tools/income/index.html:58` replaces the blanket primary-source claim with 「使うルールの中心部分は一次資料で確認しました」 and explicitly identifies the resident-tax basic and adjustment deductions and social insurance caps as 「公的資料に基づく二次確認の段階」. |
| First-year resident tax | PASS | `tools/income/index.html:53` conditions the first-year statement on 「前年に課税される所得がなかった人」. |
| Payroll collection cycle | PASS | `tools/income/index.html:53` says payroll withholding runs from June of the following year through May of the year after that. |
| Hub card | PASS | `tools/index.html:38` now says 「計算ルールは公的資料で検証済み」, replacing 「一次資料」 with 「公的資料」. |

## Part B — household simulator

1. **PASS — Engine parity and tests.** The inline engine in `tools/household/index.html:68–90` matches `runtime/dev012/household_model.mjs` exactly after removing the standalone module's `export` keywords and trailing newline. This covers the task list, day patterns, rounding of annual, monthly, and per-task amounts, and the sensitivity calculation. Running `node ../okane-sprint-pack/runtime/dev012/household_model.test.mjs` reported **7 passed, 0 failed**.
2. **PASS — Method fidelity.** `tools/household/index.html:61–63` explains 機会費用法 using the person's forgone wage, 代替費用法スペシャリスト using task-specific occupational wages, and 代替費用法ジェネラリスト using a general housekeeping wage, consistent with ledger entries `HW-METHOD-01` through `HW-METHOD-03`. The page limits the calculation to tasks a third party can perform, excludes sleep and leisure, and explains that the result varies with the hourly rate the user chooses (`HW-DEF-01`, `HW-RULE-01`). The only fixed rate presented as an observed benchmark is ¥1,226, identified as Tokyo's Reiwa 7 minimum wage directly below the sensitivity table (lines 55–57 and 106–107). The other rates are scenario inputs. No invented price is presented as fact.
3. **PASS — Defaults.** The initial controls (lines 33–40) and reset handler (line 110) agree on 1.5 h cooking, 1 h cleaning and laundry, 3 h childcare, 0 h care and nursing, 0.5 h shopping and household errands, ¥1,500 per hour, and every day (365 days per year). Line 63 explicitly says 「時間の初期値は例示です」.
4. **PASS — Wiring and change scope.** The hub card (`tools/index.html:39`) links to `./household/`. The household page canonical URL matches the sole household entry in `sitemap.xml:16` and both the page and tool URLs in the `household` theme (`content-index.json:139–153`). The parsed sitemap has 14 unique URLs. The theme note also describes the three ESRI methods and the user-set hourly rate. The combined diff from `b713d1b` to `932145b` contains only `tools/index.html`, `sitemap.xml`, `content-index.json`, and the new `tools/household/index.html`. No other simulator file changed in either household commit.
