import { prisma } from './db'

export async function getAppConfig(key: string) {
  const config = await prisma.appConfig.findUnique({ where: { key } })
  return config?.value || null
}

export async function isDummyMode() {
  try {
    const flow = await getAppConfig('DATA_FLOW')
    return flow === 'DUMMY'
  } catch {
    return false
  }
}

export const DataService = {
  async getProjects() {
    return prisma.project.findMany({ orderBy: { createdAt: 'desc' } })
  },
  async getProject(id: string) {
    return prisma.project.findFirst({ where: { OR: [{ id }, { slug: id }] } })
  },
  async getUsers() {
    return prisma.adminUser.findMany({ orderBy: { createdAt: 'desc' } })
  },
  async getPortfolioProfile() {
    return prisma.portfolioProfile.findFirst()
  },
  async getActivityLogs() {
    return prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: {
        user: { select: { firstName: true, lastName: true, email: true } }
      }
    })
  },
  async getNotifications() {
    return [] as any[]
  },
  async getIncidents() {
    return [] as any[]
  },
  async getAppConfigs() {
    return prisma.appConfig.findMany({ orderBy: { key: 'asc' } })
  }
}
