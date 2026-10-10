'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Box, Rocket, Eye, Lightbulb, Check, Link as LinkIcon, Lock, Code, Server, User } from 'lucide-react'

export default function CreateProjectPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({ 
    name: '',
    description: '',
    environment: 'Production',
    category: '',
    url: '',
    repository: '',
    integrationType: '',
    apiKey: '',
    baseUrl: '',
    additionalSettings: '{}',
    status: 'Active',
    owner: '',
    publicAccess: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      // Create slug from name
      const slug = formData.name.toLowerCase().replace(/[^a-z0-z]+/g, '-') || 'new-project'
      
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          slug,
          description: formData.description,
          status: formData.status === 'Active' ? 'ACTIVE' : 'PLANNED', 
          visibility: formData.publicAccess ? 'PUBLIC' : 'PRIVATE',
          category: formData.category,
          liveUrl: formData.url,
          repositoryUrl: formData.repository,
          integrationEnabled: !!formData.integrationType,
          integrationType: formData.integrationType,
          baseUrl: formData.baseUrl,
        })
      })
      if (res.ok) {
        router.push('/projects')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Project Registry
      </Link>
      
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white shrink-0">
          <Box className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Add New Project</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Create a new project and configure its details, environment and integrations.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form Area */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Basic Information */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-2 text-slate-900 dark:text-white font-bold">
              <Box className="w-5 h-5 text-slate-500" />
              <h2>Basic Information</h2>
            </div>
            <p className="text-sm text-slate-500 mb-6">Enter the core details about your project.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Project Name <span className="text-error">*</span></label>
                <div className="relative">
                  <input required placeholder="e.g. AI Models" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full pl-10 p-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:border-primary outline-none transition-colors" />
                  <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                </div>
              </div>
              
              <div className="space-y-2 md:row-span-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Description <span className="text-error">*</span></label>
                <div className="relative h-[calc(100%-24px)]">
                  <textarea required placeholder="Describe the project, its purpose and key features..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full h-full pl-10 p-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:border-primary outline-none transition-colors resize-none" />
                  <FileTextIcon className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Environment <span className="text-error">*</span></label>
                <div className="relative">
                  <select value={formData.environment} onChange={e => setFormData({...formData, environment: e.target.value})} className="w-full pl-10 p-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:border-primary outline-none transition-colors appearance-none">
                    <option value="Production">Production</option>
                    <option value="Staging">Staging</option>
                    <option value="Development">Development</option>
                  </select>
                  <Server className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <div className="w-2 h-2 rounded-full absolute left-[38px] top-4 bg-green-500"></div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
                <div className="relative">
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full pl-10 p-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:border-primary outline-none transition-colors appearance-none text-slate-500">
                    <option value="">Select category</option>
                    <option value="Web App">Web App</option>
                    <option value="Mobile App">Mobile App</option>
                  </select>
                  <Box className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Project URL <span className="text-error">*</span></label>
                <div className="relative">
                  <input required type="url" placeholder="https://your-project.com" value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} className="w-full pl-10 p-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:border-primary outline-none transition-colors" />
                  <LinkIcon className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Repository (Optional)</label>
                <div className="relative">
                  <input type="url" placeholder="https://github.com/username/repo" value={formData.repository} onChange={e => setFormData({...formData, repository: e.target.value})} className="w-full pl-10 p-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:border-primary outline-none transition-colors" />
                  <Code className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Integration Settings */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-2 text-slate-900 dark:text-white font-bold">
              <LinkIcon className="w-5 h-5 text-slate-500" />
              <h2>Integration Settings</h2>
            </div>
            <p className="text-sm text-slate-500 mb-4">Configure external integrations and access details.</p>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 text-blue-700 dark:text-blue-400 text-sm p-3 rounded-lg flex items-center gap-2 mb-6">
              <span className="w-4 h-4 rounded-full border border-blue-700 dark:border-blue-400 flex items-center justify-center text-[10px] font-bold">i</span>
              You can add or configure integrations later from the Integrations section.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Integration Type</label>
                <div className="relative">
                  <select value={formData.integrationType} onChange={e => setFormData({...formData, integrationType: e.target.value})} className="w-full pl-10 p-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:border-primary outline-none transition-colors appearance-none text-slate-500">
                    <option value="">Select integration type</option>
                    <option value="GitHub">GitHub</option>
                    <option value="Vercel">Vercel</option>
                  </select>
                  <Box className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">API Key (Optional)</label>
                <div className="relative">
                  <input type="password" placeholder="Enter API key" value={formData.apiKey} onChange={e => setFormData({...formData, apiKey: e.target.value})} className="w-full pl-10 p-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:border-primary outline-none transition-colors" />
                  <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Base URL (Optional)</label>
                <div className="relative">
                  <input type="url" placeholder="https://api.example.com" value={formData.baseUrl} onChange={e => setFormData({...formData, baseUrl: e.target.value})} className="w-full pl-10 p-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:border-primary outline-none transition-colors" />
                  <LinkIcon className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Additional Settings (JSON)</label>
                <div className="relative">
                  <textarea placeholder="{}" value={formData.additionalSettings} onChange={e => setFormData({...formData, additionalSettings: e.target.value})} className="w-full pl-10 p-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:border-primary outline-none transition-colors resize-none h-11 font-mono" />
                  <Code className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Status & Access */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-2 text-slate-900 dark:text-white font-bold">
              <ShieldCheck className="w-5 h-5 text-slate-500" />
              <h2>Status & Access</h2>
            </div>
            <p className="text-sm text-slate-500 mb-6">Set the project status and who can manage it.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Status <span className="text-error">*</span></label>
                <div className="relative">
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full pl-10 p-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:border-primary outline-none transition-colors appearance-none">
                    <option value="Active">Active</option>
                    <option value="Planned">Planned</option>
                  </select>
                  <div className={`w-2 h-2 rounded-full absolute left-4 top-4 ${formData.status === 'Active' ? 'bg-green-500' : 'bg-slate-400'}`}></div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Assigned Owner</label>
                <div className="relative">
                  <select value={formData.owner} onChange={e => setFormData({...formData, owner: e.target.value})} className="w-full pl-10 p-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:border-primary outline-none transition-colors appearance-none text-slate-500">
                    <option value="">Select owner</option>
                    <option value="me">Me</option>
                  </select>
                  <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  Allow Public Access
                  <span className="w-4 h-4 rounded-full border border-emerald-500 text-emerald-500 flex items-center justify-center text-[10px] font-bold">?</span>
                </label>
                <div className="flex items-center gap-3 h-10">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={formData.publicAccess} onChange={e => setFormData({...formData, publicAccess: e.target.checked})} className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary"></div>
                  </label>
                  <span className="text-[10px] text-slate-500 leading-tight">Make this project visible to all users (read-only).</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800 mt-6">
            <Link href="/projects" className="px-6 py-2.5 text-sm font-medium border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-700 dark:text-slate-300">
              Cancel
            </Link>
            <button disabled={isSubmitting} type="submit" className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-50">
              <Box className="w-4 h-4" />
              {isSubmitting ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </div>

        {/* Right Sidebar Information */}
        <div className="space-y-6">
          {/* Ready to launch */}
          <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30 rounded-xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-800/50 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-blue-900 dark:text-blue-300 text-sm mb-1">Ready to launch?</h3>
              <p className="text-xs text-blue-700/80 dark:text-blue-400/80 leading-relaxed">
                Double-check your details before creating the project.
              </p>
            </div>
          </div>

          {/* Project Preview */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-2 text-slate-900 dark:text-white font-bold">
              <Eye className="w-5 h-5 text-slate-500" />
              <h3>Project Preview</h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">This is how your project will appear in the registry.</p>
            
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-5 bg-slate-50 dark:bg-slate-950/50 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                <Box className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{formData.name || 'Project Name'}</h4>
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs font-medium mb-4">
                {formData.environment}
              </span>
              <p className="text-sm text-slate-500 mb-6 w-full line-clamp-3">
                {formData.description || 'No description provided.'}
              </p>
              
              <div className="w-full space-y-3 text-left text-sm text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 pt-4">
                <div className="flex items-center gap-2 truncate">
                  <LinkIcon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{formData.url || 'https://your-project.com'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Box className="w-4 h-4 shrink-0" />
                  <span>Category: {formData.category || 'Not set'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 shrink-0" />
                  <span>Created: —</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4 text-slate-900 dark:text-white font-bold">
              <Lightbulb className="w-5 h-5 text-slate-500" />
              <h3>Quick Tips</h3>
            </div>
            <ul className="space-y-3">
              {[
                'Use a clear and descriptive project name.',
                'Provide a valid URL and repository link.',
                'Choose the right environment for your project.',
                'You can always edit these details later.'
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </form>
    </div>
  )
}

function FileTextIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  )
}
