# Central Admin Phase 1 Changelog

## [2026-09-24] â€” [Initial Project Scaffold]

Phase:
Phase 1 â€” Central Admin Foundation

Overall Status:
ACTIVE

### Introduced
- Next.js App Router scaffolding with Tailwind CSS.
- Standalone SQLite database (Prisma) configured.
- Core documentation (README, ARCHITECTURE, PHASE_1, CHANGELOG).
- Custom JWT Authentication logic using `jose` and `bcryptjs`.
- Auth middleware (`middleware.ts`) to protect routes.
- Project CRUD API endpoints (`/api/projects`, `/api/projects/[id]`).
- Project Registry interactive UI with add/edit/delete capability.
- Sidebar component with functional Logout.

### Modified
- `app/layout.tsx` to include Sidebar.
- `app/projects/page.tsx` updated from static table to full interactive Client Component for CRUD.

### Removed
- None

### Deprecated
- None

### Active
- Next.js foundation
- SQLite Database & Prisma Client
- Project Dashboard
- Project Registry (CRUD)
- Admin Authentication (Login, Logout, Middleware)

### Planned
- Dark mode toggle in UI (CSS variables present, but no switcher yet).
- Settings page.

### Blocked
- None

### Reverted
- None

### Files Affected
- `package.json`, Next.js config files, README.md, ARCHITECTURE.md, PHASE_1.md, CENTRAL_ADMIN_PHASE1_CHANGELOG.md
- `app/login/page.tsx`, `app/api/auth/route.ts`, `middleware.ts`
- `app/api/projects/route.ts`, `app/api/projects/[id]/route.ts`
- `app/projects/page.tsx`, `app/layout.tsx`, `app/Sidebar.tsx`

### Database Changes
- Initializing Prisma + SQLite with seed data.

### API Changes
- Added `/api/auth` (POST, DELETE)
- Added `/api/projects` (GET, POST, PUT, DELETE)

### UI Changes
- Added interactive Project Registry forms.
- Added Login page.
- Separated Sidebar into its own component.

### Security Changes
- Environment isolated to `.env` file (gitignored).
- Auth middleware protects all routes except `/login` and `/api/auth`.
- Passwords hashed using bcrypt.

### Dependencies
- Added `next`, `react`, `tailwindcss`.
- Added `bcryptjs`, `jose` for authentication.

### Validation / Testing
- Verified Node environment.
- Verified Next.js build succeeds with static + dynamic routes.
- Verified CRUD forms correctly interact with the database.

### Notes
- Initial setup complete.

## [2026-09-24] — [Phase 2: Portfolio CMS Integration]

Phase:
Phase 2 — Portfolio CMS

Overall Status:
ACTIVE

### Introduced
- Database entities: \PortfolioProfile\, \Experience\, \Education\, \Certification\, \Skill\, \SocialLink\.
- Public REST API: \GET /api/portfolio\ returning aggregated portfolio content.
- Portfolio CMS UI: \/portfolio\ for managing singleton Profile/About info.
- Frontend DOM Hydration logic within the static Portfolio website to consume the API.

### Modified
- \Project\ entity: Added \showInPortfolio\ and \portfolioOrder\.
- \pp/projects/page.tsx\: Added toggle for \showInPortfolio\.
- \script.js\ (Portfolio): Added \etchPortfolioData()\ for API consumption.
- \pp/Sidebar.tsx\: Added navigation to \/portfolio\.

### Removed
- None

### Deprecated
- None

### Active
- Portfolio Database schema
- \GET /api/portfolio\ endpoint
- Portfolio Profile CMS Manager
- Static Portfolio API Hydration

### Planned
- Complete Admin UI CRUD views for remaining Portfolio tables (Skills, Experience, etc.)

### Blocked
- None

### Reverted
- None

### Files Affected
- \prisma/schema.prisma\
- \pp/api/portfolio/route.ts\
- \pp/portfolio/page.tsx\
- \pp/projects/page.tsx\
- \pp/Sidebar.tsx\
- \C:\\Users\\surya\\OneDrive\\Desktop\\portfolio\\script.js\

### Database Changes
- Migrated 6 new tables for Portfolio structure.
- Modified 1 table (Project) for portfolio visibility control.

### API Changes
- Introduced \GET /api/portfolio\.

