'use client'

import { useState } from 'react'
import { Play, Loader2, StopCircle } from 'lucide-react'

export default function RunProjectButton({ projectId, projectName }: { projectId: string, projectName: string }) {
  const [isRunning, setIsRunning] = useState(false)
  const [isStarting, setIsStarting] = useState(false)

  const handleRun = async () => {
    setIsStarting(true)
    try {
      const res = await fetch(`/api/projects/${projectId}/run`, {
        method: 'POST'
      })
      if (res.ok) {
        setIsRunning(true)
        alert(`${projectName} is starting...`)
      } else {
        const data = await res.json()
        alert(`Failed to start: ${data.error}`)
      }
    } catch (e) {
      alert('Failed to execute command.')
    } finally {
      setIsStarting(false)
    }
  }

  const handleStop = async () => {
    setIsStarting(true)
    try {
      const res = await fetch(`/api/projects/${projectId}/stop`, {
        method: 'POST'
      })
      if (res.ok) {
        setIsRunning(false)
        alert(`${projectName} stopped.`)
      } else {
        alert('Failed to stop project.')
      }
    } catch (e) {
      alert('Failed to execute command.')
    } finally {
      setIsStarting(false)
    }
  }

  if (isRunning) {
    return (
      <button 
        onClick={handleStop}
        disabled={isStarting}
        className="flex items-center gap-1.5 px-2 py-1 border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded text-xs font-medium transition-colors disabled:opacity-50" 
        title="Stop Project"
      >
        {isStarting ? <Loader2 className="w-3 h-3 animate-spin" /> : <StopCircle className="w-3 h-3" />}
        Stop
      </button>
    )
  }

  return (
    <button 
      onClick={handleRun}
      disabled={isStarting}
      className="flex items-center gap-1.5 px-2 py-1 border border-primary text-primary hover:bg-primary/10 rounded text-xs font-medium transition-colors disabled:opacity-50" 
      title="Launch Project"
    >
      {isStarting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
      Run
    </button>
  )
}
