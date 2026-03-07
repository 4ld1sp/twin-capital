# 📊 Trade Data Collection Template

## Columns Description

| Column | Description | Example |
|--------|-------------|---------|
| **#** | Trade number | 1 |
| **Entry Date** | Tanggal entry (YYYY-MM-DD) | 2026-03-07 |
| **Entry Time** | Waktu entry (HH:MM) | 14:30 |
| **Asset** | Symbol trading | BTCUSDT |
| **Entry Price** | Harga masuk | 67500.00 |
| **Exit Price** | Harga keluar | 68000.00 |
| **Position Size** | Size posisi ($ atau qty) | $100 |
| **Position Qty** | Jumlah coin | 0.0015 BTC |
| **Side** | LONG / SHORT | LONG |
| **Leverage** | Leverage used | 5x |
| **Profit/Loss ($)** | Profit/loss dalam USDT | +5.00 |
| **Profit/Loss (%)** | Profit/loss dalam % | +5.00 |
| **Timeframe** | TF: 15m, 1H, 4H, 1D | 4H |
| **Market Condition** | Trending / Ranging / Volatile | Trending |
| **Signal** | Sinyal entry | MA Cross |
| **Notes** | Catatan tambahan | Breakout resistance |
| **Status** | WIN / LOSS / OPEN | WIN |

---

## CSV Format

```csv
#,Entry Date,Entry Time,Asset,Entry Price,Exit Price,Position Size,Position Qty,Side,Leverage,Profit/Loss ($),Profit/Loss (%),Timeframe,Market Condition,Signal,Notes,Status
1,2026-03-07,14:30,BTCUSDT,67500.00,68000.00,$100,0.0015 BTC,LONG,5x,+$5.00,+5.00,4H,Trending,MA Cross,Breakout above $67K,WIN
2,2026-03-07,15:00,ETHUSDT,3500.00,3450.00,$50,0.014 ETH,SHORT,3x,-$2.50,-5.00,1H,Volatile,RSI Overbought,Reject at resistance,LOSS
```

---

## Market Condition Definitions

- **Trending** — Price moving in clear direction (above/below EMA)
- **Ranging** — Price moving between support/resistance
- **Volatile** — High price swings, uncertain direction

---

## Timeframe Guide

| Code | Name |
|------|------|
| 15m | 15 Minutes |
| 1H | 1 Hour |
| 4H | 4 Hours |
| 1D | Daily |

---

## Signal Types

- MA Cross (Moving Average Crossover)
- RSI Divergence
- Bollinger Band Bounce
- Support/Resistance Break
- Volume Spike
- News Catalyst
- Pattern (Triangle/Flag/Wedge)

---

*Template created for Twin Capital*
