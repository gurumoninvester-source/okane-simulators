# お金を考えすぎる会社員 — Webサイト

静的サイト（ビルドなし）。Cloudflare Pages にそのままデプロイする。

## 構成
- `/` トップ
- `/tools/` 道具箱ハブ
- `/tools/pension/` 年金受給タイミング（検証済み・既存公開版を移植、計算ロジック変更禁止）
- `/tools/kodomo-nisa/` こどもNISA × 児童手当（同上）
- `/tools/furusato/` ふるさと納税（同上）
- `/tools/securities/` 証券口座 生存＆出口診断（同上）
- `/stories/` お金の物語（住宅編・ロック済み数値のみ掲載）
- `/about/` / `/privacy/`

## ローカルプレビュー
```
python3 -m http.server 8788 --directory .
# http://localhost:8788/
```

## Cloudflare Pages 設定
- Framework preset: None / Build command: なし / Output: `/` (root)
- 既存の GitHub Pages 版 (okane-simulators) は移行完了まで併存させる。
