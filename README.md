# Sheneba.ge

A bilingual Georgian/English marketplace MVP for architecture, design, engineering and construction. Next.js 15 App Router, React 19, TypeScript, Tailwind CSS and Lucide icons. All professional records are demonstration data; images are local generated architectural photography inspired by the supplied PDF.

## Run

Node.js 22+ and npm are required (validated on Node 24.19.0).

```bash
cd /workspace/Sheneba.ge
npm ci --no-audit --no-fund --cache /workspace/.npm-cache
npm run dev -- --port 3000
```

For production:

```bash
npm run build
npm run start -- --port 3000
```

Stop the dev server before running a production build: both use `.next`. The app requires no credentials, environment variables, database or external services. All images are served from `public/images`.

## Pages and interactions

- `/`: hero search with URL parameters, service categories, featured professionals, projects, plans and testimonials.
- `/search`: profession/project/location/budget/rating filters, query search, sorting, pagination, grid/list toggle, favorites, responsive modal filters, static map placeholder.
- `/professional/[id]`: specialist profile, portfolio lightbox, services, certificates, three seeded reviews with rating breakdowns, local review form, contact vCard export and demo chat.
- `/company/[id]`: company profile with leadership/team, partners and the shared profile sections.
- `/projects` and `/pricing`: complete project gallery and plan selection UI.

Georgian is the default language. GE/EN updates all interface copy instantly. Dictionaries live in `locales/ka.json` and `locales/en.json`; bilingual records are in `data/`. Favorites and language preferences persist through `localStorage`. Posted projects are stored under `sheneba-projects`; chat messages and newly added reviews last only for the current session. Login, registration and payment actions display honest demo states and perform no real operations.

## Validation

```bash
npm run typecheck
npm run build
```

The cloud image includes Python Playwright and `/usr/bin/chromium`. With the app running:

```bash
python scripts/smoke.py
python scripts/extended-smoke.py
```

This checks language switching, URL search, favorites, profiles, review creation, chat, lightboxes, local project saving and the mobile filter drawer. Screenshots go to ignored `validation/`. Browser checks are local Chromium, not a hosted cloud-browser preview.

## Backend integration

Replace the mock data adapters with API calls; keep the `Professional`, `Review` and `Project` types as response contracts. TODO comments identify local auth/project/review actions, chat, contact export, and the maps placeholder. Connect real authentication before treating users or reviews as verified. Add backend validation, storage and delivery for projects and chat, and payment integration before activating paid plans. Current review badges and professional statistics are seed data.

The visual structure follows the Sheneba.ge references in the supplied PDF. Photography and initials are substitutes for the reference's photographs and studio logos, so this is not a pixel-identical reproduction.

See `VALIDATION.md` for the completed checks and remaining visual/publication limits.
