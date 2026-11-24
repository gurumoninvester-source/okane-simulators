# Codex review #16 — UX v04 candidate branch

Read-only review; write your report to CODEX_REVIEW16.md in ~/workspace/okane-website. Do not edit other files. Review branch candidate/ux-v04 against master (git diff master...candidate/ux-v04).

Checks:
1. Calculation invariance: for every simulator page and the stories page, the diff must not change calculation logic, default input values, premises, sources, or result values. Method: compare the pages' compute functions and defaults between branches; then run spot checks in Node or a headless browser: stories at 65 must read 3,150/3,150/0 and at 85 (flat) 4,950/3,720/+1,230 and (rise) 5,700/3,720/+1,980; income at defaults must read 手取り 3,873,788円.
2. Stories sync: chapter title, monthly amounts, box grids (floor of cumulative / 2,500,000), chart endpoints, gauges, and the payoff stamp (visible only at age >= 65) must all derive from the same age/params state. Owner monthly must be the full rent-equivalent before 65 and 23,750 after; rent monthly in the rise preset at 85 must be 100,000.
3. Diagrams: every tools-hub card and every home tool tile carries an SVG diagram labeled 概念図； the home story card chart must use the real flat-model values (4,950 / 3,720 / difference 1,230万円） and say 仮定モデル.
4. Fullscreen: all ten tool pages and the stories stage have a working fullscreen toggle on the main/stage element; no page structure outside that changed.
5. Links and SEO: no href targets changed except added diagram/CTA elements; canonical/OGP/JSON-LD/sitemap identical to master; no new external resources.
6. Widths: no horizontal overflow at 320/390/768/1440 on home, hub, stories (headless check acceptable).

Report PASS/FAIL per check with evidence.
