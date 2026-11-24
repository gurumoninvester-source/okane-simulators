# Asset Compass Lite 匿名サンプルの生成スクリプト（PROD-001）
# このデータは実在の個人・世帯の資産ではなく、決定的な式で合成した架空のものです。
# 使い方: python3 sample_data_generator.py → products/index.html に埋め込んだ DATA と一致することを確認できる。
import json, math

def generate():
    rows = []
    cash, fund, stock, other, debt = 2_150_000, 3_400_000, 1_850_000, 620_000, 380_000
    for i in range(24):
        y, m = 2024 + (10 + i) // 12, (10 + i) % 12 + 1  # 2024年11月〜2026年10月
        if i > 0:
            cash += 68_000
            fund += 85_000 + round(42_000 * math.sin(i * 1.7))
            stock += round(28_000 * math.sin(i * 0.9 + 1.2)) + 12_000
            other += 9_000
            debt = max(0, debt - 16_000)
            if i == 13: cash -= 420_000  # 車検・家電の買い替え（架空のイベント）
            if i == 7: fund += 300_000   # ボーナスからの追加投資（架空）
        net = cash + fund + stock + other - debt
        rows.append({"ym": f"{y}年{m}月", "cash": cash, "fund": fund, "stock": stock, "other": other, "debt": debt, "net": net})
    return rows

if __name__ == "__main__":
    print(json.dumps(generate(), ensure_ascii=False))
