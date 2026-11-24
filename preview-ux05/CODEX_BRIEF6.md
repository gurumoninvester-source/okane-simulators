# Codex review #6 — DEV-008/009 theme cross-link + content-index.json (working tree, uncommitted)

Repo: ~/workspace/okane-website. Read-only review; write your report to CODEX_REVIEW6.md. Do not edit other files.

Changes to review (`git status` / `git diff` + the new untracked content-index.json):
1. content-index.json (new, repo root): public content graph for 5 themes.
2. stories/index.html: one added line linking the published Instagram reel under the intro paragraph.

Checks:
1. JSON validity and schema sanity: unique theme/page ids; every URL well-formed; site URLs correspond to existing routes in this repo.
2. Acceptance "published only": confirm the JSON contains NO unpublished material (the verified catalog ~/workspace/okane-sprint-pack/runtime/video_catalog.csv lists EP3 as the only PUBLISHED item; VID-HOUSING-CH1/CH2, REGION, INVEST are HOLD and must not appear), and NO internal URLs (no drive.google.com links, no local paths).
3. Claims listed per theme exist as claim_ids in ~/workspace/okane-sprint-pack/runtime/claim_sources.csv.
4. stories diff: exactly one added line; the reel URL matches the catalog's public_url for EP3 exactly; no other changes crept in (the file also carries the earlier committed state — use `git diff` to isolate today's change).
5. The 4 simulator files remain untouched in this diff (git diff --stat).

Report PASS/FAIL per check with evidence.