### UI Changes
- Added \/portfolio\ CMS interface.
- Added 'Show in Portfolio' toggle in Project Manager.

### Security Changes
- API endpoint properly filters out non-visible (\isVisible: false\) content.
- CMS mutations protected by existing JWT middleware.

### Dependencies
- None

### Validation / Testing
- Verified successful database migration (\
px prisma db push\).
- Verified Next.js build passes.
- Verified portfolio fallback behavior remains functional.

### Notes
- Assets (images, PDFs) left inside the portfolio repository for simplicity.

## [2026-09-24] — [Phase 3: Project Registry & Integration Foundation]

Phase:
Phase 3 — Project Registry & Integration Foundation

Overall Status:
PLANNED

### Introduced
- \PHASE_3_INTEGRATION_ANALYSIS.md\ containing read-only analysis and proposed architectural integration design for Central Admin.
- Defined Integration Lifecycle states (\NOT_CONNECTED\, \CONFIGURED\, \CONNECTED\, etc.).
- Defined HMAC-based Security Auth model for cross-project polling.
- Defined Standard API Contract for external projects (\/health\, \/stats\).

### Modified
- None

### Removed
- None

### Deprecated
- None

### Active
- None

### Planned
- Database modifications for integration fields.
- Dashboard UI updates for integration status.
- HMAC utility implementation.

### Blocked
- Implementation of cross-project connections blocked pending architectural approval.

### Reverted
- None

### Files Affected
- \PHASE_3_INTEGRATION_ANALYSIS.md\
- \CENTRAL_ADMIN_CHANGELOG.md\

### Database Changes
- None (Proposed only).

### API Changes
- None (Proposed only).

### UI Changes
- None (Proposed only).

### Security Changes
- None (HMAC design established in analysis).

### Dependencies
- None

### Validation / Testing
- Analysis generated adhering to the strict rule of NOT modifying any external project code or databases.

## [2026-09-24] — [Phase 3: Integration Implementation Foundation]

Phase:
Phase 3 — Project Registry & Integration Foundation

Overall Status:
ACTIVE

### Introduced
- Database fields for integration (\integrationEnabled\, \integrationStatus\, \aseUrl\, \healthEndpoint\, \statsEndpoint\, \lastHealthCheck\, \integrationSecret\).
- Defined \NOT_CONNECTED\, \CONFIGURED\, \CONNECTING\, \CONNECTED\, \OFFLINE\, \ERROR\, \DISABLED\ lifecycle states.
- Server-side HMAC utility (\lib/hmac.ts\) for securely signing canonical requests.
- Integration Service (\lib/integration.ts\) separating logic from UI.
- Detailed HMAC Integration Spec (\HMAC_INTEGRATION_SPEC.md\).
- \itest\ test coverage for HMAC and integration service.

### Modified
- Project database schema.
- Project details UI (\pp/projects/page.tsx\) to manage integration properties securely.
- API endpoints updated to strip \integrationSecret\ from all client-facing responses.

### Removed
- None

### Deprecated
- None

### Active
- Phase 1 Foundation
- Phase 2 Portfolio
- Phase 3 Integration Foundation

### Planned
- Modify TaskFlow and external projects to implement integration secret verification.

### Blocked
- Waiting for explicit approval to touch external projects.

### Reverted
- None

### Files Affected
- \prisma/schema.prisma\
- \pp/projects/page.tsx\
- \pp/api/projects/route.ts\
- \pp/api/projects/[id]/route.ts\
- \lib/hmac.ts\
- \lib/integration.ts\
- \__tests__/hmac.test.ts\
- \__tests__/integration.test.ts\
- \HMAC_INTEGRATION_SPEC.md\

### Database Changes
- Applied migrations for integration fields. No existing records deleted.

### API Changes
- Excluded \integrationSecret\ from payloads.

### UI Changes
- Added Integration tab to project modal.
- Handled UI states for Configured/Not Configured secret masking.
- Handled lifecycle badges properly.

### Security Changes
- Added HMAC signature generation framework.
- Protected secrets from frontend leaks.

### Dependencies
- Added \itest\ and \ite\ for testing.

### Validation / Testing
- Run builds, linters.
- Integration and HMAC utility tests successfully passed.

## [2026-09-24] — [Phase 3A: TaskFlow Pilot Integration]

