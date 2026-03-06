# 📊 PT. Twin Capital - Master Plan (v2)

## 🎯 Vision 12 Bulan

Menjadi **institutional-grade fund management** dengan:
- Stabilitas return bulanan
- Risk control yang strict
- Personal brand yang strong
- Siap menerima investor external

---

## 1️⃣ Executive Overview Metrics

| Metric | Definisi | Target 12 Bulan |
|--------|----------|-----------------|
| **Total Company Equity** | Total AUM semua divisi | $10,000+ |
| **Monthly Growth** | Return bulanan | 3-8%/bulan |
| **Max Drawdown** | Penurunan max dari peak | ≤20% |
| **Cashflow (30d)** | Net cash flow 30 hari | Positif |
| **Active Units** | Jumlah bot/unit aktif | 5-10 |
| **Risk Status** | Status risiko keseluruhan | NORMAL |

---

## 2️⃣ Risk Control Center (WAJIB)

| Metric | Definisi | Threshold |
|--------|----------|-----------|
| **Daily Risk Used** | Risk yang dipakai hari ini | Max 3% |
| **Max Allowed DD** | Batas max drawdown | 20% |
| **Current DD** | Drawdown saat ini | < 20% |
| **Kill Switch** | Auto-stop jika DD > 20% | OFF (manual) |
| **VaR** | Value at Risk | < 5% |
| **Capital Reserve** | Cadangan modal | > 10% |

### Kill Switch Logic:
```
IF currentDrawdown > maxAllowedDD:
    FREEZE all trading bots
    ALERT Komisaris
    AWAIT manual review
```

---

## 3️⃣ Financial KPIs (12 Bulan)

| KPI | Target | Current |
|-----|--------|---------|
| Monthly Net Return | 3-8% | 2.5% |
| Max Drawdown | ≤20% | 7.8% |
| Sharpe Ratio | >1.5 | TBD |
| Risk of Ruin | <5% | TBD |
| Capital Growth Rate | Konsisten | - |
| AUM Growth | $1,000 → $10,000 | $1,350 |

---

## 4️⃣ Business KPIs

| KPI | Target |
|-----|--------|
| AUM Growth | 10x dalam 12 bulan |
| Cashflow Stability | 80% bulan profit |
| Affiliate Revenue | $100/bulan |
| Cost Efficiency | <10% dari revenue |

---

## 5️⃣ Divisi Trading Metrics

### Mandatory Fields:

| Field | Definisi |
|-------|----------|
| Capital Allocated | Modal yang dialokasikan |
| Realized PnL | Profit yang sudah terealisasi |
| Unrealized PnL | Profit yang masih running |
| Rolling 7d Return | Return 7 hari terakhir |
| Rolling 30d Return | Return 30 hari terakhir |
| Max DD | Max drawdown divisi ini |
| Win Rate | Rasio win/loss |
| Profit Factor | Total win / Total loss |
| Average R Multiple | Rata-rata R (risk reward) |
| Exposure per Asset | % modal per aset |

### Status:
- ✅ ACTIVE
- ⏸ PAUSED
- 🔍 UNDER REVIEW

---

## 6️⃣ Divisi Media & Branding Metrics

| Metric | Definisi | Target |
|--------|----------|--------|
| Followers Growth Rate | Pertumbuhan follower/bulan | +500 |
| Engagement Rate | (interaksi / follower) | >5% |
| Content Frequency | Post per minggu | 7-14 |
| Revenue per Post | Pendapatan per konten | $5+ |
| Conversion Rate | Click → Buy | >2% |
| Cost per Acquisition | Biaya dapat 1 customer | <$10 |

---

## 7️⃣ Divisi Risk Management Metrics

| Metric | Definisi |
|--------|----------|
| Daily Risk Used | % risk harian |
| Portfolio Correlation | Korelasi antar posisi |
| VaR | Value at Risk |
| Kill Switch Status | Status auto-stop |
| Capital Reserve % | % modal yang dihold |

**Note:** Divisi ini tidak bisa di-override oleh bot. Hardcoded rules.

---

## 8️⃣ Database Schema (Simplified)

### Core Tables:

```
users
├── id
├── name
├── email
├── role (COMMISSIONER, DIRECTOR, BOT)
└── created_at

divisions
├── id
├── name (TRADING, MEDIA, RESEARCH, RISK_MANAGEMENT)
├── capital_allocated
├── status (ACTIVE, PAUSED, UNDER_REVIEW)
└── created_at

bots
├── id
├── name
├── division_id
├── strategy_type
├── capital_allocated
├── status (ACTIVE, PAUSED, STOPPED)
└── created_at

trades
├── id
├── bot_id
├── symbol
├── side (LONG, SHORT)
├── entry_price
├── exit_price
├── position_size
├── pnl
├── risk_percent
└── timestamp

daily_performance
├── id
├── division_id
├── date
├── equity
├── return_percent
├── drawdown
├── realized_pnl
├── unrealized_pnl
├── cashflow_30d
└── created_at

company_performance
├── id
├── date
├── total_equity
├── monthly_return
├── max_drawdown
├── current_drawdown
├── cashflow_30d
├── risk_used
├── risk_status (NORMAL, CAUTION, CRITICAL, KILL_SWITCH)
├── aum_growth
├── active_units
└── created_at

social_metrics
├── id
├── platform
├── date
├── followers
├── followers_growth
├── engagement_rate
├── content_frequency
├── affiliate_revenue
├── revenue_per_post
├── conversion_rate
└── created_at

audit_log
├── id
├── action
├── entity
├── entity_id
├── details (JSON)
└── created_at
```

---

## 9️⃣ Governance Layer

### Principles:
1. **Immutable Audit Log** - Semua aksi direkam
2. **Performance Transparency** -数据 bisa diaudit
3. **Risk Policy Hardcoded** - Tidak bisa di-override bot
4. **Manual Override** - Komisaris bisa stop kapan saja
5. **Capital Protection First** - Selalu preserve modal

### Decision Tree:
```
Loss > 3% dalam 1 hari?
  → WARNING ke Komisaris
  → Review strategi

Loss > 7% dalam 1 minggu?
  → PAUSE semua bot trading
  → Meeting evaluasi

Drawdown > 20%?
  → KILL SWITCH activate
  → Semua posisi close
  → Wait manual approval
```

---

## 10️⃣ UI/UX Principles

### Style:
- **Dark theme** - Professional, less eye strain
- **Muted colors** - No flashy trading style
- **Clean typography** - Inter font
- **Institutional feel** - Bukan retail trader

### Color Palette:
| Usage | Color |
|-------|-------|
| Background | #0a0a0f |
| Surface | #12121a |
| Border | #252530 |
| Primary | #3b82f6 (Blue) |
| Success | #22c55e (Green) |
| Danger | #ef4444 (Red) |
| Warning | #f59e0b (Amber) |

---

*Approved by: Komisaris*
*Version: 2.0*
*Last Updated: 2026-03-06*
