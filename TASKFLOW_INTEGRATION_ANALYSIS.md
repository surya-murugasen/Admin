# TaskFlow Integration Analysis

## 1. Current Architecture
TaskFlow is a React Single Page Application (SPA) built with Vite, TypeScript, and Tailwind CSS.
- **Frontend Technology**: React 19, Zustand for state management, React Router.
- **Backend Architecture**: It currently has no dedicated Node.js backend. It operates purely as a client-side application. During local development, it uses a custom Vite plugin (`local-projects-api`) to serve a minor endpoint.
- **Supabase Usage**: Uses `@supabase/supabase-js` for database and authentication directly from the browser.

## 2. Existing Backend/API Capabilities
Since it is an SPA, it lacks production-ready server capabilities. The only backend logic exists inside `vite.config.ts` as a local dev middleware.

## 3. Supabase Architecture
TaskFlow communicates directly with Supabase via client keys. The Central Admin will not intercept or broker these requests. 

## 4. Authentication Architecture
TaskFlow users authenticate via Supabase Auth. The Central Admin HMAC integration will remain strictly decoupled from Supabase Auth.

## 5. Recommended location for /health
Since TaskFlow is statically built, the most robust way to support a server-side HMAC integration is to introduce a lightweight Node.js/Express server (`server.js`) at the root of TaskFlow. This server will:
1. Serve the statically built Vite app (`dist/`).
2. Expose the `GET /health` endpoint.

## 6. Recommended location for /stats
The `GET /stats` endpoint will also be hosted on the new `server.js`. To keep it safe and isolated from Supabase credentials (which we shouldn't necessarily expose to the lightweight server if not needed), the stats could either query Supabase securely using a server-side key, or return mock/cached stats for this pilot. Given constraints, we will query Supabase safely if environment variables allow, otherwise we'll return generic app metrics (e.g., uptime, version).

## 7. HMAC Middleware Location
An Express middleware (`hmacAuth.js`) will be created in TaskFlow to intercept `/health` and `/stats` requests, reconstruct the canonical string, and compare it against the `ADMIN_INTEGRATION_SECRET`.

## 8. Environment Variables Required
TaskFlow will require:
- `ADMIN_INTEGRATION_SECRET`: Shared secret from Central Admin.

## 9. CORS Requirements
No loose CORS is required. Since Central Admin connects server-to-server to the TaskFlow Express app, we do not need to enable CORS for `/health` or `/stats`.

## 10. Security Risks
- The `ADMIN_INTEGRATION_SECRET` must not be bundled into the Vite frontend build. It must remain strictly in the Node environment of `server.js`.
- Express must properly reject Replay Attacks by enforcing a timestamp window.

## 11. Files Expected to Change (TaskFlow)
- `package.json` (Add express, cors, dotenv)
- `server.js` (New Express entry point)
- `middleware/hmacAuth.js` (New)
- `.env` (Add secret)
