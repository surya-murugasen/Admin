import Link from 'next/link'
import { Plus, Shield } from 'lucide-react'
import { prisma } from '@/lib/db'

export default async function RolesPage() {
  const roles = await prisma.role.findMany({
    include: {
      _count: {
        select: { users: true, permissions: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Roles</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage access roles and their permissions</p>
        </div>
        <button className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          Add Role
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm text-slate-500 dark:text-slate-400">
          <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-800 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th scope="col" className="px-6 py-4">Role Name</th>
              <th scope="col" className="px-6 py-4">Description</th>
              <th scope="col" className="px-6 py-4">Users</th>
              <th scope="col" className="px-6 py-4">Permissions</th>
              <th scope="col" className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map(role => (
              <tr key={role.id} className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  {role.name}
                  {role.isSystem && <span className="text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full">System</span>}
                </td>
                <td className="px-6 py-4">{role.description || '-'}</td>
                <td className="px-6 py-4">{role._count.users}</td>
                <td className="px-6 py-4">{role._count.permissions}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button className="text-primary hover:underline">Edit</button>
                  {!role.isSystem && <button className="text-error hover:underline">Delete</button>}
                </td>
              </tr>
            ))}
            {roles.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center">
                  <Shield className="w-12 h-12 mx-auto mb-4 text-slate-300 dark:text-slate-700" />
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No roles found</h2>
                  <p>There are currently no roles created.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
