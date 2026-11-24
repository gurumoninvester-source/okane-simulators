# Codex review #17 — focused re-check of the #16 fixes (UX v04 candidate)

You reviewed this branch before (CODEX_REVIEW16.md, in this repo). Four findings were fixed in the commits after 5026f2a (see `git log --oneline 5026f2a..HEAD` and `git diff 5026f2a..HEAD`). Re-check ONLY these points and write CODEX_REVIEW17.md with PASS/FAIL + evidence per point. Do not edit any other file.

1. Stamp: `.stamp[hidden]{display:none}` now exists in stories/index.html and the render handler still toggles `hidden` by age. Confirm the payoff stamp cannot render before age 65.
2. Chapter copy: `chapter(age, p)` branches the chapter-3 (ages 50-64) title/subtitle on `monthlyRent(age, p) > p.rent`. Confirm: flat preset at 50-64 keeps the original copy; rise preset at 50 shows the new copy and it agrees with monthlyRent(50, rise)=85,000 and owner 75,000. Run the page script in Node with DOM stubs if useful, like #16.
3. Fullscreen structure: the stories stageWrap element now contains the playback controls, the chapter jump group, the focus toggles and the gauges (the closing tag moved). Confirm by DOM structure (ids playBtn, ageRange, a [data-ch] button, focusBoth, gRent are descendants of #stageWrap) and that the fullscreen handler still targets #stageWrap.
4. Household bars: tools/household/index.html draw() now also renders per-task bars from the same `v.perTask` values. Confirm the model functions (annualValue, sensitivity) and all previous outputs (totalHours, annual, monthly, rows, sens) are byte-identical in behavior to master; spot-check defaults give annual 3,285,000.
5. Table wrappers: tools/income, tools/household-survey, products and the furusato grid change are markup/CSS only. Confirm no script, number, text content or href changed in those files vs master beyond wrappers, the fullscreen additions already reviewed in #16, and the furusato `minmax(0,1fr)` grid change.

Note: Chromium cannot start in your sandbox (known from #16); viewport measurements were done by the main agent with CDP and are out of scope for this re-check.
