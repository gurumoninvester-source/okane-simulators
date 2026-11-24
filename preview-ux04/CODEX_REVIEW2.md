# Independent review

Scope covered the final script and note paragraph in `stories/index.html`, the full top-level `index.html`, and file-existence checks for local targets. The calculations below were recomputed from the specified rates without executing the site’s functions.

| Scenario | Age | Cumulative rent | Cumulative ownership | Rent minus ownership |
|---|---:|---:|---:|---:|
| Both | 30 | ¥0 | ¥0 | ¥0 |
| Base | 65 | ¥31,500,000 | ¥31,500,000 | ¥0 |
| Base | 85 | ¥49,500,000 | ¥37,200,000 | ¥12,300,000 |
| Rising | 65 | ¥34,200,000 | ¥31,500,000 | ¥2,700,000 |
| Rising | 85 | ¥57,000,000 | ¥37,200,000 | ¥19,800,000 |

- **PASS — Base scenario.** Flat rent is ¥75,000 × 12 × years elapsed. Ownership reaches ¥31,500,000 after 35 years and adds ¥23,750 × 12 × 20 through age 85. The script counts elapsed years from age 30 and its base summaries match the recomputed totals.
- **PASS — Rising scenario calculations.** I summed 10 years each at ¥75,000, ¥80,000 and ¥85,000 per month, plus five years at ¥90,000, through age 65. Through age 85 the sum includes the full decade at ¥90,000, another decade at ¥95,000 and five years at ¥100,000. The script applies the same decade increments and its summary totals match.
- **ISSUE — Rising scenario age-65 event note.** The script shows “ここまでは同点” (“tied up to this point”) at age 65 in both scenarios. In the rising scenario, rent is already ¥2,700,000 higher, as the summary immediately below the event logic correctly indicates.
- **PASS — No reversal-at-74 claim in the reviewed text.** No such claim appears in the final script, note paragraph or top page. Other stories markup was outside the requested read scope, so absence across the entire stories page remains unverified.
- **PASS — Expenditure definition and exclusions.** The note calls this a comparison of cumulative cash expenditure and explicitly excludes housing asset value, loan balance, sale price and down payment. It also excludes savings.
- **PASS — Play, pause, reset and slider handlers exist.** The `btnPlay` click handler toggles the playback timer, the `btnReset` click handler stops playback and returns to age 30, and the `ageSlider` input handler stops playback and renders the chosen age.
- **ISSUE — Handler ID existence could not be verified within scope.** The handler references to `btnPlay`, `btnReset` and `ageSlider` are internally consistent with the script’s other uses. Their element declarations and the `.stage` element are in the excluded markup, so no ID mismatch was established and DOM binding remains unverified.
- **PASS — Top-page internal links.** File checks passed for `tools/index.html`, `stories/index.html`, `about/index.html`, `privacy/index.html`, `tools/pension/index.html`, `tools/kodomo-nisa/index.html`, `tools/furusato/index.html` and `tools/securities/index.html`. The `#main` fragment matches `<main id="main">` in the top page. The local stylesheet `assets/style.css` also passed its file check.
