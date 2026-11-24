# Codex review #16 — UX v04 candidate branch

Reviewed `git diff master...candidate/ux-v04` from `6ba6935` to `5026f2a`. The merge base is the master tip. Node spot checks ran the committed page scripts with DOM and Fullscreen API stubs.

| Check | Result | Evidence |
|---|---|---|
| 1. Calculation invariance | **PASS** | Compared all ten tools and the stories page. The ten tool sources match master after removing the fullscreen additions and the income breakdown bar markup and drawing code. This preserves the compute functions, defaults, premises, sources, and existing result rendering. Stories retains identical `OWN_COST`, initial state, `params()`, `cum()`, input defaults, gauge math, and premise and source sections. Node returned the same results on both branches in every spot check below. |
| 2. Stories sync | **FAIL** | `stories/index.html:89` sets `.stamp { display:inline-block }`, overriding the browser’s default hiding of the `hidden` stamp before age 65. The handler sets the property correctly at lines 319–321, but the CSS keeps the stamp visible. At age 50 with rising rent, the chapter subtitle says `積み上がる速さは、まだ同じ。` while the monthly amounts are 85,000円 rent and 75,000円 owner and the cumulative difference is already ＋60万円. The subtitle comes from `chapter(age)`, which only receives age. The numeric displays agree with the model in the spot checks below. |
| 3. Diagrams | **PASS** | All 10 tools-hub cards and all 10 homepage tiles linking to a tool contain inline SVGs and visible `概念図` labels. The homepage story card labels the flat-model endpoints 4,950万 and 3,720万, displays the 1,230万円 difference, and says `仮定モデル` in both the caption and the SVG’s accessible label. |
| 4. Fullscreen | **FAIL** | All 10 tool click handlers entered `main` and exited on a second click with a stubbed Fullscreen API. The stories handler did the same for `#stageWrap`. Native fullscreen remains unverified because Chromium could not launch under the sandbox. The structure requirement also fails independently. The stories diff replaces the age-jump row with a chapter group and a separate focus row outside `#stageWrap` (`stories/index.html:186–198`). Income also adds a breakdown bar and legend inside `main` as a separate feature. |
| 5. Links and SEO | **PASS** | Compared hrefs, canonical tags, Open Graph tags, JSON-LD, and external `src` and `href` references on every changed HTML page. No href destination was removed or retargeted. The homepage gains one additional occurrence each of the existing `./stories/` and `./tools/` destinations. Canonical, Open Graph, JSON-LD, and `sitemap.xml` match master. The diff adds no external resources. |
| 6. Widths | **FAIL (unverified)** | Could not measure horizontal overflow for home, the tools hub, or stories at 320, 390, 768, and 1440 CSS pixels. Chromium exited when the sandbox denied socket operations in both the full browser and headless shell. This result records a verification gap. |

## Calculation spot checks

Stories values are cumulative cash spending in 万円, in the order rent / owner / difference.

| Scenario | Master | Candidate |
|---|---|---|
| Stories at 65, flat | 3,150 / 3,150 / 0 | 3,150 / 3,150 / 0 |
| Stories at 85, flat | 4,950 / 3,720 / ＋1,230 | 4,950 / 3,720 / ＋1,230 |
| Stories at 85, rise | 5,700 / 3,720 / ＋1,980 | 5,700 / 3,720 / ＋1,980 |
| Income at defaults, 5,000,000円 gross and age band 40–64 | 手取り 3,873,788円 | 手取り 3,873,788円 |

## Stories display spot checks

The grids use `Math.floor(cumulativeYen / 2500000)`. They rendered 12 / 12 boxes at 65 flat, 19 / 14 at 85 flat, and 22 / 14 at 85 rise. SVG markers decoded to the same cumulative values as the gauges at those three points. At 64, monthly owner spending was the full initial rent-equivalent in both the flat preset (75,000円) and a custom run (120,000円). In both runs it switched to 23,750円 at 65. At 85 in the rise preset, rent was 100,000円 and owner spending was 23,750円.
