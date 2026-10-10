'use client'

import { Search, Sun, Moon, Bell } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Topbar({ isDummyMode }: { isDummyMode?: boolean }) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true)
    }
  }, [])

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark')
      setIsDark(false)
    } else {
      document.documentElement.classList.add('dark')
      setIsDark(true)
    }
  }

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 shrink-0">
      <div className="flex-1 flex items-center">
        <div className="relative w-96 hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search projects, settings, users, logs..." 
            className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-700 border focus:border-primary rounded-lg text-sm text-slate-900 dark:text-slate-100 outline-none transition-colors"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="hidden md:flex flex-col items-end">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Data Source</span>
          <span className={`text-xs font-semibold ${isDummyMode ? 'text-primary' : 'text-blue-500'}`}>
            ● {isDummyMode ? 'Demo Data' : 'Database'}
          </span>
        </div>
        
        <Link href="/notifications" className="relative text-slate-500 hover:text-primary transition-colors">
          <Bell className="w-5 h-5" />
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-error rounded-full border-2 border-white dark:border-slate-900"></div>
        </Link>
        
        <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 pl-6">
          <Sun className="w-4 h-4 text-slate-400" />
          <button 
            onClick={toggleTheme}
            className="w-10 h-5 bg-primary rounded-full relative transition-colors flex items-center"
          >
            <div className={`w-4 h-4 bg-white rounded-full absolute transition-transform ${isDark ? 'translate-x-5' : 'translate-x-1'}`}></div>
          </button>
          <Moon className="w-4 h-4 text-slate-400" />
        </div>

        <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-800 pl-6">
          <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold">
            SA
          </div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">System Admin</span>
        </div>
      </div>
    </header>
  )
}
