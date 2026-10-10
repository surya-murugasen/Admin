# Phase 2: Portfolio Analysis

## Overview
An analysis of the existing static portfolio at `C:\Users\surya\OneDrive\Desktop\portfolio` was conducted to determine the required CMS models and integration points.

## Architecture
The portfolio currently consists of:
- `index.html`: Contains all hardcoded structure and textual content.
- `styles.css`: Custom CSS for animations and layout not covered by Tailwind.
- `script.js`: UI logic for scroll animations (Intersection Observer) and mobile navigation.
- Tailwind CSS (CDN configuration).

## Content Inventory

| Content | Current Location | Hardcoded/Dynamic | CMS Required |
|---------|------------------|-------------------|--------------|
| Profile Info (Home) | `index.html` (#home) | Hardcoded | Yes |
| About (Summary) | `index.html` (#about) | Hardcoded | Yes |
| Experience | `index.html` (#experience) | Hardcoded | Yes |
| Projects | `index.html` (#projects) | Hardcoded | Yes |
| Technical Skills | `index.html` (#skills) | Hardcoded | Yes |
| Education | `index.html` (#education) | Hardcoded | Yes |
| Certifications | `index.html` (Certifications) | Hardcoded | Yes |
| Soft Skills | `index.html` (Strengths) | Hardcoded | Yes |
| Contact/Social | `index.html` (Footer/Nav) | Hardcoded | Yes |
| Resume/Assets | File System (`.pdf`, `.jpg`) | Static Files | No (Link reference only) |

## Database Schema Plan
To power this content, the following entities will be added to the Central Admin `schema.prisma`:
1. `PortfolioProfile` (Singleton structure for Name, Bio, About, Resume URLs)
2. `Experience`
3. `Education`
4. `Certification`
5. `Skill` (Can group Technical and Soft skills)
6. `SocialLink`

**Note on Projects:** The Central Admin already has a `Project` table. The existing `Project` entity handles frontend/backend stack, URLs, and descriptions. To avoid duplication, the existing `Project` table will be utilized for the portfolio. A `showInPortfolio` (Boolean) field will be added to control visibility, along with `portfolioOrder` (Int). 

## Asset Handling
For Phase 2, assets (images, PDFs) will remain in the Portfolio folder. The CMS will simply store the relative path (e.g., `Surya_M_Resume.pdf`) or absolute URL to reference them, preserving the current portfolio setup.

## API Design
A single public endpoint `GET /api/portfolio` will be exposed from the Central Admin. It will aggregate:
```json
{
  "profile": { ... },
  "experience": [ ... ],
  "projects": [ ... ], // Only projects where showInPortfolio == true
  "skills": [ ... ],
  "education": [ ... ],
  "certifications": [ ... ],
  "socialLinks": [ ... ]
}
```

## Fallback Behavior
The portfolio's frontend logic will be modified to `fetch` from the Central Admin API on load. If the fetch fails (e.g., the Central Admin is offline), the portfolio will render the existing hardcoded HTML as a safe fallback.
