import { expect, test, describe } from 'vitest'
import { generateCanonicalString, signRequest, generateIntegrationHeaders } from '../lib/hmac'
import crypto from 'crypto'

describe('HMAC Utility', () => {
  const secret = 'test-secret-key-12345'
  const payload = {
    method: 'GET',
    path: '/api/health',
    timestamp: 1700000000000,
    nonce: 'a1b2c3d4e5f6'
  }

  test('Canonical string generation matches spec', () => {
    const canonical = generateCanonicalString(payload)
    expect(canonical).toBe('GET\n/api/health\n1700000000000\na1b2c3d4e5f6')
  })

  test('Signature generation is deterministic', () => {
    const sig1 = signRequest(payload, secret)
    const sig2 = signRequest(payload, secret)
    expect(sig1).toBe(sig2)
    
    // Verify manually
    const expected = crypto
      .createHmac('sha256', secret)
      .update('GET\n/api/health\n1700000000000\na1b2c3d4e5f6')
      .digest('hex')
    expect(sig1).toBe(expected)
  })

  test('Different payload produces different signature', () => {
    const sig1 = signRequest(payload, secret)
    const sig2 = signRequest({ ...payload, path: '/api/stats' }, secret)
    expect(sig1).not.toBe(sig2)
  })

  test('generateIntegrationHeaders returns correct format', () => {
    const headers = generateIntegrationHeaders('POST', '/api/test', secret)
    expect(headers).toHaveProperty('x-admin-signature')
    expect(headers).toHaveProperty('x-admin-timestamp')
    expect(headers).toHaveProperty('x-admin-nonce')
    
    // Reverse verify the signature using the generated headers
    const verifiedCanonical = `POST\n/api/test\n${headers['x-admin-timestamp']}\n${headers['x-admin-nonce']}`
    const expectedSig = crypto
      .createHmac('sha256', secret)
      .update(verifiedCanonical)
      .digest('hex')
      
    expect(headers['x-admin-signature']).toBe(expectedSig)
  })
})
