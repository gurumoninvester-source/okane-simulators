# Codex review #8 — DEV-011 take-home simulator

Reviewed commit `d4f7741316e591b7baeaa9b762775135735a2411` using `git show HEAD`, the supplied `runtime/income_rules.csv` ledger, and the standalone DEV-011 engine. Four checks passed. The page disclosure check failed because the primary-source verification claim exceeds what the ledger records.

## 1. Standalone tests and engine parity — PASS

Running `node ../okane-sprint-pack/runtime/dev011/income_model.test.mjs` returned `11 passed, 0 failed`. The committed inline engine at `tools/income/index.html:69–133` matched the standalone engine after removing comments and the module export keyword and normalizing whitespace. Both validate the same inputs, round monthly premiums with `Math.floor(x + 0.5)`, round taxable bases down to ¥1,000, round tax amounts down to ¥100, and round monthly take-home to the nearest yen.

Both resident-tax adjustment formulas use 5% of the lesser of ¥50,000 and taxable income through ¥2,000,000. Above ¥2,000,000 they apply 5% to ¥50,000 minus the excess and enforce the ¥2,500 minimum.

## 2. Rule fidelity against the ledger — PASS

- **2025 salary deduction** matches `INC-DED-R7-01` through `05`. The upper thresholds are ¥1.9M, ¥3.6M, ¥6.6M, and ¥8.5M. The respective deductions are ¥650,000, 30% + ¥80,000, 20% + ¥440,000, and 10% + ¥1,100,000, followed by a ¥1,950,000 cap. The engine uses the quick formula in the ledger’s noted approximation range below ¥6.6M.
- **Income-tax basic deduction** matches `INC-BASE-R7-01` through `05`. The ¥950,000, ¥880,000, ¥680,000, ¥630,000, and ¥580,000 deductions apply at total-income upper limits of ¥1.32M, ¥3.36M, ¥4.89M, ¥6.55M, and ¥23.5M, respectively.
- **Income tax** matches all seven bracket thresholds, rates, and quick deductions in `INC-RATE-01` through `07`, and applies the `1.021` multiplier in `INC-RECON-01`.
- **Resident tax** uses the ledger’s ¥430,000 basic deduction, standard 10% income levy, and ¥5,000 flat amount consisting of ¥4,000 per capita plus ¥1,000 forest environment tax. `RES-ADJ-01` identifies a ¥50,000 deduction difference and leaves the full adjustment formula open. Check 1 verifies that formula against the standalone engine.
- **Insurance** matches `INS-HEALTH-R7`, `INS-CARE-R7`, `INS-PENSION-01`, `INS-EMP-R7`, and the monthly limits in `INS-CAP-GAP`. Tokyo health insurance (9.91%), ages 40–64 care insurance (1.59%), and pension (18.3%) are halved for the employee. The 0.55% employment rate is already the employee share for general businesses. Health and pension monthly caps are ¥1,390,000 and ¥650,000, with floors of ¥58,000 and ¥88,000.

## 3. Page honesty — FAIL

The visible assumptions at `tools/income/index.html:53–58` disclose salary-only employment, single status with no dependents, Tokyo Kyokai Kenpo, bonuses spread over 12 months, omission of standard-remuneration grades, and use of the salary-deduction quick formula. They explain that resident tax is based on the prior year's income, assume the same salary in both years, and give the first-year example. The example is stated categorically and needs the condition that there was no taxable income in the preceding year. The page gives the annual timing explanation. The ledger also specifies the June-to-May payroll collection cycle. The page says 2026 rules will be added after primary-source confirmation of social insurance rates.

The claim at line 58, `使うルールはすべて一次資料で確認しました`, overstates the supplied evidence. Of 36 ledger rows, 30 are `VERIFIED_PRIMARY`, four are `PARTIAL`, one is `VERIFIED_SECONDARY`, and one is `GAP_FLAGGED`. Among the inputs used in this release, the resident-tax basic deduction (`RES-BASE-01`) and adjustment deduction (`RES-ADJ-01`) are marked `PARTIAL`, and the monthly insurance limits (`INS-CAP-GAP`) are marked `VERIFIED_SECONDARY`. The hub card at `tools/index.html:38` also broadly describes the calculation rules as verified against primary sources.

## 4. Hub, sitemap, content index, and existing simulators — PASS

The hub card’s `./income/` link resolves to the page canonical URL, `https://okanekangaesugi.com/tools/income/`. It is entry 13 of exactly 13 sitemap URLs. Both page and tool records in the `income` theme use the same URL, and the theme has empty `videos` and `claims` arrays. Its note describes the same prior-year assumption and cites 30 primary-source entries, which matches the ledger count. The path-scoped diff from HEAD’s parent was empty for the five existing simulators in `tools/furusato`, `tools/investment`, `tools/kodomo-nisa`, `tools/pension`, and `tools/securities`.

## 5. Requested age-45 results — PASS

Executed the inline engine extracted from the committed HTML in Node.js and compared its full return object with the imported standalone engine. All 12 returned fields matched exactly for both inputs. The ¥5,000,000 case uses the resident-tax adjustment branch above ¥2,000,000. The ¥3,600,000 case uses the lower branch.

| Gross salary | Age | Insurance (both) | Income tax (both) | Resident tax (both) | Page annual take-home | Standalone annual take-home | Monthly take-home (both) |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| ¥5,000,000 | 45 | ¥772,512 | ¥115,500 | ¥238,200 | ¥3,873,788 | ¥3,873,788 | ¥322,816 |
| ¥3,600,000 | 45 | ¥556,200 | ¥51,200 | ¥147,800 | ¥2,844,800 | ¥2,844,800 | ¥237,067 |
