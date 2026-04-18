import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ENGAGEMENTS_DATA } from '../../data/engagementsData';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

// ─── Utility Filter Function ──────────────────────────────────────────────────
const getFilteredData = (dataArray, query) => {
  if (!query || query === 'latest') {
    if (!dataArray || dataArray.length === 0) return [];
    const latestYearData = dataArray[0];
    if (!latestYearData.months || latestYearData.months.length === 0) return [latestYearData];
    return [
      {
        ...latestYearData,
        months: [latestYearData.months[0]],
      },
    ];
  }

  if (query === 'all') return dataArray;

  const filteredArr = [];
  const parts = query.split(/\s+/);
  const possibleYear = parts.find((p) => /^\d{4}$/.test(p));
  const possibleMonth = parts.find((p) => !/^\d{4}$/.test(p));

  const monthNameMap = {
    1: 'january', 2: 'february', 3: 'march', 4: 'april',
    5: 'may', 6: 'june', 7: 'july', 8: 'august',
    9: 'september', 10: 'october', 11: 'november', 12: 'december',
  };

  for (const yData of dataArray) {
    if (possibleYear && yData.year.toString() !== possibleYear) {
      continue;
    }

    let matchingMonths = yData.months;
    if (possibleMonth) {
      const monthNum = parseInt(possibleMonth, 10);
      const targetMonthStr =
        !isNaN(monthNum) && monthNum >= 1 && monthNum <= 12
          ? monthNameMap[monthNum]
          : possibleMonth;

      matchingMonths = yData.months.filter((m) =>
        m.month.toLowerCase().startsWith(targetMonthStr)
      );
    }

    if (matchingMonths.length > 0) {
      filteredArr.push({
        ...yData,
        months: matchingMonths,
      });
    }
  }

  return filteredArr;
};

// ─── Year → Month accordion for watch / read ──────────────────────────────────
function YearSection({ yearData, defaultExpanded = true }) {
  const defaultMonths =
    defaultExpanded && yearData.months[0] ? [yearData.months[0].month] : [];
  const [expandedMonths, setExpandedMonths] = useState(defaultMonths);

  const toggleMonth = (month) => {
    setExpandedMonths((prev) =>
      prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month]
    );
  };

  return (
    <motion.div variants={itemVariants} className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-vaccent/40 font-mono text-[11px] select-none">─────</span>
        <span className="text-vaccent font-bold font-mono text-[13px] tracking-wider">
          {yearData.year}
        </span>
        <span className="text-vaccent/40 font-mono text-[11px] select-none">─────</span>
      </div>

      {yearData.months.map((monthData) => {
        const isOpen = expandedMonths.includes(monthData.month);
        return (
          <div key={monthData.month} className="ml-3 mb-2">
            <button
              onClick={() => toggleMonth(monthData.month)}
              className="flex items-center gap-2 text-left group w-full outline-none"
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
        );
      })}
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function TerminalEngagements({ args }) {
  const category = args?.[0]?.toLowerCase();
  const queryParts = args?.slice(1) || [];
  const query = queryParts.join(' ').toLowerCase();

  const showWatch = category === 'watch' || category === 'movies' || category === 'shows';
  const showRead = category === 'read' || category === 'books';
  const showListen = category === 'listen' || category === 'music' || category === 'songs';

  const watchData = showWatch ? getFilteredData(ENGAGEMENTS_DATA.watch, query) : [];
  const readData = showRead ? getFilteredData(ENGAGEMENTS_DATA.read, query) : [];

  const isError =
    (showWatch && watchData.length === 0) || (showRead && readData.length === 0);

  // Helper to render watch/read sections
  const renderCategory = (title, colorClass, data) => (
    <motion.div variants={itemVariants} className="mb-6">
      <span className={`${colorClass} font-bold text-[14px]`}># {title}</span>
      <div className="mt-3">
        {data.map((yearData) => (
          <YearSection
            key={yearData.year}
            yearData={yearData}
            defaultExpanded={query !== 'all'}
          />
        ))}
      </div>
      {(query === '' || query === 'latest') && (
        <div className="text-vmuted text-[10px] mt-4">
          Try: /engagements {category} all | /engagements {category} april
        </div>
      )}
    </motion.div>
  );

  if (!showWatch && !showRead && !showListen) {
    return (
      <div className="font-mono text-[13px] text-vtext/90 leading-relaxed">
        <p className="text-red-400 mb-2">bash: /engagements: missing or invalid argument</p>
        <p className="text-vmuted">
          Usage: <span className="text-cyan-400">/engagements [category] [month/year/all]</span>
        </p>
        <div className="mt-2 ml-4 space-y-1">
          <p>
            <span className="text-vaccent w-20 inline-block font-bold">watch</span>{' '}
            <span className="text-slate-600">─</span>{' '}
            <span className="text-slate-300">Movies & Shows</span>
          </p>
          <p>
            <span className="text-vpurple w-20 inline-block font-bold">read</span>{' '}
            <span className="text-slate-600">─</span>{' '}
            <span className="text-slate-300">Books</span>
          </p>
          <p>
            <span className="text-vpink w-20 inline-block font-bold">listen</span>{' '}
            <span className="text-slate-600">─</span>{' '}
            <span className="text-slate-300">Music & Songs</span>
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="text-vtext/90 font-mono text-[13px]"
      >
        <div className="text-vpink">No engagements found for: "{query}"</div>
        <div className="h-3" />
        <div className="text-vmuted text-[10px]">
          Suggestion: Type <span className="text-vaccent">/engagements {category} all</span> to see available.
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-2xl text-vtext/90 font-mono text-[13px] leading-relaxed"
    >
      {showWatch && renderCategory('What I Watch', 'text-vaccent', watchData)}
      {showRead && renderCategory('What I Read', 'text-vpurple', readData)}

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
  );
}
