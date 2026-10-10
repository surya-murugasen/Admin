import Sidebar from '../Sidebar'
import Topbar from '../../components/Topbar'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden font-sans w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar isDummyMode={false} />
        <main className="flex-1 overflow-auto p-6 md:p-8">
          <Breadcrumbs />
          {children}
        </main>
      </div>
    </div>
  )
}
