# Codex review #13 — 2025 regional prices and household survey

Reviewed the two most recent commits, `1528972` and `99b11a5`, using `git log` and `git show`. All three requested checks pass.

## 1. Price page — PASS

- The embedded `DATA` in `tools/regional/index.html` matches `regional_index_2025.csv` for all 47 prefecture names and all 188 numeric values across `total`, `total_ex_rent`, `food`, and `housing`.
- A full-text search found zero occurrences of `2024` in `tools/regional/index.html`, `tools/index.html`, and `content-index.json`. The price page, hub card, and regional content-index entry identify the data year as 2025.
- Running the page script in Node with a minimal DOM stub initialized from the HTML controls gave **¥208,400 / ¥192,400** for living expenses and **¥97,350 / ¥67,125** for rent. The defaults are Tokyo and Gunma, with ¥200,000 for living expenses and ¥75,000 for rent. Their total indices are 104.2 and 96.2, and their housing indices are 129.8 and 89.5.

Additional finding. The source comment at `tools/regional/index.html:68` still names Excel table `a0010`. The brief identifies the supplied 2025 data as table `b001`.

## 2. Household page — PASS

- The embedded `DATA` in `tools/household-survey/index.html` matches `household_capitals_2025.csv` for all 52 city names and all 364 numeric values across `households`, `adj_households`, `persons`, `income`, `disposable`, `consumption`, and `housing`.
- The table caption and methodology identify the population as worker households of two or more people. The methodology specifies prefectural-capital and designated cities, with Tokyo represented by 東京都区部. It describes 住居 as an average across all households in the surveyed group, including homeowners. The introduction and methodology explicitly rule out subtracting household figures from individual wages. The script calculates the comparison entirely from household rows.
- The comparison table and summary both use the selected city rows. The summary calculates `housing / consumption × 100` and displays one decimal place. Running the page script in Node with a minimal DOM stub reproduced the CSV-derived percentages for all 2,704 ordered city pairs. The defaults show **8.2%** for 東京都区部 (¥32,810 ÷ ¥397,971) and **8.5%** for 青森市 (¥25,921 ÷ ¥306,603).

## 3. Wiring — PASS

- The tools hub has a 2025 household-survey card linking to `./household-survey/`. The parsed sitemap contains **17 entries and 17 unique URLs**, including `https://okanekangaesugi.com/tools/household-survey/`. The `regional` theme in `content-index.json` includes `TOOL-HOUSEHOLD-SURVEY` with the same URL.
- The combined file lists from both commits contain only `content-index.json`, `sitemap.xml`, `tools/index.html`, `tools/regional/index.html`, and the new `tools/household-survey/index.html`. The only simulator pages touched were the two under review.
