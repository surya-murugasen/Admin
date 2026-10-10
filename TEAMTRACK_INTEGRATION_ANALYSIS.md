# TeamTrack Integration Analysis

## Current Architecture
- **Backend**: Node.js, Express, TypeScript (run via `tsx`). The entry point is `server/src/index.ts`.
- **Frontend**: React (Vite) Single Page Application in the `client/` directory.
- **Port/Runtime**: The Express server runs on port 5000. It is a persistent server, executing alongside a socket.io instance and node-cron background jobs.

## Existing APIs
- The backend exposes REST APIs (`/api/projects`, `/api/users`, `/api/auth/register`, `/api/logs/traffic`) directly in `server/src/index.ts`.
- An existing health endpoint `GET /api/health` is present and returns a simple JSON liveness payload.

## Existing Authentication
- The backend uses `jsonwebtoken` and `bcryptjs` for standard user authentication (registration currently implemented).
- The Central Admin integration will remain isolated from this user authentication flow.

## Database
- **Architecture**: MySQL managed by Sequelize ORM.
- **Models**: `User`, `Project`, `Logger`, `Role` (located in `server/src/models`).

## Frontend Dependencies
- The React client uses `axios` to make requests to `http://localhost:5000`.
- The frontend relies on `/api/projects`, `/api/users`, and `/api/logs/traffic`, but does NOT depend on `/api/health`.

## Integration Feasibility
Adding Central Admin HMAC integration is highly feasible. The architecture closely matches TaskFlow (Node.js/Express). 

## Proposed Admin Health Endpoint
**Path**: `GET /api/admin/health`
**Reasoning**: While `/api/health` exists and isn't used by the frontend, creating dedicated `/api/admin/*` routes strictly isolates the HMAC contract from public monitoring tools.

## Proposed Admin Stats Endpoint
**Path**: `GET /api/admin/stats`
**Metrics**: 
- `projectCount` (via `Project.count()`)
- `userCount` (via `User.count()`)
- `uptimeSeconds` (via `process.uptime()`)
- `databaseStatus` (via `sequelize.authenticate()`)

## HMAC Compatibility
- **Status**: 100% Compatible.
- TeamTrack's Node environment naturally supports the `crypto` module. The exact same middleware used for TaskFlow can be ported directly into TeamTrack (adapted for TypeScript).

## Security Analysis
- **Secret Storage**: The `ADMIN_INTEGRATION_SECRET` will be placed in `server/.env`.
- **CORS**: Existing CORS allows `*`, but since the Admin uses Server-to-Server communication, no extra CORS configuration is required.
- **Failure Handling**: Replay attacks will be rejected via the 5-minute timestamp drift window. Constant-time comparison (`crypto.timingSafeEqual`) will mitigate timing attacks.

## Required Changes
1. Create `server/src/middlewares/hmacAuth.ts`.
2. Update `server/src/index.ts` to import the middleware and expose `/api/admin/health` and `/api/admin/stats`.
3. Add `ADMIN_INTEGRATION_SECRET` to `server/.env`.

## Files To Modify
- `server/src/index.ts`
- `server/.env`

## Files Not To Modify
- `client/**` (No frontend changes)
- `server/src/models/**`
- `server/package.json` (Built-in crypto module requires no new dependencies)

## Risks / Blockers
- **No architectural blockers.** The architecture is a standard Express app, making integration straightforward.

## Recommended Implementation Plan
1. Central Admin configures the project with `slug: teamtrack` and port `5000`.
2. Generate an integration secret and inject it into TeamTrack's `.env`.
3. Write `hmacAuth.ts` middleware enforcing the canonical request signature.
4. Mount the two admin endpoints to `index.ts`.
5. Execute `testConn.js` from Central Admin to validate.

## Validation Plan
- Verify Central Admin dashboard reports TeamTrack as CONNECTED.
- Verify TeamTrack's frontend dashboard (`TrafficDashboard.tsx`, etc.) remains functional.
- Validate security rejections for missing/invalid signatures.

***

ANALYSIS STATUS: READY
The codebase is clean, well-understood, and ready for immediate implementation without risking existing functionality.
