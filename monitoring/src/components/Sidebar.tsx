'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  LineChart, 
  Users, 
  Search, 
  FileText, 
  Settings,
  TrendingUp,
  Wallet,
  Bot,
  Shield,
  Activity
} from 'lucide-react'

const navItems = [
  { href: '/', label: 'Overview', icon: LayoutDashboard },
  { href: '/trading', label: 'Trading', icon: LineChart },
  { href: '/social', label: 'Social Media', icon: Users },
  { href: '/research', label: 'Research', icon: Search },
  { href: '/reports', label: 'Reports', icon: FileText },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-white">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900">Twin Capital</h1>
            <p className="text-xs text-gray-500">Fund Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Mini Stats */}
      <div className="absolute bottom-20 left-4 right-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
        <div className="flex items-center gap-2 mb-1">
          <Wallet className="h-4 w-4 text-emerald-600" />
          <span className="text-xs font-medium text-gray-500">Total AUM</span>
        </div>
        <p className="text-xl font-bold text-gray-900">$13,505</p>
        <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
          <TrendingUp className="h-3 w-3" />
          +2.5% this month
        </p>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>v1.0.0</span>
          <span>© 2026 Twin Capital</span>
        </div>
      </div>
    </aside>
  )
}
