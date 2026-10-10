import { NextResponse } from 'next/server'
import { DataService } from '@/lib/data-service'
import { processManager } from '@/lib/process-manager'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const projects = await DataService.getProjects()
  const project = projects.find(p => p.id === params.id)
  
  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 })
  }
  
  const result = processManager.startProject(project.id, project.name)
  
  if (result.success) {
    return NextResponse.json({ success: true })
  } else {
    return NextResponse.json({ error: result.error }, { status: 500 })
  }
}
