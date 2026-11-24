# Codex review brief #4 — okane-website full-site regression (2026-11-24)

Repo: ~/workspace/okane-website (work here). No network. Do not list directories recursively or cat large files wholesale; read the specific files named below.

## Checks
1. Simulator integrity: the 4 files tools/pension/index.html, tools/kodomo-nisa/index.html, tools/furusato/index.html, tools/securities/index.html must be byte-identical to the originals in ~/workspace/your_files/okane-simulators-site/ (same relative paths under tools/). Report md5 for each pair and PASS/FAIL.
2. Meta/OGP: every page in [index.html, stories/index.html, tools/index.html, methodology/index.html, products/index.html, about/index.html, privacy/index.html, 404.html] — check presence of <title>, meta description (where the page pattern uses one), og:title, og:image (all but 404), favicon link. List gaps.
3. Internal links: crawl all local href/src references across all HTML files; report any target that does not exist on disk.
4. products/index.html: confirm there is NO purchase link/button/checkout URL and no price figures displayed. PASS/FAIL with evidence lines.
5. Housing model spot re-verification: in stories/index.html, extract the model constants and formulas. Independently recompute from the spec (NOT by calling the page's functions): rent 75,000/mo; owner monthly = first-month rent (fairness rule); owner cost portion 23,750/mo; repayment = rent − 23,750 until age 65 (months from age 30). Verify cumulative totals at ages 65 and 85 for (a) flat rent: renter 31,500,000 / owner 31,500,000 at 65; renter 49,500,000 / owner 37,200,000 at 85. (b) rent +5,000 every 10 years: renter 34,200,000 at 65; renter 57,000,000 / owner 37,200,000 at 85. Report PASS/FAIL per figure.
6. Accessibility static pass on stories/index.html and index.html: aria-live summary present, focus-visible style present, buttons have text labels, slider has a label. List gaps only.

## Output
Write CODEX_REVIEW4.md in the repo root with one section per check, PASS/FAIL, and evidence. Do not modify any other file.
