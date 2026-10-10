import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const secret = '9b200680184c00a6248d9f0bfe293c7312471161f251fda02ea84f50798bde62';

  await prisma.project.updateMany({
    where: { slug: 'ai-models' }, // Check if slug matches. Let's make sure!
    data: {
      integrationEnabled: true,
      integrationStatus: 'CONFIGURED',
      baseUrl: 'http://127.0.0.1:8001',
      healthEndpoint: '/api/admin/health',
      statsEndpoint: '/api/admin/stats',
      integrationSecret: secret
    }
  })
  
  // Just in case slug is different
  const project = await prisma.project.findFirst({ where: { name: { contains: 'AI' } } });
  if (project && project.slug !== 'ai-models') {
    await prisma.project.update({
      where: { id: project.id },
      data: {
        integrationEnabled: true,
        integrationStatus: 'CONFIGURED',
        baseUrl: 'http://127.0.0.1:8001',
        healthEndpoint: '/api/admin/health',
        statsEndpoint: '/api/admin/stats',
        integrationSecret: secret
      }
    });
    console.log("Updated project with ID:", project.id, "slug:", project.slug);
  } else {
    console.log("Updated AI MODELS via slug ai-models");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect())
