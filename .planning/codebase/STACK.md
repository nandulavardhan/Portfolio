# Technology Stack

**Analysis Date:** 2026-04-17

## Languages

**Primary:**
- JavaScript (ESM) - All application code and data files.

**Secondary:**
- HTML/CSS - Template and styling foundations.

## Runtime

**Environment:**
- Browser (Modern) - Web application targeted for browser execution.
- Node.js (Dev only) - For Vite build tooling and ESLint.

**Package Manager:**
- npm - Version 10.x+
- Lockfile: `package-lock.json` present.

## Frameworks

**Core:**
- React 19.2 - UI Framework for building the terminal interface.

**Testing:**
- None detected - No testing framework present in `package.json`.

**Build/Dev:**
- Vite 8.0 - Fast build tool and development server.
- Tailwind CSS 3.4 - Utility-first CSS framework for styling.
- PostCSS/Autoprefixer - CSS processing.

## Key Dependencies

**Critical:**
- `framer-motion` 12.38 - Powering terminal animations and transitions.
- `react-dom` 19.2 - React's DOM rendering engine.

**Infrastructure:**
- `eslint` 9.39 - Code linting and quality tools.
- `@vitejs/plugin-react` 6.0 - React support for Vite.

## Configuration

**Environment:**
- Configured via static files; no `.env` required for core functionality.

**Build:**
- `vite.config.js` - Vite build settings.
- `tailwind.config.js` - Tailwind design tokens and purge settings.
- `postcss.config.js` - PostCSS runner config.
- `eslint.config.js` - ESLint flat config.

## Platform Requirements

**Development:**
- Windows (Current OS) - Node.js installed.
- Modern Web Browser.

**Production:**
- Static Host - Netlify (configured via `netlify.toml`).

---

*Stack analysis: 2026-04-17*
*Update after major dependency changes*
