import { expect, test, describe, vi, beforeEach } from 'vitest'
import { IntegrationService } from '../lib/integration'

const { mockPrismaUpdate, mockPrismaFindUnique } = vi.hoisted(() => ({
  mockPrismaUpdate: vi.fn(),
  mockPrismaFindUnique: vi.fn()
}))

vi.mock('@prisma/client', () => {
  return {
    PrismaClient: class {
      project = {
        update: mockPrismaUpdate,
        findUnique: mockPrismaFindUnique,
      }
    }
  }
})

describe('Integration Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  test('regenerateSecret updates DB and returns a new secret', async () => {
    mockPrismaUpdate.mockResolvedValueOnce({})
    const secret = await IntegrationService.regenerateSecret('proj-123')
    
    expect(secret).toBeDefined()
    expect(secret.length).toBe(64) // 32 bytes in hex = 64 chars
    expect(mockPrismaUpdate).toHaveBeenCalledWith({
      where: { id: 'proj-123' },
      data: {
        integrationSecret: secret,
        integrationStatus: 'CONFIGURED'
      }
    })
  })

  test('testConnection fails if project not configured properly', async () => {
    mockPrismaFindUnique.mockResolvedValueOnce({
      id: 'proj-1',
      integrationEnabled: false
    })
    
    const res = await IntegrationService.testConnection('proj-1')
    expect(res.success).toBe(false)
    expect(res.message).toContain('disabled')
  })

  test('testConnection succeeds with valid mock response', async () => {
    mockPrismaFindUnique.mockResolvedValueOnce({
      id: 'proj-1',
      integrationEnabled: true,
      baseUrl: 'http://localhost:8000',
      healthEndpoint: '/api/health',
      integrationSecret: 'secret123'
    })
    
    ;(global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ status: 'healthy', version: '1.0' })
    })
    mockPrismaUpdate.mockResolvedValueOnce({}) // updateStatus call
    
    const res = await IntegrationService.testConnection('proj-1')
    
    expect(res.success).toBe(true)
    expect(global.fetch).toHaveBeenCalledTimes(1)
    
    // Check if it updated the status to CONNECTED
    expect(mockPrismaUpdate).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ integrationStatus: 'CONNECTED' })
    }))
  })
})
