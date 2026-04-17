import React from 'react'
import { motion } from 'framer-motion'
import { LOGS_DATA } from '../../data/logsData'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -5 },
  show: { opacity: 1, x: 0, transition: { duration: 0.2 } },
}

const TextLine = ({ children, className = '' }) => (
  <motion.div variants={itemVariants} className={`font-mono text-[13px] ${className}`}>
    {children}
  </motion.div>
)

const Spacer = () => <motion.div variants={itemVariants} className="h-3" />

export default function TerminalLogs({ args = [] }) {
  const query = args[0]?.toLowerCase()

  // Auto-detect latest log by sorting IDs descending
  const sortedLogs = [...LOGS_DATA].sort((a, b) => b.id.localeCompare(a.id))
  const latestLog = sortedLogs[0]

  // ─── 1. "logs all" ────────────────────────────────────────────────────────────
  if (query === 'all') {
    return (
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="text-vtext/90">
        <TextLine className="text-vaccent mb-2">Available Logs:</TextLine>
        {sortedLogs.map((log) => (
          <TextLine key={log.id}>
            - {log.month} <span className="text-vmuted">(try: /logs {log.id})</span>
          </TextLine>
        ))}
        <Spacer />
        <TextLine className="text-vmuted text-[10px]">Try: /logs latest | /logs 03</TextLine>
      </motion.div>
    )
  }

  // ─── 2. Find specific log or default to latest ──────────────────────────────
  let targetLog = latestLog
  let isError = false

  if (query && query !== 'latest') {
    const found = LOGS_DATA.find((l) => l.aliases.includes(query) || l.id === query)
    if (found) {
      targetLog = found
    } else {
      isError = true
    }
  }

  if (isError) {
    return (
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="text-vtext/90">
        <TextLine className="text-vpink">No logs found for: "{query}"</TextLine>
        <Spacer />
        <TextLine className="text-vmuted text-[10px]">Suggestion: Type <span className="text-vaccent">logs all</span> to see available logs.</TextLine>
      </motion.div>
    )
  }

  // ─── 3. Render the target log ───────────────────────────────────────────────
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="text-vtext/90 max-w-2xl">
      <TextLine className="text-vpurple font-bold">
        [{targetLog?.month || 'Unknown Month'}]
      </TextLine>
      <Spacer />

      {targetLog?.content?.length ? (
        targetLog.content.map((paragraph, i) => (
          <React.Fragment key={i}>
            <TextLine className="leading-relaxed whitespace-pre-wrap">{paragraph}</TextLine>
            {i < targetLog.content.length - 1 && <Spacer />}
          </React.Fragment>
        ))
      ) : (
        <TextLine className="text-vmuted italic">No details available.</TextLine>
      )}
    </motion.div>
  )
}
