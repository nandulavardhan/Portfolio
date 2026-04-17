import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTerminal } from '../hooks/useTerminal'

const PROMPT_SYMBOL = '>'
const PROMPT_TEXT = 'Type a command...'

// ── All known commands ────────────────────────────────────────────────────────
const ALL_COMMANDS = ['help', 'whoami', 'projects', 'skills', 'socials', 'engagements', 'engagements watch', 'engagements read', 'engagements listen', 'logs', 'date', 'clear']


// Per-colour Tailwind classes using the new palette
const COLOR_MAP = {
  vaccent: {
    border: 'border-vborder',
    text: 'text-vaccent',
    hover: 'hover:bg-vaccent/10 hover:border-vaccent/40',
  },
  vtext: {
    border: 'border-vborder',
    text: 'text-vtext',
    hover: 'hover:bg-vtext/10 hover:border-vtext/40',
  },
  vpurple: {
    border: 'border-vborder',
    text: 'text-vpurple',
    hover: 'hover:bg-vpurple/10 hover:border-vpurple/40',
  },
  vpink: {
    border: 'border-vborder',
    text: 'text-vpink',
    hover: 'hover:bg-vpink/10 hover:border-vpink/40',
  },
}

// Quick-help sidebar data
const HELP_ITEMS = [
  { cmd: 'whoami', desc: 'Profile & Experience' },
  { cmd: 'projects', desc: 'Case Studies' },
  { cmd: 'skills', desc: 'Design Systems & UX' },
  { cmd: 'socials', desc: 'Get in touch' },
  { cmd: 'logs', desc: 'Dev logs & progress' },
  { cmd: 'engagements', desc: 'What I watch, read & listen' },
  { cmd: 'clear', desc: 'Reset output' },
]

// Cycling placeholder hints for the input
const PLACEHOLDERS = [
  'try "/whoami"',
  'try "/projects"',
  'try "/skills"',
  'try "/socials"',
  'try "/logs"',
  'try "/engagements"',
  'try "/help"',
]

// ── Animation variants ────────────────────────────────────────────────────────
const entryVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.22, ease: 'easeOut' } },
}

// ── Blinking Cursor ───────────────────────────────────────────────────────────
function Cursor() {
  return (
    <span className="inline-block w-[8px] h-[16px] bg-vaccent ml-[1px] align-middle animate-[blink_1.2s_step-end_infinite]" />
  )
}

