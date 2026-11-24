# Full-site regression review #4

## 1. Simulator integrity — PASS

All four repository files are byte-identical to their counterparts in the original simulator site, confirmed with `cmp`. The brief's original paths under `tools/` do not exist directly beneath `~/workspace/your_files/okane-simulators-site/`. The original files are one level below that root at the paths shown. The copies under `preview-v1/tools/` also match byte for byte.

| Repository file | Repository MD5 | Original file relative to simulator site root | Original MD5 | Result |
|---|---|---|---|---|
| `tools/pension/index.html` | `ae91f20a02a8eb906bbd2e0876813d26` | `pension/index.html` | `ae91f20a02a8eb906bbd2e0876813d26` | PASS |
| `tools/kodomo-nisa/index.html` | `31089f3d40d810c1960bbcb84f09de79` | `kodomo-nisa/index.html` | `31089f3d40d810c1960bbcb84f09de79` | PASS |
| `tools/furusato/index.html` | `2d1c79dfe1aabd26f1526f32ea895362` | `furusato/index.html` | `2d1c79dfe1aabd26f1526f32ea895362` | PASS |
| `tools/securities/index.html` | `570214c9512ce1b66635ee52e683cbd5` | `securities/index.html` | `570214c9512ce1b66635ee52e683cbd5` | PASS |

## 2. Meta and OGP — FAIL

Numbers identify the source lines. The description check follows the page pattern. The privacy policy uses an OGP description at line 15 and omits the standard meta description. The 404 uses a minimal error-page head and omits the standard description. The brief exempts the 404 from `og:image`.

| Page | Title | Meta description | `og:title` | `og:image` | Favicon | Result |
|---|---:|---|---|---|---:|---|
| `index.html` | 6 | 7 | 23 | 28 | 29 | PASS |
| `stories/index.html` | 6 | 7 | 65 | 70 | 71 | PASS |
| `tools/index.html` | 6 | 7 | 12 | 17 | 18 | PASS |
| `methodology/index.html` | 6 | 7 | 11 | 16 | 17 | PASS |
| `products/index.html` | 6 | 7 | 11 | 16 | 17 | PASS |
| `about/index.html` | 6 | 7 | 12 | 17 | 18 | PASS |
| `privacy/index.html` | 6 | Absent, policy-page pattern | 14 | 19 | 20 | PASS |
| `404.html` | 6 | Absent, error-page pattern | **Missing** | Exempt | 10 | FAIL |

## 3. Internal links — PASS

Parsed all 13 HTML files and checked 78 local `href` and `src` references, including same-origin absolute URLs and same-page fragments. Directory URLs resolved to `index.html`. Every local target exists on disk, and every referenced HTML fragment resolves.

## 4. Product purchase controls and prices — PASS

`products/index.html:32` says the products are unavailable and that pricing and sales terms will be decided after completion and review. Lines 34–37 show product descriptions and preparation or planning statuses, with no price figures. The page's anchors at lines 20–27 and 40 lead to the main content or other site pages. The HTML has no purchase link, purchase button, checkout URL, or form.

## 5. Housing model — PASS

`stories/index.html:177–195` sets the base monthly rent to ¥75,000 and the fixed monthly ownership cost to ¥23,750. The flat preset adds ¥0 per decade and the rising preset adds ¥5,000. The model starts at age 30 and counts completed years up to the selected age. It applies rent increases after each completed decade. Monthly repayment is ¥75,000 − ¥23,750 = ¥51,250 through the 420 months preceding age 65. This makes monthly owner spending equal to first-month rent until age 65, then ¥23,750 per month thereafter. The reported rent increase effect subtracts the cumulative flat-rent baseline from cumulative rent.

Independently summed monthly costs from the brief without calling the page's functions. For elapsed month count `N = 12 × (age − 30)`, renter spending is the sum of `75,000 + rise × floor(m / 120)` for month indexes `m = 0…N−1`. Owner spending is `23,750 × N + 51,250 × min(N, 420)`.

| Scenario | Age | Payer | Expected (¥) | Recomputed (¥) | Result |
|---|---:|---|---:|---:|---|
| Flat rent | 65 | Renter | 31,500,000 | 31,500,000 | PASS |
| Flat rent | 65 | Owner | 31,500,000 | 31,500,000 | PASS |
| Flat rent | 85 | Renter | 49,500,000 | 49,500,000 | PASS |
| Flat rent | 85 | Owner | 37,200,000 | 37,200,000 | PASS |
| Rent rises ¥5,000 per decade | 65 | Renter | 34,200,000 | 34,200,000 | PASS |
| Rent rises ¥5,000 per decade | 85 | Renter | 57,000,000 | 57,000,000 | PASS |
| Rent rises ¥5,000 per decade | 85 | Owner | 37,200,000 | 37,200,000 | PASS |

## 6. Static accessibility — FAIL

- `index.html` has no explicit `:focus-visible` style in its inline styles or its linked stylesheet (`index.html:11`, `assets/style.css`). The shared stylesheet has a `.skip:focus` rule at line 33.
