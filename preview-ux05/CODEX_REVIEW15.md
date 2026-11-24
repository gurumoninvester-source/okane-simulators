# Codex review #15 — spreadsheet helper column and SEO commit scope

## Part A — spreadsheets

| Check | Result | Evidence |
|---|---|---|
| A1. Column J in all four workbooks | **PASS** | In 月次記録, `J1` is `総資産（CSV用）` and each cell in `J2:J37` contains the row-specific formula `=SUM(Bn:En)`. All 36 formulas matched in each of `lite/asset_compass_lite_template.xlsx`, `lite/asset_compass_lite_example.xlsx`, `pro/asset_compass_pro_template.xlsx`, and `pro/asset_compass_pro_example.xlsx` under `runtime/products/` (144 of 144). |
| A2. Lite example recalculation and G/H formulas | **PASS** | The last populated month is October 2026 (row 25). LibreOffice Calc calculated 純資産 (`G25`) as **11,953,613** and 総資産（CSV用） (`J25`) as **11,965,613**, a difference of **12,000** matching `F25`. In the source, `G2:G37` uses `=SUM(Bn:En)-Fn`, `H3:H37` uses `=Gn-G[n−1]` with the corresponding row numbers, and `H2` is blank, matching review #14's observed first-month behavior. The recalculated `G2`, `G24`, and `H25` also match review #14 at **7,640,000**, **11,719,669**, and **+233,944**. |

The headless LibreOffice CLI produced no output file, including with isolated profile and temporary paths. I used LibreOfficeKit to run the installed Calc engine headlessly and export an XLSX from a temporary copy. The input's formula caches for the reported cells were empty. The exported copy supplied the calculated values.

`lite/GUIDE.md:19` explicitly maps `assets_jpy` to `総資産（CSV用）`. `pro/GUIDE.md:3` refers readers to the Lite guide for 月次記録 instructions.

## Part B — commit scope and structured data

Reviewed `9f65f90` and `326a631`, the two commits identified by the brief and the two tips at the start of the review. The repository advanced to `8c5a807` during the review. That commit and the accompanying addition of the brief leave the tool pages and homepage identical to `326a631`.

| Check | Result | Evidence |
|---|---|---|
| B1. SEO commit changes only page heads | **PASS** | `git show 9f65f90` lists 12 HTML pages. Comparing the parent and commit blobs showed byte-for-byte equality outside the contents of `<head>` for all 12. Non-JSON-LD script tags and their contents also matched. This covers calculator scripts, default inputs, and premise text in pension, kodomo-nisa, furusato, and securities. The commit also adds the non-page file `CODEX_BRIEF14.md`. |
| B2. Funnel commit adds only the products link in related sections | **FAIL** | `git show --name-status 326a631` lists only the addition of `CODEX_REVIEW14.md`, and the HTML diff against its parent is empty. All ten tool pages already had the `../../products/` link inside `related` or `related-nav` sections at `9f65f90`. Earlier link additions appear in `d25fb0d`, `5000ae1`, `a451f40`, and `99b11a5`. |
| B3. JSON-LD parses and matches the pages | **FAIL** | All **11 of 11** blocks parse as JSON. The homepage declares `WebSite` at the site root. All ten tool blocks declare `WebApplication` with boolean `isAccessibleForFree: true`, consistent with the directly usable tools in the HTML. Each URL matches its page route and all canonical and Open Graph URLs present on the page. The description claim `過去実績ではなく` conflicts with the historical survey figures displayed in `tools/household-survey/index.html:22` (2025 household survey table and source at lines 39 and 51) and `tools/regional-wages/index.html:22` (June 2025 observed wages at line 56). `tools/regional/index.html:22` uses the same unqualified wording for a page that displays the observed 2025 price index at line 52 alongside modeled living costs. |

URL and access checks used the committed site files.
