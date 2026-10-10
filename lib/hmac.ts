import crypto from 'crypto'

export interface HmacPayload {
  method: string
  path: string
  timestamp: number
  nonce: string
}

export function generateCanonicalString(payload: HmacPayload): string {
  return `${payload.method.toUpperCase()}\n${payload.path}\n${payload.timestamp}\n${payload.nonce}`
}

export function signRequest(payload: HmacPayload, secret: string): string {
  const canonical = generateCanonicalString(payload)
  return crypto.createHmac('sha256', secret).update(canonical).digest('hex')
}

export function generateNonce(): string {
  return crypto.randomBytes(16).toString('hex')
}

export function generateIntegrationHeaders(method: string, path: string, secret: string) {
  const timestamp = Date.now()
  const nonce = generateNonce()
  
  const signature = signRequest({ method, path, timestamp, nonce }, secret)
  
  return {
    'x-admin-signature': signature,
    'x-admin-timestamp': timestamp.toString(),
    'x-admin-nonce': nonce
  }
}