// ── Typed / fade-in output ────────────────────────────────────────────────────
function TypedOutput({ content }) {
  const isText = typeof content === 'string'
  const [displayed, setDisplayed] = useState(isText ? '' : null)

  useEffect(() => {
    if (!isText) return
    setDisplayed('')
    let i = 0
    const id = setInterval(() => {
      setDisplayed(content.slice(0, ++i))
      if (i >= content.length) clearInterval(id)
    }, 8) // slightly faster typing
    return () => clearInterval(id)
  }, [content, isText])

  if (isText) {
    return (
      <span className="font-mono text-sm text-vtext/90 leading-[1.8] whitespace-pre-wrap">
        {displayed}
        {displayed.length < content.length && <Cursor />}
      </span>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {content}
    </motion.div>
  )
}

// ── Single history entry ──────────────────────────────────────────────────────
function TerminalEntry({ entry }) {
  const inner =
    entry.type === 'input' ? (
      <div className="flex items-start gap-2 font-mono text-[15px] pt-2 pb-1">
        <span className="text-vaccent shrink-0 select-none font-bold">{PROMPT_SYMBOL}</span>
        <span className="text-vtext opacity-60 break-all">{entry.content}</span>
      </div>
    ) : (
      <div className="font-mono text-[13px] text-vtext/80 leading-relaxed mb-4">
        <TypedOutput content={entry.content} />
      </div>
    )

  return (
    <motion.div layout variants={entryVariants} initial="hidden" animate="show">
      {inner}
    </motion.div>
  )
}

// ── Autocomplete suggestion strip ─────────────────────────────────────────────
function Suggestions({ input, onSelect }) {
  // optionally strip leading slash for matching
  const cleanInput = input.trim().replace(/^\//, '')
  if (!cleanInput) return null
  const matches = ALL_COMMANDS.filter((c) => c.startsWith(cleanInput.toLowerCase()))
  if (!matches.length) return null

  return (
    <div className="flex items-center gap-2 px-4 py-2 border-t dashed-border-t bg-vbase/80 flex-wrap">
      <span className="text-vmuted text-[10px] font-mono tracking-widest uppercase">Tab autocomplete →</span>
      {matches.map((m) => (
        <button
          key={m}
          onMouseDown={(e) => { e.preventDefault(); onSelect(`/${m}`) }}
          className="px-2 py-0.5 rounded textxs font-mono bg-vpanel text-vaccent border dashed-border hover:border-vaccent/50 transition-colors"
        >
          /{m}
        </button>
      ))}
    </div>
  )
}

// ── Input line with cycling placeholder ───────────────────────────────────────
function TerminalInput({ onSubmit, navigateHistory }) {
  const [value, setValue] = useState('')
  const [phIndex, setPhIndex] = useState(0)
  const inputRef = useRef(null)

  useEffect(() => { inputRef.current?.focus() }, [])

  // Cycle placeholder every 2.5 s when input is empty
  useEffect(() => {
    if (value) return
    const id = setInterval(() => {
      setPhIndex((i) => (i + 1) % PLACEHOLDERS.length)
    }, 2500)
    return () => clearInterval(id)
  }, [value])

  const handleSelect = useCallback((cmd) => {
    setValue(cmd + ' ')
    inputRef.current?.focus()
  }, [])

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        const cmd = value.trim()
        onSubmit(cmd)
        setValue('')
      } else if (e.key === 'Tab') {
        e.preventDefault()
        const cleanInput = value.trim().replace(/^\//, '')
        const matches = ALL_COMMANDS.filter((c) => c.startsWith(cleanInput.toLowerCase()))
        if (matches.length === 1) setValue(`/${matches[0]} `)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        const prev = navigateHistory('up')
        if (prev !== null) setValue(prev ? prev : '')
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        const next = navigateHistory('down')
        if (next !== null) setValue(next ? next : '')
      }
    },
    [value, onSubmit, navigateHistory],
  )

  return (
    <div className="shrink-0">
      <Suggestions input={value} onSelect={handleSelect} />
      <div
        className="flex items-center gap-2 sm:gap-3 font-mono text-[14px] sm:text-[15px] px-3 sm:px-5 py-3 sm:py-4 border-t dashed-border-t bg-vbase"
        onClick={() => inputRef.current?.focus()}
      >
        <span className="text-vaccent shrink-0 select-none font-bold">{PROMPT_SYMBOL}</span>
        <div className="relative flex-1 flex items-center">
          {/* Placeholder text — shown only when input is empty */}
          {!value && (
            <span
              className="absolute left-0 text-vmuted font-mono text-[14px] sm:text-[15px] pointer-events-none select-none transition-opacity duration-300 truncate w-full"
              aria-hidden="true"
            >
              {PROMPT_TEXT} <span className="opacity-50">{PLACEHOLDERS[phIndex]}</span>
            </span>
          )}
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => {
              // Ensure we don't accidentally prevent them from typing a slash, we just handle it later
              setValue(e.target.value)
            }}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            aria-label="Terminal input"
            className="w-full bg-transparent outline-none border-none text-vtext caret-vaccent font-mono text-[15px]"
          />
        </div>
      </div>
    </div>
  )
}


