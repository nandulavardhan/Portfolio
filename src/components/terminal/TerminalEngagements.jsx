import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ENGAGEMENTS_DATA } from '../../data/engagementsData'

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3 } },
}

// ─── Year → Month accordion for watch / read ──────────────────────────────────

function YearSection({ yearData }) {
  const [expandedMonths, setExpandedMonths] = useState([yearData.months[0]?.month])

  const toggleMonth = (month) => {
    setExpandedMonths((prev) =>
      prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month]
    )
  }

  return (
    <motion.div variants={itemVariants} className="mb-4">
      {/* Year heading */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-vaccent/40 font-mono text-[11px] select-none">─────</span>
        <span className="text-vaccent font-bold font-mono text-[13px] tracking-wider">
          {yearData.year}
        </span>
        <span className="text-vaccent/40 font-mono text-[11px] select-none">─────</span>
      </div>

      {yearData.months.map((monthData) => {
        const isOpen = expandedMonths.includes(monthData.month)
        return (
          <div key={monthData.month} className="ml-3 mb-2">
            {/* Month toggle */}
            <button
              onClick={() => toggleMonth(monthData.month)}
              className="flex items-center gap-2 text-left group w-full"
            >
              <span className="text-vmuted font-mono text-[11px] transition-colors group-hover:text-vtext">
                {isOpen ? '▾' : '▸'}
              </span>
              <span className="text-vtext/70 font-mono text-[12px] group-hover:text-vtext transition-colors">
                {monthData.month}
              </span>
              <span className="text-vmuted font-mono text-[10px]">
                ({monthData.items.length})
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.ul
                  key="month-list"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.18 }}
                  className="overflow-hidden ml-5 mt-1 space-y-0.5"
                >
                  {monthData.items.map((item, i) => (
                    <li key={i} className="text-vmuted font-mono text-[12px]">
                      <span className="text-vaccent/50 mr-1">–</span>
                      {item}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </motion.div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function TerminalEngagements({ args }) {
  const category = args?.[0]?.toLowerCase();
  const showWatch = category === 'watch' || category === 'movies' || category === 'shows';
  const showRead = category === 'read' || category === 'books';
  const showListen = category === 'listen' || category === 'music' || category === 'songs';

  if (!showWatch && !showRead && !showListen) {
    return (
      <div className="font-mono text-[13px] text-vtext/90 leading-relaxed">
        <p className="text-red-400 mb-2">bash: /engagements: missing or invalid argument</p>
        <p className="text-vmuted">Usage: <span className="text-cyan-400">/engagements [category]</span></p>
        <div className="mt-2 ml-4 space-y-1">
          <p><span className="text-vaccent w-20 inline-block font-bold">watch</span> <span className="text-slate-600">─</span> <span className="text-slate-300">Movies & Shows</span></p>
          <p><span className="text-vpurple w-20 inline-block font-bold">read</span> <span className="text-slate-600">─</span> <span className="text-slate-300">Books</span></p>
          <p><span className="text-vpink w-20 inline-block font-bold">listen</span> <span className="text-slate-600">─</span> <span className="text-slate-300">Music & Songs</span></p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-2xl text-vtext/90 font-mono text-[13px] leading-relaxed"
    >
      {/* ── What I Watch ── */}
      {showWatch && (
        <motion.div variants={itemVariants} className="mb-6">
          <span className="text-vaccent font-bold text-[14px]"># What I Watch</span>
          <div className="mt-3">
            {ENGAGEMENTS_DATA.watch.map((yearData) => (
              <YearSection key={yearData.year} yearData={yearData} />
            ))}
          </div>
        </motion.div>
      )}

      {/* ── What I Read ── */}
      {showRead && (
        <motion.div variants={itemVariants} className="mb-6">
          <span className="text-vpurple font-bold text-[14px]"># What I Read</span>
          <div className="mt-3">
            {ENGAGEMENTS_DATA.read.map((yearData) => (
              <YearSection key={yearData.year} yearData={yearData} />
            ))}
          </div>
        </motion.div>
      )}

      {/* ── What I Listen ── */}
      {showListen && (
        <motion.div variants={itemVariants} className="mb-4">
          <span className="text-vpink font-bold text-[14px]"># What I Listen</span>
          <ul className="mt-2 ml-4 space-y-1 text-vmuted">
            {ENGAGEMENTS_DATA.listen.map((song, i) => (
              <li key={i}>
                <span className="text-vpink/50 mr-1">–</span>
                {song}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  )
}
