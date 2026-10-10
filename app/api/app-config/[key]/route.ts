import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: Request, { params }: { params: { key: string } }) {
  const config = await prisma.appConfig.findUnique({
    where: { key: params.key }
  })
  if (!config) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(config)
}

export async function PUT(req: Request, { params }: { params: { key: string } }) {
  const data = await req.json()
  const config = await prisma.appConfig.upsert({
    where: { key: params.key },
    update: { value: data.value, enabled: data.enabled },
    create: { key: params.key, value: data.value, enabled: data.enabled, description: data.description, type: data.type || 'STRING' }
  })
  return NextResponse.json(config)
}
