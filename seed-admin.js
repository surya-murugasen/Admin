const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const email = 'admin@central.local'
  const password = 'admin123'
  
  const hashedPassword = await bcrypt.hash(password, 10)
  
  const user = await prisma.adminUser.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      firstName: 'System',
      lastName: 'Admin',
      status: 'Active'
    },
    create: {
      email,
      password: hashedPassword,
      firstName: 'System',
      lastName: 'Admin',
      status: 'Active'
    }
  })
  
  console.log('Seeded demo admin user:', user.email)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
