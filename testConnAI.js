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
  const project = await prisma.project.findFirst({ where: { slug: { contains: 'ai-models' } } });
  if (!project) throw new Error("Project not found");
  console.log("Found project:", project.name, project.integrationStatus);

  const path = project.healthEndpoint;
  const headers = generateIntegrationHeaders('GET', path, project.integrationSecret);
  
  console.log(`Fetching ${project.baseUrl}${path}...`);
  const res = await fetch(`${project.baseUrl}${path}`, {
    method: 'GET',
    headers: { ...headers, 'Accept': 'application/json' }
  });
  
  const text = await res.text();
  console.log("Status:", res.status);
  console.log("Body:", text);

  if (res.ok) {
    await prisma.project.update({
      where: { id: project.id },
      data: { integrationStatus: 'CONNECTED' }
    });
    console.log("Updated DB to CONNECTED");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
