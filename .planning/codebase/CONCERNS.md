# Codebase Concerns

**Analysis Date:** 2026-04-17

## Tech Debt

**Large Monolithic Component:**
- Area: `src/components/Terminal.jsx`
- Issue: The main terminal component is 400+ lines and handles window state, input, sidebar, and animations.
- Why: Organic growth as features were added (suggestions, history navigation, sidebar).
- Impact: Harder to maintain and test; logic and UI are tightly coupled.
- Fix approach: Refactor `TerminalInput`, `TitleBar`, and `QuickHelp` into their own files in `src/components/terminal/`.

**Redundant Command Lists:**
- Area: `src/components/Terminal.jsx` vs `src/data/terminalCommands.jsx`
- Issue: `ALL_COMMANDS` is hardcoded in the component but should ideally derive from the command registry.
- Why: Simplified the implementation of autocomplete and help items.
- Impact: Adding a new command requires updating multiple files; risk of inconsistency.
- Fix approach: Export the command keys from `terminalCommands.jsx` and import them into `Terminal.jsx`.

## Known Bugs

**Scroll-to-bottom Lag:**
- Symptoms: Output doesn't always scroll to the very bottom after rapid command execution.
- Trigger: Multiple `TypedOutput` components rendering simultaneously.
- Workaround: Manual scrolling.
- Root cause: `useEffect` for scrolling might trigger before the typing animation completes.
- Fix: Add a scroll listener to the typing animation completion.

## Security Considerations

**Unprotected Input:**
- Risk: While it's a static site, the terminal input could be a vector for XSS if user input were ever reflected unsafely (currently it's just processed locally).
- Current mitigation: React's default escaping.
- Recommendations: Ensure no `dangerouslySetInnerHTML` is used with raw user input.

## Performance Bottlenecks

**Typing Animation Overhead:**
- Problem: `setInterval` with 8ms delay in `TypedOutput` can be heavy if many outputs exist.
- Cause: Multiple concurrent timers.
- Improvement path: Use `requestAnimationFrame` or a centralized typing manager for better performance.

## Fragile Areas

**Keyboard Event Handling:**
- File: `src/components/Terminal.jsx` (lines 179-201)
- Why fragile: Complex `handleKeyDown` logic for Enter, Tab, ArrowUp, and ArrowDown.
- Common failures: Tab autocomplete behavior competing with browser defaults.
- Safe modification: Encapsulate input logic in a dedicated component with clear guard clauses.

## Test Coverage Gaps

**Terminal Logic:**
- What's not tested: Command processing, history navigation, and autocomplete.
- Risk: Breaking core navigation features during refactoring.
- Priority: High.
- Difficulty to test: Low; `useTerminal` hook can be tested with standard React testing tools.

---

*Concerns audit: 2026-04-17*
*Update as issues are fixed or new ones discovered*
