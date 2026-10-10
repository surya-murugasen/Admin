import { Plus, Key } from 'lucide-react'
import { prisma } from '@/lib/db'

export default async function PermissionsPage() {
  const permissions = await prisma.permission.findMany({
    orderBy: [
      { module: 'asc' },
      { name: 'asc' }
    ]
  })

  // Group by module
  const grouped = permissions.reduce((acc, perm) => {
    if (!acc[perm.module]) acc[perm.module] = []
    acc[perm.module].push(perm)
    return acc
  }, {} as Record<string, typeof permissions>)

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Permissions</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Granular access controls registered in the system</p>
        </div>
        <button className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          Add Permission
        </button>
      </div>

      <div className="space-y-6">
        {Object.entries(grouped).map(([module, perms]) => (
          <div key={module} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white capitalize">{module}</h3>
            </div>
            <div className="p-0">
              <table className="w-full text-left text-sm text-slate-500 dark:text-slate-400">
                <tbody>
                  {perms.map(perm => (
                    <tr key={perm.id} className="border-b last:border-0 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-white flex items-center gap-2 w-1/3">
                        <Key className="w-4 h-4 text-slate-400" />
                        {perm.name}
                      </td>
                      <td className="px-6 py-4 w-2/3">{perm.description || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {permissions.length === 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-12 text-center">
            <Key className="w-12 h-12 mx-auto mb-4 text-slate-300 dark:text-slate-700" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No permissions found</h2>
            <p className="text-slate-500">Add permissions to assign them to roles.</p>
          </div>
        )}
      </div>
    </div>
  )
}
