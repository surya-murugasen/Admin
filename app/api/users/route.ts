import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { logAudit } from '@/lib/audit'
import { hasPermission } from '@/lib/rbac'

export async function POST(request: Request) {
  try {
    const mockUserId = 'mock-user-id'
    const isAllowed = await hasPermission(mockUserId, 'users:write')
    // if (!isAllowed) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const body = await request.json()
    const { email, password, firstName, lastName, status, roleIds } = body

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    const user = await prisma.adminUser.create({
      data: {
        email,
        password, // Note: In production, hash this with bcrypt!
        firstName,
        lastName,
        status: status || 'Active',
        roles: {
          create: (roleIds || []).map((id: string) => ({
            role: { connect: { id } }
          }))
        }
      },
      include: {
        roles: true
      }
    })

    // Log the creation
    await logAudit('create_user', 'adminUser', user.id, {
      newValues: { email, firstName, lastName, status, roleIds },
      // userId: '...', // Extract from session in real app
    })

    return NextResponse.json({ user }, { status: 201 })
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}
