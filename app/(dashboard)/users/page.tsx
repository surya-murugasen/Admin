import Link from 'next/link'
import { Plus, Users as UsersIcon } from 'lucide-react'
import { DataService } from '@/lib/data-service'

export default async function UsersPage() {
  const users = await DataService.getUsers()

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Users</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage system access and admin users</p>
        </div>
        <Link href="/users/new" className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          Add User
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col p-8 text-center text-slate-500">
        <UsersIcon className="w-12 h-12 mx-auto mb-4 text-slate-300 dark:text-slate-700" />
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">User Management Active</h2>
        <p className="max-w-md mx-auto">There are currently {users.length} registered admins. Click "Add User" to create a new administrative account.</p>
      </div>
    </div>
  )
}
