import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { DataService } from '@/lib/data-service'

const prisma = new PrismaClient()

export async function GET() {
  const projects = await DataService.getProjects()
  return NextResponse.json(projects)
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const project = await prisma.project.create({ data })
    return NextResponse.json(project)
  } catch {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
