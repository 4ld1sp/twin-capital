'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Shield, 
  Layers,
  Zap,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  Bell,
  Search,
  User,
  Menu,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  Bot,
  DollarSign,
  Percent,
  Activity,
  Target,
  FileText,
  Settings
} from 'lucide-react'
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPie,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts'

// ============== MOCK DATA ==============

const equityData = [
  { date: 'Jan', value: 10000 },
  { date: 'Feb', value: 11500 },
  { date: 'Mar', value: 10800 },
  { date: 'Apr', value: 12500 },
  { date: 'May', value: 14000 },
  { date: 'Jun', value: 13505 },
]

const weeklyData = [
  { day: 'Mon', profit: 120, trades: 3 },
  { day: 'Tue', profit: 80, trades: 2 },
  { day: 'Wed', profit: -40, trades: 4 },
  { day: 'Thu', profit: 200, trades: 5 },
  { day: 'Fri', profit: 150, trades: 3 },
  { day: 'Sat', profit: 90, trades: 2 },
  { day: 'Sun', profit: 45, trades: 1 },
]

const portfolioData = [
  { name: 'BTC', value: 65, color: '#f7931a' },
  { name: 'ETH', value: 20, color: '#627eea' },
  { name: 'SOL', value: 10, color: '#14f195' },
  { name: 'Others', value: 5, color: '#94a3b8' },
]

const recentTrades = [
  { id: 1, symbol: 'BTCUSDT', side: 'long', entry: 73353, current: 73420, pnl: 5.42, status: 'profit' },
  { id: 2, symbol: 'SOLUSDT', side: 'short', entry: 88.50, current: 89.20, pnl: -2.10, status: 'loss' },
  { id: 3, symbol: 'ETHUSDT', side: 'long', entry: 1850, current: 1872, pnl: 12.50, status: 'profit' },
  { id: 4, symbol: 'BNBUSDT', side: 'long', entry: 320, current: 318, pnl: -1.80, status: 'loss' },
]

const divisions = [
  { name: 'Trading', equity: 9000, return: 3.2, bots: 3, color: 'bg-blue-500' },
  { name: 'Media', equity: 2505, return: 8.5, bots: 2, color: 'bg-emerald-500' },
  { name: 'Research', equity: 2000, return: 1.1, bots: 1, color: 'bg-purple-500' },
]

// ============== COMPONENTS ==============

function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("rounded-2xl border border-gray-100 bg-white shadow-sm", className)} {...props}>
      {children}
    </div>
  )
}

function Badge({ className, children, variant = 'default', ...props }: { className?: string; variant?: 'default' | 'success' | 'warning' | 'destructive' | 'outline'; children: React.ReactNode } & React.HTMLAttributes<HTMLSpanElement>) {
  const variants = {
    default: "bg-gray-900 text-white",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border border-amber-200",
    destructive: "bg-red-50 text-red-700 border border-red-200",
    outline: "border border-gray-200 text-gray-600",
  }
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", variants[variant], className)} {...props}>
      {children}
    </span>
  )
}

function StatCard({ title, value, change, changeType, icon: Icon, delay = 0 }: { 
  title: string
  value: string
  change?: string
  changeType?: 'up' | 'down'
  icon: React.ElementType
  delay?: number
}) {
  return (
    <Card className="card-hover p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={cn("text-sm flex items-center gap-1", changeType === 'up' ? "text-emerald-600" : "text-red-600")}>
              {changeType === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {change}
            </p>
          )}
        </div>
        <div className="p-3 rounded-xl bg-gray-50">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </Card>
  )
}

// ============== MAIN COMPONENT ==============

export default function DashboardPage() {
  const [timeframe, setTimeframe] = useState('6M')

  return (
    <div className="min-h-screen bg-gray-50/50 gradient-mesh p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-500 mt-1">Here's what's happening with your fund today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="success" className="gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            All systems operational
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total AUM" value="$13,505" change="+2.5% from last month" changeType="up" icon={Wallet} />
        <StatCard title="Monthly Return" value="+2.5%" change="Target: 3-8%" changeType="up" icon={TrendingUp} />
        <StatCard title="Max Drawdown" value="-7.8%" change="Max: 20%" changeType="down" icon={TrendingDown} />
        <StatCard title="Active Bots" value="6" change="All running" changeType="up" icon={Layers} />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Portfolio Chart */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Portfolio Performance</h3>
              <p className="text-sm text-gray-500">Your fund value over time</p>
            </div>
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
              {['1M', '3M', '6M', '1Y', 'ALL'].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                    timeframe === tf 
                      ? "bg-white text-gray-900 shadow-sm" 
                      : "text-gray-500 hover:text-gray-900"
                  )}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={equityData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'AUM']}
                />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Risk Control */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="h-5 w-5 text-amber-500" />
            <h3 className="text-lg font-semibold text-gray-900">Risk Control</h3>
          </div>
          
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Daily Risk</span>
                <span className="font-medium text-gray-900">1.2% / 3%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '40%' }} />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Drawdown</span>
                <span className="font-medium text-gray-900">7.8% / 20%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '39%' }} />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <p className="text-sm text-gray-500">Capital Reserve</p>
                <p className="text-2xl font-bold text-emerald-600">15%</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Kill Switch</p>
                <Badge variant="outline">OFF</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Divisions */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Divisions</h3>
              <p className="text-sm text-gray-500">Performance by unit</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {divisions.map((div, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={cn("w-3 h-3 rounded-full", div.color)} />
                  <div>
                    <p className="font-medium text-gray-900">{div.name}</p>
                    <p className="text-xs text-gray-500">{div.bots} bots active</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${div.equity.toLocaleString()}</p>
                  <p className={cn("text-sm", div.return >= 0 ? "text-emerald-600" : "text-red-600")}>
                    {div.return >= 0 ? '+' : ''}{div.return}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Allocation */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <PieChart className="h-5 w-5 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900">Allocation</h3>
          </div>
          
          <div className="h-40 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={portfolioData} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={4} dataKey="value">
                  {portfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 space-y-2">
            {portfolioData.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Trades */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Recent Trades</h3>
            <p className="text-sm text-gray-500">Your latest trading activity</p>
          </div>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Side</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Entry</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Current</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">PnL</th>
              </tr>
            </thead>
            <tbody>
              {recentTrades.map((trade) => (
                <tr key={trade.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-4 px-4 font-medium text-gray-900">{trade.symbol}</td>
                  <td className="py-4 px-4">
                    <Badge variant={trade.side === 'long' ? 'success' : 'destructive'}>
                      {trade.side.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-right text-gray-600">${trade.entry.toLocaleString()}</td>
                  <td className="py-4 px-4 text-right text-gray-600">${trade.current.toLocaleString()}</td>
                  <td className="py-4 px-4 text-right">
                    <span className={cn("font-semibold", trade.status === 'profit' ? "text-emerald-600" : "text-red-600")}>
                      {trade.status === 'profit' ? '+' : ''}${trade.pnl.toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 pt-2">
        <button className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition-colors">
          <Zap className="w-4 h-4" />
          New Trade
        </button>
        <button className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <FileText className="w-4 h-4" />
          Generate Report
        </button>
        <button className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <Bot className="w-4 h-4" />
          Manage Bots
        </button>
      </div>
    </div>
  )
}
