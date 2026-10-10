import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

function generateCanonicalString(payload) {
  return `${payload.method.toUpperCase()}\n${payload.path}\n${payload.timestamp}\n${payload.nonce}`
}

function signRequest(payload, secret) {
  const canonical = generateCanonicalString(payload)
  return crypto.createHmac('sha256', secret).update(canonical).digest('hex')
}

function generateIntegrationHeaders(method, path, secret) {
  const timestamp = Date.now()
  const nonce = crypto.randomBytes(16).toString('hex')
  const signature = signRequest({ method, path, timestamp, nonce }, secret)
  return {
    'x-admin-signature': signature,
    'x-admin-timestamp': timestamp.toString(),
    'x-admin-nonce': nonce
  }
}

async function main() {
  const project = await prisma.project.findFirst({ where: { slug: { contains: 'teamtrack' } } });
  
  const path = '/api/admin/stats';
  const headers = generateIntegrationHeaders('GET', path, project.integrationSecret);
  
  console.log(`Fetching ${project.baseUrl}${path}...`);
  const res = await fetch(`${project.baseUrl}${path}`, {
    method: 'GET',
    headers: { ...headers, 'Accept': 'application/json' }
  });
  
  console.log("Status:", res.status);
  console.log("Body:", await res.text());
}

main().catch(console.error).finally(() => prisma.$disconnect());
