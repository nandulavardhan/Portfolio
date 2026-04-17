# Coding Conventions

**Analysis Date:** 2026-04-17

## Naming Patterns

**Files:**
- `PascalCase.jsx` for React components (e.g., `Terminal.jsx`, `TerminalAbout.jsx`).
- `camelCase.js` or `camelCase.jsx` for hooks, utilities, and data (e.g., `useTerminal.js`, `terminalCommands.jsx`).
- `kebab-case.js` for project configuration (e.g., `tailwind.config.js`, `vite.config.js`).

**Functions:**
- `camelCase` for all functions and functional components.
- `useHookName` for custom React hooks.
- `handleEventName` for event handlers (e.g., `handleKeyDown`, `handleSelect`).

**Variables:**
- `camelCase` for local variables and state.
- `UPPER_SNAKE_CASE` for global constants and static data (e.g., `PROMPT_SYMBOL`, `ALL_COMMANDS`, `COLOR_MAP`).

## Code Style

**Formatting:**
- **Indentation:** 2 spaces.
- **Quotes:** Single quotes preferred for strings.
- **Semicolons:** Generally omitted in newer code, but mixed; prioritize omission for consistency with modern ESM style.
- **Tailwind:** Utility classes used extensively for styling.

**React Patterns:**
- Functional components with hooks (`useState`, `useEffect`, `useCallback`, `useRef`).
- `AnimatePresence` and `motion` from `framer-motion` for all UI transitions.

## Import Organization

**Order:**
1. React and core hooks.
2. External libraries (`framer-motion`, etc.).
3. Internal hooks (`../hooks/...`).
4. Internal components (`./terminal/...`).
5. Internal data or assets.

## Error Handling

**Strategy:**
- Silent failure with fallback UI or "Command not found" message for terminal interactions.
- User-friendly error messages instead of system crashes.

## Logging

**Patterns:**
- No production logging framework implemented.
- `console.log` used sparsely for local development debugging.

## Comments

**Section Headers:**
- Use double-dash line separators for major logic blocks: `// ── Section Name ────...`

**Inline Comments:**
- Used to explain "why" for complex logic (e.g., autocomplete logic, placeholder cycling).
- Keep descriptions concise and adjacent to the code they describe.

## Function Design

**Size:**
- Components are kept focused; complex terminal outputs are extracted to `src/components/terminal/`.
- Logic is extracted to custom hooks (`useTerminal.js`) to keep components clean.

---

*Convention analysis: 2026-04-17*
*Update when patterns change*
