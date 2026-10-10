# Phase 1 Scope: Central Admin Foundation

## Overview
Phase 1 establishes the foundational layer of the Central Admin Dashboard. The goal is to build a standalone, secure Next.js web application that acts as a Project Registry without directly integrating into or modifying existing projects.

## Implemented Features
- Next.js 14 App Router foundation.
- Light/Dark mode styling system using Tailwind CSS (custom brand colors).
- Standalone SQLite Database via Prisma ORM.
- Secure Admin Authentication (credentials, hashed passwords).
- Project Registry (CRUD operations for Project metadata).
- Dashboard overview interface.

## Excluded Features (Not in Phase 1)
- Portfolio CMS dynamic integration.
- Direct project database connections.
- GitHub/Deployment integrations.
- Health monitoring or log aggregation from child projects.
- Cross-project SSO.

## Phase 1 Limitations
The dashboard will display placeholder statuses for integration and health since the physical webhook APIs have not been implemented in the child projects yet.
