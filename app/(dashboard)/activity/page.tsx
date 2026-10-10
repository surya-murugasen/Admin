import { Search, Filter, Download, ChevronLeft, ChevronRight, Eye, FileText } from 'lucide-react'
import { DataService } from '@/lib/data-service'

export const metadata = {
  title: 'Activity Logs | Central Admin',
}

export default async function ActivityLogsPage() {
  const logs = await DataService.getActivityLogs()

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Activity Logs</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">View and track all system activities, user actions and integration events</p>
        </div>
        <button className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
          <Download className="w-4 h-4" />
          Export Logs
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select className="px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-md text-sm outline-none focus:border-primary transition-colors">
              <option>All Types</option>
            </select>
            <select className="px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-md text-sm outline-none focus:border-primary transition-colors">
              <option>All Projects</option>
            </select>
            <select className="px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-md text-sm outline-none focus:border-primary transition-colors">
              <option>All Users</option>
            </select>
            <select className="px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-md text-sm outline-none focus:border-primary transition-colors">
              <option>All Severity</option>
            </select>
            <div className="px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-md text-sm text-slate-500">
              Sep 1, 2026 - Sep 24, 2026
            </div>
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          {logs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <FileText className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No Activity Logs Yet</h3>
              <p className="text-slate-500 dark:text-slate-400">There are no activity logs recorded in the database.</p>
            </div>
          ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-5">#</th>
                <th className="py-3 px-5">Timestamp</th>
                <th className="py-3 px-5">Actor</th>
                <th className="py-3 px-5">Action</th>
                <th className="py-3 px-5">Project</th>
                <th className="py-3 px-5">Severity</th>
                <th className="py-3 px-5 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {logs.map((log: any) => (
                <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-5 text-sm text-slate-500">{log.id.slice(0, 8)}</td>
                  <td className="py-3 px-5 text-sm font-medium text-slate-700 dark:text-slate-300">{new Date(log.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  <td className="py-3 px-5 text-sm font-medium text-slate-900 dark:text-white">{log.user ? `${log.user.firstName || ''} ${log.user.lastName || ''}`.trim() || log.user.email : 'System'}</td>
                  <td className="py-3 px-5 text-sm text-slate-600 dark:text-slate-400">{log.action}</td>
                  <td className="py-3 px-5 text-sm text-slate-600 dark:text-slate-400">{log.entityType} ({log.entityId.slice(0, 8)})</td>
                  <td className="py-3 px-5">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                      Info
                    </span>
                  </td>
                  <td className="py-3 px-5 text-right">
                    <button className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-primary hover:bg-primary/10 rounded transition-colors">
                      <Eye className="w-3 h-3" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-sm text-slate-500">
          <div>Showing 1 to 10 of 142 logs</div>
          <div className="flex items-center gap-1">
            <button className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800"><ChevronLeft className="w-4 h-4" /></button>
            <button className="px-3 py-1 rounded bg-primary text-white font-medium">1</button>
            <button className="px-3 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-slate-700 dark:text-slate-300">2</button>
            <button className="px-3 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-slate-700 dark:text-slate-300">3</button>
            <span className="px-2">...</span>
            <button className="px-3 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-slate-700 dark:text-slate-300">15</button>
            <button className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </div>
  )
}
