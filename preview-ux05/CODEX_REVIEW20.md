# Codex review #20 — stories layout final adjustment

**FAIL.** The frozen areas match their baselines. The heading combines the age and title but does not stack them vertically. The screen-reader status can report a stale age when an expand or close action interrupts playback.

Reviewed the working copy at `b05daa8` on `candidate/ux-v05`. Evidence comes from Git byte comparisons, HTML and CSS inspection, and execution of the page script in Node with DOM and timer stubs and the actual `renderTimeline` module. Live Chromium rendering was outside scope.

## 1. Frozen areas — PASS

- `assets/ux05.css` and `assets/ux05.js` match the review #18 commit `2415976` byte for byte. `index.html` and `tools/index.html` match `52e96fe` byte for byte. The diff from `52e96fe` contains only the stories page and the two review documents added since that baseline, `CODEX_REVIEW19.md` and `CODEX_BRIEF20.md`.
- The complete definitions of `params()`, `cum()`, `chapter()` and `monthlyRent()` and the `OWN_COST` declaration match `candidate/ux-v04` byte for byte. `rows56(p)` calls `cum(a, p)` for every integer age from 30 through 85 and passes those 56 rows to `renderTimeline`. All rows matched independently calculated totals for the fixed, rising and custom presets in the Node run. [Model and timeline adapter](stories/index.html#L159)
- The reasons and miles table markup, premises, methodology source link and related links match `52e96fe` byte for byte. The `whyText` and `whyCost` assignments and the nine-age miles table row generator also match that baseline. [Supporting content](stories/index.html#L127) · [Reasons and table generation](stories/index.html#L226)

## 2. Layout and interactions

| Check | Result | Evidence |
| --- | --- | --- |
| 2(a) Age, scene title and explanation | **FAIL (partial)** | The old `.chapter` and `.big-age` markup is gone. One `h2.stage-title` contains `#bigAge` and `#sceneLabel`, separated by the inline text `歳｜`. Both spans are inline and neither `.stage-title` nor `.stage-title #bigAge` forces a vertical stack. The adjacent `#chapterSub` receives only `ch.s`. [Heading CSS](stories/index.html#L43) · [Heading markup](stories/index.html#L85) · [Explanation assignment](stories/index.html#L208) |
| 2(b) Stage order | **PASS** | Source order is the scene number and expand button in `.stage-top`, title, explanation, timeline, cumulative results, difference, monthly amounts, playback controls, presets, then `#moreBox`. The visually hidden live region follows the details. [Stage markup](stories/index.html#L80) |
| 2(c) Collapsed details | **PASS** | `details#moreBox` has no `open` attribute and contains all six chapter jumps and both custom range inputs. Choosing the custom preset sets `moreBox.open = true` and shows `#customBox`. The Node run verified both state changes. [Details markup](stories/index.html#L107) · [Preset handler](stories/index.html#L271) |
| 2(d) Button borders and shadows | **PASS** | The stylesheet block after `ux05.css` declares a 1px border for preset, chapter and playback buttons. The preset rule sets `box-shadow:none`. Active and selected rules preserve the 1px width. `#expandBtn` has the 1px border inline. [Page CSS](stories/index.html#L40) · [Expand button](stories/index.html#L83) |
| 2(e) Existing interactions | **FAIL (partial)** | Playback, age slider, ±1, chapter jumps, presets, custom sliders, and expand and close behavior passed. The `#srStatus` update is missing on the playback interruption path described below. |

### 2(e) Interaction evidence

- Playback ran on 450 ms ticks, held ages 40, 50, 65 and 75 for three extra ticks each, and stopped at 85. Reduced-motion playback stepped through the five subsequent scenes and wrapped to 30 without starting a timer. The age range input, ±1 buttons with endpoint clamps, six chapter jumps, three presets, and both custom input handlers updated state and interrupted playback. Custom values of ¥85,000 and a ¥7,000 increase per decade propagated to the timeline.
- Opening the expanded stage, closing it with its button, and closing it with Escape all stopped playback. The expanded state and `aria-expanded` updated. Escape restored scroll, released the body scroll lock, and focused the expand button in the stub. [Interaction handlers](stories/index.html#L246)
- `#srStatus` is a polite live region. Its age and totals update on initialization, direct control changes, pause, and natural completion. The text stays stable during playback. `setExpand()` calls `stop()` without calling `render()`, which is where `#srStatus` is updated. In the Node run, playback advanced from age 70 to 71 before expansion, then to 72 before Escape closed the stage. After each interruption, `#srStatus` still said age 70 while the stage showed the newer age. The same `setExpand()` path exists in `52e96fe`. [Live region](stories/index.html#L124) · [Status update](stories/index.html#L237) · [Expand and Escape handlers](stories/index.html#L295)
