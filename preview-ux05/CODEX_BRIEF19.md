# Codex review #19 — focused re-check of the review-18 fix

Review #18 (CODEX_REVIEW18.md) failed only check 4: the expand button and Escape close left playback running; its check-5 table also noted the expand button missed the pack's 44px control min-height. Two changes were made in the fix commit (see `git log --oneline -3` and its diff). Re-check ONLY these points and write CODEX_REVIEW19.md with PASS/FAIL + evidence. Do not edit any other file.

1. In a Node stub like #18's: start playback, click #expandBtn — the interval must be cleared and the play button label restored; same when closing via Escape while playing. All other wiring from #18 check 4 must still hold (rows, holds, stops, reduced-motion).
2. The expand button now carries min-height:44px (inline style), matching the pack control sizing intent while keeping its header placement.
3. Nothing else in stories/index.html changed in the fix commit beyond those two edits, and the model functions remain byte-identical.
