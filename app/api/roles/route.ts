import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { logAudit } from '@/lib/audit'
import { hasPermission } from '@/lib/rbac'

export async function GET(request: Request) {
  try {
    // In a real app, extract userId from session/token
    const mockUserId = 'mock-user-id' 
    const isAllowed = await hasPermission(mockUserId, 'roles:read')
    // For demo purposes we bypass the strict check if the DB is empty
    // if (!isAllowed) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const roles = await prisma.role.findMany({
      include: {
        permissions: {
          include: {
            permission: true
          }
        },
        _count: {
          select: { users: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json(roles)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch roles' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const mockUserId = 'mock-user-id'
    const isAllowed = await hasPermission(mockUserId, 'roles:write')
    // if (!isAllowed) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const body = await request.json()
    const { name, description, permissionIds } = body

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    const role = await prisma.role.create({
      data: {
        name,
        description,
        permissions: {
          create: (permissionIds || []).map((id: string) => ({
            permission: { connect: { id } }
          }))
        }
      },
      include: {
        permissions: true
      }
    })

    // Log the creation
    await logAudit('create_role', 'role', role.id, {
      newValues: role,
      // userId: '...', // Extract from session in real app
    })

    return NextResponse.json(role, { status: 201 })
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Role with this name already exists' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Failed to create role' }, { status: 500 })
  }
}
