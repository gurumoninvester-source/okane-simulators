# Codex review #6 — DEV-008/009 theme cross-link and content index

**Overall PASS.** All five checks passed against the uncommitted working tree and the runtime CSVs.

1. **PASS — JSON validity and schema sanity.** `content-index.json` parses without duplicate object keys and declares schema `okane.content-index.v1`. Its five theme IDs and five page IDs are unique within their respective sets. All 10 URL entries (six distinct URLs) are well-formed absolute HTTPS URLs. The five site routes resolve to tracked files in the repo: `stories/index.html` and `tools/{pension,kodomo-nisa,furusato,securities}/index.html`.
2. **PASS — Published material and public URLs.** The JSON contains one video, `EP3`, the sole `PUBLISHED` asset in `video_catalog.csv`. Its URL and publication date (`2026-11-19`) match the catalog. The four held assets (`VID-HOUSING-CH1`, `VID-HOUSING-CH2`, `REGION`, `INVEST`) are absent. Every URL uses the public site or Instagram host. The JSON contains no Drive URLs or local paths.
3. **PASS — Claim IDs.** All ten IDs below appear in the `claim_id` column of `claim_sources.csv`.

   | Theme | Verified claim IDs |
   | --- | --- |
   | Housing | `CLM-HOUSING-01` |
   | Pension | `CLM-PENSION-01`, `CLM-PENSION-02`, `CLM-PENSION-03`, `CLM-PENSION-04` |
   | Kodomo | `CLM-KODOMO-01`, `CLM-KODOMO-02` |
   | Furusato | `CLM-FURUSATO-01` |
   | Securities | `CLM-SEC-01`, `CLM-SEC-02` |

4. **PASS — Stories cross-link.** `git diff -- stories/index.html` shows one added line at line 88 immediately after the intro paragraph, with zero deletions and no other hunks. Its `href`, `https://www.instagram.com/reel/Df5xKEXDuIB/`, exactly matches the catalog's `public_url` for `EP3`, including the trailing slash. The staged diff is empty.
5. **PASS — Simulator files.** `git diff --stat` reports only `stories/index.html` (one insertion). None of `tools/pension/index.html`, `tools/kodomo-nisa/index.html`, `tools/furusato/index.html`, or `tools/securities/index.html` appears in the staged or unstaged diff.
