# 🏢 Twin Capital Dashboard

Fund Management Dashboard built with Next.js 14, React, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup database
cp .env.example .env
# Edit .env with your database URL

# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Start development server
npm run dev
```

Visit http://localhost:3000

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Dashboard overview
│   ├── trading/           # Trading page
│   ├── social/            # Social media page
│   ├── research/          # Research page
│   ├── reports/           # Reports page
│   └── settings/         # Settings page
├── components/            # Reusable components
│   ├── Sidebar.tsx
│   ├── Header.tsx
│   └── ...
├── lib/                   # Utilities & helpers
└── types/                 # TypeScript types
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL + Prisma ORM
- **Charts**: Recharts
- **State**: Zustand + TanStack Query
- **Auth**: NextAuth.js

## 📊 Features

- [ ] Real-time trading positions & P&L
- [ ] Performance analytics & charts
- [ ] Social media metrics tracking
- [ ] Backtest results management
- [ ] Automated reporting
- [ ] Multi-account support
- [ ] API key management

## 🔧 Environment Variables

See `.env.example` for required variables.

## 📄 License

MIT © 2026 Twin Capital
