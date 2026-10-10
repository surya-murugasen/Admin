import { prisma } from './db'

export async function hasPermission(userId: string, permissionName: string): Promise<boolean> {
  const user = await prisma.adminUser.findUnique({
    where: { id: userId, status: 'active', deletedAt: null },
    include: {
      roles: {
        include: {
          role: {
            include: {
              permissions: {
                include: {
                  permission: true,
                },
              },
            },
          },
        },
      },
    },
  })

  if (!user) return false

  // Check if any of the user's roles have the required permission
  for (const userRole of user.roles) {
    if (userRole.role.permissions.some((rp) => rp.permission.name === permissionName)) {
      return true
    }
  }

  return false
}

export async function getUserPermissions(userId: string): Promise<string[]> {
  const user = await prisma.adminUser.findUnique({
    where: { id: userId, status: 'active', deletedAt: null },
    include: {
      roles: {
        include: {
          role: {
            include: {
              permissions: {
                include: {
                  permission: true,
                },
              },
            },
          },
        },
      },
    },
  })

  if (!user) return []

  const permissions = new Set<string>()
  for (const userRole of user.roles) {
    for (const rp of userRole.role.permissions) {
      permissions.add(rp.permission.name)
    }
  }

  return Array.from(permissions)
}
