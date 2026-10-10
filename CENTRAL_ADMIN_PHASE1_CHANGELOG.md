# Central Admin Phase 1 Changelog

## [2026-09-24] — [Initial Project Scaffold]

Phase:
Phase 1 — Central Admin Foundation

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
