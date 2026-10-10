import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const configs = await prisma.appConfig.findMany({
    orderBy: { key: 'asc' }
  })
  return NextResponse.json(configs)
}

export async function POST(req: Request) {
  const data = await req.json()
  const config = await prisma.appConfig.create({
    data
  })
  return NextResponse.json(config)
}
