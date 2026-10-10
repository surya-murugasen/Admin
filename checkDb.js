const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
p.project.findMany().then(res => {
  res.forEach(r => console.log(r.slug + ' -> ' + r.integrationStatus));
}).finally(() => p.$disconnect());
