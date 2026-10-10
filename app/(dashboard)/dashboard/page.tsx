import { DataService } from '@/lib/data-service'
import Link from 'next/link'
import { 
  Layers, 
  Link as LinkIcon, 
  Clock, 
  BarChart2, 
  RefreshCw, Plug,
  ExternalLink,
  Play,
  MoreHorizontal,
  Edit2
} from 'lucide-react'
import RunProjectButton from '@/components/RunProjectButton'

// Force dynamic since we're displaying live DB values on the dashboard
export const dynamic = 'force-dynamic'

export default async function Dashboard() {
  const allProjects = await DataService.getProjects()
  
  const totalProjects = allProjects.length
  const integratedProjects = allProjects.filter(p => p.integrationStatus === 'CONNECTED')
  const offlineProjects = allProjects.filter(p => p.integrationStatus === 'OFFLINE' || p.integrationStatus === 'ERROR')
  const portfolioItems = allProjects.filter(p => p.showInPortfolio)

  const activeIntegrations = allProjects.filter(p => p.integrationEnabled && p.integrationStatus === 'CONNECTED')

  if (allProjects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-400">
          <Layers className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No Projects Available</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto">There are no projects in the database yet. Add your first project to get started.</p>
        <Link href="/projects/new" className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
          + Add Project
        </Link>
      </div>
    )
  }

  const now = new Date()
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Overview of your projects, integrations and system status</p>
        </div>
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">{dateStr} {timeStr}</span>
        </div>
      </div>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
            <Layers className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Projects</h2>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-bold text-slate-900 dark:text-white">{totalProjects}</span>
            </div>
            <p className="text-xs text-success font-medium mt-1">↑ +0 this month</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
            <LinkIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h2 className="text-slate-500 dark:text-slate-400 text-sm font-medium">Integrated Projects</h2>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-bold text-slate-900 dark:text-white">{integratedProjects.length}</span>
            </div>
            <p className="text-xs text-success font-medium mt-1">● {integratedProjects.length} connected</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h2 className="text-slate-500 dark:text-slate-400 text-sm font-medium">Offline Projects</h2>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-bold text-slate-900 dark:text-white">{offlineProjects.length}</span>
            </div>
            <p className="text-xs text-success font-medium mt-1">● All systems online</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
            <BarChart2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h2 className="text-slate-500 dark:text-slate-400 text-sm font-medium">Portfolio Items</h2>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-bold text-slate-900 dark:text-white">{portfolioItems.length}</span>
            </div>
            <p className="text-xs text-success font-medium mt-1">↑ +2 this month</p>
          </div>
        </div>
      </div>
      
      {/* Active Integrations */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Plug className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Active Integrations</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Real-time status of integrated projects</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors">
            <RefreshCw className="w-4 h-4" />
            Refresh All
          </button>
        </div>
        
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 bg-slate-50 dark:bg-slate-950/50">
          {activeIntegrations.map(project => (
            <div key={project.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center shrink-0 text-indigo-600 dark:text-indigo-400">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{project.name}</h3>
                    <p className="text-xs text-slate-500 truncate w-32" title={project.description || ''}>{project.description || 'Integrated System'}</p>
                  </div>
                </div>
                <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white bg-success rounded">
                  {project.integrationStatus}
                </span>
              </div>
              
              <div className="space-y-2 text-sm mb-5">
                <div className="flex justify-between">
                  <span className="text-slate-500">URL</span>
                  <span className="text-slate-900 dark:text-slate-300 font-medium truncate w-32 text-right" title={project.baseUrl || ''}>{project.baseUrl}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Last Health Check</span>
                  <span className="text-slate-900 dark:text-slate-300 font-medium">
                    {project.lastHealthCheck ? new Date(project.lastHealthCheck).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'}) : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Status</span>
                  <span className="flex items-center gap-1.5 text-success font-medium">
                    <div className="w-2 h-2 rounded-full bg-success"></div>
                    Healthy
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link href={`/projects`} className="flex-1 flex justify-center items-center gap-2 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  View Details
                </Link>
                <button className="flex-1 flex justify-center items-center gap-2 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-medium transition-colors">
                  <Play className="w-4 h-4" />
                  Test Connection
                </button>
              </div>
            </div>
          ))}
          {activeIntegrations.length === 0 && (
            <div className="col-span-3 text-center py-8 text-slate-500">
              No active integrations found.
            </div>
          )}
        </div>
      </div>

      {/* Project Registry Mini Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Project Registry</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Manage your projects and integration settings</p>
            </div>
          </div>
          <Link href="/projects" className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            + Add Project
          </Link>
        </div>
        
        <div className="overflow-x-auto">
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
              {allProjects.map((project, i) => (
                <tr key={project.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-5 text-sm text-slate-500">{i + 1}</td>
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center text-white ${project.status === 'PLANNED' ? 'bg-amber-500' : 'bg-primary'}`}>
                        <Layers className="w-3 h-3" />
                      </div>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{project.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-5 text-sm text-slate-500 truncate max-w-[200px]">{project.description}</td>
                  <td className="py-3 px-5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      project.status === 'ACTIVE' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      project.status === 'PLANNED' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                      'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                      {project.status === 'ACTIVE' ? 'Production' : project.status === 'PLANNED' ? 'Planned' : 'Development'}
                    </span>
                  </td>
                  <td className="py-3 px-5">
                    {project.integrationEnabled ? (
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        project.integrationStatus === 'CONNECTED' ? 'bg-success/10 text-success' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                      }`}>
                        {project.integrationStatus}
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                        NOT CONNECTED
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-5 text-sm text-slate-500">
                    {project.lastHealthCheck ? new Date(project.lastHealthCheck).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'}) : '—'}
                  </td>
                  <td className="py-3 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <RunProjectButton projectId={project.id} projectName={project.name} />
                      <Link href="/projects" className="flex items-center gap-1.5 px-2 py-1 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded text-xs font-medium text-slate-700 dark:text-slate-300">
                        <Edit2 className="w-3 h-3" />
                        Edit
                      </Link>
                      <button className="p-1 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded text-slate-400">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
