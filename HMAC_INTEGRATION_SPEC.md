# HMAC Integration Specification

## Overview
To facilitate secure Server-to-Server communication between the Central Admin and external projects without exposing database credentials or relying on complex OAuth handshakes, we employ an HMAC (Hash-based Message Authentication Code) strategy.

## Key Management
- The `integrationSecret` is a randomly generated 64-character hex string unique to each integrated project.
- It is stored in the Central Admin database (for Phase 3, it is stored in plaintext on the Admin side, but MUST NEVER be exposed to the frontend/browser). 
- It is passed as an environment variable to the external project (e.g., `ADMIN_INTEGRATION_SECRET`).

## Canonical Request Signing
To prevent replay attacks and ambiguity, the Admin server signs a **canonical string** representing the exact request. 

### Canonical Format
The canonical string is constructed as follows:
```
{HTTP_METHOD}\n
{REQUEST_PATH}\n
{TIMESTAMP}\n
{NONCE}
```

### Signature Generation
The signature is generated using `HMAC-SHA256`:
```js
const signature = crypto
  .createHmac('sha256', integrationSecret)
  .update(canonicalString)
  .digest('hex');
```

## Request Headers
When the Central Admin makes a request to the external project (e.g., `GET /api/health`), it must include the following headers:
- `x-admin-signature`: The generated HMAC-SHA256 hex string.
- `x-admin-timestamp`: The Unix timestamp (in milliseconds) used in the canonical string.
- `x-admin-nonce`: A cryptographically secure random string (UUID or 16-byte hex) used in the canonical string to ensure uniqueness.

## Verification (External Project Side)
When the external project receives the request, it must:
1. Verify that `x-admin-timestamp` is within an acceptable drift window (e.g., +/- 5 minutes).
2. (Optional but recommended) Verify that `x-admin-nonce` has not been used recently (cache for 5 minutes).
3. Reconstruct the canonical string using the exact same format and the received headers.
4. Compute the expected signature using its own copy of the `ADMIN_INTEGRATION_SECRET`.
5. Perform a constant-time string comparison between the computed signature and `x-admin-signature`.

If the comparison succeeds, the request is authentically from the Central Admin.
