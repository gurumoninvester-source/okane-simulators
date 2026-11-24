# Codex review #18 — UX05 port

Reviewed `candidate/ux-v05` at `c4d27d3` against `7b734ab` (the tip of `candidate/ux-v04`). Four checks passed and one failed. Live rendering was outside this review's scope.

## 1. Pack fidelity — PASS

Both repository files matched the extracted pack byte for byte with `cmp`. SHA-256 matched for each pair.

| Asset | SHA-256 in both locations |
| --- | --- |
| `ux05.css` | `1ae8d82f5a914921b04587c432dc7a54d2e786bbd6c2d01cf8ca6f88d9089a9d` |
| `ux05.js` | `f60a92f4a9317c00573d5b41c5403f641cd7801683b35f9b4328c76b7d093736` |

## 2. Cards — PASS

In Node, I ran the pack's `mountCards` and its catalog generators against a DOM stub seeded from the pre-port anchors. The serialized result matched both committed containers after removing indentation between elements. The comparison covered exact hrefs, card classes, complete SVG markup, titles, questions, verbs, metadata and the caption 図は機能を示す概念図です。.

Both pages order their ten shared cards as investment, income, pension, kodomo-nisa, household, regional, regional-wages, household-survey, furusato and securities. The home page then adds products, note and methodology for 13 total. The tools hub preserved all ten `.verified` texts as `.ux05-meta`. The pre-port home cards contained zero `.verified` texts.

## 3. Calculation invariance — PASS

The full branch diff touches three pages: `index.html`, `tools/index.html` and `stories/index.html`. The other changed paths are the two added UX05 assets and the review brief.

On the stories page, the source of `params()`, `cum()`, `chapter()`, `monthlyRent()` and the `OWN_COST` declaration matched byte for byte. The why-text logic, miles table markup and row generation, premises, sources and related links also matched. On the home and tools pages, removing the respective card regions and the new stylesheet link left byte-identical content, including the metadata, canonical links, OGP, JSON-LD and other sections.

## 4. Stories wiring — FAIL

The expand button and Escape close leave playback running. In a Node stub, I started playback, clicked `#expandBtn` and pressed Escape. The interval remained active through both operations. The handlers at `stories/index.html:294` and `:295` call `setExpand()` without stopping playback.

- The stub captured all 56 timeline rows, one per age from 30 through 85, and verified the current age at each playback step. Every row matched the fixed, rising and tested custom model (82,000 yen starting rent and a 7,000 yen increase per decade). The pack's actual `renderTimeline` accepted those inputs.
- Playback used 450 ms intervals, held ages 40, 50, 65 and 75 for three additional ticks each and stopped at the end. Play/pause, the age slider, both one-year buttons, all six chapter jumps, all three presets and both custom sliders stopped active playback. Reduced-motion mode stepped through scenes without starting an interval and wrapped from age 85 to 30.
- Expansion toggled `.ux05-expanded` and `aria-expanded`. Escape closed the stage, returned focus to the expand button and restored the saved scroll position in the stub. The removed stage, life-row, grid, chart, payoff stamp, fullscreen and focus-mode IDs had no remaining references.

## 5. Reference appearance — PASS (structural card checks)

The home page meets the reference's 13-card assertion. The hub contains the specified ten-card subset. Both use direct `.ux05-card` anchors under `.ux05-cards`, with 積立投資 and 年収と手取り first. Every card SVG has `viewBox="0 0 150 105"`. The shipped stylesheet declares `border:1px solid #D8D4C9` and `transform:none` on the card selector, and `aspect-ratio:150/105` on the figure selector. The migrated anchors omit the legacy classes that would apply the old borders and rotation. Viewport overflow and computed styles are browser assertions and were outside this structural check.

Stories stage differences from `preview.html`:

| Difference | Assessment |
| --- | --- |
| Fixed, rising and custom conditions sit above the timeline, with both custom inputs. The preview has two presets below the timeline. | Preserved site controls, moved inside the stage so they remain available when expanded. |
| The large age, numbered chapter, heading and explanation use the existing chapter content. The preview uses a shorter age and scene heading with demo copy. | Preserved chapter presentation and model-specific explanations. |
| The playback control retains the site's walking and stop labels, one-year buttons and age readout. Six chapter jumps appear on their own row, including the preview's 65 and 85 shortcuts. | Preserved navigation and playback controls. |
| Totals specify the cutoff age, the signed difference has a direction message, and monthly amounts explain rent, repayment and ownership costs. Live status is retained. The demo's assumptions paragraph is replaced by the existing premises and source material below the stage. | Preserved production context and accessibility, with clearer timing labels. |
| The expand control sits in the chapter header and retains the previous site's 2px border, white fill and compact padding. Its nested placement bypasses the pack's direct-child button selector, including its 44px minimum height. | Header placement preserves the previous site layout. The missing reference sizing is a styling divergence beyond that placement. |
| The expand label changes, and closing explicitly restores focus and scroll. Opening or closing while walking leaves playback active. | Focus and scroll restoration implement the port requirements. The playback exception is unintended under check 4. |
