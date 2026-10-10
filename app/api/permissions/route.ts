import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { logAudit } from '@/lib/audit'

export async function GET() {
  try {
    const permissions = await prisma.permission.findMany({
      orderBy: [
        { module: 'asc' },
        { name: 'asc' }
      ]
    })
    
    return NextResponse.json(permissions)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch permissions' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, module, description } = body

    if (!name || !module) {
      return NextResponse.json({ error: 'Name and module are required' }, { status: 400 })
    }

    const permission = await prisma.permission.create({
      data: {
        name,
        module,
        description
      }
    })

    await logAudit('create_permission', 'permission', permission.id, {
      newValues: permission,
    })

    return NextResponse.json(permission, { status: 201 })
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Permission with this name already exists' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Failed to create permission' }, { status: 500 })
  }
}
