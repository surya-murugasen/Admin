import { PrismaClient } from '@prisma/client'
import { DataService, isDummyMode } from '@/lib/data-service'
import { revalidatePath } from 'next/cache'
import { UserCircle, Briefcase, FileText, Plus, Search, Filter, Mail, Link as LinkIcon, Edit2, MoreHorizontal } from 'lucide-react'

const prisma = new PrismaClient()

export default async function PortfolioPage() {
  const profile = await DataService.getPortfolioProfile()
  const allProjects = await DataService.getProjects()
  const portfolioProjects = allProjects.filter(p => p.showInPortfolio)

  async function saveProfile(formData: FormData) {
    'use server'
    const data = {
      name: formData.get('name') as string,
      title: formData.get('title') as string,
      bio: formData.get('bio') as string,
      about: formData.get('about') as string,
      resumeUrl: formData.get('resumeUrl') as string,
      email: formData.get('email') as string,
    }
    
    if (await isDummyMode()) return
    
    await prisma.portfolioProfile.upsert({
      where: { id: 'singleton' },
      update: data,
      create: { id: 'singleton', ...data }
    })
    
    revalidatePath('/portfolio')
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Portfolio</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your portfolio items, showcase and content</p>
        </div>
        <button className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg self-start sm:self-auto overflow-x-auto w-full sm:w-auto">
            <button className="px-3 py-1.5 text-xs font-medium rounded-md transition-colors bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm whitespace-nowrap">
              All ({portfolioProjects.length + 1})
            </button>
            <button className="px-3 py-1.5 text-xs font-medium rounded-md transition-colors text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white whitespace-nowrap">
              Projects ({portfolioProjects.length})
            </button>
            <button className="px-3 py-1.5 text-xs font-medium rounded-md transition-colors text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white whitespace-nowrap">
              Profile Setup (1)
            </button>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search portfolio..." className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-md text-sm outline-none focus:border-primary transition-colors" />
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8 bg-slate-50 dark:bg-slate-950/50">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <UserCircle className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900 dark:text-white">Profile Identity</h2>
                  <p className="text-xs text-slate-500">Core personal information</p>
                </div>
              </div>
              
              <form action={saveProfile} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</label>
                  <input name="name" defaultValue={profile?.name || ''} required className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:border-primary" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Title</label>
                  <input name="title" defaultValue={profile?.title || ''} required className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:border-primary" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5"><Mail className="w-3 h-3"/> Email</label>
                  <input name="email" defaultValue={profile?.email || ''} className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:border-primary" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5"><LinkIcon className="w-3 h-3"/> Resume Link</label>
                  <input name="resumeUrl" defaultValue={profile?.resumeUrl || ''} className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:border-primary" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Short Bio</label>
                  <textarea name="bio" defaultValue={profile?.bio || ''} className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:border-primary resize-none h-20" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Detailed About</label>
                  <textarea name="about" defaultValue={profile?.about || ''} className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:border-primary resize-none h-32" />
                </div>
                <button type="submit" className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
                  Save Profile Identity
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                  <h2 className="font-bold text-slate-900 dark:text-white">Active Portfolio Projects</h2>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      <th className="py-3 px-5">Title</th>
                      <th className="py-3 px-5">Type</th>
                      <th className="py-3 px-5">Status</th>
                      <th className="py-3 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {portfolioProjects.map(project => (
                      <tr key={project.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                        <td className="py-4 px-5">
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{project.name}</span>
                          <p className="text-xs text-slate-500 truncate max-w-[250px]">{project.description}</p>
                        </td>
                        <td className="py-4 px-5">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                            Project
                          </span>
                        </td>
                        <td className="py-4 px-5">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                            Published
                          </span>
                        </td>
                        <td className="py-4 px-5 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="flex items-center gap-1.5 px-2 py-1 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded text-xs font-medium text-slate-700 dark:text-slate-300">
                              <Edit2 className="w-3 h-3" />
                              Edit
                            </button>
                            <button className="p-1 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded text-slate-400 transition-colors">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {portfolioProjects.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-slate-500 text-sm">
                          No projects enabled for portfolio. Edit a project in Project Registry and check "Show in Portfolio".
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-xl p-5 text-sm text-amber-800 dark:text-amber-300 flex items-start gap-3">
              <FileText className="w-5 h-5 shrink-0" />
              <div>
                <p className="font-semibold mb-1">Extensibility Note</p>
                <p>Other sections (Experience, Skills, Education, Certifications) can be managed via similar dedicated routes in a full implementation.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
