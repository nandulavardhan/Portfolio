import React from 'react'
import TerminalAbout from '../components/terminal/TerminalAbout'
import TerminalProjects from '../components/terminal/TerminalProjects'
import TerminalSkills from '../components/terminal/TerminalSkills'
import TerminalContact from '../components/terminal/TerminalContact'
import TerminalLogs from '../components/terminal/TerminalLogs'
import TerminalEngagements from '../components/terminal/TerminalEngagements'

// ─── Inline helpers (help / whoami / date only) ──────────────────────────────
const C = ({ children }) => <span className="text-cyan-400">{children}</span>
const Y = ({ children }) => <span className="text-yellow-400">{children}</span>

const helpOutput = () => (
  <div className="space-y-1 font-mono text-sm">
    <p className="text-slate-400 mb-2">Available commands:</p>
    {[
      ['/help', 'Show this help message'],
      ['/whoami', 'About me — bio, stats & highlights'],
      ['/projects', 'Featured project cards'],
      ['/skills', 'Categorised skills with proficiency bars'],
      ['/socials', 'Reach me via email or social'],
      ['/engagements [category]', 'watch, read, or listen'],
      ['/date', 'Print current date & time'],
      ['/logs', 'Developer logs & progress updates'],
      ['/clear', 'Clear terminal output'],
    ].map(([cmd, desc]) => (
      <div key={cmd} className="flex gap-3">
        <C><span className="w-32 inline-block">{cmd}</span></C>
        <span className="text-slate-600">─</span>
        <span className="text-slate-300">{desc}</span>
      </div>
    ))}
    <p className="text-slate-600 mt-3 text-xs">
      ↑ / ↓ navigate history · <C>Tab</C> autocomplete · <C>/clear</C> resets screen
    </p>
  </div>
)



// ─── Main resolver ────────────────────────────────────────────────────────────
/**
 * Returns:
 *  - A React element  → rendered as terminal output
 *  - null             → empty line (blank Enter)
 *  - '__CLEAR__'      → signal to reset history
 */
export function resolveCommand(rawInput) {
  const trimmed = rawInput.trim()

  // Commands must start with "/"
  if (!trimmed.startsWith('/')) {
    if (trimmed === '') return null
    return (
      <span className="text-red-400 font-mono text-sm">
        bash: <span className="text-white">{trimmed}</span>: command not found.{' '}
        Type <C>/help</C> for available commands.
      </span>
    )
  }

  const parts = trimmed.slice(1).split(/\s+/)
  const cmd = parts[0].toLowerCase()
  const args = parts.slice(1)

  // Commands that do not accept any arguments
  const noArgsCommands = ['help', 'whoami', 'projects', 'skills', 'socials', 'date', 'clear']
  if (noArgsCommands.includes(cmd) && args.length > 0) {
    return (
      <span className="text-red-400 font-mono text-sm">
        bash: /{cmd}: too many arguments
      </span>
    )
  }

  switch (cmd) {
    case '': return null
    case 'help': return helpOutput()
    case 'whoami': return <TerminalAbout />
    case 'projects': return <TerminalProjects />
    case 'skills': return <TerminalSkills />
    case 'socials': return <TerminalContact />
    case 'engagements': return <TerminalEngagements args={args} />
    case 'logs': return <TerminalLogs args={args} />
    case 'date': return (
      <span className="text-slate-300 font-mono text-sm">{new Date().toString()}</span>
    )
    case 'clear': return '__CLEAR__'
    default:
      return (
        <span className="text-red-400 font-mono text-sm">
          bash: <span className="text-white">/{cmd}</span>: command not found.{' '}
          Type <C>/help</C> for available commands.
        </span>
      )
  }
}

// ─── Welcome banner ───────────────────────────────────────────────────────────
export const WELCOME_ENTRIES = [
  {
    id: 'banner',
    content: (
      <pre className="text-violet-400 text-xs leading-tight select-none font-mono">{`
  ██████╗ ███████╗██╗   ██╗    ██████╗  ██████╗ ██████╗ ████████╗
  ██╔══██╗██╔════╝██║   ██║    ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝
  ██║  ██║█████╗  ██║   ██║    ██████╔╝██║   ██║██████╔╝   ██║   
  ██║  ██║██╔══╝  ╚██╗ ██╔╝    ██╔═══╝ ██║   ██║██╔══██╗   ██║   
  ██████╔╝███████╗ ╚████╔╝     ██║     ╚██████╔╝██║  ██║   ██║   
  ╚═════╝ ╚══════╝  ╚═══╝      ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   `}</pre>
    ),
  },
  {
    id: 'welcome-info',
    content: (
      <div className="space-y-1 text-sm font-mono">
        <p className="text-slate-500">
          Type <span className="text-cyan-400">/help</span> to see all commands.{' '}
          Try <span className="text-cyan-400">/help</span>, <span className="text-cyan-400">/whoami</span>, or <span className="text-cyan-400">/socials</span>.
        </p>
        <p className="text-slate-600 text-xs">
          Use <span className="text-cyan-400">Tab</span> to autocomplete · ↑ / ↓ to navigate history
        </p>
      </div>
    ),
  },
]
