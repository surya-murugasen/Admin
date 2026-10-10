'use client'

import { useState, useEffect } from 'react'
import { Settings, Database, Box, Check, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AppConfigPage() {
  const router = useRouter()
  const [dataFlow, setDataFlow] = useState('DATABASE')
  const [isSaving, setIsSaving] = useState(false)
  const [configs, setConfigs] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/app-config').then(r => r.json()).then(data => {
      setConfigs(data)
      const flow = data.find((c: any) => c.key === 'DATA_FLOW')
      if (flow) setDataFlow(flow.value)
    })
  }, [])

  const handleSave = async () => {
    setIsSaving(true)
    await fetch('/api/app-config/DATA_FLOW', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        value: dataFlow,
        type: 'STRING',
        description: 'Controls the data source used by the Central Admin application.',
        enabled: true
      })
    })
    setIsSaving(false)
    router.refresh()
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">App Config</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">System-level configuration and application behavior</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
          <Settings className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">System Config Active</span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3 bg-slate-50 dark:bg-slate-900/50">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Data Flow</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Controls the source of Central Admin application data.</p>
          </div>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900 dark:text-white">Select Data Source</h3>
            
            <label className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${dataFlow === 'DATABASE' ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-800 hover:border-primary/50'}`}>
              <div className="mt-1">
                <input type="radio" name="dataFlow" value="DATABASE" checked={dataFlow === 'DATABASE'} onChange={() => setDataFlow('DATABASE')} className="w-4 h-4 text-primary focus:ring-primary border-slate-300" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-bold text-slate-900 dark:text-white">Database</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Use real application database data. Recommended for production.</p>
              </div>
            </label>

            <label className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${dataFlow === 'DUMMY' ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-800 hover:border-primary/50'}`}>
              <div className="mt-1">
                <input type="radio" name="dataFlow" value="DUMMY" checked={dataFlow === 'DUMMY'} onChange={() => setDataFlow('DUMMY')} className="w-4 h-4 text-primary focus:ring-primary border-slate-300" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Box className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="font-bold text-slate-900 dark:text-white">Demo Data</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Use centralized demonstration data for UI preview and development.</p>
              </div>
            </label>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900 dark:text-white">Current Data Source</h3>
            
            <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950/50">
              {dataFlow === 'DATABASE' ? (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <Database className="w-6 h-6" />
                    </div>
                    <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white bg-blue-600 rounded">DATABASE</span>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">Real Database</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Real application database data will be used throughout the application.</p>
                  
                  <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/10 text-blue-800 dark:text-blue-300 rounded-lg text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p>If no data is available, the application will show an appropriate empty state instead of dummy data.</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                      <Box className="w-6 h-6" />
                    </div>
                    <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white bg-success rounded">DEMO</span>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">Demo Data</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Centralized demonstration data is currently being displayed throughout the application. This is useful for UI preview and development.</p>
                  
                  <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-900/10 text-purple-800 dark:text-purple-300 rounded-lg text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p>Note: This mode uses static demonstration data. No real database records are accessed.</p>
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end mt-8">
              <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-50">
                {isSaving ? 'Saving...' : 'Save Configuration'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
