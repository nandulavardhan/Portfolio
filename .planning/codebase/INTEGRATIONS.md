# External Integrations

**Analysis Date:** 2026-04-17

## APIs & External Services

**External APIs:**
- None detected - The application operates as a static site using local data files.

## Data Storage

**Databases:**
- None - Data is stored statically in `.js` files within the `src/data/` directory.

**File Storage:**
- Local Assets - Images and icons are stored in `public/` and `src/assets/`.

## Authentication & Identity

**Auth Provider:**
- None - The portfolio is public-facing and does not require user authentication.

## Monitoring & Observability

**Error Tracking:**
- None - No external error tracking (like Sentry) is currently configured.

**Analytics:**
- None - No analytics providers (like Google Analytics or Mixpanel) are detected.

## CI/CD & Deployment

**Hosting:**
- Netlify - Static site hosting.
  - Deployment: Automatic via Netlify's GitHub integration (monitored by `netlify.toml`).

**CI Pipeline:**
- GitHub - Source control management and likely trigger for Netlify builds.

## Environment Configuration

**Development:**
- No environment variables required for core functionality.

**Production:**
- Secrets management: Not applicable (no sensitive integrations).

## Webhooks & Callbacks

**Incoming:**
- None.

**Outgoing:**
- None.

---

*Integration audit: 2026-04-17*
*Update when adding/removing external services*
