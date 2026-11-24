# Codex review #7 — stories fixes + investment simulator integration (committed, HEAD)

Repo: ~/workspace/okane-website. Read-only review; write your report to CODEX_REVIEW7.md. Do not edit other files. Inspect the latest commit (git show HEAD).

Scope:
A. stories/index.html changes in HEAD: a `:root` addition defining --accent/--green, and the walker left-position clamp (wpct = 2 + pct*0.96).
B. tools/investment/index.html (new): built from the ChatGPT pack's preview.html + model.mjs (pack at ~/workspace/okane-sprint-pack/pack4/extracted/).
C. tools/index.html (hub card), sitemap.xml (12th URL), content-index.json (investment theme).

Checks:
1. Calc fidelity: the `simulate` function in tools/investment/index.html must be mathematically identical to pack4 model.mjs simulate (same rate conversion, end-of-month deposits, rounding, input domain validation). Diff them and evaluate both on: (30000,35,4), (30000,35,-5), (50000,20,7), (10000,40,0) — final balance must match exactly.
2. Premise honesty on the page: it must state it is a hypothetical model, not a forecast and not past performance; taxes/fees/inflation excluded; negative rates possible; the レバナス note must say real data is not published until obtained and verified. Flag any wording that presents hypotheticals as track record.
3. Stories fixes: confirm --accent/--green values are the brand colors (brick #B55B46 / petrol #315F5B), the clamp only changes walker position (not any number), and no other stories changes crept into HEAD's stories diff.
4. Hub/sitemap/content-index consistency: the investment URL is identical in all three; sitemap has 12 URLs; content-index investment theme lists no claims and no videos.
5. The other 4 simulator files are untouched in HEAD (git show --stat).

Report PASS/FAIL per check with evidence.
