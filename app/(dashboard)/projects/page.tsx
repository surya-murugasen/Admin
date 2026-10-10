'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Layers, Plus, Search, Filter, Edit2, MoreHorizontal } from 'lucide-react'

type Project = {
  id: string
  name: string
  slug: string
  description: string | null
  status: string
  visibility: string
  frontend: string | null
  backend: string | null
  showInPortfolio: boolean
  
  integrationEnabled: boolean
  integrationStatus: string
  baseUrl: string | null
  healthEndpoint: string | null
  statsEndpoint: string | null
  hasSecret?: boolean
  lastHealthCheck?: string | null
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [activeFilter, setActiveFilter] = useState('All')

  const fetchProjects = async () => {
    const res = await fetch('/api/projects')
    if (res.ok) setProjects(await res.json())
  }

  useEffect(() => { fetchProjects() }, [])

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' })
      fetchProjects()
    }
  }

  if (projects.length === 0) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Project Registry</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your projects and integration settings</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-32 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-400">
            <Layers className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No Projects Available</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto">There are no projects in the database yet. Add your first project to get started.</p>
          <Link href="/projects/new" className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
            + Add Project
          </Link>
        </div>
      </div>
    )
  }

  const filteredProjects = projects.filter(p => {
    if (activeFilter === 'All') return true
    if (activeFilter === 'Connected') return p.integrationStatus === 'CONNECTED'
    if (activeFilter === 'Not Connected') return !p.integrationEnabled || p.integrationStatus === 'NOT_CONNECTED'
    if (activeFilter === 'Planned') return p.status === 'PLANNED'
    return true
  })

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Project Registry</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your projects and integration settings</p>
        </div>
        <Link href="/projects/new" className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          Add Project
        </Link>
      </div>
      
      {/* Table Container */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg self-start sm:self-auto">
            {['All', 'Connected', 'Not Connected', 'Planned'].map(f => (
              <button 
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${activeFilter === f ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                {f} ({
                  f === 'All' ? projects.length :
                  f === 'Connected' ? projects.filter(p => p.integrationStatus === 'CONNECTED').length :
                  f === 'Not Connected' ? projects.filter(p => !p.integrationEnabled || p.integrationStatus === 'NOT_CONNECTED').length :
                  projects.filter(p => p.status === 'PLANNED').length
                })
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search projects..." className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-md text-sm outline-none focus:border-primary transition-colors" />
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-5">#</th>
                <th className="py-3 px-5">Name</th>
                <th className="py-3 px-5">Description</th>
                <th className="py-3 px-5">Environment</th>
                <th className="py-3 px-5">Integration Status</th>
                <th className="py-3 px-5">Last Check</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredProjects.map((project, i) => (
                <tr key={project.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="py-4 px-5 text-sm text-slate-500">{i + 1}</td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0 ${project.status === 'PLANNED' ? 'bg-amber-500' : 'bg-primary'}`}>
                        <Layers className="w-4 h-4" />
                      </div>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{project.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-sm text-slate-500 truncate max-w-[250px]">{project.description}</td>
                  <td className="py-4 px-5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      project.status === 'ACTIVE' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      project.status === 'PLANNED' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                      'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                      {project.status === 'ACTIVE' ? 'Production' : project.status === 'PLANNED' ? 'Planned' : 'Development'}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    {project.integrationEnabled ? (
                      <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                        project.integrationStatus === 'CONNECTED' ? 'bg-success/10 text-success' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                      }`}>
                        {project.integrationStatus}
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                        NOT CONNECTED
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-5 text-sm text-slate-500">
                    {project.lastHealthCheck ? new Date(project.lastHealthCheck).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'}) : '—'}
                  </td>
                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/projects/${project.slug || project.id}`} className="flex items-center gap-1.5 px-2 py-1 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded text-xs font-medium text-slate-700 dark:text-slate-300">
                        <Edit2 className="w-3 h-3" />
                        Edit
                      </Link>
                      <button onClick={() => handleDelete(project.id)} className="p-1 border border-slate-200 dark:border-slate-700 hover:bg-error/10 hover:border-error/30 hover:text-error rounded text-slate-400 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProjects.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500 text-sm">
                    No projects found matching the selected filter.
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
