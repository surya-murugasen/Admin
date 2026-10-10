import { DataService } from '@/lib/data-service'
import { Server, Activity, RefreshCw, Layers, CheckCircle2, AlertTriangle, AlertCircle, Clock } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function SystemHealthPage() {
  const allProjects = await DataService.getProjects()
  const projects = allProjects.filter(p => p.integrationEnabled)
  const incidents = await DataService.getIncidents()

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'CONNECTED': return 'text-success bg-success/10'
      case 'ERROR': return 'text-error bg-error/10'
      case 'OFFLINE': return 'text-amber-500 bg-amber-500/10'
      default: return 'text-slate-500 bg-slate-100 dark:text-slate-400 dark:bg-slate-800'
    }
  }

  const getIncidentIcon = (status: string) => {
    switch(status) {
      case 'success': return <CheckCircle2 className="w-5 h-5 text-success" />
      case 'error': return <AlertCircle className="w-5 h-5 text-error" />
      case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-500" />
      case 'info': return <Clock className="w-5 h-5 text-blue-500" />
      default: return <Activity className="w-5 h-5 text-slate-500" />
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">System Health</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Monitor system health, service status and performance metrics</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
            <RefreshCw className="w-4 h-4" />
            Refresh All
          </button>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <div className="w-8 h-4 bg-primary rounded-full relative">
              <div className="w-3 h-3 bg-white rounded-full absolute top-0.5 right-1"></div>
            </div>
            Auto Refresh <span className="text-slate-400 ml-1">5m</span>
          </div>
        </div>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Central Admin</h3>
                <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-success mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-success"></div>
                  Healthy
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-2 text-sm mt-4">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Response Time</span>
              <span className="font-medium text-slate-900 dark:text-white">45 ms</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Uptime</span>
              <span className="font-medium text-slate-900 dark:text-white">7d 12h 34m</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Last Check</span>
              <span className="font-medium text-slate-900 dark:text-white">Just now</span>
            </div>
          </div>
        </div>

        {projects.slice(0, 3).map(p => (
          <div key={p.id} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{p.name}</h3>
                  <span className={`flex items-center gap-1 text-[10px] uppercase font-bold mt-0.5 ${getStatusColor(p.integrationStatus)} px-1.5 rounded w-max`}>
                    {p.integrationStatus}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-2 text-sm mt-4">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Response Time</span>
                <span className="font-medium text-slate-900 dark:text-white">120 ms</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Uptime</span>
                <span className="font-medium text-slate-900 dark:text-white">2h 34m</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Last Check</span>
                <span className="font-medium text-slate-900 dark:text-white text-right">
                  {p.lastHealthCheck ? new Date(p.lastHealthCheck).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'}) : '—'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart placeholder */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-lg text-slate-900 dark:text-white">Response Time History <span className="text-slate-400 text-sm font-normal">(Last 24 Hours)</span></h2>
            <div className="flex gap-4 text-xs font-medium text-slate-500">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Central Admin</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500"></div> TaskFlow</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-purple-500"></div> AI MODELS</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-500"></div> TeamTrack</div>
            </div>
          </div>
          <div className="h-64 flex flex-col justify-between border-l border-b border-slate-200 dark:border-slate-800 py-4 px-2 relative text-xs text-slate-400">
            {/* Y axis */}
            <div className="absolute left-[-40px] top-4 w-8 text-right">400ms</div>
            <div className="absolute left-[-40px] top-1/4 w-8 text-right">300ms</div>
            <div className="absolute left-[-40px] top-2/4 w-8 text-right">200ms</div>
            <div className="absolute left-[-40px] top-3/4 w-8 text-right">100ms</div>
            <div className="absolute left-[-40px] bottom-4 w-8 text-right">0ms</div>
            
            {/* Grid Lines */}
            <div className="border-t border-slate-100 dark:border-slate-800 absolute w-full top-4"></div>
            <div className="border-t border-slate-100 dark:border-slate-800 absolute w-full top-1/4"></div>
            <div className="border-t border-slate-100 dark:border-slate-800 absolute w-full top-2/4"></div>
            <div className="border-t border-slate-100 dark:border-slate-800 absolute w-full top-3/4"></div>

            {/* X axis */}
            <div className="flex justify-between w-full absolute bottom-[-24px] px-2 text-center">
              <div>00:00</div><div>04:00</div><div>08:00</div><div>12:00</div><div>16:00</div><div>20:00</div>
            </div>
            
            <div className="flex-1 w-full flex items-center justify-center text-slate-300 dark:text-slate-600">
              [Response Time Chart Visualization]
            </div>
          </div>
        </div>

        {/* Recent Incidents */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <h2 className="font-bold text-slate-900 dark:text-white">Recent Incidents</h2>
            <button className="text-sm font-medium text-primary hover:underline">View All</button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {incidents.length === 0 ? (
              <div className="p-8 text-center flex flex-col items-center justify-center text-slate-500 h-full">
                <CheckCircle2 className="w-8 h-8 text-slate-300 dark:text-slate-700 mb-2" />
                <p>No recent incidents recorded.</p>
              </div>
            ) : (
              incidents.map((incident, i) => (
                <div key={incident.id} className={`p-4 flex gap-4 ${i !== incidents.length - 1 ? 'border-b border-slate-100 dark:border-slate-800/50' : ''}`}>
                  <div className="shrink-0 mt-0.5">
                    {getIncidentIcon(incident.status)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{incident.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{incident.desc}</p>
                    <p className="text-[10px] text-slate-400 mt-1">{incident.time}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
