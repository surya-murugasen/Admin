'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

export function Breadcrumbs() {
  const pathname = usePathname()
  
  if (pathname === '/dashboard') return null // Skip on main dashboard if desired

  const paths = pathname.split('/').filter(Boolean)
  
  // Custom mapping for clean names
  const routeNames: Record<string, string> = {
    'dashboard': 'Dashboard',
    'projects': 'Project Registry',
    'users': 'User Management',
    'new': 'Add New',
    'roles': 'Roles',
    'permissions': 'Permissions',
    'audit-logs': 'Audit Logs',
    'portfolio': 'Portfolio',
    'integrations': 'Integrations',
    'app-config': 'App Config',
    'settings': 'Settings'
  }

  return (
    <nav className="flex items-center text-sm font-medium text-slate-500 mb-6">
      <Link href="/dashboard" className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center">
        <Home className="w-4 h-4" />
      </Link>
      
      {paths.map((path, index) => {
        const href = '/' + paths.slice(0, index + 1).join('/')
        const isLast = index === paths.length - 1
        const label = routeNames[path] || path.charAt(0).toUpperCase() + path.slice(1)
        
        return (
          <div key={path} className="flex items-center">
            <ChevronRight className="w-4 h-4 mx-2 text-slate-400 shrink-0" />
            {isLast ? (
              <span className="text-slate-900 dark:text-white">{label}</span>
            ) : (
              <Link href={href} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                {label}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}
