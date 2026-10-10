'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Settings, Mail, Lock, EyeOff, User, ArrowRight, Loader2, BarChart3, Workflow, Users2, Database } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e?: React.FormEvent, isDemo: boolean = false) => {
    if (e) e.preventDefault()
    setError('')
    setIsLoading(true)
    
    const loginEmail = isDemo ? 'admin@central.local' : email
    const loginPassword = isDemo ? 'admin123' : password
    
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: loginEmail, password: loginPassword })
    })
    
    if (res.ok) {
      router.push('/dashboard')
      router.refresh()
    } else {
      setError('Invalid email or password')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white overflow-hidden font-sans">
      
      {/* LEFT SIDE: BRANDING & VISUAL (Dark Navy) */}
      <div className="hidden md:flex flex-col w-1/2 bg-slate-950 p-10 lg:p-16 justify-between relative overflow-hidden shrink-0">
        
        {/* Subtle CSS Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-teal-500/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/20 rounded-full blur-[120px]"></div>
        </div>

        {/* Top Branding */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
            <Settings className="w-6 h-6 text-white" strokeWidth={2} />
          </div>
          <span className="text-xl font-bold text-white tracking-wide">CENTRAL ADMIN</span>
        </div>
        
        {/* Middle Value Proposition & Abstract Visual */}
        <div className="relative z-10 my-auto w-full max-w-lg">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-[1.15] tracking-tight">
            Centralized Control for Your Ecosystem
          </h2>
          <p className="text-slate-400 text-lg mb-12 leading-relaxed">
            Unify your portfolio, streamline team workflows, and monitor system integrations securely from a single pane of glass.
          </p>
          
          {/* Abstract Project Management Visual */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-5 flex items-start gap-4 transform transition-transform hover:-translate-y-1">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                <Workflow className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-200 mb-1">Workflow Automation</h3>
                <p className="text-xs text-slate-500">Sync data across microservices instantly.</p>
              </div>
            </div>
            <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-5 flex items-start gap-4 transform transition-transform hover:-translate-y-1 translate-y-4">
              <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0">
                <BarChart3 className="w-5 h-5 text-teal-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-200 mb-1">Real-time Metrics</h3>
                <p className="text-xs text-slate-500">Live health checks and system telemetry.</p>
              </div>
            </div>
            <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-5 flex items-start gap-4 transform transition-transform hover:-translate-y-1">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                <Database className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-200 mb-1">Unified Data</h3>
                <p className="text-xs text-slate-500">Centralized database management.</p>
              </div>
            </div>
            <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-5 flex items-start gap-4 transform transition-transform hover:-translate-y-1 translate-y-4">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                <Users2 className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-200 mb-1">Access Control</h3>
                <p className="text-xs text-slate-500">Enterprise-grade role management.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer Info */}
        <div className="relative z-10">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Central Admin OS. All rights reserved.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: LOGIN FORM (Light) */}
      <div className="flex flex-col w-full md:w-1/2 items-center justify-center p-6 sm:p-12 relative bg-slate-50 md:bg-white overflow-y-auto">
        
        {/* Mobile Logo (Visible only on small screens) */}
        <div className="md:hidden flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
            <Settings className="w-6 h-6 text-white" strokeWidth={2} />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-wide">CENTRAL ADMIN</span>
        </div>

        <div className="w-full max-w-[400px]">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Welcome back</h1>
            <p className="text-slate-500 text-sm font-medium">Please enter your credentials to access the dashboard.</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-4 mb-6 rounded-xl text-sm font-medium flex items-center animate-in fade-in zoom-in duration-300">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2.5"></div>
              {error}
            </div>
          )}

          <form onSubmit={(e) => handleLogin(e, false)} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-700">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-teal-500 transition-colors" strokeWidth={1.5} />
                </div>
                <input 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  required 
                  placeholder="admin@central.local"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all font-medium text-sm sm:text-base shadow-sm" 
                />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-slate-700">Password</label>
                <a href="#" className="text-xs font-semibold text-teal-600 hover:text-teal-700 transition-colors">Forgot password?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-teal-500 transition-colors" strokeWidth={1.5} />
                </div>
                <input 
                  type="password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  required 
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all font-medium text-sm sm:text-base tracking-widest shadow-sm" 
                />
                <button type="button" className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors">
                  <EyeOff className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3.5 rounded-xl text-sm font-bold transition-all shadow-md shadow-teal-600/20 hover:shadow-lg hover:shadow-teal-600/30 disabled:opacity-70 disabled:shadow-none mt-2 flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                </>
              )}
            </button>
          </form>
          
          <div className="mt-8 flex items-center justify-center">
            <div className="h-px w-full bg-slate-200"></div>
            <span className="px-4 text-xs font-bold text-slate-400 tracking-widest uppercase">Or continue with</span>
            <div className="h-px w-full bg-slate-200"></div>
          </div>

          <button 
            onClick={() => handleLogin(undefined, true)}
            disabled={isLoading}
            className="w-full mt-8 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 py-3.5 rounded-xl text-sm font-bold transition-all shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <User className="w-4 h-4 text-slate-500" strokeWidth={2} />
            )}
            Use Demo Credentials
          </button>
        </div>
      </div>
    </div>
  )
}
