import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const secret = '035403489ce514c8461de5d100ddc71205f186ff156f06bf8cb4b90121471f1b';

  await prisma.project.updateMany({
    where: { slug: 'taskflow' },
    data: {
      integrationEnabled: true,
      integrationStatus: 'CONFIGURED',
      baseUrl: 'http://localhost:8000',
      healthEndpoint: '/api/health',
      statsEndpoint: '/api/stats',
      integrationSecret: secret
    }
  })
  console.log("Updated TaskFlow record")
}

main().catch(console.error).finally(() => prisma.$disconnect())
