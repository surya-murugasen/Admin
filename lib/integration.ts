import { PrismaClient } from '@prisma/client'
import { generateIntegrationHeaders } from './hmac'

const prisma = new PrismaClient()

export interface HealthResponse {
  status: 'healthy' | 'degraded' | 'down'
  service: string
  version: string
  timestamp: string
  uptimeSeconds: number
}

export class IntegrationService {
  /**
   * Generates a new secret for a project. Returns the raw secret (only time it should be visible).
   */
  static async regenerateSecret(projectId: string): Promise<string> {
    const { randomBytes } = await import('crypto')
    const secret = randomBytes(32).toString('hex')
    
    await prisma.project.update({
      where: { id: projectId },
      data: { 
        integrationSecret: secret,
        integrationStatus: 'CONFIGURED'
      }
    })
    
    return secret
  }

  static async testConnection(projectId: string): Promise<{ success: boolean; message: string; data?: unknown }> {
    const project = await prisma.project.findUnique({ where: { id: projectId } })
    if (!project) throw new Error('Project not found')
    
    if (!project.integrationEnabled) {
      return { success: false, message: 'Integration is disabled' }
    }
    if (!project.baseUrl || !project.integrationSecret) {
      return { success: false, message: 'Project is missing baseUrl or secret' }
    }
    
    const path = project.healthEndpoint || '/api/health'
    const method = 'GET'
    
    try {
      const headers = generateIntegrationHeaders(method, path, project.integrationSecret)
      
      const response = await fetch(`${project.baseUrl}${path}`, {
        method,
        headers: {
          ...headers,
          'Accept': 'application/json'
        }
      })
      
      if (!response.ok) {
        await this.updateStatus(projectId, 'ERROR')
        return { success: false, message: `Remote responded with status: ${response.status}` }
      }
      
      const data = await response.json() as HealthResponse
      
      await prisma.project.update({
        where: { id: projectId },
        data: {
          integrationStatus: 'CONNECTED',
          lastHealthCheck: new Date()
        }
      })
      
      return { success: true, message: 'Connected successfully', data }
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unknown error'
      await this.updateStatus(projectId, 'OFFLINE')
      return { success: false, message: `Fetch failed: ${msg}` }
    }
  }
  
  private static async updateStatus(projectId: string, status: string) {
    await prisma.project.update({
      where: { id: projectId },
      data: { integrationStatus: status }
    })
  }
}
