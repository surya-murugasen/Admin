import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const profile = await prisma.portfolioProfile.findFirst() || {}
    
    const experience = await prisma.experience.findMany({
      where: { isVisible: true },
      orderBy: { order: 'asc' }
    })
    
    const education = await prisma.education.findMany({
      where: { isVisible: true },
      orderBy: { order: 'asc' }
    })
    
    const certifications = await prisma.certification.findMany({
      where: { isVisible: true },
      orderBy: { order: 'asc' }
    })
    
    const skills = await prisma.skill.findMany({
      where: { isVisible: true },
      orderBy: { order: 'asc' }
    })
    
    const socialLinks = await prisma.socialLink.findMany({
      where: { isVisible: true },
      orderBy: { order: 'asc' }
    })
    
    const projects = await prisma.project.findMany({
      where: { showInPortfolio: true },
      orderBy: { portfolioOrder: 'asc' },
      select: {
        id: true,
        name: true,
        description: true,
        liveUrl: true,
        repositoryUrl: true,
        frontend: true,
        backend: true,
        database: true,
        category: true
      }
    })

    return NextResponse.json({
      profile,
      experience,
      education,
      certifications,
      skills,
      socialLinks,
      projects
    })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch portfolio data' }, { status: 500 })
  }
}
