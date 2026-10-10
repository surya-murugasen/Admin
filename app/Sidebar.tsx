'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  Home, 
  Layers, 
  FolderOpen, 
  Plug, 
  Settings, 
  Users, 
  FileText, 
  Activity, 
  LogOut,
  Shield,
  Key,
  FileSearch
} from 'lucide-react'

export default function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()
  
  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' })
    router.push('/login')
  }

  const mainLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Project Registry', href: '/projects', icon: Layers },
    { name: 'Portfolio', href: '/portfolio', icon: FolderOpen },
    { name: 'Integrations', href: '/integrations', icon: Plug },
    { name: 'App Config', href: '/app-config', icon: Settings },
    { name: 'Settings', href: '/settings', icon: Settings },
  ]

  const subLinks = [
    { name: 'Users', href: '/users', icon: Users },
    { name: 'Roles', href: '/roles', icon: Shield },
    { name: 'Permissions', href: '/permissions', icon: Key },
    { name: 'Audit Logs', href: '/audit-logs', icon: FileSearch },
    { name: 'System Health', href: '/health', icon: Activity },
  ]

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-full shrink-0">
      <div className="h-16 flex items-center px-6 gap-3 bg-slate-950 border-b border-slate-800">
        <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
          <Settings className="w-5 h-5 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-white text-sm tracking-wide">CENTRAL ADMIN</span>
          <span className="text-[10px] text-slate-400">Project Management & Integration</span>
        </div>
      </div>
      
      <div className="flex-1 py-6 overflow-y-auto">
        <nav className="px-3 space-y-1">
          {mainLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/') && link.href !== '/'
            const Icon = link.icon
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-primary text-white' 
                    : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {link.name}
              </Link>
            )
          })}
        </nav>

        <div className="mt-8 px-6 mb-2">
          <div className="h-px w-full bg-slate-800"></div>
        </div>

        <nav className="px-3 space-y-1">
          {subLinks.map((link) => {
            const isActive = pathname === link.href
            const Icon = link.icon
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-primary text-white' 
                    : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {link.name}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={handleLogout} 
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-error transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  )
}
