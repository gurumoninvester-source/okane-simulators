# Code review and independent calculation check

## 1. HTML validity, internal links, and accessibility

- **PASS — HTML structure.** Static inspection found no malformed nesting or duplicate IDs in the four pages. Each declares HTML5 and Japanese, provides a page title and viewport, and uses one H1 followed by H2 section headings. Evidence in each file starts at line 1, with the H1 at `index.html:21`, `tools/index.html:20`, `stories/index.html:20`, and `about/index.html:20`. This was a source inspection.
- **PASS — Internal links.** All 41 local `href` occurrences resolve on disk (15 in `index.html`, 11 in `tools/index.html`, 8 in `stories/index.html`, and 7 in `about/index.html`, including the shared stylesheet on each page at line 11). Directory links resolve to their `index.html`, including the four simulators and the privacy links at `index.html:57`, `tools/index.html:33`, `stories/index.html:48`, and `about/index.html:33`.
- **ISSUE — No main-content landmark or skip link.** The repeated header navigation is followed directly by the H1 at `index.html:18–21`, `tools/index.html:18–20`, `stories/index.html:18–20`, and `about/index.html:18–20`. Wrap the primary content in `<main>` and add a keyboard-accessible skip link to it.
- **ISSUE — Housing tables lack row headers.** The first column identifies the rent and ownership scenarios, but both tables mark those labels as `<td>`. Use `<th scope="row">` so assistive technology can associate each total with its scenario. The top-left cell is also an empty `<th>`. Evidence at `index.html:39–43` and `stories/index.html:26–30`.

## 2. Independent calculation verification

- **PASS — Housing.** At age 65, rent and ownership each total ¥75,000 × 12 × 35 = **¥31,500,000**. Rent through age 85 is ¥75,000 × 12 × 55 = **¥49,500,000**. Post-payoff ownership costs are ¥23,750 × 12 × 20 = **¥5,700,000**, yielding **¥37,200,000** through age 85. The difference is ¥49,500,000 − ¥37,200,000 = **¥12,300,000**. All locked values agree with `stories/index.html:25–31` and the summary at `index.html:38–44`. The payment breakdown also sums to ¥75,000, and discounting 420 monthly payments of ¥51,250 at 3.81% ÷ 12 gives approximately ¥11,878,531, consistent with the stated approximate loan principal of ¥11.88 million.
- **PASS — Pension timing.** The actual function uses `m = (age − 65) × 12` and applies `1 + m × 0.004` for negative `m` and `1 + m × 0.007` otherwise, rounded to six decimal places. This gives **−0.4% per month early** and **+0.7% per month deferred**. At age 60 the factor is **0.76** (−24%), at 65 it is **1.00**, and at 70 it is **1.42** (+42%). Evidence at `tools/pension/index.html:183–186`.
- **PASS — Securities transfer fees.** The code uses the following yen amounts. Evidence at `tools/securities/index.html:316–327`.

  | Broker | Fund per holding | Stock per holding |
  | --- | ---: | ---: |
  | SBI | ¥3,300 | ¥0 |
  | Rakuten | ¥0 | ¥0 |
  | Monex | ¥3,300 | ¥0 |
  | Mitsubishi UFJ e-smart | ¥5,500 | ¥1,100, capped at ¥33,000 total |

  The stock cap yields ¥33,000 at both 30 and 31 holdings. The code waives the Mitsubishi UFJ e-smart fund fee for transfers to Mitsubishi UFJ Morgan Stanley Securities at line 325.

- **PASS — Securities tax.** `TAX = 0.20315` (20.315%) at `tools/securities/index.html:314`. The formula at lines 333–334 yields **¥203,150** on a known positive gain of ¥1,000,000.

## 3. External requests and simulator input data

- **ISSUE — Abacus page-view counter in all four simulators.** Each sends a page-load `fetch` to a fixed `https://abacus.jasoncameron.dev/hit/…` URL with `mode: "no-cors"` and `keepalive: true`. Pension, Furusato, and Securities also have an image-request fallback for synchronous errors. Evidence at `tools/pension/index.html:537–545`, `tools/kodomo-nisa/index.html:385`, `tools/furusato/index.html:13`, and `tools/securities/index.html:13`.
- **PASS — No simulator input transmission found.** The four-file search found the four `fetch` calls above and zero `XMLHttpRequest` or `sendBeacon` matches. Each counter call and image fallback uses a fixed URL with no request body or input-derived parameters. No input-driven external request was identified in the inspected source.
- **PASS — Other external destinations identified.** Google Fonts loads automatically via stylesheet links and preconnects at `tools/pension/index.html:7–9`, `tools/kodomo-nisa/index.html:9–11`, `tools/furusato/index.html:9–11`, and `tools/securities/index.html:9–11`. Furusato also has click-through links to Rakuten, Threads, and note at lines 488, 538, 543, and 554. Securities links to Threads and note at line 304. These use static URLs. The review used local source only and made no network requests.
