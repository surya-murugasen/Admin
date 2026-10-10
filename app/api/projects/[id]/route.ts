import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const project = await prisma.project.findUnique({ where: { id: params.id } })
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  
  const { integrationSecret, ...safeProject } = project
  return NextResponse.json({ ...safeProject, hasSecret: !!integrationSecret })
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await req.json()
    // Prevent secret from being updated directly via general PUT
    delete data.integrationSecret
    
    const project = await prisma.project.update({ where: { id: params.id }, data })
    const { integrationSecret, ...safeProject } = project
    return NextResponse.json({ ...safeProject, hasSecret: !!integrationSecret })
  } catch {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.project.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}