Phase:
Phase 3A — TaskFlow Pilot Integration

Overall Status:
COMPLETED

### Introduced
- Connected TaskFlow project directly to the Central Admin using the secure HMAC implementation.

### Modified
- TaskFlow configuration initialized in Central Admin DB (baseUrl, endpoints, secret).

### Removed
- None

### Deprecated
- None

### Active
- TaskFlow Server-to-Server HMAC Integration

### Planned
- Apply the same pattern to \TeamTrack\ and \AI MODELS\ pending approval.

### Blocked
- Waiting for approval to modify additional projects.

### Reverted
- None

### Files Affected
- \updateTaskflow.js\ (Admin script to set configuration)
- \	estConn.js\ (Admin script to validate connection)

### Database Changes
- TaskFlow project updated to \integrationEnabled: true\ and \integrationStatus: CONNECTED\.

### API Changes
- None on Admin side.

### UI Changes
- Verified TaskFlow shows as CONNECTED on the dashboard.

### Security Changes
- Verified invalid requests are safely rejected by TaskFlow. 
- Validated \ADMIN_INTEGRATION_SECRET\ works across projects securely.

### Dependencies
- None on Admin side.

### Validation / Testing
- Performed end-to-end integration test from Admin (testConn.js) to TaskFlow \server.js\.
- Both valid and invalid payloads handled safely without exposing secrets.

## [2026-09-24] — [Phase 3B: AI MODELS Integration]

Phase:
Phase 3B — AI MODELS Integration

Overall Status:
COMPLETED

### Introduced
- Connected AI MODELS (Python/FastAPI) to the Central Admin using the exact same HMAC contract developed for TaskFlow.

### Modified
- AI MODELS configuration initialized in Central Admin DB (baseUrl, endpoints, secret).

### Removed
- None

### Deprecated
- None

### Active
- TaskFlow HMAC Integration
- AI MODELS HMAC Integration

### Planned
- Continue rolling out to remaining projects (e.g., TeamTrack, anti_spoof_system).

### Blocked
- Waiting for approval to modify additional projects.

### Reverted
- None

### Files Affected
- \updateAiModels.js\ (Admin script to set configuration)
- \	estConnAI.js\ & \	estStatsAI.js\ (Admin scripts to validate connection)

### Database Changes
- AI MODELS project updated to \integrationEnabled: true\ and \integrationStatus: CONNECTED\.
- \aseUrl\ adjusted to prevent port conflicts with TaskFlow.

### API Changes
- Implemented \/api/admin/health\ and \/api/admin/stats\ in Python to satisfy Admin requirements without breaking existing React UI endpoints.

### UI Changes
- Verified AI MODELS shows as CONNECTED on the dashboard.

### Security Changes
- Verified Python \hmac.compare_digest\ provides constant-time validation identical to the Node.js implementation.

### Dependencies
- None.

### Validation / Testing
- Performed end-to-end integration tests confirming cross-language compatibility of the HMAC canonical string algorithm.

## [2026-09-24] — [Phase 3D: TeamTrack Integration]

Phase:
Phase 3D — TeamTrack Integration

Overall Status:
COMPLETED

### Introduced
- Connected TeamTrack to the Central Admin using the Node.js HMAC middleware.

### Modified
- TeamTrack configuration initialized in Central Admin DB (baseUrl, endpoints, secret).

### Active
- TaskFlow HMAC Integration
- AI MODELS HMAC Integration
- TeamTrack HMAC Integration

### Files Affected
- \updateTeamTrack.js\ (Admin script to set configuration)
- \	estConnTT.js\ & \	estStatsTT.js\ (Admin scripts to validate connection)

### Database Changes
- TeamTrack project updated to \integrationEnabled: true\ and \integrationStatus: CONNECTED\.
- Unique integration secret applied exclusively for TeamTrack.

### API Changes
- Mounted \/api/admin/health\ and \/api/admin/stats\ inside TeamTrack's \index.ts\.

### UI Changes
- Verified TeamTrack shows as CONNECTED on the dashboard.

### Validation / Testing
- Verified successful \/api/admin/health\ returning server uptime and health.
- Verified successful \/api/admin/stats\ querying live aggregate \Project.count()\ and \User.count()\ safely.
- End-to-end tests succeeded via Admin test scripts.
