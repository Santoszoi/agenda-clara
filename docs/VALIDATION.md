# Validation record — 2026-11-02

Environment: Linux, Node.js 24.22.1, npm 11.9.0, Playwright 1.51.1, Chromium 134.0.6998.35 (headless).

- Production build and TypeScript check: passed; see build.txt.
- Vitest: 19 passed; see unit-tests.txt.
- Playwright: 5 passed; see browser-tests.txt.

Unit coverage: free slots, overlapping intervals, adjacent appointments, lunch/closing boundaries, different dates, invalid dates and off-grid times, immutable creation, name validation, duplicate IDs, saved JSON validation and conflicting stored records.

Browser coverage: create/refresh/cancel flow, duration-based disabled slots, focus after validation/confirmation, keyboard selection, recovery from corrupt storage, and a 390px viewport overflow check.

Initial browser setup required downloading Chromium. One initial browser test could not locate the service selector by exact label; an explicit accessible name was added and the browser suite rerun. Final logs contain the final run.

Real screenshots and video were captured from the local running interface. Video is silent, not a generated mockup.

Pending: manual screen-reader and 200% zoom testing, Firefox/Safari, physical mobile devices, blocked/quota-exceeded storage integration testing, live API/server concurrency and GitHub-hosted CI execution. The single-browser demo cannot prevent races across tabs or users. No accessibility conformance, performance SLA or customer-use claim is made.
