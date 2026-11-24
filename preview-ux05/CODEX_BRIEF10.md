# Codex review #10 — PROD-001 Asset Compass Lite anonymous sample (latest commit)

Repo: ~/workspace/okane-website. Read-only review; write your report to CODEX_REVIEW10.md. Do not edit other files. Inspect the latest commit (git show HEAD).

Checks:
1. Synthetic-only: the sample data in products/index.html is generated from fixed arithmetic in the build (24 monthly rows, fictional household). Confirm no figure on the page is presented as a real person's assets, and the page labels the data as 架空のサンプル in the section heading area, the intro sentence, the chart aria-label, and the table caption.
2. Arithmetic: for every embedded row, net = cash + fund + stock + other − debt. Verify all 24 rows programmatically. Also verify the displayed delta (last net − first net) logic and the CSV export uses the same DATA array.
3. No purchase path: the commit must not add any price, purchase link, payment form, or checkout. The products page must still state that items are not purchasable now and that personal asset data itself is never sold.
4. Scope: the commit changes only products/index.html.

Report PASS/FAIL per check with evidence.
