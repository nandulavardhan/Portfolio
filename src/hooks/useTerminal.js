import { useState, useCallback } from 'react'
import { resolveCommand, WELCOME_ENTRIES } from '../data/terminalCommands'

let _nextId = 0
const uid = () => `entry-${++_nextId}`

/**
 * useTerminal — manages all terminal state.
 *
 * entries       : array of { id, type: 'input'|'output'|'system', content }
 * cmdHistory    : array of previously entered command strings (for ↑/↓)
 * historyIndex  : current position while navigating cmdHistory (-1 = not navigating)
 * submit(input) : process a command string
 * clear()       : reset entries to welcome screen
 */
export function useTerminal() {
  const [entries, setEntries] = useState(WELCOME_ENTRIES)
  const [cmdHistory, setCmdHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  const submit = useCallback((rawInput) => {
    const trimmed = rawInput.trim()

    // Always add the typed line (even if empty, for blank-line feel)
    const inputEntry = {
      id: uid(),
      type: 'input',
      content: trimmed,
    }

    const result = resolveCommand(trimmed)

    if (result === '__CLEAR__') {
      setEntries(WELCOME_ENTRIES)
      if (trimmed) {
        setCmdHistory((h) => [trimmed, ...h])
        setHistoryIndex(-1)
      }
      return
    }

    const newEntries = [inputEntry]
    if (result !== null) {
      newEntries.push({ id: uid(), type: 'output', content: result })
    }

    setEntries((prev) => [...prev, ...newEntries])

    if (trimmed) {
      setCmdHistory((h) => [trimmed, ...h])
      setHistoryIndex(-1)
    }
  }, [])

  /**
   * Navigate command history.
   * direction: 'up' | 'down'
   * Returns the command string to fill into the input, or null if unchanged.
   */
  const navigateHistory = useCallback(
    (direction, currentInput) => {
      if (cmdHistory.length === 0) return null

      let nextIndex = historyIndex

      if (direction === 'up') {
        nextIndex = Math.min(historyIndex + 1, cmdHistory.length - 1)
      } else {
        nextIndex = Math.max(historyIndex - 1, -1)
      }

      setHistoryIndex(nextIndex)
      return nextIndex === -1 ? '' : cmdHistory[nextIndex]
    },
    [cmdHistory, historyIndex],
  )

  return { entries, cmdHistory, submit, navigateHistory }
}
