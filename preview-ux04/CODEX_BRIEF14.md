# Codex review #14 — product packages (Lite / Pro / AI review)

Read-only review; write your report to CODEX_REVIEW14.md in ~/workspace/okane-website. Do not edit other files.

Packages under review: ~/workspace/okane-sprint-pack/runtime/products/ (MANIFEST.md lists the contents).

Checks:
1. Lite template (lite/asset_compass_lite_template.xlsx): sheets はじめに/設定/月次記録/配当記録 exist; in 月次記録， column G （純資産） must be =SUM(B:E)-F and column H （前月比） =G-G_prev for all 36 rows; in 配当記録， column D must be a running sum of column C.
2. Lite example (lite/asset_compass_lite_example.xlsx): recalculate with LibreOffice headless (soffice --headless --calc --convert-to xlsx) and confirm the computed 純資産 for the first row is 7,640,000, the last row 11,953,613, and the last 前月比 is +233,944.
3. Pro example (pro/asset_compass_pro_example.xlsx): recalculate the same way; 配分チェック shares must sum to 1.0; 目標進捗 must show current net 11,953,613, progress ≈0.5977, remaining 8,046,387 against the 20,000,000 goal.
4. Honesty of claims: MANIFEST.md and the products page (~/workspace/okane-website/products/index.html, latest commit) must not state any price, purchase link, or sales availability; the page must still say items cannot be purchased now. The review pack's EXAMPLE_OUTPUT.md figures must match the trial record in ~/workspace/okane-sprint-pack/runtime/prod002_trial/ (latest-month deltas +233,944 / +217,944 / −16,000).

Report PASS/FAIL per check with evidence.
