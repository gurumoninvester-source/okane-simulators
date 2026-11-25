# Codex review #19 — focused re-check of the review #18 fix

**PASS.** All three checks passed for fix commit `89bb440`. The working copy of `stories/index.html` matched the fix commit byte for byte.

## 1. Stories wiring — PASS

- In a Node DOM and timer stub, clicking `#expandBtn` during playback cleared the active interval and changed the play label from `⏸ 止める` to `▶ 歩く`. After restarting playback in the expanded stage, pressing Escape cleared the new interval and restored the same label. Closing with the expand button also stopped playback.
- Expansion and closing updated `.ux05-expanded` and `aria-expanded`. Escape returned focus to the expand button, restored the saved scroll position and released the body scroll lock in the stub.
- The actual pack renderer accepted all 56 timeline rows for ages 30–85. Every row matched independently calculated totals for fixed rent, rising rent and custom rent (¥82,000 initially with a ¥7,000 increase per decade). The timeline received the expected current age at each playback step.
- Playback used a 450 ms interval, held ages 40, 50, 65 and 75 for three additional ticks each, and stopped after reaching age 85. Play/pause, the age slider, both one-year buttons, all six chapter jumps, all three presets and both custom sliders cleared active playback and restored the play label.
- Reduced-motion playback stepped through ages 40, 50, 65, 75 and 85, then wrapped to 30 without creating an interval. The exact source comparison in check 3 also confirms that the removed legacy IDs and references stayed absent.

## 2. Expand button sizing and placement — PASS

The inline style on `#expandBtn` at `stories/index.html:90` now declares `min-height:44px`, matching the button minimum in `assets/ux05.css:14`. The button stays under the scene number in the chapter header. This check used the HTML and CSS source.

## 3. Fix scope and model invariance — PASS

The diff from `89bb440^` to `89bb440` touches only `stories/index.html`. Removing the inline minimum-height declaration and the new `stop()` call at the start of `setExpand()` made the resulting HTML byte-identical to the parent blob. This confirms that `params()`, `cum()`, `chapter()`, `monthlyRent()` and the `OWN_COST` declaration remain byte-identical.
