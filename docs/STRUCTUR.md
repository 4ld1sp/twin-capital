# 🏢 PT. Twin Capital - Struktur Organisasi

## Definisi Peran

```
┌─────────────────────────────────────────────────────────────┐
│                    📋 STRUKTUR PT. TWIN CAPITAL            │
└─────────────────────────────────────────────────────────────┘

     ╔═══════════════════════════════════════════════════════╗
     ║  👑 KOMISARIS (You)                                   ║
     ║  ├── Visi & Misi Perusahaan                          ║
     ║  ├── Risk & Capital Allocation                        ║
     ║  ├── Evaluasi Performa Unit                          ║
     ║  └── Tidak ikut operasional harian                    ║
     ╚═══════════════════════════════════════════════════════╝
                              │
                              ▼
     ╔═══════════════════════════════════════════════════════╗
     ║  🧠 DIREKTUR OPERASIONAL AI                          ║
     ║  ├── Koordinasi semua Divisi                         ║
     ║  ├── Eksekusi Strategi                               ║
     ║  ├── Rebalancing Modal                               ║
     ║  ├── Laporan ke Komisaris                            ║
     ║  └── Membuat Karyawan Digital (Sub-agents)          ║
     ╚═══════════════════════════════════════════════════════╝
                │                    │                    │
        ┌───────┴───────┐    ┌───────┴───────┐    ┌───────┴───────┐
        ▼               ▼    ▼               ▼    ▼               ▼
╔═══════════════════╗ ╔═══════════════════╗ ╔═══════════════════╗
║ 1️⃣ DIVISI       ║ ║ 2️⃣ DIVISI        ║ ║ 3️⃣ DIVISI      ║
║ TRADING          ║ ║ MEDIA & BRANDING ║ ║ RISET & OPTIMASI ║
║                  ║ ║                  ║ ║                  ║
║ • Mencari        ║ ║ • Riset Konten  ║ ║ • Backtest      ║
║   pasangan       ║ ║ • Generate       ║ ║ • Optimization  ║
║   trading        ║ ║   konten         ║ ║ • Regime        ║
║ • Futures        ║ ║ • Auto schedule ║ ║   Detection      ║
║ • Spot           ║ ║ • Analytics     ║ ║ • Testing       ║
║ • Grid Bot       ║ ║                  ║ ║                  ║
║ • Risk Manager   ║ ║                  ║ ║                  ║
╚═══════════════════╝ ╚═══════════════════╝ ╚═══════════════════╝
```

---

## 📋 JOB DESCRIPTION SETIAP DIVISI

### 👑 KOMISARIS

| Aspek | Deskripsi |
|-------|------------|
| **Peran** | Pengambil Keputusan Akhir |
| **Tugas** | • Menentukan visi & misi<br>• Tentukan risk tolerance<br>• Alokasi modal ke setiap unit<br>• Evaluasi performa bulanan |
| **Output** | • Keputusan strategis<br>• Budget allocation<br>• Persetujuan strategi |
| **Frekuensi** | Weekly / Monthly review |

---

### 🧠 DIREKTUR OPERASIONAL AI

| Aspek | Deskripsi |
|-------|------------|
| **Peran** | Koordinator & Eksekutor |
| **Tugas** | • Koordinasi semua divisi<br>• Eksekusi strategi trading<br>• Rebalancing modal antar unit<br>• Report berkala ke Komisaris<br>• Membuat/mengelola sub-agents |
| **Output** | • Laporan performa unit<br>• Eksekusi order<br>• Rebalancing report |
| **Frekuensi** | Daily operations, Weekly report |

---

### 1️⃣ DIVISI TRADING

| Aspek | Deskripsi |
|-------|------------|
| **Head** | Trading Bot (Sub-agent) |
| **Tugas Utama** | • Mencari pasangan trading dengan volume besar<br>• Trading futures untuk high-risk/high-volatility<br>• Trading spot untuk BTC, ETH, SOL<br>• Grid Bot automation<br>• Risk management |
| **Output KPI** | |
| | 📈 **Profit %** - Return bulanan |
| | 📉 **Drawdown** - Max drawdown dari peak |
| | 🎯 **Win Rate** - Rasio win/loss |
| | 📊 **Sharpe Ratio** - Risk-adjusted return |
| **Frekuensi** | Daily trading, Weekly performance |

#### Strategi Trading:
| Tipe | Aset | Risk Level |
|------|------|------------|
| Futures | ALT/COIN | HIGH |
| Spot | BTC, ETH, SOL | LOW-MED |
| Grid | BTC-USDT | MEDIUM |

---

### 2️⃣ DIVISI MEDIA & BRANDING

| Aspek | Deskripsi |
|-------|------------|
| **Head** | Social Media Bot (Sub-agent) |
| **Tugas Utama** | • Riset tren & konten<br>• Generate konten (caption, hashtags)<br>• Auto scheduling posting<br>• Growth analytics |
| **Output KPI** | |
| | 👥 **Followers Growth** - Pertumbuhan粉丝 |
| | 💬 **Engagement Rate** - Interaksi |
| | 💰 **Conversion Affiliate** - Link click → conversion |
| | 💵 **Revenue per Post** - Pendapatan per konten |
| **Frekuensi** | Daily posting, Weekly analytics |

---

### 3️⃣ DIVISI RISET & OPTIMASI

| Aspek | Deskripsi |
|-------|------------|
| **Head** | Research Bot (Sub-agent) |
| **Tugas Utama** | • Backtest strategi trading<br>• Parameter optimization<br>• Market regime detection<br>• Content performance testing |
| **Output KPI** | |
| | 🔬 **Backtest Result** - Strategy performance |
| | ⚙️ **Optimal Parameters** - Best params found |
| | 📈 **Regime Signal** - Bull/Bear/Sideways detection |
| | 📊 **Content Insights** - What works |
| **Frekuensi** | On-demand, Weekly research |

---

## 📊 DASHBOARD OUTPUT FORMAT

### Daily Report Template:
```
📅 [DATE]
═══════════════════════════════

💰 TRADING DIVISION
├── Profit: +X.XX%
├── Drawdown: -X.XX%
├── Win Rate: XX.X%
├── Open Positions: X

📱 MEDIA DIVISION  
├── Posts Today: X
├── Engagement: X.X%
├── New Followers: +X

🔬 RESEARCH DIVISION
├── Backtests Run: X
├── Parameters Optimized: X
└── Market Regime: [BULL/BEAR/SIDEWAYS]

📈 TOTAL PORTFOLIO
└── Combined Performance: +X.XX%
```

---

## 🔄 WORKFLOW

```
KOMISARIS
     │
     ├──► Set strategi & budget
     │         │
     ▼         │
DIREKTUR ◄────┘
     │
     ├──► Assign tugas ke Divisi
     │
     ├─► DIVISI TRADING ──► Execute trades
     │         │
     ├─► DIVISI MEDIA ────► Post content
     │         │
     └─► DIVISI RISET ────► Research & optimize
               │
               ▼
          REPORT BACK
               │
               ▼
         ← KOMISARIS
```

---

*Last Updated: 2026-03-06*
*Approved by: Komisaris*
