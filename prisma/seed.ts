import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  await prisma.adminUser.upsert({
    where: { email: 'admin@central.local' },
    update: {},
    create: {
      email: 'admin@central.local',
      password: hashedPassword,
    },
  })

  const projects = [
    {
      name: 'Portfolio',
      slug: 'portfolio',
      description: 'Static personal portfolio',
      status: 'ACTIVE',
      frontend: 'HTML/JS',
    },
    {
      name: 'AI Models - Text to Image',
      slug: 'ai-models-text-to-image',
      description: 'Text to image generation with FastAPI and React',
      status: 'ACTIVE',
      frontend: 'React',
      backend: 'FastAPI',
    },
    {
      name: 'Anti Spoof System',
      slug: 'anti-spoof-system',
      description: 'System for anti-spoofing with Python, Node, and React',
      status: 'ACTIVE',
      frontend: 'React',
      backend: 'Flask & Express',
      database: 'SQLite',
    },
    {
      name: 'TaskFlow',
      slug: 'taskflow',
      description: 'Task management app',
      status: 'ACTIVE',
      frontend: 'React',
      database: 'Supabase',
    },
    {
      name: 'TeamTrack',
      slug: 'teamtrack',
      description: 'Real-time project management platform',
      status: 'ACTIVE',
      frontend: 'React',
      backend: 'Node.js',
      database: 'MySQL',
    },
    {
      name: 'Danggle',
      slug: 'danggle',
      description: 'Desktop electron application',
      status: 'ACTIVE',
      frontend: 'Electron',
    },
    {
      name: 'The Pirate Caribbean Hunt',
      slug: 'pirate-caribbean-hunt',
      description: 'Game modding / APK extraction tool',
      status: 'ACTIVE',
      backend: 'Python',
    }
  ]

  for (const p of projects) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    })
  }

  console.log('Seeded database successfully')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
