import { Search, Filter, Check, Bell, AlertTriangle, Info, Shield, CheckCircle2, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react'
import { DataService } from '@/lib/data-service'

export const metadata = {
  title: 'Notifications | Central Admin',
}

export default async function NotificationsPage() {
  const notifications = await DataService.getNotifications()

  const getIcon = (type: string) => {
    if (type.includes('Alert') || type.includes('Failed')) return <div className="w-6 h-6 rounded bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center"><AlertTriangle className="w-3 h-3"/></div>
    if (type.includes('Security')) return <div className="w-6 h-6 rounded bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center"><Shield className="w-3 h-3"/></div>
    if (type.includes('System') || type.includes('Update')) return <div className="w-6 h-6 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center"><Info className="w-3 h-3"/></div>
    return <div className="w-6 h-6 rounded bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center"><CheckCircle2 className="w-3 h-3"/></div>
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Notifications</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">View system notifications, alerts and important updates</p>
        </div>
        <button className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
          <Check className="w-4 h-4" />
          Mark All Read
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg self-start sm:self-auto overflow-x-auto w-full sm:w-auto">
            <button className="px-3 py-1.5 text-xs font-medium rounded-md transition-colors bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm whitespace-nowrap">
              All (12)
            </button>
            <button className="px-3 py-1.5 text-xs font-medium rounded-md transition-colors text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white whitespace-nowrap">
              Unread (4)
            </button>
            <button className="px-3 py-1.5 text-xs font-medium rounded-md transition-colors text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white whitespace-nowrap">
              System (5)
            </button>
            <button className="px-3 py-1.5 text-xs font-medium rounded-md transition-colors text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white whitespace-nowrap">
              Integration (4)
            </button>
            <button className="px-3 py-1.5 text-xs font-medium rounded-md transition-colors text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white whitespace-nowrap">
              Security (2)
            </button>
            <button className="px-3 py-1.5 text-xs font-medium rounded-md transition-colors text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white whitespace-nowrap">
              Updates (1)
            </button>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search notifications..." className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-md text-sm outline-none focus:border-primary transition-colors" />
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Bell className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No Notifications</h3>
              <p className="text-slate-500 dark:text-slate-400">You're all caught up! There are no new notifications.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-5 w-12">#</th>
                  <th className="py-3 px-5">Type</th>
                  <th className="py-3 px-5">Title</th>
                  <th className="py-3 px-5">Message</th>
                  <th className="py-3 px-5">Project</th>
                  <th className="py-3 px-5">Status</th>
                  <th className="py-3 px-5">Time</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {notifications.map((notif: any) => (
                  <tr key={notif.id} className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${notif.status === 'Unread' ? 'bg-slate-50/50 dark:bg-slate-800/20' : ''}`}>
                    <td className="py-3 px-5 text-sm text-slate-500">{notif.id}</td>
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-2">
                        {getIcon(notif.type)}
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{notif.type}</span>
                      </div>
                    </td>
                    <td className={`py-3 px-5 text-sm ${notif.status === 'Unread' ? 'font-bold text-slate-900 dark:text-white' : 'font-medium text-slate-700 dark:text-slate-300'}`}>
                      {notif.title}
                    </td>
                    <td className="py-3 px-5 text-sm text-slate-600 dark:text-slate-400 truncate max-w-[250px]">{notif.msg}</td>
                    <td className="py-3 px-5 text-sm text-blue-600 dark:text-blue-400">{notif.project}</td>
                    <td className="py-3 px-5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        notif.status === 'Unread' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      }`}>
                        {notif.status}
                      </span>
                    </td>
                    <td className="py-3 px-5 text-sm text-slate-500 whitespace-nowrap">{notif.time}</td>
                    <td className="py-3 px-5 text-right">
                      <button className="p-1 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-400 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-sm text-slate-500">
          <div>Showing 1 to {notifications.length} of {notifications.length} notifications</div>
          <div className="flex items-center gap-1">
            <button className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800"><ChevronLeft className="w-4 h-4" /></button>
            <button className="px-3 py-1 rounded bg-primary text-white font-medium">1</button>
            <button className="px-3 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-slate-700 dark:text-slate-300">2</button>
            <span className="px-2">...</span>
            <button className="px-3 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-slate-700 dark:text-slate-300">10</button>
            <button className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </div>
  )
}
