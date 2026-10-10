import { exec, spawn, ChildProcess } from 'child_process'

// In development, Next.js clears the module cache. We use the global object to persist across HMR.
const globalAny: any = global

if (!globalAny.runningProjects) {
  globalAny.runningProjects = new Map<string, ChildProcess>()
}

export const processManager = {
  getRunningProjects: () => globalAny.runningProjects as Map<string, ChildProcess>,
  
  startProject: (id: string, name: string) => {
    const running = processManager.getRunningProjects()
    if (running.has(id)) {
      return { success: false, error: 'Project is already running.' }
    }
    
    // Determine command based on project name for this specific dev setup
    let cmd = ''
    let args: string[] = []
    let cwd = `C:\\Users\\surya\\OneDrive\\Desktop\\Projects\\${name}`
    
    if (name === 'Portfolio') {
      cmd = 'npm.cmd'
      args = ['run', 'dev']
    } else if (name === 'anti_spoof_system') {
      cmd = 'python'
      args = ['app.py'] // Example
    } else if (name === 'TaskFlow') {
      cmd = 'npm.cmd'
      args = ['run', 'dev']
    } else {
      // Default fallback
      cmd = 'npm.cmd'
      args = ['run', 'dev']
    }
    
    try {
      const child = spawn(cmd, args, { cwd, detached: true, stdio: 'ignore' })
      child.unref() // allow the parent to exit independently
      
      running.set(id, child)
      
      child.on('exit', () => {
        running.delete(id)
      })
      
      return { success: true }
    } catch (e: any) {
      return { success: false, error: e.message }
    }
  },
  
  stopProject: (id: string) => {
    const running = processManager.getRunningProjects()
    const child = running.get(id)
    
    if (!child) {
      return { success: false, error: 'Project is not running.' }
    }
    
    try {
      // For Windows, we might need taskkill to kill process trees
      if (child.pid) {
        exec(`taskkill /pid ${child.pid} /T /F`)
      } else {
        child.kill()
      }
      running.delete(id)
      return { success: true }
    } catch (e: any) {
      return { success: false, error: e.message }
    }
  }
}
