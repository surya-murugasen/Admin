'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, UserPlus, ShieldCheck, Users, Lightbulb, Search, Check, Eye, EyeOff } from 'lucide-react'

export default function AddNewUserPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    status: 'Active'
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [searchRole, setSearchRole] = useState('')
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  
  const [availableRoles, setAvailableRoles] = useState<any[]>([])

  useEffect(() => {
    // Fetch actual roles from backend
    fetch('/api/roles')
      .then(res => res.json())
      .then(data => {
        setAvailableRoles(data.map((r: any) => ({
          id: r.id,
          name: r.name,
          description: r.description,
          type: r.isSystem ? 'System' : 'Default',
          count: r._count?.users || 0
        })))
      })
      .catch(err => console.error(err))
  }, [])

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match')
      return
    }
    setIsSubmitting(true)
    setErrorMsg('')
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          status: formData.status,
          roleIds: selectedRoles
        })
      })
      if (res.ok) {
        router.push('/users')
      } else {
        const data = await res.json()
        setErrorMsg(data.error || 'Failed to create user')
      }
    } catch (err) {
      setErrorMsg('Network error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleRole = (id: string) => {
    if (selectedRoles.includes(id)) {
      setSelectedRoles(selectedRoles.filter(r => r !== id))
    } else {
      setSelectedRoles([...selectedRoles, id])
    }
  }

  const filteredRoles = availableRoles.filter(r => r.name.toLowerCase().includes(searchRole.toLowerCase()))
  
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <Link href="/users" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" />
        User Management
      </Link>
      
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white shrink-0">
          <UserPlus className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create New User</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Add a new administrator to the system and assign roles and permissions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* User Information */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6 text-slate-900 dark:text-white font-bold">
              <UserPlus className="w-5 h-5 text-slate-500" />
              <h2>User Information</h2>
            </div>
            <p className="text-sm text-slate-500 mb-6">Enter the basic details for the new user.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">First Name <span className="text-error">*</span></label>
                <div className="relative">
                  <input placeholder="Enter first name" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full pl-10 p-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:border-primary outline-none transition-colors" />
                  <UserPlus className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Last Name <span className="text-error">*</span></label>
                <div className="relative">
                  <input placeholder="Enter last name" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full pl-10 p-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:border-primary outline-none transition-colors" />
                  <UserPlus className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address <span className="text-error">*</span></label>
                <div className="relative">
                  <input type="email" placeholder="name@company.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full pl-10 p-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:border-primary outline-none transition-colors" />
                  <span className="w-4 h-4 absolute left-3 top-3 text-slate-400 font-serif">@</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password <span className="text-error">*</span></label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} placeholder="Enter password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full pl-10 pr-10 p-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:border-primary outline-none transition-colors" />
                  <ShieldCheck className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-slate-400 hover:text-slate-600">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Confirm Password <span className="text-error">*</span></label>
                <div className="relative">
                  <input type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm password" value={formData.confirmPassword} onChange={e => setFormData({...formData, confirmPassword: e.target.value})} className="w-full pl-10 pr-10 p-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:border-primary outline-none transition-colors" />
                  <ShieldCheck className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3 text-slate-400 hover:text-slate-600">
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Status</label>
                <div className="relative">
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full pl-10 p-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:border-primary outline-none transition-colors appearance-none">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <div className={`w-2 h-2 rounded-full absolute left-4 top-4 ${formData.status === 'Active' ? 'bg-green-500' : 'bg-slate-400'}`}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Assign Roles */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-2 text-slate-900 dark:text-white font-bold">
              <ShieldCheck className="w-5 h-5 text-slate-500" />
              <h2>Assign Roles</h2>
            </div>
            <p className="text-sm text-slate-500 mb-6">Select one or more roles for this user.</p>

            <div className="relative mb-4">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search roles..." 
                value={searchRole}
                onChange={(e) => setSearchRole(e.target.value)}
                className="w-full pl-10 p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:border-primary outline-none transition-colors"
              />
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {filteredRoles.map(role => {
                const isSelected = selectedRoles.includes(role.id)
                return (
                  <label key={role.id} className={`flex items-start justify-between p-3 rounded-lg border cursor-pointer transition-colors ${isSelected ? 'bg-blue-50/50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-800/50' : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}>
                    <div className="flex items-start gap-3">
                      <div className="relative flex items-center justify-center mt-1">
                        <input type="checkbox" className="sr-only" checked={isSelected} onChange={() => toggleRole(role.id)} />
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-primary border-primary' : 'border-slate-300 dark:border-slate-600'}`}>
                          {isSelected && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{role.name}</h4>
                        <p className="text-xs text-slate-500">{role.description}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] px-2 py-1 rounded-md ${role.type === 'System' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                      {role.type}
                    </span>
                  </label>
                )
              })}
            </div>
          </div>

          {/* Action Buttons */}
          {errorMsg && (
            <div className="px-6 pb-2 text-sm text-error font-medium">{errorMsg}</div>
          )}
          <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-6">
            <div className="text-sm text-slate-500">
              Selected Roles: <span className="font-bold text-slate-900 dark:text-white">{selectedRoles.length}</span>
              {selectedRoles.length > 0 && (
                <span className="ml-2 inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                  {availableRoles.find(r => r.id === selectedRoles[0])?.name}
                  <button onClick={() => toggleRole(selectedRoles[0])} className="hover:text-blue-800">&times;</button>
                </span>
              )}
            </div>
            <div className="flex gap-3">
              <Link href="/users" className="px-6 py-2.5 text-sm font-medium border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-700 dark:text-slate-300">
                Cancel
              </Link>
              <button disabled={isSubmitting} onClick={handleSubmit} type="button" className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-50">
                <UserPlus className="w-4 h-4" />
                {isSubmitting ? 'Creating...' : 'Create User'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar Information */}
        <div className="space-y-6">
          {/* Secure & Managed */}
          <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30 rounded-xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-800/50 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-blue-900 dark:text-blue-300 text-sm mb-1">Secure & Managed</h3>
              <p className="text-xs text-blue-700/80 dark:text-blue-400/80 leading-relaxed">
                Passwords are hashed and securely stored. All actions are logged in the audit trail.
              </p>
            </div>
          </div>

          {/* Quick Roles Overview */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4 text-slate-900 dark:text-white font-bold">
              <Users className="w-5 h-5 text-slate-500" />
              <h3>Quick Roles Overview</h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">Available roles in the system.</p>
            
            <div className="space-y-4">
              {availableRoles.map(role => (
                <div key={role.id} className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4 text-slate-400" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{role.name}</h4>
                      <p className="text-[10px] text-slate-500">{role.description}</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded font-medium">
                    {role.count} {role.count === 1 ? 'user' : 'users'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4 text-slate-900 dark:text-white font-bold">
              <Lightbulb className="w-5 h-5 text-slate-500" />
              <h3>Tips</h3>
            </div>
            <ul className="space-y-3">
              {[
                'Use a strong password (min. 8 characters).',
                'Assign only the necessary roles.',
                'You can add more roles later from Role Management.',
                'All user actions will be logged for security and auditing.'
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
