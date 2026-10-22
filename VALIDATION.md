# Validation results

Validated in the onboarding machine on 2026-10-11 with Node.js 24.19.0, npm 11.9.0, Next.js 15.5.27 and local headless Chromium.

- `npm ci --no-audit --no-fund --cache /workspace/.npm-cache`: passed, using the lockfile.
- `npm run typecheck`: passed. The final production build also completed TypeScript validation.
- `npm run build`: passed; generated 31 pages including professional/company profiles.
- `npm run dev -- --port 3000`: startup and application behavior verified.
- `npm run start -- --port 3000`: startup and both browser suites verified against the production build.
- `python scripts/smoke.py`: passed language switching, URL search, favorites, profiles, review creation, chat, lightboxes, local project storage, mobile filters and overflow checks.
- `python scripts/extended-smoke.py`: passed budget/location/type filtering, sort, pagination, list view, empty state, company team/partners, six unique portfolio assets, certificate modal, contact vCard, plan selection, demo login, all main routes, image loading, 320/768/1440 widths and the expected 404 for an unknown professional.
- No JavaScript page errors or broken image resources in the final browser suites.

A hydration mismatch found during validation was traced to Georgian date formatting: Node and Chromium support different locale data. Review dates now use deterministic month names from the i18n dictionaries. The production suites passed after the correction.

Screenshots are generated into ignored `validation/`. The PDF references and desktop/mobile application screenshots were inspected locally. The implementation retains the reference's hero, compact search, green/white cards, sidebar filtering and main/sidebar profile structure. Generated photography, initials, a static map placeholder, actual seed counts and mobile adaptations are deliberate differences; pixel-identical fidelity is not claimed. Cloud-browser and hosted preview validation were unavailable.

Reusable `install_script` and `start_skill` fields were saved to the environment configuration draft. No additional secret, variable or network requirement was added. Publication and restoration in a fresh task have not been verified; review/save the draft and publish through environment settings.

All application source files were created for the user's build request in the initially empty checkout. Dependencies, build outputs and screenshots are ignored. No pre-existing source changes were overwritten.
