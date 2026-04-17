# Codebase Structure

**Analysis Date:** 2026-04-17

## Directory Layout

```
Portfolio/
├── .planning/          # GSD planning and codebase mapping
├── public/             # Static assets (icons, favicon)
├── src/                # Project source code
│   ├── components/     # React components
│   │   └── terminal/   # Terminal-specific output components
│   ├── data/           # Static content and command definitions
│   ├── hooks/          # Custom React hooks (useTerminal)
│   ├── App.jsx         # Main App component
│   ├── index.css       # Global styles (Tailwind)
│   └── main.jsx        # App entry point
├── eslint.config.js    # Linting configuration
├── index.html          # HTML entry point
├── package.json        # Project manifest and dependencies
├── tailwind.config.js  # Tailwind configuration
└── vite.config.js      # Vite build configuration
```

## Directory Purposes

**src/components/**
- Purpose: Application UI components.
- Contains: `Terminal.jsx` (main interface) and `terminal/` subdirectory.
- Subdirectories: `terminal/` - contains components for specific command outputs (About, Projects, etc.).

**src/data/**
- Purpose: Application content and command mappings.
- Contains: `.js` and `.jsx` files.
- Key files: `terminalCommands.jsx` - maps string commands to components.

**src/hooks/**
- Purpose: Reusable application logic.
- Contains: `useTerminal.js` - handles terminal state and input processing.

**public/**
- Purpose: Static assets served directly.
- Contains: `favicon.svg`, `icons.svg`.

## Key File Locations

**Entry Points:**
- `src/main.jsx`: React application entry point.
- `index.html`: Web entry point.

**Configuration:**
- `package.json`: Dependencies and scripts.
- `vite.config.js`: Build and dev server configuration.
- `tailwind.config.js`: Styling tokens and utilities.
- `.gitignore`: Files excluded from git.

**Core Logic:**
- `src/hooks/useTerminal.js`: Main terminal processing logic.
- `src/components/Terminal.jsx`: Main interface rendering.

**Documentation:**
- `README.md`: Project overview.

## Naming Conventions

**Files:**
- `PascalCase.jsx` for React components.
- `camelCase.js` for hooks and data files.
- `kebab-case.js` for configuration files.

**Directories:**
- `kebab-case` for all directory names.

## Where to Add New Code

**New Terminal Command:**
- Definition: Add to `src/data/terminalCommands.jsx`.
- Output Component: Create in `src/components/terminal/`.
- Data (if any): Add to `src/data/`.

**New UI Feature:**
- Implementation: `src/components/`.
- Logic: `src/hooks/`.

**New Static Asset:**
- Icons/Images: `public/`.

---

*Structure analysis: 2026-04-17*
*Update when directory structure changes*
