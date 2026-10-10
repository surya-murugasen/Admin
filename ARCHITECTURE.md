# Architecture

## System Architecture
The Central Admin Dashboard follows an API Gateway pattern combined with a monolithic UI dashboard. 
It consists of a Next.js (App Router) full-stack application that serves both the UI and the API layer.

## Application Layers
1. **Frontend (UI):** React Server Components + Client Components built with Next.js and styled with Tailwind CSS.
2. **API (Backend):** Next.js Route Handlers (`/app/api/...`) providing a secure internal REST API.
3. **Data Access:** Prisma ORM for type-safe database interactions.
4. **Database:** SQLite (Phase 1) for a zero-configuration, standalone persistent store.

## Authentication
Phase 1 implements a custom secure authentication flow for the Admin UI using standard JWT patterns (or NextAuth), backed by the SQLite database. It is strictly for the Central Admin and does NOT interact with authentication flows in child projects.

## Future Integration Model
In future phases, the Central Admin will communicate with individual projects (TeamTrack, AI Models, etc.) by polling their respective REST endpoints (`/health`, `/stats`) using shared API keys. It will NOT connect directly to their databases.
