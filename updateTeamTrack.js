import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const secret = '0df2f44125fd3bce99b6172bfa18a71a938b80283ddcf3ecc272636012f95b81';

  const project = await prisma.project.findFirst({ where: { slug: { contains: 'teamtrack' } } });
  if (project) {
    await prisma.project.update({
      where: { id: project.id },
      data: {
        integrationEnabled: true,
        integrationStatus: 'CONFIGURED',
        baseUrl: 'http://127.0.0.1:5000',
        healthEndpoint: '/api/admin/health',
        statsEndpoint: '/api/admin/stats',
        integrationSecret: secret
      }
    });
    console.log("Updated project with ID:", project.id, "slug:", project.slug);
  } else {
    console.log("TeamTrack project not found in DB.");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect())
