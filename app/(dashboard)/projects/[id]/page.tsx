import { DataService } from '@/lib/data-service'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Play, Edit2, Shield, RotateCw, CheckCircle2, XCircle, Clock, Server, Lock } from 'lucide-react'

export default async function ProjectIntegrationDetails({ params }: { params: { id: string } }) {
  const project = await DataService.getProject(params.id)

  if (!project) {
    notFound()
  }

  const mockTests = [
    { id: 1, status: 'Success', time: '120 ms', date: 'Sep 24, 2026 11:51 PM' },
    { id: 2, status: 'Success', time: '118 ms', date: 'Sep 24, 2026 10:51 PM' },
    { id: 3, status: 'Success', time: '125 ms', date: 'Sep 24, 2026 09:51 PM' },
    { id: 4, status: 'Failed', time: 'Timeout', date: 'Sep 24, 2026 08:12 PM' },
    { id: 5, status: 'Success', time: '120 ms', date: 'Sep 23, 2026 07:51 PM' },
  ]

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Projects
      </Link>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{project.name} - Integration Details</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Manage integration configuration, connection settings and security</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
            <Play className="w-4 h-4" />
            Test Connection
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors text-slate-700 dark:text-slate-300 shadow-sm">
            <Edit2 className="w-4 h-4" />
            Edit Project
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Connection Status</h3>
            <div className="mb-6">
              <span className={`inline-flex items-center px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                project.integrationStatus === 'CONNECTED' ? 'bg-success/10 text-success' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
              }`}>
                {project.integrationStatus}
              </span>
            </div>
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-slate-500">Last Successful Check</span>
                <span className="font-medium text-slate-900 dark:text-white text-right">
                  {project.lastHealthCheck ? new Date(project.lastHealthCheck).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'}) : '—'}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-slate-500">Uptime</span>
                <span className="font-medium text-slate-900 dark:text-white">2h 34m 12s</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-slate-500">Response Time</span>
                <span className="font-medium text-slate-900 dark:text-white">120 ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Status</span>
                <span className="flex items-center gap-1.5 text-success font-medium">
                  <div className="w-2 h-2 rounded-full bg-success"></div>
                  Healthy
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Connection Information</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-slate-500">Base URL</span>
                <span className="font-medium text-slate-900 dark:text-white truncate max-w-[150px]">{project.baseUrl || '—'}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-slate-500">Health Endpoint</span>
                <span className="font-medium text-slate-900 dark:text-white">{project.healthEndpoint || '—'}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-slate-500">Stats Endpoint</span>
                <span className="font-medium text-slate-900 dark:text-white">{project.statsEndpoint || '—'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Environment</span>
                <span className="font-medium text-info">{project.status === 'ACTIVE' ? 'Production' : 'Development'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">HMAC Configuration</h3>
            
            <div className="flex items-center gap-4 mb-6 p-4 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">HMAC-SHA256</h4>
                <p className="text-xs text-slate-500">Authentication Method</p>
              </div>
            </div>

            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-slate-500">Status</span>
                <span className="flex items-center gap-1.5 text-success font-medium bg-success/10 px-2 py-0.5 rounded text-xs">
                  <CheckCircle2 className="w-3 h-3" /> Configured
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-slate-500">Secret</span>
                <span className="font-medium text-slate-900 dark:text-white tracking-widest font-mono">••••••••••••••••</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Last Rotated</span>
                <span className="font-medium text-slate-900 dark:text-white text-right">Sep 10, 2026 10:30 AM</span>
              </div>
            </div>

            <button className="w-full flex justify-center items-center gap-2 py-2.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors mb-4">
              <RotateCw className="w-4 h-4" />
              Rotate Secret
            </button>

            <div className="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-lg flex items-start gap-3">
              <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 dark:text-amber-300">
                Secret is encrypted and never displayed. Rotating the secret will require updating the project configuration.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <h3 className="font-bold text-slate-900 dark:text-white">Recent Connection Tests</h3>
              <button className="text-sm font-medium text-primary hover:underline">View All</button>
            </div>
            <div className="p-2">
              {mockTests.map((test, i) => (
                <div key={test.id} className={`flex items-center justify-between p-3 ${i !== mockTests.length - 1 ? 'border-b border-slate-100 dark:border-slate-800/50' : ''}`}>
                  <div className="flex items-center gap-3">
                    {test.status === 'Success' ? (
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    ) : (
                      <XCircle className="w-4 h-4 text-error" />
                    )}
                    <div>
                      <p className={`text-sm font-medium ${test.status === 'Success' ? 'text-success' : 'text-error'}`}>{test.status}</p>
                      <p className="text-xs text-slate-500">{test.time}</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500 text-right">{test.date}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Security Status</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Valid HMAC Signature</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Timestamp Within Range</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Correct Project Secret</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Endpoint Accessible</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
