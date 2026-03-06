import type { Metadata } from 'next'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'Twin Capital | Dashboard',
  description: 'PT. Twin Capital - Fund Management Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gray-50/50">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Header />
          <main className="p-6 md:p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
