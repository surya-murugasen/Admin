# Phase 2: Portfolio CMS Integration

## Objective
Phase 2 transforms the Central Admin Dashboard into a headless CMS for the static Portfolio website, establishing the database models, CMS UI, and REST API needed to dynamically serve content without modifying the portfolio's visual design.

## Architecture
- **Admin CMS**: Extended the `schema.prisma` with models for `PortfolioProfile`, `Experience`, `Education`, `Certification`, `Skill`, and `SocialLink`. Added a `showInPortfolio` flag to the existing `Project` entity.
- **Public API**: Created a public endpoint `GET /api/portfolio` that aggregates all published/visible portfolio data. This API relies on the secure Admin database.
- **Portfolio Frontend**: Added an asynchronous fetch block to the vanilla `script.js` to hydrate the DOM.
- **Publishing Model**: Content explicitly checks for `isVisible: true` or `showInPortfolio: true` before inclusion in the API payload.

## Assets
Assets like images and PDF resumes remain securely stored in the Portfolio repository for Phase 2. CMS text records point to these static file paths.

## Security
- The public API returns **no internal admin data**, hiding UUIDs unless required, passwords, API keys, or unpublished projects.
- Portfolio CMS UI mutations are completely protected by the Phase 1 Auth Middleware. No unauthenticated user can modify content.

## Limitations
- UI forms inside the Admin dashboard have been scaffolded for `PortfolioProfile` and `Projects`. For production use, similar form views must be replicated across the other 5 newly designed tables.
- Portfolio integration demonstrates DOM hydration, maintaining HTML static files as a safe offline fallback.