// ── Collapsible quick-reference sidebar ───────────────────────────────────────
function QuickHelp({ onCommand }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="terminal-sidebar bg-vbase">
      {/* Sidebar header */}
      <div className="flex items-center justify-between px-4 py-3 bg-vpanel/50 border-b dashed-border-b">
        <span className="text-vtext/50 text-[10px] font-mono uppercase tracking-[0.2em] select-none">
          Commands
        </span>
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-vmuted hover:text-vtext transition-colors text-xs leading-none"
          aria-label="Toggle command reference"
        >
          {open ? '—' : '+'}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="sidebar-content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <ul className="py-2">
              {HELP_ITEMS.map(({ cmd, desc }) => (
                <li key={cmd}>
                  <button
                    onClick={() => onCommand(`/${cmd}`)}
                    className="w-full text-left px-4 py-2 group hover:bg-vtext/5 transition-colors"
                  >
                    <span className="block text-[12px] font-mono text-vtext group-hover:text-vaccent transition-colors">
                      /{cmd}
                    </span>
                    <span className="block text-[10px] font-mono text-vmuted transition-colors leading-tight mt-1">
                      {desc}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Footer hint */}
            <div className="px-4 py-3 border-t dashed-border-t mt-auto">
              <p className="text-[10px] font-mono text-vmuted leading-relaxed">
                ↑ / ↓ History<br />
                Tab Autocomplete<br />
                Enter Execute
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Title bar ─────────────────────────────────────────────────────────────────
function TitleBar({ onClose, onMinimize, onMaximize }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-vbase border-b dashed-border-b shrink-0">
      <div className="flex items-center gap-2 group">
        <button
          onClick={onClose}
          className="w-3 h-3 rounded-full bg-[#ff5f56] flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
          aria-label="Close"
        />
        <button
          onClick={onMinimize}
          className="w-3 h-3 rounded-full bg-[#ffbd2e] flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
          aria-label="Minimize"
        />
        <button
          onClick={onMaximize}
          className="w-3 h-3 rounded-full bg-[#27c93f] flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
          aria-label="Maximize"
        />
      </div>
      <span className="font-mono text-[11px] text-vtext/50 select-none tracking-[0.1em]">
        nv@portfolio ~ / home
      </span>
      {/* Spacer to balance the flex layout */}
      <div className="w-[52px] hidden sm:block"></div>
    </div>
  )
}

// ── Root terminal ─────────────────────────────────────────────────────────────
export default function Terminal() {
  const { entries, submit, navigateHistory } = useTerminal()
  const bottomRef = useRef(null)

  const [isClosed, setIsClosed] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [entries, isMinimized, isMaximized])

  const focusInput = useCallback((e) => {
    if (window.getSelection()?.toString() || isClosed || isMinimized) return
    document.querySelector('[aria-label="Terminal input"]')?.focus()
  }, [isClosed, isMinimized])

  // Used by NavBar and QuickHelp: fires the command as if typed
  const fireCommand = useCallback((cmd) => {
    submit(cmd)
    // Re-focus input after button click
    setTimeout(() => {
      document.querySelector('[aria-label="Terminal input"]')?.focus()
    }, 50)
  }, [submit])

  // If closed, render a desktop icon to reopen
  if (isClosed) {
    return (
      <div className="terminal-root flex flex-col items-center justify-center bg-vbase">
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { setIsClosed(false); setIsMinimized(false); }}
          className="flex flex-col items-center gap-4 group outline-none"
        >
          <div className="w-20 h-20 bg-vpanel border dashed-border rounded-2xl flex items-center justify-center shadow-2xl group-hover:border-vaccent/50 transition-colors">
            <span className="text-vaccent font-mono font-bold text-3xl">{'>_'}</span>
          </div>
          <span className="text-vmuted font-mono text-[11px] tracking-widest uppercase group-hover:text-vtext transition-colors">
            Launch Terminal
          </span>
        </motion.button>
      </div>
    )
  }

  return (
    <div className="terminal-root" onClick={focusInput}>
      <motion.div
        layout
        className={`terminal-window transition-all duration-300 ease-in-out shadow-2xl ${isMaximized ? '!w-[100vw] !h-[100dvh] !max-w-none !max-h-none !rounded-none !border-none' : ''
          } ${isMinimized ? '!h-auto !translate-y-[calc(40vh)] sm:!translate-y-[calc(40vh)]' : ''
          }`}
      >
        <TitleBar
          onClose={() => setIsClosed(true)}
          onMinimize={() => {
            setIsMinimized(!isMinimized)
            if (isMaximized) setIsMaximized(false)
          }}
          onMaximize={() => {
            if (isMinimized) setIsMinimized(false)
            setIsMaximized(!isMaximized)
          }}
        />

        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-col flex-1 min-h-0 relative"
            >
              {/* Main body: output + sidebar */}
              <div className="flex flex-1 min-h-0 relative">
                {/* Scrollable output */}
                <div className="terminal-output flex-1 min-w-0">
                  <AnimatePresence initial={false}>
                    {entries.map((entry) => (
                      <TerminalEntry key={entry.id} entry={entry} />
                    ))}
                  </AnimatePresence>
                  <div ref={bottomRef} />
                </div>

                {/* Quick-help sidebar (desktop only) */}
                <QuickHelp onCommand={fireCommand} />
              </div>

              <TerminalInput onSubmit={submit} navigateHistory={navigateHistory} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
