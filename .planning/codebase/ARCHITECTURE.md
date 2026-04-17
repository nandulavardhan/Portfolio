# Architecture

**Analysis Date:** 2026-04-17

## Pattern Overview

**Overall:** Component-Based React Single Page Application (SPA) with a Terminal UI Metaphor.

**Key Characteristics:**
- **Terminal UI:** The entire user interaction is modeled as a command-line interface.
- **Data-Driven:** Content is stored in static data files, separated from the rendering logic.
- **Component-Level Modularization:** Terminal commands are mapped to specific React components.

## Layers

**View Layer:**
- Purpose: Render the UI and handle user input.
- Contains: `App.jsx`, `Terminal.jsx`, and sub-components in `src/components/terminal/`.
- Depends on: Logic layer and Data layer.

**Logic Layer (Custom Hooks):**
- Purpose: Manage terminal state, command history, and processing.
- Contains: `src/hooks/useTerminal.js`.
- Depends on: Data layer.
- Used by: `Terminal.jsx`.

**Data Layer:**
- Purpose: Provide the content displayed in the terminal.
- Contains: `src/data/*.js`.
- Depends on: React components (for some command mappings).
- Used by: Logic and View layers.

## Data Flow

**Command Execution:**

1. User types a command in `Terminal.jsx`.
2. `useTerminal.js` hook processes the input.
3. Command is matched against `src/data/terminalCommands.jsx`.
4. The corresponding React component (e.g., `TerminalProjects.jsx`) is retrieved.
5. Terminal output state is updated with the new component.
6. React re-renders the terminal display with the new output.

**State Management:**
- **Local State:** React `useState` and `useRef` within `useTerminal.js` manage current input, output history, and terminal focus.
- **Persistence:** No persistent server-side state; state resets on page refresh.

## Key Abstractions

**Terminal Command:**
- Purpose: Map a string input to a result (UI component or action).
- Examples: `src/data/terminalCommands.jsx`.
- Pattern: Strategy pattern (mapping keys to handlers).

**Terminal Sub-Component:**
- Purpose: encapsulated display logic for a specific command output.
- Examples: `TerminalAbout.jsx`, `TerminalSkills.jsx`.
- Pattern: Presentational component.

## Entry Points

**Web Entry:**
- Location: `src/main.jsx`.
- Triggers: Page load.
- Responsibilities: Mount the React application to the DOM.

**App Entry:**
- Location: `src/App.jsx`.
- Responsibilities: Main application container, houses the `Terminal` component.

## Error Handling

**Strategy:** Default "Command not found" output for unrecognized inputs.

**Patterns:**
- Try/catch blocks not extensively used (logic is primarily synchronous state updates).
- Fallback UI components for missing data (handled via React rendering patterns).

## Cross-Cutting Concerns

**Styling:**
- Consistent dark-themed terminal aesthetic using Tailwind CSS.
- Transitions and micro-animations handled by Framer Motion.

---

*Architecture analysis: 2026-04-17*
*Update when major patterns change*
