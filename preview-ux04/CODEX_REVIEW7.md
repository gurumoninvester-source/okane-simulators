# Codex review #7

Reviewed commit `03ff9584c41dabb3043fb69b5eecea7bab389f7c`. All five checks passed.

## 1. Calculation fidelity — PASS

A unified diff of the extracted `simulate` declarations was empty after removing the pack's `export` keyword. Both use `Math.expm1(Math.log1p(annualPercent / 100) / 12)` for the effective monthly rate, apply growth before adding each month-end deposit, and round each reported balance to the nearest yen while carrying the unrounded balance forward. The input validation is identical, including finite-number checks and the inclusive bounds for initial principal (¥0–¥100,000,000), monthly deposit (¥0–¥1,000,000), duration (0–60 years), and annual rate (−50% to 30%). The first three inputs must be integers.

Node.js ran both implementations with the default initial principal of ¥0. The full monthly result arrays matched exactly for all four cases.

| Monthly deposit | Years | Annual rate | Pack final balance | Page final balance |
| ---: | ---: | ---: | ---: | ---: |
| ¥30,000 | 35 | 4% | ¥26,997,463 | ¥26,997,463 |
| ¥30,000 | 35 | −5% | ¥5,865,329 | ¥5,865,329 |
| ¥50,000 | 20 | 7% | ¥25,376,819 | ¥25,376,819 |
| ¥10,000 | 40 | 0% | ¥4,800,000 | ¥4,800,000 |

## 2. Premise honesty — PASS

The investment page labels the model `仮定モデル` and the output `仮定上の評価額`. The visible assumptions state that the results are neither forecasts nor past performance, exclude taxes, fees, and changes in price levels, and allow negative annual rates. The rate slider reaches −10%. The レバナス note says actual performance will be published only after the fund managers’ net asset value and distribution data have been obtained and verified. The page consistently presents the figures as hypothetical.

## 3. Stories fixes — PASS

The new `:root` declarations map `--accent` to brick `#B55B46` and `--green` to petrol `#315F5B`, matching `--brick` and `--petrol` in `assets/style.css`. The formula `wpct = 2 + pct * 0.96` maps 0–100% to 2–98% and is used only for the two walkers’ CSS `left` values. The full stories diff contains only the color declarations and the walker positioning edit. Age display and financial calculations retain their existing code.

## 4. Hub, sitemap, and content index — PASS

The hub card’s relative link `./investment/` resolves to the same [investment URL](https://okanekangaesugi.com/tools/investment/) used by the sitemap and both the page and tool records in the content index. The sitemap contains exactly 12 URL entries, with investment at position 12. The investment theme has `claims: []` and `videos: []`.

## 5. Existing simulator files — PASS

`git show --stat HEAD` lists five files, with `tools/investment/index.html` as the sole simulator page in the commit. A path-scoped diff against the parent was empty for `tools/furusato/index.html`, `tools/kodomo-nisa/index.html`, `tools/pension/index.html`, and `tools/securities/index.html`.
