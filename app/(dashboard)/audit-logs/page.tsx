import { FileSearch } from 'lucide-react'
import { prisma } from '@/lib/db'

export default async function AuditLogsPage({ searchParams }: { searchParams: { entityType?: string, limit?: string } }) {
  const entityType = searchParams.entityType
  const limit = parseInt(searchParams.limit || '100', 10)

  const logs = await prisma.auditLog.findMany({
    where: entityType ? { entityType } : {},
    include: {
      user: {
        select: { email: true, firstName: true, lastName: true }
      }
    },
    orderBy: { createdAt: 'desc' },
    take: limit
  })

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Audit Logs</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Immutable ledger of system activity</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-500 dark:text-slate-400">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-800 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th scope="col" className="px-6 py-4">Timestamp</th>
                <th scope="col" className="px-6 py-4">User</th>
                <th scope="col" className="px-6 py-4">Action</th>
                <th scope="col" className="px-6 py-4">Entity Type</th>
                <th scope="col" className="px-6 py-4">Entity ID</th>
                <th scope="col" className="px-6 py-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => (
                <tr key={log.id} className="border-b last:border-0 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-6 py-4 whitespace-nowrap text-xs">{new Date(log.createdAt).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    {log.user ? (
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-900 dark:text-white">{log.user.firstName} {log.user.lastName}</span>
                        <span className="text-xs">{log.user.email}</span>
                      </div>
                    ) : (
                      <span className="text-slate-400 italic">System</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded text-xs font-mono">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4">{log.entityType}</td>
                  <td className="px-6 py-4 font-mono text-xs">{log.entityId}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:underline text-xs">View Data</button>
                  </td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center">
                    <FileSearch className="w-12 h-12 mx-auto mb-4 text-slate-300 dark:text-slate-700" />
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No logs found</h2>
                    <p>No activity has been recorded yet.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
